export const CONTENT_CATEGORIES = [
  { value: "khuyen-mai-uu-dai", label: "Khuyến Mãi & Ưu Đãi" },
  { value: "tin-tuc-nha-hang", label: "Tin Tức Nhà Hàng" },
  { value: "bi-quyet-am-thuc", label: "Bí Quyết Ẩm Thực" },
] as const;

export type ContentCategory = (typeof CONTENT_CATEGORIES)[number]["value"];

export const CONTENT_CATEGORY_VALUES = CONTENT_CATEGORIES.map((item) => item.value);

export function getContentCategoryLabel(category: ContentCategory | null | undefined): string {
  if (!category) {
    return "Tin tức";
  }

  return CONTENT_CATEGORIES.find((item) => item.value === category)?.label ?? "Tin tức";
}
