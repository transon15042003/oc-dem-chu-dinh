"use client";

import Link from "next/link";
import { Check } from "lucide-react";

import { InteractiveCard } from "@/components/shared/interactive-card";
import {
  carouselNavButtonMobileClass,
  ScrollCarouselShell,
} from "@/components/shared/scroll-carousel-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { eventServices, type EventService } from "@/data/homepage";
import { eventBookingSectionId } from "@/config/site";
import { cn } from "@/lib/utils";

function EventServiceCard({ service }: { service: EventService }) {
  const Icon = service.icon;

  return (
    <InteractiveCard className="flex h-full flex-col overflow-hidden">
      <div
        className={cn(
          "relative border-b border-border bg-gradient-to-br px-5 py-6",
          service.accent,
        )}
      >
        {service.featured ? (
          <Badge variant="hot" className="absolute top-3 right-3 z-10 text-[10px]">
            ĐẶT NHIỀU NHẤT
          </Badge>
        ) : null}
        <div className="absolute top-0 right-0 size-24 rounded-full bg-foreground/5 blur-2xl" />
        <div className="relative flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-ink/60 text-icon-on-ink shadow-inner">
            <Icon className="size-7" aria-hidden />
          </span>
          <h3 className="text-lg font-extrabold uppercase text-foreground">{service.title}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5">
        <ul className="space-y-3">
          {service.perks.map((perk) => (
            <li key={perk} className="flex items-start gap-2 text-sm text-brand-cream-muted">
              <Check className="mt-0.5 size-4 shrink-0 text-brand-gold" />
              <span>{perk}</span>
            </li>
          ))}
        </ul>
        <Button
          render={<Link href={`/?event=${service.id}#${eventBookingSectionId}`} />}
          variant="brand"
          className="mt-auto w-full font-bold uppercase"
        >
          Đăng ký đặt tiệc
        </Button>
      </div>
    </InteractiveCard>
  );
}

export function EventServicesSection() {
  return (
    <section className="border-b border-border py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl space-y-10 px-4">
        <SectionHeading
          eyebrow="Dịch vụ dành cho thực khách"
          title="Dịch vụ đặt tiệc tại Ốc Đêm Chú Đỉnh"
          description="Phục vụ trọn gói từ khâu trang trí, thực đơn món ngon đến không gian tiệc ấm cúng"
        />

        <div className="hidden gap-5 xl:grid xl:grid-cols-4">
          {eventServices.map((service) => (
            <EventServiceCard key={service.id} service={service} />
          ))}
        </div>

        <ScrollCarouselShell className="xl:hidden" hint="Vuốt để xem thêm loại tiệc">
          <Carousel opts={{ align: "start", loop: false }} className="w-full">
            <CarouselContent className="-ml-4">
              {eventServices.map((service) => (
                <CarouselItem key={service.id} className="basis-[88%] pl-4 sm:basis-[70%] md:basis-[48%]">
                  <EventServiceCard service={service} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              hideWhenDisabled={false}
              className={cn(carouselNavButtonMobileClass, "-left-2 sm:-left-4")}
            />
            <CarouselNext
              hideWhenDisabled={false}
              className={cn(carouselNavButtonMobileClass, "-right-2 sm:-right-4")}
            />
          </Carousel>
        </ScrollCarouselShell>
      </div>
    </section>
  );
}
