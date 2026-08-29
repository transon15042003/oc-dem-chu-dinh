-- v2.0 Content System: profiles, articles, promotions, storage

CREATE TYPE public.user_role AS ENUM ('admin', 'editor');
CREATE TYPE public.publication_status AS ENUM ('draft', 'published');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role public.user_role NOT NULL DEFAULT 'editor',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  body TEXT NOT NULL DEFAULT '',
  cover_image_url TEXT,
  status public.publication_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  author_id UUID REFERENCES public.profiles (id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  body TEXT NOT NULL DEFAULT '',
  cover_image_url TEXT,
  status public.publication_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  discount_label TEXT,
  promo_code TEXT,
  author_id UUID REFERENCES public.profiles (id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT promotions_dates_check CHECK (ends_at > starts_at)
);

CREATE INDEX articles_status_published_at_idx ON public.articles (status, published_at DESC);
CREATE INDEX promotions_active_idx ON public.promotions (status, starts_at, ends_at);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER articles_set_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER promotions_set_updated_at
  BEFORE UPDATE ON public.promotions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'editor');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS public.user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.current_user_role() = 'admin'::public.user_role;
$$;

CREATE OR REPLACE FUNCTION public.is_content_editor()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.current_user_role() IN ('admin'::public.user_role, 'editor'::public.user_role);
$$;

REVOKE ALL ON FUNCTION public.current_user_role() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_content_editor() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.current_user_role() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_content_editor() TO authenticated;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;

CREATE POLICY profiles_select_own ON public.profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.is_admin());

CREATE POLICY profiles_update_own_name ON public.profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY profiles_admin_manage ON public.profiles
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY articles_public_select ON public.articles
  FOR SELECT TO anon, authenticated
  USING (status = 'published'::public.publication_status);

CREATE POLICY articles_editor_select ON public.articles
  FOR SELECT TO authenticated
  USING (public.is_content_editor());

CREATE POLICY articles_editor_insert ON public.articles
  FOR INSERT TO authenticated
  WITH CHECK (public.is_content_editor());

CREATE POLICY articles_editor_update ON public.articles
  FOR UPDATE TO authenticated
  USING (public.is_content_editor())
  WITH CHECK (public.is_content_editor());

CREATE POLICY articles_editor_delete ON public.articles
  FOR DELETE TO authenticated
  USING (public.is_content_editor());

CREATE POLICY promotions_public_select ON public.promotions
  FOR SELECT TO anon, authenticated
  USING (
    status = 'published'::public.publication_status
    AND starts_at <= now()
    AND ends_at > now()
  );

CREATE POLICY promotions_editor_select ON public.promotions
  FOR SELECT TO authenticated
  USING (public.is_content_editor());

CREATE POLICY promotions_editor_insert ON public.promotions
  FOR INSERT TO authenticated
  WITH CHECK (public.is_content_editor());

CREATE POLICY promotions_editor_update ON public.promotions
  FOR UPDATE TO authenticated
  USING (public.is_content_editor())
  WITH CHECK (public.is_content_editor());

CREATE POLICY promotions_editor_delete ON public.promotions
  FOR DELETE TO authenticated
  USING (public.is_content_editor());

INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('content-images', 'content-images', true, 2097152)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public, file_size_limit = EXCLUDED.file_size_limit;

CREATE POLICY content_images_public_read ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'content-images');

CREATE POLICY content_images_editor_insert ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'content-images' AND public.is_content_editor());

CREATE POLICY content_images_editor_update ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'content-images' AND public.is_content_editor())
  WITH CHECK (bucket_id = 'content-images' AND public.is_content_editor());

CREATE POLICY content_images_editor_delete ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'content-images' AND public.is_content_editor());
