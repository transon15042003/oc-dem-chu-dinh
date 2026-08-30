import { NextResponse } from "next/server";

import {
  emailNotConfiguredError,
  serverError,
  validationError,
} from "@/lib/api/errors";
import { sendBookingEmail } from "@/lib/email/send-booking";
import { insertTableBooking } from "@/lib/table-bookings/insert";
import { getSupabaseServiceConfig } from "@/lib/env-server";
import { bookingFormSchema } from "@/lib/validations/booking";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return validationError();
  }

  const parsed = bookingFormSchema.safeParse(body);
  if (!parsed.success) {
    return validationError();
  }

  if (!getSupabaseServiceConfig()) {
    console.error("[api/booking] Supabase service role not configured");
    return serverError();
  }

  try {
    await insertTableBooking(parsed.data);
    await sendBookingEmail(parsed.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_NOT_CONFIGURED") {
      return emailNotConfiguredError();
    }

    console.error("[api/booking]", error);
    return serverError();
  }
}
