import { siteConfig } from "@/config/site";
import { sendTransactionalEmail } from "@/lib/email/client";
import { formatField, wrapEmailHtml } from "@/lib/email/format";
import type { ContactFormValues } from "@/lib/validations/contact";

export async function sendContactEmail(data: ContactFormValues): Promise<void> {
  const customerEmail = data.email.trim() || "—";

  const html = wrapEmailHtml(
    `[${siteConfig.name}] Liên hệ mới từ website`,
    [
      formatField("Họ và tên", data.fullName),
      formatField("Số điện thoại", data.phone),
      formatField("Email", customerEmail),
      formatField("Tiêu đề", data.subject),
      formatField("Nội dung", data.message),
    ].join(""),
  );

  const text = [
    `Liên hệ mới — ${siteConfig.name}`,
    `Họ và tên: ${data.fullName}`,
    `Số điện thoại: ${data.phone}`,
    `Email: ${customerEmail}`,
    `Tiêu đề: ${data.subject}`,
    `Nội dung: ${data.message}`,
  ].join("\n");

  await sendTransactionalEmail({
    subject: `[Liên hệ] ${data.subject} — ${data.fullName}`,
    html,
    text,
    replyTo: data.email.trim() || undefined,
  });
}
