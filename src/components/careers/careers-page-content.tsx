import Link from "next/link";
import { Suspense } from "react";
import { Check, MapPin, Phone } from "lucide-react";

import { CareerApplicationSection } from "@/components/careers/career-application-form";
import { CareerJobCard } from "@/components/careers/career-job-card";
import { PageHero } from "@/components/shared/page-hero";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Button } from "@/components/ui/button";
import {
  careerBenefits,
  careerInterviewAddress,
  careerJobs,
  careerRequirements,
} from "@/data/careers";
import { formatHotline, hotlineHref, publicEnv } from "@/lib/env";

export function CareersPageContent() {
  const hotline = publicEnv.hotline || "0938186391";
  const zaloUrl = publicEnv.zaloUrl;

  return (
    <>
      <PageHero
        align="center"
        eyebrow="🔥 Hot — Thông báo tuyển dụng nhân sự"
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Tuyển dụng" },
        ]}
        title="Tuyển dụng Ốc Đêm Chú Đỉnh"
        description="Bấm vào từng vị trí bên dưới để xem thông tin chi tiết ca làm, mức lương & nộp hồ sơ!"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {careerJobs.map((job) => (
              <CareerJobCard key={job.id} job={job} />
            ))}
          </div>
        </ScrollReveal>
      </section>

      <Suspense fallback={null}>
        <CareerApplicationSection />
      </Suspense>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-amber-100 bg-card p-6 shadow-md">
              <h2 className="font-heading text-lg font-black uppercase text-brand-red">
                Đãi ngộ tốt cho nhân viên
              </h2>
              <ul className="mt-4 space-y-2">
                {careerBenefits.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-gold" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-amber-100 bg-card p-6 shadow-md">
              <h2 className="font-heading text-lg font-black uppercase text-brand-red">
                Yêu cầu cơ bản
              </h2>
              <ul className="mt-4 space-y-2">
                {careerRequirements.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-gold" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-3xl space-y-4 px-4 text-center sm:px-6">
          <h2 className="font-heading text-xl font-black uppercase text-foreground">
            Địa chỉ phỏng vấn trực tiếp
          </h2>
          <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4 text-brand-red" aria-hidden />
            {careerInterviewAddress}
          </p>
          <p className="text-sm text-muted-foreground">
            Liên hệ Zalo/SĐT trước khi đến phỏng vấn:{" "}
            <a href={hotlineHref(hotline)} className="font-semibold text-brand-red hover:underline">
              {formatHotline(hotline)}
            </a>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              render={<a href={hotlineHref(hotline)} />}
              variant="brand"
              className="font-bold uppercase"
            >
              <Phone className="size-4" aria-hidden />
              Gọi ngay
            </Button>
            {zaloUrl ? (
              <Button
                render={<Link href={zaloUrl} target="_blank" rel="noopener noreferrer" />}
                variant="outline"
                className="font-bold uppercase"
              >
                Chat Zalo
              </Button>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
