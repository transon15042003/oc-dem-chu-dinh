"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Phone } from "lucide-react";

import { BookingFormSection } from "@/components/home/booking-form-section";
import { ImageLightbox } from "@/components/shared/image-lightbox";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Button } from "@/components/ui/button";
import {
  aboutCta,
  aboutHero,
  aboutQuote,
  aboutSections,
  aboutSpaceGallery,
} from "@/data/about";
import { bookingSectionId } from "@/config/site";
import { formatHotline, hotlineHref, publicEnv } from "@/lib/env";
import { hoverImageClass } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function AboutPageContent() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const hotline = publicEnv.hotline;

  return (
    <>
      <section className="border-b border-brand-red/30 bg-gradient-to-r from-menu-hero-from via-menu-hero-via to-menu-hero-to py-8 sm:py-10">
        <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-cream-muted"
            >
              <Link href="/" className="transition-colors hover:text-brand-gold">
                Trang chủ
              </Link>
              <ChevronRight className="size-3 text-brand-gold/70" />
              <span className="text-brand-gold">Giới thiệu nhà hàng</span>
            </nav>
          </ScrollReveal>

          <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
            <ScrollReveal className="flex flex-col justify-center space-y-5">
              <div className="space-y-3">
                <h1 className="text-2xl font-black uppercase leading-tight text-brand-gold sm:text-3xl lg:text-4xl">
                  {aboutHero.title}
                </h1>
                <p className="text-sm leading-relaxed text-brand-cream-muted sm:text-base">
                  {aboutHero.lead}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-brand-cream-muted sm:text-base">
                {aboutHero.description}
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <Button
                  render={<Link href={`/#${bookingSectionId}`} />}
                  variant="brand"
                  className="font-bold uppercase"
                >
                  Đặt bàn ngay
                </Button>
                {hotline ? (
                  <Button
                    variant="outline"
                    render={<a href={hotlineHref(hotline)} />}
                    className="border-brand-gold/40 font-bold uppercase text-brand-gold hover:bg-brand-gold/10"
                  >
                    <Phone className="size-4" />
                    {formatHotline(hotline)}
                  </Button>
                ) : null}
              </div>
            </ScrollReveal>

            <button
              type="button"
              onClick={() => setLightboxImage(aboutHero.image)}
              className="group relative min-h-[220px] w-full overflow-hidden rounded-3xl border border-border sm:min-h-[280px] lg:min-h-full"
            >
              <Image
                src={aboutHero.image}
                alt={aboutHero.imageAlt}
                fill
                className={cn("object-cover", hoverImageClass)}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </button>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-brand-dark-soft py-12 sm:py-16">
        <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
              📍 Không gian Ốc Đêm Chú Đỉnh
            </p>
            <p className="mt-2 text-sm text-brand-cream-muted">
              Nhấp để xem phóng to không gian món ăn độc quyền
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {aboutSpaceGallery.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setLightboxImage(image)}
                className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-border transition-colors hover:border-brand-gold/50"
              >
                <Image
                  src={image}
                  alt={`Không gian Chú Đỉnh ${index + 1}`}
                  fill
                  className={cn("object-cover", hoverImageClass)}
                  sizes="(max-width: 768px) 50vw, 16vw"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-10 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <ScrollReveal className="space-y-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            {aboutQuote.eyebrow}
          </p>
          <h2 className="text-2xl font-black uppercase text-foreground sm:text-3xl">
            {aboutQuote.title}
          </h2>
          <blockquote className="border-l-4 border-brand-gold pl-4 text-left text-sm italic leading-relaxed text-brand-cream-muted sm:text-base">
            &ldquo;{aboutQuote.quote}&rdquo;
          </blockquote>
        </ScrollReveal>

        {aboutSections.map((section) => (
          <article key={section.id} className="space-y-4">
            <h3 className="text-lg font-black uppercase text-brand-gold sm:text-xl">
              {section.title}
            </h3>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-relaxed text-brand-cream-muted sm:text-base"
              >
                {paragraph}
              </p>
            ))}
            {section.bullets ? (
              <ul className="space-y-2 text-sm leading-relaxed text-brand-cream-muted sm:text-base">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-red" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </section>

      <section className="border-t border-border bg-brand-dark-soft py-12 text-center sm:py-16">
        <div className="mx-auto max-w-3xl space-y-4 px-4">
          <h2 className="text-xl font-black uppercase text-foreground sm:text-2xl">
            {aboutCta.title}
          </h2>
          <p className="text-sm leading-relaxed text-brand-cream-muted sm:text-base">
            {aboutCta.description}
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button
              render={<Link href={`/#${bookingSectionId}`} />}
              variant="brand"
              className="font-bold uppercase"
            >
              Đặt bàn ngay
            </Button>
            {hotline ? (
              <Button
                variant="outline"
                render={<a href={hotlineHref(hotline)} />}
                className="border-brand-gold/40 font-bold uppercase text-brand-gold hover:bg-brand-gold/10"
              >
                Hotline: {formatHotline(hotline)}
              </Button>
            ) : null}
          </div>
        </div>
      </section>

      <BookingFormSection />

      <ImageLightbox
        image={lightboxImage}
        alt="Không gian Ốc Đêm Chú Đỉnh"
        onClose={() => setLightboxImage(null)}
      />
    </>
  );
}
