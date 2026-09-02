BEGIN;

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
);

ALTER TABLE resource_downloads
  ADD COLUMN IF NOT EXISTS source_key varchar(120);

CREATE UNIQUE INDEX IF NOT EXISTS resource_downloads_source_key_idx
  ON resource_downloads (source_key);

CREATE INDEX IF NOT EXISTS resource_downloads_public_idx
  ON resource_downloads (is_published, sort_order ASC, created_at DESC);

CREATE TABLE IF NOT EXISTS managed_content_seed_state (
  seed_key varchar(120) PRIMARY KEY,
  applied_at timestamptz NOT NULL DEFAULT now()
);

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
SELECT *
FROM (
  VALUES
    ('bundled-catalog', 'Nolan Ball 카탈로그', '제품 개요, 규격표, 핵심 장점', 'https://nolanballkorea.com/downloads/nolan-ball-catalog.pdf', NULL::text, 'nolan-ball-catalog.pdf', 19857996::bigint, 'application/pdf', 1, true),
    ('bundled-product-guide', 'Nolan Ball 제품소개서', '제품 구조(Micro-Anatomy), 세정 메커니즘', 'https://nolanballkorea.com/downloads/nolan-ball-product-guide.pdf', NULL::text, 'nolan-ball-product-guide.pdf', 28977553::bigint, 'application/pdf', 2, true),
    ('bundled-test-report', '시험 성적서', '씨젠의료재단 일반세균배양 결과보고서 9건', 'https://nolanballkorea.com/downloads/Nolan_Ball_시험성적.pdf', NULL::text, 'Nolan_Ball_시험성적.pdf', 381524::bigint, 'application/pdf', 3, true)
) AS seed(source_key, title, description, file_url, blob_pathname, file_name, file_size_bytes, mime_type, sort_order, is_published)
WHERE NOT EXISTS (
  SELECT 1
  FROM managed_content_seed_state
  WHERE seed_key = 'bundled-resource-downloads-v1'
)
ON CONFLICT (source_key) DO NOTHING;

INSERT INTO managed_content_seed_state (seed_key)
VALUES ('bundled-resource-downloads-v1')
ON CONFLICT (seed_key) DO NOTHING;

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
);

COMMIT;
