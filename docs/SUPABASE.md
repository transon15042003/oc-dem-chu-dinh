# Supabase — Ốc Đêm Chú Đỉnh v2

**Project:** `oc-dem-chu-dinh`  
**Ref:** `ianpabkxuzjnksrgsvtr`  
**Region:** `ap-southeast-1`  
**URL:** https://ianpabkxuzjnksrgsvtr.supabase.co  
**Dashboard:** https://supabase.com/dashboard/project/ianpabkxuzjnksrgsvtr

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
| `SUPABASE_SERVICE_ROLE_KEY` | ❌ | Không cần cho `/admin/users` (dùng RPC `admin_create_user`) |

## Tạo user mới (marketing)

1. Đăng nhập admin → `/admin/users`
2. Điền form → gọi RPC `admin_create_user` (chỉ role `admin`)

## Migrations

| File | Mô tả |
|------|--------|
| `*_v2_content_system.sql` | Schema v2.0 |
| `*_bootstrap_admin_user.sql` | Promote admin đầu tiên |
| `*_admin_create_user_rpc.sql` | RPC tạo user không cần service role |
