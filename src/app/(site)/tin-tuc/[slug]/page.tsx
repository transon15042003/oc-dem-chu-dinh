import Image from "next/image";
import { notFound } from "next/navigation";

import { RichTextContent } from "@/components/editor/rich-text-content";
import { PageHero } from "@/components/shared/page-hero";
import { getPublishedArticleBySlug } from "@/lib/articles/queries";
import { createPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

type ArticleDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);

  if (!article) {
    return { title: "Không tìm thấy" };
  }

  return createPageMetadata({
    title: article.title,
    description: article.excerpt ?? article.title,
    path: `/tin-tuc/${article.slug}`,
    ogImage: article.cover_image_url ?? siteConfig.ogImage,
  });
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Tin tức", href: "/tin-tuc" },
          { label: article.title },
        ]}
        title={article.title}
        description={article.excerpt ?? undefined}
      />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="mb-6 text-sm text-muted-foreground">
          {formatArticleDate(article.published_at ?? article.created_at)}
        </p>

        {article.cover_image_url ? (
          <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-xl border border-border">
            <Image
              src={article.cover_image_url}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        ) : null}

        <RichTextContent html={article.body} />
      </article>
    </>
  );
}

function formatArticleDate(value: string): string {
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" }).format(new Date(value));
}
