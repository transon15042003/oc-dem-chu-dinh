import { Resend } from "resend";

import { getEmailConfig } from "@/lib/env-server";

type SendEmailInput = {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export async function sendTransactionalEmail(input: SendEmailInput): Promise<void> {
  const config = getEmailConfig();
  if (!config) {
    throw new Error("EMAIL_NOT_CONFIGURED");
  }

  const resend = new Resend(config.apiKey);
  const { error } = await resend.emails.send({
    from: config.from,
    to: config.to,
    replyTo: input.replyTo,
    subject: input.subject,
    html: input.html,
    text: input.text,
  });

  if (error) {
    throw new Error(error.message);
  }
}
