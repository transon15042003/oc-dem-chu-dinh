import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildMenuImageUrls } from "@/lib/menu/types";
import type { MenuItemWithCategory } from "@/types/database";

type MenuItemsTableProps = {
  items: MenuItemWithCategory[];
  emptyMessage?: string;
};

export function MenuItemsTable({
  items,
  emptyMessage = "Chưa có món ăn nào.",
}: MenuItemsTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/50 text-left">
          <tr>
            <th className="px-4 py-3 font-semibold">Ảnh</th>
            <th className="px-4 py-3 font-semibold">Món</th>
            <th className="px-4 py-3 font-semibold">Danh mục</th>
            <th className="px-4 py-3 font-semibold">Thứ tự</th>
            <th className="px-4 py-3 font-semibold">Trạng thái</th>
            <th className="px-4 py-3 font-semibold">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const image = buildMenuImageUrls(item.image_path).image;

            return (
              <tr key={item.id} className="border-t border-border align-top">
                <td className="px-4 py-3">
                  <div className="relative size-14 overflow-hidden rounded-lg border border-border bg-muted">
                    <Image src={image} alt={item.name} fill className="object-cover" sizes="56px" />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.slug}</p>
                  {item.is_hot ? <Badge variant="hot" className="mt-1">Hot</Badge> : null}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{item.category.name}</td>
                <td className="px-4 py-3">{item.sort_order}</td>
                <td className="px-4 py-3">
                  <Badge variant={item.status === "published" ? "default" : "outline"}>
                    {item.status === "published" ? "Xuất bản" : "Nháp"}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Button
                    variant="outline"
                    size="sm"
                    render={<Link href={`/admin/menu/items/${item.id}/edit`} prefetch={false} />}
                  >
                    Sửa
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
