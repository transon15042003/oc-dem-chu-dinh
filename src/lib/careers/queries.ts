import { unstable_cache } from "next/cache";
import { cache } from "react";

import { CACHE_TAGS, CONTENT_REVALIDATE_SECONDS } from "@/lib/cache/tags";
import { normalizePerks } from "@/lib/careers/perks";
import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import type { CareerApplication, CareerPosition, CareerPositionSummary } from "@/types/database";

const careerPositionColumns =
  "id, title, slug, badge, income_label, description, schedule, salary, perks, status, show_on_listing, sort_order, created_at, updated_at" as const;

const careerPositionListColumns =
  "id, title, slug, badge, income_label, description, schedule, salary, perks, status, show_on_listing, sort_order, created_at, updated_at" as const;

const careerApplicationColumns =
  "id, position_id, position_title, full_name, phone, email, branch_id, experience, created_at" as const;

function mapCareerPosition<T extends { perks: unknown }>(row: T): Omit<T, "perks"> & { perks: string[] } {
  return {
    ...row,
    perks: normalizePerks(row.perks),
  };
}

async function fetchPublishedCareerPositions(): Promise<CareerPosition[]> {
  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("career_positions")
    .select(careerPositionColumns)
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[careers] fetchPublishedCareerPositions:", error.message);
    return [];
  }

  return (data ?? []).map((row) => mapCareerPosition(row) as CareerPosition);
}

export const getPublishedCareerPositions = cache(
  unstable_cache(fetchPublishedCareerPositions, ["published-career-positions"], {
    revalidate: CONTENT_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.careers],
  }),
);

export const getPublishedListingCareerPositions = cache(async (): Promise<CareerPosition[]> => {
  const positions = await getPublishedCareerPositions();
  return positions.filter((position) => position.show_on_listing);
});

export const getCareerPositionBySlug = cache(async (slug: string): Promise<CareerPosition | null> => {
  const positions = await getPublishedCareerPositions();
  return positions.find((position) => position.slug === slug) ?? null;
});

export const getAdminCareerPositions = cache(async (): Promise<CareerPositionSummary[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("career_positions")
    .select(careerPositionListColumns)
    .order("sort_order", { ascending: true })
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("[careers] getAdminCareerPositions:", error.message);
    return [];
  }

  return (data ?? []).map((row) => mapCareerPosition(row) as CareerPositionSummary);
});

export const getCareerPositionById = cache(async (id: string): Promise<CareerPosition | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("career_positions")
    .select(careerPositionColumns)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[careers] getCareerPositionById:", error.message);
    return null;
  }

  return data ? (mapCareerPosition(data) as CareerPosition) : null;
});

export async function getExistingCareerPositionSlugs(excludeId?: string): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("career_positions").select("id, slug");

  if (error) {
    return [];
  }

  return (data ?? [])
    .filter((row) => row.id !== excludeId)
    .map((row) => row.slug as string);
}

export const getCareerApplications = cache(async (): Promise<CareerApplication[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("career_applications")
    .select(careerApplicationColumns)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[careers] getCareerApplications:", error.message);
    return [];
  }

  return (data ?? []) as CareerApplication[];
});
