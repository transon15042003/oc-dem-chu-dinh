# Git Flow — Ốc Đêm Chú Đỉnh

Hệ thống nhánh theo [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/), tối ưu cho dự án solo / nhóm nhỏ deploy Vercel.

## Nhánh chính

| Nhánh | Mục đích | Deploy |
|-------|----------|--------|
| `main` | Production — code đã QA, sẵn sàng live | Vercel **Production** |
| `develop` | Tích hợp tính năng — **staging nội bộ (chỉ dev)** | Vercel **Preview** (branch domain cố định) |
| `feature/*` | Tính năng đang làm | Vercel Preview (URL tạm mỗi PR) |

**Quy tắc:** Không commit trực tiếp lên `main` hoặc `develop`. Mọi thay đổi đi qua Pull Request.

> Chi tiết URL, env, custom domain: [`DEPLOY.md`](./DEPLOY.md) · ADR: [`adr/0005-staging-develop-branch-domain.md`](./adr/0005-staging-develop-branch-domain.md)

## Nhánh phụ

| Prefix | Tách từ | Merge vào | Ví dụ |
|--------|---------|-----------|-------|
| `feature/*` | `develop` | `develop` | `feature/m3-thuc-don-filter` |
| `release/*` | `develop` | `main` + `develop` | `release/0.2.0` |
| `hotfix/*` | `main` | `main` + `develop` | `hotfix/fix-booking-form` |

## Quy trình hàng ngày

### Bắt đầu tính năng mới

```bash
npm run flow:feature -- m3-thuc-don-filter
# ... code, commit ...
npm run flow:feature:finish
# Mở PR: feature/m3-thuc-don-filter → develop
```

### Chuẩn bị release

```bash
npm run flow:release -- 0.2.0
# Bump version, changelog, QA trên release/0.2.0
npm run flow:release:finish -- 0.2.0
# Mở PR: release/0.2.0 → main (merge commit)
# Sau merge main: tag v0.2.0, merge back develop
```

### Sửa lỗi khẩn production

```bash
npm run flow:hotfix -- fix-booking-email
# ... fix ...
npm run flow:hotfix:finish
# PR: hotfix/fix-booking-email → main, rồi cherry-pick/merge vào develop
```

## Commit message

Dùng [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(menu): thêm filter theo danh mục
fix(booking): validate số điện thoại VN
docs: cập nhật GITFLOW
chore(deps): bump next to 16.3.3
```

## Pull Request

- Target `develop` cho feature
- Target `main` cho release / hotfix (hoặc PR `develop` → `main` khi release nhỏ)
- CI phải pass (`Lint & Build`) trước khi merge
- Squash merge cho feature → `develop`
- Merge commit cho `release/*` / `hotfix/*` → `main`
- **Không** merge `develop` → `main` khi chưa QA trên staging

## Deploy & staging (mô hình A)

Một Vercel project, production branch `main`, staging = branch domain của `develop`.

| Hành động | Kết quả deploy |
|-----------|----------------|
| Merge PR vào `develop` | **Staging** tự deploy (~1–2 phút) |
| Merge PR vào `main` | **Production** tự deploy |
| Push lên `feature/*` (chưa merge) | Chỉ Preview URL trên PR — không ảnh hưởng staging/production |

**Staging URL:** https://oc-dem-chu-dinh-git-develop-tran-sons-projects-703bf65b.vercel.app  
**Production URL:** https://oc-dem-chu-dinh.vercel.app

### Quy tắc khi push

1. **Feature:** `feature/*` → PR → `develop` → kiểm tra staging → PR `develop` → `main`
2. **Không force-push** lên `main` / `develop` (branch protection chặn)
3. **Không** push secret (`.env.local`, service role key) lên Git
4. Form email trên staging **gửi thật** (Resend Preview env) — cẩn thận khi test
5. Supabase **chung 1 project** — dữ liệu staging = production DB (phân biệt bằng `draft` / QA discipline)

### Custom domain staging

Khi có domain (vd `ocdemchudinh.vn`): gắn `staging.<domain>` vào Git branch `develop` trên Vercel → cập nhật `NEXT_PUBLIC_SITE_URL` (Preview).

## Branch protection (GitHub)

> Quyết định chi tiết: [`docs/adr/0001-branch-protection.md`](./adr/0001-branch-protection.md)

Repo **public** (portfolio) để dùng branch protection miễn phí trên GitHub Free.

### Repo settings

| Setting | Giá trị |
|---------|---------|
| Visibility | Public |
| Default branch | `main` |
| Automatically delete head branches | ✅ |
| Allow squash merging | ✅ |
| Allow merge commits | ✅ |
| Allow rebase merging | ❌ |

### `main` và `develop` (cùng rule)

| Rule | Giá trị |
|------|---------|
| Require pull request before merging | ✅ |
| Required approvals | 0 (solo dev) |
| Require status checks to pass | ✅ `Lint & Build` |
| Require branches up to date | ✅ |
| Include administrators (enforce) | ❌ — admin bypass khi khẩn cấp |
| Allow force pushes | ❌ |
| Allow deletions | ❌ |

### Nhánh không protect

`feature/*`, `release/*`, `hotfix/*` — nhánh tạm; merge qua PR rồi auto-delete.

## Scripts npm

| Script | Mô tả |
|--------|--------|
| `flow:feature -- <tên>` | Tạo `feature/<tên>` từ `develop` |
| `flow:feature:finish` | Push branch feature hiện tại |
| `flow:release -- <ver>` | Tạo `release/<ver>` từ `develop` |
| `flow:release:finish -- <ver>` | Tag `v<ver>` sau khi merge main |
| `flow:hotfix -- <tên>` | Tạo `hotfix/<tên>` từ `main` |
| `flow:hotfix:finish` | Push branch hotfix hiện tại |
| `flow:sync` | Fetch + rebase develop lên main |

## Sơ đồ

```
main     ●─────────●─────────────────●──── hotfix
          \       /                 /
develop    ●──●──●──●──●──●──●──●──●
                \    /  \    /
feature          ●──●    ●──●
```
