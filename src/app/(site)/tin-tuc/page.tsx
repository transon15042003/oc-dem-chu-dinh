import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/shared/page-hero";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { getPublishedArticles } from "@/lib/articles/queries";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Tin tức",
  description:
    "Tin tức, mẹo ẩm thực và cập nhật từ Ốc Đêm Chú Đỉnh — chuỗi nhà hàng ốc & hải sản đêm tại Sài Gòn.",
  path: "/tin-tuc",
});

export default async function NewsPage() {
  const articles = await getPublishedArticles();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Tin tức" },
        ]}
        title="Tin tức"
        description="Cập nhật mới nhất từ Ốc Đêm Chú Đỉnh"
        eyebrow="Blog"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {articles.length === 0 ? (
          <p className="text-center text-muted-foreground">Chưa có bài viết nào.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <ScrollReveal key={article.id} delay={index * 0.05}>
                <Link
                  href={`/tin-tuc/${article.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-brand-red/40"
                >
                  <div className="relative aspect-[16/10] bg-muted">
                    {article.cover_image_url ? (
                      <Image
                        src={article.cover_image_url}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        Ốc Đêm Chú Đỉnh
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <p className="text-xs text-muted-foreground">
                      {formatArticleDate(article.published_at ?? article.created_at)}
                    </p>
                    <h2 className="text-lg font-bold leading-snug group-hover:text-brand-red">
                      {article.title}
                    </h2>
                    {article.excerpt ? (
                      <p className="line-clamp-3 text-sm text-muted-foreground">{article.excerpt}</p>
                    ) : null}
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function formatArticleDate(value: string): string {
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" }).format(new Date(value));
}
