import { Suspense } from "react";

import { CreateUserForm } from "@/components/admin/users-manager";
import { AdminUsersTableSkeleton } from "@/components/admin/admin-skeletons";
import { requireRole } from "@/lib/auth/session";

import { UsersTableSection } from "./users-table-section";

export default async function AdminUsersPage() {
  const session = await requireRole(["admin"]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Nhân viên</h1>
        <p className="text-muted-foreground">
          Tạo tài khoản editor/admin cho marketing. Chỉ admin mới truy cập trang này và
          có thể nâng quyền editor lên admin.
        </p>
      </div>

      <CreateUserForm />

      <Suspense fallback={<AdminUsersTableSkeleton />}>
        <UsersTableSection currentUserId={session.userId} />
      </Suspense>
    </div>
  );
}
