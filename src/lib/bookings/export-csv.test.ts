import { describe, expect, it } from "vitest";

import { bookingsToCsv } from "@/lib/bookings/export-csv";
import { filterBookings, mergeBookings } from "@/lib/bookings/types";
import type { EventBooking, TableBooking } from "@/types/database";

const tableBooking: TableBooking = {
  id: "11111111-1111-1111-1111-111111111111",
  full_name: "Nguyen Van A",
  phone: "0901234567",
  guest_count: "3-5",
  branch_id: "cn1",
  booking_date: "2026-08-30",
  booking_time: "19:00",
  note: "Gần cửa",
  status: "pending",
  created_at: "2026-08-30T10:00:00.000Z",
};

const eventBooking: EventBooking = {
  id: "22222222-2222-2222-2222-222222222222",
  full_name: "Tran Thi B",
  phone: "0912345678",
  event_type: "sinh-nhat",
  guest_count: "6-10",
  branch_id: "cn2",
  event_date: "2026-09-01",
  event_time: "18:30",
  company_name: null,
  note: "Cần trang trí",
  status: "processed",
  created_at: "2026-08-30T11:00:00.000Z",
};

describe("bookings export csv", () => {
  it("includes UTF-8 BOM and Vietnamese headers", () => {
    const csv = bookingsToCsv(mergeBookings([tableBooking], [eventBooking]));
    expect(csv.startsWith("\uFEFFLoại,")).toBe(true);
    expect(csv).toContain("Nguyen Van A");
    expect(csv).toContain("Tran Thi B");
  });
});

describe("bookings filters", () => {
  it("filters by booking type and status", () => {
    const items = mergeBookings([tableBooking], [eventBooking]);
    const filtered = filterBookings(items, {
      type: "event",
      status: "processed",
      branch: "",
      query: "",
    });

    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.kind).toBe("event");
  });
});
