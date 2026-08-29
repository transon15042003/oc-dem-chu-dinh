#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

NAME="${1:-}"
if [[ -z "$NAME" ]]; then
  echo "Usage: npm run flow:feature -- <tên-tính-năng>"
  echo "Example: npm run flow:feature -- m3-thuc-don-filter"
  exit 1
fi

BRANCH="feature/${NAME}"

git fetch origin develop 2>/dev/null || true
git checkout develop 2>/dev/null || git checkout -b develop
git pull origin develop 2>/dev/null || true
git checkout -b "$BRANCH"

echo "✓ Đã tạo nhánh $BRANCH từ develop"
echo "  Sau khi xong: npm run flow:feature:finish"
