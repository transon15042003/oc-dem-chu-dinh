export type UserRole = "admin" | "editor";

export type PublicationStatus = "draft" | "published";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  cover_image_url: string | null;
  status: PublicationStatus;
  published_at: string | null;
  author_id: string | null;
  created_at: string;
  updated_at: string;
};

export type ArticleSummary = Pick<
  Article,
  | "id"
  | "title"
  | "slug"
  | "excerpt"
  | "cover_image_url"
  | "status"
  | "published_at"
  | "created_at"
  | "updated_at"
>;

export type Promotion = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  cover_image_url: string | null;
  status: PublicationStatus;
  published_at: string | null;
  starts_at: string;
  ends_at: string;
  discount_label: string | null;
  promo_code: string | null;
  author_id: string | null;
  created_at: string;
  updated_at: string;
};

export const CONTENT_IMAGE_BUCKET = "content-images" as const;
export const MAX_CONTENT_IMAGE_BYTES = 2 * 1024 * 1024;
