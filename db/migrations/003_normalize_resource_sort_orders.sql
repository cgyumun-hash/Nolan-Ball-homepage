BEGIN;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM managed_content_seed_state
    WHERE seed_key = 'bundled-resource-sort-order-v2'
  ) THEN
    UPDATE resource_downloads
    SET
      sort_order = CASE source_key
        WHEN 'bundled-catalog' THEN 1
        WHEN 'bundled-product-guide' THEN 2
        WHEN 'bundled-test-report' THEN 3
        WHEN 'bundled-ifu' THEN 4
        ELSE sort_order
      END,
      updated_at = now()
    WHERE
      (source_key = 'bundled-catalog' AND sort_order = 10)
      OR (source_key = 'bundled-product-guide' AND sort_order = 20)
      OR (source_key = 'bundled-test-report' AND sort_order = 30)
      OR (source_key = 'bundled-ifu' AND sort_order = 40);

    INSERT INTO managed_content_seed_state (seed_key)
    VALUES ('bundled-resource-sort-order-v2')
    ON CONFLICT (seed_key) DO NOTHING;
  END IF;
END
$$;

COMMIT;
