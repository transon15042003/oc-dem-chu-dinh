"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AdminUserMenu } from "@/components/admin/admin-user-menu";
import type { UserRole } from "@/types/database";
import { cn } from "@/lib/utils";

type AdminNavProps = {
  role: UserRole;
  displayName: string;
  email: string;
};

const navItems = [
  { href: "/admin", label: "Tổng quan", roles: ["admin", "editor"] as UserRole[], exact: true },
  { href: "/admin/articles", label: "Tin tức", roles: ["admin", "editor"] as UserRole[] },
  { href: "/admin/promotions", label: "Khuyến mãi", roles: ["admin", "editor"] as UserRole[] },
  { href: "/admin/bookings", label: "Đặt chỗ", roles: ["admin", "editor"] as UserRole[] },
  { href: "/admin/careers", label: "Tuyển dụng", roles: ["admin", "editor"] as UserRole[] },
  { href: "/admin/menu", label: "Thực đơn", roles: ["admin", "editor"] as UserRole[] },
  { href: "/admin/users", label: "Nhân viên", roles: ["admin"] as UserRole[] },
];

function isNavActive(pathname: string, href: string, exact?: boolean): boolean {
  if (exact) {
    return pathname === href;
  }

  if (href === "/admin/bookings") {
    return (
      pathname.startsWith("/admin/bookings") ||
      pathname.startsWith("/admin/event-bookings")
    );
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminNav({ role, displayName, email }: AdminNavProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/80">
      <div className="mx-auto grid h-14 max-w-6xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 px-3 sm:gap-3 sm:px-4">
        <Link
          href="/admin"
          className="w-fit shrink-0 justify-self-start rounded-lg px-2 py-1 transition-colors hover:bg-muted"
          title="Về trang tổng quan"
        >
          <span className="block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            Admin
          </span>
          <span className="block text-sm font-bold leading-tight">Ốc ĐCM</span>
        </Link>

        <nav className="flex max-w-[min(100vw-9.5rem,40rem)] items-center justify-center gap-0.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:max-w-[min(100vw-14rem,42rem)] sm:gap-1 [&::-webkit-scrollbar]:hidden">
          {navItems
            .filter((item) => item.roles.includes(role))
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className={cn(
                  "shrink-0 rounded-lg px-2 py-1.5 text-xs font-medium whitespace-nowrap transition-colors sm:px-2.5 sm:text-sm",
                  isNavActive(pathname, item.href, item.exact)
                    ? "bg-brand-red text-on-red"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <div className="min-w-0 justify-self-end">
          <AdminUserMenu displayName={displayName} email={email} role={role} />
        </div>
      </div>
    </header>
  );
}
