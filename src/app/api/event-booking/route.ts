import { NextResponse } from "next/server";

import {
  emailNotConfiguredError,
  serverError,
  validationError,
} from "@/lib/api/errors";
import { sendEventBookingEmail } from "@/lib/email/send-event-booking";
import { insertEventBooking } from "@/lib/event-bookings/insert";
import { getSupabaseServiceConfig } from "@/lib/env-server";
import { eventBookingFormSchema } from "@/lib/validations/event-booking";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return validationError();
  }

  const parsed = eventBookingFormSchema.safeParse(body);
  if (!parsed.success) {
    return validationError();
  }

  if (!getSupabaseServiceConfig()) {
    console.error("[api/event-booking] Supabase service role not configured");
    return serverError();
  }

  try {
    await insertEventBooking(parsed.data);
    await sendEventBookingEmail(parsed.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_NOT_CONFIGURED") {
      return emailNotConfiguredError();
    }

    console.error("[api/event-booking]", error);
    return serverError();
  }
}
