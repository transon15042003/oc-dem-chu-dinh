import { z } from "zod";

export const articleFormSchema = z.object({
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
  category: z.enum(["khuyen-mai-uu-dai", "tin-tuc-nha-hang", "bi-quyet-am-thuc"]).optional().or(z.literal("")),
  isFeatured: z.enum(["true", "false"]).optional(),
});

export type ArticleFormValues = z.infer<typeof articleFormSchema>;
