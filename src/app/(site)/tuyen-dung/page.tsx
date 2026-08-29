import { CareersPageContent } from "@/components/careers/careers-page-content";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Tuyển dụng",
  description:
    "Tuyển dụng nhân sự Ốc Đêm Chú Đỉnh — nhân viên phục vụ, tiếp thực, thu ngân. Thu nhập hấp dẫn, bao ăn, tip & thưởng doanh thu.",
  path: "/tuyen-dung",
});

export default function CareersPage() {
  return <CareersPageContent />;
}
