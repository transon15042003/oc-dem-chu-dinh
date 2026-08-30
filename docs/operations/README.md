# Hướng dẫn vận hành Admin

Tài liệu dành cho **chủ quán** và **marketing** — không cần biết Git hay lập trình.

## Đăng nhập

1. Mở trình duyệt (Chrome, Safari, Cốc Cốc…)
2. Vào địa chỉ admin: **`https://ocdemchudinh.vercel.app/admin/login`**
3. Nhập email và mật khẩu do quản trị viên cấp
4. Sau khi đăng nhập, menu trên cùng hiển thị các mục quản lý

> Nếu quên mật khẩu, liên hệ **admin kỹ thuật** (mục [Nhân viên](./nhan-vien.md)) — không tự reset qua website public.

## Phân quyền

| Vai trò | Làm được gì |
|---------|-------------|
| **Editor** | Tin tức, khuyến mãi, đặt chỗ, tuyển dụng, thực đơn |
| **Admin** | Tất cả quyền Editor + tạo/sửa tài khoản nhân viên |

## Menu admin

| Mục | Đường dẫn | Hướng dẫn |
|-----|-----------|-----------|
| Tổng quan | `/admin` | Dashboard tóm tắt |
| Tin tức | `/admin/articles` | [tin-tuc-khuyen-mai.md](./tin-tuc-khuyen-mai.md) |
| Khuyến mãi | `/admin/promotions` | [tin-tuc-khuyen-mai.md](./tin-tuc-khuyen-mai.md) |
| Đặt chỗ | `/admin/bookings` | [dat-cho.md](./dat-cho.md) |
| Tuyển dụng | `/admin/careers` | [tuyen-dung.md](./tuyen-dung.md) |
| Thực đơn | `/admin/menu` | [thuc-don.md](./thuc-don.md) |
| Nhân viên | `/admin/users` | [nhan-vien.md](./nhan-vien.md) *(chỉ Admin)* |

## Thứ tự đọc đề xuất

1. [Đặt chỗ](./dat-cho.md) — dùng hàng ngày
2. [Tin tức & Khuyến mãi](./tin-tuc-khuyen-mai.md) — cập nhật nội dung marketing
3. [Thực đơn](./thuc-don.md) — khi đổi món hoặc ảnh
4. [Tuyển dụng](./tuyen-dung.md) — theo mùa tuyển
5. [Nhân viên](./nhan-vien.md) — khi có người mới cần tài khoản

## Lưu ý chung

- **Nháp vs Xuất bản:** Nội dung ở trạng thái *Nháp* không hiện trên website. Chỉ *Xuất bản* mới hiện với khách.
- **Ảnh upload:** Tối đa **2MB** mỗi file (tin tức, khuyến mãi). Ảnh món trong thực đơn hiện dùng đường dẫn có sẵn — xem [thuc-don.md](./thuc-don.md).
- **Đăng xuất:** Nút tài khoản góc phải trên thanh menu admin.
