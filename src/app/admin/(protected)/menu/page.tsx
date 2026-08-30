import Link from "next/link";
import { Suspense } from "react";

import { MenuAdminHub } from "@/components/admin/menu/menu-admin-hub";
import { Button } from "@/components/ui/button";
import {
  countDraftMenuCategories,
  countDraftMenuItems,
  parseMenuAdminFilters,
} from "@/lib/menu/admin-filters";
import { getAdminMenuCategories, getAdminMenuItems } from "@/lib/menu/queries";
import { requireRole } from "@/lib/auth/session";

type AdminMenuPageProps = {
  searchParams: Promise<{
    view?: string;
    status?: string;
    category?: string;
    q?: string;
    hot?: string;
  }>;
};

export default async function AdminMenuPage({ searchParams }: AdminMenuPageProps) {
  await requireRole(["admin", "editor"]);
  const params = await searchParams;
  const filters = parseMenuAdminFilters(params);

  const [categories, items] = await Promise.all([
    getAdminMenuCategories(),
    getAdminMenuItems(),
  ]);

  const draftCategoryCount = countDraftMenuCategories(categories);
  const draftItemCount = countDraftMenuItems(items);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Thực đơn</h1>
          <p className="text-muted-foreground">
            Quản lý danh mục và món ăn hiển thị tại /thuc-don.
            {draftItemCount > 0 || draftCategoryCount > 0 ? (
              <span className="ml-1 font-medium text-foreground">
                ({draftCategoryCount > 0 ? `${draftCategoryCount} danh mục nháp` : ""}
                {draftCategoryCount > 0 && draftItemCount > 0 ? ", " : ""}
                {draftItemCount > 0 ? `${draftItemCount} món nháp` : ""})
              </span>
            ) : null}
          </p>
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

      <Suspense fallback={null}>
        <MenuAdminHub
          categories={categories}
          items={items}
          filters={filters}
          draftCategoryCount={draftCategoryCount}
          draftItemCount={draftItemCount}
        />
      </Suspense>
    </div>
  );
}
