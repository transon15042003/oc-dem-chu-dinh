import { siteConfig } from "@/config/site";
import { branches } from "@/data/branches";
import { getCareerPositionLabel } from "@/data/careers";
import { sendTransactionalEmail } from "@/lib/email/client";
import { formatField, wrapEmailHtml } from "@/lib/email/format";
import type { CareerApplicationFormValues } from "@/lib/validations/careers";

function resolveBranchLabel(branchId: string): string {
  const branch = branches.find((item) => item.id === branchId);
  return branch ? `${branch.badge} — ${branch.address}` : branchId;
}

export async function sendCareerApplicationEmail(
  data: CareerApplicationFormValues,
): Promise<void> {
  const positionLabel = getCareerPositionLabel(data.position);
  const branchLabel = resolveBranchLabel(data.branchId);
  const email = data.email.trim() || "—";
  const experience = data.experience?.trim() || "—";

  const html = wrapEmailHtml(
    `[${siteConfig.name}] Hồ sơ ứng tuyển mới`,
    [
      formatField("Họ và tên", data.fullName),
      formatField("Số điện thoại", data.phone),
      formatField("Vị trí ứng tuyển", positionLabel),
      formatField("Chi nhánh", branchLabel),
      formatField("Email", email),
      formatField("Kinh nghiệm / Ghi chú", experience),
    ].join(""),
  );

  const text = [
    `Hồ sơ ứng tuyển mới — ${siteConfig.name}`,
    `Họ và tên: ${data.fullName}`,
    `Số điện thoại: ${data.phone}`,
    `Vị trí: ${positionLabel}`,
    `Chi nhánh: ${branchLabel}`,
    `Email: ${email}`,
    `Kinh nghiệm / Ghi chú: ${experience}`,
  ].join("\n");

  await sendTransactionalEmail({
    subject: `[Tuyển dụng] ${positionLabel} — ${data.fullName}`,
    html,
    text,
    replyTo: data.email.trim() || undefined,
  });
}
