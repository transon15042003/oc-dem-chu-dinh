import type { Metadata } from "next";

import { AdminNav } from "@/components/admin/admin-nav";
import { requireAdminSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const session = await requireAdminSession();

  return (
    <div className="min-h-screen bg-background">
      <AdminNav
        role={session.profile.role}
        displayName={session.profile.full_name ?? session.email}
        email={session.email}
      />
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
