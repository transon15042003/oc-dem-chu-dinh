"use client";

import { useCarousel } from "@/components/ui/carousel";
import { MenuScrollButton } from "@/components/menu/menu-scroll-button";
import { cn } from "@/lib/utils";

type MenuCarouselNavProps = {
  direction: "left" | "right";
  className?: string;
};

export function MenuCarouselNav({ direction, className }: MenuCarouselNavProps) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();
  const canScroll = direction === "left" ? canScrollPrev : canScrollNext;

  return (
    <MenuScrollButton
      direction={direction}
      onClick={direction === "left" ? scrollPrev : scrollNext}
      disabled={!canScroll}
      hideWhenDisabled
      aria-label={direction === "left" ? "Xem món trước" : "Xem món tiếp"}
      className={cn(
        "absolute top-1/2 z-10 hidden -translate-y-1/2 sm:inline-flex",
        direction === "left" ? "left-0" : "right-0",
        className,
      )}
    />
  );
}
