import { Badge } from "@/components/ui/badge";
import { branches, guestCountOptions } from "@/data/branches";
import { getEventTypeLabel } from "@/data/event-booking";
import type { CombinedBookingListItem } from "@/lib/bookings/types";

type AllBookingsTableProps = {
  items: CombinedBookingListItem[];
};

export function AllBookingsTable({ items }: AllBookingsTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
        Chưa có yêu cầu đặt bàn hoặc đặt tiệc nào.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/50 text-left">
          <tr>
            <th className="px-4 py-3 font-semibold">Loại</th>
            <th className="px-4 py-3 font-semibold">Khách hàng</th>
            <th className="px-4 py-3 font-semibold">Chi tiết</th>
            <th className="px-4 py-3 font-semibold">Thời gian</th>
            <th className="px-4 py-3 font-semibold">Chi nhánh</th>
            <th className="px-4 py-3 font-semibold">Nhận lúc</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            if (item.kind === "table") {
              const booking = item.booking;
              return (
                <tr key={`table-${booking.id}`} className="border-t border-border align-top">
                  <td className="px-4 py-3">
                    <Badge variant="outline">Đặt bàn</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{booking.full_name}</p>
                    <p className="text-xs text-muted-foreground">{booking.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {resolveGuestCountLabel(booking.guest_count)}
                    {booking.note?.trim() ? (
                      <p className="mt-1 max-w-xs text-xs">{booking.note}</p>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatBookingDate(booking.booking_date)}
                    <br />
                    {booking.booking_time}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {resolveBranchLabel(booking.branch_id)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDateTime(booking.created_at)}
                  </td>
                </tr>
              );
            }

            const booking = item.booking;
            return (
              <tr key={`event-${booking.id}`} className="border-t border-border align-top">
                <td className="px-4 py-3">
                  <Badge variant="hot">Đặt tiệc</Badge>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium">{booking.full_name}</p>
                  <p className="text-xs text-muted-foreground">{booking.phone}</p>
                  {booking.company_name ? (
                    <p className="mt-1 text-xs text-muted-foreground">{booking.company_name}</p>
                  ) : null}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {getEventTypeLabel(booking.event_type)}
                  <p className="text-xs">{resolveGuestCountLabel(booking.guest_count)}</p>
                  {booking.note?.trim() ? (
                    <p className="mt-1 max-w-xs text-xs">{booking.note}</p>
                  ) : null}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatBookingDate(booking.event_date)}
                  <br />
                  {booking.event_time}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {resolveBranchLabel(booking.branch_id)}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatDateTime(booking.created_at)}
                </td>
              </tr>
            );
          })}
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

function formatBookingDate(value: string): string {
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(new Date(value));
}

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
