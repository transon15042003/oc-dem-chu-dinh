"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Loader2 } from "lucide-react";

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
import { careersApplicationSectionId } from "@/config/site";
import { branchOptions } from "@/data/branches";
import {
  careerPositionOptions,
  type CareerPositionId,
} from "@/data/careers";
import { submitForm } from "@/lib/submit-form";
import {
  careerApplicationFormSchema,
  type CareerApplicationFormValues,
} from "@/lib/validations/careers";

const validPositions = new Set(careerPositionOptions.map((item) => item.value));

function parsePresetPosition(value: string | null): CareerPositionId | "" {
  if (!value || !validPositions.has(value as CareerPositionId)) {
    return "";
  }

  return value as CareerPositionId;
}

export function CareerApplicationForm() {
  const searchParams = useSearchParams();
  const presetPosition = parsePresetPosition(searchParams.get("position"));
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CareerApplicationFormValues>({
    resolver: zodResolver(careerApplicationFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      position: presetPosition || undefined,
      branchId: "",
      email: "",
      experience: "",
    },
  });

  const position = useWatch({ control, name: "position" });
  const branchId = useWatch({ control, name: "branchId" });

  useEffect(() => {
    if (presetPosition) {
      setValue("position", presetPosition, { shouldValidate: true });
    }
  }, [presetPosition, setValue]);

  const onSubmit = async (data: CareerApplicationFormValues) => {
    setSubmitError(null);
    const result = await submitForm("/api/careers", data);

    if (!result.ok) {
      setSubmitError(result.message);
      return;
    }

    setSubmitted(true);
    reset({ position: presetPosition || undefined });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl border border-border bg-brand-dark-soft p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label>Vị trí ứng tuyển *</Label>
          <Select
            value={position}
            onValueChange={(value) =>
              setValue("position", value as CareerPositionId, { shouldValidate: true })
            }
          >
            <SelectTrigger className="h-11 w-full border-border bg-brand-dark-soft">
              <SelectValue placeholder="Chọn vị trí ứng tuyển" />
            </SelectTrigger>
            <SelectContent>
              {careerPositionOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.position ? (
            <p className="text-xs text-red-400">{errors.position.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="careerFullName">Họ và tên *</Label>
          <Input
            id="careerFullName"
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
          <Label htmlFor="careerPhone">Số điện thoại *</Label>
          <Input
            id="careerPhone"
            placeholder="0901234567"
            className="h-11 border-border bg-brand-dark-soft"
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
          {errors.phone ? (
            <p className="text-xs text-red-400">{errors.phone.message}</p>
          ) : null}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label>Chi nhánh muốn làm việc *</Label>
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

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="careerEmail">Email liên hệ (nếu có)</Label>
          <Input
            id="careerEmail"
            type="email"
            placeholder="email@example.com"
            className="h-11 border-border bg-brand-dark-soft"
            {...register("email")}
          />
          {errors.email ? (
            <p className="text-xs text-red-400">{errors.email.message}</p>
          ) : null}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="careerExperience">Kinh nghiệm làm việc / Ghi chú</Label>
          <Textarea
            id="careerExperience"
            rows={4}
            placeholder="Mô tả kinh nghiệm, ca làm mong muốn..."
            className="border-border bg-brand-dark-soft"
            {...register("experience")}
          />
          {errors.experience ? (
            <p className="text-xs text-red-400">{errors.experience.message}</p>
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
          "Nộp hồ sơ ứng tuyển"
        )}
      </Button>

      {submitError ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300">
          {submitError}
        </p>
      ) : null}

      {submitted ? (
        <p className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-center text-sm text-green-300">
          Đã gửi hồ sơ! Bộ phận tuyển dụng sẽ liên hệ trong vòng 24 giờ.
        </p>
      ) : null}
    </form>
  );
}

export function CareerApplicationSection() {
  return (
    <section
      id={careersApplicationSectionId}
      className="scroll-mt-28 border-y border-border bg-muted/20 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-3xl space-y-6 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-black uppercase text-foreground sm:text-3xl">
            Đăng ký ứng tuyển ngay
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Bộ phận Tuyển dụng Chú Đỉnh sẽ liên hệ phỏng vấn trong 24 giờ!
          </p>
        </div>

        <CareerApplicationForm />
      </div>
    </section>
  );
}
