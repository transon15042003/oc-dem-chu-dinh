import { siteConfig } from "@/config/site";
import { branches, guestCountOptions } from "@/data/branches";
import { sendTransactionalEmail } from "@/lib/email/client";
import { formatField, wrapEmailHtml } from "@/lib/email/format";
import type { BookingFormValues } from "@/lib/validations/booking";

function resolveBranchLabel(branchId: string): string {
  const branch = branches.find((item) => item.id === branchId);
  return branch ? `${branch.badge} — ${branch.name}` : branchId;
}

function resolveGuestCountLabel(guestCount: string): string {
  const option = guestCountOptions.find((item) => item.value === guestCount);
  return option?.label ?? guestCount;
}

export async function sendBookingEmail(data: BookingFormValues): Promise<void> {
  const branchLabel = resolveBranchLabel(data.branchId);
  const guestLabel = resolveGuestCountLabel(data.guestCount);
  const note = data.note?.trim() || "—";

  const html = wrapEmailHtml(
    `[${siteConfig.name}] Yêu cầu đặt bàn mới`,
    [
      formatField("Họ và tên", data.fullName),
      formatField("Số điện thoại", data.phone),
      formatField("Số lượng khách", guestLabel),
      formatField("Chi nhánh", branchLabel),
      formatField("Ngày đặt", data.date),
      formatField("Giờ đặt", data.time),
      formatField("Ghi chú", note),
    ].join(""),
  );

  const text = [
    `Yêu cầu đặt bàn mới — ${siteConfig.name}`,
    `Họ và tên: ${data.fullName}`,
    `Số điện thoại: ${data.phone}`,
    `Số lượng khách: ${guestLabel}`,
    `Chi nhánh: ${branchLabel}`,
    `Ngày đặt: ${data.date}`,
    `Giờ đặt: ${data.time}`,
    `Ghi chú: ${note}`,
  ].join("\n");

  await sendTransactionalEmail({
    subject: `[Đặt bàn] ${data.fullName} — ${branchLabel}`,
    html,
    text,
  });
}
