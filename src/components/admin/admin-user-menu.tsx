"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, UserCircle, Users } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLinkItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import type { UserRole } from "@/types/database";

type AdminUserMenuProps = {
  displayName: string;
  email: string;
  role: UserRole;
};

export function AdminUserMenu({ displayName, email, role }: AdminUserMenuProps) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="max-w-[6.5rem] sm:max-w-[11rem]">
        <span className="truncate">{displayName}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="space-y-0.5">
          <p className="truncate font-medium text-foreground">{displayName}</p>
          <p className="truncate font-normal normal-case">{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLinkItem render={<Link href="/admin/profile" />}>
          <UserCircle className="size-4" />
          Quản lý hồ sơ
        </DropdownMenuLinkItem>
        {role === "admin" ? (
          <DropdownMenuLinkItem render={<Link href="/admin/users" />}>
            <Users className="size-4" />
            Nhân viên
          </DropdownMenuLinkItem>
        ) : null}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="size-4" />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
