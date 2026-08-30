"use client";

import { CheckCircle2, RotateCcw, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import {
  updateEventBookingStatus,
  updateTableBookingStatus,
} from "@/app/admin/(protected)/bookings/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { branches, guestCountOptions } from "@/data/branches";
import { getEventTypeLabel } from "@/data/event-booking";
import {
  buildBookingsHref,
  filterBookings,
  mergeBookings,
  type BookingsListFilters,
  type CombinedBookingListItem,
} from "@/lib/bookings/types";
import type { EventBooking, TableBooking } from "@/types/database";

type BookingsHubProps = {
  tableBookings: TableBooking[];
  eventBookings: EventBooking[];
  filters: BookingsListFilters;
};

const statusOptions: Array<{ value: BookingsListFilters["status"]; label: string }> = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "pending", label: "Chưa xử lý" },
  { value: "processed", label: "Đã xử lý" },
];

export function BookingsHub({ tableBookings, eventBookings, filters }: BookingsHubProps) {
  const router = useRouter();
  const [searchDraft, setSearchDraft] = useState(filters.query);
  const [actionError, setActionError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const allItems = useMemo(
    () => mergeBookings(tableBookings, eventBookings),
    [tableBookings, eventBookings],
  );

  const items = useMemo(() => filterBookings(allItems, filters), [allItems, filters]);

  const updateFilters = (next: Partial<BookingsListFilters>) => {
    router.push(buildBookingsHref({ ...filters, ...next }));
  };

  const handleSearch = () => {
    updateFilters({ query: searchDraft.trim() });
  };

  const handleStatusToggle = (item: CombinedBookingListItem) => {
    const nextStatus = item.booking.status === "processed" ? "pending" : "processed";
    const action =
      item.kind === "table" ? updateTableBookingStatus : updateEventBookingStatus;

    startTransition(async () => {
      setActionError(null);
      const result = await action(item.booking.id, nextStatus);

      if (!result.ok) {
        setActionError(result.message);
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 rounded-xl border border-border bg-muted/20 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="booking-search">Tìm khách hàng</Label>
          <div className="flex gap-2">
            <Input
              id="booking-search"
              value={searchDraft}
              onChange={(event) => setSearchDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSearch();
                }
              }}
              placeholder="Họ tên hoặc số điện thoại..."
              className="h-10"
            />
            <Button type="button" variant="outline" className="h-10 shrink-0" onClick={handleSearch}>
              <Search className="size-4" />
              Tìm
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="booking-status">Trạng thái</Label>
          <select
            id="booking-status"
            value={filters.status}
            onChange={(event) =>
              updateFilters({ status: event.target.value as BookingsListFilters["status"] })
            }
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="booking-branch">Chi nhánh</Label>
          <select
            id="booking-branch"
            value={filters.branch}
            onChange={(event) => updateFilters({ branch: event.target.value })}
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
          >
            <option value="">Tất cả chi nhánh</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.badge}: {branch.shortName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {(filters.query || filters.status !== "all" || filters.branch) && (
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>Đang lọc:</span>
          {filters.status !== "all" ? (
            <Badge variant="outline">
              {filters.status === "pending" ? "Chưa xử lý" : "Đã xử lý"}
            </Badge>
          ) : null}
          {filters.branch ? (
            <Badge variant="outline">{resolveBranchLabel(filters.branch)}</Badge>
          ) : null}
          {filters.query ? <Badge variant="outline">"{filters.query}"</Badge> : null}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchDraft("");
              router.push(buildBookingsHref({ type: filters.type }));
            }}
          >
            <RotateCcw className="size-3.5" />
            Xóa bộ lọc
          </Button>
        </div>
      )}

      {actionError ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
          {actionError}
        </p>
      ) : null}

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
          {allItems.length === 0
            ? "Chưa có yêu cầu đặt bàn hoặc đặt tiệc nào."
            : "Không có kết quả phù hợp với bộ lọc hiện tại."}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Loại</th>
                <th className="px-4 py-3 font-semibold">Khách hàng</th>
                <th className="px-4 py-3 font-semibold">Chi tiết</th>
                <th className="px-4 py-3 font-semibold">Thời gian</th>
                <th className="px-4 py-3 font-semibold">Chi nhánh</th>
                <th className="px-4 py-3 font-semibold">Nhận lúc</th>
                <th className="px-4 py-3 font-semibold">Trạng thái</th>
                <th className="px-4 py-3 font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <BookingRow
                  key={`${item.kind}-${item.booking.id}`}
                  item={item}
                  isPending={isPending}
                  onToggleStatus={() => handleStatusToggle(item)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

type BookingRowProps = {
  item: CombinedBookingListItem;
  isPending: boolean;
  onToggleStatus: () => void;
};

function BookingRow({ item, isPending, onToggleStatus }: BookingRowProps) {
  const isProcessed = item.booking.status === "processed";

  return (
    <tr
      className={`border-t border-border align-top ${isProcessed ? "bg-muted/20" : ""}`}
    >
      <td className="px-4 py-3">
        <Badge variant={item.kind === "event" ? "hot" : "outline"}>
          {item.kind === "event" ? "Đặt tiệc" : "Đặt bàn"}
        </Badge>
      </td>
      <td className="px-4 py-3">
        <p className="font-medium">{item.booking.full_name}</p>
        <p className="text-xs text-muted-foreground">{item.booking.phone}</p>
        {item.kind === "event" && item.booking.company_name ? (
          <p className="mt-1 text-xs text-muted-foreground">{item.booking.company_name}</p>
        ) : null}
      </td>
      <td className="px-4 py-3 text-muted-foreground">
        {item.kind === "event" ? (
          <>
            {getEventTypeLabel(item.booking.event_type)}
            <p className="text-xs">{resolveGuestCountLabel(item.booking.guest_count)}</p>
          </>
        ) : (
          resolveGuestCountLabel(item.booking.guest_count)
        )}
        {item.booking.note?.trim() ? (
          <p className="mt-1 max-w-xs text-xs">{item.booking.note}</p>
        ) : null}
      </td>
      <td className="px-4 py-3 text-muted-foreground">
        {formatBookingDate(
          item.kind === "table" ? item.booking.booking_date : item.booking.event_date,
        )}
        <br />
        {item.kind === "table" ? item.booking.booking_time : item.booking.event_time}
      </td>
      <td className="px-4 py-3 text-muted-foreground">
        {resolveBranchLabel(item.booking.branch_id)}
      </td>
      <td className="px-4 py-3 text-muted-foreground">
        {formatDateTime(item.booking.created_at)}
      </td>
      <td className="px-4 py-3">
        <Badge variant={isProcessed ? "default" : "outline"}>
          {isProcessed ? "Đã xử lý" : "Chưa xử lý"}
        </Badge>
      </td>
      <td className="px-4 py-3">
        <Button
          type="button"
          variant={isProcessed ? "outline" : "brand"}
          size="sm"
          disabled={isPending}
          onClick={onToggleStatus}
        >
          <CheckCircle2 className="size-3.5" />
          {isProcessed ? "Mở lại" : "Đã xử lý"}
        </Button>
      </td>
    </tr>
  );
}

function resolveBranchLabel(branchId: string): string {
  const branch = branches.find((item) => item.id === branchId);
  return branch ? `${branch.badge} — ${branch.name}` : branchId;
}

function resolveGuestCountLabel(guestCount: string): string {
  const option = guestCountOptions.find((item) => item.value === guestCount);
  return option?.label ?? guestCount;
}

function formatBookingDate(value: string): string {
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(new Date(value));
}

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
