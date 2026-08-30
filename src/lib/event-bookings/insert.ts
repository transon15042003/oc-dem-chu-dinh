import { createAdminClient } from "@/lib/supabase/admin";
import type { EventBookingFormValues } from "@/lib/validations/event-booking";

export async function insertEventBooking(data: EventBookingFormValues): Promise<void> {
  const supabase = createAdminClient();

  const { error } = await supabase.from("event_bookings").insert({
    full_name: data.fullName,
    phone: data.phone,
    event_type: data.eventType,
    guest_count: data.guestCount,
    branch_id: data.branchId,
    event_date: data.date,
    event_time: data.time,
    company_name: data.companyName?.trim() || null,
    note: data.note?.trim() || null,
  });

  if (error) {
    throw new Error(error.message);
  }
}
