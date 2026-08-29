import Link from "next/link";

import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { bookingSectionId, mainNav, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type HeaderProps = {
  currentPath?: string;
};

export function Header({ currentPath = "/" }: HeaderProps) {
  return (
    <header className="border-b border-border bg-brand-dark/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-full border border-brand-gold/40 bg-brand-red/20 text-sm font-bold text-brand-gold transition-colors group-hover:border-brand-gold">
            Đỉnh
          </div>
          <div className="hidden sm:block">
            <p className="font-heading text-base font-bold uppercase tracking-wide text-foreground">
              {siteConfig.name}
            </p>
            <p className="text-xs text-brand-cream-muted">{siteConfig.tagline}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
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
                  "rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors",
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

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />
          <Button
            render={<Link href={`/#${bookingSectionId}`} />}
            className="hidden h-10 bg-brand-gold px-4 text-sm font-bold uppercase text-brand-dark hover:bg-brand-gold/90 sm:inline-flex"
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
