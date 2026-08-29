"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Ensures each client-side navigation starts at the top of the page,
 * without smooth-scroll fighting the sticky site header.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
