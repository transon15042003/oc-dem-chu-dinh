import type { LucideIcon } from "lucide-react";
import { Clock, PartyPopper, Phone, UtensilsCrossed } from "lucide-react";

export type FooterSloganItem = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const footerSlogans: FooterSloganItem[] = [
  {
    id: "fresh",
    title: "Ốc Tươi Sống Trong Ngày",
    description: "Chế biến đậm đà chuẩn vị Chú Đỉnh",
    icon: UtensilsCrossed,
  },
  {
    id: "night",
    title: "Phục Vụ Xuyên Đêm",
    description: "Mở cửa từ 16h00 đến 04h00 sáng",
    icon: Clock,
  },
  {
    id: "party",
    title: "Không Gian Tiệc Rộng Rãi",
    description: "Nhận đặt tiệc sinh nhật, họp mặt",
    icon: PartyPopper,
  },
  {
    id: "hotline",
    title: "Hotline Đặt Bàn",
    description: "Liên hệ ngay để đặt chỗ",
    icon: Phone,
  },
];
