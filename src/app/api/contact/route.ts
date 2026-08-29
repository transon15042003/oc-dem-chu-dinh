import { NextResponse } from "next/server";

import {
  emailNotConfiguredError,
  serverError,
  validationError,
} from "@/lib/api/errors";
import { sendContactEmail } from "@/lib/email/send-contact";
import { contactFormSchema } from "@/lib/validations/contact";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return validationError();
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return validationError();
  }

  try {
    await sendContactEmail(parsed.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_NOT_CONFIGURED") {
      return emailNotConfiguredError();
    }

    console.error("[api/contact]", error);
    return serverError();
  }
}
