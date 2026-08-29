"use client";

import { motion, useReducedMotion } from "framer-motion";

import { motionDuration, motionEase, motionViewport } from "@/lib/motion";

type ScrollRevealDirection = "up" | "down" | "left" | "right" | "none";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: ScrollRevealDirection;
  duration?: number;
  as?: "div" | "section" | "article";
  id?: string;
};

const directionOffset: Record<
  ScrollRevealDirection,
  { x: number; y: number }
> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = motionDuration,
  as = "div",
  id,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];
  const offset = directionOffset[direction];

  if (reduceMotion) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <Component
      id={id}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={motionViewport}
      transition={{ duration, delay, ease: motionEase }}
      className={className}
    >
      {children}
    </Component>
  );
}
