import { NextResponse } from "next/server";

import {
  emailNotConfiguredError,
  serverError,
  validationError,
} from "@/lib/api/errors";
import { sendEventBookingEmail } from "@/lib/email/send-event-booking";
import { insertEventBooking } from "@/lib/event-bookings/insert";
import { getEmailConfig, getSupabaseServiceConfig } from "@/lib/env-server";
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

  const supabaseConfig = getSupabaseServiceConfig();
  const emailConfig = getEmailConfig();

  if (!supabaseConfig && !emailConfig) {
    console.error("[api/event-booking] Neither Supabase service role nor email is configured");
    return emailNotConfiguredError();
  }

  try {
    if (supabaseConfig) {
      await insertEventBooking(parsed.data);
    } else {
      console.warn("[api/event-booking] SUPABASE_SERVICE_ROLE_KEY not set — skipping DB insert");
    }

    if (emailConfig) {
      await sendEventBookingEmail(parsed.data);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_NOT_CONFIGURED") {
      return emailNotConfiguredError();
    }

    console.error("[api/event-booking]", error);
    return serverError();
  }
}
