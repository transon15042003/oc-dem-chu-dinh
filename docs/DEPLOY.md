# Deploy — Vercel & môi trường

> Git Flow: [`GITFLOW.md`](./GITFLOW.md) · Staging ADR: [`adr/0005-staging-branch-domain.md`](./adr/0005-staging-branch-domain.md)

## URL theo nhánh

| Môi trường | Git branch | Vercel target | URL |
|------------|------------|---------------|-----|
| **Production** | `main` | Production | https://oc-dem-chu-dinh.vercel.app |
| **Staging** | `develop` | Preview (branch domain) | https://oc-dem-chu-dinh-git-develop-tran-sons-projects-703bf65b.vercel.app |
| **Preview PR** | `feature/*` | Preview (tạm) | URL riêng mỗi PR — xem Vercel bot trên GitHub |

### Custom domain staging (khi mua domain)

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
| `NEXT_PUBLIC_SITE_URL` | `https://oc-dem-chu-dinh.vercel.app` | URL staging ở trên | `http://localhost:3000` |
| `NEXT_PUBLIC_SUPABASE_*` | ✅ | ✅ (cùng project) | local `.env.local` |
| `RESEND_*`, `BOOKING_*` | ✅ | ✅ (gửi email thật) | local `.env.local` |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | Optional | local (optional) |

Dashboard: https://vercel.com/tran-sons-projects-703bf65b/oc-dem-chu-dinh/settings/environment-variables

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
