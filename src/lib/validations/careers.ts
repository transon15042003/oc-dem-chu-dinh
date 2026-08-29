import { z } from "zod";

import { careerPositionOptions } from "@/data/careers";

const positionValues = careerPositionOptions.map((item) => item.value) as [
  (typeof careerPositionOptions)[number]["value"],
  ...(typeof careerPositionOptions)[number]["value"][],
];

export const careerApplicationFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Vui lòng nhập họ và tên")
    .max(100, "Họ và tên quá dài"),
  phone: z
    .string()
    .min(9, "Số điện thoại không hợp lệ")
    .max(15, "Số điện thoại không hợp lệ")
    .regex(/^[0-9+\s.-]+$/, "Số điện thoại không hợp lệ"),
  position: z.enum(positionValues, { message: "Vui lòng chọn vị trí ứng tuyển" }),
  branchId: z.string().min(1, "Vui lòng chọn chi nhánh"),
  email: z.union([z.string().email("Email không hợp lệ"), z.literal("")]),
  experience: z.string().max(1000, "Ghi chú tối đa 1000 ký tự").optional(),
});

export type CareerApplicationFormValues = z.infer<typeof careerApplicationFormSchema>;
