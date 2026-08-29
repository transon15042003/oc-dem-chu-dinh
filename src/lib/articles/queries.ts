import { cache } from "react";

import { createClient } from "@/lib/supabase/server";
import type { Article, ArticleSummary } from "@/types/database";

const articleColumns =
  "id, title, slug, excerpt, body, cover_image_url, status, published_at, author_id, created_at, updated_at" as const;

const articleListColumns =
  "id, title, slug, excerpt, cover_image_url, status, published_at, created_at, updated_at" as const;

export const getPublishedArticles = cache(async (): Promise<ArticleSummary[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select(articleListColumns)
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    console.error("[articles] getPublishedArticles:", error.message);
    return [];
  }

  return (data ?? []) as ArticleSummary[];
});

export const getPublishedArticleBySlug = cache(async (slug: string): Promise<Article | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select(articleColumns)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("[articles] getPublishedArticleBySlug:", error.message);
    return null;
  }

  return (data as Article | null) ?? null;
});

export const getAdminArticles = cache(async (): Promise<ArticleSummary[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select(articleListColumns)
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
