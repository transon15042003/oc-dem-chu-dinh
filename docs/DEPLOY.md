# Deploy — Vercel & môi trường

> Git Flow: [`GITFLOW.md`](./GITFLOW.md) · Staging ADR: [`adr/0005-staging-branch-domain.md`](./adr/0005-staging-branch-domain.md)

## URL theo nhánh

| Môi trường | Git branch | Vercel target | URL chính |
|------------|------------|---------------|-----------|
| **Production** | `main` | Production | https://ocdemchudinh.vercel.app |
| **Staging** | `develop` | Preview (domain gắn branch) | https://ocdemchudinh-preview.vercel.app |
| **Preview PR** | `feature/*` | Preview (tạm) | URL riêng mỗi PR — xem Vercel bot trên GitHub |

**Branch alias (dự phòng):**

| Nhánh | URL |
|-------|-----|
| `main` | https://oc-dem-chu-dinh-git-main-tran-sons-projects-703bf65b.vercel.app |
| `develop` | https://oc-dem-chu-dinh-git-develop-tran-sons-projects-703bf65b.vercel.app |

### Custom domain (khi mua domain riêng)

1. Vercel → Project **oc-dem-chu-dinh** → **Settings → Domains**
2. Add domain: `staging.<your-domain.com>` (vd `staging.ocdemchudinh.vn`)
3. Chọn **Git Branch** = `develop`
4. Thêm DNS records theo hướng dẫn Vercel
5. Cập nhật `NEXT_PUBLIC_SITE_URL` (Preview) = `https://staging.<your-domain.com>`

Production domain riêng gắn branch `main` khi sẵn sàng go-live thật.

---

## Luồng deploy tự động

```
push/merge feature → PR → merge develop  →  Staging deploy (develop branch domain)
QA trên staging OK → PR develop → main   →  Production deploy
```

**Lưu ý:** Merge vào `develop` **không** tự lên production. Phải merge vào `main` (qua `release/*` hoặc PR `develop` → `main`).

---

## Env vars trên Vercel

| Biến | Production | Preview (staging + PR) | Development |
|------|------------|------------------------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://ocdemchudinh.vercel.app` | `https://ocdemchudinh-preview.vercel.app` | `http://localhost:3000` |
| `NEXT_PUBLIC_SUPABASE_*` | ✅ | ✅ (cùng project) | local `.env.local` |
| `RESEND_*`, `BOOKING_*` | ✅ | ✅ (gửi email thật) | local `.env.local` |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | ✅ | local `.env.local` |

Dashboard: https://vercel.com/tran-sons-projects-703bf65b/oc-dem-chu-dinh/settings/environment-variables

**Server region:** `vercel.json` đặt `sin1` (Singapore) để gần Supabase `ap-southeast-1` — giảm latency admin/auth.

---

## GitHub — đã cấu hình ✅

| Hạng mục | Trạng thái |
|----------|------------|
| Branch protection `main` + `develop` | ✅ PR bắt buộc + CI `Lint & Build` |
| Squash merge | ✅ (feature → develop) |
| Merge commit | ✅ (release/hotfix → main) |
| Rebase merge | ❌ Tắt |
| Auto-delete head branches | ✅ |
| CI Node.js | 22 |
| Vercel Git integration | ✅ Auto deploy on push |

---

## Checklist trước khi lên production

- [ ] QA trên **staging** (`develop` URL)
- [ ] CI xanh trên PR `develop` → `main`
- [ ] Env Production đủ trên Vercel
- [ ] Merge → kiểm tra https://oc-dem-chu-dinh.vercel.app
