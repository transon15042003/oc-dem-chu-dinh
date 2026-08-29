# Supabase làm content backend cho v2

v2 cần marketing tự cập nhật Article và Promotion qua UI — không qua Git/MDX. Chúng tôi chọn **Supabase** (PostgreSQL + Auth + Storage + RLS) thay vì headless CMS (Sanity, Contentful) vì: một stack cho content (v2.0), Event Booking DB (v2.1), và mở rộng reservation/menu sau; chi phí hobby đủ cho chuỗi nhà hàng; team nhỏ không cần thêm vendor CMS.

**Considered options:** (1) MDX trong repo — từ chối vì marketing không commit Git. (2) Sanity/Contentful — từ chối vì thêm billing, schema riêng, và Event Booking vẫn cần DB riêng. (3) Prisma + Postgres tự host — từ chối vì phải tự lo auth, storage, admin API.

**Hệ quả:** Env `NEXT_PUBLIC_SUPABASE_*` + `SUPABASE_SERVICE_ROLE_KEY`; migrations trong repo; RLS bắt buộc trước khi production. Project Supabase **mới**, tách khỏi project khác (nếu có).

**Ngày chốt:** 2026-08-29 (phiên `/grill-with-docs`)
