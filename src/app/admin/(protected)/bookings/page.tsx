import { Suspense } from "react";

import { BookingsHub } from "@/components/admin/bookings/bookings-hub";
import { BookingsTypeTabs } from "@/components/admin/bookings/bookings-type-tabs";
import {
  countPendingBookings,
  mergeBookings,
  parseBookingsListFilters,
} from "@/lib/bookings/types";
import { getEventBookings } from "@/lib/event-bookings/queries";
import { requireRole } from "@/lib/auth/session";
import { getTableBookings } from "@/lib/table-bookings/queries";

type AdminBookingsPageProps = {
  searchParams: Promise<{
    type?: string;
    status?: string;
    branch?: string;
    q?: string;
  }>;
};

export default async function AdminBookingsPage({ searchParams }: AdminBookingsPageProps) {
  await requireRole(["admin", "editor"]);
  const params = await searchParams;
  const filters = parseBookingsListFilters(params);

  const [tableBookings, eventBookings] = await Promise.all([
    getTableBookings(),
    getEventBookings(),
  ]);
  const pendingCount = countPendingBookings(mergeBookings(tableBookings, eventBookings));

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Đặt chỗ</h1>
          <p className="text-muted-foreground">
            Xem yêu cầu đặt bàn và đặt tiệc từ form trang chủ. Dữ liệu lưu trên Supabase và gửi email
            thông báo.
            {pendingCount > 0 ? (
              <span className="ml-1 font-medium text-foreground">
                ({pendingCount} chưa xử lý)
              </span>
            ) : null}
          </p>
        </div>

        <Suspense fallback={null}>
          <BookingsTypeTabs active={filters.type} />
        </Suspense>
      </div>

      <BookingsHub
        tableBookings={tableBookings}
        eventBookings={eventBookings}
        filters={filters}
      />
    </div>
  );
}
