# Git Flow — Ốc Đêm Chú Đỉnh

Hệ thống nhánh theo [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/), tối ưu cho dự án solo / nhóm nhỏ deploy Vercel.

## Nhánh chính

| Nhánh | Mục đích | Deploy |
|-------|----------|--------|
| `main` | Production — code đã QA, sẵn sàng live | Vercel Production |
| `develop` | Tích hợp tính năng — staging nội bộ | Vercel Preview (tùy chọn) |

**Quy tắc:** Không commit trực tiếp lên `main` hoặc `develop`. Mọi thay đổi đi qua Pull Request.

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
# Mở PR: release/0.2.0 → main (squash merge)
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
- Target `main` cho release / hotfix
- CI phải pass (lint + build) trước khi merge
- Squash merge cho feature; merge commit cho release

## Branch protection (GitHub)

Sau khi repo được tạo, bật trên GitHub → Settings → Branches:

### `main`
- Require pull request before merging (1 approval nếu có reviewer)
- Require status checks: `CI`
- Require branches up to date
- Không cho push trực tiếp

### `develop`
- Require pull request before merging
- Require status checks: `CI`

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
