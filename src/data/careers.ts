export type CareerPositionId =
  | "phuc-vu-fulltime"
  | "phuc-vu-parttime"
  | "tiep-thuc"
  | "thu-ngan"
  | "phu-bep"
  | "giu-xe"
  | "to-truong-ca";

export type CareerJob = {
  id: CareerPositionId;
  badge: string;
  incomeLabel: string;
  title: string;
  description: string;
  schedule: string;
  salary: string;
  perks: string[];
};

export const careerJobs: CareerJob[] = [
  {
    id: "phuc-vu-fulltime",
    badge: "FULL-TIME",
    incomeLabel: "Thu nhập: 12 - 15 Triệu/tháng",
    title: "Nhân viên Phục vụ (Full-time)",
    description:
      "Đón tiếp khách hàng, tư vấn menu món ăn, bưng bê món ăn & hỗ trợ dọn dẹp bàn tiệc chu đáo.",
    schedule: "14h30 - Hết khách",
    salary: "7 - 9 triệu (Năng lực + Tip)",
    perks: [
      "Cơ hội thăng tiến Tổ trưởng, Quản lý chi nhánh",
      "Bao ăn 2 bữa/ngày đầy đủ dinh dưỡng",
      "Hưởng tiền Tip, Booking, Thưởng Lễ & Thưởng doanh thu",
    ],
  },
  {
    id: "phuc-vu-parttime",
    badge: "PART-TIME (2 CA)",
    incomeLabel: "Thu nhập: 5 - 8 Triệu/tháng",
    title: "Nhân viên Phục vụ (Part-time)",
    description:
      "Phục vụ bàn ăn theo ca linh hoạt, phù hợp học sinh sinh viên làm thêm thu nhập đêm.",
    schedule: "Ca 1: 14h30 - 00h00 | Ca 2: 16h00 - Hết khách",
    salary: "5 - 8 triệu (Năng lực + Tip)",
    perks: [
      "Xoay ca linh hoạt theo lịch học",
      "Bao ăn bữa theo ca làm",
      "Nhận tiền tip & thưởng thành tích đầy đủ",
    ],
  },
  {
    id: "tiep-thuc",
    badge: "SỐ LƯỢNG 2 NAM/NỮ",
    incomeLabel: "Thu nhập: 6 - 8 Triệu/tháng",
    title: "Vị trí Tiếp thực",
    description:
      "Bao quát món ăn từ bếp ra bàn, hỗ trợ tiếp nhận món & bưng đồ cho nhân viên phục vụ nhanh chóng.",
    schedule: "17h00 - Hết khách",
    salary: "6 - 8 triệu (Năng lực + Tip)",
    perks: [
      "Môi trường làm việc nhanh nhẹn, hòa đồng",
      "Bao ăn bữa tối",
      "Hưởng đầy đủ tiền Tip & thưởng doanh thu",
    ],
  },
];

export const careerPositionOptions: Array<{ value: CareerPositionId; label: string }> = [
  { value: "phuc-vu-fulltime", label: "Nhân viên Phục vụ (Ca sáng / Ca tối / Full-time)" },
  { value: "phuc-vu-parttime", label: "Nhân viên Phục vụ (Part-time)" },
  { value: "tiep-thuc", label: "Vị trí Tiếp thực" },
  { value: "thu-ngan", label: "Nhân viên Thu ngân" },
  { value: "phu-bep", label: "Phụ bếp / Đầu bếp Ốc Nướng" },
  { value: "giu-xe", label: "Nhân viên Giữ xe / Bảo vệ" },
  { value: "to-truong-ca", label: "Tổ trưởng Ca / Tạp vụ" },
];

export function getCareerPositionLabel(position: CareerPositionId): string {
  return careerPositionOptions.find((item) => item.value === position)?.label ?? position;
}

export const careerBenefits = [
  "Cơ hội thăng tiến tổ trưởng, quản lý chi nhánh",
  "Môi trường làm việc đoàn kết vui vẻ",
  "Bao ăn 2 bữa/ngày",
  "Tip, booking, thưởng lễ, thưởng doanh thu",
];

export const careerRequirements = [
  "Siêng năng, trung thực, chịu khó",
  "Có trách nhiệm trong công việc",
  "Ưu tiên có kinh nghiệm quán nhậu",
];

export const careerInterviewAddress = "202 đường số 8, P.11, Gò Vấp, TP.HCM";
