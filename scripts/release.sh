#!/usr/bin/env bash
# Build the APK and publish a new GitHub release.
#
# Usage:
#   export GH_TOKEN="<your github token>"
#   scripts/release.sh release-notes/v1.6.0.json
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONFIG="${1:?Usage: scripts/release.sh release-notes/vX.Y.Z.json}"
cd "$ROOT"

if [ -z "${GH_TOKEN:-}" ] && command -v gh >/dev/null 2>&1; then
  GH_TOKEN="$(gh auth token 2>/dev/null || true)"
  export GH_TOKEN
fi
: "${GH_TOKEN:?Set GH_TOKEN to a GitHub token with repo access, or log in with gh}"

NOTES="$(mktemp)"
trap 'rm -f "$NOTES"' EXIT

VERSION="$(python3 scripts/bump_version.py "$CONFIG" "$NOTES")"

bash android/build.sh

git add -A
if ! git diff --cached --quiet; then
  git commit -m "Release v$VERSION"
fi
AUTH="$(printf 'x-access-token:%s' "$GH_TOKEN" | base64 | tr -d '\n')"
git -c http.extraheader="AUTHORIZATION: basic $AUTH" push origin main

gh release create "v$VERSION" exam-buddy-lite.apk \
  --title "Exam Buddy Pro v$VERSION" \
  --notes-file "$NOTES"

echo "Released v$VERSION"
