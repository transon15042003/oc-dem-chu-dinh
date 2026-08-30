import Link from "next/link";

import { MenuCategoriesTable } from "@/components/admin/menu/menu-categories-table";
import { MenuItemsTable } from "@/components/admin/menu/menu-items-table";
import { Button } from "@/components/ui/button";
import { getAdminMenuCategories, getAdminMenuItems } from "@/lib/menu/queries";
import { requireRole } from "@/lib/auth/session";

export default async function AdminMenuPage() {
  await requireRole(["admin", "editor"]);

  const [categories, items] = await Promise.all([
    getAdminMenuCategories(),
    getAdminMenuItems(),
  ]);

  const itemCountByCategory = items.reduce<Record<string, number>>((counts, item) => {
    counts[item.category_id] = (counts[item.category_id] ?? 0) + 1;
    return counts;
  }, {});

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Thực đơn</h1>
          <p className="text-muted-foreground">Quản lý danh mục và món ăn hiển thị tại /thuc-don</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" render={<Link href="/admin/menu/categories/new" prefetch={false} />}>
            Tạo danh mục
          </Button>
          <Button render={<Link href="/admin/menu/items/new" prefetch={false} />}>
            Tạo món mới
          </Button>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Danh mục</h2>
        <MenuCategoriesTable categories={categories} itemCountByCategory={itemCountByCategory} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Món ăn</h2>
        <MenuItemsTable items={items} />
      </section>
    </div>
  );
}
