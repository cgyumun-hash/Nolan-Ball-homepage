import "server-only";

import { randomUUID } from "node:crypto";
import { unstable_cache } from "next/cache";

import {
  ACTIVITIES_PAGE_SIZE,
  ActivityValidationError,
  normalizeActivityLocale,
  selectLocalizedActivityText,
  slugifyActivityTitle,
  validateActivityInput,
  validatePublishedActivityListOptions,
  type ActivityAdminRecord,
  type ActivityCategory,
  type ActivityDetail,
  type ActivityGallery,
  type ActivityListItem,
  type ActivityLocale,
  type ActivityMutationInput,
  type ActivitySort,
  type PublishedActivityList,
  type PublishedActivityListOptions,
} from "@/lib/activities";
import { requireAdminSession } from "@/lib/server/admin-auth";
import { ensureActivitySchema, getSql } from "@/lib/server/db";

type ActivityDatabaseRow = {
  id: string;
  slug: string;
  title_ko: string;
  title_en: string;
  title_cn: string;
  excerpt_ko: string;
  excerpt_en: string;
  excerpt_cn: string;
  content_ko: string;
  content_en: string;
  content_cn: string;
  category: ActivityCategory;
  cover_image_url: string | null;
  cover_image_pathname: string | null;
  cover_image_alt: string;
  gallery: unknown;
  video_url: string | null;
  location: string | null;
  event_start_date: string | Date | null;
  event_end_date: string | Date | null;
  status: "draft" | "published";
  published_at: string | Date | null;
  created_at: string | Date;
  updated_at: string | Date;
};

type PublishedListRow = Pick<
  ActivityDatabaseRow,
  | "id"
  | "slug"
  | "title_ko"
  | "title_en"
  | "title_cn"
  | "excerpt_ko"
  | "excerpt_en"
  | "excerpt_cn"
  | "category"
  | "cover_image_url"
  | "cover_image_alt"
  | "location"
  | "event_start_date"
  | "event_end_date"
  | "published_at"
>;

type PublishedDetailRow = PublishedListRow & Pick<
  ActivityDatabaseRow,
  "content_ko" | "content_en" | "content_cn" | "gallery" | "video_url"
>;

export async function listPublishedActivities(
  options: PublishedActivityListOptions = {},
): Promise<PublishedActivityList> {
  const { page: requestedPage, category, sort, locale } =
    validatePublishedActivityListOptions(options);
  return listPublishedActivitiesCached(requestedPage, category, sort, locale);
}

