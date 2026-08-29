import { Flame, Phone } from "lucide-react";

import { siteConfig } from "@/config/site";
import { formatHotline, hotlineHref, publicEnv } from "@/lib/env";

export function TopBar() {
  const hotline = publicEnv.hotline;
  const formattedHotline = hotline ? formatHotline(hotline) : "Chưa cấu hình";

  return (
    <div className="border-b border-brand-gold/20 bg-brand-red text-on-red">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs sm:text-sm">
        <p className="flex items-center gap-2 font-medium uppercase tracking-wide">
          <Flame className="size-4 shrink-0 text-brand-gold" aria-hidden />
          <span className="hidden sm:inline">
            {siteConfig.name} | Phục vụ xuyên đêm {siteConfig.hours}
          </span>
          <span className="sm:hidden">Phục vụ xuyên đêm 16h - 04h</span>
        </p>

        <a
          href={hotline ? hotlineHref(hotline) : "#"}
          className="inline-flex items-center gap-2 font-semibold text-brand-gold transition-opacity hover:opacity-80"
          aria-label={`Hotline ${formattedHotline}`}
        >
          <Phone className="size-4" aria-hidden />
          <span>HOTLINE</span>
          <span>{formattedHotline}</span>
        </a>
      </div>
    </div>
  );
}
