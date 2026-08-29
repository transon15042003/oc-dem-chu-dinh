import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";

import { formatArticleDateShort, formatReadingTime } from "@/lib/articles/display";
import { getContentCategoryLabel } from "@/lib/content/categories";
import type { Article } from "@/types/database";

type ArticleGridCardProps = {
  article: Article;
};

export function ArticleGridCard({ article }: ArticleGridCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-amber-100 bg-card shadow-md transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden bg-muted">
        {article.cover_image_url ? (
          <Image
            src={article.cover_image_url}
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Ốc Đêm Chú Đỉnh
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-xl bg-stone-900/80 px-2.5 py-1 text-[10px] font-black uppercase text-amber-300 shadow backdrop-blur">
          {getContentCategoryLabel(article.category)}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-3 text-brand-red" aria-hidden />
              {formatArticleDateShort(article.published_at ?? article.created_at)}
            </span>
          </div>

          <h3 className="line-clamp-2 text-sm font-bold leading-snug text-foreground transition group-hover:text-brand-red">
            <Link href={`/tin-tuc/${article.slug}`}>{article.title}</Link>
          </h3>

          {article.excerpt ? (
            <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {article.excerpt}
            </p>
          ) : null}
        </div>

        <div className="flex items-center justify-between border-t border-border pt-3">
          <Link
            href={`/tin-tuc/${article.slug}`}
            className="flex items-center gap-1.5 text-xs font-black uppercase text-brand-red hover:text-brand-red-hover"
          >
            Xem chi tiết
            <ChevronRight className="size-3" aria-hidden />
          </Link>
          <span className="text-[10px] font-bold text-muted-foreground">
            {formatReadingTime(article.body)}
          </span>
        </div>
      </div>
    </article>
  );
}
