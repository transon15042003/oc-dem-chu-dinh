import { redirect } from "next/navigation";
import { cache } from "react";

import { createClient } from "@/lib/supabase/server";
import type { Profile, UserRole } from "@/types/database";

const profileColumns =
  "id, email, full_name, role, created_at, updated_at" as const;

/**
 * Một lần gọi auth + profile / request (dedupe layout + page + actions trong cùng render).
 */
export const getSessionProfile = cache(async (): Promise<{
  userId: string;
  email: string;
  profile: Profile;
} | null> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(profileColumns)
    .eq("id", user.id)
    .single();

  if (!profile) {
    return null;
  }

  return {
    userId: user.id,
    email: user.email,
    profile: profile as Profile,
  };
});

export async function requireAdminSession() {
  const session = await getSessionProfile();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function requireRole(allowed: UserRole[]) {
  const session = await requireAdminSession();

  if (!allowed.includes(session.profile.role)) {
    redirect("/admin");
  }

  return session;
}

export function isAdminRole(role: UserRole): boolean {
  return role === "admin";
}

export function canManageContent(role: UserRole): boolean {
  return role === "admin" || role === "editor";
}
