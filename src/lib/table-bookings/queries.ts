import { cache } from "react";

import { createPrivilegedClient } from "@/lib/supabase/privileged";
import type { TableBooking } from "@/types/database";

const tableBookingColumns =
  "id, full_name, phone, guest_count, branch_id, booking_date, booking_time, note, status, created_at" as const;

export const getTableBookings = cache(async (): Promise<TableBooking[]> => {
  const supabase = await createPrivilegedClient();

  const { data, error } = await supabase
    .from("table_bookings")
    .select(tableBookingColumns)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[table-bookings] getTableBookings:", error.message);
    return [];
  }

  return (data ?? []) as TableBooking[];
});
