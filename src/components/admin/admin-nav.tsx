"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import type { UserRole } from "@/types/database";
import { cn } from "@/lib/utils";

type AdminNavProps = {
  role: UserRole;
  email: string;
};

const navItems = [
  { href: "/admin", label: "Tổng quan", roles: ["admin", "editor"] as UserRole[] },
  { href: "/admin/users", label: "Người dùng", roles: ["admin"] as UserRole[] },
];

export function AdminNav({ role, email }: AdminNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Admin
          </p>
          <h1 className="text-lg font-bold">Ốc Đêm Chú Đỉnh</h1>
        </div>

        <nav className="flex flex-wrap gap-2">
          {navItems
            .filter((item) => item.roles.includes(role))
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-brand-red text-on-red"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <div className="flex items-center gap-3">
          <p className="hidden text-sm text-muted-foreground sm:block">{email}</p>
          <Button type="button" variant="outline" size="sm" onClick={handleSignOut}>
            Đăng xuất
          </Button>
        </div>
      </div>
    </header>
  );
}
