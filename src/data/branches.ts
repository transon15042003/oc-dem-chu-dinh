import { cdnImage } from "@/lib/images";

export type BranchMapKey = "cn1" | "cn2" | "cn3" | "cn4" | "cn5";

export type BranchImage = {
  thumb: string;
  full: string;
};

export type Branch = {
  id: string;
  badge: string;
  name: string;
  shortName: string;
  address: string;
  mapKey: BranchMapKey;
  hours: string;
  capacity: string;
  thumbnail: string;
  images: BranchImage[];
  videoUrl?: string;
  comingSoon?: boolean;
};

function galleryItem(jpgPath: string): BranchImage {
  const encoded = jpgPath.replace(/ /g, "%20");
  const webp = encoded.replace(/\.jpg$/, "_400-400.webp");

  return {
    thumb: cdnImage(webp),
    full: cdnImage(encoded),
  };
}

function galleryFromPaths(paths: string[]): BranchImage[] {
  return paths.map(galleryItem);
}

export const branches: Branch[] = [
  {
    id: "cn1",
    badge: "CN1",
    name: "Chi Nhánh 1 - Gò Vấp",
    shortName: "Gò Vấp",
    address: "202 Đường Số 8, P.11, Gò Vấp, TP.HCM",
    mapKey: "cn1",
    hours: "16:00 - 04:00 Sáng (Mỗi ngày)",
    capacity: "Sức chứa hơn 200 khách (Khu VIP + Khu DJ)",
    thumbnail: cdnImage("storage/anh-video/CN1%20-%20gò%20vấp1.jpg"),
    images: galleryFromPaths([
      "storage/anh-video/CN1 - gò vấp1.jpg",
      "storage/anh-video/CN1 - gò vấp10.jpg",
      "storage/anh-video/CN1 - gò vấp11.jpg",
      "storage/anh-video/CN1 - gò vấp12.jpg",
      "storage/anh-video/CN1 - gò vấp13.jpg",
      "storage/anh-video/CN1 - gò vấp14.jpg",
      "storage/anh-video/CN1 - gò vấp15.jpg",
      "storage/anh-video/CN1 - gò vấp16.jpg",
    ]),
    videoUrl: cdnImage("storage/anh-video/CN1%20-%20gò%20vấp20.mp4"),
  },
  {
    id: "cn2",
    badge: "CN2",
    name: "Chi Nhánh 2 - Tân Bình",
    shortName: "Tân Bình",
    address: "48 Phan Huy Ích, P.15, Tân Bình, TP.HCM",
    mapKey: "cn2",
    hours: "16:00 - 04:00 Sáng (Mỗi ngày)",
    capacity: "Sức chứa hơn 150 khách (Bàn tiệc thoáng mát)",
    thumbnail: cdnImage("storage/anh-video/CN2%20-%20Tân%20Bình1.jpg"),
    images: galleryFromPaths(
      Array.from({ length: 8 }, (_, index) =>
        `storage/anh-video/CN2 - Tân Bình${index + 1}.jpg`,
      ),
    ),
  },
  {
    id: "cn3",
    badge: "CN3",
    name: "Chi Nhánh 3 - Thủ Đức",
    shortName: "Thủ Đức",
    address: "158 Man Thiện, P. Tăng Nhơn Phú, TP. Thủ Đức, TP.HCM",
    mapKey: "cn3",
    hours: "16:00 - 04:00 Sáng (Mỗi ngày)",
    capacity: "Sức chứa hơn 250 khách (2 tầng + Màn LED + Sân khấu)",
    thumbnail: cdnImage("storage/mon-an/a%20(19).jpg"),
    images: galleryFromPaths([
      "storage/anh-video/CN3 - Thủ Đức1.jpg",
      "storage/anh-video/CN3 - Thủ Đức2.jpg",
      "storage/anh-video/CN3 - Thủ Đức4.jpg",
      "storage/anh-video/CN3 - Thủ Đức5.jpg",
      "storage/anh-video/CN3 - Thủ Đức7.jpg",
    ]),
    videoUrl: cdnImage("storage/anh-video/CN3%20-%20Thủ%20Đức%20-%20Món%20ăn16.mp4"),
  },
  {
    id: "cn4",
    badge: "CN4",
    name: "Chi Nhánh 4 - COMING SOON",
    shortName: "Coming Soon",
    address: "Sắp khai trương chi nhánh mới (Coming Soon)",
    mapKey: "cn4",
    hours: "Coming Soon",
    capacity: "Sắp ra mắt không gian mới rực rỡ",
    thumbnail: cdnImage("storage/mon-an/a%20(20).jpg"),
    images: [],
    comingSoon: true,
  },
  {
    id: "cn5",
    badge: "CN5",
    name: "Chi Nhánh 5 - Quận 7",
    shortName: "Quận 7",
    address: "583 Lê Văn Lương, P. Tân Hưng, Quận 7, TP.HCM",
    mapKey: "cn5",
    hours: "16:00 - 04:00 Sáng (Mỗi ngày)",
    capacity: "Sức chứa hơn 200 khách (Sân vườn & Không gian thoáng mát)",
    thumbnail: cdnImage("storage/anh-video/CN5%201.jpg"),
    images: galleryFromPaths([
      "storage/anh-video/CN5 1.jpg",
      "storage/anh-video/CN5 11.jpg",
      "storage/anh-video/CN5 12.jpg",
      "storage/anh-video/CN5 13.jpg",
      "storage/anh-video/CN5 14.jpg",
      "storage/anh-video/CN5 15.jpg",
      "storage/anh-video/CN5 16.jpg",
      "storage/anh-video/CN5 17.jpg",
    ]),
    videoUrl: cdnImage("storage/anh-video/CN5%2010.mp4"),
  },
];

export type BranchOption = {
  id: string;
  label: string;
  disabled?: boolean;
};

export const branchOptions: BranchOption[] = branches.map((branch) => ({
  id: branch.id,
  label: `${branch.badge}: ${branch.address}`,
  disabled: branch.comingSoon,
}));

export const guestCountOptions = [
  { value: "1-2", label: "1 - 2 người" },
  { value: "3-5", label: "3 - 5 người" },
  { value: "6-10", label: "6 - 10 người" },
  { value: "10+", label: "Tiệc nhóm (trên 10 người)" },
] as const;
