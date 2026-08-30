import Link from "next/link";

import { MenuItemForm } from "@/components/admin/menu/menu-item-form";
import { Button } from "@/components/ui/button";
import { getAdminMenuCategories } from "@/lib/menu/queries";
import { requireRole } from "@/lib/auth/session";

export default async function AdminNewMenuItemPage() {
  await requireRole(["admin", "editor"]);
  const categories = await getAdminMenuCategories();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Tạo món mới</h1>
          <p className="text-muted-foreground">Thêm món ăn vào thực đơn public</p>
        </div>
        <Button variant="outline" render={<Link href="/admin/menu" prefetch={false} />}>
          Quay lại
        </Button>
      </div>

      <MenuItemForm mode="create" categories={categories} />
    </div>
  );
}
