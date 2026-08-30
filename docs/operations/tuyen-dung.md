# Tuyển dụng

**Đường dẫn:** `/admin/careers` · `/admin/career-applications`  
**Ai dùng:** Editor, Admin  
**Tần suất:** Theo đợt tuyển dụng

## Mục tiêu

- Đăng **vị trí tuyển dụng** lên trang `/tuyen-dung`
- Xem **hồ sơ ứng viên** gửi qua form website

## Vị trí tuyển dụng (`/admin/careers`)

### Tạo vị trí mới

1. Nhấn **Thêm vị trí**
2. Điền:
   - **Tiêu đề** — tên vị trí (vd. *Nhân viên phục vụ*)
   - **Slug** — đường dẫn URL
   - **Mô tả công việc** — soạn trong trình soạn thảo
   - **Địa điểm / chi nhánh** (nếu có)
   - **Trạng thái:** Nháp hoặc Xuất bản
3. **Lưu**

### Hiển thị trên website

| Trạng thái vị trí | Khách thấy gì |
|-------------------|---------------|
| **Xuất bản** | Thẻ vị trí + form ứng tuyển trên `/tuyen-dung` |
| **Nháp** | Không hiển thị |

Có thể bật chế độ **chỉ hiện form** (không hiện thẻ vị trí) tùy cấu hình từng vị trí.

## Hồ sơ ứng viên (`/admin/career-applications`)

1. Vào `/admin/careers` → nút **Hồ sơ ứng viên**, hoặc trực tiếp `/admin/career-applications`
2. Xem danh sách đơn gửi từ form `/tuyen-dung`
3. Mỗi hồ sơ gồm: họ tên, SĐT, email, vị trí ứng tuyển, ghi chú

Đồng thời hệ thống gửi **email thông báo** khi có đơn mới.

### Xử lý hồ sơ

1. Đọc thông tin ứng viên
2. Liên hệ qua SĐT / email
3. Không cần đánh dấu trạng thái trên hệ thống (khác với Đặt chỗ) — quản lý theo quy trình nội bộ

## Lưu ý thường gặp

| Tình huống | Cách xử lý |
|------------|------------|
| Hết đợt tuyển | Đổi vị trí sang **Nháp** hoặc xóa |
| Ứng viên gửi form nhưng admin không thấy | Báo admin kỹ thuật (tương tự Đặt chỗ — có thể thiếu cấu hình server) |
| Muốn đổi nội dung form ứng tuyển | Sửa mô tả vị trí; trường form cố định — đổi lớn cần dev |

## Trang public

`https://ocdemchudinh.vercel.app/tuyen-dung`
