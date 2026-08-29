export const motionViewport = {
  once: true,
  margin: "-60px" as const,
};

export const motionDuration = 0.45;

export const motionEase = [0.22, 1, 0.36, 1] as const;

export const hoverSurfaceClass =
  "transition-colors duration-200 hover:border-brand-gold/40";

export const hoverImageClass =
  "transition-transform duration-300 group-hover:scale-105";
