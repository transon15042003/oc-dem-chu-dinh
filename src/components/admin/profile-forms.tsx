"use client";

import { useActionState } from "react";

import {
  changePassword,
  type ProfileActionState,
  updateProfileName,
} from "@/app/admin/(protected)/profile/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Profile } from "@/types/database";

const initialState: ProfileActionState = { ok: false, message: "" };

type ProfileFormsProps = {
  profile: Profile;
  email: string;
};

export function ProfileForms({ profile, email }: ProfileFormsProps) {
  const [profileState, profileAction, profilePending] = useActionState(
    updateProfileName,
    initialState,
  );
  const [passwordState, passwordAction, passwordPending] = useActionState(
    changePassword,
    initialState,
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form
        action={profileAction}
        className="space-y-4 rounded-xl border border-border bg-card p-4"
      >
        <div>
          <h2 className="text-lg font-semibold">Thông tin hiển thị</h2>
          <p className="text-sm text-muted-foreground">
            Cập nhật tên hiển thị trên admin. Email không thể thay đổi.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" value={email} disabled readOnly />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName">Tên hiển thị</Label>
          <Input
            id="fullName"
            name="fullName"
            defaultValue={profile.full_name ?? ""}
            required
            disabled={profilePending}
          />
        </div>

        <div className="space-y-2">
          <Label>Quyền</Label>
          <Input value={profile.role === "admin" ? "Admin" : "Editor"} disabled readOnly />
        </div>

        {profileState.message ? (
          <p className={profileState.ok ? "text-sm text-green-600" : "text-sm text-destructive"}>
            {profileState.message}
          </p>
        ) : null}

        <Button type="submit" disabled={profilePending}>
          {profilePending ? "Đang lưu..." : "Lưu thông tin"}
        </Button>
      </form>

      <form
        action={passwordAction}
        className="space-y-4 rounded-xl border border-border bg-card p-4"
      >
        <div>
          <h2 className="text-lg font-semibold">Đổi mật khẩu</h2>
          <p className="text-sm text-muted-foreground">
            Mật khẩu mới tối thiểu 8 ký tự.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Mật khẩu mới</Label>
          <Input
            id="password"
            name="password"
            type="password"
            minLength={8}
            required
            disabled={passwordPending}
            autoComplete="new-password"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            minLength={8}
            required
            disabled={passwordPending}
            autoComplete="new-password"
          />
        </div>

        {passwordState.message ? (
          <p className={passwordState.ok ? "text-sm text-green-600" : "text-sm text-destructive"}>
            {passwordState.message}
          </p>
        ) : null}

        <Button type="submit" disabled={passwordPending}>
          {passwordPending ? "Đang đổi..." : "Đổi mật khẩu"}
        </Button>
      </form>
    </div>
  );
}
