import { Suspense } from "react";

import { BookingFormSection } from "@/components/home/booking-form-section";
import { PromotionDetailContent } from "@/components/promotions/promotion-detail-content";
import { PromotionDetailPageLoading } from "@/components/content/content-skeletons";
import { getActivePromotionBySlug, getActivePromotionSlugs } from "@/lib/promotions/queries";
import { createPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

type PromotionDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getActivePromotionSlugs();
  return slugs.map((slug) => ({ slug }));
}

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

  return (
    <div className="min-h-screen bg-amber-50/30 text-foreground dark:bg-background">
      <Suspense fallback={<PromotionDetailPageLoading />}>
        <PromotionDetailContent slug={slug} />
      </Suspense>

      <BookingFormSection />
    </div>
  );
}
