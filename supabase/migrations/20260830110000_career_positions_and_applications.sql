-- v2.2 Careers CMS: vị trí tuyển dụng + hồ sơ ứng tuyển

CREATE TABLE public.career_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  badge TEXT,
  income_label TEXT,
  description TEXT,
  schedule TEXT,
  salary TEXT,
  perks JSONB NOT NULL DEFAULT '[]'::jsonb,
  status public.publication_status NOT NULL DEFAULT 'draft',
  show_on_listing BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.career_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  position_id UUID REFERENCES public.career_positions (id) ON DELETE SET NULL,
  position_title TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  branch_id TEXT NOT NULL,
  experience TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX career_positions_listing_idx
  ON public.career_positions (status, show_on_listing, sort_order);

CREATE INDEX career_applications_created_at_idx
  ON public.career_applications (created_at DESC);

CREATE TRIGGER career_positions_set_updated_at
  BEFORE UPDATE ON public.career_positions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.career_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY career_positions_public_select ON public.career_positions
  FOR SELECT TO anon, authenticated
  USING (status = 'published'::public.publication_status);

CREATE POLICY career_positions_editor_all ON public.career_positions
  FOR ALL TO authenticated
  USING (public.is_content_editor())
  WITH CHECK (public.is_content_editor());

CREATE POLICY career_applications_editor_select ON public.career_applications
  FOR SELECT TO authenticated
  USING (public.is_content_editor());
