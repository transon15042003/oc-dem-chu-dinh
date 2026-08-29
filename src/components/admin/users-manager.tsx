"use client";

import { useActionState, useOptimistic, useTransition } from "react";

import {
  createAdminUser,
  type UserActionState,
  updateUserRole,
} from "@/app/admin/(protected)/users/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Profile, UserRole } from "@/types/database";

const initialState: UserActionState = { ok: false, message: "" };

const roleOptions = [
  { value: "editor", label: "Editor" },
  { value: "admin", label: "Admin" },
] as const;

type CreateUserFormProps = {
  disabled?: boolean;
};

export function CreateUserForm({ disabled }: CreateUserFormProps) {
  const [state, action, pending] = useActionState(createAdminUser, initialState);

  return (
    <form action={action} className="space-y-4 rounded-xl border border-border bg-card p-4">
      <h2 className="text-lg font-semibold">Tạo tài khoản mới</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Họ tên</Label>
          <Input id="fullName" name="fullName" required disabled={disabled || pending} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            disabled={disabled || pending}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Mật khẩu tạm</Label>
          <Input
            id="password"
            name="password"
            type="password"
            minLength={8}
            required
            disabled={disabled || pending}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Quyền</Label>
          <select
            id="role"
            name="role"
            defaultValue="editor"
            disabled={disabled || pending}
            className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
          >
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {state.message ? (
        <p className={state.ok ? "text-sm text-green-600" : "text-sm text-destructive"}>
          {state.message}
        </p>
      ) : null}

      <Button type="submit" disabled={disabled || pending}>
        {pending ? "Đang tạo..." : "Tạo tài khoản"}
      </Button>
    </form>
  );
}

type UsersTableProps = {
  users: Profile[];
  currentUserId: string;
};

type RoleOptimisticUpdate = {
  userId: string;
  role: UserRole;
};

export function UsersTable({ users, currentUserId }: UsersTableProps) {
  const [optimisticUsers, applyOptimisticRole] = useOptimistic(
    users,
    (currentUsers, update: RoleOptimisticUpdate) =>
      currentUsers.map((user) =>
        user.id === update.userId ? { ...user, role: update.role } : user,
      ),
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/50 text-left">
          <tr>
            <th className="px-4 py-3 font-semibold">Email</th>
            <th className="px-4 py-3 font-semibold">Họ tên</th>
            <th className="px-4 py-3 font-semibold">Quyền</th>
            <th className="px-4 py-3 font-semibold">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {optimisticUsers.map((user) => (
            <tr key={user.id} className="border-t border-border">
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">{user.full_name ?? "—"}</td>
              <td className="px-4 py-3 capitalize">{user.role}</td>
              <td className="px-4 py-3">
                {user.id === currentUserId ? (
                  <span className="text-muted-foreground">Tài khoản hiện tại</span>
                ) : (
                  <RoleForm
                    userId={user.id}
                    currentRole={user.role}
                    onOptimisticRole={applyOptimisticRole}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type RoleFormProps = {
  userId: string;
  currentRole: Profile["role"];
  onOptimisticRole: (update: RoleOptimisticUpdate) => void;
};

function RoleForm({ userId, currentRole, onOptimisticRole }: RoleFormProps) {
  const [state, formAction, pending] = useActionState(updateUserRole, initialState);
  const [, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    const role = formData.get("role");

    startTransition(() => {
      if (role === "admin" || role === "editor") {
        onOptimisticRole({ userId, role });
      }
      formAction(formData);
    });
  }

  return (
    <form action={handleSubmit} className="flex flex-wrap items-center gap-2">
      <input type="hidden" name="userId" value={userId} />
      <select
        name="role"
        key={currentRole}
        defaultValue={currentRole}
        disabled={pending}
        className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm"
      >
        {roleOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Button type="submit" size="sm" variant="outline" disabled={pending}>
        {pending ? "Đang lưu..." : "Lưu"}
      </Button>
      {state.message && !state.ok ? (
        <span className="text-xs text-destructive">{state.message}</span>
      ) : null}
    </form>
  );
}
