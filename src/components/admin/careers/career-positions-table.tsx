import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CareerPositionSummary } from "@/types/database";

type CareerPositionsTableProps = {
  positions: CareerPositionSummary[];
};

export function CareerPositionsTable({ positions }: CareerPositionsTableProps) {
  if (positions.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
        Chưa có vị trí tuyển dụng nào.{" "}
        <Link href="/admin/careers/new" className="font-medium text-brand-red hover:underline">
          Tạo vị trí đầu tiên
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/50 text-left">
          <tr>
            <th className="px-4 py-3 font-semibold">Vị trí</th>
            <th className="px-4 py-3 font-semibold">Hiển thị</th>
            <th className="px-4 py-3 font-semibold">Trạng thái</th>
            <th className="px-4 py-3 font-semibold">Thứ tự</th>
            <th className="px-4 py-3 font-semibold">Cập nhật</th>
            <th className="px-4 py-3 font-semibold">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <tr key={position.id} className="border-t border-border">
              <td className="px-4 py-3">
                <p className="font-medium">{position.title}</p>
                <p className="text-xs text-muted-foreground">/tuyen-dung?position={position.slug}</p>
                {position.badge ? (
                  <p className="mt-1 text-xs font-medium text-brand-red">{position.badge}</p>
                ) : null}
              </td>
              <td className="px-4 py-3">
                <Badge variant={position.show_on_listing ? "hot" : "outline"}>
                  {position.show_on_listing ? "Thẻ trang" : "Chỉ form"}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <Badge variant={position.status === "published" ? "default" : "outline"}>
                  {position.status === "published" ? "Xuất bản" : "Nháp"}
                </Badge>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{position.sort_order}</td>
              <td className="px-4 py-3 text-muted-foreground">
                {formatDate(position.updated_at)}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    render={<Link href={`/admin/careers/${position.id}/edit`} prefetch={false} />}
                  >
                    Sửa
                  </Button>
                  {position.status === "published" ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      render={<Link href={`/tuyen-dung?position=${position.slug}`} target="_blank" prefetch={false} />}
                    >
                      Xem
                    </Button>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
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
