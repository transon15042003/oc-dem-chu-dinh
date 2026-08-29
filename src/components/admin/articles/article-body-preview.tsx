import Image from "next/image";

import { RichTextContent } from "@/components/editor/rich-text-content";
import { getContentCategoryLabel } from "@/lib/content/categories";
import type { ContentCategory } from "@/lib/content/categories";

type ArticleBodyPreviewProps = {
  title: string;
  excerpt: string;
  body: string;
  coverImageUrl?: string | null;
  category?: ContentCategory | null;
};

export function ArticleBodyPreview({
  title,
  excerpt,
  body,
  coverImageUrl,
  category,
}: ArticleBodyPreviewProps) {
  const hasBodyText = body.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim().length > 0;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-amber-50/30">
      <div className="border-b border-border bg-muted/30 px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Xem trước trang chi tiết /tin-tuc
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-4 px-4 py-8 sm:px-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-red">
            {getContentCategoryLabel(category)}
          </p>
          <h1 className="font-heading text-2xl font-black uppercase leading-tight sm:text-3xl">
            {title.trim() || "Tiêu đề bài viết"}
          </h1>
        </header>

        <div className="space-y-6 rounded-3xl border border-amber-100 bg-card p-6 shadow-md sm:p-8">
          {coverImageUrl ? (
            <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
              <div className="relative h-64 sm:h-80">
                <Image
                  src={coverImageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
              {excerpt.trim() ? (
                <p className="border-t border-border bg-muted/40 p-2 text-center text-xs italic text-muted-foreground">
                  {excerpt.trim()}
                </p>
              ) : null}
            </div>
          ) : null}

          {excerpt.trim() ? (
            <div className="rounded-r-2xl border-l-4 border-brand-red bg-amber-50 p-5 text-sm font-bold leading-relaxed text-foreground">
              {excerpt.trim()}
            </div>
          ) : null}

          {hasBodyText ? (
            <RichTextContent html={body} className="prose-article-public" />
          ) : (
            <p className="text-sm text-muted-foreground">Chưa có nội dung để xem trước.</p>
          )}
        </div>
      </div>
    </div>
  );
}
