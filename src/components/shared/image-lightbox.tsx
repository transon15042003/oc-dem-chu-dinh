"use client";

import { X, ZoomIn } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

type ImageLightboxProps = {
  image: string | null;
  alt: string;
  onClose: () => void;
};

export function ImageLightbox({ image, alt, onClose }: ImageLightboxProps) {
  return (
    <Dialog open={Boolean(image)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="flex w-[calc(100vw-1rem)] max-w-[min(calc(100vw-1rem),1400px)] flex-col gap-2 border-brand-gold/30 bg-ink p-2 sm:w-[calc(100vw-2rem)] sm:max-w-[min(calc(100vw-2rem),1400px)] sm:p-3"
      >
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 inline-flex size-9 items-center justify-center rounded-full border border-border bg-ink/90 text-on-dark transition-colors hover:bg-brand-red hover:text-on-red"
          aria-label="Đóng"
        >
          <X className="size-4" />
        </button>
        {image ? (
          <div className="flex max-h-[calc(96vh-3.5rem)] w-full items-center justify-center overflow-auto">
            {/* Native img so full-resolution CDN images are not capped by dialog defaults */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={alt}
              className="mx-auto max-h-[calc(96vh-3.5rem)] w-auto max-w-full object-contain"
            />
          </div>
        ) : null}
        <p className="flex items-center justify-center gap-2 py-1 text-center text-xs text-brand-cream-muted">
          <ZoomIn className="size-3.5 text-brand-gold" />
          Cuộn hoặc chụm để xem chi tiết
        </p>
      </DialogContent>
    </Dialog>
  );
}
