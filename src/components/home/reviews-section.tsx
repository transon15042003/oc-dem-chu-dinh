"use client";

import { Quote, Star } from "lucide-react";

import { InteractiveCard } from "@/components/shared/interactive-card";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { reviews } from "@/data/homepage";

export function ReviewsSection() {
  return (
    <section className="border-b border-border py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl space-y-10 px-4">
        <SectionHeading
          eyebrow="Nhận xét thực khách"
          title="Đánh giá từ khách hàng"
          description="Hơn 270+ nhận xét 5 sao từ thực khách tại 3 chi nhánh Sài Gòn"
        />

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4 py-2">
            {reviews.map((review, index) => (
              <CarouselItem
                key={review.id}
                className="basis-full pl-4 md:basis-1/2 xl:basis-1/3"
              >
                <InteractiveCard
                  delay={index * 0.04}
                  className="h-full p-6 transition-colors hover:bg-white/[0.03] hover:shadow-[inset_0_0_0_1px_rgba(242,178,51,0.45)]"
                >
                  <div className="flex h-full flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <Quote className="size-8 text-brand-gold/50" />
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="size-4 fill-brand-gold text-brand-gold"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-brand-cream-muted">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                    <div className="border-t border-border pt-4">
                      <p className="font-bold text-foreground">{review.name}</p>
                      <p className="text-xs text-brand-cream-muted">{review.role}</p>
                    </div>
                  </div>
                </InteractiveCard>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 hidden border-border bg-brand-dark-soft text-brand-gold hover:bg-brand-red hover:text-on-red sm:flex" />
          <CarouselNext className="right-0 hidden border-border bg-brand-dark-soft text-brand-gold hover:bg-brand-red hover:text-on-red sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
