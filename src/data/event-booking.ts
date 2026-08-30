import type { EventBookingType } from "@/types/database";

export const eventTypeOptions: Array<{ value: EventBookingType; label: string }> = [
  { value: "sinh-nhat", label: "Sinh nhật" },
  { value: "thoi-noi", label: "Thôi nôi / Báo hỷ" },
  { value: "tat-nien", label: "Tất niên / Tân niên" },
  { value: "lien-hoan", label: "Liên hoan" },
];

export function getEventTypeLabel(type: EventBookingType): string {
  return eventTypeOptions.find((item) => item.value === type)?.label ?? type;
}
