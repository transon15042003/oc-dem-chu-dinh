import { ArticlesPageHeader } from "@/components/articles/articles-page-header";
import { PromotionsPageHeader } from "@/components/promotions/promotions-page-header";

function SkeletonPulse({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-muted ${className ?? ""}`} />;
}

export function ArticlesFilterBarSkeleton() {
  return (
    <section className="sticky top-site-header z-30 bg-stone-900/95 py-4">
      <div className="mx-auto max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap justify-center gap-2 md:justify-start">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonPulse key={index} className="h-9 w-28 rounded-xl bg-stone-700" />
            ))}
          </div>
          <SkeletonPulse className="h-10 w-full rounded-xl bg-stone-700 md:w-80" />
        </div>
      </div>
    </section>
  );
}

export function ArticleCardSkeleton({ featured = false }: { featured?: boolean }) {
  if (featured) {
    return (
      <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-stone-800 bg-stone-900 lg:grid-cols-12">
        <SkeletonPulse className="h-72 rounded-none bg-stone-800 sm:h-96 lg:col-span-7" />
        <div className="space-y-4 p-6 sm:p-10 lg:col-span-5">
          <SkeletonPulse className="h-4 w-24 bg-stone-700" />
          <SkeletonPulse className="h-8 w-full bg-stone-700" />
          <SkeletonPulse className="h-16 w-full bg-stone-700" />
          <SkeletonPulse className="h-10 w-36 rounded-xl bg-stone-700" />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-amber-100 bg-card shadow-md">
      <SkeletonPulse className="h-56 rounded-none" />
      <div className="space-y-3 p-6">
        <SkeletonPulse className="h-3 w-20" />
        <SkeletonPulse className="h-5 w-full" />
        <SkeletonPulse className="h-10 w-full" />
        <SkeletonPulse className="h-4 w-28" />
      </div>
    </div>
  );
}

export function ArticlesListingSkeleton() {
  return (
    <>
      <ArticlesFilterBarSkeleton />
      <section className="py-14">
        <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
          <ArticleCardSkeleton featured />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ArticleCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function ArticlesPageLoading() {
  return (
    <div className="min-h-screen bg-amber-50/30 text-foreground dark:bg-background">
      <ArticlesPageHeader />
      <ArticlesListingSkeleton />
    </div>
  );
}

export function ArticleDetailHeaderSkeleton() {
  return (
    <section className="relative overflow-hidden border-b border-amber-100 bg-background py-10">
      <div className="mx-auto max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
        <SkeletonPulse className="h-4 w-64" />
        <SkeletonPulse className="h-10 w-full max-w-3xl" />
        <SkeletonPulse className="h-4 w-80" />
      </div>
    </section>
  );
}

export function ArticleDetailMainSkeleton() {
  return (
    <div className="space-y-6 rounded-3xl border border-amber-100 bg-card p-6 shadow-md sm:p-10 lg:col-span-8">
      <SkeletonPulse className="h-80 rounded-2xl" />
      <SkeletonPulse className="h-20 w-full rounded-r-2xl" />
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonPulse key={index} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
}

export function ArticleDetailSidebarSkeleton() {
  return (
    <aside className="space-y-6 lg:col-span-4">
      <div className="space-y-3 rounded-3xl border border-amber-100 bg-card p-6 shadow-md">
        <SkeletonPulse className="h-4 w-32" />
        <SkeletonPulse className="h-10 w-full rounded-xl" />
        <SkeletonPulse className="h-10 w-full rounded-xl" />
      </div>
      <div className="space-y-4 rounded-3xl border border-amber-100 bg-card p-6 shadow-md">
        <SkeletonPulse className="h-4 w-36" />
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex gap-3">
            <SkeletonPulse className="size-16 shrink-0 rounded-xl" />
            <SkeletonPulse className="h-12 flex-1" />
          </div>
        ))}
      </div>
    </aside>
  );
}

export function ArticleDetailPageLoading() {
  return (
    <div className="min-h-screen bg-amber-50/30 text-foreground dark:bg-background">
      <ArticleDetailHeaderSkeleton />
      <section className="py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <ArticleDetailMainSkeleton />
          <ArticleDetailSidebarSkeleton />
        </div>
      </section>
    </div>
  );
}

export function PromotionDealCardSkeleton() {
  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-red-900/80 bg-gradient-to-r from-red-950 via-stone-900 to-amber-950 lg:grid-cols-12">
      <SkeletonPulse className="min-h-[280px] rounded-none bg-stone-800 lg:col-span-6 lg:min-h-[380px]" />
      <div className="space-y-4 p-6 sm:p-10 lg:col-span-6">
        <SkeletonPulse className="h-6 w-40 rounded-full bg-red-900/80" />
        <SkeletonPulse className="h-10 w-full bg-red-900/80" />
        <SkeletonPulse className="h-20 w-full bg-red-900/80" />
        <SkeletonPulse className="h-12 w-full rounded-2xl bg-amber-900/80" />
      </div>
    </div>
  );
}

export function PromotionsListSkeleton() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <PromotionDealCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}

export function PromotionsPageLoading() {
  return (
    <div className="min-h-screen bg-amber-50/30 text-foreground dark:bg-background">
      <PromotionsPageHeader />
      <PromotionsListSkeleton />
    </div>
  );
}

export function PromotionDetailPageLoading() {
  return (
    <div className="min-h-screen bg-amber-50/30 text-foreground dark:bg-background">
      <section className="border-b border-amber-100 bg-background py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SkeletonPulse className="h-4 w-72" />
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <PromotionDealCardSkeleton />
        </div>
      </section>
    </div>
  );
}
