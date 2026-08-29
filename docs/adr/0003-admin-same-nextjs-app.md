# Admin panel tại `/admin` trong cùng Next.js app

Panel nội bộ (CRUD Article, Promotion, sau này xem đơn) chạy tại route `/admin/*` trong cùng codebase và cùng deployment Vercel với site public. Middleware Next.js kiểm tra Supabase session trước khi vào admin; layout admin tách khỏi `SiteLayout` (không header/footer marketing).

**Considered options:** (1) Subdomain `admin.*` — từ chối vì thêm cấu hình DNS/deploy cho team nhỏ. (2) App Next.js riêng — từ chối vì duplicate auth, types, và component UI.

**Hệ quả:** `src/app/admin/` với route group; public routes không load admin bundle nặng (code-split Tiptap chỉ trong admin). Cookie/session Supabase dùng chung domain production.

**Ngày chốt:** 2026-08-29 (phiên `/grill-with-docs`)
