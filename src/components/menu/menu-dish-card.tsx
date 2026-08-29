"use client";

import Image from "next/image";
import { Star, ZoomIn } from "lucide-react";

import type { MenuItem } from "@/data/menu";
import { hoverImageClass } from "@/lib/motion";
import { cn } from "@/lib/utils";

type MenuDishCardProps = {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
};

export function MenuDishCard({ item, onSelect }: MenuDishCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-brand-gold/30 bg-brand-dark text-left transition-colors hover:border-brand-gold/60"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-brand-dark-soft">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className={cn("object-cover", hoverImageClass)}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        {item.hot ? (
          <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded bg-brand-red px-2 py-0.5 text-[9px] font-black uppercase text-brand-gold">
            <Star className="size-3 fill-current" />
            HOT
          </span>
        ) : null}
      </div>
      <div className="flex min-h-[64px] flex-1 items-center justify-center border-t border-border bg-brand-dark-soft p-3 text-center">
        <h3 className="line-clamp-2 text-xs font-bold uppercase leading-tight text-foreground sm:text-sm">
          {item.name}
        </h3>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute right-2 bottom-14 inline-flex items-center gap-1 rounded-full bg-ink/90 px-2 py-1 text-[10px] font-bold uppercase text-brand-gold opacity-0 transition-opacity group-hover:opacity-100"
      >
        <ZoomIn className="size-3" />
        Phóng to
      </span>
    </button>
  );
}
