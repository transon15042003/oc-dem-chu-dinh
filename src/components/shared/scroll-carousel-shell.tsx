"use client";

import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ScrollCarouselShellProps = {
  children: ReactNode;
  className?: string;
  hint?: string;
  showHint?: boolean;
};

export function ScrollCarouselShell({
  children,
  className,
  hint = "Vuốt để xem thêm",
  showHint = true,
}: ScrollCarouselShellProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-brand-dark-soft via-brand-dark-soft/80 to-transparent sm:hidden"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-brand-dark-soft via-brand-dark-soft/80 to-transparent sm:hidden"
        aria-hidden
      />

      <div className="px-0 sm:px-12">{children}</div>

      {showHint ? (
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground sm:hidden">
          <ChevronLeft className="size-3.5 shrink-0 animate-pulse" aria-hidden />
          <span>{hint}</span>
          <ChevronRight className="size-3.5 shrink-0 animate-pulse" aria-hidden />
        </p>
      ) : null}
    </div>
  );
}

export const carouselNavButtonClass =
  "z-20 hidden size-9 border-border bg-card/95 text-brand-gold shadow-md backdrop-blur-sm hover:bg-brand-red hover:text-on-red sm:flex sm:size-10";

export const carouselNavButtonMobileClass =
  "z-20 flex size-8 border-border bg-card/95 text-brand-gold shadow-md backdrop-blur-sm hover:bg-brand-red hover:text-on-red sm:size-9 xl:hidden";
