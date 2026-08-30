"use client";

import Link from "next/link";
import { Check } from "lucide-react";

import { InteractiveCard } from "@/components/shared/interactive-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { eventServices } from "@/data/homepage";
import { eventBookingSectionId } from "@/config/site";
import { cn } from "@/lib/utils";

export function EventServicesSection() {
  return (
    <section className="border-b border-border py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl space-y-10 px-4">
        <SectionHeading
          eyebrow="Dịch vụ dành cho thực khách"
          title="Dịch vụ đặt tiệc tại Ốc Đêm Chú Đỉnh"
          description="Phục vụ trọn gói từ khâu trang trí, thực đơn món ngon đến không gian tiệc ấm cúng"
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {eventServices.map((service, index) => {
            const Icon = service.icon;

            return (
              <InteractiveCard key={service.id} delay={index * 0.08} className="overflow-hidden">
                <div
                  className={cn(
                    "relative border-b border-border bg-gradient-to-br px-5 py-6",
                    service.accent,
                  )}
                >
                  <div className="absolute top-0 right-0 size-24 rounded-full bg-foreground/5 blur-2xl" />
                  <div className="relative flex items-center gap-4">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-ink/60 text-icon-on-ink shadow-inner">
                      <Icon className="size-7" aria-hidden />
                    </span>
                    <h3 className="text-lg font-extrabold uppercase text-foreground">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <div className="flex h-full flex-col gap-5 p-5">
                  <ul className="space-y-3">
                    {service.perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-start gap-2 text-sm text-brand-cream-muted"
                      >
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
                    Đặt tiệc ngay
                  </Button>
                </div>
              </InteractiveCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
