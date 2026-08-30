# Thực đơn

**Đường dẫn:** `/admin/menu`  
**Ai dùng:** Editor, Admin  
**Tần suất:** Khi thêm/đổi món hoặc danh mục

## Mục tiêu

Quản lý thực đơn hiển thị tại `/thuc-don`: danh mục (Ốc, Sò, Lẩu…) và từng món ăn.

## Cấu trúc

```
Danh mục (Menu Category)
└── Món ăn (Menu Item) — thuộc một danh mục
```

Mỗi danh mục và món có trạng thái **Nháp** hoặc **Xuất bản**. Chỉ món *Xuất bản* trong danh mục *Xuất bản* mới hiện trên website.

## Quản lý danh mục

1. Vào `/admin/menu` → tab **Danh mục**
2. **Thêm danh mục:** tên, slug, mô tả, thứ tự sắp xếp, trạng thái
3. **Sửa / xóa:** từ danh sách danh mục

> **Không xóa** danh mục còn món bên trong — phải xóa hoặc chuyển món trước.

## Quản lý món ăn

1. Tab **Món ăn**
2. **Thêm món:** tên, slug, mô tả, danh mục, từ khóa tìm kiếm, trạng thái
3. Tùy chọn:
   - **Món hot** — hiển thị badge nổi bật
   - **Thứ tự** — sắp xếp trong danh mục
4. **Ảnh món:** nhập đường dẫn ảnh (path) — hiện **chưa** upload trực tiếp qua admin

### Ảnh món — lưu ý quan trọng

Ảnh món dùng đường dẫn có sẵn trên hệ thống (từ site gốc / Supabase), **không** upload file mới qua form admin.

| Việc cần làm | Ai làm |
|--------------|--------|
| Đổi ảnh món có sẵn | Chọn path đúng trong form (hoặc hỏi dev) |
| Thêm ảnh món hoàn toàn mới | Liên hệ **admin kỹ thuật** — cần upload lên storage và cập nhật path |

## Lọc danh sách

- Theo **danh mục**
- Theo **trạng thái** (nháp / xuất bản)
- Theo **món hot**
- **Tìm kiếm** theo tên

Số danh mục/món **nháp** hiển thị dưới tiêu đề trang.

## Lưu ý thường gặp

| Tình huống | Cách xử lý |
|------------|------------|
| Món không hiện trên web | Kiểm tra cả món **và** danh mục đều *Xuất bản* |
| Ảnh món bị hỏng | Path ảnh sai hoặc file chưa có trên server — báo admin kỹ thuật |
| Muốn đổi giá món | Tính năng giá chưa có trên admin — cần dev cập nhật |
| Wifi / poster thực đơn | Một số nội dung tĩnh (poster, mật khẩu wifi) do dev quản lý trong code |

## Trang public

`https://ocdemchudinh.vercel.app/thuc-don`
