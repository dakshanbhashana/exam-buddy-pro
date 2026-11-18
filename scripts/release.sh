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

: "${GH_TOKEN:?Set GH_TOKEN to a GitHub token with repo access}"

NOTES="$(mktemp)"
trap 'rm -f "$NOTES"' EXIT

VERSION="$(python3 scripts/bump_version.py "$CONFIG" "$NOTES")"

bash android/build.sh

git add -A
git commit -m "Release v$VERSION"
git -c credential.helper= -c 'credential.helper=!gh auth git-credential' push

gh release create "v$VERSION" exam-buddy-lite.apk \
  --title "Exam Buddy Pro v$VERSION" \
  --notes-file "$NOTES"

echo "Released v$VERSION"
