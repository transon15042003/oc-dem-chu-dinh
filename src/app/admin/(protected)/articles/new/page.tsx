import { ArticleForm } from "@/components/admin/articles/article-form";
import { requireRole } from "@/lib/auth/session";

export default async function AdminNewArticlePage() {
  await requireRole(["admin", "editor"]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Viết bài mới</h1>
        <p className="text-muted-foreground">Tạo Article mới — lưu nháp hoặc xuất bản ngay.</p>
      </div>

      <ArticleForm mode="create" />
    </div>
  );
}
