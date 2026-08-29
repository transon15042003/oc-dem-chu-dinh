"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { ensureUniqueSlug, slugifyTitle } from "@/lib/articles/slug";
import { perksFromTextarea } from "@/lib/careers/perks";
import { getExistingCareerPositionSlugs } from "@/lib/careers/queries";
import { CACHE_TAGS } from "@/lib/cache/tags";
import { requireRole } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import { careerPositionFormSchema } from "@/lib/validations/career-position";
import type { PublicationStatus } from "@/types/database";

export type CareerPositionActionState = {
  ok: boolean;
  message: string;
};

const initialCareerPositionActionState: CareerPositionActionState = { ok: false, message: "" };

function parseCareerPositionForm(formData: FormData) {
  return careerPositionFormSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    badge: formData.get("badge") ?? "",
    incomeLabel: formData.get("incomeLabel") ?? "",
    description: formData.get("description") ?? "",
    schedule: formData.get("schedule") ?? "",
    salary: formData.get("salary") ?? "",
    perks: formData.get("perks") ?? "",
    status: formData.get("status"),
    showOnListing: formData.get("showOnListing") === "true" ? "true" : "false",
    sortOrder: formData.get("sortOrder") ?? "0",
  });
}

async function resolveSlug(
  title: string,
  slugInput: string,
  excludeId?: string,
): Promise<string> {
  const baseSlug = slugInput.trim() || slugifyTitle(title);
  const existing = await getExistingCareerPositionSlugs(excludeId);
  return ensureUniqueSlug(baseSlug, existing);
}

function rowFromForm(parsed: ReturnType<typeof parseCareerPositionForm>["data"]) {
  if (!parsed) {
    throw new Error("Invalid form");
  }

  return {
    title: parsed.title,
    badge: parsed.badge || null,
    income_label: parsed.incomeLabel || null,
    description: parsed.description || null,
    schedule: parsed.schedule || null,
    salary: parsed.salary || null,
    perks: perksFromTextarea(parsed.perks ?? ""),
    status: parsed.status as PublicationStatus,
    show_on_listing: parsed.showOnListing === "true",
    sort_order: parsed.sortOrder,
  };
}

export async function createCareerPosition(
  _prev: CareerPositionActionState,
  formData: FormData,
): Promise<CareerPositionActionState> {
  await requireRole(["admin", "editor"]);
  const parsed = parseCareerPositionForm(formData);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ",
    };
  }

  const slug = await resolveSlug(parsed.data.title, parsed.data.slug);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("career_positions")
    .insert({
      slug,
      ...rowFromForm(parsed.data),
    })
    .select("id")
    .single();

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidatePath("/admin/careers");
  revalidatePath("/tuyen-dung");
  revalidateTag(CACHE_TAGS.careers, "max");
  redirect(`/admin/careers/${data.id}/edit`);
}

export async function updateCareerPosition(
  positionId: string,
  _prev: CareerPositionActionState,
  formData: FormData,
): Promise<CareerPositionActionState> {
  await requireRole(["admin", "editor"]);
  const parsed = parseCareerPositionForm(formData);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ",
    };
  }

  const supabase = await createClient();
  const { data: existing, error: fetchError } = await supabase
    .from("career_positions")
    .select("slug")
    .eq("id", positionId)
    .single();

  if (fetchError || !existing) {
    return { ok: false, message: "Không tìm thấy vị trí tuyển dụng." };
  }

  const slug = await resolveSlug(parsed.data.title, parsed.data.slug, positionId);

  const { error } = await supabase
    .from("career_positions")
    .update({
      slug,
      ...rowFromForm(parsed.data),
    })
    .eq("id", positionId);

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidatePath("/admin/careers");
  revalidatePath(`/admin/careers/${positionId}/edit`);
  revalidatePath("/tuyen-dung");
  revalidateTag(CACHE_TAGS.careers, "max");

  return { ok: true, message: "Đã lưu vị trí tuyển dụng." };
}

export async function deleteCareerPosition(positionId: string): Promise<CareerPositionActionState> {
  await requireRole(["admin", "editor"]);

  const supabase = await createClient();
  const { error } = await supabase.from("career_positions").delete().eq("id", positionId);

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidatePath("/admin/careers");
  revalidatePath("/tuyen-dung");
  revalidateTag(CACHE_TAGS.careers, "max");

  return { ok: true, message: "Đã xóa vị trí tuyển dụng." };
}

export { initialCareerPositionActionState };
