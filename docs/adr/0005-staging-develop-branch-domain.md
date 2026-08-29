# Staging `develop` qua Vercel branch domain (mô hình A)

Chúng tôi dùng **một** Vercel project, production branch `main`, staging cố định qua **branch domain** của nhánh `develop` — không tạo project Vercel thứ hai.

**Staging URL (Vercel):** `https://oc-dem-chu-dinh-git-develop-tran-sons-projects-703bf65b.vercel.app`  
**Custom domain (khi có):** `staging.<domain-chủ-quán>` gắn Git branch `develop`.

**Quyết định phiên grill 2026-08-29:**
- Đối tượng staging: chỉ dev (không gửi chủ quán)
- Supabase: chung 1 project với production
- Form email trên staging: gửi email thật (cùng Resend env Preview)
- `NEXT_PUBLIC_SITE_URL` Preview = URL staging (SEO/OG đúng trên staging)

**Considered options:** (2) Project Vercel riêng cho staging — từ chối vì solo dev, duplicate env. (3) Chỉ preview URL từng PR — từ chối vì không có URL cố định cho `develop`.

**Ngày chốt:** 2026-08-29
