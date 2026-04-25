#!/bin/bash
# LOHERB 集團網站 — 一鍵發佈流程
# Usage:  ./.deploy.sh "v1.0.1" "commit message"
#        or  ./.deploy.sh patch "commit message"       (自動 bump 最小版號)
#        or  ./.deploy.sh minor "commit message"       (新功能)
#        or  ./.deploy.sh major "commit message"       (重大改版)

set -e
cd "$(dirname "$0")"

BUMP_OR_TAG="${1:-patch}"
MSG="${2:-update}"

# --- 解析版本號 ---
LAST=$(git tag -l 'v*' --sort=-v:refname | head -n1)
if [[ "$BUMP_OR_TAG" == v* ]]; then
  NEW_TAG="$BUMP_OR_TAG"
else
  # 自動 bump
  IFS='.' read -r MAJ MIN PAT <<< "${LAST#v}"
  case "$BUMP_OR_TAG" in
    major) MAJ=$((MAJ+1)); MIN=0; PAT=0 ;;
    minor) MIN=$((MIN+1)); PAT=0 ;;
    patch|*) PAT=$((PAT+1)) ;;
  esac
  NEW_TAG="v${MAJ}.${MIN}.${PAT}"
fi

echo "🏷  新版本：$NEW_TAG（上一個：$LAST）"
echo "💬 訊息：$MSG"
echo ""

# --- 1. Git commit + tag + push ---
echo "📤 [1/3] Commit & push 到 GitHub..."
git add -A
if git diff --cached --quiet; then
  echo "   ⚠️  沒有變更檔案，略過 commit"
else
  git commit -m "$MSG"
fi
git tag -a "$NEW_TAG" -m "$NEW_TAG — $MSG"
git push && git push origin "$NEW_TAG"

# --- 2. 同步到 Firebase 部署資料夾（排除 firebase 設定檔）---
echo ""
echo "📁 [2/3] 同步到 Firebase 部署資料夾..."
rsync -a --exclude='.git' --exclude='.claude' --exclude='.deploy.sh' \
  --exclude='firebase.json' --exclude='.firebaserc' --exclude='.firebase-deploy.sh' \
  --exclude='functions/' \
  ./ /Users/ursa/Documents/loherb-firebase/

# --- 3. Firebase 部署 ---
echo ""
echo "🔥 [3/3] 部署到 Firebase Hosting..."
cd /Users/ursa/Documents/loherb-firebase
firebase deploy --only hosting:loherb-test --project loherb-shared-journal

echo ""
echo "✅ 完成！"
echo "   📌 版本：$NEW_TAG"
echo "   🌐 Firebase：https://loherb-test.web.app"
echo "   📦 GitHub：https://github.com/ursa0915/loherb-group/releases/tag/$NEW_TAG"
