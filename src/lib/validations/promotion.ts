import { z } from "zod";

const datetimeLocalSchema = z
  .string()
  .trim()
  .min(1, "Thời gian không được để trống")
  .refine((value) => !Number.isNaN(new Date(value).getTime()), "Thời gian không hợp lệ");

export const promotionFormSchema = z
  .object({
    title: z.string().trim().min(1, "Tiêu đề không được để trống").max(200),
    slug: z
      .string()
      .trim()
      .min(1, "Slug không được để trống")
      .max(200)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug chỉ gồm chữ thường, số và dấu gạch ngang"),
    excerpt: z.string().trim().max(500).optional().or(z.literal("")),
    body: z
      .string()
      .refine(
        (html) => html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim().length > 0,
        "Nội dung không được để trống",
      ),
    status: z.enum(["draft", "published"]),
    coverImageUrl: z.string().url().optional().or(z.literal("")),
    startsAt: datetimeLocalSchema,
    endsAt: datetimeLocalSchema,
    discountLabel: z.string().trim().max(100).optional().or(z.literal("")),
    promoCode: z.string().trim().max(50).optional().or(z.literal("")),
  })
  .refine((data) => new Date(data.endsAt).getTime() > new Date(data.startsAt).getTime(), {
    message: "Ngày kết thúc phải sau ngày bắt đầu",
    path: ["endsAt"],
  });

export type PromotionFormValues = z.infer<typeof promotionFormSchema>;