const listPublishedActivitiesCached = unstable_cache(
  async (
    requestedPage: number,
    category: ActivityCategory | null,
    sort: ActivitySort,
    locale: ActivityLocale,
  ): Promise<PublishedActivityList> => {
  await ensureActivitySchema();

  const sql = getSql();
  const requestedOffset = (requestedPage - 1) * ACTIVITIES_PAGE_SIZE;
  const countPromise = category
    ? sql`
        SELECT count(*)::int AS total
        FROM activities
        WHERE status = 'published'
          AND published_at <= now()
          AND category = ${category}
      `
    : sql`
        SELECT count(*)::int AS total
        FROM activities
        WHERE status = 'published'
          AND published_at <= now()
      `;
  const rowsPromise = queryPublishedList(
    category,
    sort,
    ACTIVITIES_PAGE_SIZE,
    requestedOffset,
  );
  const [countRows, requestedRows] = await Promise.all([countPromise, rowsPromise]);
  const total = Number(countRows[0]?.total ?? 0);
  const totalPages = Math.max(1, Math.ceil(total / ACTIVITIES_PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);
  const offset = (page - 1) * ACTIVITIES_PAGE_SIZE;
  const rows = page === requestedPage
    ? requestedRows
    : await queryPublishedList(category, sort, ACTIVITIES_PAGE_SIZE, offset);

  return {
    items: (rows as PublishedListRow[]).map((row) => toPublishedListItem(row, locale)),
    total,
    page,
    totalPages,
  };
  },
  ["published-activities-v1"],
  { tags: ["activities"], revalidate: 300 },
);

export async function getPublishedActivityBySlug(
  slug: string,
  locale: ActivityLocale = "ko",
): Promise<ActivityDetail | null> {
  if (typeof slug !== "string" || slug.length === 0 || slug.length > 180) return null;
  const normalizedSlug = slugifyActivityTitle(slug);
  const normalizedLocale = normalizeActivityLocale(locale);
  return getPublishedActivityBySlugCached(normalizedSlug, normalizedLocale);
}

const getPublishedActivityBySlugCached = unstable_cache(
  async (
    normalizedSlug: string,
    normalizedLocale: ActivityLocale,
  ): Promise<ActivityDetail | null> => {
  await ensureActivitySchema();

  const sql = getSql();
  const rows = await sql`
    SELECT
      id,
      slug,
      title_ko,
      title_en,
      title_cn,
      excerpt_ko,
      excerpt_en,
      excerpt_cn,
      content_ko,
      content_en,
      content_cn,
      category,
      cover_image_url,
      cover_image_alt,
      gallery,
      video_url,
      location,
      event_start_date,
      event_end_date,
      published_at
    FROM activities
    WHERE slug = ${normalizedSlug}
      AND status = 'published'
      AND published_at <= now()
    LIMIT 1
  `;
  const row = rows[0] as PublishedDetailRow | undefined;
  if (!row) return null;

  const listItem = toPublishedListItem(row, normalizedLocale);
  return {
    ...listItem,
    content: selectLocalizedActivityText(
      { ko: row.content_ko, en: row.content_en, cn: row.content_cn },
      normalizedLocale,
    ),
    gallery: normalizeStoredGallery(row.gallery),
    videoUrl: row.video_url,
  };
  },
  ["published-activity-detail-v1"],
  { tags: ["activities"], revalidate: 300 },
);

export async function listAdminActivities(): Promise<ActivityAdminRecord[]> {
  await ensureActivitySchema();
  await requireAdminSession();

  const sql = getSql();
  const rows = await sql`
    SELECT
      id,
      slug,
      title_ko,
      title_en,
      title_cn,
      excerpt_ko,
      excerpt_en,
      excerpt_cn,
      content_ko,
      content_en,
      content_cn,
      category,
      cover_image_url,
      cover_image_pathname,
      cover_image_alt,
      gallery,
      video_url,
      location,
      event_start_date,
      event_end_date,
      status,
      published_at,
      created_at,
      updated_at
    FROM activities
    ORDER BY updated_at DESC, created_at DESC
  `;

  return (rows as ActivityDatabaseRow[]).map(toAdminActivity);
}

export async function getAdminActivity(id: string): Promise<ActivityAdminRecord | null> {
  await ensureActivitySchema();
  await requireAdminSession();

  if (!isUuid(id)) return null;
  const sql = getSql();
  const rows = await sql`
    SELECT
      id,
      slug,
      title_ko,
      title_en,
      title_cn,
      excerpt_ko,
      excerpt_en,
      excerpt_cn,
      content_ko,
      content_en,
      content_cn,
      category,
      cover_image_url,
      cover_image_pathname,
      cover_image_alt,
      gallery,
      video_url,
      location,
      event_start_date,
      event_end_date,
      status,
      published_at,
      created_at,
      updated_at
    FROM activities
    WHERE id = ${id}::uuid
    LIMIT 1
  `;
  const row = rows[0] as ActivityDatabaseRow | undefined;
  return row ? toAdminActivity(row) : null;
}

export async function createActivity(
  input: ActivityMutationInput,
): Promise<ActivityAdminRecord> {
  await ensureActivitySchema();
  await requireAdminSession();

  const activity = validateActivityInput(input);
  const sql = getSql();
  const slug = await resolveUniqueSlug(
    activity.slug ?? slugifyActivityTitle(activity.titleKo),
    activity.slug !== null,
  );
  const publishedAt = activity.status === "published"
    ? activity.publishedAt ?? new Date().toISOString()
    : null;

  try {
    const rows = await sql`
      INSERT INTO activities (
        slug,
        title_ko,
        title_en,
        title_cn,
        excerpt_ko,
        excerpt_en,
        excerpt_cn,
        content_ko,
        content_en,
        content_cn,
        category,
        cover_image_url,
        cover_image_pathname,
        cover_image_alt,
        gallery,
        video_url,
        location,
        event_start_date,
        event_end_date,
        status,
        published_at
      )
      VALUES (
        ${slug},
        ${activity.titleKo},
        ${activity.titleEn},
        ${activity.titleCn},
        ${activity.excerptKo},
        ${activity.excerptEn},
        ${activity.excerptCn},
        ${activity.contentKo},
        ${activity.contentEn},
        ${activity.contentCn},
        ${activity.category},
        ${activity.coverImageUrl},
        ${activity.coverImagePathname},
        ${activity.coverImageAlt},
        ${JSON.stringify(activity.gallery)}::jsonb,
        ${activity.videoUrl},
        ${activity.location},
        ${activity.eventStartDate}::date,
        ${activity.eventEndDate}::date,
        ${activity.status},
        ${publishedAt}::timestamptz
      )
      RETURNING *
    `;
    const row = rows[0] as ActivityDatabaseRow | undefined;
    if (!row) throw new Error("Activity insert returned no row");
    return toAdminActivity(row);
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new ActivityValidationError("이미 사용 중인 활동 주소입니다.");
    }
    throw error;
  }
}

