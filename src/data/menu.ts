import { cdnImage } from "@/lib/images";

export type MenuCategoryId =
  | "featured"
  | "oc-nuong-sot"
  | "so-ngheu-dem"
  | "hai-san-nuong-sot-thai"
  | "lau-hai-san-dem"
  | "combo-tiec-an-kem"
  | "do-uong-bia";

export type MenuCategory = {
  id: MenuCategoryId;
  name: string;
  description: string;
};

export type MenuItem = {
  id: string;
  name: string;
  categoryId: MenuCategoryId;
  image: string;
  fullImage: string;
  hot?: boolean;
  searchTerms: string;
};

export const menuWifiPassword = "158manthien";

export const menuPoster = {
  title: "Bảng giá thực đơn tổng hợp Ốc Đêm Chú Đỉnh",
  image: cdnImage("storage/MENU/menu_1200-1600.webp"),
  fullImage: cdnImage("storage/MENU/menu.jpg"),
  alt: "Bảng giá thực đơn tổng hợp Ốc Đêm Chú Đỉnh",
};

export const menuCategories: MenuCategory[] = [
  {
    id: "featured",
    name: "⭐ KHUYÊN DÙNG",
    description:
      "Các món đặc sản ốc sốt trứng muối, nướng tiêu xanh & lẩu hải sản bán chạy nhất Chú Đỉnh",
  },
  {
    id: "oc-nuong-sot",
    name: "Ốc Nướng Sốt Hoàng Kim",
    description:
      "Các món ốc tươi nướng sốt trứng muối, bơ tỏi, tiêu xanh béo ngậy đậm đà.",
  },
  {
    id: "so-ngheu-dem",
    name: "Sò & Nghêu Nướng Mỡ Hành",
    description:
      "Sò điệp phô mai, sò huyết nướng mỡ hành & nghêu hấp sả Thái nóng hổi.",
  },
  {
    id: "hai-san-nuong-sot-thai",
    name: "Hải Sản Sốt Thái & Nướng",
    description:
      "Hải sản sốt Thái chua cay, tôm tái chanh & mực nướng sa tế giòn ngọt.",
  },
  {
    id: "lau-hai-san-dem",
    name: "Lẩu Hải Sản Đêm",
    description:
      "Lẩu Thái hải sản chua cay đậm vị ăn kèm tôm, mực & ốc tươi trong ngày.",
  },
  {
    id: "combo-tiec-an-kem",
    name: "Combo Tiệc & Món Ăn Kèm",
    description:
      "Gói combo tiệc tiết kiệm, sườn Thái Lan khổng lồ & bánh mì chấm sốt.",
  },
  {
    id: "do-uong-bia",
    name: "Đồ Uống & Bia Tươi",
    description:
      "Bia tươi mát lạnh, tháp bia Tiger, nước ngọt & các loại trà trái cây giải nhiệt.",
  },
];

function dish(
  id: string,
  name: string,
  categoryId: MenuCategoryId,
  imagePath: string,
  options?: { hot?: boolean },
): MenuItem {
  const encoded = imagePath.replace(/ /g, "%20");
  const webp = encoded.replace(/\.jpg$/, "_400-400.webp");

  return {
    id,
    name,
    categoryId,
    image: cdnImage(webp.includes("_400-400") ? webp : `${encoded}_400-400.webp`),
    fullImage: cdnImage(encoded.endsWith(".jpg") ? encoded : `${encoded}.jpg`),
    hot: options?.hot,
    searchTerms: name.toLowerCase(),
  };
}

