import "server-only";

import {
  neon,
  type NeonQueryFunction,
} from "@neondatabase/serverless";

type SqlClient = NeonQueryFunction<false, false>;

let sqlClient: SqlClient | null = null;
let schemaInitialization: Promise<void> | null = null;

export function getSql(): SqlClient {
  if (sqlClient) return sqlClient;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL 환경변수가 설정되지 않았습니다.");
  }

  sqlClient = neon(connectionString);
  return sqlClient;
}

/**
 * 첫 배포에서도 별도의 빌드 훅 없이 관리자와 활동 기능을 사용할 수 있게 합니다.
 * 프로세스별 최초 한 번만 실행하며, 실패하면 다음 요청에서 다시 시도합니다.
 * 동일한 DDL은 db/migrations/001_activities.sql에도 보관합니다.
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
}
