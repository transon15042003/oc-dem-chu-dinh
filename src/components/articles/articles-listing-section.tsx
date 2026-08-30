import { ArticlesListing } from "@/components/articles/articles-listing";
import { getPublishedArticleSummaries } from "@/lib/articles/queries";

type ArticlesListingSectionProps = {
  searchParams: Promise<{ q?: string }>;
};

export async function ArticlesListingSection({ searchParams }: ArticlesListingSectionProps) {
  const { q } = await searchParams;
  const articles = await getPublishedArticleSummaries();

  return <ArticlesListing articles={articles} initialSearch={q ?? ""} />;
}
