# Ảnh tĩnh — `site-assets`

> Quyết định kiến trúc: [ADR-0006](./adr/0006-site-assets-supabase-storage.md)  
> Supabase project: [`SUPABASE.md`](./SUPABASE.md)

## Tổng quan

Ảnh tĩnh từ site gốc (logo, gallery không gian, ảnh món, thumbnail chi nhánh) được lưu trên Supabase bucket **`site-assets`**. Code gọi qua `cdnImage()` trong `src/lib/images.ts`.

| Chế độ | Flag | URL ảnh |
|--------|------|---------|
| Local / dev | `NEXT_PUBLIC_USE_SUPABASE_ASSETS=false` | CDN gốc hoặc `public/` |
| Production Vercel | `NEXT_PUBLIC_USE_SUPABASE_ASSETS=true` | Supabase public URL |

## Cấu trúc

```
scripts/
├── asset-key-map.json      # Map path gốc → key slug trên Supabase
├── site-asset-manifest.txt # Danh sách file đã migrate
└── migrate-site-images.mjs # Script upload (chạy một lần / khi thêm ảnh mới)

src/lib/images.ts           # cdnImage(), decode path, resolve URL
```

Bucket path mẫu: `storage/anh-video/cn1-go-vap1.jpg`, `storage/mon-an/a (13).jpg`.

## Quy tắc webp vs jpg

Không phải ảnh nào cũng có variant `_400-400.webp` hoặc `_600-600.webp` trên Supabase.

| Khu vực | Quy tắc |
|---------|---------|
| Menu món (`storage/mon-an/`) | Thường chỉ có JPG — `buildMenuImageUrls()` chỉ dùng webp nếu key có trong `asset-key-map.json` |
| Gallery / chi nhánh | Dùng JPG khi variant webp không tồn tại |
| Món khuyên dùng (`storage/anh-video/`) | Có thể có cả JPG và webp thumb |

## Env

```env
NEXT_PUBLIC_USE_SUPABASE_ASSETS=true   # Bật trên Vercel Production (+ Preview nếu cần test ảnh)
NEXT_PUBLIC_SUPABASE_URL=              # Bắt buộc khi bật flag trên
```

## Lỗi thường gặp

### Ảnh 400 Bad Request trên Supabase

**Nguyên nhân:** Path bị **double-encode** (`%2520` thay vì `%20`) — thường khi data file đã encode sẵn `%20` trong tên thư mục.

**Cách xử lý:** `decodeAssetPath()` trong `images.ts` decode một lần trước khi tra `asset-key-map`. Nếu thêm path mới, đảm bảo key trong JSON khớp path đã decode.

### Ảnh menu/gallery chỉ một phần hiển thị

**Nguyên nhân:** Code tham chiếu variant webp chưa migrate.

**Cách xử lý:** Kiểm tra file có trên Supabase Dashboard → Storage → `site-assets`. Nếu chỉ có JPG, cập nhật data/code dùng `.jpg` hoặc chạy lại migrate với variant webp.

### Ảnh local OK, production hỏng

**Nguyên nhân:** `NEXT_PUBLIC_USE_SUPABASE_ASSETS` chưa bật trên Vercel, hoặc thiếu `NEXT_PUBLIC_SUPABASE_URL`.

**Cách xử lý:** Vercel → Settings → Environment Variables → bật flag cho Production (và Preview nếu cần).

## Thêm ảnh mới

1. Upload lên bucket `site-assets` (Dashboard hoặc `migrate-site-images.mjs`)
2. Thêm mapping vào `scripts/asset-key-map.json` nếu tên file có ký tự đặc biệt / cần slug
3. Tham chiếu path tương đối trong `src/data/` hoặc menu DB
4. Chạy `npm test -- src/lib/images.test.ts` nếu sửa logic URL

## Bucket khác: `content-images`

Ảnh do marketing upload qua admin (cover bài viết, khuyến mãi) dùng bucket **`content-images`** — không nhầm với `site-assets`. Xem [`SUPABASE.md`](./SUPABASE.md).
