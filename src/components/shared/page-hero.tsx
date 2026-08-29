"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { cn } from "@/lib/utils";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageHeroProps = {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  description?: string;
  eyebrow?: string;
  className?: string;
  children?: React.ReactNode;
  align?: "left" | "center";
};

export function PageHero({
  breadcrumbs,
  title,
  description,
  eyebrow,
  className,
  children,
  align = "left",
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-brand-red/30 bg-gradient-to-r from-menu-hero-from via-menu-hero-via to-menu-hero-to py-10 sm:py-12",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-7xl space-y-5 px-4 sm:px-6 lg:px-8",
          align === "center" && "text-center",
        )}
      >
        <ScrollReveal delay={0}>
          <nav
            aria-label="Breadcrumb"
            className={cn(
              "flex flex-wrap items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-cream-muted",
              align === "center" && "justify-center",
            )}
          >
            {breadcrumbs.map((item, index) => (
              <span
                key={`${item.label}-${index}`}
                className="inline-flex items-center gap-1.5"
              >
                {index > 0 ? (
                  <ChevronRight className="size-3 text-brand-gold/70" />
                ) : null}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-brand-gold"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-brand-gold">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className="space-y-3">
            {eyebrow ? (
              <p className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-4 py-1 text-xs font-black uppercase tracking-wider text-brand-dark">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="text-2xl font-black uppercase leading-tight text-brand-gold sm:text-4xl">
              {title}
            </h1>
            {description ? (
              <p
                className={cn(
                  "text-sm leading-relaxed text-brand-cream-muted sm:text-base",
                  align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl",
                )}
              >
                {description}
              </p>
            ) : null}
          </div>
        </ScrollReveal>

        {children ? <ScrollReveal delay={0.14}>{children}</ScrollReveal> : null}
      </div>
    </section>
  );
}
