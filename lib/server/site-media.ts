import "server-only";

import { requireAdminSession } from "@/lib/server/admin-auth";
import { ensureActivitySchema, getSql } from "@/lib/server/db";

export const HOW_TO_USE_GUIDE_VIDEO_KEY = "how-to-use-guide-video" as const;
export const HOW_TO_USE_GUIDE_VIDEO_MIME_TYPES = [
  "video/mp4",
  "video/webm",
] as const;

const GUIDE_VIDEO_BLOB_PATH_PATTERN =
  /^site\/how-to-use\/videos\/[A-Za-z0-9][A-Za-z0-9._-]*\.(mp4|webm)$/;
const VERCEL_BLOB_HOST_SUFFIX = ".blob.vercel-storage.com";

export type HowToUseGuideVideoMimeType =
  (typeof HOW_TO_USE_GUIDE_VIDEO_MIME_TYPES)[number];

export type SiteMediaRecord = {
  contentKey: typeof HOW_TO_USE_GUIDE_VIDEO_KEY;
  mediaUrl: string;
  blobPathname: string | null;
  originalName: string;
  mimeType: HowToUseGuideVideoMimeType;
  createdAt: string;
  updatedAt: string;
};

export type SiteMediaMutationInput = {
  mediaUrl: string;
  blobPathname?: string | null;
  originalName: string;
  mimeType: string;
};

export class SiteMediaValidationError extends Error {
  readonly code = "SITE_MEDIA_VALIDATION_ERROR";

  constructor(message = "사이트 미디어 정보를 확인해 주세요.") {
    super(message);
    this.name = "SiteMediaValidationError";
  }
}

type SiteMediaRow = {
  content_key: string;
  media_url: string;
  blob_pathname: string | null;
  original_name: string;
  mime_type: string;
  created_at: string | Date;
  updated_at: string | Date;
};

type NormalizedSiteMediaInput = {
  mediaUrl: string;
  blobPathname: string | null;
  originalName: string;
  mimeType: HowToUseGuideVideoMimeType;
};

export async function getHowToUseGuideVideo(): Promise<SiteMediaRecord | null> {
  await ensureActivitySchema();

  const sql = getSql();
  const rows = await sql`
    SELECT
      content_key,
      media_url,
      blob_pathname,
      original_name,
      mime_type,
      created_at,
      updated_at
    FROM site_media
    WHERE content_key = ${HOW_TO_USE_GUIDE_VIDEO_KEY}
    LIMIT 1
  `;
  const row = rows[0] as SiteMediaRow | undefined;
  return row ? toSiteMediaRecord(row) : null;
}

export async function upsertHowToUseGuideVideo(
  input: SiteMediaMutationInput,
): Promise<SiteMediaRecord> {
  await ensureActivitySchema();
  await requireAdminSession();

  const media = validateSiteMediaInput(input);
  const sql = getSql();
  const rows = await sql`
    INSERT INTO site_media (
      content_key,
      media_url,
      blob_pathname,
      original_name,
      mime_type
    )
    VALUES (
      ${HOW_TO_USE_GUIDE_VIDEO_KEY},
      ${media.mediaUrl},
      ${media.blobPathname},
      ${media.originalName},
      ${media.mimeType}
    )
    ON CONFLICT (content_key) DO UPDATE
    SET
      media_url = EXCLUDED.media_url,
      blob_pathname = EXCLUDED.blob_pathname,
      original_name = EXCLUDED.original_name,
      mime_type = EXCLUDED.mime_type,
      updated_at = now()
    RETURNING
      content_key,
      media_url,
      blob_pathname,
      original_name,
      mime_type,
      created_at,
      updated_at
  `;
  const row = rows[0] as SiteMediaRow | undefined;
  if (!row) throw new Error("Site media upsert returned no row");
  return toSiteMediaRecord(row);
}

export async function deleteHowToUseGuideVideo(): Promise<SiteMediaRecord | null> {
  await ensureActivitySchema();
  await requireAdminSession();

  const sql = getSql();
  const rows = await sql`
    DELETE FROM site_media
    WHERE content_key = ${HOW_TO_USE_GUIDE_VIDEO_KEY}
    RETURNING
      content_key,
      media_url,
      blob_pathname,
      original_name,
      mime_type,
      created_at,
      updated_at
  `;
  const row = rows[0] as SiteMediaRow | undefined;
  return row ? toSiteMediaRecord(row) : null;
}

