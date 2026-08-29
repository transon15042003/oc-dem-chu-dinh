import { notFound } from "next/navigation";

import { ArticleBodySection } from "@/components/articles/article-body-section";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/shared/page-hero";
import { formatPromotionDateRange } from "@/lib/promotions/datetime";
import { getActivePromotionBySlug } from "@/lib/promotions/queries";
import { createPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

type PromotionDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PromotionDetailPageProps) {
  const { slug } = await params;
  const promotion = await getActivePromotionBySlug(slug);

  if (!promotion) {
    return { title: "Không tìm thấy" };
  }

  return createPageMetadata({
    title: promotion.title,
    description: promotion.excerpt ?? promotion.title,
    path: `/khuyen-mai/${promotion.slug}`,
    ogImage: promotion.cover_image_url ?? siteConfig.ogImage,
  });
}

export default async function PromotionDetailPage({ params }: PromotionDetailPageProps) {
  const { slug } = await params;
  const promotion = await getActivePromotionBySlug(slug);

  if (!promotion) {
    notFound();
  }

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Khuyến mãi", href: "/khuyen-mai" },
          { label: promotion.title },
        ]}
        title={promotion.title}
        description={promotion.excerpt ?? undefined}
      />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <p className="text-sm text-muted-foreground">
            {formatPromotionDateRange(promotion.starts_at, promotion.ends_at)}
          </p>
          {promotion.discount_label ? <Badge variant="hot">{promotion.discount_label}</Badge> : null}
          {promotion.promo_code ? (
            <p className="rounded-lg border border-brand-red/30 bg-brand-red/5 px-3 py-1 text-sm font-semibold text-brand-red">
              Mã: {promotion.promo_code}
            </p>
          ) : null}
        </div>

        <ArticleBodySection
          body={promotion.body}
          coverImageUrl={promotion.cover_image_url}
          showDate={false}
          coverPriority
        />
      </article>
    </>
  );
}
