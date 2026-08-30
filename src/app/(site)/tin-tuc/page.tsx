import { Suspense } from "react";

import { ArticlesListingSection } from "@/components/articles/articles-listing-section";
import { ArticlesPageHeader } from "@/components/articles/articles-page-header";
import { ArticlesListingSkeleton } from "@/components/content/content-skeletons";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Tin tức",
  description:
    "Tin tức, mẹo ẩm thực và cập nhật từ Ốc Đêm Chú Đỉnh — chuỗi nhà hàng ốc & hải sản đêm tại Sài Gòn.",
  path: "/tin-tuc",
});

export default function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  return (
    <div className="min-h-screen bg-amber-50/30 text-foreground dark:bg-background">
      <ArticlesPageHeader />
      <Suspense fallback={<ArticlesListingSkeleton />}>
        <ArticlesListingSection searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
