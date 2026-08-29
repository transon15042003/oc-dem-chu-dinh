import { UsersTable } from "@/components/admin/users-manager";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/database";

type UsersTableSectionProps = {
  currentUserId: string;
};

export async function UsersTableSection({ currentUserId }: UsersTableSectionProps) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, created_at, updated_at")
    .order("created_at", { ascending: true });

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
        Không tải được danh sách người dùng: {error.message}
      </div>
    );
  }

  const users = (data ?? []) as Profile[];

  return <UsersTable users={users} currentUserId={currentUserId} />;
}
