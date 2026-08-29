import Link from "next/link";

import { CareerPositionsTable } from "@/components/admin/careers/career-positions-table";
import { Button } from "@/components/ui/button";
import { getAdminCareerPositions } from "@/lib/careers/queries";
import { requireRole } from "@/lib/auth/session";

export default async function AdminCareersPage() {
  await requireRole(["admin", "editor"]);
  const positions = await getAdminCareerPositions();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Vị trí tuyển dụng</h1>
          <p className="text-muted-foreground">Quản lý tin tuyển dụng hiển thị tại /tuyen-dung</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" render={<Link href="/admin/career-applications" prefetch={false} />}>
            Hồ sơ ứng tuyển
          </Button>
          <Button render={<Link href="/admin/careers/new" prefetch={false} />}>
            Tạo vị trí mới
          </Button>
        </div>
      </div>

      <CareerPositionsTable positions={positions} />
    </div>
  );
}
