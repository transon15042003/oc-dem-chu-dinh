import Link from "next/link";

import { requireAdminSession } from "@/lib/auth/session";

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tổng quan</h1>
        <p className="text-muted-foreground">
          Xin chào {session.profile.full_name ?? session.email} (
          {session.profile.role})
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-dashed border-border p-6">
          <h2 className="font-semibold">Tin tức</h2>
          <p className="mt-2 text-sm text-muted-foreground">CRUD Article — đang phát triển v2.0</p>
        </div>
        <div className="rounded-xl border border-dashed border-border p-6">
          <h2 className="font-semibold">Khuyến mãi</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            CRUD Promotion — đang phát triển v2.0
          </p>
        </div>
      </div>

      {session.profile.role === "admin" ? (
        <p className="text-sm">
          Quản lý tài khoản:{" "}
          <Link href="/admin/users" className="font-medium text-brand-red hover:underline">
            /admin/users
          </Link>
        </p>
      ) : null}
    </div>
  );
}
