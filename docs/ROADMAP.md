# Roadmap — Ốc Đêm Chú Đỉnh Clone

> Ghi chú từ phiên `/grill-with-docs`. Cập nhật khi quyết định thay đổi.

## Mục tiêu dự án

**Hướng A — Portfolio / học tập**, thiết kế để nâng cấp dần mà không viết lại từ đầu.

**Bối cảnh thực tế:** Chủ quán yêu cầu clone site gốc. Clone **100% cấu trúc & vibe**; chỉ khác font, màu sắc và ảnh (do chủ cung cấp hoặc thay thế).

---

## v1 — MVP (đang build)

### Pages

| Trang | Mô tả |
|-------|--------|
| Trang chủ | Hero slider, stats, món bán chạy, dịch vụ đặt tiệc (static), gallery, reviews, form đặt bàn |
| Thực đơn | Danh sách món từ JSON, filter theo danh mục |
| Chi nhánh | 5 chi nhánh, embed Google Maps |
| Giới thiệu | Trang tĩnh |
| Liên hệ | Thông tin + form liên hệ |

### Tính năng

- Form đặt bàn + liên hệ (gửi email qua Resend API)
- Nút nổi: Zalo, Hotline, Đặt bàn
- Responsive mobile / tablet / desktop
- SEO cơ bản (metadata, Open Graph)

### Stack v1

| Layer | Công nghệ |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI | shadcn/ui |
| Animation | Framer Motion |
| Form | React Hook Form + Zod |
| Data | Static JSON + MDX |
| Icons | Lucide React |
| Package manager | pnpm |
| Deploy | Vercel |

---

## v2 — Sản phẩm thật (đang lên kế hoạch)

> Phiên `/grill-with-docs` 2026-08-29. Mục tiêu: chủ quán / marketing vận hành nội dung qua UI, không cần dev commit MDX.

### Mục tiêu

- Chuyển từ portfolio clone sang **sản phẩm vận hành thật**
- Marketing cập nhật **Article** và **Promotion** qua admin `/admin`
- Form đặt tiệc (**Event Booking**) tách khỏi đặt bàn; lưu DB + email (v2.1)
- **Tuyển dụng**: form email only — không DB (v2.2)
- **Menu CRUD**: defer v2.4 (menu vẫn static `src/data/`)

### Stack v2 (đã chốt)

| Layer | Công nghệ | Ghi chú |
|-------|-----------|---------|
| Database + Auth + Storage | **Supabase** (project mới) | Content, Event Booking, RLS — ADR-0002 |
| Admin | `/admin` trong cùng Next.js app | ADR-0003 |
| Auth | Supabase Auth — **email + password** | Roles: `admin` / `editor` |
| Rich text | **Tiptap** WYSIWYG | Admin soạn Article / Promotion |
| Ảnh nội dung | Supabase Storage | Max **2MB** / file, bucket `content-images` |
| Email | Resend (giữ từ v1) | Booking, contact, event, careers |
| i18n | Defer | Site gốc 100% VI |

### Routes public (v2)

| Route | Nội dung |
|-------|----------|
| `/tin-tuc` | Danh sách Article (`published` only) |
| `/tin-tuc/[slug]` | Chi tiết Article |
| `/khuyen-mai` | Danh sách Promotion (chưa hết hạn) |
| `/khuyen-mai/[slug]` | Chi tiết Promotion |
| `/tuyen-dung` | Trang tuyển dụng + form (v2.2) |
| `/admin/*` | Panel nội bộ (auth required) |

### Content model (tóm tắt)

**Article:** `title`, `slug`, `excerpt`, `body` (HTML Tiptap), `cover_image`, `status` (`draft` \| `published`), `published_at`, timestamps.

**Promotion:** Article fields + `starts_at`, `ends_at`, `discount_label`, `promo_code`. Hết hạn → **auto-hide** khỏi list public (ADR-0004).

**Roles:**

| Role | Quyền |
|------|--------|
| `editor` | CRUD Article + Promotion (draft/publish) |
| `admin` | Editor + quản lý user/role |

### Milestones v2

