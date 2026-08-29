import { Suspense } from "react";

import { EventBookingsTable } from "@/components/admin/event-bookings/event-bookings-table";
import { AdminUsersTableSkeleton } from "@/components/admin/admin-skeletons";
import { requireRole } from "@/lib/auth/session";
import { getEventBookings } from "@/lib/event-bookings/queries";

async function EventBookingsTableSection() {
  const bookings = await getEventBookings();
  return <EventBookingsTable bookings={bookings} />;
}

export default async function AdminEventBookingsPage() {
  await requireRole(["admin", "editor"]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Yêu cầu đặt tiệc</h1>
        <p className="text-muted-foreground">
          Danh sách khách gửi từ form đặt tiệc trên trang chủ. Dữ liệu lưu trên Supabase và gửi email
          thông báo.
        </p>
      </div>

      <Suspense fallback={<AdminUsersTableSkeleton />}>
        <EventBookingsTableSection />
      </Suspense>
    </div>
  );
}
