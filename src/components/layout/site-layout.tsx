"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";
import { TopBar } from "@/components/layout/top-bar";

type SiteLayoutProps = {
  children: React.ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  const pathname = usePathname();

  return (
    <>
      <TopBar />
      <Header currentPath={pathname} />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActions />
    </>
  );
}
