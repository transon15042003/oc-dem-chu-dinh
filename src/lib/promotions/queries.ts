import { cache } from "react";

import { createClient } from "@/lib/supabase/server";
import type { Promotion, PromotionSummary } from "@/types/database";

const promotionColumns =
  "id, title, slug, excerpt, body, cover_image_url, status, published_at, starts_at, ends_at, discount_label, promo_code, author_id, created_at, updated_at" as const;

const promotionListColumns =
  "id, title, slug, excerpt, cover_image_url, status, published_at, starts_at, ends_at, discount_label, promo_code, created_at, updated_at" as const;

export const getActivePromotions = cache(async (): Promise<PromotionSummary[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("promotions")
    .select(promotionListColumns)
    .eq("status", "published")
    .order("starts_at", { ascending: false });

  if (error) {
    console.error("[promotions] getActivePromotions:", error.message);
    return [];
  }

  return (data ?? []) as PromotionSummary[];
});

export const getActivePromotionBySlug = cache(async (slug: string): Promise<Promotion | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("promotions")
    .select(promotionColumns)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("[promotions] getActivePromotionBySlug:", error.message);
    return null;
  }

  return (data as Promotion | null) ?? null;
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
