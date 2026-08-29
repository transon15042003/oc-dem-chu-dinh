"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type MenuScrollButtonProps = {
  direction: "left" | "right";
  onClick: () => void;
  "aria-label": string;
  className?: string;
  disabled?: boolean;
  hideWhenDisabled?: boolean;
};

export function MenuScrollButton({
  direction,
  onClick,
  "aria-label": ariaLabel,
  className,
  disabled = false,
  hideWhenDisabled = false,
}: MenuScrollButtonProps) {
  if (hideWhenDisabled && disabled) {
    return null;
  }

  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-brand-dark-soft text-brand-gold transition hover:bg-brand-red hover:text-on-red disabled:pointer-events-none disabled:opacity-40",
        className,
      )}
    >
      <Icon className="size-4" />
    </button>
  );
}
