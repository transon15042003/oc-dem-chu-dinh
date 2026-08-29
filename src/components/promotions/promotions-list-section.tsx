import { PromotionDealCard } from "@/components/promotions/promotion-deal-card";
import { getActivePromotions } from "@/lib/promotions/queries";

export async function PromotionsListSection() {
  const promotions = await getActivePromotions();

  return (
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
  );
}
