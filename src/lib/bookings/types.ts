import type { EventBooking, TableBooking } from "@/types/database";

export type BookingFilterType = "all" | "table" | "event";

export type BookingStatusFilter = "all" | "pending" | "processed";

export type BookingsListFilters = {
  type: BookingFilterType;
  status: BookingStatusFilter;
  branch: string;
  query: string;
};

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

export function parseBookingStatusFilter(value: string | undefined): BookingStatusFilter {
  if (value === "pending" || value === "processed" || value === "all") {
    return value;
  }

  return "all";
}

export function parseBookingsListFilters(searchParams: {
  type?: string;
  status?: string;
  branch?: string;
  q?: string;
}): BookingsListFilters {
  return {
    type: parseBookingFilterType(searchParams.type),
    status: parseBookingStatusFilter(searchParams.status),
    branch: searchParams.branch?.trim() ?? "",
    query: searchParams.q?.trim() ?? "",
  };
}

export function buildBookingsHref(filters: Partial<BookingsListFilters>): string {
  const params = new URLSearchParams();

  if (filters.type && filters.type !== "all") {
    params.set("type", filters.type);
  }

  if (filters.status && filters.status !== "all") {
    params.set("status", filters.status);
  }

  if (filters.branch) {
    params.set("branch", filters.branch);
  }

  if (filters.query) {
    params.set("q", filters.query);
  }

  const query = params.toString();
  return query ? `/admin/bookings?${query}` : "/admin/bookings";
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

export function filterBookings(
  items: CombinedBookingListItem[],
  filters: BookingsListFilters,
): CombinedBookingListItem[] {
  const normalizedQuery = filters.query.toLowerCase();

  return items.filter((item) => {
    if (filters.type !== "all" && item.kind !== filters.type) {
      return false;
    }

    if (filters.status !== "all" && item.booking.status !== filters.status) {
      return false;
    }

    if (filters.branch && item.booking.branch_id !== filters.branch) {
      return false;
    }

    if (normalizedQuery) {
      const haystack = `${item.booking.full_name} ${item.booking.phone}`.toLowerCase();
      if (!haystack.includes(normalizedQuery)) {
        return false;
      }
    }

    return true;
  });
}

export function countPendingBookings(items: CombinedBookingListItem[]): number {
  return items.filter((item) => item.booking.status === "pending").length;
}