export const menuItems: MenuItem[] = [
  dish(
    "rang-muc",
    "RĂNG MỰC SỐT TRỨNG MUỐI",
    "featured",
    "storage/anh-video/CN3 - Thủ Đức - Món ăn1.jpg",
    { hot: true },
  ),
  dish(
    "tom-su-rang",
    "TÔM SU RANG MUỐI HONGKONG",
    "featured",
    "storage/anh-video/CN3 - Thủ Đức - Món ăn2.jpg",
    { hot: true },
  ),
  dish(
    "hau-nuong-phomai",
    "HÀU NƯỚNG PHOMAI",
    "featured",
    "storage/anh-video/CN3 - Thủ Đức - Món ăn3.jpg",
    { hot: true },
  ),
  dish(
    "oc-huong-trung-muoi",
    "ỐC HƯƠNG SỐT TRỨNG MUỐI",
    "featured",
    "storage/anh-video/CN3 - Thủ Đức - Món ăn4.jpg",
    { hot: true },
  ),
  dish(
    "suon-thai-lai",
    "SƯỜN THÁI LAI",
    "featured",
    "storage/anh-video/CN3 - Thủ Đức - Món ăn5.jpg",
    { hot: true },
  ),
  dish(
    "lau-ga-la-giang",
    "LẨU GÀ LÁ GIANG",
    "featured",
    "storage/anh-video/CN3 - Thủ Đức - Món ăn10.jpg",
    { hot: true },
  ),
  dish(
    "oc-huong-hoang-kim",
    "Ốc Hương Sốt Trứng Muối Hoàng Kim",
    "oc-nuong-sot",
    "storage/mon-an/a (12).jpg",
  ),
  dish(
    "oc-buou-tieu-xanh",
    "Ốc Bươu Nướng Tiêu Xanh Tây Bắc",
    "oc-nuong-sot",
    "storage/mon-an/a (7).jpg",
  ),
  dish(
    "oc-mo-bo-toi",
    "Ốc Mỡ Sốt Bơ Tỏi Béo Ngậy",
    "oc-nuong-sot",
    "storage/mon-an/a (1).jpg",
  ),
  dish(
    "oc-ca-na-mam-nhi",
    "Ốc Cà Na Nướng Mắm Nhĩ",
    "oc-nuong-sot",
    "storage/mon-an/a (2).jpg",
  ),
  dish(
    "oc-toi-bo-toi",
    "Ốc Tỏi Nướng Bơ Tỏi Ớt",
    "oc-nuong-sot",
    "storage/mon-an/a (16).jpg",
  ),
  dish(
    "so-diep-phomai",
    "Sò Điệp Phô Mai Nướng Bít Tết",
    "so-ngheu-dem",
    "storage/mon-an/a (18).jpg",
  ),
  dish(
    "so-huyet-mo-hanh",
    "Sò Huyết Nướng Mỡ Hành Làng Chài",
    "so-ngheu-dem",
    "storage/mon-an/a (3).jpg",
  ),
  dish(
    "ngheu-hap-sa",
    "Nghêu Hấp Sả Thái Cay Nồng",
    "so-ngheu-dem",
    "storage/mon-an/a (4).jpg",
  ),
  dish(
    "hau-phomai-keo-soi",
    "Hàu Nướng Phô Mai Kéo Sợi",
    "so-ngheu-dem",
    "storage/mon-an/a (5).jpg",
  ),
  dish(
    "hai-san-sot-thai",
    "Hải Sản Sốt Thái Chua Cay Siêu Tốc",
    "hai-san-nuong-sot-thai",
    "storage/mon-an/a (13).jpg",
  ),
  dish(
    "tom-tai-chanh",
    "Tôm Tái Chanh Sốt Thái Cay Tê",
    "hai-san-nuong-sot-thai",
    "storage/mon-an/a (6).jpg",
  ),
  dish(
    "muc-mot-nang",
    "Mực Một Nắng Nướng Sa Tế",
    "hai-san-nuong-sot-thai",
    "storage/mon-an/a (9).jpg",
  ),
  dish(
    "bach-tuoc-sa-te",
    "Bạch Tuộc Nướng Sa Tế Đêm",
    "hai-san-nuong-sot-thai",
    "storage/mon-an/a (19).jpg",
  ),
  dish(
    "lau-thai-hai-san",
    "Lẩu Thái Hải Sản Đêm Đậm Vị",
    "lau-hai-san-dem",
    "storage/mon-an/a (11).jpg",
  ),
  dish(
    "lau-thap-cam",
    "Lẩu Thập Cẩm Chú Đỉnh Đặc Biệt",
    "lau-hai-san-dem",
    "storage/mon-an/a (14).jpg",
  ),
  dish(
    "suon-thai-lan",
    "Sườn Thái Lan Khổng Lồ Hầm Mềm",
    "combo-tiec-an-kem",
    "storage/mon-an/a (8).jpg",
  ),
  dish(
    "combo-4-nguoi",
    "Combo Tiệc Ốc Đêm 4 Người",
    "combo-tiec-an-kem",
    "storage/mon-an/a (10).jpg",
  ),
  dish(
    "combo-10-nguoi",
    "Combo Tiệc Bàn 10 Người Siêu Tiết Kiệm",
    "combo-tiec-an-kem",
    "storage/mon-an/a (23).jpg",
  ),
  dish(
    "banh-mi-bo-toi",
    "Bánh Mì Nóng Chấm Sốt Bơ Tỏi",
    "combo-tiec-an-kem",
    "storage/mon-an/a (24).jpg",
  ),
  dish(
    "thap-bia-tiger",
    "Tháp Bia Tươi Tiger 3 Lít Mát Lạnh",
    "do-uong-bia",
    "storage/mon-an/a (25).jpg",
  ),
];

export type MenuTabId = "all" | "featured" | MenuCategoryId;

export const menuFilterTabs: { id: MenuTabId; label: string }[] = [
  { id: "all", label: "TẤT CẢ MÓN" },
  { id: "featured", label: "⭐ KHUYÊN DÙNG" },
  ...menuCategories
    .filter((category) => category.id !== "featured")
    .map((category) => ({ id: category.id, label: category.name })),
];

export function getMenuItemsByCategory(categoryId: MenuCategoryId): MenuItem[] {
  return menuItems.filter((item) => item.categoryId === categoryId);
}

export function filterMenuItems(
  items: MenuItem[],
  searchQuery: string,
): MenuItem[] {
  const query = searchQuery.trim().toLowerCase();
  if (!query) return items;
  return items.filter((item) => item.searchTerms.includes(query));
}
