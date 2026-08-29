import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Vui lòng nhập họ và tên")
    .max(100, "Họ và tên quá dài"),
  phone: z
    .string()
    .min(9, "Số điện thoại không hợp lệ")
    .max(15, "Số điện thoại không hợp lệ")
    .regex(/^[0-9+\s.-]+$/, "Số điện thoại không hợp lệ"),
  email: z.union([
    z.string().email("Email không hợp lệ"),
    z.literal(""),
  ]),
  subject: z
    .string()
    .min(3, "Vui lòng nhập tiêu đề")
    .max(150, "Tiêu đề quá dài"),
  message: z
    .string()
    .min(10, "Nội dung tối thiểu 10 ký tự")
    .max(1000, "Nội dung tối đa 1000 ký tự"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
