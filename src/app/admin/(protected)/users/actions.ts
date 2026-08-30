"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireRole } from "@/lib/auth/session";
import { getSupabaseServiceConfig, getSupabaseServiceConfigError } from "@/lib/env-server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/database";

const createUserSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu tối thiểu 8 ký tự"),
  fullName: z.string().trim().min(1, "Họ tên không được để trống"),
  role: z.enum(["admin", "editor"]),
});

const updateRoleSchema = z.object({
  userId: z.string().uuid(),
  role: z.enum(["admin", "editor"]),
});

export type UserActionState = {
  ok: boolean;
  message: string;
};

function mapCreateUserError(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("already") && lower.includes("registered")) {
    return "Email đã được sử dụng.";
  }

  if (lower.includes("duplicate") || lower.includes("unique")) {
    return "Email đã được sử dụng.";
  }

  return message;
}

export async function createAdminUser(
  _prev: UserActionState,
  formData: FormData,
): Promise<UserActionState> {
  await requireRole(["admin"]);

  const parsed = createUserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    fullName: formData.get("fullName"),
    role: formData.get("role"),
  });

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }

  if (!getSupabaseServiceConfig()) {
    return { ok: false, message: getSupabaseServiceConfigError() };
  }

  const normalizedEmail = parsed.data.email.trim().toLowerCase();
  const admin = createAdminClient();

  const { data, error } = await admin.auth.admin.createUser({
    email: normalizedEmail,
    password: parsed.data.password,
    email_confirm: true,
    user_metadata: {
      full_name: parsed.data.fullName,
    },
  });

  if (error) {
    return { ok: false, message: mapCreateUserError(error.message) };
  }

  const userId = data.user?.id;
  if (!userId) {
    return { ok: false, message: "Không tạo được người dùng." };
  }

  const { error: profileError } = await admin
    .from("profiles")
    .update({
      full_name: parsed.data.fullName,
      role: parsed.data.role,
    })
    .eq("id", userId);

  if (profileError) {
    return { ok: false, message: profileError.message };
  }

  revalidatePath("/admin/users");
  return { ok: true, message: `Đã tạo tài khoản ${normalizedEmail}` };
}

export async function updateUserRole(
  _prev: UserActionState,
  formData: FormData,
): Promise<UserActionState> {
  const session = await requireRole(["admin"]);

  const parsed = updateRoleSchema.safeParse({
    userId: formData.get("userId"),
    role: formData.get("role"),
  });

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }

  if (parsed.data.userId === session.userId) {
    return { ok: false, message: "Không thể đổi role của chính bạn." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ role: parsed.data.role satisfies UserRole })
    .eq("id", parsed.data.userId);

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidatePath("/admin/users");
  return { ok: true, message: "Đã cập nhật quyền người dùng." };
}