export async function updateActivity(
  id: string,
  input: ActivityMutationInput,
): Promise<ActivityAdminRecord | null> {
  await ensureActivitySchema();
  await requireAdminSession();

  if (!isUuid(id)) return null;
  const activity = validateActivityInput(input);
  const sql = getSql();
  const existingRows = await sql`
    SELECT id, slug, status, published_at
    FROM activities
    WHERE id = ${id}::uuid
    LIMIT 1
  `;
  const existing = existingRows[0] as Pick<
    ActivityDatabaseRow,
    "id" | "slug" | "status" | "published_at"
  > | undefined;
  if (!existing) return null;

  const requestedSlug = activity.slug ?? existing.slug;
  const slug = requestedSlug === existing.slug
    ? existing.slug
    : await resolveUniqueSlug(requestedSlug, activity.slug !== null, id);
  const publishedAt = activity.status === "published"
    ? activity.publishedAt
      ?? (existing.status === "published" && existing.published_at
        ? toIsoTimestamp(existing.published_at)
        : new Date().toISOString())
    : null;

  try {
    const rows = await sql`
      UPDATE activities
      SET
        slug = ${slug},
        title_ko = ${activity.titleKo},
        title_en = ${activity.titleEn},
        title_cn = ${activity.titleCn},
        excerpt_ko = ${activity.excerptKo},
        excerpt_en = ${activity.excerptEn},
        excerpt_cn = ${activity.excerptCn},
        content_ko = ${activity.contentKo},
        content_en = ${activity.contentEn},
        content_cn = ${activity.contentCn},
        category = ${activity.category},
        cover_image_url = ${activity.coverImageUrl},
        cover_image_pathname = ${activity.coverImagePathname},
        cover_image_alt = ${activity.coverImageAlt},
        gallery = ${JSON.stringify(activity.gallery)}::jsonb,
        video_url = ${activity.videoUrl},
        location = ${activity.location},
        event_start_date = ${activity.eventStartDate}::date,
        event_end_date = ${activity.eventEndDate}::date,
        status = ${activity.status},
        published_at = ${publishedAt}::timestamptz,
        updated_at = now()
      WHERE id = ${id}::uuid
      RETURNING *
    `;
    const row = rows[0] as ActivityDatabaseRow | undefined;
    return row ? toAdminActivity(row) : null;
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new ActivityValidationError("이미 사용 중인 활동 주소입니다.");
    }
    throw error;
  }
}

export async function deleteActivity(id: string): Promise<ActivityAdminRecord | null> {
  await ensureActivitySchema();
  await requireAdminSession();

  if (!isUuid(id)) return null;
  const sql = getSql();
  const rows = await sql`
    DELETE FROM activities
    WHERE id = ${id}::uuid
    RETURNING *
  `;
  const row = rows[0] as ActivityDatabaseRow | undefined;
  return row ? toAdminActivity(row) : null;
}

