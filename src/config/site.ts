import { cdnImage } from "@/lib/images";

export const siteConfig = {
  name: "Ốc Đêm Chú Đỉnh",
  tagline: "Khai mở vị giác khám phá ẩm thực Sài Gòn",
  description:
    "Hệ thống ốc nướng & lẩu hải sản đêm hàng đầu Sài Gòn. Tươi ngon đậm đà, phục vụ xuyên đêm đến 04h00 sáng.",
  hours: "16:00 - 04:00 Sáng mỗi ngày",
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000",
  ogImage: cdnImage(
    "storage/anh-video/2fcdedb4-98c6-4dd6-90af-39290b6bcbee.png",
  ),
  keywords: [
    "ốc đêm chú đỉnh",
    "ốc nướng sài gòn",
    "lẩu hải sản",
    "đặt bàn ốc",
    "nhà hàng đêm sài gòn",
    "ốc gò vấp",
    "ốc tân bình",
    "ốc thủ đức",
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Thực đơn", href: "/thuc-don" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Khuyến mãi", href: "/khuyen-mai" },
  { label: "Chi nhánh", href: "/chi-nhanh" },
  { label: "Tuyển dụng", href: "/tuyen-dung" },
  { label: "Liên hệ", href: "/lien-he" },
];

export const bookingSectionId = "dat-ban";
export const eventBookingSectionId = "dat-tiec";
export const careersApplicationSectionId = "ung-tuyen";

export const siteRoutes = [
  { path: "/" as const, changeFrequency: "weekly" as const, priority: 1 },
  { path: "/gioi-thieu" as const, changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/thuc-don" as const, changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/tin-tuc" as const, changeFrequency: "weekly" as const, priority: 0.85 },
  { path: "/khuyen-mai" as const, changeFrequency: "weekly" as const, priority: 0.85 },
  { path: "/chi-nhanh" as const, changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/tuyen-dung" as const, changeFrequency: "monthly" as const, priority: 0.75 },
  { path: "/lien-he" as const, changeFrequency: "monthly" as const, priority: 0.8 },
];
