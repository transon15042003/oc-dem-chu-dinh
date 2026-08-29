import Image from "next/image";

import { RichTextContent } from "@/components/editor/rich-text-content";

type ArticleBodySectionProps = {
  body: string;
  coverImageUrl?: string | null;
  publishedAt?: string | null;
  showDate?: boolean;
  coverPriority?: boolean;
};

export function ArticleBodySection({
  body,
  coverImageUrl,
  publishedAt,
  showDate = true,
  coverPriority = false,
}: ArticleBodySectionProps) {
  return (
    <>
      {showDate && publishedAt ? (
        <p className="mb-6 text-sm text-muted-foreground">{formatArticleDate(publishedAt)}</p>
      ) : null}

      {coverImageUrl ? (
        <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-xl border border-border">
          <Image
            src={coverImageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority={coverPriority}
            unoptimized={coverImageUrl.startsWith("blob:")}
          />
        </div>
      ) : null}

      <RichTextContent html={body} />
    </>
  );
}

function formatArticleDate(value: string): string {
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" }).format(new Date(value));
}
