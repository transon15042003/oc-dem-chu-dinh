import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { ArticleDetailMain, ArticleDetailMeta } from "@/components/articles/article-detail-main";
import { ArticleDetailSidebar } from "@/components/articles/article-detail-sidebar";
import { getPublishedArticleBySlug, getPublishedArticleSummaries } from "@/lib/articles/queries";

type ArticleDetailContentProps = {
  slug: string;
};

export async function ArticleDetailContent({ slug }: ArticleDetailContentProps) {
  const [article, articles] = await Promise.all([
    getPublishedArticleBySlug(slug),
    getPublishedArticleSummaries(),
  ]);

  if (!article) {
    notFound();
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-amber-100 bg-background py-10">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-brand-red">
              Trang chủ
            </Link>
            <ChevronRight className="size-3 text-muted-foreground/70" aria-hidden />
            <Link href="/tin-tuc" className="transition-colors hover:text-brand-red">
              Tin tức &amp; Sự kiện
            </Link>
            <ChevronRight className="size-3 text-muted-foreground/70" aria-hidden />
            <span className="line-clamp-1 max-w-xs font-black text-brand-red sm:max-w-md">
              {article.title}
            </span>
          </div>

          <h1 className="font-heading text-2xl font-black uppercase leading-tight tracking-tight text-foreground sm:text-4xl">
            {article.title}
          </h1>

          <ArticleDetailMeta article={article} />
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <ArticleDetailMain article={article} />
          <ArticleDetailSidebar articles={articles} currentSlug={article.slug} />
        </div>
      </section>
    </>
  );
}
