import { ProfileForms } from "@/components/admin/profile-forms";
import { requireAdminSession } from "@/lib/auth/session";

export default async function AdminProfilePage() {
  const session = await requireAdminSession();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Quản lý hồ sơ</h1>
        <p className="text-muted-foreground">
          Cập nhật tên hiển thị và mật khẩu tài khoản của bạn.
        </p>
      </div>

      <ProfileForms profile={session.profile} email={session.email} />
    </div>
  );
}
