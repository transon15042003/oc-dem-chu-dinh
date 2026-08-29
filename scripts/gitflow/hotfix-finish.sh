#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

BRANCH="$(git branch --show-current)"
if [[ ! "$BRANCH" =~ ^hotfix/ ]]; then
  echo "Lỗi: phải đang ở nhánh hotfix/* (hiện tại: $BRANCH)"
  exit 1
fi

git push -u origin "$BRANCH"

echo "✓ Đã push $BRANCH"
echo "  Mở PR: $BRANCH → main (và merge back vào develop sau)"
