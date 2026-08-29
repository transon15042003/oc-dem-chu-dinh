import { Suspense } from "react";

import { ArticleDetailContent } from "@/components/articles/article-detail-content";
import { ArticleDetailPageLoading } from "@/components/content/content-skeletons";
import { getPublishedArticleBySlug, getPublishedArticleSlugs } from "@/lib/articles/queries";
import { createPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

type ArticleDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPublishedArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

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

  return (
    <div className="min-h-screen bg-amber-50/30 text-foreground dark:bg-background">
      <Suspense fallback={<ArticleDetailPageLoading />}>
        <ArticleDetailContent slug={slug} />
      </Suspense>
    </div>
  );
}