function validateSiteMediaInput(
  input: SiteMediaMutationInput,
): NormalizedSiteMediaInput {
  if (!input || typeof input !== "object") {
    throw new SiteMediaValidationError();
  }

  const mediaUrl = httpsUrl(input.mediaUrl, "영상 주소");
  const blobPathname = optionalText(
    input.blobPathname,
    "Blob 경로",
    1024,
  );
  const originalName = requiredText(input.originalName, "원본 파일명", 255);
  const mimeType = normalizeGuideVideoMimeType(input.mimeType);
  validateGuideVideoBlobReference(mediaUrl, blobPathname, mimeType);

  return { mediaUrl, blobPathname, originalName, mimeType };
}

function httpsUrl(value: unknown, label: string): string {
  const normalized = requiredText(value, label, 2048);

  try {
    const url = new URL(normalized);
    if (url.protocol !== "https:") throw new Error("Unsupported protocol");

    const serialized = url.toString();
    if (serialized.length > 2048) throw new Error("URL too long");
    return serialized;
  } catch {
    throw new SiteMediaValidationError(`${label}는 HTTPS 주소여야 합니다.`);
  }
}

function requiredText(value: unknown, label: string, maxLength: number): string {
  const normalized = optionalText(value, label, maxLength);
  if (!normalized) {
    throw new SiteMediaValidationError(`${label}을(를) 입력해 주세요.`);
  }
  return normalized;
}

function optionalText(
  value: unknown,
  label: string,
  maxLength: number,
): string | null {
  if (value == null || value === "") return null;
  if (typeof value !== "string") {
    throw new SiteMediaValidationError(`${label} 형식을 확인해 주세요.`);
  }

  const normalized = value.replaceAll("\0", "").trim();
  if (!normalized) return null;
  if (normalized.length > maxLength) {
    throw new SiteMediaValidationError(`${label}이(가) 너무 깁니다.`);
  }
  return normalized;
}

function normalizeGuideVideoMimeType(value: unknown): HowToUseGuideVideoMimeType {
  if (typeof value !== "string") {
    throw new SiteMediaValidationError("영상 파일 형식을 확인해 주세요.");
  }

  const mimeType = value.trim().toLocaleLowerCase("en-US");
  if (!HOW_TO_USE_GUIDE_VIDEO_MIME_TYPES.some((item) => item === mimeType)) {
    throw new SiteMediaValidationError("MP4 또는 WebM 영상만 등록할 수 있습니다.");
  }
  return mimeType as HowToUseGuideVideoMimeType;
}

function validateGuideVideoBlobReference(
  mediaUrl: string,
  blobPathname: string | null,
  mimeType: HowToUseGuideVideoMimeType,
): void {
  if (!blobPathname) return;

  const pathMatch = GUIDE_VIDEO_BLOB_PATH_PATTERN.exec(blobPathname);
  const expectedExtension = mimeType === "video/webm" ? "webm" : "mp4";
  if (
    !pathMatch
    || blobPathname.includes("..")
    || blobPathname.includes("\\")
    || pathMatch[1] !== expectedExtension
  ) {
    throw new SiteMediaValidationError("영상 Blob 경로를 확인해 주세요.");
  }

  const url = new URL(mediaUrl);
  let decodedPathname: string;
  try {
    decodedPathname = decodeURIComponent(url.pathname);
  } catch {
    throw new SiteMediaValidationError("영상 주소와 Blob 경로를 확인해 주세요.");
  }

  if (
    !url.hostname.endsWith(VERCEL_BLOB_HOST_SUFFIX)
    || decodedPathname !== `/${blobPathname}`
  ) {
    throw new SiteMediaValidationError("영상 주소와 Blob 경로를 확인해 주세요.");
  }
}

function toSiteMediaRecord(row: SiteMediaRow): SiteMediaRecord {
  if (
    row.content_key !== HOW_TO_USE_GUIDE_VIDEO_KEY
    || !HOW_TO_USE_GUIDE_VIDEO_MIME_TYPES.some((item) => item === row.mime_type)
  ) {
    throw new Error("Stored site media record is invalid");
  }

  return {
    contentKey: HOW_TO_USE_GUIDE_VIDEO_KEY,
    mediaUrl: row.media_url,
    blobPathname: row.blob_pathname,
    originalName: row.original_name,
    mimeType: row.mime_type as HowToUseGuideVideoMimeType,
    createdAt: toIsoTimestamp(row.created_at),
    updatedAt: toIsoTimestamp(row.updated_at),
  };
}

function toIsoTimestamp(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Stored site media timestamp is invalid");
  }
  return date.toISOString();
}
