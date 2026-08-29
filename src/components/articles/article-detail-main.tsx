import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Tag, UserPen } from "lucide-react";

import { RichTextContent } from "@/components/editor/rich-text-content";
import { formatArticleDateShort } from "@/lib/articles/display";
import { getContentCategoryLabel } from "@/lib/content/categories";
import { bookingSectionId } from "@/config/site";
import { formatHotline, hotlineHref, publicEnv } from "@/lib/env";
import type { Article } from "@/types/database";

type ArticleDetailMainProps = {
  article: Article;
};

export function ArticleDetailMain({ article }: ArticleDetailMainProps) {
  const hotline = formatHotline(publicEnv.hotline || "0938186391");
  return (
    <div className="space-y-6 rounded-3xl border border-amber-100 bg-card p-6 shadow-md sm:p-10">
      {article.cover_image_url ? (
        <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
          <div className="relative h-80 sm:h-96">
            <Image
              src={article.cover_image_url}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />
          </div>
          {article.excerpt ? (
            <p className="border-t border-border bg-muted/40 p-2 text-center text-xs italic text-muted-foreground">
              {article.excerpt}
            </p>
          ) : null}
        </div>
      ) : null}

      {article.excerpt ? (
        <div className="rounded-r-2xl border-l-4 border-brand-red bg-amber-50 p-5 text-sm font-bold leading-relaxed text-foreground dark:bg-amber-950/20">
          {article.excerpt}
        </div>
      ) : null}

      <RichTextContent html={article.body} className="prose-article-public" />

      <div className="my-6 space-y-4 rounded-3xl bg-gradient-to-r from-red-800 to-amber-800 p-6 text-center text-white shadow-xl sm:p-8">
        <h2 className="font-heading text-xl font-black uppercase text-amber-200 sm:text-2xl">
          Đặt bàn ngay hôm nay để nhận ưu đãi!
        </h2>
        <p className="mx-auto max-w-lg text-xs leading-relaxed text-amber-100">
          Liên hệ hotline hoặc nhấp vào nút đặt bàn bên dưới để chọn trước vị trí ngồi đẹp nhất tại
          hệ thống Ốc Đêm Chú Đỉnh.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href={`/#${bookingSectionId}`}
            className="rounded-xl bg-amber-400 px-6 py-3 text-xs font-black uppercase tracking-wider text-stone-950 shadow transition hover:bg-amber-300"
          >
            Đặt bàn ngay
          </Link>
          <a
            href={hotlineHref(publicEnv.hotline || "0938186391")}
            className="rounded-xl bg-stone-900 px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-black"
          >
            Hotline: {hotline}
          </a>
        </div>
      </div>
    </div>
  );
}

type ArticleDetailMetaProps = {
  article: Article;
};

export function ArticleDetailMeta({ article }: ArticleDetailMetaProps) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-3 text-xs font-semibold text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <Tag className="size-3.5 text-brand-red" aria-hidden />
        {getContentCategoryLabel(article.category)}
      </span>
      <span>•</span>
      <span className="flex items-center gap-1.5">
        <UserPen className="size-3.5 text-amber-600" aria-hidden />
        Ban Biên Tập Ốc Đêm Chú Đỉnh
      </span>
      <span>•</span>
      <span className="flex items-center gap-1.5">
        <CalendarDays className="size-3.5 text-amber-600" aria-hidden />
        {formatArticleDateShort(article.published_at ?? article.created_at)}
      </span>
    </div>
  );
}
