import Link from "next/link";
import { notFound } from "next/navigation";

import { MenuCategoryForm } from "@/components/admin/menu/menu-category-form";
import { Button } from "@/components/ui/button";
import { getMenuCategoryById } from "@/lib/menu/queries";
import { requireRole } from "@/lib/auth/session";

type AdminEditMenuCategoryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditMenuCategoryPage({ params }: AdminEditMenuCategoryPageProps) {
  await requireRole(["admin", "editor"]);
  const { id } = await params;
  const category = await getMenuCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Sửa danh mục</h1>
          <p className="text-muted-foreground">{category.name}</p>
        </div>
        <Button variant="outline" render={<Link href="/admin/menu" prefetch={false} />}>
          Quay lại
        </Button>
      </div>

      <MenuCategoryForm mode="edit" category={category} />
    </div>
  );
}
