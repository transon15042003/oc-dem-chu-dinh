import { BookingFormSection } from "@/components/home/booking-form-section";
import { PromotionDealCard } from "@/components/promotions/promotion-deal-card";
import { PromotionsPageHeader } from "@/components/promotions/promotions-page-header";
import { getActivePromotions } from "@/lib/promotions/queries";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Khuyến mãi",
  description:
    "Tổng hợp các chương trình ưu đãi giảm giá, gói trang trí tiệc sinh nhật 0đ & quà tặng tháp bia tươi tại Ốc Đêm Chú Đỉnh.",
  path: "/khuyen-mai",
});

export default async function PromotionsPage() {
  const promotions = await getActivePromotions();

  return (
    <div className="min-h-screen bg-amber-50/30 text-foreground dark:bg-background">
      <PromotionsPageHeader />

      <section className="py-12">
        <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
          {promotions.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Hiện chưa có chương trình khuyến mãi nào.
            </p>
          ) : (
            promotions.map((promotion) => (
              <PromotionDealCard key={promotion.id} promotion={promotion} variant="list" />
            ))
          )}
        </div>
      </section>

      <BookingFormSection />
    </div>
  );
}
