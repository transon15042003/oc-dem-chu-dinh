import Link from "next/link";

import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { bookingSectionId, mainNav } from "@/config/site";
import { cn } from "@/lib/utils";

type HeaderProps = {
  currentPath?: string;
};

export function Header({ currentPath = "/" }: HeaderProps) {
  return (
    <header className="border-b border-border bg-brand-dark/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-nowrap items-center gap-3 px-4 py-3 xl:gap-4 xl:py-4">
        <Link
          href="/"
          aria-label="Ốc Đêm Chú Đỉnh — Trang chủ"
          className="group flex shrink-0 items-center"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-brand-gold/40 bg-brand-red/20 text-sm font-bold text-brand-gold transition-colors group-hover:border-brand-gold sm:size-11">
            Đỉnh
          </div>
        </Link>

        <nav
          className="hidden min-w-0 flex-1 flex-nowrap items-center justify-center gap-0.5 xl:flex"
          aria-label="Main navigation"
        >
          {mainNav.map((item) => {
            const isActive =
              item.href === "/"
                ? currentPath === "/"
                : currentPath.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-md px-2 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors xl:px-2.5 xl:py-2 xl:text-sm",
                  isActive
                    ? "bg-brand-red text-on-red"
                    : "text-brand-cream-muted hover:bg-foreground/5 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />
          <Button
            render={<Link href={`/#${bookingSectionId}`} />}
            className="hidden h-9 bg-brand-gold px-3 text-xs font-bold uppercase text-brand-dark hover:bg-brand-gold/90 sm:inline-flex xl:h-10 xl:px-4 xl:text-sm"
          >
            Đặt bàn ngay
          </Button>
          <ThemeToggle className="sm:hidden" />
          <MobileNav currentPath={currentPath} />
        </div>
      </div>
    </header>
  );
}
