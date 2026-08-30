import { Flame, Phone } from "lucide-react";

import { MarqueeText } from "@/components/shared/marquee-text";
import { siteConfig } from "@/config/site";
import { formatHotline, hotlineHref, publicEnv } from "@/lib/env";

export function TopBar() {
  const hotline = publicEnv.hotline;
  const formattedHotline = hotline ? formatHotline(hotline) : "Chưa cấu hình";
  const tagline = `${siteConfig.name} | Phục vụ xuyên đêm ${siteConfig.hours}`;

  return (
    <div className="border-b border-brand-gold/20 bg-brand-red text-on-red">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-xs sm:gap-4 sm:text-sm">
        <p className="flex min-w-0 flex-1 items-center gap-2 font-medium uppercase tracking-wide">
          <Flame className="size-4 shrink-0 text-brand-gold-on-red" aria-hidden />
          <MarqueeText className="sm:hidden">{tagline}</MarqueeText>
          <span className="hidden truncate sm:inline">{tagline}</span>
        </p>

        <a
          href={hotline ? hotlineHref(hotline) : "#"}
          className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-brand-gold-on-red transition-opacity hover:opacity-80 sm:gap-2"
          aria-label={`Hotline ${formattedHotline}`}
        >
          <Phone className="size-4" aria-hidden />
          <span className="hidden sm:inline">HOTLINE</span>
          <span className="whitespace-nowrap">{formattedHotline}</span>
        </a>
      </div>
    </div>
  );
}
