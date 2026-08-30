"use server";

import { revalidatePath } from "next/cache";

import { requireRole } from "@/lib/auth/session";
import { createPrivilegedClient } from "@/lib/supabase/privileged";
import type { BookingStatus } from "@/types/database";

export type BookingActionState = {
  ok: boolean;
  message: string;
};

async function updateBookingStatus(
  table: "table_bookings" | "event_bookings",
  id: string,
  status: BookingStatus,
): Promise<BookingActionState> {
  await requireRole(["admin", "editor"]);

  const supabase = await createPrivilegedClient();
  const { error } = await supabase.from(table).update({ status }).eq("id", id);

  if (error) {
    console.error(`[bookings] update ${table} status:`, error.message);
    return { ok: false, message: "Không cập nhật được trạng thái. Vui lòng thử lại." };
  }

  revalidatePath("/admin/bookings");
  return { ok: true, message: status === "processed" ? "Đã đánh dấu xử lý." : "Đã đánh dấu chưa xử lý." };
}

export async function updateTableBookingStatus(
  id: string,
  status: BookingStatus,
): Promise<BookingActionState> {
  return updateBookingStatus("table_bookings", id, status);
}

export async function updateEventBookingStatus(
  id: string,
  status: BookingStatus,
): Promise<BookingActionState> {
  return updateBookingStatus("event_bookings", id, status);
}
