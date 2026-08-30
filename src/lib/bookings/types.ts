import type { EventBooking, TableBooking } from "@/types/database";

export type BookingFilterType = "all" | "table" | "event";

export type TableBookingListItem = {
  kind: "table";
  created_at: string;
  booking: TableBooking;
};

export type EventBookingListItem = {
  kind: "event";
  created_at: string;
  booking: EventBooking;
};

export type CombinedBookingListItem = TableBookingListItem | EventBookingListItem;

export function parseBookingFilterType(value: string | undefined): BookingFilterType {
  if (value === "table" || value === "event" || value === "all") {
    return value;
  }

  return "all";
}

export function mergeBookings(
  tableBookings: TableBooking[],
  eventBookings: EventBooking[],
): CombinedBookingListItem[] {
  const items: CombinedBookingListItem[] = [
    ...tableBookings.map(
      (booking): TableBookingListItem => ({
        kind: "table",
        created_at: booking.created_at,
        booking,
      }),
    ),
    ...eventBookings.map(
      (booking): EventBookingListItem => ({
        kind: "event",
        created_at: booking.created_at,
        booking,
      }),
    ),
  ];

  return items.sort(
    (left, right) => new Date(right.created_at).getTime() - new Date(left.created_at).getTime(),
  );
}
