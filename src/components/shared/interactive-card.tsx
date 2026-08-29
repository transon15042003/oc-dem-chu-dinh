"use client";

import { motion } from "framer-motion";

import { motionDuration, motionEase, motionViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

type InteractiveCardProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function InteractiveCard({
  children,
  className,
  delay = 0,
}: InteractiveCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={motionViewport}
      transition={{ duration: motionDuration, delay, ease: motionEase }}
      className={cn(
        "rounded-2xl border border-border bg-brand-dark-soft",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
