-- Article taxonomy for tin-tuc filters (matches original site categories)

CREATE TYPE public.content_category AS ENUM (
  'khuyen-mai-uu-dai',
  'tin-tuc-nha-hang',
  'bi-quyet-am-thuc'
);

ALTER TABLE public.articles
  ADD COLUMN category public.content_category,
  ADD COLUMN is_featured BOOLEAN NOT NULL DEFAULT false;

UPDATE public.articles
SET category = 'khuyen-mai-uu-dai'::public.content_category,
    is_featured = true
WHERE slug = 'bung-no-tiec-sinh-nhat-dem-giam-20-phan-tram';

UPDATE public.articles
SET category = 'bi-quyet-am-thuc'::public.content_category
WHERE slug = 'kham-pha-suc-hut-oc-huong-sot-trung-muoi-hoang-kim';

UPDATE public.articles
SET category = 'tin-tuc-nha-hang'::public.content_category
WHERE slug = 'khai-truong-chi-nhanh-3-thu-duc-phuc-vu-xuyen-dem';

UPDATE public.articles
SET category = 'bi-quyet-am-thuc'::public.content_category
WHERE slug = 'top-5-mon-hai-san-sot-thai-chua-cay-phai-thu';

UPDATE public.articles
SET category = 'khuyen-mai-uu-dai'::public.content_category
WHERE slug = 'chuong-trinh-dem-dat-thap-bia-tiger-tang-oc-mo';

UPDATE public.articles
SET category = 'tin-tuc-nha-hang'::public.content_category
WHERE slug = 'quy-trinh-tuyen-chon-hai-san-tuoi-song-trong-ngay';

CREATE INDEX articles_category_published_at_idx
  ON public.articles (category, published_at DESC);
