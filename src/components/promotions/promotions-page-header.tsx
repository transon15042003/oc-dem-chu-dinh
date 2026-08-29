import Link from "next/link";
import { ChevronRight } from "lucide-react";

type PromotionsPageHeaderProps = {
  currentLabel?: string;
};

export function PromotionsPageHeader({
  currentLabel = "Chương trình khuyến mãi",
}: PromotionsPageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-amber-100 bg-background py-12">
      <div className="relative z-10 mx-auto max-w-7xl space-y-4 px-4 text-center sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-brand-red">
            Trang chủ
          </Link>
          <ChevronRight className="size-3 text-muted-foreground/70" aria-hidden />
          <span className="font-black text-brand-red">{currentLabel}</span>
        </div>

        <h1 className="font-heading text-3xl font-black uppercase leading-tight tracking-tight text-foreground sm:text-5xl">
          Ưu đãi khuyến mãi Ốc Đêm Chú Đỉnh
        </h1>

        <p className="mx-auto max-w-2xl text-xs font-medium leading-relaxed text-muted-foreground sm:text-sm">
          Tổng hợp các chương trình ưu đãi giảm giá, gói trang trí tiệc sinh nhật 0đ &amp; quà
          tặng tháp bia tươi hấp dẫn nhất.
        </p>
      </div>
    </section>
  );
}
