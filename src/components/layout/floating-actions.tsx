"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, MessageCircle, Phone } from "lucide-react";

import { bookingSectionId } from "@/config/site";
import { formatHotline, hotlineHref, publicEnv } from "@/lib/env";
import { resolveMapDirectionsUrl } from "@/lib/maps";
import { cn } from "@/lib/utils";

type FloatingAction = {
  label: string;
  shortLabel?: string;
  href: string;
  icon: ReactNode;
  external?: boolean;
  emphasis?: boolean;
};

export function FloatingActions() {
  const hotline = publicEnv.hotline;

  const mapDirectionsUrl = resolveMapDirectionsUrl("cn1");

  const actions: FloatingAction[] = [
    ...(hotline
      ? [
          {
            label: `Hotline ${formatHotline(hotline)}`,
            shortLabel: "Gọi",
            href: hotlineHref(hotline),
            icon: <Phone className="size-5" aria-hidden />,
          },
        ]
      : []),
    ...(mapDirectionsUrl
      ? [
          {
            label: "Tìm đường",
            shortLabel: "Đường",
            href: mapDirectionsUrl,
            icon: <MapPin className="size-5" aria-hidden />,
            external: true,
          },
        ]
      : []),
    {
      label: "Chat Zalo",
      shortLabel: "Zalo",
      href: publicEnv.zaloUrl || "#",
      icon: <MessageCircle className="size-5" aria-hidden />,
      external: Boolean(publicEnv.zaloUrl),
    },
    {
      label: "Đặt ngay",
      shortLabel: "Đặt",
      href: `/#${bookingSectionId}`,
      icon: <CalendarDays className="size-5" aria-hidden />,
      emphasis: true,
    },
    {
      label: "Messenger",
      shortLabel: "MSG",
      href: publicEnv.messengerUrl || "#",
      icon: <MessageCircle className="size-5" aria-hidden />,
      external: Boolean(publicEnv.messengerUrl),
    },
  ];

  const buttonClass = (emphasis?: boolean, mobile = false) =>
    cn(
      "flex items-center justify-center rounded-full border shadow-lg transition-transform hover:scale-105",
      mobile
        ? "min-h-12 flex-1 flex-col gap-0.5 rounded-xl py-2 text-[11px] font-semibold sm:text-xs"
        : "size-12",
      emphasis
        ? "border-brand-gold bg-brand-gold text-brand-dark"
        : "border-border bg-brand-dark text-foreground hover:bg-brand-red hover:text-on-red",
    );

  return (
    <>
      {/* Mobile — thanh ngang dưới đáy (giống site gốc) */}
      <div className="fixed right-0 bottom-0 left-0 z-50 flex gap-1 border-t border-border bg-brand-dark/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md sm:hidden">
        {actions.map((action) => {
          const content = (
            <>
              {action.icon}
              <span className="leading-none">{action.shortLabel}</span>
            </>
          );

          if (action.external && action.href !== "#") {
            return (
              <a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass(action.emphasis, true)}
                aria-label={action.label}
              >
                {content}
              </a>
            );
          }

          return (
            <Link
              key={action.label}
              href={action.href}
              className={buttonClass(action.emphasis, true)}
              aria-label={action.label}
            >
              {content}
            </Link>
          );
        })}
      </div>

      {/* Desktop — cột dọc bên phải */}
      <div className="fixed right-4 bottom-4 z-50 hidden flex-col gap-2 sm:flex">
        {actions.map((action) => {
          const className = buttonClass(action.emphasis);

          if (action.external && action.href !== "#") {
            return (
              <a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                aria-label={action.label}
                title={action.label}
              >
                {action.icon}
              </a>
            );
          }

          return (
            <Link
              key={action.label}
              href={action.href}
              className={className}
              aria-label={action.label}
              title={action.label}
            >
              {action.icon}
            </Link>
          );
        })}
      </div>
    </>
  );
}
