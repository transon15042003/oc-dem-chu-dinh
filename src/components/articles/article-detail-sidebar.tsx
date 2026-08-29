import Image from "next/image";
import Link from "next/link";

import type { Article } from "@/types/database";

type ArticleDetailSidebarProps = {
  articles: Article[];
  currentSlug: string;
};

export function ArticleDetailSidebar({ articles, currentSlug }: ArticleDetailSidebarProps) {
  const relatedArticles = articles.filter((article) => article.slug !== currentSlug).slice(0, 4);

  return (
    <aside className="space-y-6 lg:col-span-4">
      <div className="space-y-3 rounded-3xl border border-amber-100 bg-card p-6 shadow-md">
        <h2 className="border-l-4 border-brand-red pl-3 font-heading text-xs font-black uppercase text-foreground">
          Tìm kiếm bài viết
        </h2>
        <form action="/tin-tuc" method="get" className="space-y-3">
          <input
            type="search"
            name="q"
            placeholder="Nhập từ khóa..."
            className="w-full rounded-xl border border-input bg-transparent px-3 py-2.5 text-xs focus:border-brand-red focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-brand-red px-4 py-2.5 text-xs font-black uppercase tracking-wider text-on-red transition hover:bg-brand-red-hover"
          >
            Tìm kiếm
          </button>
        </form>
      </div>

      <div className="space-y-4 rounded-3xl border border-amber-100 bg-card p-6 shadow-md">
        <h2 className="border-l-4 border-brand-red pl-3 font-heading text-xs font-black uppercase text-foreground">
          Bài viết liên quan
        </h2>

        {relatedArticles.length === 0 ? (
          <p className="text-xs text-muted-foreground">Chưa có bài viết khác.</p>
        ) : (
          <ul className="space-y-3">
            {relatedArticles.map((article) => (
              <li key={article.id}>
                <Link
                  href={`/tin-tuc/${article.slug}`}
                  className="group flex items-center gap-3 rounded-2xl border border-transparent p-2 transition hover:border-amber-100 hover:bg-muted/40"
                >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                    {article.cover_image_url ? (
                      <Image
                        src={article.cover_image_url}
                        alt=""
                        fill
                        className="object-cover transition group-hover:scale-105"
                        sizes="64px"
                      />
                    ) : null}
                  </div>
                  <p className="line-clamp-3 text-xs font-bold leading-snug text-foreground group-hover:text-brand-red">
                    {article.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
