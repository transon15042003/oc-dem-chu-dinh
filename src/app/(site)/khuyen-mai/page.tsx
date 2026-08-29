import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/shared/page-hero";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { formatPromotionDateRange } from "@/lib/promotions/datetime";
import { getActivePromotions } from "@/lib/promotions/queries";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Khuyến mãi",
  description:
    "Chương trình ưu đãi và khuyến mãi từ Ốc Đêm Chú Đỉnh — ốc & hải sản đêm tại Sài Gòn.",
  path: "/khuyen-mai",
});

export default async function PromotionsPage() {
  const promotions = await getActivePromotions();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Khuyến mãi" },
        ]}
        title="Khuyến mãi"
        description="Ưu đãi đang diễn ra tại Ốc Đêm Chú Đỉnh"
        eyebrow="Ưu đãi"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {promotions.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Hiện chưa có chương trình khuyến mãi nào.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {promotions.map((promotion, index) => (
              <ScrollReveal key={promotion.id} delay={index * 0.05}>
                <Link
                  href={`/khuyen-mai/${promotion.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-brand-red/40"
                >
                  <div className="relative aspect-[16/10] bg-muted">
                    {promotion.cover_image_url ? (
                      <Image
                        src={promotion.cover_image_url}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        Ốc Đêm Chú Đỉnh
                      </div>
                    )}
                    {promotion.discount_label ? (
                      <Badge variant="hot" className="absolute left-3 top-3">
                        {promotion.discount_label}
                      </Badge>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <p className="text-xs text-muted-foreground">
                      {formatPromotionDateRange(promotion.starts_at, promotion.ends_at)}
                    </p>
                    <h2 className="text-lg font-bold leading-snug group-hover:text-brand-red">
                      {promotion.title}
                    </h2>
                    {promotion.excerpt ? (
                      <p className="line-clamp-3 text-sm text-muted-foreground">{promotion.excerpt}</p>
                    ) : null}
                    {promotion.promo_code ? (
                      <p className="mt-auto pt-2 text-sm font-semibold text-brand-red">
                        Mã: {promotion.promo_code}
                      </p>
                    ) : null}
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
