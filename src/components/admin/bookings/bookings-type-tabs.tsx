"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  buildBookingsHref,
  parseBookingStatusFilter,
  type BookingFilterType,
} from "@/lib/bookings/types";
import { cn } from "@/lib/utils";

const tabs: Array<{ value: BookingFilterType; label: string }> = [
  { value: "all", label: "Tất cả" },
  { value: "table", label: "Đặt bàn" },
  { value: "event", label: "Đặt tiệc" },
];

type BookingsTypeTabsProps = {
  active: BookingFilterType;
};

export function BookingsTypeTabs({ active }: BookingsTypeTabsProps) {
  const searchParams = useSearchParams();
  const status = parseBookingStatusFilter(searchParams.get("status") ?? undefined);
  const branch = searchParams.get("branch") ?? "";
  const query = searchParams.get("q") ?? "";

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <Link
          key={tab.value}
          href={buildBookingsHref({
            type: tab.value,
            status,
            branch,
            query,
          })}
          prefetch={false}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
            active === tab.value
              ? "bg-brand-red text-on-red"
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
