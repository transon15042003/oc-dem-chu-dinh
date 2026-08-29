# Ốc Đêm Chú Đỉnh

Clone website nhà hàng [Ốc Đêm Chú Đỉnh](https://ocdemchudinh.hgdigital.vn/) — portfolio project với yêu cầu từ chủ quán.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Framer Motion (M5)

## Bắt đầu

```bash
cp .env.example .env.local
# Điền hotline, email, Zalo, Messenger, Maps...

npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Tài liệu dự án

- [`CONTEXT.md`](./CONTEXT.md) — domain glossary
- [`docs/ROADMAP.md`](./docs/ROADMAP.md) — roadmap v1/v2, milestones, env vars
- [`docs/GITFLOW.md`](./docs/GITFLOW.md) — quy trình nhánh Git Flow, CI, PR

## Git Flow

Nhánh chính: `main` (production) · `develop` (tích hợp)

```bash
npm run flow:feature -- ten-tinh-nang   # bắt đầu feature
npm run flow:feature:finish             # push & mở PR → develop
```

Chi tiết: [`docs/GITFLOW.md`](./docs/GITFLOW.md)

## Milestone hiện tại

**M1 — Foundation** ✅

**M2 — Trang chủ** ✅

- Hero slider + stats counter (animated)
- 6 món bán chạy (carousel)
- 4 dịch vụ đặt tiệc
- Video trải nghiệm + gallery lightbox (12 ảnh)
- Không gian highlight + 9 reviews carousel
- Form đặt bàn (RHF + Zod, mock submit)

**Tiếp theo: M3 — Data & inner pages**

## Scripts

| Command | Mô tả |
|---------|--------|
| `npm run dev` | Chạy dev server |
| `npm run build` | Build production |
| `npm run start` | Chạy production server |
| `npm run lint` | ESLint |
