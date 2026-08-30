import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { MenuCategoryRecord } from "@/types/database";

type MenuCategoriesTableProps = {
  categories: MenuCategoryRecord[];
  itemCountByCategory: Record<string, number>;
};

export function MenuCategoriesTable({ categories, itemCountByCategory }: MenuCategoriesTableProps) {
  if (categories.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
        Chưa có danh mục nào.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/50 text-left">
          <tr>
            <th className="px-4 py-3 font-semibold">Danh mục</th>
            <th className="px-4 py-3 font-semibold">Slug</th>
            <th className="px-4 py-3 font-semibold">Số món</th>
            <th className="px-4 py-3 font-semibold">Thứ tự</th>
            <th className="px-4 py-3 font-semibold">Trạng thái</th>
            <th className="px-4 py-3 font-semibold">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-t border-border align-top">
              <td className="px-4 py-3">
                <p className="font-medium">{category.name}</p>
                {category.description ? (
                  <p className="mt-1 max-w-md text-xs text-muted-foreground">{category.description}</p>
                ) : null}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{category.slug}</td>
              <td className="px-4 py-3">{itemCountByCategory[category.id] ?? 0}</td>
              <td className="px-4 py-3">{category.sort_order}</td>
              <td className="px-4 py-3">
                <Badge variant={category.status === "published" ? "default" : "outline"}>
                  {category.status === "published" ? "Xuất bản" : "Nháp"}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <Button
                  variant="outline"
                  size="sm"
                  render={<Link href={`/admin/menu/categories/${category.id}/edit`} prefetch={false} />}
                >
                  Sửa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
