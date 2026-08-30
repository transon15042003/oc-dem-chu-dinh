import { z } from "zod";

export const menuCategoryFormSchema = z.object({
  name: z.string().min(2, "Tên danh mục quá ngắn").max(120, "Tên danh mục quá dài"),
  slug: z.string().max(80, "Slug quá dài").optional(),
  description: z.string().max(500, "Mô tả quá dài").optional(),
  status: z.enum(["draft", "published"]),
  showInFilter: z.enum(["true", "false"]),
  sortOrder: z.coerce.number().int().min(0).max(9999),
});

export const menuItemFormSchema = z.object({
  name: z.string().min(2, "Tên món quá ngắn").max(160, "Tên món quá dài"),
  slug: z.string().max(80, "Slug quá dài").optional(),
  categoryId: z.string().uuid("Vui lòng chọn danh mục"),
  imagePath: z
    .string()
    .min(3, "Đường dẫn ảnh không hợp lệ")
    .max(300, "Đường dẫn ảnh quá dài"),
  searchTerms: z.string().max(300, "Từ khóa tìm kiếm quá dài").optional(),
  status: z.enum(["draft", "published"]),
  isHot: z.enum(["true", "false"]),
  sortOrder: z.coerce.number().int().min(0).max(9999),
});

export type MenuCategoryFormValues = z.infer<typeof menuCategoryFormSchema>;
export type MenuItemFormValues = z.infer<typeof menuItemFormSchema>;
