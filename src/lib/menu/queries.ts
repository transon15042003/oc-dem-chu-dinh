import { unstable_cache } from "next/cache";
import { cache } from "react";

import { CACHE_TAGS, CONTENT_REVALIDATE_SECONDS } from "@/lib/cache/tags";
import {
  buildMenuFilterTabs,
  toMenuCategory,
  toMenuItem,
  type MenuCategory,
  type MenuItem,
} from "@/lib/menu/types";
import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import type {
  MenuCategoryRecord,
  MenuItemRecord,
  MenuItemWithCategory,
} from "@/types/database";

const menuCategoryColumns =
  "id, slug, name, description, sort_order, status, show_in_filter, created_at, updated_at" as const;

const menuItemWithCategoryColumns =
  "id, slug, name, category_id, image_path, is_hot, search_terms, sort_order, status, created_at, updated_at, category:menu_categories!inner(slug, name)" as const;

type MenuItemRowWithCategory = MenuItemRecord & {
  category: { slug: string; name: string } | Array<{ slug: string; name: string }>;
};

function mapMenuItemWithCategory(row: MenuItemRowWithCategory): MenuItemWithCategory {
  const category = Array.isArray(row.category) ? row.category[0] : row.category;

  return {
    ...row,
    category,
  };
}

async function fetchPublishedMenuCategories(): Promise<MenuCategoryRecord[]> {
  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("menu_categories")
    .select(menuCategoryColumns)
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[menu] fetchPublishedMenuCategories:", error.message);
    return [];
  }

  return (data ?? []) as MenuCategoryRecord[];
}

async function fetchPublishedMenuItems(): Promise<MenuItemWithCategory[]> {
  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("menu_items")
    .select(menuItemWithCategoryColumns)
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[menu] fetchPublishedMenuItems:", error.message);
    return [];
  }

  return (data ?? []).map((row) => mapMenuItemWithCategory(row as MenuItemRowWithCategory));
}

export const getPublishedMenuCategories = cache(
  unstable_cache(
    async () => fetchPublishedMenuCategories().then((rows) => rows.map(toMenuCategory)),
    ["published-menu-categories"],
    { revalidate: CONTENT_REVALIDATE_SECONDS, tags: [CACHE_TAGS.menu] },
  ),
);

export const getPublishedMenuItems = cache(
  unstable_cache(
    async () =>
      fetchPublishedMenuItems().then((rows) =>
        rows.map((row) => toMenuItem(row, row.category.slug)),
      ),
    ["published-menu-items"],
    { revalidate: CONTENT_REVALIDATE_SECONDS, tags: [CACHE_TAGS.menu] },
  ),
);

export const getPublishedMenuData = cache(async (): Promise<{
  categories: MenuCategory[];
  items: MenuItem[];
  filterTabs: ReturnType<typeof buildMenuFilterTabs>;
}> => {
  const [categories, items] = await Promise.all([
    getPublishedMenuCategories(),
    getPublishedMenuItems(),
  ]);

  return {
    categories,
    items,
    filterTabs: buildMenuFilterTabs(categories),
  };
});

export const getAdminMenuCategories = cache(async (): Promise<MenuCategoryRecord[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("menu_categories")
    .select(menuCategoryColumns)
    .order("sort_order", { ascending: true })
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("[menu] getAdminMenuCategories:", error.message);
    return [];
  }

  return (data ?? []) as MenuCategoryRecord[];
});

export const getAdminMenuItems = cache(async (): Promise<MenuItemWithCategory[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("menu_items")
    .select(menuItemWithCategoryColumns)
    .order("sort_order", { ascending: true })
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("[menu] getAdminMenuItems:", error.message);
    return [];
  }

  return (data ?? []).map((row) => mapMenuItemWithCategory(row as MenuItemRowWithCategory));
});

export const getMenuCategoryById = cache(
  async (id: string): Promise<MenuCategoryRecord | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("menu_categories")
      .select(menuCategoryColumns)
      .eq("id", id)
      .single();

    if (error) {
      return null;
    }

    return data as MenuCategoryRecord;
  },
);

export const getMenuItemById = cache(async (id: string): Promise<MenuItemWithCategory | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("menu_items")
    .select(menuItemWithCategoryColumns)
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  return mapMenuItemWithCategory(data as MenuItemRowWithCategory);
});

export async function getExistingMenuCategorySlugs(excludeId?: string): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("menu_categories").select("id, slug");

  if (error) {
    return [];
  }

  return (data ?? [])
    .filter((row) => row.id !== excludeId)
    .map((row) => row.slug as string);
}

export async function getExistingMenuItemSlugs(excludeId?: string): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("menu_items").select("id, slug");

  if (error) {
    return [];
  }

  return (data ?? [])
    .filter((row) => row.id !== excludeId)
    .map((row) => row.slug as string);
}

export type { MenuItemRecord };
