"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { TopBar } from "@/components/layout/top-bar";

type SiteLayoutProps = {
  children: React.ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  const pathname = usePathname();

  return (
    <>
      <ScrollToTop />
      <div className="sticky top-0 z-40">
        <TopBar />
        <Header currentPath={pathname} />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActions />
    </>
  );
}
