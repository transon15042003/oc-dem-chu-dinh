-- Public bucket for mirrored site assets (logo, menu, branch photos, hero banners).

INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('site-assets', 'site-assets', true, 52428800)
ON CONFLICT (id) DO UPDATE
SET public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit;

CREATE POLICY site_assets_public_read ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'site-assets');

CREATE POLICY site_assets_service_insert ON storage.objects
  FOR INSERT TO service_role
  WITH CHECK (bucket_id = 'site-assets');

CREATE POLICY site_assets_service_update ON storage.objects
  FOR UPDATE TO service_role
  USING (bucket_id = 'site-assets')
  WITH CHECK (bucket_id = 'site-assets');
