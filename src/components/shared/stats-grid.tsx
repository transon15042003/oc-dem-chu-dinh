"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import type { StatItem } from "@/data/homepage";
import { cn } from "@/lib/utils";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
};

function AnimatedCounter({ value, suffix = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {new Intl.NumberFormat("vi-VN").format(displayValue)}
      {suffix}
    </span>
  );
}

type StatsGridLayout = "row" | "grid-2x2";

type StatsGridProps = {
  stats: StatItem[];
  compact?: boolean;
  layout?: StatsGridLayout;
};

export function StatsGrid({
  stats,
  compact = false,
  layout = "row",
}: StatsGridProps) {
  return (
    <div
      className={cn(
        "grid gap-3 sm:gap-4",
        layout === "grid-2x2"
          ? "grid-cols-2 max-w-2xl mx-auto"
          : "grid-cols-2 lg:grid-cols-4",
      )}
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="rounded-2xl border border-border bg-foreground/5 p-3 text-center backdrop-blur-sm sm:p-5 lg:p-6"
          >
            {Icon ? (
              <div className="mx-auto mb-2 flex size-9 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold sm:mb-3 sm:size-10">
                <Icon className="size-4 sm:size-5" aria-hidden />
              </div>
            ) : null}
            <p className="text-xl font-extrabold text-brand-gold sm:text-2xl lg:text-3xl">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-foreground sm:mt-2 sm:text-xs lg:text-sm">
              {stat.label}
            </p>
            {!compact && stat.description ? (
              <p className="mt-1 hidden text-xs text-muted-foreground sm:block">
                {stat.description}
              </p>
            ) : null}
          </motion.div>
        );
      })}
    </div>
  );
}
