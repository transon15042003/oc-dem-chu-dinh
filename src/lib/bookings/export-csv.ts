import { branches, guestCountOptions } from "@/data/branches";
import { getEventTypeLabel } from "@/data/event-booking";
import type { CombinedBookingListItem } from "@/lib/bookings/types";

function escapeCsvCell(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }

  return value;
}

function resolveBranchLabel(branchId: string): string {
  return branches.find((branch) => branch.id === branchId)?.name ?? branchId;
}

function resolveGuestCountLabel(value: string): string {
  return guestCountOptions.find((option) => option.value === value)?.label ?? value;
}

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatBookingDate(value: string): string {
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(new Date(value));
}

function bookingToRow(item: CombinedBookingListItem): string[] {
  if (item.kind === "table") {
    const booking = item.booking;

    return [
      "Đặt bàn",
      booking.full_name,
      booking.phone,
      resolveGuestCountLabel(booking.guest_count),
      resolveBranchLabel(booking.branch_id),
      formatBookingDate(booking.booking_date),
      booking.booking_time,
      booking.note?.trim() ?? "",
      booking.status === "processed" ? "Đã xử lý" : "Chưa xử lý",
      formatDateTime(booking.created_at),
    ];
  }

  const booking = item.booking;

  return [
    "Đặt tiệc",
    booking.full_name,
    booking.phone,
    resolveGuestCountLabel(booking.guest_count),
    resolveBranchLabel(booking.branch_id),
    formatBookingDate(booking.event_date),
    booking.event_time,
    [
      getEventTypeLabel(booking.event_type),
      booking.company_name?.trim(),
      booking.note?.trim(),
    ]
      .filter(Boolean)
      .join(" | "),
    booking.status === "processed" ? "Đã xử lý" : "Chưa xử lý",
    formatDateTime(booking.created_at),
  ];
}

const CSV_HEADERS = [
  "Loại",
  "Họ tên",
  "Số điện thoại",
  "Số khách",
  "Chi nhánh",
  "Ngày",
  "Giờ",
  "Ghi chú / Chi tiết",
  "Trạng thái",
  "Nhận lúc",
];

export function bookingsToCsv(items: CombinedBookingListItem[]): string {
  const rows = items.map((item) => bookingToRow(item).map(escapeCsvCell).join(","));
  return `\uFEFF${CSV_HEADERS.map(escapeCsvCell).join(",")}\n${rows.join("\n")}`;
}

export function downloadBookingsCsv(items: CombinedBookingListItem[], filenamePrefix = "dat-cho"): void {
  const csv = bookingsToCsv(items);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);

  link.href = url;
  link.download = `${filenamePrefix}-${date}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
