import { Suspense } from "react";

import { AdminLoginForm } from "@/components/admin/admin-login-form";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="text-sm text-muted-foreground">Đang tải...</div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
