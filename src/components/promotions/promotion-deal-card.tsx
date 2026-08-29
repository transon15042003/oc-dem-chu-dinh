import Image from "next/image";
import Link from "next/link";
import { Clock, Gift } from "lucide-react";

import {
  extractBulletPointsFromHtml,
  formatPromotionDeadline,
  getPromotionCategoryLabel,
} from "@/lib/promotions/display";
import { bookingSectionId } from "@/config/site";
import type { Promotion } from "@/types/database";
import { cn } from "@/lib/utils";

type PromotionDealCardProps = {
  promotion: Promotion;
  variant?: "list" | "detail";
  className?: string;
};

export function PromotionDealCard({
  promotion,
  variant = "list",
  className,
}: PromotionDealCardProps) {
  const bullets = extractBulletPointsFromHtml(promotion.body);
  const categoryLabel = getPromotionCategoryLabel(promotion);
  const deadline = formatPromotionDeadline(promotion.ends_at);
  const ctaHref = `#${bookingSectionId}`;

  return (
    <article
      className={cn(
        "group grid grid-cols-1 items-stretch overflow-hidden rounded-3xl border border-red-900/80 bg-gradient-to-r from-red-950 via-stone-900 to-amber-950 text-white shadow-2xl transition duration-500 hover:shadow-red-950/50 lg:grid-cols-12",
        className,
      )}
    >
      <div className="relative min-h-[280px] overflow-hidden bg-stone-950 lg:col-span-6 lg:min-h-[380px]">
        {promotion.cover_image_url ? (
          <Image
            src={promotion.cover_image_url}
            alt=""
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={variant === "detail"}
          />
        ) : (
          <div className="flex h-full min-h-[280px] items-center justify-center text-sm text-stone-400">
            Ốc Đêm Chú Đỉnh
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-transparent to-transparent lg:hidden" />
      </div>

      <div className="flex flex-col justify-between space-y-6 border-l border-white/5 bg-gradient-to-r from-red-900/90 via-red-950/95 to-stone-900/90 p-6 sm:p-10 lg:col-span-6">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-stone-950 shadow-md">
            {categoryLabel}
          </span>

          {variant === "list" ? (
            <h2 className="font-heading text-2xl font-black uppercase leading-tight tracking-tight text-white sm:text-3xl">
              <Link href={`/khuyen-mai/${promotion.slug}`} className="hover:text-amber-200">
                {promotion.title}
              </Link>
            </h2>
          ) : (
            <h1 className="font-heading text-2xl font-black uppercase leading-tight tracking-tight text-white sm:text-3xl">
              {promotion.title}
            </h1>
          )}

          {variant !== "detail" && promotion.excerpt ? (
            <p className="text-xs font-medium leading-relaxed text-stone-300 sm:text-sm">
              {promotion.excerpt}
            </p>
          ) : null}

          {variant === "detail" ? (
            <div
              className="prose-promotion text-xs font-medium sm:text-sm"
              dangerouslySetInnerHTML={{ __html: promotion.body }}
            />
          ) : bullets.length > 0 ? (
            <ul className="list-inside list-disc space-y-1.5 pt-1 text-xs font-medium text-amber-200/90">
              {bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}

          {promotion.promo_code ? (
            <p className="inline-flex rounded-xl border border-amber-300/30 bg-red-900/60 px-3 py-1.5 text-xs font-bold text-amber-200">
              Mã ưu đãi: {promotion.promo_code}
            </p>
          ) : null}
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs font-bold text-amber-300">
            <span className="flex items-center gap-1.5 text-stone-300">
              <Clock className="size-3.5 text-amber-400" aria-hidden />
              Thời hạn áp dụng:
            </span>
            <span className="rounded-xl border border-red-700/50 bg-red-900/90 px-3 py-1 text-[11px] font-semibold text-amber-200">
              {deadline}
            </span>
          </div>

          <Link
            href={ctaHref}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-8 py-3.5 text-xs font-black uppercase tracking-widest text-stone-950 shadow-xl transition hover:-translate-y-0.5 hover:bg-amber-300"
          >
            <Gift className="size-4 text-red-700" aria-hidden />
            <span>Nhận ưu đãi & đặt bàn ngay</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
