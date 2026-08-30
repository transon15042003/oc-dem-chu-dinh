import Link from "next/link";

import { MenuCategoryForm } from "@/components/admin/menu/menu-category-form";
import { Button } from "@/components/ui/button";
import { requireRole } from "@/lib/auth/session";

export default async function AdminNewMenuCategoryPage() {
  await requireRole(["admin", "editor"]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Tạo danh mục mới</h1>
          <p className="text-muted-foreground">Thêm nhóm món cho trang thực đơn</p>
        </div>
        <Button variant="outline" render={<Link href="/admin/menu" prefetch={false} />}>
          Quay lại
        </Button>
      </div>

      <MenuCategoryForm mode="create" />
    </div>
  );
}
