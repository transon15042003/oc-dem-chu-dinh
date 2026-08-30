# Supabase — Ốc Đêm Chú Đỉnh v2

**Project:** `oc-dem-chu-dinh`  
**Ref:** `ianpabkxuzjnksrgsvtr`  
**Region:** `ap-southeast-1`  
**URL:** https://ianpabkxuzjnksrgsvtr.supabase.co  
**Dashboard:** https://supabase.com/dashboard/project/ianpabkxuzjnksrgsvtr

> Ảnh tĩnh site gốc (bucket `site-assets`): xem [`IMAGES.md`](./IMAGES.md) · ADR: [`adr/0006-site-assets-supabase-storage.md`](./adr/0006-site-assets-supabase-storage.md)

## Admin đầu tiên ✅

| Field | Giá trị |
|-------|---------|
| Email | `transon15042003@gmail.com` |
| Role | `admin` |
| Đăng nhập | `/admin/login` |

> Tài khoản đã được tạo và xác nhận email qua Supabase MCP. Đổi mật khẩu sau lần đăng nhập đầu nếu cần.

## Env (Vercel + local)

| Biến | Bắt buộc | Ghi chú |
|------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | anon / legacy JWT key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ server | Form đặt bàn / đặt tiệc / tuyển dụng (insert DB). **Không** commit; lấy: `npx supabase projects api-keys --project-ref ianpabkxuzjnksrgsvtr` |

## Tạo user mới (marketing)

1. Đăng nhập admin → `/admin/users`
2. Điền form → server action gọi **Supabase Admin API** (`auth.admin.createUser`) với `SUPABASE_SERVICE_ROLE_KEY`
3. Sau khi tạo, cập nhật `profiles.role` và `full_name`

> **Lưu ý:** Thiếu `SUPABASE_SERVICE_ROLE_KEY` trên Vercel → không tạo được tài khoản mới (form báo lỗi cấu hình).

## Migrations

| File | Mô tả |
|------|--------|
| `*_v2_content_system.sql` | Schema v2.0 |
| `*_bootstrap_admin_user.sql` | Promote admin đầu tiên |
| `*_admin_create_user_rpc.sql` | RPC legacy (đã vá token columns); app dùng Admin API |
| `*_seed_articles_from_original_site.sql` | Seed 6 bài tin tức từ site gốc (idempotent) |

### Chạy seed articles (local / remote)

```bash
npx supabase db push
# hoặc apply file migration trên Supabase Dashboard → SQL Editor
```
