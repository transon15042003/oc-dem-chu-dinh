import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPromotionDateRange, isPromotionActive } from "@/lib/promotions/datetime";
import type { PromotionSummary } from "@/types/database";

type PromotionsTableProps = {
  promotions: PromotionSummary[];
};

export function PromotionsTable({ promotions }: PromotionsTableProps) {
  if (promotions.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
        Chưa có khuyến mãi nào.{" "}
        <Link href="/admin/promotions/new" className="font-medium text-brand-red hover:underline">
          Tạo chương trình đầu tiên
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/50 text-left">
          <tr>
            <th className="px-4 py-3 font-semibold">Tiêu đề</th>
            <th className="px-4 py-3 font-semibold">Thời gian</th>
            <th className="px-4 py-3 font-semibold">Trạng thái</th>
            <th className="px-4 py-3 font-semibold">Cập nhật</th>
            <th className="px-4 py-3 font-semibold">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {promotions.map((promotion) => {
            const active = isPromotionActive(promotion);

            return (
              <tr key={promotion.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <p className="font-medium">{promotion.title}</p>
                  <p className="text-xs text-muted-foreground">/khuyen-mai/{promotion.slug}</p>
                  {promotion.discount_label ? (
                    <p className="mt-1 text-xs font-medium text-brand-red">{promotion.discount_label}</p>
                  ) : null}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatPromotionDateRange(promotion.starts_at, promotion.ends_at)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={promotion.status === "published" ? "default" : "outline"}>
                      {promotion.status === "published" ? "Xuất bản" : "Nháp"}
                    </Badge>
                    {promotion.status === "published" ? (
                      <Badge variant={active ? "hot" : "outline"}>
                        {active ? "Đang chạy" : "Hết hạn"}
                      </Badge>
                    ) : null}
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatDate(promotion.updated_at)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      render={<Link href={`/admin/promotions/${promotion.id}/edit`} prefetch={false} />}
                    >
                      Sửa
                    </Button>
                    {active ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        render={<Link href={`/khuyen-mai/${promotion.slug}`} target="_blank" prefetch={false} />}
                      >
                        Xem
                      </Button>
                    ) : null}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
