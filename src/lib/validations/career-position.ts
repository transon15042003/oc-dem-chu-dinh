import { z } from "zod";

export const careerPositionFormSchema = z.object({
  title: z.string().trim().min(1, "Tiêu đề không được để trống").max(200),
  slug: z
    .string()
    .trim()
    .min(1, "Slug không được để trống")
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug chỉ gồm chữ thường, số và dấu gạch ngang"),
  badge: z.string().trim().max(100).optional().or(z.literal("")),
  incomeLabel: z.string().trim().max(200).optional().or(z.literal("")),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  schedule: z.string().trim().max(200).optional().or(z.literal("")),
  salary: z.string().trim().max(200).optional().or(z.literal("")),
  perks: z.string().trim().max(3000).optional().or(z.literal("")),
  status: z.enum(["draft", "published"]),
  showOnListing: z.enum(["true", "false"]),
  sortOrder: z.coerce.number().int().min(0).max(9999),
});

export type CareerPositionFormValues = z.infer<typeof careerPositionFormSchema>;
