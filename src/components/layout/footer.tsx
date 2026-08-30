"use client";

import { SiteLogo } from "@/components/layout/site-logo";
import { useState } from "react";
import {
  Mail,
  MapPin,
  MessageCircle,
  Music2,
  Navigation,
  Phone,
  Share2,
  Store,
} from "lucide-react";

import { branches } from "@/data/branches";
import { footerSlogans } from "@/data/footer";
import { siteConfig } from "@/config/site";
import { formatHotline, hotlineHref, publicEnv } from "@/lib/env";
import { resolveMapDirectionsUrl, resolveMapEmbedUrl } from "@/lib/maps";
import { cn } from "@/lib/utils";

export function Footer() {
  const [activeBranchIndex, setActiveBranchIndex] = useState(0);
  const hotline = publicEnv.hotline;
  const email = publicEnv.email;
  const activeBranch = branches[activeBranchIndex];
  const mapEmbed =
    activeBranch && !activeBranch.comingSoon
      ? resolveMapEmbedUrl(activeBranch.mapKey, activeBranch.address)
      : "";

  return (
    <footer
      id="lien-he"
      className="relative overflow-hidden border-t border-brand-red/40 bg-footer text-footer-foreground"
    >
      {/* Khẩu hiệu — 4 ô trên footer (giống site gốc) */}
      <div className="border-b border-brand-gold/30 bg-slogan-bar py-6">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {footerSlogans.map((item) => {
            const Icon = item.icon;
            const isHotline = item.id === "hotline";
            const description =
              isHotline && hotline
                ? formatHotline(hotline)
                : item.description;

            return (
              <div
                key={item.id}
                className="flex items-center gap-3.5 rounded-2xl border border-brand-gold/20 bg-black/20 p-3.5 backdrop-blur-sm"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-gold text-lg font-black text-brand-dark shadow">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wide text-amber-200">
                    {item.title}
                  </h4>
                  {isHotline && hotline ? (
                    <a
                      href={hotlineHref(hotline)}
                      className="text-[11px] font-bold text-brand-gold hover:underline"
                    >
                      {description}
                    </a>
                  ) : (
                    <p className="text-[11px] font-medium text-footer-foreground/80">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer chính — 3 cột */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12">
          {/* Cột 1: Thương hiệu */}
          <div className="space-y-4 lg:col-span-4">
            <SiteLogo showWordmark variant="footer" imageClassName="h-14 sm:h-16" />

            <p className="text-xs leading-relaxed font-medium text-footer-foreground/80">
              {siteConfig.description}
            </p>

            <div className="space-y-2 text-xs text-footer-foreground/80">
              {hotline ? (
                <p className="flex items-center gap-2">
                  <Phone className="size-4 shrink-0 text-brand-red" />
                  <span>Hotline Đặt Bàn:</span>
                  <a
                    href={hotlineHref(hotline)}
                    className="font-bold text-brand-gold hover:underline"
                  >
                    {formatHotline(hotline)}
                  </a>
                </p>
              ) : null}
              {email ? (
                <p className="flex items-center gap-2">
                  <Mail className="size-4 shrink-0 text-brand-red" />
                  <span>Email:</span>
                  <a href={`mailto:${email}`} className="text-brand-gold hover:underline">
                    {email}
                  </a>
                </p>
              ) : null}
            </div>

            <div className="flex items-center gap-3 pt-1">
              {publicEnv.facebookUrl ? (
                <a
                  href={publicEnv.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex size-9 items-center justify-center rounded-xl border border-footer-foreground/15 bg-footer-foreground/5 text-sm text-footer-foreground transition hover:border-brand-red hover:bg-brand-red hover:text-on-red"
                >
                  <Share2 className="size-4" />
                </a>
              ) : null}
              {publicEnv.zaloUrl ? (
                <a
                  href={publicEnv.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Zalo"
                  className="flex size-9 items-center justify-center rounded-xl border border-footer-foreground/15 bg-footer-foreground/5 text-sm text-footer-foreground transition hover:border-brand-red hover:bg-brand-red hover:text-on-red"
                >
                  <MessageCircle className="size-4" />
                </a>
              ) : null}
              {publicEnv.tiktokUrl ? (
                <a
                  href={publicEnv.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="flex size-9 items-center justify-center rounded-xl border border-footer-foreground/15 bg-footer-foreground/5 text-sm text-footer-foreground transition hover:border-brand-red hover:bg-brand-red hover:text-on-red"
                >
                  <Music2 className="size-4" />
                </a>
              ) : null}
            </div>
          </div>

          {/* Cột 2: Chi nhánh */}
          <div className="space-y-3 lg:col-span-4">
            <h3 className="border-l-4 border-brand-red pl-3 text-xs font-black uppercase tracking-widest text-brand-gold">
              Hệ thống chi nhánh
            </h3>
            <div className="space-y-3 text-xs">
              {branches.map((branch, index) => {
                const mapUrl = resolveMapDirectionsUrl(branch.mapKey, branch.address);
                const isActive = activeBranchIndex === index;

                return (
                  <button
                    key={branch.id}
                    type="button"
                    onClick={() => setActiveBranchIndex(index)}
                    className={cn(
                      "w-full rounded-2xl border p-3 text-left transition",
                      isActive
                        ? "border-brand-gold bg-footer-foreground/8 shadow-lg ring-1 ring-brand-gold/50"
                        : "border-footer-foreground/15 bg-footer-foreground/5 hover:border-brand-gold/40",
                    )}
                  >
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 font-black text-brand-gold">
                        <Store className="size-3 shrink-0" />
                        {branch.name}
                      </span>
                      {mapUrl && !branch.comingSoon ? (
                        <a
                          href={mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex shrink-0 items-center gap-1 text-[10px] font-bold text-brand-red hover:underline"
                        >
                          <Navigation className="size-3" />
                          Chỉ đường
                        </a>
                      ) : null}
                    </div>
                    <p className="font-medium text-footer-foreground/80">
                      <MapPin className="mr-1.5 inline size-3 text-brand-red" />
                      {branch.address}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cột 3: Bản đồ */}
          <div className="space-y-3 lg:col-span-4">
            <h3 className="border-l-4 border-brand-red pl-3 text-xs font-black uppercase tracking-widest text-brand-gold">
              Bản đồ chi nhánh
            </h3>
            <div className="rounded-2xl border border-footer-foreground/15 bg-footer-foreground/5 p-2 shadow-xl">
              <div className="relative h-64 overflow-hidden rounded-xl bg-footer-foreground/10 sm:h-72">
                {mapEmbed ? (
                  <iframe
                    title={activeBranch?.name ?? "Bản đồ chi nhánh"}
                    src={mapEmbed}
                    className="size-full border-0 brightness-90 contrast-125 grayscale transition duration-500 hover:grayscale-0 hover:filter-none"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="flex size-full flex-col items-center justify-center gap-3 px-6 text-center">
                    <MapPin className="size-12 text-brand-gold/40" />
                    <p className="text-sm font-bold text-footer-foreground/80">
                      {activeBranch?.name ?? "Chi nhánh"}
                    </p>
                    <p className="text-xs text-footer-foreground/60">
                      Bản đồ sẽ hiển thị tại đây
                    </p>
                    <p className="text-[10px] text-footer-foreground/50">
                      Cấu hình{" "}
                      <code className="text-brand-gold/70">
                        NEXT_PUBLIC_MAP_EMBED_{activeBranch?.mapKey.toUpperCase()}
                      </code>
                    </p>
                  </div>
                )}
                <div className="absolute right-2 bottom-2 left-2 rounded-lg border border-brand-gold/30 bg-footer/90 p-2 text-center text-[10px] font-bold text-amber-200 backdrop-blur-sm">
                  📍 Mở cửa: {siteConfig.hours}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-brand-red/50 bg-gradient-to-r from-slogan-mid via-brand-red to-footer py-4 text-center text-xs font-medium text-footer-foreground/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Khai mở vị giác khám phá ẩm thực.
            {" | "}
            <span className="text-brand-gold">Tuyển Dụng Nhân Sự</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
