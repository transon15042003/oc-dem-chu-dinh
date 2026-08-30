"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";

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

const toneClasses: Record<FloatingActionTone, string> = {
  hotline:
    "border-emerald-500/40 bg-emerald-600 text-white shadow-emerald-600/30 hover:bg-emerald-500",
  maps: "border-sky-500/40 bg-sky-600 text-white shadow-sky-600/30 hover:bg-sky-500",
  zalo: "border-[#0068FF]/40 bg-[#0068FF] text-white shadow-[#0068FF]/30 hover:bg-[#0058d6]",
  booking:
    "border-brand-gold bg-brand-gold text-brand-dark shadow-brand-gold/40 hover:bg-brand-gold/90",
  messenger:
    "border-[#0084FF]/40 bg-[#0084FF] text-white shadow-[#0084FF]/30 hover:bg-[#0074e0]",
};

function ActionButton({
  action,
  mobile = false,
}: {
  action: FloatingAction;
  mobile?: boolean;
}) {
  const className = cn(
    "flex items-center justify-center border shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl",
    mobile
      ? "min-h-12 flex-1 flex-col gap-1 rounded-xl px-1 py-2 text-[11px] font-bold sm:text-xs"
      : "size-14 rounded-2xl",
    toneClasses[action.tone],
    action.tone === "booking" && !mobile && "animate-pulse ring-2 ring-brand-gold/50",
    action.disabled && "pointer-events-none opacity-50",
  );

  const content = mobile ? (
    <>
      {action.icon}
      <span className="leading-none">{action.shortLabel}</span>
    </>
  ) : (
    action.icon
  );

  if (action.disabled) {
    return (
      <span className={className} aria-label={action.label} title={action.label}>
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
        className={className}
        aria-label={action.label}
        title={action.label}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={action.href} className={className} aria-label={action.label} title={action.label}>
      {content}
    </Link>
  );
}

export function FloatingActions() {
  const hotline = publicEnv.hotline;
  const mapDirectionsUrl = resolveMapDirectionsUrl("cn1");

  const actions: FloatingAction[] = [
    ...(mapDirectionsUrl
      ? [
          {
            id: "maps",
            label: "Tìm đường Google Maps",
            shortLabel: "Maps",
            href: mapDirectionsUrl,
            icon: <Navigation className={cn("size-5 sm:size-6")} aria-hidden />,
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
      icon: <MessageCircle className="size-5 sm:size-6" aria-hidden />,
      external: Boolean(publicEnv.zaloUrl),
      tone: "zalo",
      disabled: !publicEnv.zaloUrl,
    },
    ...(hotline
      ? [
          {
            id: "hotline",
            label: `Gọi hotline ${formatHotline(hotline)}`,
            shortLabel: "Gọi",
            href: hotlineHref(hotline),
            icon: <Phone className="size-5 sm:size-6" aria-hidden />,
            tone: "hotline" as const,
          },
        ]
      : []),
    {
      id: "booking",
      label: "Đặt bàn ngay",
      shortLabel: "Đặt",
      href: `/#${bookingSectionId}`,
      icon: <CalendarDays className="size-5 sm:size-6" aria-hidden />,
      tone: "booking",
    },
    {
      id: "messenger",
      label: "Messenger",
      shortLabel: "MSG",
      href: publicEnv.messengerUrl || "#",
      icon: <MessageCircle className="size-5 sm:size-6" aria-hidden />,
      external: Boolean(publicEnv.messengerUrl),
      tone: "messenger",
      disabled: !publicEnv.messengerUrl,
    },
  ];

  return (
    <>
      <div className="fixed right-0 bottom-0 left-0 z-50 flex gap-1 border-t border-border/80 bg-brand-dark/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md sm:hidden">
        {actions.map((action) => (
          <ActionButton key={action.id} action={action} mobile />
        ))}
      </div>

      <div className="fixed right-4 bottom-4 z-50 hidden flex-col items-end gap-3 sm:flex">
        {actions.map((action) => (
          <div key={action.id} className="group flex items-center gap-2">
            <span className="pointer-events-none translate-x-2 rounded-full border border-border bg-card/95 px-3 py-1.5 text-xs font-semibold text-foreground opacity-0 shadow-md transition group-hover:translate-x-0 group-hover:opacity-100">
              {action.label}
            </span>
            <ActionButton action={action} />
          </div>
        ))}
      </div>
    </>
  );
}
