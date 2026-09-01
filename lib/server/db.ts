import "server-only";

import {
  neon,
  type NeonQueryFunction,
} from "@neondatabase/serverless";

type SqlClient = NeonQueryFunction<false, false>;

let sqlClient: SqlClient | null = null;
let schemaInitialization: Promise<void> | null = null;

export function isDatabaseConfigured(): boolean {
  return Boolean(getDatabaseUrl());
}

export function getSql(): SqlClient {
  if (sqlClient) return sqlClient;

  const connectionString = getDatabaseUrl();
  if (!connectionString) {
    throw new Error("Neon 데이터베이스 환경변수가 설정되지 않았습니다.");
  }

  sqlClient = neon(connectionString);
  return sqlClient;
}

function getDatabaseUrl(): string {
  return (
    process.env.DATABASE_URL
    || process.env.POSTGRES_URL
    || process.env.STORAGE_URL
    || ""
  ).trim();
}

/**
 * 첫 배포에서도 별도의 빌드 훅 없이 관리자와 관리형 콘텐츠 기능을 사용할 수 있게 합니다.
 * 프로세스별 최초 한 번만 실행하며, 실패하면 다음 요청에서 다시 시도합니다.
 * 동일한 DDL은 db/migrations/001_activities.sql과
 * db/migrations/002_managed_content.sql에도 보관합니다.
 */
export async function ensureActivitySchema(): Promise<void> {
  if (!schemaInitialization) {
    schemaInitialization = initializeActivitySchema().catch((error: unknown) => {
      schemaInitialization = null;
      throw error;
    });
  }

  await schemaInitialization;
}