```
v2.0 — Content System          ← slice hiện tại (in progress)
├── Supabase project + migrations ✅ (ref: ianpabkxuzjnksrgsvtr — xem docs/SUPABASE.md)
├── RLS + Storage bucket content-images ✅
├── Supabase client + middleware + /admin/login ✅
├── /admin/users — tạo user + đổi role (admin only) ✅
├── /admin: CRUD Article + Promotion, Tiptap, upload ảnh ⏳
├── Public: /tin-tuc, /khuyen-mai (+ detail), sitemap động ⏳
└── ADR-0002, 0003, 0004 ✅

v2.1 — Event Booking
├── Form riêng (khác Table Reservation) — nút "Đặt tiệc ngay" trỏ đúng luồng
├── POST /api/event-booking → Supabase + Resend email
└── Admin: xem danh sách Event Booking

v2.2 — Careers
├── /tuyen-dung + form ứng tuyển
└── POST /api/careers → Resend email only (không DB)

v2.3 — Table Reservation → DB (tùy chọn)
└── Migrate đặt bàn từ email-only sang lưu Supabase + admin xem đơn

v2.4 — Menu admin
└── CRUD Menu Item qua admin (thay static menu.ts)

Defer: lightbox gallery nâng cao, i18n, Storybook, Jest
```

### Env bổ sung (v2)

```env
# Supabase (public)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Supabase (server only — KHÔNG commit)
SUPABASE_SERVICE_ROLE_KEY=
```

> Thêm vào Vercel Production + Preview. Chi tiết bootstrap admin: [`docs/SUPABASE.md`](./SUPABASE.md).

---

## Quyết định đã chốt

| # | Quyết định | Ngày |
|---|------------|------|
| 1 | Hướng A — Portfolio trước, nâng cấp sau | 2026-08-28 |
| 2 | Phạm vi v1: 5 trang + homepage features (xem bảng trên) | 2026-08-28 |
| 3 | Stack v1: Next.js 15 + TS + Tailwind + shadcn + Framer Motion | 2026-08-28 |
| 4 | Repo public + branch protection `main`/`develop` (xem ADR-0001) | 2026-08-29 |
| 18 | **v2 mục tiêu:** sản phẩm thật — marketing cập nhật content qua UI | 2026-08-29 |
| 19 | **v2.0 slice:** Content System (Supabase + `/admin` + public pages) | 2026-08-29 |
| 20 | Admin `/admin` cùng app; Auth email+password; roles `admin` / `editor` | 2026-08-29 |
| 21 | Article: `draft` / `published`; Promotion: `promo_code` + auto-hide expired | 2026-08-29 |
| 22 | Tiptap WYSIWYG; ảnh content max 2MB (Supabase Storage) | 2026-08-29 |
| 23 | Event Booking v2.1: email + DB; Careers v2.2: email only; Menu admin v2.4 | 2026-08-29 |
---

## Env variables (do bạn config)

Liên hệ, link ngoài và đích form **không lấy từ site gốc** — tất cả qua `.env`:

```env
# Liên hệ chính
NEXT_PUBLIC_HOTLINE=0938186391
NEXT_PUBLIC_EMAIL=ocdemchudinh@gmail.com

# Link ngoài (nút nổi, footer)
NEXT_PUBLIC_ZALO_URL=
NEXT_PUBLIC_MESSENGER_URL=
NEXT_PUBLIC_FACEBOOK_URL=

# Google Maps — embed hoặc link chỉ đường từng chi nhánh (JSON hoặc riêng lẻ)
NEXT_PUBLIC_MAP_CN1_URL=
NEXT_PUBLIC_MAP_CN2_URL=
NEXT_PUBLIC_MAP_CN3_URL=
NEXT_PUBLIC_MAP_CN4_URL=
NEXT_PUBLIC_MAP_CN5_URL=

# Form — gửi email qua Resend (đặt bàn + liên hệ)
RESEND_API_KEY=
BOOKING_NOTIFICATION_EMAIL=
BOOKING_FROM_EMAIL=
```

> Chi tiết file `.env.example` sẽ tạo khi scaffold project.

> **Next.js:** `NEXT_PUBLIC_*` phải đọc bằng `process.env.NEXT_PUBLIC_XXX` trực tiếp — không dùng `process.env[key]` động (client sẽ nhận chuỗi rỗng). Xem `src/lib/env.ts`. Sau khi sửa `.env.local`, **restart** `npm run dev`.

---

## Nguồn dữ liệu v1

