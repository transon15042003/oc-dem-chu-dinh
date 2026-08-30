"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type MarqueeTextProps = {
  children: ReactNode;
  className?: string;
};

export function MarqueeText({ children, className }: MarqueeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [shouldMarquee, setShouldMarquee] = useState(false);

  useEffect(() => {
    const update = () => {
      const container = containerRef.current;
      const measure = measureRef.current;
      if (!container || !measure) return;
      setShouldMarquee(measure.scrollWidth > container.clientWidth + 2);
    };

    update();

    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    if (observer && containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener("resize", update);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [children]);

  return (
    <div ref={containerRef} className={cn("min-w-0 flex-1 overflow-hidden", className)}>
      <span ref={measureRef} className="pointer-events-none invisible absolute whitespace-nowrap" aria-hidden>
        {children}
      </span>

      {shouldMarquee ? (
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
          <span>{children}</span>
          <span aria-hidden>{children}</span>
        </div>
      ) : (
        <span className="block truncate">{children}</span>
      )}
    </div>
  );
}
