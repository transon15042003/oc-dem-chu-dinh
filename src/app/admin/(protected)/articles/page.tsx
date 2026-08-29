import Link from "next/link";

import { ArticlesTable } from "@/components/admin/articles/articles-table";
import { Button } from "@/components/ui/button";
import { getAdminArticles } from "@/lib/articles/queries";
import { requireRole } from "@/lib/auth/session";

export default async function AdminArticlesPage() {
  await requireRole(["admin", "editor"]);
  const articles = await getAdminArticles();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Tin tức</h1>
          <p className="text-muted-foreground">Quản lý bài viết hiển thị tại /tin-tuc</p>
        </div>
        <Button render={<Link href="/admin/articles/new" prefetch={false} />}>Viết bài mới</Button>
      </div>

      <ArticlesTable articles={articles} />
    </div>
  );
}
