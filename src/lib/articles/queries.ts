import { unstable_cache } from "next/cache";
import { cache } from "react";

import { CACHE_TAGS, CONTENT_REVALIDATE_SECONDS } from "@/lib/cache/tags";
import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import type { Article, ArticleSummary } from "@/types/database";

const articleColumns =
  "id, title, slug, excerpt, body, cover_image_url, status, published_at, category, is_featured, author_id, created_at, updated_at" as const;

const articleSummaryPublicColumns =
  "id, title, slug, excerpt, cover_image_url, status, published_at, category, is_featured, created_at, updated_at" as const;

const articleAdminListColumns =
  "id, title, slug, excerpt, cover_image_url, status, published_at, category, is_featured, created_at, updated_at" as const;

async function fetchPublishedArticleSummaries(): Promise<ArticleSummary[]> {
  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("articles")
    .select(articleSummaryPublicColumns)
    .eq("status", "published")
    .order("is_featured", { ascending: false })
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    console.error("[articles] fetchPublishedArticleSummaries:", error.message);
    return [];
  }

  return (data ?? []) as ArticleSummary[];
}

async function fetchPublishedArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("articles")
    .select(articleColumns)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("[articles] fetchPublishedArticleBySlug:", error.message);
    return null;
  }

  return (data as Article | null) ?? null;
}

export const getPublishedArticleSummaries = cache(
  unstable_cache(fetchPublishedArticleSummaries, ["published-article-summaries"], {
    revalidate: CONTENT_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.articles],
  }),
);

export const getPublishedArticleBySlug = cache(async (slug: string): Promise<Article | null> => {
  return unstable_cache(
    () => fetchPublishedArticleBySlug(slug),
    ["published-article", slug],
    {
      revalidate: CONTENT_REVALIDATE_SECONDS,
      tags: [CACHE_TAGS.articles, `article:${slug}`],
    },
  )();
});

/** @deprecated Prefer getPublishedArticleSummaries for list/sidebar views. */
export const getPublishedArticles = cache(async (): Promise<Article[]> => {
  const summaries = await getPublishedArticleSummaries();
  return summaries as Article[];
});

export const getAdminArticles = cache(async (): Promise<ArticleSummary[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select(articleAdminListColumns)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("[articles] getAdminArticles:", error.message);
    return [];
  }

  return (data ?? []) as ArticleSummary[];
});

export const getArticleById = cache(async (id: string): Promise<Article | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select(articleColumns)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[articles] getArticleById:", error.message);
    return null;
  }

  return (data as Article | null) ?? null;
});

export async function getExistingArticleSlugs(excludeId?: string): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("articles").select("id, slug");

  if (error) {
    return [];
  }

  return (data ?? [])
    .filter((row) => row.id !== excludeId)
    .map((row) => row.slug as string);
}

export async function getPublishedArticleSlugs(): Promise<string[]> {
  const articles = await getPublishedArticleSummaries();
  return articles.map((article) => article.slug);
}
