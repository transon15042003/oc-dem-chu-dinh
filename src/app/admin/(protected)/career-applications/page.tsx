import { Suspense } from "react";
import Link from "next/link";

import { CareerApplicationsTable } from "@/components/admin/careers/career-applications-table";
import { AdminUsersTableSkeleton } from "@/components/admin/admin-skeletons";
import { Button } from "@/components/ui/button";
import { getCareerApplications } from "@/lib/careers/queries";
import { requireRole } from "@/lib/auth/session";

async function CareerApplicationsTableSection() {
  const applications = await getCareerApplications();
  return <CareerApplicationsTable applications={applications} />;
}

export default async function AdminCareerApplicationsPage() {
  await requireRole(["admin", "editor"]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Hồ sơ ứng tuyển</h1>
          <p className="text-muted-foreground">
            Danh sách ứng viên gửi từ form /tuyen-dung. Dữ liệu lưu trên Supabase và gửi email thông báo.
          </p>
        </div>
        <Button variant="outline" render={<Link href="/admin/careers" prefetch={false} />}>
          Vị trí tuyển dụng
        </Button>
      </div>

      <Suspense fallback={<AdminUsersTableSkeleton />}>
        <CareerApplicationsTableSection />
      </Suspense>
    </div>
  );
}
