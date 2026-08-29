import { ArticleBodySection } from "@/components/articles/article-body-section";

type ArticleBodyPreviewProps = {
  title: string;
  excerpt: string;
  body: string;
  coverImageUrl?: string | null;
};

export function ArticleBodyPreview({
  title,
  excerpt,
  body,
  coverImageUrl,
}: ArticleBodyPreviewProps) {
  const hasBodyText = body.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim().length > 0;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border bg-muted/30 px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Xem trước trang chi tiết
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <header className="mb-8 space-y-3 border-b border-border pb-6">
          <h1 className="font-heading text-2xl font-bold leading-tight sm:text-3xl">
            {title.trim() || "Tiêu đề bài viết"}
          </h1>
          {excerpt.trim() ? (
            <p className="text-base text-muted-foreground">{excerpt.trim()}</p>
          ) : null}
        </header>

        {hasBodyText ? (
          <ArticleBodySection body={body} coverImageUrl={coverImageUrl} showDate={false} />
        ) : (
          <p className="text-sm text-muted-foreground">Chưa có nội dung để xem trước.</p>
        )}
      </div>
    </div>
  );
}
