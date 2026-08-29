#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

git fetch origin
git checkout develop
git pull origin develop 2>/dev/null || true
git merge origin/main --no-edit || {
  echo "Có conflict khi sync develop ← main. Giải quyết thủ công rồi commit."
  exit 1
}
git push origin develop

echo "✓ develop đã đồng bộ với main"
