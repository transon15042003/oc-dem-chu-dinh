# Nhân viên (quản lý tài khoản)

**Đường dẫn:** `/admin/users`  
**Ai dùng:** **Admin only** — không dành cho Editor  
**Tần suất:** Khi có nhân viên marketing mới cần tài khoản

## Mục tiêu

Tạo tài khoản đăng nhập admin cho nhân viên nội bộ (marketing, quản lý chi nhánh).

## Tạo tài khoản mới

1. Đăng nhập bằng tài khoản **Admin**
2. Vào `/admin/users`
3. Điền form:
   - **Email** — dùng để đăng nhập
   - **Mật khẩu** — cấp cho nhân viên (nên đổi sau lần đầu)
   - **Tên hiển thị**
   - **Vai trò:**
     - `editor` — tin tức, khuyến mãi, đặt chỗ, menu, tuyển dụng
     - `admin` — thêm quyền quản lý nhân viên
4. **Tạo tài khoản**

Nhân viên đăng nhập tại `/admin/login` bằng email và mật khẩu vừa cấp.

## Đổi vai trò

Từ danh sách nhân viên → chọn người cần sửa → đổi role → lưu.

## Lưu ý bảo mật

| Quy tắc | Lý do |
|---------|-------|
| Chỉ cấp role **Admin** cho người tin cậy | Admin có thể tạo/xóa tài khoản khác |
| Dùng mật khẩu mạnh | Tài khoản truy cập dữ liệu khách hàng |
| Không chia sẻ tài khoản | Mỗi người một email riêng |
| Đổi mật khẩu định kỳ | Giảm rủi ro lộ tài khoản |

## Khi cần admin kỹ thuật

- Quên mật khẩu admin cuối cùng
- Khóa / xóa tài khoản lạ
- Lỗi *"Không có quyền"* dù đã đăng nhập

Liên hệ dev quản lý Supabase project.
