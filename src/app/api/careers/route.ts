import { NextResponse } from "next/server";

import {
  emailNotConfiguredError,
  serverError,
  validationError,
} from "@/lib/api/errors";
import { sendCareerApplicationEmail } from "@/lib/email/send-careers";
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

  try {
    await sendCareerApplicationEmail(parsed.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_NOT_CONFIGURED") {
      return emailNotConfiguredError();
    }

    console.error("[api/careers]", error);
    return serverError();
  }
}
