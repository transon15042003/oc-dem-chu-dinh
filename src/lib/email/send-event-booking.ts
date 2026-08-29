import { siteConfig } from "@/config/site";
import { branches, guestCountOptions } from "@/data/branches";
import { getEventTypeLabel } from "@/data/event-booking";
import { sendTransactionalEmail } from "@/lib/email/client";
import { formatField, wrapEmailHtml } from "@/lib/email/format";
import type { EventBookingFormValues } from "@/lib/validations/event-booking";

function resolveBranchLabel(branchId: string): string {
  const branch = branches.find((item) => item.id === branchId);
  return branch ? `${branch.badge} — ${branch.name}` : branchId;
}

function resolveGuestCountLabel(guestCount: string): string {
  const option = guestCountOptions.find((item) => item.value === guestCount);
  return option?.label ?? guestCount;
}

export async function sendEventBookingEmail(data: EventBookingFormValues): Promise<void> {
  const branchLabel = resolveBranchLabel(data.branchId);
  const guestLabel = resolveGuestCountLabel(data.guestCount);
  const eventLabel = getEventTypeLabel(data.eventType);
  const company = data.companyName?.trim() || "—";
  const note = data.note?.trim() || "—";

  const html = wrapEmailHtml(
    `[${siteConfig.name}] Yêu cầu đặt tiệc mới`,
    [
      formatField("Họ và tên", data.fullName),
      formatField("Số điện thoại", data.phone),
      formatField("Loại tiệc", eventLabel),
      formatField("Số lượng khách", guestLabel),
      formatField("Chi nhánh", branchLabel),
      formatField("Ngày tổ chức", data.date),
      formatField("Giờ tổ chức", data.time),
      formatField("Công ty / Xuất VAT", company),
      formatField("Ghi chú", note),
    ].join(""),
  );

  const text = [
    `Yêu cầu đặt tiệc mới — ${siteConfig.name}`,
    `Họ và tên: ${data.fullName}`,
    `Số điện thoại: ${data.phone}`,
    `Loại tiệc: ${eventLabel}`,
    `Số lượng khách: ${guestLabel}`,
    `Chi nhánh: ${branchLabel}`,
    `Ngày tổ chức: ${data.date}`,
    `Giờ tổ chức: ${data.time}`,
    `Công ty / Xuất VAT: ${company}`,
    `Ghi chú: ${note}`,
  ].join("\n");

  await sendTransactionalEmail({
    subject: `[Đặt tiệc] ${eventLabel} — ${data.fullName}`,
    html,
    text,
  });
}
