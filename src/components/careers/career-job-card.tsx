import Link from "next/link";
import { Clock, DollarSign, Gift } from "lucide-react";

import { Button } from "@/components/ui/button";
import { careersApplicationSectionId } from "@/config/site";
import type { CareerPosition } from "@/types/database";
import { cn } from "@/lib/utils";

type CareerJobCardProps = {
  position: CareerPosition;
  className?: string;
};

export function CareerJobCard({ position, className }: CareerJobCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-3xl border border-red-900/60 bg-gradient-to-br from-stone-950 via-red-950/40 to-stone-900 text-white shadow-xl",
        className,
      )}
    >
      <div className="border-b border-white/10 bg-red-950/50 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {position.badge ? (
            <span className="rounded-full bg-amber-400 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-stone-950">
              {position.badge}
            </span>
          ) : null}
          {position.income_label ? (
            <span className="text-[11px] font-bold text-amber-200">{position.income_label}</span>
          ) : null}
        </div>
        <h2 className="mt-3 font-heading text-lg font-black uppercase leading-snug text-amber-100 sm:text-xl">
          {position.title}
        </h2>
        {position.description ? (
          <p className="mt-2 text-xs leading-relaxed text-stone-300 sm:text-sm">
            {position.description}
          </p>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          {position.schedule ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-amber-300">
                <Clock className="size-3.5" aria-hidden />
                Thời gian làm việc
              </p>
              <p className="mt-1 text-xs font-semibold text-stone-200">{position.schedule}</p>
            </div>
          ) : null}
          {position.salary ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-amber-300">
                <DollarSign className="size-3.5" aria-hidden />
                Mức lương khởi điểm
              </p>
              <p className="mt-1 text-xs font-semibold text-stone-200">{position.salary}</p>
            </div>
          ) : null}
        </div>

        {position.perks.length > 0 ? (
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-black uppercase text-amber-200">
              <Gift className="size-3.5" aria-hidden />
              Quyền lợi được hưởng
            </p>
            <ul className="list-inside list-disc space-y-1.5 text-xs text-stone-300">
              {position.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <Button
          render={
            <Link href={`/tuyen-dung?position=${position.slug}#${careersApplicationSectionId}`} />
          }
          variant="brand"
          className="mt-auto w-full font-bold uppercase"
        >
          Ứng tuyển vị trí này
        </Button>
      </div>
    </article>
  );
}
