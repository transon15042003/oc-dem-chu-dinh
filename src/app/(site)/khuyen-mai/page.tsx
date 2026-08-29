import { Suspense } from "react";

import { BookingFormSection } from "@/components/home/booking-form-section";
import { PromotionsListSection } from "@/components/promotions/promotions-list-section";
import { PromotionsPageHeader } from "@/components/promotions/promotions-page-header";
import { PromotionsListSkeleton } from "@/components/content/content-skeletons";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Khuyến mãi",
  description:
    "Tổng hợp các chương trình ưu đãi giảm giá, gói trang trí tiệc sinh nhật 0đ & quà tặng tháp bia tươi tại Ốc Đêm Chú Đỉnh.",
  path: "/khuyen-mai",
});

export default function PromotionsPage() {
  return (
    <div className="min-h-screen bg-amber-50/30 text-foreground dark:bg-background">
      <PromotionsPageHeader />

      <Suspense fallback={<PromotionsListSkeleton />}>
        <PromotionsListSection />
      </Suspense>

      <BookingFormSection />
    </div>
  );
}
