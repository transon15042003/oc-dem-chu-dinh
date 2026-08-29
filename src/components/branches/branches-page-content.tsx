"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Camera,
  ChevronRight,
  Clock,
  MapPin,
  Navigation,
  Phone,
  Play,
  Users,
  X,
} from "lucide-react";

import { BranchMapPanel } from "@/components/branches/branch-map-panel";
import { ImageLightbox } from "@/components/shared/image-lightbox";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { branches } from "@/data/branches";
import { bookingSectionId } from "@/config/site";
import { formatHotline, hotlineHref, publicEnv } from "@/lib/env";
import { hoverImageClass } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function BranchesPageContent() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState("");
  const hotline = publicEnv.hotline;

  return (
    <>
      <section className="border-b border-border bg-brand-dark-soft py-10 sm:py-12">
        <div className="mx-auto max-w-7xl space-y-4 px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal className="space-y-4">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center justify-center gap-1.5 text-xs font-bold text-brand-cream-muted"
            >
              <Link href="/" className="transition-colors hover:text-brand-red">
                Trang chủ
              </Link>
              <ChevronRight className="size-3 text-muted-foreground" />
              <span className="font-black text-brand-red">Hệ thống chi nhánh</span>
            </nav>
            <h1 className="text-2xl font-black uppercase leading-tight text-foreground sm:text-4xl lg:text-5xl">
              Hệ thống chi nhánh Ốc Đêm Chú Đỉnh
            </h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
          {branches.map((branch, branchIndex) => {
            const mapUrl = publicEnv.mapUrls[branch.mapKey];
            const directionsUrl =
              mapUrl ||
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address)}`;

            return (
              <ScrollReveal
                key={branch.id}
                as="article"
                id={branch.id}
                delay={branchIndex * 0.06}
                className="scroll-mt-28 overflow-hidden rounded-3xl border border-brand-gold/20 bg-brand-dark-soft shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className="flex flex-col justify-between space-y-6 p-6 sm:p-8 lg:col-span-7">
                    <div className="flex flex-col items-start gap-6 sm:flex-row">
                      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-2xl border border-border bg-brand-dark shadow sm:w-48">
                        <Image
                          src={branch.thumbnail}
                          alt={branch.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 192px"
                        />
                        <span className="absolute top-2 left-2 rounded-full bg-brand-red px-2.5 py-0.5 text-[10px] font-black uppercase text-brand-gold shadow">
                          {branch.badge}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1 space-y-3">
                        <h2 className="text-xl font-black uppercase leading-snug text-foreground sm:text-2xl">
                          {branch.name}
                        </h2>
                        <ul className="space-y-2 text-xs font-medium text-brand-cream-muted">
                          <li className="flex items-start gap-2">
                            <MapPin className="mt-0.5 size-4 shrink-0 text-brand-red" />
                            <span>
                              <strong className="text-foreground">Địa chỉ:</strong>{" "}
                              {branch.address}
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Clock className="size-4 shrink-0 text-brand-gold" />
                            <span>
                              <strong className="text-foreground">Giờ mở cửa:</strong>{" "}
                              {branch.hours}
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Users className="mt-0.5 size-4 shrink-0 text-indigo-400" />
                            <span>
                              <strong className="text-foreground">Sức chứa:</strong>{" "}
                              {branch.capacity}
                            </span>
                          </li>
                          {hotline ? (
                            <li className="flex items-center gap-2">
                              <Phone className="size-4 shrink-0 text-emerald-400" />
                              <span>
                                <strong className="text-foreground">Hotline:</strong>{" "}
                                <a
                                  href={hotlineHref(hotline)}
                                  className="font-bold text-brand-red hover:underline"
                                >
                                  {formatHotline(hotline)}
                                </a>
                              </span>
                            </li>
                          ) : null}
                        </ul>
                      </div>
                    </div>

                    {branch.images.length > 0 ? (
                      <div className="space-y-2 border-t border-border pt-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase text-muted-foreground">
                            <Camera className="size-3.5 text-brand-red" />
                            Hình ảnh thực tế chi nhánh:
                          </span>
                          {branch.videoUrl ? (
                            <button
                              type="button"
                              onClick={() => {
                                setVideoUrl(branch.videoUrl ?? null);
                                setVideoTitle(branch.name);
                              }}
                              className="inline-flex items-center gap-1 rounded-lg border border-brand-red/30 bg-brand-red/10 px-2.5 py-1 text-[11px] font-black text-brand-red transition hover:bg-brand-red/20"
                            >
                              <Play className="size-3.5 animate-pulse" />
                              Xem Video Không Gian
                            </button>
                          ) : null}
                        </div>
                        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 sm:gap-3">
                          {branch.images.map((image, index) => (
                            <button
                              key={`${branch.id}-gallery-${index}`}
                              type="button"
                              onClick={() => {
                                setLightboxImage(image.full);
                                setLightboxAlt(`${branch.name} - ảnh ${index + 1}`);
                              }}
                              className="group relative aspect-square overflow-hidden rounded-2xl border-2 border-border transition-colors hover:border-brand-gold/60"
                            >
                              <Image
                                src={image.thumb}
                                alt={`${branch.name} ${index + 1}`}
                                fill
                                className={cn("object-cover", hoverImageClass)}
                                sizes="(max-width: 640px) 25vw, 120px"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4">
                      <Button
                        render={<Link href={`/#${bookingSectionId}`} />}
                        variant="brand"
                        className="px-6 font-black uppercase"
                      >
                        Đặt bàn ngay
                      </Button>
                      <Button
                        variant="outline"
                        render={
                          <a
                            href={directionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        }
                        className="border-border bg-brand-dark font-bold text-brand-cream hover:bg-foreground/5"
                      >
                        <Navigation className="size-4 text-brand-red" />
                        Xem chỉ đường Google Maps
                      </Button>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <BranchMapPanel branch={branch} />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <ImageLightbox
        image={lightboxImage}
        alt={lightboxAlt}
        onClose={() => setLightboxImage(null)}
      />

      <Dialog
        open={Boolean(videoUrl)}
        onOpenChange={(open) => !open && setVideoUrl(null)}
      >
        <DialogContent
          showCloseButton={false}
          className="max-h-[95vh] max-w-[95vw] border-brand-gold/30 bg-ink p-2 sm:p-4"
        >
          <DialogTitle className="sr-only">{videoTitle}</DialogTitle>
          <button
            type="button"
            onClick={() => setVideoUrl(null)}
            className="absolute top-3 right-3 z-10 inline-flex size-9 items-center justify-center rounded-full border border-border bg-ink/90 text-on-dark transition-colors hover:bg-brand-red hover:text-on-red"
            aria-label="Đóng video"
          >
            <X className="size-4" />
          </button>
          {videoUrl ? (
            <video
              key={videoUrl}
              className="max-h-[80vh] w-full rounded-xl bg-black"
              controls
              autoPlay
              playsInline
              preload="metadata"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          ) : null}
          <p className="py-2 text-center text-sm font-bold text-brand-gold">
            {videoTitle}
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
