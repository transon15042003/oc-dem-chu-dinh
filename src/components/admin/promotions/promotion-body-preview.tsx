import { PromotionDealCard } from "@/components/promotions/promotion-deal-card";
import { toIsoFromDatetimeLocal } from "@/lib/promotions/datetime";
import type { Promotion } from "@/types/database";

type PromotionBodyPreviewProps = {
  title: string;
  excerpt: string;
  body: string;
  coverImageUrl?: string | null;
  startsAt: string;
  endsAt: string;
  discountLabel?: string;
  promoCode?: string;
  slug?: string;
  variant?: "list" | "detail";
};

export function PromotionBodyPreview({
  title,
  excerpt,
  body,
  coverImageUrl,
  startsAt,
  endsAt,
  discountLabel,
  promoCode,
  slug,
  variant = "detail",
}: PromotionBodyPreviewProps) {
  const hasBodyText = body.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim().length > 0;

  if (!hasBodyText && !title.trim() && !excerpt.trim()) {
    return (
      <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        Chưa có nội dung để xem trước.
      </div>
    );
  }

  const previewPromotion: Promotion = {
    id: "preview",
    title: title.trim() || "Tiêu đề khuyến mãi",
    slug: slug?.trim() || "xem-truoc",
    excerpt: excerpt.trim() || null,
    body: body || "<p></p>",
    cover_image_url: coverImageUrl ?? null,
    status: "published",
    published_at: new Date().toISOString(),
    starts_at: toIsoFromDatetimeLocal(startsAt),
    ends_at: toIsoFromDatetimeLocal(endsAt),
    discount_label: discountLabel?.trim() || null,
    promo_code: promoCode?.trim() || null,
    author_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-amber-50/30 p-4 sm:p-6">
      <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Xem trước thẻ khuyến mãi ({variant === "detail" ? "trang chi tiết" : "danh sách"})
      </p>
      <PromotionDealCard promotion={previewPromotion} variant={variant} />
    </div>
  );
}
