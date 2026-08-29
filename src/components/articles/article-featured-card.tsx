import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

import { formatArticleDateShort } from "@/lib/articles/display";
import type { Article } from "@/types/database";

type ArticleFeaturedCardProps = {
  article: Article;
};

export function ArticleFeaturedCard({ article }: ArticleFeaturedCardProps) {
  return (
    <article className="group grid grid-cols-1 items-center overflow-hidden rounded-3xl border border-stone-800 bg-stone-900 text-white shadow-2xl lg:grid-cols-12">
      <div className="relative h-72 overflow-hidden bg-stone-950 sm:h-96 lg:col-span-7">
        {article.cover_image_url ? (
          <Image
            src={article.cover_image_url}
            alt=""
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 58vw"
            priority
          />
        ) : null}
        <div className="absolute left-4 top-4 rounded-xl bg-brand-red px-3 py-1 text-xs font-black uppercase text-amber-300 shadow">
          Bài viết nổi bật
        </div>
      </div>

      <div className="space-y-4 p-6 sm:p-10 lg:col-span-5">
        <div className="flex items-center gap-3 text-xs font-bold text-amber-400">
          <span className="flex items-center gap-1">
            <CalendarDays className="size-3.5" aria-hidden />
            {formatArticleDateShort(article.published_at ?? article.created_at)}
          </span>
        </div>

        <h2 className="font-heading text-xl font-black uppercase leading-snug text-amber-100 transition hover:text-red-400 sm:text-2xl">
          <Link href={`/tin-tuc/${article.slug}`}>{article.title}</Link>
        </h2>

        {article.excerpt ? (
          <p className="line-clamp-3 text-xs font-medium leading-relaxed text-stone-300">
            {article.excerpt}
          </p>
        ) : null}

        <div className="pt-2">
          <Link
            href={`/tin-tuc/${article.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow transition hover:bg-brand-red-hover"
          >
            <span>Đọc bài viết</span>
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