| Hạng mục | Nguồn |
|----------|--------|
| Logo, ảnh, menu, text | Extract / copy từ site gốc → lưu local `public/` & `src/data/` |
| Hotline, email, Zalo, Maps, form email | `.env` — bạn tự config |
| 5 | Content/assets: extract từ site gốc (logo, ảnh, menu, text) | 2026-08-28 |
| 6 | Liên hệ & form: config qua `.env`, không hardcode từ site gốc | 2026-08-28 |
| 7 | Deploy: Vercel preview URL trước, domain riêng sau | 2026-08-28 |
| 8 | Build order: M1 → M5 theo milestone (xem bên dưới) | 2026-08-28 |
| 9 | M2 polish: hero overlay tối thiểu, icon/hover cards, video list, footer redesign | 2026-08-28 |
| 10 | Hero: bỏ block USP/contact dưới banner; **giữ stats** (quyết định A) | 2026-08-28 |
| 11 | Hero: hiển thị trọn ảnh 1672×941, `object-contain`, không crop | 2026-08-28 |
| 12 | Footer giống site gốc: slogan bar + 3 cột + map placeholder; logo chữ "Đỉnh"; bỏ HG DIGITAL | 2026-08-28 |
| 13 | Inner pages bám sát layout site gốc — chỉ đổi style (dark theme), không thiếu section | 2026-08-29 |
| 14 | **Motion:** scroll reveal cho tiêu đề/section; **hover chỉ** trên nút, link, thumbnail bấm được — không hover khối lớn | 2026-08-29 |
| 15 | **Theme:** light/dark + toggle (header); light ≈ site gốc (nền kem), dark = portfolio; `next-themes` + CSS variables; overlay/nền đỏ dùng token cố định `ink` / `on-red` | 2026-08-29 |
| 16 | **Form email:** đặt bàn + liên hệ gửi qua Resend (`/api/booking`, `/api/contact`); validate Zod server-side; thiếu env → 503 | 2026-08-29 |
| 17 | **SEO M5:** `createPageMetadata`, OG/Twitter, JSON-LD Restaurant, `robots.txt` + `sitemap.xml`, trang 404 | 2026-08-29 |

---

## Theme System (light / dark)

> Chuẩn áp dụng khi thêm section hoặc component mới. Đọc trước khi dùng `bg-brand-dark`, `text-white`, hoặc opacity trên màu đỏ.

### Tổng quan

