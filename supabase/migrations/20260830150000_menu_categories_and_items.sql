-- v2.4 Menu Admin: danh mục + món ăn

CREATE TABLE public.menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  status public.publication_status NOT NULL DEFAULT 'published',
  show_in_filter BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES public.menu_categories (id) ON DELETE RESTRICT,
  image_path TEXT NOT NULL,
  is_hot BOOLEAN NOT NULL DEFAULT false,
  search_terms TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  status public.publication_status NOT NULL DEFAULT 'published',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX menu_categories_listing_idx
  ON public.menu_categories (status, sort_order);

CREATE INDEX menu_items_category_idx
  ON public.menu_items (category_id, status, sort_order);

CREATE TRIGGER menu_categories_set_updated_at
  BEFORE UPDATE ON public.menu_categories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER menu_items_set_updated_at
  BEFORE UPDATE ON public.menu_items
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY menu_categories_public_select ON public.menu_categories
  FOR SELECT TO anon, authenticated
  USING (status = 'published'::public.publication_status);

CREATE POLICY menu_categories_editor_all ON public.menu_categories
  FOR ALL TO authenticated
  USING (public.is_content_editor())
  WITH CHECK (public.is_content_editor());

CREATE POLICY menu_items_public_select ON public.menu_items
  FOR SELECT TO anon, authenticated
  USING (status = 'published'::public.publication_status);

CREATE POLICY menu_items_editor_all ON public.menu_items
  FOR ALL TO authenticated
  USING (public.is_content_editor())
  WITH CHECK (public.is_content_editor());
