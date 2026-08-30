# Tài liệu dự án — Ốc Đêm Chú Đỉnh

Mục lục trung tâm cho developer và AI tiếp tục phát triển.

## Bắt đầu nhanh

| Tài liệu | Nội dung |
|----------|----------|
| [`../README.md`](../README.md) | Clone repo, env tối thiểu, chạy local |
| [`../CONTEXT.md`](../CONTEXT.md) | Thuật ngữ domain (glossary) |
| [`ROADMAP.md`](./ROADMAP.md) | Lịch sử quyết định, milestones, ghi chú cho phiên dev sau |

## Vận hành (chủ quán / marketing)

| Tài liệu | Nội dung |
|----------|----------|
| [`operations/README.md`](./operations/README.md) | Đăng nhập admin, phân quyền, mục lục hướng dẫn |
| [`operations/dat-cho.md`](./operations/dat-cho.md) | Xử lý đặt bàn + đặt tiệc |
| [`operations/tin-tuc-khuyen-mai.md`](./operations/tin-tuc-khuyen-mai.md) | Viết tin tức và khuyến mãi |
| [`operations/thuc-don.md`](./operations/thuc-don.md) | Quản lý danh mục và món ăn |
| [`operations/tuyen-dung.md`](./operations/tuyen-dung.md) | Vị trí tuyển dụng và hồ sơ ứng viên |
| [`operations/nhan-vien.md`](./operations/nhan-vien.md) | Tạo tài khoản nội bộ (admin only) |

## Kỹ thuật

| Tài liệu | Nội dung |
|----------|----------|
| [`GITFLOW.md`](./GITFLOW.md) | Git Flow, branch, PR, CI |
| [`DEPLOY.md`](./DEPLOY.md) | Vercel production / staging / preview |
| [`SUPABASE.md`](./SUPABASE.md) | Project Supabase, env, migrations, tạo user |
| [`IMAGES.md`](./IMAGES.md) | Ảnh tĩnh `site-assets`, flag env, troubleshooting |
| [`adr/`](./adr/) | Architectural Decision Records |

## ADR (quyết định kiến trúc)

| # | Tiêu đề |
|---|---------|
| [0001](./adr/0001-branch-protection.md) | Branch protection |
| [0002](./adr/0002-supabase-content-backend.md) | Supabase làm content backend v2 |
| [0003](./adr/0003-admin-same-nextjs-app.md) | Admin trong cùng Next.js app |
| [0004](./adr/0004-content-schema-and-expiry.md) | Schema content + auto-hide promotion hết hạn |
| [0005](./adr/0005-staging-develop-branch-domain.md) | Staging qua branch domain `develop` |
| [0006](./adr/0006-site-assets-supabase-storage.md) | Ảnh tĩnh site gốc trên Supabase Storage |

> Cập nhật tài liệu: phiên `/grill-with-docs` 2026-08-31.
