import Link from "next/link";
import { notFound } from "next/navigation";

import { MenuItemForm } from "@/components/admin/menu/menu-item-form";
import { Button } from "@/components/ui/button";
import { getAdminMenuCategories, getMenuItemById } from "@/lib/menu/queries";
import { requireRole } from "@/lib/auth/session";

type AdminEditMenuItemPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditMenuItemPage({ params }: AdminEditMenuItemPageProps) {
  await requireRole(["admin", "editor"]);
  const { id } = await params;
  const [item, categories] = await Promise.all([
    getMenuItemById(id),
    getAdminMenuCategories(),
  ]);

  if (!item) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Sửa món ăn</h1>
          <p className="text-muted-foreground">{item.name}</p>
        </div>
        <Button variant="outline" render={<Link href="/admin/menu" prefetch={false} />}>
          Quay lại
        </Button>
      </div>

      <MenuItemForm mode="edit" categories={categories} item={item} />
    </div>
  );
}
