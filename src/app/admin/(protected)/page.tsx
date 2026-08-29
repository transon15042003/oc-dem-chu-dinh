import Link from "next/link";

import { getSessionProfile } from "@/lib/auth/session";

export default async function AdminDashboardPage() {
  // Layout đã requireAdminSession; getSessionProfile dùng React cache() — không gọi Supabase lại.
  const session = await getSessionProfile();
  if (!session) return null;

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
        <Link
          href="/admin/articles"
          prefetch={false}
          className="rounded-xl border border-border p-6 transition-colors hover:border-brand-red/40 hover:bg-muted/30"
        >
          <h2 className="font-semibold">Tin tức</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Viết và quản lý bài viết tại /tin-tuc
          </p>
        </Link>
        <Link
          href="/admin/promotions"
          prefetch={false}
          className="rounded-xl border border-border p-6 transition-colors hover:border-brand-red/40 hover:bg-muted/30"
        >
          <h2 className="font-semibold">Khuyến mãi</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Quản lý chương trình ưu đãi tại /khuyen-mai
          </p>
        </Link>
      </div>

      {session.profile.role === "admin" ? (
        <p className="text-sm">
          Quản lý tài khoản:{" "}
          <Link
            href="/admin/users"
            prefetch={false}
            className="font-medium text-brand-red hover:underline"
          >
            /admin/users
          </Link>
        </p>
      ) : null}
    </div>
  );
}
