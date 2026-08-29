"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { eventBookingSectionId } from "@/config/site";
import { branchOptions, guestCountOptions } from "@/data/branches";
import { eventTypeOptions } from "@/data/event-booking";
import { submitForm } from "@/lib/submit-form";
import {
  eventBookingFormSchema,
  type EventBookingFormValues,
} from "@/lib/validations/event-booking";
import type { EventBookingType } from "@/types/database";

const validEventTypes = new Set(eventTypeOptions.map((item) => item.value));

function parsePresetEventType(value: string | null): EventBookingType | "" {
  if (!value || !validEventTypes.has(value as EventBookingType)) {
    return "";
  }

  return value as EventBookingType;
}

export function EventBookingFormSection() {
  const searchParams = useSearchParams();
  const presetEventType = parsePresetEventType(searchParams.get("event"));
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EventBookingFormValues>({
    resolver: zodResolver(eventBookingFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      eventType: presetEventType || undefined,
      guestCount: "",
      branchId: "",
      date: "",
      time: "",
      companyName: "",
      note: "",
    },
  });

  const guestCount = useWatch({ control, name: "guestCount" });
  const branchId = useWatch({ control, name: "branchId" });
  const eventType = useWatch({ control, name: "eventType" });

  useEffect(() => {
    if (presetEventType) {
      setValue("eventType", presetEventType, { shouldValidate: true });
    }
  }, [presetEventType, setValue]);

  const onSubmit = async (data: EventBookingFormValues) => {
    setSubmitError(null);
    const result = await submitForm("/api/event-booking", data);

    if (!result.ok) {
      setSubmitError(result.message);
      return;
    }

    setSubmitted(true);
    reset({ eventType: presetEventType || undefined });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section
      id={eventBookingSectionId}
      className="scroll-mt-site-header border-b border-border bg-[radial-gradient(circle_at_top,_rgba(214,31,38,0.08),_transparent_55%)] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl space-y-8 px-4">
        <SectionHeading
          eyebrow="Đặt tiệc theo sự kiện"
          title="Đăng ký tổ chức tiệc tại Ốc Đêm Chú Đỉnh"
          description="Sinh nhật, thôi nôi, tất niên, liên hoan — chúng tôi hỗ trợ trọn gói decor, âm thanh và thực đơn"
        />

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 rounded-2xl border border-border bg-brand-dark-soft p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label>Loại tiệc *</Label>
              <Select
                value={eventType}
                onValueChange={(value) =>
                  setValue("eventType", value as EventBookingType, { shouldValidate: true })
                }
              >
                <SelectTrigger className="h-11 w-full border-border bg-brand-dark-soft">
                  <SelectValue placeholder="Chọn loại tiệc" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.eventType ? (
                <p className="text-xs text-red-400">{errors.eventType.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventFullName">Họ và tên *</Label>
              <Input
                id="eventFullName"
                placeholder="Nguyễn Văn A"
                className="h-11 border-border bg-brand-dark-soft"
                aria-invalid={Boolean(errors.fullName)}
                {...register("fullName")}
              />
              {errors.fullName ? (
                <p className="text-xs text-red-400">{errors.fullName.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventPhone">Số điện thoại *</Label>
              <Input
                id="eventPhone"
                placeholder="0901234567"
                className="h-11 border-border bg-brand-dark-soft"
                aria-invalid={Boolean(errors.phone)}
                {...register("phone")}
              />
              {errors.phone ? (
                <p className="text-xs text-red-400">{errors.phone.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label>Số lượng khách *</Label>
              <Select
                value={guestCount}
                onValueChange={(value) =>
                  setValue("guestCount", value ?? "", { shouldValidate: true })
                }
              >
                <SelectTrigger className="h-11 w-full border-border bg-brand-dark-soft">
                  <SelectValue placeholder="Chọn số lượng khách" />
                </SelectTrigger>
                <SelectContent>
                  {guestCountOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.guestCount ? (
                <p className="text-xs text-red-400">{errors.guestCount.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label>Chọn chi nhánh *</Label>
              <Select
                value={branchId}
                onValueChange={(value) =>
                  setValue("branchId", value ?? "", { shouldValidate: true })
                }
              >
                <SelectTrigger className="h-11 w-full border-border bg-brand-dark-soft">
                  <SelectValue placeholder="Chọn chi nhánh" />
                </SelectTrigger>
                <SelectContent>
                  {branchOptions.map((branch) => (
                    <SelectItem
                      key={branch.id}
                      value={branch.id}
                      disabled={branch.disabled}
                    >
                      {branch.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.branchId ? (
                <p className="text-xs text-red-400">{errors.branchId.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventDate">Ngày tổ chức *</Label>
              <Input
                id="eventDate"
                type="date"
                className="h-11 border-border bg-brand-dark-soft"
                aria-invalid={Boolean(errors.date)}
                {...register("date")}
              />
              {errors.date ? (
                <p className="text-xs text-red-400">{errors.date.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventTime">Giờ tổ chức *</Label>
              <Input
                id="eventTime"
                type="time"
                className="h-11 border-border bg-brand-dark-soft"
                aria-invalid={Boolean(errors.time)}
                {...register("time")}
              />
              {errors.time ? (
                <p className="text-xs text-red-400">{errors.time.message}</p>
              ) : null}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="companyName">Tên công ty (nếu cần xuất VAT)</Label>
              <Input
                id="companyName"
                placeholder="Công ty TNHH ..."
                className="h-11 border-border bg-brand-dark-soft"
                {...register("companyName")}
              />
              {errors.companyName ? (
                <p className="text-xs text-red-400">{errors.companyName.message}</p>
              ) : null}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="eventNote">Ghi chú thêm</Label>
              <Textarea
                id="eventNote"
                rows={4}
                placeholder="Yêu cầu decor, menu, số bàn, dị ứng thực phẩm..."
                className="border-border bg-brand-dark-soft"
                {...register("note")}
              />
              {errors.note ? (
                <p className="text-xs text-red-400">{errors.note.message}</p>
              ) : null}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            variant="brand"
            className="h-12 w-full text-base font-bold uppercase"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Đang gửi...
              </>
            ) : (
              "Gửi yêu cầu đặt tiệc"
            )}
          </Button>

          {submitError ? (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300">
              {submitError}
            </p>
          ) : null}

          {submitted ? (
            <p className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-center text-sm text-green-300">
              Đã ghi nhận yêu cầu đặt tiệc! Chúng tôi sẽ liên hệ tư vấn trong thời gian sớm nhất.
            </p>
          ) : null}
        </motion.form>
      </div>
    </section>
  );
}
