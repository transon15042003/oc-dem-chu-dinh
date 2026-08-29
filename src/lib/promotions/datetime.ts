export function toDatetimeLocalValue(iso: string): string {
  const date = new Date(iso);
  const pad = (value: number) => String(value).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function toIsoFromDatetimeLocal(value: string): string {
  return new Date(value).toISOString();
}

export function formatPromotionDateRange(startsAt: string, endsAt: string): string {
  const formatter = new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" });
  return `${formatter.format(new Date(startsAt))} – ${formatter.format(new Date(endsAt))}`;
}

export function isPromotionActive(
  promotion: Pick<{ status: string; starts_at: string; ends_at: string }, "status" | "starts_at" | "ends_at">,
  now = new Date(),
): boolean {
  if (promotion.status !== "published") return false;

  const starts = new Date(promotion.starts_at).getTime();
  const ends = new Date(promotion.ends_at).getTime();
  const current = now.getTime();

  return starts <= current && ends > current;
}
