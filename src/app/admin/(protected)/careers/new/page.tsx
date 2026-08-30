import Link from "next/link";

import { CareerPositionForm } from "@/components/admin/careers/career-position-form";
import { requireRole } from "@/lib/auth/session";

export default async function NewCareerPositionPage() {
  await requireRole(["admin", "editor"]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">
          <Link href="/admin/careers" className="hover:text-brand-red">
            ← Vị trí tuyển dụng
          </Link>
        </p>
        <h1 className="text-2xl font-bold">Tạo vị trí tuyển dụng</h1>
      </div>

      <CareerPositionForm mode="create" />
    </div>
  );
}
