import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ArticleSummary } from "@/types/database";

type ArticlesTableProps = {
  articles: ArticleSummary[];
};

export function ArticlesTable({ articles }: ArticlesTableProps) {
  if (articles.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
        Chưa có bài viết nào.{" "}
        <Link href="/admin/articles/new" className="font-medium text-brand-red hover:underline">
          Tạo bài đầu tiên
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
            <th className="px-4 py-3 font-semibold">Trạng thái</th>
            <th className="px-4 py-3 font-semibold">Cập nhật</th>
            <th className="px-4 py-3 font-semibold">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="border-t border-border">
              <td className="px-4 py-3">
                <p className="font-medium">{article.title}</p>
                <p className="text-xs text-muted-foreground">/tin-tuc/{article.slug}</p>
              </td>
              <td className="px-4 py-3">
                <Badge variant={article.status === "published" ? "default" : "outline"}>
                  {article.status === "published" ? "Xuất bản" : "Nháp"}
                </Badge>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {formatDate(article.updated_at)}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    render={<Link href={`/admin/articles/${article.id}/edit`} prefetch={false} />}
                  >
                    Sửa
                  </Button>
                  {article.status === "published" ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      render={<Link href={`/tin-tuc/${article.slug}`} target="_blank" prefetch={false} />}
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
