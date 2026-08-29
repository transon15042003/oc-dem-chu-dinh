import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { PromotionDealCard } from "@/components/promotions/promotion-deal-card";
import { getActivePromotionBySlug } from "@/lib/promotions/queries";

type PromotionDetailContentProps = {
  slug: string;
};

export async function PromotionDetailContent({ slug }: PromotionDetailContentProps) {
  const promotion = await getActivePromotionBySlug(slug);

  if (!promotion) {
    notFound();
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-amber-100 bg-background py-10 sm:py-12">
        <div className="relative z-10 mx-auto max-w-6xl space-y-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-brand-red">
              Trang chủ
            </Link>
            <ChevronRight className="size-3 text-muted-foreground/70" aria-hidden />
            <Link href="/khuyen-mai" className="transition-colors hover:text-brand-red">
              Chương trình khuyến mãi
            </Link>
            <ChevronRight className="size-3 text-muted-foreground/70" aria-hidden />
            <span className="line-clamp-1 font-black text-brand-red">{promotion.title}</span>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <PromotionDealCard promotion={promotion} variant="detail" />
        </div>
      </section>
    </>
  );
}
