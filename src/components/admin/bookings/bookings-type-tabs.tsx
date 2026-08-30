"use client";

import Link from "next/link";

import type { BookingFilterType } from "@/lib/bookings/types";
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
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <Link
          key={tab.value}
          href={tab.value === "all" ? "/admin/bookings" : `/admin/bookings?type=${tab.value}`}
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
