# Branch protection cho Git Flow

Repo `oc-dem-chu-dinh` là portfolio public, deploy production từ `main` qua Vercel. Chúng tôi bảo vệ `main` và `develop` bằng PR bắt buộc + CI (`Lint & Build`), không yêu cầu approval (solo dev), và cho phép admin bypass trong trường hợp hotfix khẩn.

**Considered options:** (1) Private repo + GitHub Pro — từ chối vì chi phí không cần thiết cho portfolio. (2) Chỉ protect `main` — từ chối vì `develop` broken sẽ làm hỏng staging trước khi lên production. (3) Bắt 1 approval — từ chối vì không có reviewer, chỉ tạo friction tự approve.

**Merge strategy:** Squash cho `feature/* → develop`; merge commit cho `release/*` và `hotfix/* → main`. Rebase merge tắt để tránh rewrite history.

**Ngày chốt:** 2026-08-29 (phiên `/grill-with-docs`)
