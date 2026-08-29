import { NextResponse } from "next/server";

import {
  emailNotConfiguredError,
  serverError,
  validationError,
} from "@/lib/api/errors";
import { insertCareerApplication } from "@/lib/careers/insert";
import { sendCareerApplicationEmail } from "@/lib/email/send-careers";
import { getSupabaseServiceConfig } from "@/lib/env-server";
import { careerApplicationFormSchema } from "@/lib/validations/careers";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return validationError();
  }

  const parsed = careerApplicationFormSchema.safeParse(body);
  if (!parsed.success) {
    return validationError();
  }

  if (!getSupabaseServiceConfig()) {
    console.error("[api/careers] Supabase service role not configured");
    return serverError();
  }

  try {
    await insertCareerApplication(parsed.data);
    await sendCareerApplicationEmail(parsed.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_NOT_CONFIGURED") {
      return emailNotConfiguredError();
    }

    if (error instanceof Error && error.message === "POSITION_NOT_FOUND") {
      return validationError();
    }

    console.error("[api/careers]", error);
    return serverError();
  }
}
