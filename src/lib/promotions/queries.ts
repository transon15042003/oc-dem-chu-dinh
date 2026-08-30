import { unstable_cache } from "next/cache";
import { cache } from "react";

import { CACHE_TAGS, CONTENT_REVALIDATE_SECONDS } from "@/lib/cache/tags";
import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import type { Promotion, PromotionSummary } from "@/types/database";

const promotionColumns =
  "id, title, slug, excerpt, body, cover_image_url, status, published_at, starts_at, ends_at, discount_label, promo_code, author_id, created_at, updated_at" as const;

const promotionListColumns =
  "id, title, slug, excerpt, cover_image_url, status, published_at, starts_at, ends_at, discount_label, promo_code, created_at, updated_at" as const;

function activePromotionWindow(now = new Date()) {
  return now.toISOString();
}

async function fetchActivePromotions(): Promise<Promotion[]> {
  const supabase = createPublicClient();
  const now = activePromotionWindow();

  const { data, error } = await supabase
    .from("promotions")
    .select(promotionColumns)
    .eq("status", "published")
    .lte("starts_at", now)
    .gt("ends_at", now)
    .order("starts_at", { ascending: false });

  if (error) {
    console.error("[promotions] fetchActivePromotions:", error.message);
    return [];
  }

  return (data ?? []) as Promotion[];
}

async function fetchActivePromotionBySlug(slug: string): Promise<Promotion | null> {
  const supabase = createPublicClient();
  const now = activePromotionWindow();

  const { data, error } = await supabase
    .from("promotions")
    .select(promotionColumns)
    .eq("slug", slug)
    .eq("status", "published")
    .lte("starts_at", now)
    .gt("ends_at", now)
    .maybeSingle();

  if (error) {
    console.error("[promotions] fetchActivePromotionBySlug:", error.message);
    return null;
  }

  return (data as Promotion | null) ?? null;
}

export const getActivePromotions = cache(
  unstable_cache(fetchActivePromotions, ["active-promotions"], {
    revalidate: CONTENT_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.promotions],
  }),
);

export const getActivePromotionBySlug = cache(async (slug: string): Promise<Promotion | null> => {
  return unstable_cache(
    () => fetchActivePromotionBySlug(slug),
    ["active-promotion", slug],
    {
      revalidate: CONTENT_REVALIDATE_SECONDS,
      tags: [CACHE_TAGS.promotions, `promotion:${slug}`],
    },
  )();
});

export const getAdminPromotions = cache(async (): Promise<PromotionSummary[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("promotions")
    .select(promotionListColumns)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("[promotions] getAdminPromotions:", error.message);
    return [];
  }

  return (data ?? []) as PromotionSummary[];
});

export const getPromotionById = cache(async (id: string): Promise<Promotion | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("promotions")
    .select(promotionColumns)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[promotions] getPromotionById:", error.message);
    return null;
  }

  return (data as Promotion | null) ?? null;
});

export async function getExistingPromotionSlugs(excludeId?: string): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("promotions").select("id, slug");

  if (error) {
    return [];
  }

  return (data ?? [])
    .filter((row) => row.id !== excludeId)
    .map((row) => row.slug as string);
}

export async function getActivePromotionSlugs(): Promise<string[]> {
  const promotions = await getActivePromotions();
  return promotions.map((promotion) => promotion.slug);
}
