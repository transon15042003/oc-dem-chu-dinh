import { MapPin } from "lucide-react";

import type { Branch } from "@/data/branches";
import { resolveMapEmbedUrl } from "@/lib/maps";

type BranchMapPanelProps = {
  branch: Branch;
};

export function BranchMapPanel({ branch }: BranchMapPanelProps) {
  const mapEmbed = branch.comingSoon
    ? ""
    : resolveMapEmbedUrl(branch.mapKey, branch.address);

  return (
    <div className="flex h-full min-h-[260px] items-center justify-center border-t border-border bg-brand-dark p-4 sm:min-h-[288px] sm:p-6 lg:border-t-0 lg:border-l">
      <div className="h-64 w-full overflow-hidden rounded-2xl border border-border shadow-inner sm:h-72 lg:h-full lg:min-h-[260px]">
        {mapEmbed ? (
          <iframe
            title={`Bản đồ ${branch.name}`}
            src={mapEmbed}
            className="size-full border-0 grayscale transition duration-500 hover:grayscale-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : branch.comingSoon ? (
          <div className="flex size-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-ink-soft to-ink p-6 text-center">
            <MapPin className="size-10 text-brand-gold-on-ink/70" />
            <p className="text-sm font-bold text-on-dark">{branch.name}</p>
            <p className="max-w-xs text-xs text-brand-cream-muted/80">{branch.address}</p>
          </div>
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-ink-soft to-ink p-6 text-center">
            <MapPin className="size-10 text-brand-gold-on-ink/70" />
            <p className="text-sm font-bold text-on-dark">{branch.name}</p>
            <p className="max-w-xs text-xs text-brand-cream-muted/80">{branch.address}</p>
            <p className="text-[11px] text-muted-foreground">
              Cấu hình NEXT_PUBLIC_MAP_EMBED_{branch.badge} trong .env để hiển thị bản
              đồ
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
