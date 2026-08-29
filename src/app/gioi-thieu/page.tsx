import { AboutPageContent } from "@/components/about/about-page-content";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Giới thiệu",
  description:
    "Giới thiệu Ốc Đêm Chú Đỉnh — hệ thống ốc nướng sốt trứng muối & lẩu hải sản đêm hàng đầu Sài Gòn.",
  path: "/gioi-thieu",
});

export default function AboutPage() {
  return <AboutPageContent />;
}
