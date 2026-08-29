import { siteConfig } from "@/config/site";

function readEnv(key: string): string {
  return process.env[key]?.trim() ?? "";
}

export type EmailConfig = {
  apiKey: string;
  from: string;
  to: string;
};

export function formatFromAddress(email: string): string {
  if (email.includes("<")) {
    return email;
  }

  return `${siteConfig.name} <${email}>`;
}

export function getEmailConfig(): EmailConfig | null {
  const apiKey = readEnv("RESEND_API_KEY");
  const fromEmail = readEnv("BOOKING_FROM_EMAIL");
  const to = readEnv("BOOKING_NOTIFICATION_EMAIL");

  if (!apiKey || !fromEmail || !to) {
    return null;
  }

  return {
    apiKey,
    from: formatFromAddress(fromEmail),
    to,
  };
}

export function getEmailConfigError(): string {
  const missing: string[] = [];
  if (!readEnv("RESEND_API_KEY")) missing.push("RESEND_API_KEY");
  if (!readEnv("BOOKING_FROM_EMAIL")) missing.push("BOOKING_FROM_EMAIL");
  if (!readEnv("BOOKING_NOTIFICATION_EMAIL")) missing.push("BOOKING_NOTIFICATION_EMAIL");

  if (missing.length > 0) {
    return `Thiếu cấu hình email: ${missing.join(", ")}. Vui lòng gọi hotline hoặc thử lại sau.`;
  }

  return "Hệ thống email chưa được cấu hình. Vui lòng gọi hotline hoặc thử lại sau.";
}