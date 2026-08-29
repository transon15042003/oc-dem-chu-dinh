import { ContactPageContent } from "@/components/contact/contact-page-content";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Liên hệ",
  description:
    "Liên hệ Ốc Đêm Chú Đỉnh — hotline, email, form phản hồi và bản đồ chi nhánh.",
  path: "/lien-he",
});

export default function LienHePage() {
  return <ContactPageContent />;
}
