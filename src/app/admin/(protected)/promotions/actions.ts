"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { CACHE_TAGS } from "@/lib/cache/tags";
import { ensureUniqueSlug, slugifyTitle } from "@/lib/articles/slug";
import { toIsoFromDatetimeLocal } from "@/lib/promotions/datetime";
import { getExistingPromotionSlugs } from "@/lib/promotions/queries";
import { requireRole } from "@/lib/auth/session";
import { uploadContentImage } from "@/lib/content/upload-image";
import { createClient } from "@/lib/supabase/server";
import { promotionFormSchema } from "@/lib/validations/promotion";
import type { PublicationStatus } from "@/types/database";

export type PromotionActionState = {
  ok: boolean;
  message: string;
};

const initialPromotionActionState: PromotionActionState = { ok: false, message: "" };

function parsePromotionForm(formData: FormData) {
  return promotionFormSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt") ?? "",
    body: formData.get("body"),
    status: formData.get("status"),
    coverImageUrl: formData.get("coverImageUrl") ?? "",
    startsAt: formData.get("startsAt"),
    endsAt: formData.get("endsAt"),
    discountLabel: formData.get("discountLabel") ?? "",
    promoCode: formData.get("promoCode") ?? "",
  });
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
  const existing = await getExistingPromotionSlugs(excludeId);
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

export async function createPromotion(
  _prev: PromotionActionState,
  formData: FormData,
): Promise<PromotionActionState> {
  const session = await requireRole(["admin", "editor"]);
  const parsed = parsePromotionForm(formData);

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

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("promotions")
    .insert({
      title: parsed.data.title,
      slug,
      excerpt: parsed.data.excerpt || null,
      body: parsed.data.body,
      cover_image_url: cover.url,
      status,
      published_at: publishedAt,
      starts_at: toIsoFromDatetimeLocal(parsed.data.startsAt),
      ends_at: toIsoFromDatetimeLocal(parsed.data.endsAt),
      discount_label: parsed.data.discountLabel || null,
      promo_code: parsed.data.promoCode || null,
      author_id: session.userId,
    })
    .select("id")
    .single();

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidatePath("/admin/promotions");
  revalidatePath("/khuyen-mai");
  revalidateTag(CACHE_TAGS.promotions, "max");
  redirect(`/admin/promotions/${data.id}/edit`);
}

export async function updatePromotion(
  promotionId: string,
  _prev: PromotionActionState,
  formData: FormData,
): Promise<PromotionActionState> {
  await requireRole(["admin", "editor"]);
  const parsed = parsePromotionForm(formData);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ",
    };
  }

  const supabase = await createClient();
  const { data: existing, error: fetchError } = await supabase
    .from("promotions")
    .select("published_at, cover_image_url, slug")
    .eq("id", promotionId)
    .single();

  if (fetchError || !existing) {
    return { ok: false, message: "Không tìm thấy khuyến mãi." };
  }

  const cover = await resolveCoverImageUrl(formData, existing.cover_image_url);
  if (cover.error) {
    return { ok: false, message: cover.error };
  }

  const slug = await resolveSlug(parsed.data.title, parsed.data.slug, promotionId);
  const status = parsed.data.status;
  const publishedAt = publishedAtForStatus(status, existing.published_at);

  const { error } = await supabase
    .from("promotions")
    .update({
      title: parsed.data.title,
      slug,
      excerpt: parsed.data.excerpt || null,
      body: parsed.data.body,
      cover_image_url: cover.url,
      status,
      published_at: publishedAt,
      starts_at: toIsoFromDatetimeLocal(parsed.data.startsAt),
      ends_at: toIsoFromDatetimeLocal(parsed.data.endsAt),
      discount_label: parsed.data.discountLabel || null,
      promo_code: parsed.data.promoCode || null,
    })
    .eq("id", promotionId);

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidatePath("/admin/promotions");
  revalidatePath(`/admin/promotions/${promotionId}/edit`);
  revalidatePath("/khuyen-mai");
  revalidatePath(`/khuyen-mai/${existing.slug}`);
  if (slug !== existing.slug) {
    revalidatePath(`/khuyen-mai/${slug}`);
  }
  revalidateTag(CACHE_TAGS.promotions, "max");
  revalidateTag(`promotion:${existing.slug}`, "max");
  if (slug !== existing.slug) {
    revalidateTag(`promotion:${slug}`, "max");
  }

  return { ok: true, message: "Đã lưu khuyến mãi." };
}

export async function deletePromotion(promotionId: string): Promise<PromotionActionState> {
  await requireRole(["admin", "editor"]);

  const supabase = await createClient();
  const { error } = await supabase.from("promotions").delete().eq("id", promotionId);

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidatePath("/admin/promotions");
  revalidatePath("/khuyen-mai");
  revalidateTag(CACHE_TAGS.promotions, "max");

  return { ok: true, message: "Đã xóa khuyến mãi." };
}

export { initialPromotionActionState };
