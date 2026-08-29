"use client";

import Image from "next/image";
import { useState } from "react";
import { Play, ZoomIn } from "lucide-react";

import { InteractiveCard } from "@/components/shared/interactive-card";
import { ImageLightbox } from "@/components/shared/image-lightbox";
import { SectionHeading } from "@/components/shared/section-heading";
import { experienceVideos, galleryImages } from "@/data/homepage";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  const [activeVideoId, setActiveVideoId] = useState(experienceVideos[0]?.id ?? "");

  const activeVideo =
    experienceVideos.find((video) => video.id === activeVideoId) ?? experienceVideos[0];

  return (
    <section className="border-b border-border bg-brand-dark-soft py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:space-y-10">
        <SectionHeading
          eyebrow="Không gian & ẩm thực Chú Đỉnh"
          title="Trải nghiệm thực tế"
          description="Xem video không gian, món ăn và không khí nhậu đêm tại các chi nhánh"
        />

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="order-1 overflow-hidden rounded-2xl border border-border lg:order-none">
            {activeVideo ? (
              <video
                key={activeVideo.id}
                className="aspect-video w-full bg-black object-cover"
                controls
                preload="metadata"
                poster={activeVideo.poster}
              >
                <source src={activeVideo.src} type="video/mp4" />
              </video>
            ) : null}
            {activeVideo ? (
              <div className="border-t border-border bg-ink/80 px-4 py-3">
                <p className="font-bold text-on-dark">{activeVideo.title}</p>
                <p className="text-xs text-brand-gold">{activeVideo.branch}</p>
              </div>
            ) : null}
          </div>

          <div className="order-2 max-h-none space-y-3 overflow-y-auto pr-1 sm:max-h-[360px] lg:order-none lg:max-h-[420px]">
            {experienceVideos.map((video, index) => (
              <button
                key={video.id}
                type="button"
                onClick={() => setActiveVideoId(video.id)}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all",
                  activeVideoId === video.id
                    ? "border-brand-gold/50 bg-brand-gold/10 shadow-[0_0_20px_rgba(242,178,51,0.15)]"
                    : "border-border bg-brand-dark hover:border-brand-gold/30 hover:bg-foreground/5",
                )}
              >
                <div className="relative size-20 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={video.poster}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                    sizes="80px"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-ink/40">
                    <Play className="size-6 text-brand-gold" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-foreground">{video.title}</p>
                  <p className="text-xs text-brand-gold">{video.branch}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                    Video {index + 1}/{experienceVideos.length}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[number] | null>(
    null,
  );

  return (
    <section className="border-b border-border py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl space-y-10 px-4">
        <SectionHeading
          eyebrow="Thư viện hình ảnh không gian"
          title="Không gian tại Chú Đỉnh"
          description="Bấm vào bất kỳ ảnh nào bên dưới để xem ảnh phóng to full màn hình!"
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {galleryImages.map((image, index) => (
            <InteractiveCard
              key={image.id}
              delay={index * 0.03}
              className="overflow-hidden rounded-xl border-0 bg-transparent p-0 shadow-none hover:shadow-none"
            >
              <button
                type="button"
                onClick={() => setSelectedImage(image)}
                className="group relative aspect-square w-full overflow-hidden"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/30" />
                <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-full bg-ink/70 px-2 py-1 text-[10px] font-medium text-on-dark opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <ZoomIn className="size-3" />
                  Xem phóng to
                </span>
              </button>
            </InteractiveCard>
          ))}
        </div>
      </div>

      <ImageLightbox
        image={selectedImage?.src ?? null}
        alt={selectedImage?.alt ?? "Ảnh phóng to"}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
}
