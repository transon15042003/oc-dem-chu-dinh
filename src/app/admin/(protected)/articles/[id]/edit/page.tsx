import { notFound } from "next/navigation";

import { ArticleForm } from "@/components/admin/articles/article-form";
import { getArticleById } from "@/lib/articles/queries";
import { requireRole } from "@/lib/auth/session";

type EditArticlePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  await requireRole(["admin", "editor"]);
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Sửa bài viết</h1>
        <p className="text-muted-foreground">{article.title}</p>
      </div>

      <ArticleForm mode="edit" article={article} />
    </div>
  );
}
