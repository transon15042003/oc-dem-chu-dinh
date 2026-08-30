"use client";

import Link from "next/link";
import { RotateCcw, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { MenuCategoriesTable } from "@/components/admin/menu/menu-categories-table";
import { MenuItemsTable } from "@/components/admin/menu/menu-items-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  buildMenuAdminHref,
  filterMenuCategories,
  filterMenuItems,
  hasActiveMenuFilters,
  type MenuAdminFilters,
  type MenuAdminView,
} from "@/lib/menu/admin-filters";
import { cn } from "@/lib/utils";
import type { MenuCategoryRecord, MenuItemWithCategory } from "@/types/database";

const viewTabs: Array<{ value: MenuAdminView; label: string }> = [
  { value: "all", label: "Tất cả" },
  { value: "categories", label: "Danh mục" },
  { value: "items", label: "Món ăn" },
];

const statusOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "published", label: "Xuất bản" },
  { value: "draft", label: "Nháp" },
] as const;

const hotOptions = [
  { value: "all", label: "Tất cả món" },
  { value: "hot", label: "Chỉ món hot" },
  { value: "normal", label: "Không hot" },
] as const;

type MenuAdminHubProps = {
  categories: MenuCategoryRecord[];
  items: MenuItemWithCategory[];
  filters: MenuAdminFilters;
  draftCategoryCount: number;
  draftItemCount: number;
};

export function MenuAdminHub({
  categories,
  items,
  filters,
  draftCategoryCount,
  draftItemCount,
}: MenuAdminHubProps) {
  const router = useRouter();
  const [searchDraft, setSearchDraft] = useState(filters.query);

  const filteredCategories = useMemo(
    () => filterMenuCategories(categories, filters),
    [categories, filters],
  );

  const filteredItems = useMemo(() => filterMenuItems(items, filters), [items, filters]);

  const itemCountByCategory = useMemo(
    () =>
      items.reduce<Record<string, number>>((counts, item) => {
        counts[item.category_id] = (counts[item.category_id] ?? 0) + 1;
        return counts;
      }, {}),
    [items],
  );

  const filteredItemCountByCategory = useMemo(
    () =>
      filteredItems.reduce<Record<string, number>>((counts, item) => {
        counts[item.category_id] = (counts[item.category_id] ?? 0) + 1;
        return counts;
      }, {}),
    [filteredItems],
  );

  const updateFilters = (next: Partial<MenuAdminFilters>) => {
    router.push(buildMenuAdminHref({ ...filters, ...next }));
  };

  const handleSearch = () => {
    updateFilters({ query: searchDraft.trim() });
  };

  const showCategories = filters.view === "all" || filters.view === "categories";
  const showItems = filters.view === "all" || filters.view === "items";
  const activeFilters = hasActiveMenuFilters(filters);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {viewTabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => updateFilters({ view: tab.value })}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
              filters.view === tab.value
                ? "bg-brand-red text-on-red"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 rounded-xl border border-border bg-muted/20 p-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="space-y-2 sm:col-span-2 lg:col-span-2">
          <Label htmlFor="menu-search">Tìm kiếm</Label>
          <div className="flex gap-2">
            <Input
              id="menu-search"
              value={searchDraft}
              onChange={(event) => setSearchDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSearch();
                }
              }}
              placeholder="Tên món, slug, từ khóa..."
              className="h-10"
            />
            <Button type="button" variant="outline" className="h-10 shrink-0" onClick={handleSearch}>
              <Search className="size-4" />
              Tìm
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="menu-category">Danh mục</Label>
          <select
            id="menu-category"
            value={filters.categoryId}
            onChange={(event) => updateFilters({ categoryId: event.target.value })}
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
          >
            <option value="">Tất cả danh mục</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="menu-status">Trạng thái</Label>
          <select
            id="menu-status"
            value={filters.status}
            onChange={(event) =>
              updateFilters({ status: event.target.value as MenuAdminFilters["status"] })
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
          <Label htmlFor="menu-hot">Món hot</Label>
          <select
            id="menu-hot"
            value={filters.hot}
            onChange={(event) =>
              updateFilters({ hot: event.target.value as MenuAdminFilters["hot"] })
            }
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
          >
            {hotOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {activeFilters ? (
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>Đang lọc:</span>
          {filters.view !== "all" ? (
            <Badge variant="outline">
              {viewTabs.find((tab) => tab.value === filters.view)?.label}
            </Badge>
          ) : null}
          {filters.status !== "all" ? (
            <Badge variant="outline">
              {filters.status === "published" ? "Xuất bản" : "Nháp"}
            </Badge>
          ) : null}
          {filters.categoryId ? (
            <Badge variant="outline">
              {categories.find((category) => category.id === filters.categoryId)?.name ??
                "Danh mục"}
            </Badge>
          ) : null}
          {filters.hot !== "all" ? (
            <Badge variant="outline">{filters.hot === "hot" ? "Món hot" : "Không hot"}</Badge>
          ) : null}
          {filters.query ? <Badge variant="outline">{`"${filters.query}"`}</Badge> : null}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchDraft("");
              router.push("/admin/menu");
            }}
          >
            <RotateCcw className="size-3.5" />
            Xóa bộ lọc
          </Button>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
        <span>
          Hiển thị <strong className="text-foreground">{filteredCategories.length}</strong>/
          {categories.length} danh mục
        </span>
        <span>·</span>
        <span>
          <strong className="text-foreground">{filteredItems.length}</strong>/{items.length} món
        </span>
        {draftCategoryCount > 0 || draftItemCount > 0 ? (
          <>
            <span>·</span>
            <span>
              {draftCategoryCount > 0 ? `${draftCategoryCount} danh mục nháp` : null}
              {draftCategoryCount > 0 && draftItemCount > 0 ? ", " : null}
              {draftItemCount > 0 ? `${draftItemCount} món nháp` : null}
            </span>
          </>
        ) : null}
      </div>

      {showCategories ? (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Danh mục</h2>
            <Button
              variant="outline"
              size="sm"
              render={<Link href="/admin/menu/categories/new" prefetch={false} />}
            >
              Tạo danh mục
            </Button>
          </div>
          <MenuCategoriesTable
            categories={filteredCategories}
            itemCountByCategory={
              filters.view === "categories" || activeFilters
                ? filteredItemCountByCategory
                : itemCountByCategory
            }
            emptyMessage={
              categories.length === 0
                ? "Chưa có danh mục nào."
                : "Không có danh mục phù hợp với bộ lọc."
            }
          />
        </section>
      ) : null}

      {showItems ? (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Món ăn</h2>
            <Button size="sm" render={<Link href="/admin/menu/items/new" prefetch={false} />}>
              Tạo món mới
            </Button>
          </div>
          <MenuItemsTable
            items={filteredItems}
            emptyMessage={
              items.length === 0
                ? "Chưa có món ăn nào."
                : "Không có món phù hợp với bộ lọc."
            }
          />
        </section>
      ) : null}
    </div>
  );
}
