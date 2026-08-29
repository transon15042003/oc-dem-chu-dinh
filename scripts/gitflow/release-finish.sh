#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

VERSION="${1:-}"
if [[ -z "$VERSION" ]]; then
  echo "Usage: npm run flow:release:finish -- <version>"
  exit 1
fi

BRANCH="release/${VERSION}"
TAG="v${VERSION}"

if [[ "$(git branch --show-current)" != "$BRANCH" ]]; then
  echo "Lỗi: phải đang ở nhánh $BRANCH"
  exit 1
fi

git push -u origin "$BRANCH"

echo "✓ Đã push $BRANCH"
echo "  Mở PR: $BRANCH → main"
echo "  Sau merge vào main, chạy:"
echo "    git checkout main && git pull"
echo "    git tag -a $TAG -m \"Release $TAG\""
echo "    git push origin $TAG"
