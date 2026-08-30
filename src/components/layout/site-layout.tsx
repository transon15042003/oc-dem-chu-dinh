"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { TopBar } from "@/components/layout/top-bar";

type SiteLayoutProps = {
  children: React.ReactNode;
};

function syncSiteHeaderHeight(element: HTMLElement) {
  document.documentElement.style.setProperty(
    "--site-header-height",
    `${element.offsetHeight}px`,
  );
}

export function SiteLayout({ children }: SiteLayoutProps) {
  const pathname = usePathname();
  const stickyHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = stickyHeaderRef.current;
    if (!element) return;

    syncSiteHeaderHeight(element);

    const observer = new ResizeObserver(() => {
      syncSiteHeaderHeight(element);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <>
      <ScrollToTop />
      <div ref={stickyHeaderRef} id="site-sticky-header" className="sticky top-0 z-40">
        <TopBar />
        <Header currentPath={pathname} />
      </div>
      <main className="flex-1 pb-32 sm:pb-0">{children}</main>
      <Footer />
      <FloatingActions />
    </>
  );
}
