import { z } from "zod";

import { eventTypeOptions } from "@/data/event-booking";

const eventTypeValues = eventTypeOptions.map((item) => item.value) as [
  (typeof eventTypeOptions)[number]["value"],
  ...(typeof eventTypeOptions)[number]["value"][],
];

export const eventBookingFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Vui lòng nhập họ và tên")
    .max(100, "Họ và tên quá dài"),
  phone: z
    .string()
    .min(9, "Số điện thoại không hợp lệ")
    .max(15, "Số điện thoại không hợp lệ")
    .regex(/^[0-9+\s.-]+$/, "Số điện thoại không hợp lệ"),
  eventType: z.enum(eventTypeValues, { message: "Vui lòng chọn loại tiệc" }),
  guestCount: z.string().min(1, "Vui lòng chọn số lượng khách"),
  branchId: z.string().min(1, "Vui lòng chọn chi nhánh"),
  date: z.string().min(1, "Vui lòng chọn ngày tổ chức"),
  time: z.string().min(1, "Vui lòng chọn giờ tổ chức"),
  companyName: z.string().max(200, "Tên công ty quá dài").optional(),
  note: z.string().max(500, "Ghi chú tối đa 500 ký tự").optional(),
});

export type EventBookingFormValues = z.infer<typeof eventBookingFormSchema>;
