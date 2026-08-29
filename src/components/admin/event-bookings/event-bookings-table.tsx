import { branches, guestCountOptions } from "@/data/branches";
import { getEventTypeLabel } from "@/data/event-booking";
import type { EventBooking } from "@/types/database";

type EventBookingsTableProps = {
  bookings: EventBooking[];
};

export function EventBookingsTable({ bookings }: EventBookingsTableProps) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
        Chưa có yêu cầu đặt tiệc nào.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/50 text-left">
          <tr>
            <th className="px-4 py-3 font-semibold">Khách hàng</th>
            <th className="px-4 py-3 font-semibold">Loại tiệc</th>
            <th className="px-4 py-3 font-semibold">Thời gian</th>
            <th className="px-4 py-3 font-semibold">Chi nhánh</th>
            <th className="px-4 py-3 font-semibold">Ghi chú</th>
            <th className="px-4 py-3 font-semibold">Nhận lúc</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-t border-border align-top">
              <td className="px-4 py-3">
                <p className="font-medium">{booking.full_name}</p>
                <p className="text-xs text-muted-foreground">{booking.phone}</p>
                {booking.company_name ? (
                  <p className="mt-1 text-xs text-muted-foreground">{booking.company_name}</p>
                ) : null}
              </td>
              <td className="px-4 py-3">
                <p>{getEventTypeLabel(booking.event_type)}</p>
                <p className="text-xs text-muted-foreground">
                  {resolveGuestCountLabel(booking.guest_count)}
                </p>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {formatEventDate(booking.event_date)}
                <br />
                {booking.event_time}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {resolveBranchLabel(booking.branch_id)}
              </td>
              <td className="max-w-xs px-4 py-3 text-muted-foreground">
                {booking.note?.trim() || "—"}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {formatDateTime(booking.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function resolveBranchLabel(branchId: string): string {
  const branch = branches.find((item) => item.id === branchId);
  return branch ? `${branch.badge} — ${branch.name}` : branchId;
}

function resolveGuestCountLabel(guestCount: string): string {
  const option = guestCountOptions.find((item) => item.value === guestCount);
  return option?.label ?? guestCount;
}

function formatEventDate(value: string): string {
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(new Date(value));
}

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
