"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  delay?: number;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  delay = 0,
}: SectionHeadingProps) {
  return (
    <ScrollReveal delay={delay} className={className}>
      <div
        className={cn(
          "space-y-3",
          align === "center" && "mx-auto max-w-3xl text-center",
        )}
      >
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-extrabold uppercase leading-tight text-foreground sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="text-sm leading-relaxed text-brand-cream-muted sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </ScrollReveal>
  );
}
