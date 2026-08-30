export const messages = {
  common: {
    bookNow: "Đặt bàn ngay",
    hotline: "Hotline",
    contact: "Liên hệ",
    branches: "Chi nhánh",
    menu: "Thực đơn",
    news: "Tin tức",
    promotions: "Khuyến mãi",
    careers: "Tuyển dụng",
  },
  admin: {
    dashboard: "Tổng quan",
    bookings: "Đặt chỗ",
    staff: "Nhân viên",
    profile: "Quản lý hồ sơ",
    exportCsv: "Xuất CSV",
  },
} as const;

export type Messages = typeof messages;

export function t(path: string): string {
  const segments = path.split(".");
  let current: unknown = messages;

  for (const segment of segments) {
    if (typeof current !== "object" || current === null || !(segment in current)) {
      return path;
    }
    current = (current as Record<string, unknown>)[segment];
  }

  return typeof current === "string" ? current : path;
}
