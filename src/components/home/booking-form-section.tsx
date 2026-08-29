"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
import { branchOptions, guestCountOptions } from "@/data/branches";
import { bookingSectionId } from "@/config/site";
import {
  bookingFormSchema,
  type BookingFormValues,
} from "@/lib/validations/booking";
import { submitForm } from "@/lib/submit-form";

export function BookingFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      guestCount: "",
      branchId: "",
      date: "",
      time: "",
      note: "",
    },
  });

  const guestCount = useWatch({ control, name: "guestCount" });
  const branchId = useWatch({ control, name: "branchId" });

  const onSubmit = async (data: BookingFormValues) => {
    setSubmitError(null);
    const result = await submitForm("/api/booking", data);

    if (!result.ok) {
      setSubmitError(result.message);
      return;
    }

    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section
      id={bookingSectionId}
      className="scroll-mt-28 bg-[radial-gradient(circle_at_top,_rgba(214,31,38,0.15),_transparent_50%)] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl space-y-8 px-4">
        <SectionHeading
          title="Đặt bàn ngay"
          description="Vui lòng nhập thông tin để chúng tôi phục vụ tốt nhất"
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
            <div className="space-y-2 sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
              <div className="space-y-2">
                <Label htmlFor="fullName">Họ và tên *</Label>
                <Input
                  id="fullName"
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
                <Label htmlFor="phone">Số điện thoại *</Label>
                <Input
                  id="phone"
                  placeholder="0901234567"
                  className="h-11 border-border bg-brand-dark-soft"
                  aria-invalid={Boolean(errors.phone)}
                  {...register("phone")}
                />
                {errors.phone ? (
                  <p className="text-xs text-red-400">{errors.phone.message}</p>
                ) : null}
              </div>
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
              <Label htmlFor="date">Ngày đặt *</Label>
              <Input
                id="date"
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
              <Label htmlFor="time">Giờ đặt *</Label>
              <Input
                id="time"
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
              <Label htmlFor="note">Ghi chú thêm</Label>
              <Textarea
                id="note"
                rows={4}
                placeholder="Yêu cầu đặc biệt, dị ứng thực phẩm..."
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
              "Đặt bàn ngay"
            )}
          </Button>

          {submitError ? (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300">
              {submitError}
            </p>
          ) : null}

          {submitted ? (
            <p className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-center text-sm text-green-300">
              Đã ghi nhận yêu cầu đặt bàn! Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.
            </p>
          ) : null}
        </motion.form>
      </div>
    </section>
  );
}
