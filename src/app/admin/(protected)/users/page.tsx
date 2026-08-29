import { CreateUserForm, UsersTable } from "@/components/admin/users-manager";
import { requireRole } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/database";

export default async function AdminUsersPage() {
  const session = await requireRole(["admin"]);
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: true });

  const users = (data ?? []) as Profile[];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Người dùng</h1>
        <p className="text-muted-foreground">
          Tạo tài khoản editor/admin cho marketing. Chỉ admin mới truy cập trang này.
        </p>
      </div>

      {error ? (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          Không tải được danh sách người dùng: {error.message}
        </div>
      ) : null}

      <CreateUserForm />
      <UsersTable users={users} currentUserId={session.userId} />
    </div>
  );
}
