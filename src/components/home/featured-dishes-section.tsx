"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, ZoomIn } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import {
  carouselNavButtonClass,
  ScrollCarouselShell,
} from "@/components/shared/scroll-carousel-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { featuredDishes } from "@/data/homepage";
import { formatPrice } from "@/lib/format";
import { hoverImageClass } from "@/lib/motion";
import { bookingSectionId } from "@/config/site";
import { cn } from "@/lib/utils";

export function FeaturedDishesSection() {
  return (
    <section className="border-b border-border bg-brand-dark-soft py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl space-y-10 px-4">
        <SectionHeading
          eyebrow="🔥 Thực đơn đặc sắc Chú Đỉnh"
          title="Món ngon bán chạy nhất"
          description="Hải sản & ốc nướng sốt độc quyền được chế biến nóng hổi ngay khi khách gọi món"
        />

        <ScrollCarouselShell hint="Vuốt để xem thêm món">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {featuredDishes.map((dish, index) => (
              <CarouselItem
                key={dish.id}
                className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
              >
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group overflow-hidden rounded-2xl border border-border bg-brand-dark"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className={cn("object-cover", hoverImageClass)}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                    {dish.hot ? (
                      <Badge variant="hot" className="absolute top-3 left-3 gap-1">
                        <Flame className="size-3" />
                        HOT
                      </Badge>
                    ) : null}
                    <p className="absolute top-3 right-3 rounded-full bg-ink/80 px-3 py-1 text-sm font-bold text-brand-gold-on-ink backdrop-blur-sm">
                      {formatPrice(dish.price)}
                    </p>
                    <button
                      type="button"
                      className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-medium text-on-dark backdrop-blur-sm transition-colors hover:bg-ink/90"
                      aria-label={`Xem phóng to ${dish.name}`}
                    >
                      <ZoomIn className="size-3.5" />
                      Xem phóng to
                    </button>
                  </div>

                  <div className="space-y-4 p-5">
                    <div>
                      <h3 className="text-lg font-bold uppercase text-foreground">
                        {dish.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-brand-cream-muted">
                        {dish.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs font-medium uppercase tracking-wide text-brand-gold">
                        Phục vụ nóng hổi
                      </span>
                      <Button
                        render={<Link href={`/#${bookingSectionId}`} />}
                        variant="brand"
                        size="sm"
                      >
                        Đặt bàn ngay
                      </Button>
                    </div>
                  </div>
                </motion.article>
              </CarouselItem>
            ))}
          </CarouselContent>
            <CarouselPrevious
              hideWhenDisabled={false}
              className={cn(carouselNavButtonClass, "left-0")}
            />
            <CarouselNext
              hideWhenDisabled={false}
              className={cn(carouselNavButtonClass, "right-0")}
            />
          </Carousel>
        </ScrollCarouselShell>

        <div className="text-center">
          <Button
            render={<Link href="/thuc-don" />}
            className="h-11 bg-brand-gold px-8 font-bold uppercase text-brand-dark hover:bg-brand-gold/90"
          >
            Khám phá thực đơn tất cả 180+ món
          </Button>
        </div>
      </div>
    </section>
  );
}
