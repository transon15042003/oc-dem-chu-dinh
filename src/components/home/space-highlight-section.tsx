"use client";

import Link from "next/link";

import { InteractiveCard } from "@/components/shared/interactive-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { StatsGrid } from "@/components/shared/stats-grid";
import { Button } from "@/components/ui/button";
import { spaceFeatures, spaceStats } from "@/data/homepage";

export function SpaceHighlightSection() {
  return (
    <section className="border-b border-border bg-brand-dark-soft py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:space-y-10">
        <SectionHeading
          align="center"
          eyebrow="Điểm đến ẩm thực đêm sầm uất"
          title="Không gian rộng rãi & thoáng mát"
          description="Phục vụ xuyên đêm từ 15h00 đến 03h00 sáng. Đầy đủ không gian ngoài trời thoáng đãng & phòng tiệc máy lạnh riêng biệt đáp ứng mọi nhu cầu từ bàn 2 khách đến tiệc lớn 100+ khách."
        />

        <StatsGrid stats={spaceStats} layout="grid-2x2" compact />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {spaceFeatures.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <InteractiveCard key={feature.id} delay={index * 0.08} className="p-4 sm:p-5">
                <div className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-red/15 text-brand-red sm:size-12">
                    <Icon className="size-5 sm:size-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold uppercase text-foreground sm:text-base">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-xs text-brand-cream-muted sm:text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </InteractiveCard>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            render={<Link href="/chi-nhanh" />}
            className="h-11 w-full bg-brand-gold px-6 font-bold uppercase text-brand-dark hover:bg-brand-gold/90 sm:w-auto"
          >
            Xem hệ thống chi nhánh
          </Button>
        </div>
      </div>
    </section>
  );
}