async function initializeActivitySchema(): Promise<void> {
  const sql = getSql();

  await sql`
    CREATE TABLE IF NOT EXISTS activity_admins (
      id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      username varchar(64) NOT NULL UNIQUE,
      password_hash text NOT NULL,
      salt text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),
      CONSTRAINT activity_admins_username_length_check
        CHECK (char_length(username) BETWEEN 3 AND 64),
      CONSTRAINT activity_admins_username_lowercase_check
        CHECK (username = lower(username))
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS activity_sessions (
      token_hash char(64) PRIMARY KEY,
      admin_id bigint NOT NULL REFERENCES activity_admins(id) ON DELETE CASCADE,
      expires_at timestamptz NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS activity_admins_single_account_idx
      ON activity_admins ((true))
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS activity_sessions_admin_id_idx
      ON activity_sessions (admin_id)
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS activity_sessions_expires_at_idx
      ON activity_sessions (expires_at)
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS activities (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      slug varchar(180) NOT NULL UNIQUE,
      title_ko varchar(200) NOT NULL,
      title_en varchar(200) NOT NULL DEFAULT '',
      title_cn varchar(200) NOT NULL DEFAULT '',
      excerpt_ko varchar(600) NOT NULL DEFAULT '',
      excerpt_en varchar(600) NOT NULL DEFAULT '',
      excerpt_cn varchar(600) NOT NULL DEFAULT '',
      content_ko text NOT NULL,
      content_en text NOT NULL DEFAULT '',
      content_cn text NOT NULL DEFAULT '',
      category varchar(24) NOT NULL,
      cover_image_url text,
      cover_image_pathname text,
      cover_image_alt varchar(300) NOT NULL DEFAULT '',
      gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
      video_url text,
      location varchar(200),
      event_start_date date,
      event_end_date date,
      status varchar(16) NOT NULL DEFAULT 'draft',
      published_at timestamptz,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),
      CONSTRAINT activities_category_check
        CHECK (category IN ('exhibition', 'seminar', 'demonstration', 'overseas', 'other')),
      CONSTRAINT activities_status_check
        CHECK (status IN ('draft', 'published')),
      CONSTRAINT activities_published_at_check
        CHECK (status = 'draft' OR published_at IS NOT NULL),
      CONSTRAINT activities_event_dates_check
        CHECK (
          event_start_date IS NULL
          OR event_end_date IS NULL
          OR event_end_date >= event_start_date
        ),
      CONSTRAINT activities_gallery_array_check
        CHECK (jsonb_typeof(gallery) = 'array'),
      CONSTRAINT activities_gallery_size_check
        CHECK (jsonb_array_length(gallery) <= 20)
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS activities_publication_idx
      ON activities (status, published_at DESC)
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS activities_category_publication_idx
      ON activities (category, status, published_at DESC)
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS activities_updated_at_idx
      ON activities (updated_at DESC)
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS resource_downloads (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      source_key varchar(120),
      title varchar(200) NOT NULL,
      description text NOT NULL DEFAULT '',
      file_url text NOT NULL,
      blob_pathname text,
      file_name varchar(255) NOT NULL,
      file_size_bytes bigint NOT NULL,
      mime_type varchar(127) NOT NULL,
      sort_order integer NOT NULL DEFAULT 0,
      is_published boolean NOT NULL DEFAULT false,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),
      CONSTRAINT resource_downloads_title_check
        CHECK (char_length(title) BETWEEN 1 AND 200),
      CONSTRAINT resource_downloads_description_check
        CHECK (char_length(description) <= 4000),
      CONSTRAINT resource_downloads_file_url_check
        CHECK (char_length(file_url) <= 2048 AND file_url ~ '^https://'),
      CONSTRAINT resource_downloads_blob_pathname_check
        CHECK (
          blob_pathname IS NULL
          OR char_length(blob_pathname) BETWEEN 1 AND 1024
        ),
      CONSTRAINT resource_downloads_file_name_check
        CHECK (char_length(file_name) BETWEEN 1 AND 255),
      CONSTRAINT resource_downloads_file_size_check
        CHECK (file_size_bytes >= 0),
      CONSTRAINT resource_downloads_mime_type_check
        CHECK (
          char_length(mime_type) BETWEEN 1 AND 127
          AND mime_type ~ '^[A-Za-z0-9!#$&^_.+-]+/[A-Za-z0-9!#$&^_.+-]+$'
        ),
      CONSTRAINT resource_downloads_sort_order_check
        CHECK (sort_order BETWEEN -1000000 AND 1000000)
    )
  `;

  await sql`
    ALTER TABLE resource_downloads
      ADD COLUMN IF NOT EXISTS source_key varchar(120)
  `;

  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS resource_downloads_source_key_idx
      ON resource_downloads (source_key)
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS resource_downloads_public_idx
      ON resource_downloads (is_published, sort_order ASC, created_at DESC)
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS managed_content_seed_state (
      seed_key varchar(120) PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    )
  `;

  const seedRows = await sql`
    SELECT seed_key
    FROM managed_content_seed_state
    WHERE seed_key = 'bundled-resource-downloads-v1'
    LIMIT 1
  `;

  if (seedRows.length === 0) {
    await sql`
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
      VALUES
        (
          'bundled-catalog',
          'Nolan Ball 카탈로그',
          '제품 개요, 규격표, 핵심 장점',
          'https://nolanballkorea.com/downloads/nolan-ball-catalog.pdf',
          NULL,
          'nolan-ball-catalog.pdf',
          19857996,
          'application/pdf',
          10,
          true
        ),
        (
          'bundled-product-guide',
          'Nolan Ball 제품소개서',
          '제품 구조(Micro-Anatomy), 세정 메커니즘',
          'https://nolanballkorea.com/downloads/nolan-ball-product-guide.pdf',
          NULL,
          'nolan-ball-product-guide.pdf',
          28977553,
          'application/pdf',
          20,
          true
        ),
        (
          'bundled-test-report',
          '시험 성적서',
          '씨젠의료재단 일반세균배양 결과보고서 9건',
          'https://nolanballkorea.com/downloads/Nolan_Ball_시험성적.pdf',
          NULL,
          'Nolan_Ball_시험성적.pdf',
          381524,
          'application/pdf',
          30,
          true
        )
      ON CONFLICT (source_key) DO NOTHING
    `;

    await sql`
      INSERT INTO managed_content_seed_state (seed_key)
      VALUES ('bundled-resource-downloads-v1')
      ON CONFLICT (seed_key) DO NOTHING
    `;
  }

  await sql`
    CREATE TABLE IF NOT EXISTS site_media (
      content_key varchar(120) PRIMARY KEY,
      media_url text NOT NULL,
      blob_pathname text,
      original_name varchar(255) NOT NULL,
      mime_type varchar(127) NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),
      CONSTRAINT site_media_content_key_check
        CHECK (
          char_length(content_key) BETWEEN 1 AND 120
          AND content_key ~ '^[a-z0-9][a-z0-9._-]*$'
        ),
      CONSTRAINT site_media_media_url_check
        CHECK (char_length(media_url) <= 2048 AND media_url ~ '^https://'),
      CONSTRAINT site_media_blob_pathname_check
        CHECK (
          blob_pathname IS NULL
          OR char_length(blob_pathname) BETWEEN 1 AND 1024
        ),
      CONSTRAINT site_media_original_name_check
        CHECK (char_length(original_name) BETWEEN 1 AND 255),
      CONSTRAINT site_media_mime_type_check
        CHECK (
          char_length(mime_type) BETWEEN 1 AND 127
          AND mime_type ~ '^[A-Za-z0-9!#$&^_.+-]+/[A-Za-z0-9!#$&^_.+-]+$'
        )
    )
  `;
}
