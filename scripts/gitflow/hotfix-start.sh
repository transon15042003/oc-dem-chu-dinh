#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

NAME="${1:-}"
if [[ -z "$NAME" ]]; then
  echo "Usage: npm run flow:hotfix -- <tên-sửa-lỗi>"
  echo "Example: npm run flow:hotfix -- fix-booking-email"
  exit 1
fi

BRANCH="hotfix/${NAME}"

git fetch origin main 2>/dev/null || true
git checkout main
git pull origin main 2>/dev/null || true
git checkout -b "$BRANCH"

echo "✓ Đã tạo nhánh $BRANCH từ main"
echo "  Sau khi xong: npm run flow:hotfix:finish"
