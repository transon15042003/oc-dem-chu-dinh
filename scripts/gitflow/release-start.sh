#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

VERSION="${1:-}"
if [[ -z "$VERSION" ]]; then
  echo "Usage: npm run flow:release -- <version>"
  echo "Example: npm run flow:release -- 0.2.0"
  exit 1
fi

BRANCH="release/${VERSION}"

git fetch origin develop 2>/dev/null || true
git checkout develop 2>/dev/null || git checkout -b develop
git pull origin develop 2>/dev/null || true
git checkout -b "$BRANCH"

echo "✓ Đã tạo nhánh $BRANCH từ develop"
echo "  1. Bump version trong package.json"
echo "  2. Cập nhật CHANGELOG / ROADMAP"
echo "  3. npm run flow:release:finish -- $VERSION"
