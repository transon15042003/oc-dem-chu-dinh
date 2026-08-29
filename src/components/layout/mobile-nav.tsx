"use client";

import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { bookingSectionId, mainNav, siteConfig } from "@/config/site";
import { formatHotline, hotlineHref, publicEnv } from "@/lib/env";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  currentPath: string;
};

export function MobileNav({ currentPath }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const hotline = publicEnv.hotline;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className="border-border bg-foreground/5 text-foreground hover:bg-foreground/10 lg:hidden"
            aria-label="Mở menu"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="border-border bg-brand-dark text-foreground"
      >
        <SheetHeader>
          <SheetTitle className="text-left font-heading text-lg uppercase text-foreground">
            {siteConfig.name}
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile navigation">
          {mainNav.map((item) => {
            const isActive =
              item.href === "/"
                ? currentPath === "/"
                : currentPath.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-3 text-sm font-semibold uppercase tracking-wide transition-colors",
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

        <div className="mt-8 space-y-3 border-t border-border pt-6">
          <Button
            render={<Link href={`/#${bookingSectionId}`} onClick={() => setOpen(false)} />}
            className="h-11 w-full bg-brand-gold font-bold uppercase text-brand-dark hover:bg-brand-gold/90"
          >
            Đặt bàn ngay
          </Button>

          {hotline ? (
            <a
              href={hotlineHref(hotline)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-semibold text-brand-gold"
            >
              <Phone className="size-4" aria-hidden />
              Hotline: {formatHotline(hotline)}
            </a>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}
