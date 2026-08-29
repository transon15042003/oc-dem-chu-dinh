import { notFound } from "next/navigation";

import { ArticleBodySection } from "@/components/articles/article-body-section";
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
        <ArticleBodySection
          body={article.body}
          coverImageUrl={article.cover_image_url}
          publishedAt={article.published_at ?? article.created_at}
          coverPriority
        />
      </article>
    </>
  );
}
