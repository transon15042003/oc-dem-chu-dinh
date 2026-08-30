# Tin tức & Khuyến mãi

**Đường dẫn:** `/admin/articles` · `/admin/promotions`  
**Ai dùng:** Editor, Admin  
**Tần suất:** Theo chiến dịch marketing

## Mục tiêu

- **Tin tức** → hiển thị tại `/tin-tuc` (bài viết, mẹo ẩm thực, tin nhà hàng)
- **Khuyến mãi** → hiển thị tại `/khuyen-mai` (ưu đãi có thời hạn, mã giảm giá)

## Tin tức (`/admin/articles`)

### Viết bài mới

1. Nhấn **Viết bài mới**
2. Điền:
   - **Tiêu đề** — hiển thị trên website
   - **Slug** — đường dẫn URL (tự sinh từ tiêu đề, có thể sửa)
   - **Tóm tắt** — mô tả ngắn trên danh sách
   - **Danh mục** — Khuyến Mãi & Ưu Đãi / Tin Tức Nhà Hàng / Bí Quyết Ẩm Thực
   - **Ảnh bìa** — upload (tối đa 2MB)
   - **Nội dung** — soạn trong trình soạn thảo (chữ đậm, heading, danh sách, ảnh, link)
3. Chọn trạng thái:
   - **Nháp** — chỉ admin thấy, chưa lên web
   - **Xuất bản** — hiện trên `/tin-tuc`
4. Tab **Xem trước** — kiểm tra giao diện trước khi xuất bản
5. **Lưu**

### Sửa / xóa bài

Danh sách bài → chọn bài → **Sửa** hoặc **Xóa**

## Khuyến mãi (`/admin/promotions`)

Quy trình tương tự tin tức, thêm các trường:

| Trường | Ý nghĩa |
|--------|---------|
| **Bắt đầu / Kết thúc** | Thời gian chương trình |
| **Nhãn giảm giá** | Text hiển thị (vd. *Giảm 20%*) |
| **Mã khuyến mãi** | Mã khách dùng khi đến quán (nếu có) |

**Hết hạn tự ẩn:** Khuyến mãi quá ngày kết thúc sẽ **tự biến mất** khỏi trang `/khuyen-mai` — không cần xóa thủ công.

## Lưu ý thường gặp

| Tình huống | Cách xử lý |
|------------|------------|
| Bài nháp không thấy trên web | Đổi trạng thái sang **Xuất bản** và lưu |
| Ảnh không upload được | Kiểm tra file ≤ 2MB; thử định dạng JPG/PNG/WebP |
| Khuyến mãi vẫn hiện dù đã hết | Kiểm tra ngày **Kết thúc** — phải qua ngày hiện tại mới ẩn |
| Muốn ghim bài nổi bật | Đánh dấu **Nổi bật** (nếu có) khi sửa bài |

## Trang public

- Danh sách tin: `https://ocdemchudinh.vercel.app/tin-tuc`
- Danh sách KM: `https://ocdemchudinh.vercel.app/khuyen-mai`
