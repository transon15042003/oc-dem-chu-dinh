import type { ContentCategory } from "@/lib/content/categories";

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
  category: ContentCategory | null;
  is_featured: boolean;
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
  | "category"
  | "is_featured"
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

export type PromotionSummary = Pick<
  Promotion,
  | "id"
  | "title"
  | "slug"
  | "excerpt"
  | "cover_image_url"
  | "status"
  | "published_at"
  | "starts_at"
  | "ends_at"
  | "discount_label"
  | "promo_code"
  | "created_at"
  | "updated_at"
>;

export const CONTENT_IMAGE_BUCKET = "content-images" as const;
export const MAX_CONTENT_IMAGE_BYTES = 2 * 1024 * 1024;

export type EventBookingType = "sinh-nhat" | "thoi-noi" | "tat-nien" | "lien-hoan";

export type EventBooking = {
  id: string;
  full_name: string;
  phone: string;
  event_type: EventBookingType;
  guest_count: string;
  branch_id: string;
  event_date: string;
  event_time: string;
  company_name: string | null;
  note: string | null;
  created_at: string;
};
