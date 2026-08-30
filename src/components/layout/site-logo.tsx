import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { siteLogo } from "@/lib/images";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  imageClassName?: string;
  showWordmark?: boolean;
  priority?: boolean;
  variant?: "default" | "footer";
};

export function SiteLogo({
  className,
  imageClassName,
  showWordmark = false,
  priority = false,
  variant = "default",
}: SiteLogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — Trang chủ`}
      className={cn("group inline-flex shrink-0 items-center gap-2.5", className)}
    >
      <Image
        src={siteLogo.src}
        alt={siteLogo.alt}
        width={siteLogo.width}
        height={siteLogo.height}
        priority={priority}
        className={cn(
          "h-10 w-auto object-contain transition duration-300 group-hover:scale-105 sm:h-12",
          imageClassName,
        )}
      />
      {showWordmark ? (
        <div className="hidden min-w-0 sm:block">
          <p
            className={cn(
              "truncate font-heading text-sm font-black uppercase tracking-wide",
              variant === "footer" ? "text-footer-foreground" : "text-foreground",
            )}
          >
            {siteConfig.name}
          </p>
          <p className="truncate text-[10px] text-brand-gold">{siteConfig.tagline}</p>
        </div>
      ) : null}
    </Link>
  );
}