async function queryPublishedList(
  category: ActivityCategory | null,
  sort: ActivitySort,
  limit: number,
  offset: number,
) {
  const sql = getSql();

  if (category && sort === "oldest") {
    return sql`
      SELECT
        id, slug, title_ko, title_en, title_cn,
        excerpt_ko, excerpt_en, excerpt_cn, category,
        cover_image_url, cover_image_alt, location,
        event_start_date, event_end_date, published_at
      FROM activities
      WHERE status = 'published'
        AND published_at <= now()
        AND category = ${category}
      ORDER BY published_at ASC, id ASC
      LIMIT ${limit} OFFSET ${offset}
    `;
  }

  if (category) {
    return sql`
      SELECT
        id, slug, title_ko, title_en, title_cn,
        excerpt_ko, excerpt_en, excerpt_cn, category,
        cover_image_url, cover_image_alt, location,
        event_start_date, event_end_date, published_at
      FROM activities
      WHERE status = 'published'
        AND published_at <= now()
        AND category = ${category}
      ORDER BY published_at DESC, id DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
  }

  if (sort === "oldest") {
    return sql`
      SELECT
        id, slug, title_ko, title_en, title_cn,
        excerpt_ko, excerpt_en, excerpt_cn, category,
        cover_image_url, cover_image_alt, location,
        event_start_date, event_end_date, published_at
      FROM activities
      WHERE status = 'published'
        AND published_at <= now()
      ORDER BY published_at ASC, id ASC
      LIMIT ${limit} OFFSET ${offset}
    `;
  }

  return sql`
    SELECT
      id, slug, title_ko, title_en, title_cn,
      excerpt_ko, excerpt_en, excerpt_cn, category,
      cover_image_url, cover_image_alt, location,
      event_start_date, event_end_date, published_at
    FROM activities
    WHERE status = 'published'
      AND published_at <= now()
    ORDER BY published_at DESC, id DESC
    LIMIT ${limit} OFFSET ${offset}
  `;
}

async function resolveUniqueSlug(
  baseSlug: string,
  rejectDuplicate: boolean,
  excludeId?: string,
): Promise<string> {
  const sql = getSql();
  const normalizedBase = slugifyActivityTitle(baseSlug);

  if (!(await activitySlugExists(normalizedBase, excludeId))) return normalizedBase;
  if (rejectDuplicate) {
    throw new ActivityValidationError("이미 사용 중인 활동 주소입니다.");
  }

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const suffix = randomUUID().slice(0, 8);
    const candidate = `${normalizedBase.slice(0, 171).replace(/-+$/g, "")}-${suffix}`;
    const rows = excludeId
      ? await sql`
          SELECT EXISTS (
            SELECT 1 FROM activities WHERE slug = ${candidate} AND id <> ${excludeId}::uuid
          ) AS exists
        `
      : await sql`
          SELECT EXISTS (SELECT 1 FROM activities WHERE slug = ${candidate}) AS exists
        `;
    if (rows[0]?.exists !== true) return candidate;
  }

  throw new ActivityValidationError("활동 주소를 만들 수 없습니다. 다시 시도해 주세요.");
}

async function activitySlugExists(slug: string, excludeId?: string): Promise<boolean> {
  const sql = getSql();
  const rows = excludeId
    ? await sql`
        SELECT EXISTS (
          SELECT 1 FROM activities WHERE slug = ${slug} AND id <> ${excludeId}::uuid
        ) AS exists
      `
    : await sql`
        SELECT EXISTS (SELECT 1 FROM activities WHERE slug = ${slug}) AS exists
      `;
  return rows[0]?.exists === true;
}

function toPublishedListItem(
  row: PublishedListRow,
  locale: ActivityLocale,
): ActivityListItem {
  const title = selectLocalizedActivityText(
    { ko: row.title_ko, en: row.title_en, cn: row.title_cn },
    locale,
  );

  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    title,
    excerpt: selectLocalizedActivityText(
      { ko: row.excerpt_ko, en: row.excerpt_en, cn: row.excerpt_cn },
      locale,
    ),
    coverImageUrl: row.cover_image_url,
    coverImageAlt: row.cover_image_alt.trim() || title,
    eventStartDate: toDateOnly(row.event_start_date),
    eventEndDate: toDateOnly(row.event_end_date),
    publishedAt: toIsoTimestamp(row.published_at),
    location: row.location,
  };
}

function toAdminActivity(row: ActivityDatabaseRow): ActivityAdminRecord {
  return {
    id: row.id,
    slug: row.slug,
    titleKo: row.title_ko,
    titleEn: row.title_en,
    titleCn: row.title_cn,
    excerptKo: row.excerpt_ko,
    excerptEn: row.excerpt_en,
    excerptCn: row.excerpt_cn,
    contentKo: row.content_ko,
    contentEn: row.content_en,
    contentCn: row.content_cn,
    category: row.category,
    coverImageUrl: row.cover_image_url,
    coverImagePathname: row.cover_image_pathname,
    coverImageAlt: row.cover_image_alt,
    gallery: normalizeStoredGallery(row.gallery),
    videoUrl: row.video_url,
    location: row.location,
    eventStartDate: toDateOnly(row.event_start_date),
    eventEndDate: toDateOnly(row.event_end_date),
    status: row.status,
    publishedAt: row.published_at ? toIsoTimestamp(row.published_at) : null,
    createdAt: toIsoTimestamp(row.created_at),
    updatedAt: toIsoTimestamp(row.updated_at),
  };
}

function normalizeStoredGallery(value: unknown): ActivityGallery {
  let candidate = value;
  if (typeof candidate === "string") {
    try {
      candidate = JSON.parse(candidate) as unknown;
    } catch {
      return [];
    }
  }

  if (!Array.isArray(candidate)) return [];
  return candidate
    .filter((item): item is string => typeof item === "string")
    .slice(0, 20);
}

function toDateOnly(value: string | Date | null): string | null {
  if (value == null) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return value.slice(0, 10);
}

function toIsoTimestamp(value: string | Date | null): string {
  if (value == null) return new Date(0).toISOString();
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString();
}

function isUuid(value: unknown): value is string {
  return typeof value === "string"
    && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function isUniqueViolation(error: unknown): boolean {
  return typeof error === "object"
    && error !== null
    && "code" in error
    && (error as { code?: unknown }).code === "23505";
}