| Mode | Mục tiêu | Nền trang | Chữ chính |
|------|----------|-----------|-----------|
| **Light** (mặc định theo OS) | Gần [site gốc](https://ocdemchudinh.hgdigital.vn/) — nền kem ấm, chữ nâu đậm | `#faf7f2` | `#2a2118` |
| **Dark** | Portfolio clone ban đầu | `#0b0b0f` | `#f7f0e6` |

- **Toggle:** nút Sun/Moon trên header (desktop + mobile).
- **Mặc định:** `system` — theo cài đặt OS (`prefers-color-scheme`).
- **Cơ chế:** class `.dark` trên `<html>` qua `next-themes` (`attribute="class"`).

### File liên quan

| File | Vai trò |
|------|---------|
| `src/app/globals.css` | Định nghĩa toàn bộ CSS variables + map sang Tailwind (`@theme inline`) |
| `src/app/layout.tsx` | `ThemeProvider`, `suppressHydrationWarning` trên `<html>`, body dùng `bg-background text-foreground` |
| `src/components/providers/theme-provider.tsx` | Wrapper `next-themes` |
| `src/components/layout/theme-toggle.tsx` | Nút chuyển theme (hydration-safe qua `useSyncExternalStore`) |
| `src/components/ui/button.tsx` | Variant `brand` cho CTA đỏ |
| `src/components/ui/badge.tsx` | Variant `hot` cho badge HOT trên ảnh |

### Hai nhóm token — **quan trọng**

#### 1. Token **đổi theo theme** (nền trang, card, form)

| CSS var | Tailwind | Light | Dark | Dùng cho |
|---------|----------|-------|------|----------|
| `--brand-dark` | `bg-brand-dark` | kem `#faf7f2` | đen `#0b0b0f` | Nền section, header sticky, body |
| `--brand-dark-soft` | `bg-brand-dark-soft` | trắng | `#14141c` | Card, input, panel |
| `--brand-cream` | `text-brand-cream` | nâu đậm | kem | Chữ chính (alias `--foreground`) |
| `--brand-cream-muted` | `text-brand-cream-muted` | xám nâu | xám kem | Chữ phụ |
| `--background` / `--foreground` | `bg-background` `text-foreground` | — | — | shadcn semantic |
| `--border` | `border-border` | đen 12% | trắng 10% | Viền |
| `--menu-hero-*` | `from-menu-hero-from` … | gradient sáng | gradient tối | Hero inner pages |
| `--footer-bg` / `--footer-text` | `bg-footer` `text-footer-foreground` | nâu đậm | gần đen | Footer chính (luôn tối) |

> ⚠️ **`brand-dark` không có nghĩa “màu tối”** — ở light mode nó là **nền kem**. Không dùng `bg-brand-dark` cho overlay trên ảnh hoặc chữ trắng.

#### 2. Token **cố định** (không flip theo theme)

| CSS var | Tailwind | Giá trị | Dùng cho |
|---------|----------|--------|----------|
| `--ink` / `--ink-soft` | `bg-ink` `bg-ink/80` | `#14141c` / `#1f1f2a` | Overlay ảnh, lightbox, video chrome, gradient scrim |
| `--on-dark` | `text-on-dark` | `#ffffff` | Chữ trên `bg-ink` |
| `--on-red` | `text-on-red` | `#ffffff` | Chữ trên `bg-brand-red` |
| `--brand-red` | `bg-brand-red` | `#d61f26` | CTA, top bar, nav active, badge |
| `--brand-red-hover` | `bg-brand-red-hover` | `#b91c1c` (light) / `#ef4444` (dark) | Hover nút đỏ **đặc** — không dùng `/90` |
| `--slogan-mid` / `--slogan-end` | — | `#991b1b` / `#78350f` | Gradient slogan footer |

Utility: `.bg-slogan-bar` — gradient đỏ đậm cố định cho khẩu hiệu footer (4 ô trên footer).

### Quy tắc khi viết UI

| Tình huống | Dùng | Không dùng |
|------------|------|------------|
| Nền trang / section / card | `bg-background`, `bg-brand-dark-soft`, `bg-card` | `bg-stone-*`, hardcode hex |
| Chữ body | `text-foreground`, `text-brand-cream-muted`, `text-muted-foreground` | `text-white` (trừ nền đỏ/tối) |
| Overlay trên ảnh (giá, gradient, badge) | `bg-ink/80`, `from-ink`, `text-on-dark` | `bg-brand-dark/80`, `from-brand-dark` |
| Nút CTA đỏ | `<Button variant="brand">` | `bg-brand-red/90`, chỉ `className` không variant |
| Badge HOT | `<Badge variant="hot">` | `bg-brand-red text-white` rời |
| Nav / tab active trên đỏ | `bg-brand-red text-on-red` (hoặc `text-brand-gold` nếu cần vàng) | `text-foreground` trên nền đỏ |
| Hover nút đỏ | `hover:bg-brand-red-hover` | `hover:bg-brand-red/80` (bị wash out trên nền sáng) |
| Viền | `border-border` | `border-white/10` |

### Phần **cố định** (không đổi theo theme)

Giữ nguyên dù user chọn light hay dark:

- **Top bar** — `bg-brand-red text-on-red`
- **Footer slogan bar** — `.bg-slogan-bar` + chữ amber/trắng
- **Footer chính** — luôn `bg-footer` (nền tối)
- **Logo / gradient đỏ** trên các block marketing

### shadcn variants đã thêm

```tsx
// CTA đỏ — chữ trắng, hover đặc
<Button variant="brand">Đặt bàn ngay</Button>

// Badge trên ảnh món
<Badge variant="hot">HOT</Badge>
```

### Bẫy thường gặp (đã fix 2026-08-29)

1. **`bg-brand-dark` + `text-white` ở light mode** → nền kem + chữ trắng = không đọc được.  
   → Overlay ảnh: dùng `ink`. Chữ trên nền kem: dùng `foreground`.

2. **`bg-brand-red/20` hoặc `/90` trên nền sáng** → đỏ bị phai.  
   → Dùng `bg-brand-red` + `hover:bg-brand-red-hover` (màu đặc).

3. **Gradient Tailwind `red-800`, `amber-900`** trên slogan — đã thay bằng `--slogan-mid/end` + `.bg-slogan-bar`.

4. **Form input** — dùng `bg-brand-dark-soft` (trắng ở light) thay vì `bg-brand-dark` (trùng nền trang).

### Kiểm tra nhanh sau khi sửa UI

- [ ] Toggle light/dark trên 5 trang + header/footer
- [ ] Nút đỏ, nav active, top bar, footer slogan — chữ đọc được ở **cả hai** mode
- [ ] Overlay giá / HOT trên ảnh món — không bị kem
- [ ] `npm run lint` && `npm run build`

---

## Form & Email (Resend — M4)

### Luồng

```
Form (client) → POST /api/booking | /api/contact
             → Zod validate (server)
             → Resend gửi email HTML → BOOKING_NOTIFICATION_EMAIL
```

### File liên quan

| File | Vai trò |
|------|---------|
| `src/app/api/booking/route.ts` | API đặt bàn |
| `src/app/api/contact/route.ts` | API liên hệ |
| `src/lib/email/send-booking.ts` | Template + gửi email đặt bàn |
| `src/lib/email/send-contact.ts` | Template + gửi email liên hệ |
| `src/lib/env-server.ts` | Đọc `RESEND_*` (chỉ server) |
| `src/lib/submit-form.ts` | Helper `fetch` từ form client |
| `src/lib/validations/booking.ts` | Schema Zod đặt bàn |
| `src/lib/validations/contact.ts` | Schema Zod liên hệ |

### Env bắt buộc (server)

| Biến | Mô tả |
|------|--------|
| `RESEND_API_KEY` | API key từ [resend.com](https://resend.com) |
| `BOOKING_FROM_EMAIL` | Email gửi đi — **domain đã verify** trên Resend |
| `BOOKING_NOTIFICATION_EMAIL` | Email nhận thông báo (dùng chung cho đặt bàn + liên hệ) |

> Thiếu bất kỳ biến nào → API trả **503** + thông báo gọi hotline.

### Cấu hình Resend (lần đầu)

1. Kết nối **Resend MCP** trong Cursor (đã có).
2. Tạo API key trên [resend.com/api-keys](https://resend.com/api-keys) hoặc qua MCP `create-api-key` (permission: `sending_access`).
3. Thêm vào `.env.local`:
   ```env
   RESEND_API_KEY=re_xxxxxxxx
   BOOKING_FROM_EMAIL=onboarding@resend.dev
   BOOKING_NOTIFICATION_EMAIL=transon15042003@gmail.com
   ```
4. **Sandbox** (chưa verify domain): chỉ gửi được tới email đăng ký Resend; `FROM` phải là `onboarding@resend.dev`.
5. **Production**: MCP `create-domain` → thêm DNS records → đổi `BOOKING_FROM_EMAIL=noreply@yourdomain.com`.
6. Restart `npm run dev`, submit form thử.

### Kiểm tra qua Resend MCP

| Tool | Dùng khi |
|------|----------|
| `list-domains` | Xem domain đã verify chưa |
| `create-api-key` | Tạo key mới (token chỉ hiện 1 lần) |
| `send-email` | Gửi email test thủ công |
| `list-emails` | Xem trạng thái gửi |

### Response API

| Status | Ý nghĩa |
|--------|---------|
| `200` | Gửi email thành công |
| `400` | Dữ liệu không hợp lệ |
| `503` | Chưa cấu hình Resend/env |
| `500` | Lỗi Resend hoặc server |

---

## Motion & Interaction (chuẩn áp dụng mọi trang)

> Scroll khi vào viewport; hover **tiết chế** — không bọc/lift cả section hay form.

### Scroll reveal

| Thành phần | Cách dùng |
|------------|-----------|
| Tiêu đề section | `SectionHeading` (1 lần / section) |
| Cột nội dung / block chính | Tối đa **1** `ScrollReveal` / section |
| Card trong grid | `InteractiveCard` — **chỉ scroll**, không hover lift |

**Không nên:** bọc từng ảnh gallery, từng đoạn text, form lớn, cả card chi nhánh bằng `ScrollReveal` lồng nhau.

### Hover (chỉ phần tử nhỏ, có hành động)

| Được phép | Không dùng |
|-----------|------------|
| `Button`, link, tab chọn chi nhánh | Lift/shadow cả section hoặc article |
| Thumbnail ảnh (border + scale nhẹ) | Hover trên form, danh sách text, stats |
| Carousel prev/next | `whileHover` trên khối full-width |

**Class:** `hoverImageClass` cho ảnh trong nút; `hover:border-*` cho tile — tránh `hoverSurfaceClass` trên container lớn.

---

## Responsive (theo site gốc)

| Breakpoint | Hành vi |
|------------|---------|
| **Mobile** | Hero cao ~52vh; carousel vuốt tay; FAB thanh ngang đáy; `pb-20` body |
| **Tablet (sm+)** | Nút carousel hiện; FAB cột phải; padding section `py-12→16→20` |
| **Desktop (lg+)** | Hero 16:9; stats hero 4 cột; video player + list cạnh nhau |

---

## Milestones v1

```
M1 — Foundation ✅
├── Scaffold Next.js 15 + Tailwind + shadcn
├── Design tokens (màu, font tạm extract từ site gốc)
├── Layout shell: Header, Footer, Mobile menu, Nút nổi
└── .env.example

M2 — Trang chủ ✅
├── Hero slider + stats counter
├── Món bán chạy (carousel)
├── Dịch vụ đặt tiệc (4 cards)
├── Gallery + Reviews
└── Form đặt bàn (UI only)

M3 — Data & inner pages ✅
├── menu.ts (26 món + bảng giá poster) + branches/about data
├── Trang Thực đơn (filter, search, lightbox, đặt bàn)
├── Trang Chi nhánh (5 chi nhánh, gallery, map link)
├── Giới thiệu (hero, gallery, 4 sections, CTA, form)
└── Liên hệ (info, form phản hồi, bản đồ chi nhánh)

M4 — Form & tích hợp ✅
├── React Hook Form + Zod validation ✅
├── API route gửi email (Resend) ✅
└── Wire env: hotline, Zalo, Messenger, Maps (hotline/maps đã có; Zalo/Messenger qua .env)

M5 — Polish & deploy
├── Framer Motion scroll animations ✅ (chuẩn hóa — xem § Motion & Interaction)
├── Theme system light/dark + toggle ✅ (chuẩn hóa — xem § Theme System)
├── Responsive QA + FAB hotline ✅
├── SEO metadata + Open Graph + JSON-LD + sitemap/robots ✅
└── Deploy Vercel ✅ → https://oc-dem-chu-dinh.vercel.app (cấu hình env production — xem § Deploy Vercel)
```

**Ước tính:** ~7–9 ngày full-time · 2–3 tuần part-time

---

## Deploy Vercel (M5) ✅

**Production URL:** https://oc-dem-chu-dinh.vercel.app  
**Staging URL (`develop`):** https://oc-dem-chu-dinh-git-develop-tran-sons-projects-703bf65b.vercel.app  
**Dashboard:** https://vercel.com/tran-sons-projects-703bf65b/oc-dem-chu-dinh/settings

> Chi tiết đầy đủ: [`docs/DEPLOY.md`](./DEPLOY.md) · Git Flow: [`docs/GITFLOW.md`](./GITFLOW.md)

### Môi trường (đã chốt v2)

| Môi trường | Branch | Đối tượng | Supabase | Email form |
|------------|--------|-----------|----------|------------|
| Production | `main` | Khách / chủ quán | Chung 1 project | Gửi thật |
| Staging | `develop` | Chỉ dev | Chung 1 project | Gửi thật |
| Preview PR | `feature/*` | Dev (tạm) | Chung 1 project | Gửi thật |

Custom domain staging (`staging.<domain>`) → gắn branch `develop` khi mua domain.

### Chuẩn bị

1. Push repo lên GitHub — Vercel auto-deploy theo branch.
2. **Production branch** = `main` trên Vercel.
3. Thêm **Environment Variables** (Production + Preview + Development):

| Biến | Bắt buộc | Ghi chú |
|------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | ✅ | Production: URL production · **Preview: URL staging** |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ v2 | Cùng project mọi môi trường |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ v2 | |
| `NEXT_PUBLIC_HOTLINE` | ✅ | Hiển thị trên site |
| `NEXT_PUBLIC_EMAIL` | ✅ | |
| `NEXT_PUBLIC_ZALO_URL` | | |
| `NEXT_PUBLIC_MESSENGER_URL` | | |
| `NEXT_PUBLIC_FACEBOOK_URL` | | |
| `NEXT_PUBLIC_TIKTOK_URL` | | |
| `NEXT_PUBLIC_MAP_CN*_URL` | | Khi có link Maps |
| `NEXT_PUBLIC_MAP_EMBED_CN*` | | Khi có iframe embed |
| `RESEND_API_KEY` | ✅ | Form đặt bàn + liên hệ |
| `BOOKING_FROM_EMAIL` | ✅ | Domain đã verify Resend |
| `BOOKING_NOTIFICATION_EMAIL` | ✅ | Email nhận thông báo |

4. QA trên **staging** (`develop`) trước khi merge lên `main`.

### CLI (tùy chọn)

```bash
npx vercel          # preview deploy
npx vercel --prod   # production
```

### SEO sau deploy

- Kiểm tra `/robots.txt`, `/sitemap.xml`
- Test share link Facebook/Zalo (OG image từ CDN gốc)
- Google Search Console: submit sitemap (production domain)
