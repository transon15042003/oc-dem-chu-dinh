"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { BranchMapSection } from "@/components/shared/branch-map-section";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { branches } from "@/data/branches";
import { siteConfig } from "@/config/site";
import { formatHotline, hotlineHref, publicEnv } from "@/lib/env";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";
import { submitForm } from "@/lib/submit-form";

export function ContactPageContent() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const hotline = publicEnv.hotline;
  const email = publicEnv.email;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitError(null);
    const result = await submitForm("/api/contact", data);

    if (!result.ok) {
      setSubmitError(result.message);
      return;
    }

    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Liên hệ" },
        ]}
        title="Liên hệ với Ốc Đêm Chú Đỉnh"
        description="Chúng tôi luôn sẵn sàng lắng nghe & phục vụ thực khách. Quý khách có nhu cầu đặt bàn, tư vấn menu đặt tiệc xin vui lòng gửi thông tin hoặc gọi hotline bên dưới."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ScrollReveal>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
                Thông tin liên hệ
              </p>
              <h2 className="text-2xl font-black uppercase text-foreground">
                {siteConfig.name}
              </h2>
              <p className="text-sm text-brand-cream-muted">{siteConfig.tagline}</p>

              <ul className="space-y-4 text-sm text-brand-cream-muted">
                {hotline ? (
                  <li className="flex gap-3">
                    <Phone className="mt-0.5 size-4 shrink-0 text-brand-gold" />
                    <span>
                      <strong className="text-foreground">Hotline đặt bàn (24/7):</strong>{" "}
                      <a
                        href={hotlineHref(hotline)}
                        className="text-brand-gold hover:underline"
                      >
                        {formatHotline(hotline)}
                      </a>{" "}
                      ({hotline})
                    </span>
                  </li>
                ) : null}
                <li className="flex gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-brand-gold" />
                  <span>
                    <strong className="text-foreground">Thời gian mở cửa:</strong>{" "}
                    {siteConfig.hours}
                  </span>
                </li>
                {email ? (
                  <li className="flex gap-3">
                    <Mail className="mt-0.5 size-4 shrink-0 text-brand-gold" />
                    <span>
                      <strong className="text-foreground">Email hỗ trợ:</strong>{" "}
                      <a
                        href={`mailto:${email}`}
                        className="text-brand-gold hover:underline"
                      >
                        {email}
                      </a>
                    </span>
                  </li>
                ) : null}
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
                Hệ thống chi nhánh
              </p>
              <ul className="space-y-4">
                {branches.map((branch) => (
                  <li
                    key={branch.id}
                    className="rounded-xl border border-border bg-brand-dark-soft p-4"
                  >
                    <p className="font-bold text-foreground">{branch.name}</p>
                    <p className="mt-1 flex gap-2 text-sm text-brand-cream-muted">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-brand-gold" />
                      {branch.address}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
                Gửi phản hồi / đóng góp ý kiến
              </p>
              <h2 className="text-xl font-black uppercase text-foreground">
                Liên hệ với Chú Đỉnh
              </h2>
              <p className="text-sm text-brand-cream-muted">
                Ý kiến đóng góp của quý khách giúp chúng tôi ngày càng nâng cao chất
                lượng dịch vụ
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 rounded-2xl border border-border bg-brand-dark-soft p-6"
            >
              <div className="space-y-2">
                <Label htmlFor="contact-fullName">Họ và tên *</Label>
                <Input
                  id="contact-fullName"
                  className="h-11 border-border bg-brand-dark-soft"
                  aria-invalid={Boolean(errors.fullName)}
                  {...register("fullName")}
                />
                {errors.fullName ? (
                  <p className="text-xs text-red-400">{errors.fullName.message}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-phone">Số điện thoại *</Label>
                <Input
                  id="contact-phone"
                  className="h-11 border-border bg-brand-dark-soft"
                  aria-invalid={Boolean(errors.phone)}
                  {...register("phone")}
                />
                {errors.phone ? (
                  <p className="text-xs text-red-400">{errors.phone.message}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">Email liên hệ</Label>
                <Input
                  id="contact-email"
                  type="email"
                  className="h-11 border-border bg-brand-dark-soft"
                  aria-invalid={Boolean(errors.email)}
                  {...register("email")}
                />
                {errors.email ? (
                  <p className="text-xs text-red-400">{errors.email.message}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-subject">Tiêu đề liên hệ *</Label>
                <Input
                  id="contact-subject"
                  className="h-11 border-border bg-brand-dark-soft"
                  aria-invalid={Boolean(errors.subject)}
                  {...register("subject")}
                />
                {errors.subject ? (
                  <p className="text-xs text-red-400">{errors.subject.message}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message">Nội dung tin nhắn *</Label>
                <Textarea
                  id="contact-message"
                  rows={5}
                  className="border-border bg-brand-dark-soft"
                  aria-invalid={Boolean(errors.message)}
                  {...register("message")}
                />
                {errors.message ? (
                  <p className="text-xs text-red-400">{errors.message.message}</p>
                ) : null}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="brand"
                className="h-12 w-full font-bold uppercase"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  "Gửi thư liên hệ"
                )}
              </Button>

              {submitError ? (
                <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300">
                  {submitError}
                </p>
              ) : null}

              {submitted ? (
                <p className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-center text-sm text-green-300">
                  Đã ghi nhận phản hồi! Chúng tôi sẽ liên hệ sớm nhất có thể.
                </p>
              ) : null}
            </form>
          </div>
        </div>
        </ScrollReveal>
      </section>

      <section className="border-t border-border bg-brand-dark-soft py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BranchMapSection />
        </div>
      </section>
    </>
  );
}
