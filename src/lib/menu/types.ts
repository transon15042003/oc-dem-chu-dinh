import assetKeyMapJson from "../../../scripts/asset-key-map.json";
import { cdnImage } from "@/lib/images";
import type { MenuCategoryRecord, MenuItemRecord } from "@/types/database";

const assetKeyMap = assetKeyMapJson as Record<string, string>;

export type MenuCategory = {
  id: string;
  slug: string;
  name: string;
  description: string;
};

export type MenuItem = {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  image: string;
  fullImage: string;
  hot?: boolean;
  searchTerms: string;
};

export type MenuTabId = "all" | string;

export function buildMenuImageUrls(imagePath: string): { image: string; fullImage: string } {
  const fullImage = cdnImage(imagePath);
  const webpPath = imagePath.replace(/\.jpg$/i, "_400-400.webp");

  const image =
    webpPath !== imagePath && assetKeyMap[webpPath] ? cdnImage(webpPath) : fullImage;

  return { image, fullImage };
}

export function toMenuCategory(row: MenuCategoryRecord): MenuCategory {
  return {
    id: row.slug,
    slug: row.slug,
    name: row.name,
    description: row.description ?? "",
  };
}

export function toMenuItem(row: MenuItemRecord, categorySlug: string): MenuItem {
  const images = buildMenuImageUrls(row.image_path);

  return {
    id: row.slug,
    slug: row.slug,
    name: row.name,
    categoryId: categorySlug,
    image: images.image,
    fullImage: images.fullImage,
    hot: row.is_hot || undefined,
    searchTerms: row.search_terms ?? row.name.toLowerCase(),
  };
}

export function buildMenuFilterTabs(categories: MenuCategory[]): Array<{ id: MenuTabId; label: string }> {
  return [
    { id: "all", label: "TẤT CẢ MÓN" },
    { id: "featured", label: "⭐ KHUYÊN DÙNG" },
    ...categories
      .filter((category) => category.slug !== "featured")
      .map((category) => ({ id: category.slug, label: category.name })),
  ];
}

export function getMenuItemsByCategory(items: MenuItem[], categoryId: string): MenuItem[] {
  return items.filter((item) => item.categoryId === categoryId);
}

export function filterMenuItems(items: MenuItem[], searchQuery: string): MenuItem[] {
  const query = searchQuery.trim().toLowerCase();
  if (!query) return items;
  return items.filter((item) => item.searchTerms.includes(query));
}
