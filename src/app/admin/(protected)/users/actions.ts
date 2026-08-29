"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireRole } from "@/lib/auth/session";
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

  const supabase = await createClient();
  const { error } = await supabase.rpc("admin_create_user", {
    p_email: parsed.data.email,
    p_password: parsed.data.password,
    p_full_name: parsed.data.fullName,
    p_role: parsed.data.role,
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidatePath("/admin/users");
  return { ok: true, message: `Đã tạo tài khoản ${parsed.data.email}` };
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
