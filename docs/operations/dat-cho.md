# Đặt chỗ — Đặt bàn & Đặt tiệc

**Đường dẫn:** `/admin/bookings`  
**Ai dùng:** Editor, Admin  
**Tần suất:** Hàng ngày

## Mục tiêu

Xem và xử lý yêu cầu khách gửi từ website:

- **Đặt bàn** — form trên trang chủ (chọn chi nhánh, ngày, giờ, số người)
- **Đặt tiệc** — form đặt tiệc sự kiện (sinh nhật, thôi nôi, tất niên…)

Mỗi yêu cầu gửi **email thông báo** đồng thời lưu trên hệ thống.

## Các bước

### 1. Mở trang Đặt chỗ

Menu admin → **Đặt chỗ**

Số **chưa xử lý** hiển thị ngay dưới tiêu đề trang.

### 2. Chọn loại yêu cầu

Tab phía trên danh sách:

| Tab | Nội dung |
|-----|----------|
| **Tất cả** | Cả đặt bàn và đặt tiệc |
| **Đặt bàn** | Chỉ yêu cầu đặt bàn |
| **Đặt tiệc** | Chỉ yêu cầu đặt tiệc |

### 3. Lọc danh sách

- **Trạng thái:** Chưa xử lý / Đã xử lý
- **Chi nhánh:** Lọc theo chi nhánh (đặt bàn)
- **Tìm kiếm:** Tên, số điện thoại, ghi chú

### 4. Xử lý yêu cầu

1. Đọc thông tin khách (tên, SĐT, ngày giờ, ghi chú)
2. Liên hệ khách qua điện thoại / Zalo theo quy trình quán
3. Nhấn **Đã xử lý** khi đã xong
4. Nếu cần xem lại sau, nhấn **Mở lại** để đưa về *Chưa xử lý*

## Lưu ý thường gặp

| Tình huống | Cách xử lý |
|------------|------------|
| Khách báo đã đặt nhưng admin không thấy | Kiểm tra tab đúng loại; thử tìm theo SĐT. Nếu vẫn không có — báo admin kỹ thuật (có thể thiếu cấu hình server). |
| Email nhận được nhưng admin trống | Form vẫn gửi email khi server chưa lưu DB. Báo admin kỹ thuật kiểm tra cấu hình Vercel. |
| Đặt bàn vs đặt tiệc khác nhau thế nào? | Đặt bàn: ăn tối thông thường. Đặt tiệc: sự kiện có quy mô lớn hơn, có loại tiệc và dịch vụ kèm. |

## Trang public tương ứng

- Form đặt bàn: trang chủ, mục đặt bàn
- Form đặt tiệc: trang chủ / trang dịch vụ đặt tiệc

Khách **không** gửi qua admin — chỉ qua form trên website.
