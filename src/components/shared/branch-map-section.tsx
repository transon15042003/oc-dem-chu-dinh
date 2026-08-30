"use client";

import { useState } from "react";
import { MapPin, Navigation } from "lucide-react";

import { branches } from "@/data/branches";
import { resolveMapDirectionsUrl, resolveMapEmbedUrl } from "@/lib/maps";
import { cn } from "@/lib/utils";

type BranchMapSectionProps = {
  title?: string;
  description?: string;
  className?: string;
};

export function BranchMapSection({
  title = "BẢN ĐỒ VỊ TRÍ CHI NHÁNH",
  description = "Bấm chọn chi nhánh để xem bản đồ Google Maps tương ứng",
  className,
}: BranchMapSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeBranch = branches[activeIndex];
  const mapEmbed =
    activeBranch && !activeBranch.comingSoon
      ? resolveMapEmbedUrl(activeBranch.mapKey, activeBranch.address)
      : "";
  const mapUrl = activeBranch
    ? resolveMapDirectionsUrl(activeBranch.mapKey, activeBranch.address)
    : "";

  return (
    <section className={cn("space-y-6", className)}>
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-black uppercase text-foreground sm:text-2xl">{title}</h2>
        <p className="text-sm text-brand-cream-muted">{description}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {branches.map((branch, index) => (
          <button
            key={branch.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "rounded-xl border px-3 py-2 text-xs font-bold uppercase transition-colors",
              activeIndex === index
                ? "border-brand-gold bg-brand-red text-brand-gold-on-red"
                : "border-border bg-brand-dark-soft text-brand-cream-muted hover:border-brand-gold/40 hover:bg-foreground/5",
            )}
          >
            {branch.badge}: {branch.shortName}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-brand-dark-soft">
        {mapEmbed ? (
          <iframe
            title={`Bản đồ ${activeBranch?.name}`}
            src={mapEmbed}
            className="aspect-[16/10] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : activeBranch?.comingSoon ? (
          <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 bg-gradient-to-br from-ink to-ink-soft p-6 text-center">
            <MapPin className="size-10 text-brand-gold-on-ink/70" />
            <p className="text-sm font-bold text-on-dark">{activeBranch?.name}</p>
            <p className="max-w-md text-xs text-brand-cream-muted/80">
              {activeBranch?.address}
            </p>
          </div>
        ) : (
          <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 bg-gradient-to-br from-ink to-ink-soft p-6 text-center">
            <MapPin className="size-10 text-brand-gold-on-ink/70" />
            <p className="text-sm font-bold text-on-dark">{activeBranch?.name}</p>
            <p className="max-w-md text-xs text-brand-cream-muted/80">
              {activeBranch?.address}
            </p>
            <p className="text-[11px] text-muted-foreground">
              Cấu hình NEXT_PUBLIC_MAP_EMBED_{activeBranch?.badge} trong .env để hiển thị bản đồ
            </p>
          </div>
        )}

        {mapUrl && !activeBranch?.comingSoon ? (
          <div className="border-t border-border p-4 text-center">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase text-brand-gold transition-colors hover:text-foreground"
            >
              <Navigation className="size-4" />
              Xem chỉ đường Google Maps
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
