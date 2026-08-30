"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  ScrollText,
  Search,
  Utensils,
  Wifi,
  X,
  ZoomIn,
} from "lucide-react";

import { BookingFormSection } from "@/components/home/booking-form-section";
import { ImageLightbox } from "@/components/shared/image-lightbox";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { MenuCarouselNav } from "@/components/menu/menu-carousel-nav";
import { MenuDishCard } from "@/components/menu/menu-dish-card";
import { MenuScrollButton } from "@/components/menu/menu-scroll-button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { branches } from "@/data/branches";
import { menuPoster, menuWifiPassword } from "@/data/menu";
import {
  filterMenuItems,
  getMenuItemsByCategory,
  type MenuCategory,
  type MenuItem,
  type MenuTabId,
} from "@/lib/menu/types";
import { formatHotline, hotlineHref, publicEnv } from "@/lib/env";
import { cn } from "@/lib/utils";

function MenuCategorySection({
  category,
  items,
  searchQuery,
  onSelectItem,
}: {
  category: MenuCategory;
  items: MenuItem[];
  searchQuery: string;
  onSelectItem: (item: MenuItem) => void;
}) {
  const filteredItems = filterMenuItems(items, searchQuery);
  if (filteredItems.length === 0) return null;

  return (
    <ScrollReveal as="section" className="space-y-5">
      <div
        id={`menu-${category.id}`}
        className="scroll-mt-site-chrome flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="h-7 w-1.5 shrink-0 rounded-full bg-brand-red shadow" />
          <h2 className="text-lg font-black uppercase text-foreground sm:text-2xl">
            {category.id === "featured" ? "⭐ MÓN KHUYÊN DÙNG HOT" : category.name}
          </h2>
        </div>
        <p className="hidden text-sm text-brand-cream-muted md:block">{category.description}</p>
      </div>

      <Carousel
        opts={{ align: "start", loop: false }}
        className="relative w-full px-2 sm:px-12"
      >
        <CarouselContent className="-ml-3">
          {filteredItems.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-[82%] pl-3 min-[400px]:basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <MenuDishCard item={item} onSelect={onSelectItem} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <MenuCarouselNav direction="left" />
        <MenuCarouselNav direction="right" />
      </Carousel>
    </ScrollReveal>
  );
}

export function MenuPageContent({
  categories,
  items,
  filterTabs,
}: {
  categories: MenuCategory[];
  items: MenuItem[];
  filterTabs: Array<{ id: MenuTabId; label: string }>;
}) {
  const [activeTab, setActiveTab] = useState<MenuTabId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedPoster, setSelectedPoster] = useState(false);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef<string | null>(null);
  const hotline = publicEnv.hotline;

  const visibleCategories = useMemo(() => {
    if (searchQuery.trim()) return categories;
    if (activeTab === "all") return categories;
    return categories.filter((category) => category.id === activeTab);
  }, [activeTab, categories, searchQuery]);

  const hasVisibleItems = useMemo(
    () =>
      visibleCategories.some(
        (category) =>
          filterMenuItems(getMenuItemsByCategory(items, category.id), searchQuery).length > 0,
      ),
    [items, searchQuery, visibleCategories],
  );

  const showPoster = activeTab === "all" && !searchQuery;

  const handleTabSelect = (tabId: MenuTabId) => {
    scrollTargetRef.current = tabId === "all" ? "menu-dishes" : `menu-${tabId}`;
    setActiveTab(tabId);
  };

  useEffect(() => {
    const targetId = scrollTargetRef.current;
    if (!targetId) return;

    const scrollToTarget = () => {
      const element = document.getElementById(targetId);
      if (!element) return false;
      scrollTargetRef.current = null;
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    };

    if (scrollToTarget()) return;

    const timeout = window.setTimeout(scrollToTarget, 150);
    return () => window.clearTimeout(timeout);
  }, [activeTab, visibleCategories]);

  return (
    <>
      <section className="border-b border-brand-red/30 bg-gradient-to-r from-menu-hero-from via-menu-hero-via to-menu-hero-to py-10 text-foreground sm:py-12">
        <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="space-y-6">
            <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
              <div className="space-y-2">
              <p className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-4 py-1 text-xs font-black uppercase tracking-wider text-brand-dark">
                <Utensils className="size-3.5" />
                Menu chính thức Ốc Đêm Chú Đỉnh
              </p>
              <h1 className="text-2xl font-black uppercase leading-tight text-brand-gold sm:text-4xl">
                Thực đơn món ngon{" "}
                <span className="block text-lg font-normal text-brand-red sm:inline sm:text-2xl">
                  | Phục vụ 16h - 04h Sáng
                </span>
              </h1>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold sm:text-sm">
              <div className="flex items-center gap-2 rounded-2xl border border-brand-gold/40 bg-foreground/20 px-4 py-2 text-brand-gold backdrop-blur">
                <Wifi className="size-4 text-brand-gold" />
                WIFI:{" "}
                <strong className="font-mono tracking-wider text-foreground">
                  {menuWifiPassword}
                </strong>
              </div>
              {hotline ? (
                <a
                  href={hotlineHref(hotline)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-brand-red px-4 py-2 font-black text-on-red shadow-lg transition hover:bg-brand-red-hover"
                >
                  <Phone className="size-4 text-brand-gold" />
                  {formatHotline(hotline)}
                </a>
              ) : null}
            </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 border-t border-brand-red/30 pt-4 text-xs font-bold text-brand-cream-muted md:justify-start">
            {branches.map((branch) => (
              <span
                key={branch.id}
                className="max-w-full rounded-xl border border-border bg-foreground/10 px-3 py-1.5 text-center sm:px-3.5"
              >
                <span className="sm:hidden">📍 {branch.badge}: {branch.shortName}</span>
                <span className="hidden sm:inline">📍 {branch.name}: {branch.address}</span>
              </span>
            ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="sticky top-site-header z-30 bg-brand-dark/95 py-3.5 backdrop-blur-md">
        <div className="mx-auto max-w-7xl space-y-3 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="relative w-full sm:w-96">
              <Search className="absolute top-2.5 left-3.5 size-4 text-brand-gold" />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="🔍 Tìm món nhanh (vd: ốc hương, lẩu thái, tôm sốt thái...)"
                className="h-10 w-full rounded-xl border border-border bg-brand-dark-soft pr-9 pl-10 text-xs text-foreground placeholder:text-muted-foreground focus:border-brand-gold focus:outline-none"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute top-2.5 right-3 text-muted-foreground hover:text-brand-gold"
                  aria-label="Xóa tìm kiếm"
                >
                  <X className="size-4" />
                </button>
              ) : null}
            </div>
            <p className="hidden items-center gap-2 text-xs font-bold text-brand-gold sm:flex">
              <span className="size-2 animate-pulse rounded-full bg-brand-red" />
              Hơn 200+ món ăn đặc sắc được phục vụ mỗi đêm
            </p>
          </div>

          <div className="relative flex items-center">
            <MenuScrollButton
              direction="left"
              onClick={() =>
                categoryScrollRef.current?.scrollBy({ left: -250, behavior: "smooth" })
              }
              aria-label="Cuộn trái danh mục"
              className="mr-2 hidden sm:inline-flex"
            />
            <div
              ref={categoryScrollRef}
              className="flex flex-1 items-center gap-2 overflow-x-auto py-1 pl-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabSelect(tab.id)}
                  className={cn(
                    "shrink-0 rounded-xl border px-4 py-2 text-xs font-bold uppercase tracking-wider transition",
                    activeTab === tab.id
                      ? "scale-105 border-brand-gold/40 bg-brand-red text-brand-gold shadow-lg ring-2 ring-brand-gold/30"
                      : "border-border bg-brand-dark-soft text-brand-cream-muted hover:bg-brand-red/20 hover:text-brand-gold",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <MenuScrollButton
              direction="right"
              onClick={() =>
                categoryScrollRef.current?.scrollBy({ left: 250, behavior: "smooth" })
              }
              aria-label="Cuộn phải danh mục"
              className="ml-2 hidden sm:inline-flex"
            />
          </div>
        </div>
      </section>

      <div
        id="menu-dishes"
        className="mx-auto max-w-7xl scroll-mt-site-chrome space-y-12 px-4 pb-10 sm:space-y-16 sm:px-6 sm:pb-16 lg:px-8"
      >
        {showPoster ? (
          <ScrollReveal as="section" className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-brand-gold pb-3">
              <div className="flex items-center gap-3">
                <span className="h-7 w-1.5 rounded-full bg-brand-gold shadow" />
                <h2 className="flex items-center gap-2 text-lg font-black uppercase text-foreground sm:text-2xl">
                  <ScrollText className="size-5 text-brand-gold" />
                  Bảng giá thực đơn tổng hợp Ốc Đêm Chú Đỉnh
                </h2>
              </div>
              <span className="hidden text-xs font-bold text-muted-foreground sm:inline-flex sm:items-center sm:gap-1">
                <ZoomIn className="size-3.5 text-brand-red" />
                Bấm vào ảnh để xem full HD phóng to
              </span>
            </div>

            <button
              type="button"
              onClick={() => setSelectedPoster(true)}
              className="group relative w-full overflow-hidden rounded-3xl border-2 border-brand-gold/40 bg-brand-dark shadow-xl transition-colors hover:border-brand-gold"
            >
              <div className="flex items-center justify-between border-b border-border bg-brand-dark-soft px-4 py-2.5 text-xs font-black uppercase text-brand-gold">
                <span>Bảng giá thực đơn tổng hợp Ốc Đêm Chú Đỉnh</span>
              </div>
              <Image
                src={menuPoster.image}
                alt={menuPoster.alt}
                width={1200}
                height={1600}
                className="h-auto w-full object-contain transition duration-500 group-hover:scale-[1.01]"
                priority
              />
              <div className="absolute right-3 bottom-3 inline-flex items-center gap-2 rounded-2xl border border-brand-gold/60 bg-ink/90 px-3 py-1.5 text-[10px] font-black uppercase text-brand-gold shadow-2xl transition group-hover:bg-brand-gold group-hover:text-brand-dark sm:right-4 sm:bottom-4 sm:px-4 sm:py-2 sm:text-xs">
                <ZoomIn className="size-3.5 text-brand-red group-hover:text-brand-dark" />
                Chạm để phóng to
              </div>
            </button>
          </ScrollReveal>
        ) : null}

        {visibleCategories.map((category) => (
          <MenuCategorySection
            key={category.id}
            category={category}
            items={getMenuItemsByCategory(items, category.id)}
            searchQuery={searchQuery}
            onSelectItem={setSelectedItem}
          />
        ))}

        {searchQuery && !hasVisibleItems ? (
          <ScrollReveal>
            <div className="rounded-2xl border border-border bg-brand-dark-soft p-10 text-center">
            <p className="text-lg font-bold text-foreground">Không tìm thấy món phù hợp</p>
            <p className="mt-2 text-sm text-brand-cream-muted">
              Thử từ khóa khác hoặc xem{" "}
              <Link href="/thuc-don" className="text-brand-gold hover:underline">
                toàn bộ thực đơn
              </Link>
            </p>
          </div>
          </ScrollReveal>
        ) : null}
      </div>

      <BookingFormSection />

      <ImageLightbox
        image={selectedItem?.fullImage ?? (selectedPoster ? menuPoster.fullImage : null)}
        alt={selectedItem?.name ?? menuPoster.alt}
        onClose={() => {
          setSelectedItem(null);
          setSelectedPoster(false);
        }}
      />
    </>
  );
}
