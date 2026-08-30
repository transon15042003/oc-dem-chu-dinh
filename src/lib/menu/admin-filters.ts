import type { MenuCategoryRecord, MenuItemWithCategory, PublicationStatus } from "@/types/database";

export type MenuAdminView = "all" | "categories" | "items";

export type MenuAdminStatusFilter = "all" | PublicationStatus;

export type MenuAdminHotFilter = "all" | "hot" | "normal";

export type MenuAdminFilters = {
  view: MenuAdminView;
  status: MenuAdminStatusFilter;
  categoryId: string;
  query: string;
  hot: MenuAdminHotFilter;
};

export function parseMenuAdminView(value: string | undefined): MenuAdminView {
  if (value === "categories" || value === "items" || value === "all") {
    return value;
  }

  return "all";
}

export function parseMenuAdminStatusFilter(value: string | undefined): MenuAdminStatusFilter {
  if (value === "published" || value === "draft" || value === "all") {
    return value;
  }

  return "all";
}

export function parseMenuAdminHotFilter(value: string | undefined): MenuAdminHotFilter {
  if (value === "hot" || value === "normal" || value === "all") {
    return value;
  }

  return "all";
}

export function parseMenuAdminFilters(searchParams: {
  view?: string;
  status?: string;
  category?: string;
  q?: string;
  hot?: string;
}): MenuAdminFilters {
  return {
    view: parseMenuAdminView(searchParams.view),
    status: parseMenuAdminStatusFilter(searchParams.status),
    categoryId: searchParams.category?.trim() ?? "",
    query: searchParams.q?.trim() ?? "",
    hot: parseMenuAdminHotFilter(searchParams.hot),
  };
}

export function buildMenuAdminHref(filters: Partial<MenuAdminFilters>): string {
  const params = new URLSearchParams();

  if (filters.view && filters.view !== "all") {
    params.set("view", filters.view);
  }

  if (filters.status && filters.status !== "all") {
    params.set("status", filters.status);
  }

  if (filters.categoryId) {
    params.set("category", filters.categoryId);
  }

  if (filters.query) {
    params.set("q", filters.query);
  }

  if (filters.hot && filters.hot !== "all") {
    params.set("hot", filters.hot);
  }

  const query = params.toString();
  return query ? `/admin/menu?${query}` : "/admin/menu";
}

function matchesQuery(haystack: string, query: string): boolean {
  return haystack.toLowerCase().includes(query.toLowerCase());
}

export function filterMenuCategories(
  categories: MenuCategoryRecord[],
  filters: MenuAdminFilters,
): MenuCategoryRecord[] {
  return categories.filter((category) => {
    if (filters.categoryId && category.id !== filters.categoryId) {
      return false;
    }

    if (filters.status !== "all" && category.status !== filters.status) {
      return false;
    }

    if (filters.query) {
      const haystack = `${category.name} ${category.slug} ${category.description ?? ""}`;
      if (!matchesQuery(haystack, filters.query)) {
        return false;
      }
    }

    return true;
  });
}

export function filterMenuItems(
  items: MenuItemWithCategory[],
  filters: MenuAdminFilters,
): MenuItemWithCategory[] {
  return items.filter((item) => {
    if (filters.categoryId && item.category_id !== filters.categoryId) {
      return false;
    }

    if (filters.status !== "all" && item.status !== filters.status) {
      return false;
    }

    if (filters.hot === "hot" && !item.is_hot) {
      return false;
    }

    if (filters.hot === "normal" && item.is_hot) {
      return false;
    }

    if (filters.query) {
      const haystack = `${item.name} ${item.slug} ${item.search_terms ?? ""} ${item.category.name}`;
      if (!matchesQuery(haystack, filters.query)) {
        return false;
      }
    }

    return true;
  });
}

export function hasActiveMenuFilters(filters: MenuAdminFilters): boolean {
  return (
    filters.view !== "all" ||
    filters.status !== "all" ||
    Boolean(filters.categoryId) ||
    Boolean(filters.query) ||
    filters.hot !== "all"
  );
}

export function countDraftMenuItems(items: MenuItemWithCategory[]): number {
  return items.filter((item) => item.status === "draft").length;
}

export function countDraftMenuCategories(categories: MenuCategoryRecord[]): number {
  return categories.filter((category) => category.status === "draft").length;
}
