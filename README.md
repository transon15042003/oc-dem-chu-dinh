# Ốc Đêm Chú Đỉnh

Website marketing cho chuỗi nhà hàng [Ốc Đêm Chú Đỉnh](https://ocdemchudinh.hgdigital.vn/) tại Sài Gòn.

Dự án bắt đầu là **clone portfolio**; **v2** chuyển sang **sản phẩm vận hành thật** — marketing cập nhật tin tức, khuyến mãi, thực đơn và xử lý đặt chỗ qua admin `/admin`, không cần commit Git.

## Môi trường

| Môi trường     | Nhánh Git | URL                                                                        |
| -------------- | --------- | -------------------------------------------------------------------------- |
| **Production** | `main`    | https://oc-dem-chu-dinh.vercel.app                                         |
| **Staging**    | `develop` | https://oc-dem-chu-dinh-git-develop-tran-sons-projects-703bf65b.vercel.app |
| **Local**      | —         | http://localhost:3000                                                      |

Admin: `/admin/login` (trên mỗi môi trường tương ứng).

Chi tiết deploy: [`docs/DEPLOY.md`](./docs/DEPLOY.md)

## Stack

| Layer                     | Công nghệ                          |
| ------------------------- | ---------------------------------- |
| Framework                 | Next.js 16 (App Router) · React 19 |
| Language                  | TypeScript                         |
| Styling                   | Tailwind CSS v4 · shadcn/ui        |
| Animation                 | Framer Motion                      |
| Forms                     | React Hook Form · Zod              |
| Rich text (admin)         | Tiptap                             |
| Database · Auth · Storage | Supabase                           |
| Email                     | Resend                             |
| Deploy                    | Vercel                             |

## Yêu cầu

- **Node.js** 20+ (khuyến nghị 22 cho Supabase client tương lai)
- Tài khoản [Supabase](https://supabase.com) (project đã setup — xem [`docs/SUPABASE.md`](./docs/SUPABASE.md))
- API key [Resend](https://resend.com) (form đặt bàn, liên hệ, tuyển dụng)

## Bắt đầu (developer)

```bash
git clone https://github.com/transon15042003/oc-dem-chu-dinh.git
cd oc-dem-chu-dinh

cp .env.example .env.local
# Điền biến bắt buộc (xem bảng dưới)

npm install
npm run dev
```

- Website: http://localhost:3000
- Admin: http://localhost:3000/admin/login

### Env tối thiểu (local)

| Biến                              | Bắt buộc    | Ghi chú                                              |
| --------------------------------- | ----------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`        | ✅          | Supabase → Settings → API                            |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | ✅          | Anon / publishable key                               |
| `SUPABASE_SERVICE_ROLE_KEY`       | ✅          | Form lưu DB + admin đọc dữ liệu. **Không commit**    |
| `RESEND_API_KEY`                  | ✅          | Gửi email form                                       |
| `BOOKING_NOTIFICATION_EMAIL`      | ✅          | Email nhận thông báo                                 |
| `BOOKING_FROM_EMAIL`              | ✅          | Sandbox: `onboarding@resend.dev`                     |
| `NEXT_PUBLIC_HOTLINE`             | Khuyến nghị | Hiển thị trên site                                   |
| `NEXT_PUBLIC_EMAIL`               | Khuyến nghị | Liên hệ, footer                                      |
| `NEXT_PUBLIC_USE_SUPABASE_ASSETS` | Tùy chọn    | `true` khi test ảnh từ Supabase bucket `site-assets` |

Danh sách đầy đủ: [`.env.example`](./.env.example) · Hướng dẫn Supabase: [`docs/SUPABASE.md`](./docs/SUPABASE.md)

> **Lưu ý:** Thiếu `SUPABASE_SERVICE_ROLE_KEY` trên Vercel → form vẫn báo thành công và gửi email, nhưng **không lưu vào database** → admin trống, không có lỗi hiển thị.

## Trang public

| Route                | Nội dung                                             |
| -------------------- | ---------------------------------------------------- |
| `/`                  | Trang chủ — hero, món nổi bật, gallery, form đặt bàn |
| `/thuc-don`          | Thực đơn (Supabase `menu_categories` + `menu_items`) |
| `/chi-nhanh`         | 5 chi nhánh + Google Maps                            |
| `/gioi-thieu`        | Giới thiệu                                           |
| `/lien-he`           | Liên hệ + form                                       |
| `/tin-tuc`           | Tin tức (`published`)                                |
| `/tin-tuc/[slug]`    | Chi tiết bài viết                                    |
| `/khuyen-mai`        | Khuyến mãi (tự ẩn khi hết hạn)                       |
| `/khuyen-mai/[slug]` | Chi tiết khuyến mãi                                  |
| `/tuyen-dung`        | Tuyển dụng + form ứng tuyển                          |

## Admin (`/admin`)

| Route                        | Quyền          | Mô tả                  |
| ---------------------------- | -------------- | ---------------------- |
| `/admin/articles`            | editor, admin  | CRUD tin tức           |
| `/admin/promotions`          | editor, admin  | CRUD khuyến mãi        |
| `/admin/bookings`            | editor, admin  | Hub đặt bàn + đặt tiệc |
| `/admin/careers`             | editor, admin  | Vị trí tuyển dụng      |
| `/admin/career-applications` | editor, admin  | Hồ sơ ứng viên         |
| `/admin/menu`                | editor, admin  | Danh mục + món ăn      |
| `/admin/users`               | **admin only** | Tạo tài khoản nội bộ   |

Hướng dẫn vận hành (chủ quán / marketing): [`docs/operations/`](./docs/operations/)

## Tài liệu

| Tài liệu                                 | Đối tượng                               |
| ---------------------------------------- | --------------------------------------- |
| [`docs/README.md`](./docs/README.md)     | **Mục lục trung tâm** — bắt đầu từ đây  |
| [`CONTEXT.md`](./CONTEXT.md)             | Thuật ngữ domain (glossary)             |
| [`docs/ROADMAP.md`](./docs/ROADMAP.md)   | Roadmap, milestones, quyết định đã chốt |
| [`docs/operations/`](./docs/operations/) | Hướng dẫn vận hành admin                |
| [`docs/GITFLOW.md`](./docs/GITFLOW.md)   | Git Flow, PR, CI                        |
| [`docs/DEPLOY.md`](./docs/DEPLOY.md)     | Vercel production / staging / preview   |
| [`docs/SUPABASE.md`](./docs/SUPABASE.md) | Supabase project, migrations, tạo user  |
| [`docs/IMAGES.md`](./docs/IMAGES.md)     | Ảnh tĩnh `site-assets`                  |
| [`docs/adr/`](./docs/adr/)               | Quyết định kiến trúc (ADR)              |

## Git Flow

Nhánh chính: `main` (production) · `develop` (staging)

```bash
npm run flow:feature -- ten-tinh-nang   # feature/* từ develop
npm run flow:feature:finish             # push & mở PR → develop

npm run flow:hotfix -- ten-hotfix       # hotfix/* từ main (sửa production gấp)
npm run flow:hotfix:finish              # merge main + develop
```

Chi tiết: [`docs/GITFLOW.md`](./docs/GITFLOW.md)

## Scripts

| Command                  | Mô tả                                          |
| ------------------------ | ---------------------------------------------- |
| `npm run dev`            | Dev server                                     |
| `npm run build`          | Build production                               |
| `npm run start`          | Chạy production server                         |
| `npm run lint`           | ESLint                                         |
| `npm test`               | Vitest unit tests                              |
| `npm run assets:migrate` | Upload ảnh site gốc lên Supabase `site-assets` |
| `npm run storybook`      | Storybook (port 6006)                          |

## Trạng thái hiện tại (v2)

| Hạng mục                                                                       | Trạng thái |
| ------------------------------------------------------------------------------ | ---------- |
| Trang public (trang chủ, thực đơn, chi nhánh, tin tức, khuyến mãi, tuyển dụng) | ✅         |
| Admin CMS (articles, promotions, bookings, careers, menu, users)               | ✅         |
| Form đặt bàn / đặt tiệc → Supabase + email                                     | ✅         |
| Ảnh tĩnh trên Supabase `site-assets`                                           | ✅         |

Tiến độ chi tiết và ghi chú: [`docs/ROADMAP.md`](./docs/ROADMAP.md)

## Site gốc

Clone tham chiếu: https://ocdemchudinh.hgdigital.vn/

Mục tiêu: giữ **100% cấu trúc & vibe**; khác biệt về font, màu sắc và ảnh (do chủ quán cung cấp hoặc thay thế).
