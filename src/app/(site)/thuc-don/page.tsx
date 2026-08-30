import { MenuPageContent } from "@/components/menu/menu-page-content";
import { getPublishedMenuData } from "@/lib/menu/queries";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Thực đơn",
  description:
    "Thực đơn Ốc Đêm Chú Đỉnh — 200+ món ốc nướng, lẩu hải sản & combo tiệc. Phục vụ 16h - 04h sáng.",
  path: "/thuc-don",
});

export default async function MenuPage() {
  const { categories, items, filterTabs } = await getPublishedMenuData();

  return (
    <MenuPageContent categories={categories} items={items} filterTabs={filterTabs} />
  );
}
