"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { CalendarDays, Phone } from "lucide-react";

import {
  GoogleMapsIcon,
  MessengerIcon,
  ZaloIcon,
} from "@/components/icons/brand-icons";
import { bookingSectionId } from "@/config/site";
import { formatHotline, hotlineHref, publicEnv } from "@/lib/env";
import { resolveMapDirectionsUrl } from "@/lib/maps";
import { cn } from "@/lib/utils";

type FloatingActionTone = "hotline" | "maps" | "zalo" | "booking" | "messenger";

type FloatingAction = {
  id: string;
  label: string;
  shortLabel: string;
  href: string;
  icon: ReactNode;
  external?: boolean;
  tone: FloatingActionTone;
  disabled?: boolean;
};

const brandIconTones: FloatingActionTone[] = ["maps", "zalo", "messenger"];

function IconButton({
  action,
  className,
}: {
  action: FloatingAction;
  className?: string;
}) {
  const usesBrandIcon = brandIconTones.includes(action.tone);

  const content = usesBrandIcon ? (
    <span className="flex size-10 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5">
      {action.icon}
    </span>
  ) : (
    action.icon
  );

  const sharedClass = cn(
    "flex items-center justify-center transition-transform hover:scale-105",
    action.disabled && "pointer-events-none opacity-50",
    className,
  );

  if (action.disabled) {
    return (
      <span className={sharedClass} aria-label={action.label} title={action.label}>
        {content}
      </span>
    );
  }

  if (action.external) {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        className={sharedClass}
        aria-label={action.label}
        title={action.label}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={action.href} className={sharedClass} aria-label={action.label} title={action.label}>
      {content}
    </Link>
  );
}

export function FloatingActions() {
  const hotline = publicEnv.hotline;
  const formattedHotline = hotline ? formatHotline(hotline) : null;
  const mapDirectionsUrl = resolveMapDirectionsUrl("cn1");

  const secondaryActions: FloatingAction[] = [
    ...(mapDirectionsUrl
      ? [
          {
            id: "maps",
            label: "Tìm đường Google Maps",
            shortLabel: "Maps",
            href: mapDirectionsUrl,
            icon: <GoogleMapsIcon />,
            external: true,
            tone: "maps" as const,
          },
        ]
      : []),
    {
      id: "zalo",
      label: "Chat Zalo",
      shortLabel: "Zalo",
      href: publicEnv.zaloUrl || "#",
      icon: <ZaloIcon />,
      external: Boolean(publicEnv.zaloUrl),
      tone: "zalo",
      disabled: !publicEnv.zaloUrl,
    },
    {
      id: "messenger",
      label: "Messenger",
      shortLabel: "Messenger",
      href: publicEnv.messengerUrl || "#",
      icon: <MessengerIcon />,
      external: Boolean(publicEnv.messengerUrl),
      tone: "messenger",
      disabled: !publicEnv.messengerUrl,
    },
    {
      id: "booking",
      label: "Đặt bàn ngay",
      shortLabel: "Đặt bàn",
      href: `/#${bookingSectionId}`,
      icon: <CalendarDays className="size-5 text-brand-dark" aria-hidden />,
      tone: "booking",
    },
  ];

  return (
    <>
      {/* Mobile — hotline nổi bật + các kênh liên lạc */}
      <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-brand-gold/30 bg-brand-dark/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md sm:hidden">
        {hotline ? (
          <a
            href={hotlineHref(hotline)}
            className="mb-2 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-3 text-sm font-black uppercase text-on-red shadow-lg ring-2 ring-brand-gold/50"
            aria-label={`Gọi hotline ${formattedHotline}`}
          >
            <Phone className="size-5 shrink-0" aria-hidden />
            <span>Đặt ngay</span>
            <span className="font-bold">{formattedHotline}</span>
          </a>
        ) : null}

        <div className="flex items-center justify-center gap-2">
          {secondaryActions.map((action) => (
            <div
              key={action.id}
              className={cn(
                "flex min-h-11 flex-1 flex-col items-center justify-center gap-1 rounded-xl border border-border/80 bg-brand-dark-soft px-1 py-1.5",
                action.tone === "booking" && "border-brand-gold/40 bg-brand-gold/15",
              )}
            >
              <IconButton action={action} />
              <span className="text-[10px] font-bold leading-none">{action.shortLabel}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop — cột phải, nút gọi nổi bật như site gốc */}
      <div className="fixed right-3 bottom-4 z-50 hidden flex-col items-end gap-2.5 sm:flex">
        {secondaryActions.slice(0, 2).map((action) => (
          <div key={action.id} className="group flex items-center gap-2">
            <span className="pointer-events-none translate-x-2 rounded-full border border-border bg-card/95 px-3 py-1.5 text-xs font-semibold text-foreground opacity-0 shadow-md transition group-hover:translate-x-0 group-hover:opacity-100">
              {action.label}
            </span>
            <span className="rounded-full border border-brand-gold/30 bg-brand-dark-soft p-1 shadow-lg">
              <IconButton action={action} />
            </span>
          </div>
        ))}

        {hotline ? (
          <a
            href={hotlineHref(hotline)}
            className="group flex items-center gap-2"
            aria-label={`Gọi hotline ${formattedHotline}`}
            title={`Gọi hotline ${formattedHotline}`}
          >
            <span className="pointer-events-none translate-x-2 rounded-full border border-border bg-card/95 px-3 py-1.5 text-xs font-semibold text-foreground opacity-0 shadow-md transition group-hover:translate-x-0 group-hover:opacity-100">
              Gọi hotline {formattedHotline}
            </span>
            <span className="flex items-center gap-2 rounded-full bg-brand-red px-5 py-3.5 text-on-red shadow-xl ring-2 ring-brand-gold/60 transition-transform hover:scale-105">
              <Phone className="size-5 shrink-0 animate-pulse" aria-hidden />
              <span className="text-sm font-black uppercase tracking-wide">Đặt ngay</span>
              <span className="text-sm font-bold">{formattedHotline}</span>
            </span>
          </a>
        ) : null}

        {secondaryActions.slice(2).map((action) => (
          <div key={action.id} className="group flex items-center gap-2">
            <span className="pointer-events-none translate-x-2 rounded-full border border-border bg-card/95 px-3 py-1.5 text-xs font-semibold text-foreground opacity-0 shadow-md transition group-hover:translate-x-0 group-hover:opacity-100">
              {action.label}
            </span>
            <span
              className={cn(
                "rounded-full border p-1 shadow-lg",
                action.tone === "booking"
                  ? "border-brand-gold bg-brand-gold"
                  : "border-brand-gold/30 bg-brand-dark-soft",
              )}
            >
              <IconButton action={action} />
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
