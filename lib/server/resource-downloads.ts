import "server-only";

import { unstable_cache } from "next/cache";

import { requireAdminSession } from "@/lib/server/admin-auth";
import { ensureActivitySchema, getSql } from "@/lib/server/db";

const TITLE_MAX_LENGTH = 200;
const DESCRIPTION_MAX_LENGTH = 4_000;
const FILE_URL_MAX_LENGTH = 2_048;
const BLOB_PATHNAME_MAX_LENGTH = 1_024;
const FILE_NAME_MAX_LENGTH = 255;
const MIME_TYPE_MAX_LENGTH = 127;
const MIME_TYPE_PATTERN = /^[A-Za-z0-9!#$&^_.+-]+\/[A-Za-z0-9!#$&^_.+-]+$/;
const DOWNLOAD_BLOB_PATH_PATTERN = /^downloads\/[A-Za-z0-9][A-Za-z0-9._/-]*$/;
const VERCEL_BLOB_HOST_SUFFIX = ".blob.vercel-storage.com";
const SORT_ORDER_MIN = -1_000_000;
const SORT_ORDER_MAX = 1_000_000;
const MANAGED_SOURCE_KEYS = new Set(["bundled-ifu"]);

export type ResourceDownload = {
  id: string;
  sourceKey: string | null;
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
  fileSizeBytes: number;
  mimeType: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type ResourceDownloadAdminRecord = ResourceDownload & {
  blobPathname: string | null;
  isPublished: boolean;
};

export type ResourceDownloadMutationInput = {
  sourceKey?: string | null;
  title: string;
  description: string;
  fileUrl: string;
  blobPathname: string | null;
  fileName: string;
  fileSizeBytes: number;
  mimeType: string;
  sortOrder: number;
  isPublished: boolean;
};

type ValidatedResourceDownloadInput = Omit<ResourceDownloadMutationInput, "sourceKey"> & {
  sourceKey: string | null;
};

type ResourceDownloadDatabaseRow = {
  id: string;
  source_key: string | null;
  title: string;
  description: string;
  file_url: string;
  blob_pathname: string | null;
  file_name: string;
  file_size_bytes: string | number | bigint;
  mime_type: string;
  sort_order: string | number;
  is_published: boolean;
  created_at: string | Date;
  updated_at: string | Date;
};

export class ResourceDownloadValidationError extends Error {
  constructor(message = "다운로드 자료 정보를 확인해 주세요.") {
    super(message);
    this.name = "ResourceDownloadValidationError";
  }
}

export function validateResourceDownloadInput(
  input: ResourceDownloadMutationInput,
): ValidatedResourceDownloadInput {
  if (!input || typeof input !== "object") {
    throw new ResourceDownloadValidationError("다운로드 자료 정보를 확인해 주세요.");
  }

  const title = validateRequiredText(input.title, "제목", TITLE_MAX_LENGTH);
  const sourceKey = validateManagedSourceKey(input.sourceKey);
  const description = validateText(input.description, "설명", DESCRIPTION_MAX_LENGTH);
  const fileUrl = validateHttpsUrl(input.fileUrl);
  const blobPathname = validateNullableText(
    input.blobPathname,
    "Blob 경로",
    BLOB_PATHNAME_MAX_LENGTH,
  );
  const fileName = validateRequiredText(input.fileName, "파일명", FILE_NAME_MAX_LENGTH);
  const mimeType = validateMimeType(input.mimeType);
  validateDownloadBlobReference(fileUrl, blobPathname);

  if (
    typeof input.fileSizeBytes !== "number"
    || !Number.isSafeInteger(input.fileSizeBytes)
    || input.fileSizeBytes < 0
  ) {
    throw new ResourceDownloadValidationError(
      "파일 크기는 0 이상의 안전한 정수여야 합니다.",
    );
  }

  if (
    typeof input.sortOrder !== "number"
    || !Number.isInteger(input.sortOrder)
    || input.sortOrder < SORT_ORDER_MIN
    || input.sortOrder > SORT_ORDER_MAX
  ) {
    throw new ResourceDownloadValidationError(
      `정렬 순서는 ${SORT_ORDER_MIN} 이상 ${SORT_ORDER_MAX} 이하의 정수여야 합니다.`,
    );
  }

  if (typeof input.isPublished !== "boolean") {
    throw new ResourceDownloadValidationError("공개 여부를 확인해 주세요.");
  }

  return {
    sourceKey,
    title,
    description,
    fileUrl,
    blobPathname,
    fileName,
    fileSizeBytes: input.fileSizeBytes,
    mimeType,
    sortOrder: input.sortOrder,
    isPublished: input.isPublished,
  };
}

export async function listPublishedResourceDownloads(): Promise<ResourceDownload[]> {
  return listPublishedResourceDownloadsCached();
}

const listPublishedResourceDownloadsCached = unstable_cache(async (): Promise<ResourceDownload[]> => {
  await ensureActivitySchema();

  const sql = getSql();
  const rows = await sql`
    SELECT
      id,
      source_key,
      title,
      description,
      file_url,
      file_name,
      file_size_bytes,
      mime_type,
      sort_order,
      created_at,
      updated_at
    FROM resource_downloads
    WHERE is_published = true
    ORDER BY sort_order ASC, created_at DESC
  `;

  return (rows as ResourceDownloadDatabaseRow[]).map(toPublicResourceDownload);
}, ["published-resource-downloads-v1"], {
  tags: ["resource-downloads"],
  revalidate: 300,
});

export async function listAdminResourceDownloads(): Promise<ResourceDownloadAdminRecord[]> {
  await ensureActivitySchema();
  await requireAdminSession();

  const sql = getSql();
  const rows = await sql`
    SELECT
      id,
      source_key,
      title,
      description,
      file_url,
      blob_pathname,
      file_name,
      file_size_bytes,
      mime_type,
      sort_order,
      is_published,
      created_at,
      updated_at
    FROM resource_downloads
    ORDER BY sort_order ASC, created_at DESC
  `;

  return (rows as ResourceDownloadDatabaseRow[]).map(toAdminResourceDownload);
}

export async function getAdminResourceDownload(
  id: string,
): Promise<ResourceDownloadAdminRecord | null> {
  await ensureActivitySchema();
  await requireAdminSession();

  if (!isUuid(id)) return null;
  const sql = getSql();
  const rows = await sql`
    SELECT
      id,
      source_key,
      title,
      description,
      file_url,
      blob_pathname,
      file_name,
      file_size_bytes,
      mime_type,
      sort_order,
      is_published,
      created_at,
      updated_at
    FROM resource_downloads
    WHERE id = ${id}::uuid
    LIMIT 1
  `;
  const row = rows[0] as ResourceDownloadDatabaseRow | undefined;
  return row ? toAdminResourceDownload(row) : null;
}

export async function createResourceDownload(
  input: ResourceDownloadMutationInput,
): Promise<ResourceDownloadAdminRecord> {
  await ensureActivitySchema();
  await requireAdminSession();

  const resource = validateResourceDownloadInput(input);
  const sql = getSql();
  const rows = await sql`
    INSERT INTO resource_downloads (
      source_key,
      title,
      description,
      file_url,
      blob_pathname,
      file_name,
      file_size_bytes,
      mime_type,
      sort_order,
      is_published
    )
    VALUES (
      ${resource.sourceKey},
      ${resource.title},
      ${resource.description},
      ${resource.fileUrl},
      ${resource.blobPathname},
      ${resource.fileName},
      ${resource.fileSizeBytes}::bigint,
      ${resource.mimeType},
      ${resource.sortOrder},
      ${resource.isPublished}
    )
    ON CONFLICT (source_key) DO UPDATE
    SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      file_url = EXCLUDED.file_url,
      blob_pathname = EXCLUDED.blob_pathname,
      file_name = EXCLUDED.file_name,
      file_size_bytes = EXCLUDED.file_size_bytes,
      mime_type = EXCLUDED.mime_type,
      sort_order = EXCLUDED.sort_order,
      is_published = EXCLUDED.is_published,
      updated_at = now()
    RETURNING
      id,
      source_key,
      title,
      description,
      file_url,
      blob_pathname,
      file_name,
      file_size_bytes,
      mime_type,
      sort_order,
      is_published,
      created_at,
      updated_at
  `;
  const row = rows[0] as ResourceDownloadDatabaseRow | undefined;
  if (!row) throw new Error("Resource download insert returned no row");
  return toAdminResourceDownload(row);
}

function validateManagedSourceKey(sourceKey: string | null | undefined): string | null {
  if (sourceKey == null || sourceKey === "") return null;
  if (!MANAGED_SOURCE_KEYS.has(sourceKey)) {
    throw new ResourceDownloadValidationError("관리 자료 식별값이 올바르지 않습니다.");
  }
  return sourceKey;
}

export async function updateResourceDownload(
  id: string,
  input: ResourceDownloadMutationInput,
): Promise<ResourceDownloadAdminRecord | null> {
  await ensureActivitySchema();
  await requireAdminSession();

  if (!isUuid(id)) return null;
  const resource = validateResourceDownloadInput(input);
  const sql = getSql();
  const rows = await sql`
    UPDATE resource_downloads
    SET
      title = ${resource.title},
      description = ${resource.description},
      file_url = ${resource.fileUrl},
      blob_pathname = ${resource.blobPathname},
      file_name = ${resource.fileName},
      file_size_bytes = ${resource.fileSizeBytes}::bigint,
      mime_type = ${resource.mimeType},
      sort_order = ${resource.sortOrder},
      is_published = ${resource.isPublished},
      updated_at = now()
    WHERE id = ${id}::uuid
    RETURNING
      id,
      source_key,
      title,
      description,
      file_url,
      blob_pathname,
      file_name,
      file_size_bytes,
      mime_type,
      sort_order,
      is_published,
      created_at,
      updated_at
  `;
  const row = rows[0] as ResourceDownloadDatabaseRow | undefined;
  return row ? toAdminResourceDownload(row) : null;
}

export async function deleteResourceDownload(
  id: string,
): Promise<ResourceDownloadAdminRecord | null> {
  await ensureActivitySchema();
  await requireAdminSession();

  if (!isUuid(id)) return null;
  const sql = getSql();
  const rows = await sql`
    DELETE FROM resource_downloads
    WHERE id = ${id}::uuid
    RETURNING
      id,
      source_key,
      title,
      description,
      file_url,
      blob_pathname,
      file_name,
      file_size_bytes,
      mime_type,
      sort_order,
      is_published,
      created_at,
      updated_at
  `;
  const row = rows[0] as ResourceDownloadDatabaseRow | undefined;
  return row ? toAdminResourceDownload(row) : null;
}

function toPublicResourceDownload(row: ResourceDownloadDatabaseRow): ResourceDownload {
  return {
    id: row.id,
    sourceKey: row.source_key,
    title: row.title,
    description: row.description,
    fileUrl: row.file_url,
    fileName: row.file_name,
    fileSizeBytes: toSafeNonNegativeInteger(row.file_size_bytes, "file_size_bytes"),
    mimeType: row.mime_type,
    sortOrder: toSafeInteger(row.sort_order, "sort_order"),
    createdAt: toIsoTimestamp(row.created_at, "created_at"),
    updatedAt: toIsoTimestamp(row.updated_at, "updated_at"),
  };
}

function toAdminResourceDownload(
  row: ResourceDownloadDatabaseRow,
): ResourceDownloadAdminRecord {
  return {
    ...toPublicResourceDownload(row),
    blobPathname: row.blob_pathname,
    isPublished: row.is_published,
  };
}

function validateRequiredText(value: unknown, label: string, maxLength: number): string {
  if (typeof value !== "string") {
    throw new ResourceDownloadValidationError(`${label}을(를) 확인해 주세요.`);
  }

  const normalized = value.replaceAll("\0", "").trim();
  if (normalized.length === 0 || normalized.length > maxLength) {
    throw new ResourceDownloadValidationError(
      `${label}은(는) 1자 이상 ${maxLength}자 이하여야 합니다.`,
    );
  }
  return normalized;
}

function validateText(value: unknown, label: string, maxLength: number): string {
  if (typeof value !== "string") {
    throw new ResourceDownloadValidationError(`${label}을(를) 확인해 주세요.`);
  }

  const normalized = value.replaceAll("\0", "").trim();
  if (normalized.length > maxLength) {
    throw new ResourceDownloadValidationError(
      `${label}은(는) ${maxLength}자 이하여야 합니다.`,
    );
  }
  return normalized;
}

function validateNullableText(
  value: unknown,
  label: string,
  maxLength: number,
): string | null {
  if (value == null) return null;
  if (typeof value !== "string") {
    throw new ResourceDownloadValidationError(`${label}을(를) 확인해 주세요.`);
  }

  const normalized = value.replaceAll("\0", "").trim();
  if (normalized.length === 0) return null;
  if (normalized.length > maxLength) {
    throw new ResourceDownloadValidationError(
      `${label}은(는) ${maxLength}자 이하여야 합니다.`,
    );
  }
  return normalized;
}

function validateHttpsUrl(value: unknown): string {
  const normalized = validateRequiredText(value, "파일 URL", FILE_URL_MAX_LENGTH);

  try {
    const url = new URL(normalized);
    if (url.protocol !== "https:") throw new Error("Invalid URL protocol");

    const canonicalUrl = url.toString();
    if (canonicalUrl.length > FILE_URL_MAX_LENGTH) {
      throw new Error("URL is too long after normalization");
    }
    return canonicalUrl;
  } catch {
    throw new ResourceDownloadValidationError("파일 URL은 유효한 HTTPS URL이어야 합니다.");
  }
}

function validateMimeType(value: unknown): string {
  const mimeType = validateRequiredText(value, "MIME 타입", MIME_TYPE_MAX_LENGTH)
    .toLocaleLowerCase("en-US");
  if (!MIME_TYPE_PATTERN.test(mimeType)) {
    throw new ResourceDownloadValidationError("MIME 타입 형식을 확인해 주세요.");
  }
  return mimeType;
}

function validateDownloadBlobReference(
  fileUrl: string,
  blobPathname: string | null,
): void {
  if (!blobPathname) return;

  if (
    blobPathname.length > 512
    || !DOWNLOAD_BLOB_PATH_PATTERN.test(blobPathname)
    || blobPathname.includes("..")
    || blobPathname.includes("\\")
  ) {
    throw new ResourceDownloadValidationError("Blob 경로를 확인해 주세요.");
  }

  const url = new URL(fileUrl);
  let decodedPathname: string;
  try {
    decodedPathname = decodeURIComponent(url.pathname);
  } catch {
    throw new ResourceDownloadValidationError("파일 URL과 Blob 경로를 확인해 주세요.");
  }

  if (
    !url.hostname.endsWith(VERCEL_BLOB_HOST_SUFFIX)
    || decodedPathname !== `/${blobPathname}`
  ) {
    throw new ResourceDownloadValidationError("파일 URL과 Blob 경로를 확인해 주세요.");
  }
}

function toSafeNonNegativeInteger(
  value: string | number | bigint,
  fieldName: string,
): number {
  const numberValue = toSafeInteger(value, fieldName);
  if (numberValue < 0) {
    throw new Error(`Invalid negative ${fieldName} value returned from the database`);
  }
  return numberValue;
}

function toSafeInteger(value: string | number | bigint, fieldName: string): number {
  if (
    typeof value === "string"
    && !/^-?(?:0|[1-9]\d*)$/.test(value)
  ) {
    throw new Error(`Invalid ${fieldName} value returned from the database`);
  }

  const numberValue = Number(value);
  if (!Number.isSafeInteger(numberValue)) {
    throw new Error(`Unsafe ${fieldName} value returned from the database`);
  }
  return numberValue;
}

function toIsoTimestamp(value: string | Date, fieldName: string): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid ${fieldName} value returned from the database`);
  }
  return date.toISOString();
}

function isUuid(value: unknown): value is string {
  return typeof value === "string"
    && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
