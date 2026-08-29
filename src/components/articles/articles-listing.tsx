"use client";

import { Newspaper, Search, Tag } from "lucide-react";
import { useMemo, useState } from "react";

import { ArticleFeaturedCard } from "@/components/articles/article-featured-card";
import { ArticleGridCard } from "@/components/articles/article-grid-card";
import { CONTENT_CATEGORIES, type ContentCategory } from "@/lib/content/categories";
import type { ArticleSummary } from "@/types/database";
import { cn } from "@/lib/utils";

type ArticlesListingProps = {
  articles: ArticleSummary[];
  initialSearch?: string;
};

type CategoryFilter = "all" | ContentCategory;

export function ArticlesListing({ articles, initialSearch = "" }: ArticlesListingProps) {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [search, setSearch] = useState(initialSearch);

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory = category === "all" || article.category === category;
      const haystack = `${article.title} ${article.excerpt ?? ""}`.toLowerCase();
      const matchesSearch = !query || haystack.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [articles, category, search]);

  const featuredArticle =
    filteredArticles.find((article) => article.is_featured) ?? filteredArticles[0] ?? null;

  const showFeatured = Boolean(featuredArticle) && !search && category === "all";

  return (
    <>
      <section className="sticky top-site-header z-30 border-b border-red-900/80 bg-stone-900/95 py-4 text-white shadow-2xl backdrop-blur-md">
        <div className="mx-auto max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex w-full flex-wrap items-center justify-center gap-2 md:w-auto md:justify-start">
              <FilterButton
                active={category === "all"}
                onClick={() => setCategory("all")}
                icon={<Newspaper className="size-3.5 text-amber-400" aria-hidden />}
                label="Tất cả"
                highlight
              />
              {CONTENT_CATEGORIES.map((item) => (
                <FilterButton
                  key={item.value}
                  active={category === item.value}
                  onClick={() => setCategory(item.value)}
                  icon={<Tag className="size-3.5 text-amber-400" aria-hidden />}
                  label={item.label}
                />
              ))}
            </div>

            <div className="relative w-full shrink-0 md:w-80">
              <Search className="absolute left-3.5 top-3 size-3.5 text-amber-400" aria-hidden />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Tìm bài viết (vd: sinh nhật, sốt thái, khai trương)..."
                className="w-full rounded-xl border border-stone-700 bg-stone-800 py-2.5 pl-10 pr-4 text-xs font-medium text-white placeholder:text-stone-400 transition focus:border-amber-400 focus:bg-stone-950 focus:outline-none"
              />
            </div>
          </div>

          {search ? (
            <p className="text-xs font-semibold text-amber-200">
              Kết quả tìm kiếm cho &quot;{search}&quot;: {filteredArticles.length} bài
            </p>
          ) : null}
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
          {filteredArticles.length === 0 ? (
            <p className="text-center text-muted-foreground">Không tìm thấy bài viết phù hợp.</p>
          ) : (
            <>
              {showFeatured && featuredArticle ? (
                <ArticleFeaturedCard article={featuredArticle} />
              ) : null}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article) => (
                  <ArticleGridCard key={article.id} article={article} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

function FilterButton({
  active,
  onClick,
  icon,
  label,
  highlight = false,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  highlight?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-black uppercase tracking-wider transition",
        active && highlight
          ? "scale-105 border-red-500 bg-gradient-to-r from-red-600 to-red-700 text-amber-300 shadow-lg ring-2 ring-amber-400/40"
          : active
            ? "border-red-500 bg-stone-700 text-amber-200"
            : "border-stone-700 bg-stone-800 text-stone-300 hover:bg-stone-700",
      )}
    >
      {icon}
      {label}
    </button>
  );
}
