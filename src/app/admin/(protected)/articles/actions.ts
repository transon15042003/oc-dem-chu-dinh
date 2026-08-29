"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { CACHE_TAGS } from "@/lib/cache/tags";
import { ensureUniqueSlug, slugifyTitle } from "@/lib/articles/slug";
import { getExistingArticleSlugs } from "@/lib/articles/queries";
import { requireRole } from "@/lib/auth/session";
import { uploadContentImage } from "@/lib/content/upload-image";
import { createClient } from "@/lib/supabase/server";
import { articleFormSchema } from "@/lib/validations/article";
import type { PublicationStatus } from "@/types/database";

export type ArticleActionState = {
  ok: boolean;
  message: string;
};

const initialArticleActionState: ArticleActionState = { ok: false, message: "" };

function parseArticleForm(formData: FormData) {
  return articleFormSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt") ?? "",
    body: formData.get("body"),
    status: formData.get("status"),
    coverImageUrl: formData.get("coverImageUrl") ?? "",
    category: formData.get("category") ?? "",
    isFeatured: formData.get("isFeatured") === "true" ? "true" : "false",
  });
}

function articleMetaFromForm(parsed: {
  category?: string;
  isFeatured?: "true" | "false";
}) {
  return {
    category: parsed.category || null,
    is_featured: parsed.isFeatured === "true",
  };
}

async function resolveCoverImageUrl(
  formData: FormData,
  currentUrl?: string | null,
): Promise<{ url: string | null; error?: string }> {
  const coverFile = formData.get("coverImage");

  if (coverFile instanceof File && coverFile.size > 0) {
    const uploadForm = new FormData();
    uploadForm.append("file", coverFile);
    const result = await uploadContentImage(uploadForm);

    if (!result.ok) {
      return { url: currentUrl ?? null, error: result.message };
    }

    return { url: result.url };
  }

  const urlFromForm = formData.get("coverImageUrl");
  if (typeof urlFromForm === "string" && urlFromForm.trim()) {
    return { url: urlFromForm.trim() };
  }

  return { url: currentUrl ?? null };
}

async function resolveSlug(
  title: string,
  slugInput: string,
  excludeId?: string,
): Promise<string> {
  const baseSlug = slugInput.trim() || slugifyTitle(title);
  const existing = await getExistingArticleSlugs(excludeId);
  return ensureUniqueSlug(baseSlug, existing);
}

function publishedAtForStatus(
  status: PublicationStatus,
  currentPublishedAt: string | null,
): string | null {
  if (status === "published") {
    return currentPublishedAt ?? new Date().toISOString();
  }

  return null;
}

export async function createArticle(
  _prev: ArticleActionState,
  formData: FormData,
): Promise<ArticleActionState> {
  const session = await requireRole(["admin", "editor"]);
  const parsed = parseArticleForm(formData);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ",
    };
  }

  const cover = await resolveCoverImageUrl(formData);
  if (cover.error) {
    return { ok: false, message: cover.error };
  }

  const slug = await resolveSlug(parsed.data.title, parsed.data.slug);
  const status = parsed.data.status;
  const publishedAt = publishedAtForStatus(status, null);
  const meta = articleMetaFromForm(parsed.data);

  const supabase = await createClient();

  if (meta.is_featured) {
    await supabase.from("articles").update({ is_featured: false });
  }

  const { data, error } = await supabase
    .from("articles")
    .insert({
      title: parsed.data.title,
      slug,
      excerpt: parsed.data.excerpt || null,
      body: parsed.data.body,
      cover_image_url: cover.url,
      status,
      published_at: publishedAt,
      category: meta.category,
      is_featured: meta.is_featured,
      author_id: session.userId,
    })
    .select("id")
    .single();

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidatePath("/admin/articles");
  revalidatePath("/tin-tuc");
  revalidateTag(CACHE_TAGS.articles, "max");
  redirect(`/admin/articles/${data.id}/edit`);
}

export async function updateArticle(
  articleId: string,
  _prev: ArticleActionState,
  formData: FormData,
): Promise<ArticleActionState> {
  await requireRole(["admin", "editor"]);
  const parsed = parseArticleForm(formData);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ",
    };
  }

  const supabase = await createClient();
  const { data: existing, error: fetchError } = await supabase
    .from("articles")
    .select("published_at, cover_image_url, slug")
    .eq("id", articleId)
    .single();

  if (fetchError || !existing) {
    return { ok: false, message: "Không tìm thấy bài viết." };
  }

  const cover = await resolveCoverImageUrl(formData, existing.cover_image_url);
  if (cover.error) {
    return { ok: false, message: cover.error };
  }

  const slug = await resolveSlug(parsed.data.title, parsed.data.slug, articleId);
  const status = parsed.data.status;
  const publishedAt = publishedAtForStatus(status, existing.published_at);
  const meta = articleMetaFromForm(parsed.data);

  if (meta.is_featured) {
    await supabase.from("articles").update({ is_featured: false }).neq("id", articleId);
  }

  const { error } = await supabase
    .from("articles")
    .update({
      title: parsed.data.title,
      slug,
      excerpt: parsed.data.excerpt || null,
      body: parsed.data.body,
      cover_image_url: cover.url,
      status,
      published_at: publishedAt,
      category: meta.category,
      is_featured: meta.is_featured,
    })
    .eq("id", articleId);

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidatePath("/admin/articles");
  revalidatePath(`/admin/articles/${articleId}/edit`);
  revalidatePath("/tin-tuc");
  revalidatePath(`/tin-tuc/${existing.slug}`);
  if (slug !== existing.slug) {
    revalidatePath(`/tin-tuc/${slug}`);
  }
  revalidateTag(CACHE_TAGS.articles, "max");
  revalidateTag(`article:${existing.slug}`, "max");
  if (slug !== existing.slug) {
    revalidateTag(`article:${slug}`, "max");
  }

  return { ok: true, message: "Đã lưu bài viết." };
}

export async function deleteArticle(articleId: string): Promise<ArticleActionState> {
  await requireRole(["admin", "editor"]);

  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("id", articleId);

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidatePath("/admin/articles");
  revalidatePath("/tin-tuc");
  revalidateTag(CACHE_TAGS.articles, "max");

  return { ok: true, message: "Đã xóa bài viết." };
}

export { initialArticleActionState };
