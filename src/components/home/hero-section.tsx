"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { StatsGrid } from "@/components/shared/stats-grid";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Button } from "@/components/ui/button";
import { heroBannerSize, heroSlides, heroStats } from "@/data/homepage";

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = heroSlides[activeIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setActiveIndex((index + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative border-b border-border bg-brand-dark">
      {/* Banner 1672×941 — full width, không crop, hiển thị trọn ảnh */}
      <div
        className="relative mx-auto w-full max-w-[1672px]"
        style={{ aspectRatio: `${heroBannerSize.width} / ${heroBannerSize.height}` }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={activeSlide.image}
              alt={activeSlide.alt}
              width={activeSlide.width}
              height={activeSlide.height}
              priority
              className="size-full object-contain"
              sizes="(max-width: 1672px) 100vw, 1672px"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-1/2 right-2 z-10 hidden -translate-y-1/2 flex-col gap-2 sm:right-4 sm:flex">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => goTo(activeIndex - 1)}
            className="border-border bg-ink/60 text-on-dark backdrop-blur-sm hover:bg-brand-red hover:text-on-red"
            aria-label="Slide trước"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => goTo(activeIndex + 1)}
            className="border-border bg-ink/60 text-on-dark backdrop-blur-sm hover:bg-brand-red hover:text-on-red"
            aria-label="Slide tiếp"
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>

        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-4">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full shadow-sm transition-all ${
                index === activeIndex
                  ? "w-8 bg-brand-gold"
                  : "w-2 bg-white/70 hover:bg-white"
              }`}
              aria-label={`Chuyển tới slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <ScrollReveal className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <StatsGrid stats={heroStats} layout="row" />
      </ScrollReveal>
    </section>
  );
}
