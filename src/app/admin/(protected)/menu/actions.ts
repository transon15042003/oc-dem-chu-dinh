"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { ensureUniqueSlug, slugifyTitle } from "@/lib/articles/slug";
import { CACHE_TAGS } from "@/lib/cache/tags";
import {
  getExistingMenuCategorySlugs,
  getExistingMenuItemSlugs,
} from "@/lib/menu/queries";
import { requireRole } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import { menuCategoryFormSchema, menuItemFormSchema } from "@/lib/validations/menu";
import type { PublicationStatus } from "@/types/database";

export type MenuActionState = {
  ok: boolean;
  message: string;
};

export const initialMenuActionState: MenuActionState = { ok: false, message: "" };

function revalidateMenuPaths() {
  revalidatePath("/admin/menu");
  revalidatePath("/thuc-don");
  revalidateTag(CACHE_TAGS.menu, "max");
}

async function resolveSlug(
  title: string,
  slugInput: string,
  existingSlugs: string[],
): Promise<string> {
  const baseSlug = slugInput.trim() || slugifyTitle(title);
  return ensureUniqueSlug(baseSlug, existingSlugs);
}

function parseMenuCategoryForm(formData: FormData) {
  return menuCategoryFormSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug") ?? "",
    description: formData.get("description") ?? "",
    status: formData.get("status"),
    showInFilter: formData.get("showInFilter") === "true" ? "true" : "false",
    sortOrder: formData.get("sortOrder") ?? "0",
  });
}

function parseMenuItemForm(formData: FormData) {
  return menuItemFormSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug") ?? "",
    categoryId: formData.get("categoryId"),
    imagePath: formData.get("imagePath"),
    searchTerms: formData.get("searchTerms") ?? "",
    status: formData.get("status"),
    isHot: formData.get("isHot") === "true" ? "true" : "false",
    sortOrder: formData.get("sortOrder") ?? "0",
  });
}

export async function createMenuCategory(
  _prev: MenuActionState,
  formData: FormData,
): Promise<MenuActionState> {
  await requireRole(["admin", "editor"]);
  const parsed = parseMenuCategoryForm(formData);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ",
    };
  }

  const slug = await resolveSlug(parsed.data.name, parsed.data.slug ?? "", await getExistingMenuCategorySlugs());
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("menu_categories")
    .insert({
      slug,
      name: parsed.data.name,
      description: parsed.data.description || null,
      status: parsed.data.status as PublicationStatus,
      show_in_filter: parsed.data.showInFilter === "true",
      sort_order: parsed.data.sortOrder,
    })
    .select("id")
    .single();

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidateMenuPaths();
  redirect(`/admin/menu/categories/${data.id}/edit`);
}

export async function updateMenuCategory(
  categoryId: string,
  _prev: MenuActionState,
  formData: FormData,
): Promise<MenuActionState> {
  await requireRole(["admin", "editor"]);
  const parsed = parseMenuCategoryForm(formData);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ",
    };
  }

  const slug = await resolveSlug(
    parsed.data.name,
    parsed.data.slug ?? "",
    await getExistingMenuCategorySlugs(categoryId),
  );

  const supabase = await createClient();
  const { error } = await supabase
    .from("menu_categories")
    .update({
      slug,
      name: parsed.data.name,
      description: parsed.data.description || null,
      status: parsed.data.status as PublicationStatus,
      show_in_filter: parsed.data.showInFilter === "true",
      sort_order: parsed.data.sortOrder,
    })
    .eq("id", categoryId);

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidateMenuPaths();
  revalidatePath(`/admin/menu/categories/${categoryId}/edit`);

  return { ok: true, message: "Đã lưu danh mục." };
}

export async function deleteMenuCategory(categoryId: string): Promise<MenuActionState> {
  await requireRole(["admin", "editor"]);

  const supabase = await createClient();
  const { error } = await supabase.from("menu_categories").delete().eq("id", categoryId);

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidateMenuPaths();
  redirect("/admin/menu");
}

export async function createMenuItem(
  _prev: MenuActionState,
  formData: FormData,
): Promise<MenuActionState> {
  await requireRole(["admin", "editor"]);
  const parsed = parseMenuItemForm(formData);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ",
    };
  }

  const slug = await resolveSlug(parsed.data.name, parsed.data.slug ?? "", await getExistingMenuItemSlugs());
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("menu_items")
    .insert({
      slug,
      name: parsed.data.name,
      category_id: parsed.data.categoryId,
      image_path: parsed.data.imagePath.trim(),
      search_terms: parsed.data.searchTerms?.trim() || parsed.data.name.toLowerCase(),
      status: parsed.data.status as PublicationStatus,
      is_hot: parsed.data.isHot === "true",
      sort_order: parsed.data.sortOrder,
    })
    .select("id")
    .single();

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidateMenuPaths();
  redirect(`/admin/menu/items/${data.id}/edit`);
}

export async function updateMenuItem(
  itemId: string,
  _prev: MenuActionState,
  formData: FormData,
): Promise<MenuActionState> {
  await requireRole(["admin", "editor"]);
  const parsed = parseMenuItemForm(formData);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ",
    };
  }

  const slug = await resolveSlug(
    parsed.data.name,
    parsed.data.slug ?? "",
    await getExistingMenuItemSlugs(itemId),
  );

  const supabase = await createClient();
  const { error } = await supabase
    .from("menu_items")
    .update({
      slug,
      name: parsed.data.name,
      category_id: parsed.data.categoryId,
      image_path: parsed.data.imagePath.trim(),
      search_terms: parsed.data.searchTerms?.trim() || parsed.data.name.toLowerCase(),
      status: parsed.data.status as PublicationStatus,
      is_hot: parsed.data.isHot === "true",
      sort_order: parsed.data.sortOrder,
    })
    .eq("id", itemId);

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidateMenuPaths();
  revalidatePath(`/admin/menu/items/${itemId}/edit`);

  return { ok: true, message: "Đã lưu món ăn." };
}

export async function deleteMenuItem(itemId: string): Promise<MenuActionState> {
  await requireRole(["admin", "editor"]);

  const supabase = await createClient();
  const { error } = await supabase.from("menu_items").delete().eq("id", itemId);

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidateMenuPaths();
  redirect("/admin/menu");
}
