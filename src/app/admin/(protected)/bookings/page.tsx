import { Suspense } from "react";

import { AllBookingsTable } from "@/components/admin/bookings/all-bookings-table";
import { BookingsTypeTabs } from "@/components/admin/bookings/bookings-type-tabs";
import { TableBookingsTable } from "@/components/admin/bookings/table-bookings-table";
import { EventBookingsTable } from "@/components/admin/event-bookings/event-bookings-table";
import { AdminUsersTableSkeleton } from "@/components/admin/admin-skeletons";
import { mergeBookings, parseBookingFilterType } from "@/lib/bookings/types";
import { getEventBookings } from "@/lib/event-bookings/queries";
import { requireRole } from "@/lib/auth/session";
import { getTableBookings } from "@/lib/table-bookings/queries";

type AdminBookingsPageProps = {
  searchParams: Promise<{ type?: string }>;
};

async function BookingsContent({ type }: { type?: string }) {
  const filter = parseBookingFilterType(type);
  const [tableBookings, eventBookings] = await Promise.all([
    getTableBookings(),
    getEventBookings(),
  ]);

  if (filter === "table") {
    return <TableBookingsTable bookings={tableBookings} />;
  }

  if (filter === "event") {
    return <EventBookingsTable bookings={eventBookings} />;
  }

  return <AllBookingsTable items={mergeBookings(tableBookings, eventBookings)} />;
}

export default async function AdminBookingsPage({ searchParams }: AdminBookingsPageProps) {
  await requireRole(["admin", "editor"]);
  const { type } = await searchParams;
  const filter = parseBookingFilterType(type);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Đặt chỗ</h1>
          <p className="text-muted-foreground">
            Xem yêu cầu đặt bàn và đặt tiệc từ form trang chủ. Dữ liệu lưu trên Supabase và gửi email
            thông báo.
          </p>
        </div>

        <BookingsTypeTabs active={filter} />
      </div>

      <Suspense fallback={<AdminUsersTableSkeleton />}>
        <BookingsContent type={type} />
      </Suspense>
    </div>
  );
}
