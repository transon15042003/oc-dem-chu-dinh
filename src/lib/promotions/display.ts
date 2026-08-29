import type { Promotion } from "@/types/database";

const CATEGORY_BY_DISCOUNT: Record<string, string> = {
  "Giảm 20%": "🔥 HOTTEST DEAL CỦA THÁNG",
  "Tặng trang trí 0đ": "🎂 ƯU ĐÃI SINH NHẬT",
  "Tặng tháp bia": "🍻 TIỆC BIA ĐÊM SÔI ĐỘNG",
  "Giảm 25%": "⚡ COMBO TIẾT KIỆM",
};

export function getPromotionCategoryLabel(
  promotion: Pick<Promotion, "discount_label" | "title">,
): string {
  if (promotion.discount_label && CATEGORY_BY_DISCOUNT[promotion.discount_label]) {
    return CATEGORY_BY_DISCOUNT[promotion.discount_label];
  }

  return promotion.discount_label ?? "ƯU ĐÃI ĐẶC BIỆT";
}

export function formatPromotionDeadline(endsAt: string): string {
  const end = new Date(endsAt);
  const monthsRemaining =
    (end.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30);

  if (monthsRemaining > 14) {
    return "Áp dụng liên tục";
  }

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(end);
}

export function extractBulletPointsFromHtml(html: string): string[] {
  const items: string[] = [];
  const pattern = /<li[^>]*>([\s\S]*?)<\/li>/gi;

  for (const match of html.matchAll(pattern)) {
    const text = match[1]
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .trim();

    if (text) {
      items.push(text);
    }
  }

  return items;
}
