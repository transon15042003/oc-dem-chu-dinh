import Link from "next/link";

import { AdminDataView } from "@/components/admin/admin-data-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getContentCategoryLabel } from "@/lib/content/categories";
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
    <AdminDataView
      table={
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Tiêu đề</th>
                <th className="px-4 py-3 font-semibold">Danh mục</th>
                <th className="px-4 py-3 font-semibold">Trạng thái</th>
                <th className="px-4 py-3 font-semibold">Cập nhật</th>
                <th className="px-4 py-3 font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <ArticleRow key={article.id} article={article} />
              ))}
            </tbody>
          </table>
        </div>
      }
      cards={articles.map((article) => (
        <ArticleCard key={`${article.id}-card`} article={article} />
      ))}
    />
  );
}

function ArticleRow({ article }: { article: ArticleSummary }) {
  return (
    <tr className="border-t border-border">
      <td className="px-4 py-3">
        <p className="font-medium">{article.title}</p>
        <p className="text-xs text-muted-foreground">/tin-tuc/{article.slug}</p>
      </td>
      <td className="px-4 py-3">
        <p className="text-sm">{getContentCategoryLabel(article.category)}</p>
        {article.is_featured ? (
          <Badge variant="hot" className="mt-1">
            Nổi bật
          </Badge>
        ) : null}
      </td>
      <td className="px-4 py-3">
        <Badge variant={article.status === "published" ? "default" : "outline"}>
          {article.status === "published" ? "Xuất bản" : "Nháp"}
        </Badge>
      </td>
      <td className="px-4 py-3 text-muted-foreground">{formatDate(article.updated_at)}</td>
      <td className="px-4 py-3">
        <ArticleActions article={article} />
      </td>
    </tr>
  );
}

function ArticleCard({ article }: { article: ArticleSummary }) {
  return (
    <article className="space-y-3 rounded-xl border border-border bg-card p-4">
      <div className="space-y-1">
        <p className="font-semibold">{article.title}</p>
        <p className="text-xs text-muted-foreground">/tin-tuc/{article.slug}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant={article.status === "published" ? "default" : "outline"}>
          {article.status === "published" ? "Xuất bản" : "Nháp"}
        </Badge>
        {article.is_featured ? <Badge variant="hot">Nổi bật</Badge> : null}
      </div>
      <p className="text-sm text-muted-foreground">
        {getContentCategoryLabel(article.category)} · {formatDate(article.updated_at)}
      </p>
      <ArticleActions article={article} />
    </article>
  );
}

function ArticleActions({ article }: { article: ArticleSummary }) {
  return (
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
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
