import { z } from "zod";

export const bookingFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Vui lòng nhập họ và tên")
    .max(100, "Họ và tên quá dài"),
  phone: z
    .string()
    .min(9, "Số điện thoại không hợp lệ")
    .max(15, "Số điện thoại không hợp lệ")
    .regex(/^[0-9+\s.-]+$/, "Số điện thoại không hợp lệ"),
  guestCount: z.string().min(1, "Vui lòng chọn số lượng khách"),
  branchId: z.string().min(1, "Vui lòng chọn chi nhánh"),
  date: z.string().min(1, "Vui lòng chọn ngày đặt"),
  time: z.string().min(1, "Vui lòng chọn giờ đặt"),
  note: z.string().max(500, "Ghi chú tối đa 500 ký tự").optional(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
