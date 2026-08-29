"use server";

import { requireRole } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import { CONTENT_IMAGE_BUCKET, MAX_CONTENT_IMAGE_BYTES } from "@/types/database";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export type UploadImageResult =
  | { ok: true; url: string }
  | { ok: false; message: string };

export async function uploadContentImage(formData: FormData): Promise<UploadImageResult> {
  const session = await requireRole(["admin", "editor"]);

  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "Không có file ảnh hợp lệ." };
  }

  if (file.size > MAX_CONTENT_IMAGE_BYTES) {
    return { ok: false, message: "Ảnh tối đa 2MB." };
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return { ok: false, message: "Chỉ chấp nhận JPG, PNG, WebP hoặc GIF." };
  }

  const extension = MIME_TO_EXT[file.type] ?? "jpg";
  const objectPath = `articles/${session.userId}/${crypto.randomUUID()}.${extension}`;

  const supabase = await createClient();
  const { error } = await supabase.storage
    .from(CONTENT_IMAGE_BUCKET)
    .upload(objectPath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return { ok: false, message: error.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(CONTENT_IMAGE_BUCKET).getPublicUrl(objectPath);

  return { ok: true, url: publicUrl };
}
