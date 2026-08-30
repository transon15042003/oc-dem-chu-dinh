# Ốc Đêm Chú Đỉnh

Website marketing cho chuỗi nhà hàng [Ốc Đêm Chú Đỉnh](https://ocdemchudinh.hgdigital.vn/) — clone, vận hành qua admin nội bộ.

**Production:** https://ocdemchudinh.vercel.app

## Stack

| Layer                     | Công nghệ               |
| ------------------------- | ----------------------- |
| Framework                 | Next.js 16 (App Router) |
| Language                  | TypeScript              |
| Styling                   | Tailwind CSS v4         |
| UI                        | shadcn/ui               |
| Database + Auth + Storage | Supabase                |
| Email                     | Resend                  |
| Deploy                    | Vercel                  |

## Bắt đầu (developer)

```bash
cp .env.example .env.local
# Điền: hotline, email, Supabase, Resend, Maps...

npm install
npm run dev
```

Mở http://localhost:3000 · Admin: http://localhost:3000/admin/login

## Tài liệu

| Tài liệu                                 | Đối tượng                                   |
| ---------------------------------------- | ------------------------------------------- |
| [`docs/README.md`](./docs/README.md)     | **Mục lục trung tâm** — bắt đầu từ đây      |
| [`CONTEXT.md`](./CONTEXT.md)             | Thuật ngữ domain (glossary)                 |
| [`docs/ROADMAP.md`](./docs/ROADMAP.md)   | Roadmap, milestones, quyết định đã chốt     |
| [`docs/operations/`](./docs/operations/) | Hướng dẫn vận hành cho chủ quán / marketing |
| [`docs/GITFLOW.md`](./docs/GITFLOW.md)   | Git Flow, PR, CI                            |
| [`docs/DEPLOY.md`](./docs/DEPLOY.md)     | Vercel production / staging                 |
| [`docs/SUPABASE.md`](./docs/SUPABASE.md) | Supabase project, env, migrations           |
| [`docs/IMAGES.md`](./docs/IMAGES.md)     | Ảnh tĩnh `site-assets`                      |
| [`docs/adr/`](./docs/adr/)               | Quyết định kiến trúc (ADR)                  |

## Git Flow

Nhánh chính: `main` (production) · `develop` (staging)

```bash
npm run flow:feature -- ten-tinh-nang   # bắt đầu feature
npm run flow:feature:finish             # push & mở PR → develop
```

Chi tiết: [`docs/GITFLOW.md`](./docs/GITFLOW.md)

## Trạng thái hiện tại (v2)

| Hạng mục                                                                       | Trạng thái |
| ------------------------------------------------------------------------------ | ---------- |
| Trang public (trang chủ, thực đơn, chi nhánh, tin tức, khuyến mãi, tuyển dụng) | ✅         |
| Admin CMS (articles, promotions, bookings, careers, menu, users)               | ✅         |
| Form đặt bàn / đặt tiệc → Supabase + email                                     | ✅         |
| Ảnh tĩnh trên Supabase `site-assets`                                           | ✅         |

Tiến độ chi tiết: [`docs/ROADMAP.md`](./docs/ROADMAP.md)

## Scripts

| Command         | Mô tả                  |
| --------------- | ---------------------- |
| `npm run dev`   | Dev server             |
| `npm run build` | Build production       |
| `npm run start` | Chạy production server |
| `npm run lint`  | ESLint                 |
| `npm test`      | Vitest unit tests      |
