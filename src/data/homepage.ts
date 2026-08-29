import type { LucideIcon } from "lucide-react";
import {
  Baby,
  Cake,
  ChefHat,
  Clock,
  Coins,
  HeartHandshake,
  MapPin,
  PartyPopper,
  Shell,
  Sparkles,
  Users,
} from "lucide-react";

import { cdnImage } from "@/lib/images";

export type StatItem = {
  value: number;
  suffix?: string;
  label: string;
  description: string;
  icon?: LucideIcon;
};

export type HeroHighlight = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type FeaturedDish = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  hot?: boolean;
};

export type EventService = {
  id: string;
  title: string;
  perks: string[];
  icon: LucideIcon;
  accent: string;
};

export type ExperienceVideo = {
  id: string;
  title: string;
  branch: string;
  src: string;
  poster: string;
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

export type Review = {
  id: string;
  quote: string;
  name: string;
  role: string;
};

export type SpaceFeature = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const heroBannerSize = {
  width: 1672,
  height: 941,
} as const;

export const heroSlides = [
  {
    id: "slide-1",
    image: cdnImage("storage/anh-video/2fcdedb4-98c6-4dd6-90af-39290b6bcbee.png"),
    alt: "Ốc Đêm Chú Đỉnh Hero Banner Slide 1",
    width: heroBannerSize.width,
    height: heroBannerSize.height,
  },
  {
    id: "slide-2",
    image: cdnImage("storage/anh-video/142c7027-dad4-4720-a886-8c560f7d6949.png"),
    alt: "Ốc Đêm Chú Đỉnh Hero Banner Slide 2",
    width: heroBannerSize.width,
    height: heroBannerSize.height,
  },
  {
    id: "slide-3",
    image: cdnImage("storage/anh-video/cf648ec5-19b5-4690-aef4-bffd3635aaa0.png"),
    alt: "Ốc Đêm Chú Đỉnh Hero Banner Slide 3",
    width: heroBannerSize.width,
    height: heroBannerSize.height,
  },
] as const;

export const heroHighlights: HeroHighlight[] = [
  {
    id: "fresh",
    title: "Ốc tươi, chế biến đa dạng",
    description: "Hải sản nhập mỗi ngày, sốt độc quyền Chú Đỉnh",
    icon: Shell,
  },
  {
    id: "space",
    title: "Không gian rộng, phục vụ nhiệt tình",
    description: "Sân vườn thoáng mát & phòng tiệc máy lạnh riêng",
    icon: HeartHandshake,
  },
  {
    id: "price",
    title: "Giá cả hợp lý, phù hợp mọi người",
    description: "Thực đơn phong phú, phù hợp nhậu đêm & đặt tiệc",
    icon: Coins,
  },
];

export const heroStats: StatItem[] = [
  {
    value: 200,
    suffix: "+",
    label: "MÓN ĂN ĐẶC SẮC",
    description: "Phong phú & đặc sắc",
    icon: ChefHat,
  },
  {
    value: 4,
    label: "CHI NHÁNH",
    description: "Khắp SG - sức chứa 500 khách",
    icon: MapPin,
  },
  {
    value: 2000,
    suffix: "+",
    label: "ĐÁNH GIÁ 5 SAO",
    description: "Từ thực khách yêu thích",
    icon: Sparkles,
  },
  {
    value: 1500,
    suffix: "+",
    label: "KHÁCH MỖI NGÀY",
    description: "Phục vụ tận tâm mỗi đêm",
    icon: Users,
  },
];

export const featuredDishes: FeaturedDish[] = [
  {
    id: "rang-muc",
    name: "RĂNG MỰC SỐT TRỨNG MUỐI",
    description:
      "Răng mực tươi giòn sần sật quyện sốt trứng muối béo ngậy kèm bánh mì nóng giòn.",
    price: 89000,
    image: cdnImage("storage/mon-an/a (13).jpg"),
    hot: true,
  },
  {
    id: "tom-su",
    name: "TÔM SU RANG MUỐI HONGKONG",
    description:
      "Tôm sú tươi sống chao dầu rang muối Hongkong đậm đà giòn rụm.",
    price: 129000,
    image: cdnImage("storage/mon-an/a (18).jpg"),
    hot: true,
  },
  {
    id: "hau-nuong",
    name: "HÀU NƯỚNG PHOMAI",
    description:
      "Hàu sữa béo mập nướng phủ sốt phô mai Mozzarella kéo sợi thơm béo.",
    price: 99000,
    image: cdnImage("storage/mon-an/a (8).jpg"),
    hot: true,
  },
  {
    id: "oc-huong",
    name: "ỐC HƯƠNG SỐT TRỨNG MUỐI",
    description:
      "Ốc hương cừ sống giòn ngọt thấm đẫm sốt trứng muối vàng ươm đặc trưng Chú Đỉnh.",
    price: 119000,
    image: cdnImage("storage/mon-an/a (11).jpg"),
    hot: true,
  },
  {
    id: "suon-thai",
    name: "SƯỜN THÁI LAI",
    description:
      "Sườn heo cây tảng khổng lồ hầm cay kiểu Thái thơm ớt xiêm xanh đậm đà.",
    price: 159000,
    image: cdnImage("storage/mon-an/a (15).jpg"),
    hot: true,
  },
  {
    id: "lau-ga",
    name: "LẨU GÀ LÁ GIANG",
    description:
      "Lẩu gà ta lá giang vị chua thanh đậm đà kèm bún tươi và rau nhúng ốc bốc khói.",
    price: 199000,
    image: cdnImage("storage/mon-an/a (16).jpg"),
    hot: true,
  },
];

export const eventServices: EventService[] = [
  {
    id: "sinh-nhat",
    title: "SINH NHẬT",
    icon: Cake,
    accent: "from-pink-500/20 to-brand-red/20",
    perks: [
      "Miễn Phí Decor bảng tên sinh nhật",
      "Trình Chiếu Màn led 250inch",
      "Hỗ trợ tổ chức Sinh Nhật",
      "Âm Thanh chuyên nghiệp",
    ],
  },
  {
    id: "thoi-noi",
    title: "THÔI NÔI / BÁO HỶ",
    icon: Baby,
    accent: "from-sky-500/20 to-blue-600/20",
    perks: [
      "Miễn Phí Decor bảng tên để bàn",
      "Âm Thanh hiện đại",
      "Màn Hình Led 250 inch",
    ],
  },
  {
    id: "tat-nien",
    title: "TẤT NIÊN / TÂN NIÊN",
    icon: PartyPopper,
    accent: "from-brand-gold/25 to-amber-600/20",
    perks: [
      "Miễn Phí Decor bảng tên để bàn",
      "Âm Thanh – Màn Hình Led 250 inch",
      "Xuất VAT doanh nghiệp",
    ],
  },
  {
    id: "lien-hoan",
    title: "LIÊN HOAN",
    icon: Users,
    accent: "from-emerald-500/20 to-teal-600/20",
    perks: [
      "Miễn Phí Decor bảng tên để bàn",
      "Âm Thanh – Màn Hình Led 250 inch",
      "Xuất VAT doanh nghiệp",
    ],
  },
];

export const experienceVideos: ExperienceVideo[] = [
  {
    id: "video-cn1",
    title: "Không gian chi nhánh Gò Vấp",
    branch: "CN1 - Gò Vấp",
    src: cdnImage("storage/anh-video/CN1%20-%20gò%20vấp20.mp4"),
    poster: cdnImage("storage/anh-video/CN1%20-%20gò%20vấp1_600-600.webp"),
  },
  {
    id: "video-cn3-1",
    title: "Không gian sân vườn Thủ Đức",
    branch: "CN3 - Thủ Đức",
    src: cdnImage("storage/anh-video/CN3%20-%20Thủ%20Đức3.mp4"),
    poster: cdnImage("storage/anh-video/CN3%20-%20Thủ%20Đức%20-%20Món%20ăn1_400-400.webp"),
  },
  {
    id: "video-cn3-2",
    title: "Món ăn nóng hổi tại quầy",
    branch: "CN3 - Thủ Đức",
    src: cdnImage("storage/anh-video/CN3%20-%20Thủ%20Đức%20-%20Món%20ăn16.mp4"),
    poster: cdnImage("storage/anh-video/CN3%20-%20Thủ%20Đức%20-%20Món%20ăn2_400-400.webp"),
  },
  {
    id: "video-cn3-3",
    title: "Không khí nhậu đêm sầm uất",
    branch: "CN3 - Thủ Đức",
    src: cdnImage("storage/anh-video/CN3%20-%20Thủ%20Đức6.mp4"),
    poster: cdnImage("storage/anh-video/CN3%20-%20Thủ%20Đức%20-%20Món%20ăn3_400-400.webp"),
  },
  {
    id: "video-cn3-4",
    title: "Hải sản tươi sống trong ngày",
    branch: "CN3 - Thủ Đức",
    src: cdnImage("storage/anh-video/CN3%20-%20Thủ%20Đức%20-%20Món%20ăn20.mp4"),
    poster: cdnImage("storage/anh-video/CN3%20-%20Thủ%20Đức%20-%20Món%20ăn4_400-400.webp"),
  },
  {
    id: "video-cn5",
    title: "Chi nhánh Quận 7 về đêm",
    branch: "CN5 - Quận 7",
    src: cdnImage("storage/anh-video/CN5%2010.mp4"),
    poster: cdnImage("storage/anh-video/CN3%20-%20Thủ%20Đức%20-%20Món%20ăn5_400-400.webp"),
  },
];

const galleryFiles = [
  "CN1%20-%20gò%20vấp1_600-600.webp",
  "CN1%20-%20gò%20vấp2_600-600.webp",
  "CN1%20-%20gò%20vấp10_600-600.webp",
  "CN1%20-%20gò%20vấp11_600-600.webp",
  "CN1%20-%20gò%20vấp12_600-600.webp",
  "CN1%20-%20gò%20vấp13_600-600.webp",
  "CN1%20-%20gò%20vấp14_600-600.webp",
  "CN1%20-%20gò%20vấp15_600-600.webp",
  "CN1%20-%20gò%20vấp16_600-600.webp",
  "CN1%20-%20gò%20vấp17_600-600.webp",
  "CN1%20-%20gò%20vấp18_600-600.webp",
  "CN1%20-%20gò%20vấp19_600-600.webp",
];

export const galleryImages: GalleryImage[] = galleryFiles.map((file, index) => ({
  id: `gallery-${index + 1}`,
  src: cdnImage(`storage/anh-video/${file}`),
  alt: `Không gian Ốc Đêm Chú Đỉnh ${index + 1}`,
}));

export const spaceFeatures: SpaceFeature[] = [
  {
    id: "open-air",
    title: "Sân vườn thoáng mát",
    description: "Không gian ngoài trời rộng rãi, phù hợp nhóm bạn nhậu đêm",
    icon: Sparkles,
  },
  {
    id: "private-room",
    title: "Phòng tiệc riêng",
    description: "Máy lạnh, âm thanh & màn LED phục vụ tiệc 10–100+ khách",
    icon: Users,
  },
  {
    id: "night-service",
    title: "Phục vụ xuyên đêm",
    description: "Mở cửa 16h00 – 04h00 sáng, phục vụ tận tâm mỗi đêm",
    icon: Clock,
  },
];

export const spaceStats: StatItem[] = [
  {
    value: 85,
    suffix: "+",
    label: "MÓN ĂN ĐẶC SẮC",
    description: "",
    icon: ChefHat,
  },
  {
    value: 4,
    label: "CHI NHÁNH SẦM UẤT",
    description: "",
    icon: MapPin,
  },
  {
    value: 272,
    suffix: "+",
    label: "ĐÁNH GIÁ 5 SAO",
    description: "",
    icon: Sparkles,
  },
  {
    value: 721,
    suffix: "+",
    label: "KHÁCH MỖI NGÀY",
    description: "",
    icon: Users,
  },
];

export const reviews: Review[] = [
  {
    id: "review-1",
    quote:
      "Ốc hương trứng muối ở đây xuất sắc luôn! Nước sốt béo ngậy chấm bánh mì ăn siêu cuốn. Không gian chi nhánh Gò Vấp rộng rãi.",
    name: "Thành Hoàng",
    role: "Khách hàng - CN Gò Vấp",
  },
  {
    id: "review-2",
    quote:
      "Menu đa dạng, đồ ăn tươi ngon nóng hổi, lẩu hải sản đêm đậm đà vừa vị. Đặt tiệc sinh nhật được hỗ trợ trang trí tận tình!",
    name: "Bảo Trang",
    role: "Khách sinh nhật - CN Tân Bình",
  },
  {
    id: "review-3",
    quote:
      "Phục vụ xuyên đêm tới 3h sáng siêu tiện cho nhóm đi làm về muộn. Quán đông nhưng ra món nhanh, sốt Thái chua cay 10 điểm!",
    name: "Anh Tuấn",
    role: "Khách nhậu đêm - CN Thủ Đức",
  },
  {
    id: "review-4",
    quote:
      "Không gian cực kỳ thoáng mát sạch sẽ. Sò điệp phô mai nướng béo ngậy kéo sợi hấp dẫn, hương vị đậm đà vừa miệng!",
    name: "Minh Thư",
    role: "Khách hàng - CN Tân Bình",
  },
  {
    id: "review-5",
    quote:
      "Sườn Thái Lan siêu to khổng lồ 2 người ăn ngập mặt mà giá rất hợp lý. Thịt sườn hầm mềm róc xương đậm đà cực ngon.",
    name: "Hoàng Nam",
    role: "Khách hàng - CN Gò Vấp",
  },
  {
    id: "review-6",
    quote:
      "Quán có phòng riêng máy lạnh đãi tiệc công ty tới 50 người rộng rãi, xuất hóa đơn VAT nhanh chóng chu đáo.",
    name: "Quốc Phương",
    role: "Đại diện đặt tiệc công ty",
  },
  {
    id: "review-7",
    quote:
      "Ốc bươu nhồi thịt siêu thơm, mắm gừng pha cực chuẩn vị. Chi nhánh Man Thiện Thủ Đức đông vui nhộn nhịp rực rỡ.",
    name: "Thùy Linh",
    role: "Khách hàng - CN Thủ Đức",
  },
  {
    id: "review-8",
    quote:
      "Hải sản tươi bắt tại hồ, nướng sốt sa tế cay nồng chuẩn bài làm vài ly bia đêm với anh em đồng nghiệp!",
    name: "Đăng Khoa",
    role: "Khách hàng - CN Tân Bình",
  },
  {
    id: "review-9",
    quote:
      "Nhân viên dễ thương, hỗ trợ chụp ảnh check-in trang trí tiệc sinh nhật siêu nhiệt tình. Cho 10/10 điểm!",
    name: "Mỹ Duyên",
    role: "Khách sinh nhật - CN Gò Vấp",
  },
];
