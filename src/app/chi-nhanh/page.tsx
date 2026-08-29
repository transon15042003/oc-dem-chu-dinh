import { BranchesPageContent } from "@/components/branches/branches-page-content";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Chi nhánh",
  description:
    "Hệ thống 5 chi nhánh Ốc Đêm Chú Đỉnh tại Gò Vấp, Tân Bình, Thủ Đức, Quận 7 và chi nhánh sắp khai trương.",
  path: "/chi-nhanh",
});

export default function BranchesPage() {
  return <BranchesPageContent />;
}
