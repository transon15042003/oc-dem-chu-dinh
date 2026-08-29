import { ArticlesListing } from "@/components/articles/articles-listing";
import { ArticlesPageHeader } from "@/components/articles/articles-page-header";
import { getPublishedArticles } from "@/lib/articles/queries";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Tin tức",
  description:
    "Tin tức, mẹo ẩm thực và cập nhật từ Ốc Đêm Chú Đỉnh — chuỗi nhà hàng ốc & hải sản đêm tại Sài Gòn.",
  path: "/tin-tuc",
});

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const articles = await getPublishedArticles();

  return (
    <div className="min-h-screen bg-amber-50/30 text-foreground dark:bg-background">
      <ArticlesPageHeader />
      <ArticlesListing articles={articles} initialSearch={q ?? ""} />
    </div>
  );
}
