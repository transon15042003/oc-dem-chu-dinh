import { cache } from "react";

import { createPrivilegedClient } from "@/lib/supabase/privileged";
import type { EventBooking } from "@/types/database";

const eventBookingColumns =
  "id, full_name, phone, event_type, guest_count, branch_id, event_date, event_time, company_name, note, status, created_at" as const;

export const getEventBookings = cache(async (): Promise<EventBooking[]> => {
  const supabase = await createPrivilegedClient();

  const { data, error } = await supabase
    .from("event_bookings")
    .select(eventBookingColumns)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[event-bookings] getEventBookings:", error.message);
    return [];
  }

  return (data ?? []) as EventBooking[];
});
