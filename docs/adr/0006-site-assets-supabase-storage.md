# Ảnh tĩnh site gốc trên Supabase Storage (`site-assets`)

Site clone ban đầu phục thuộc CDN site gốc (`ocdemchudinh.hgdigital.vn`) và thư mục `public/`. Để production trên Vercel không phụ thuộc CDN bên thứ ba, chúng tôi migrate ~77 ảnh tĩnh (logo, gallery, ảnh món, chi nhánh) lên bucket Supabase `site-assets`, bật qua flag `NEXT_PUBLIC_USE_SUPABASE_ASSETS=true`.

**Lựa chọn đã xem xét:** (1) Giữ CDN gốc — từ chối vì không kiểm soát được khi site gốc thay đổi/xóa. (2) Chỉ dùng `public/` trên Vercel — từ chối vì repo nặng và khó đồng bộ với Supabase content images. (3) Bucket riêng `content-images` — dùng cho ảnh admin upload; `site-assets` tách cho ảnh migrate từ site gốc.

**Hệ quả:** Path ảnh trong code/data vẫn giữ dạng tương đối; `src/lib/images.ts` + `scripts/asset-key-map.json` map sang key Supabase. Chi tiết vận hành: [`docs/IMAGES.md`](../IMAGES.md).

**Ngày chốt:** 2026-08-31 (phiên `/grill-with-docs`; migrate hoàn tất trước đó trên production)
