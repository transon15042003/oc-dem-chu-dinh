import { createAdminClient } from "@/lib/supabase/admin";
import type { BookingFormValues } from "@/lib/validations/booking";

export async function insertTableBooking(data: BookingFormValues): Promise<void> {
  const supabase = createAdminClient();

  const { error } = await supabase.from("table_bookings").insert({
    full_name: data.fullName,
    phone: data.phone,
    guest_count: data.guestCount,
    branch_id: data.branchId,
    booking_date: data.date,
    booking_time: data.time,
    note: data.note?.trim() || null,
  });

  if (error) {
    throw new Error(error.message);
  }
}
