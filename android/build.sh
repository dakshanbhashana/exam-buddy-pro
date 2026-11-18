#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEB="$(dirname "$ROOT")"
BUILD="$ROOT/build"
PLATFORM_ZIP="${ANDROID_PLATFORM_ZIP:-/data/data/com.termux/files/usr/tmp/opencode/sdk/platform-35.zip}"
ANDROID_JAR="$BUILD/android.jar"
KEYSTORE="$BUILD/exam-buddy.jks"
STORE_PASS="examBuddy2026"
OUT="$WEB/exam-buddy-lite.apk"

mkdir -p "$BUILD/gen" "$BUILD/classes" "$BUILD/dex" "$BUILD/tools-classes" "$ROOT/assets/www"

if [ ! -f "$ANDROID_JAR" ]; then
  python3 - "$PLATFORM_ZIP" "$ANDROID_JAR" <<'PY'
import sys, zipfile
with zipfile.ZipFile(sys.argv[1]) as z:
    with open(sys.argv[2], "wb") as f:
        f.write(z.read("android-35/android.jar"))
PY
fi

cp "$WEB/index.html" "$WEB/style.css" "$WEB/script.js" "$WEB/logo.svg" "$ROOT/assets/www/"

javac -encoding UTF-8 -d "$BUILD/tools-classes" "$ROOT/tools/MakeIcons.java"
java -cp "$BUILD/tools-classes" MakeIcons "$ROOT/res" >/dev/null

aapt2 compile --dir "$ROOT/res" -o "$BUILD/res.zip"
aapt2 link \
  -o "$BUILD/unsigned.apk" \
  -I "$ANDROID_JAR" \
  --manifest "$ROOT/AndroidManifest.xml" \
  -A "$ROOT/assets" \
  --java "$BUILD/gen" \
  --min-sdk-version 21 \
  --target-sdk-version 35 \
  "$BUILD/res.zip"

javac -source 8 -target 8 -encoding UTF-8 \
  -bootclasspath "$ANDROID_JAR" \
  -d "$BUILD/classes" \
  $(find "$ROOT/src" -name '*.java' | sort) \
  "$BUILD/gen/com/exambuddy/lite/R.java"

jar cf "$BUILD/classes.jar" -C "$BUILD/classes" .
d8 --release --lib "$ANDROID_JAR" --min-api 21 --output "$BUILD/dex" "$BUILD/classes.jar"

python3 "$ROOT/finalize_apk.py" "$BUILD/unsigned.apk" "$BUILD/dex/classes.dex" "$BUILD/aligned.apk"

if [ ! -f "$KEYSTORE" ]; then
  keytool -genkeypair -storetype JKS \
    -keystore "$KEYSTORE" \
    -storepass "$STORE_PASS" -keypass "$STORE_PASS" \
    -alias examBuddy \
    -dname "CN=Exam Buddy Lite, OU=Mobile, O=Exam Buddy, C=US" \
    -validity 10950 -keyalg RSA -keysize 2048 >/dev/null 2>&1
fi

apksigner sign \
  --ks "$KEYSTORE" \
  --ks-pass "pass:$STORE_PASS" \
  --key-pass "pass:$STORE_PASS" \
  --v1-signing-enabled true \
  --v2-signing-enabled true \
  --v3-signing-enabled true \
  --min-sdk-version 21 \
  --out "$OUT" \
  "$BUILD/aligned.apk"

apksigner verify --verbose --print-certs "$OUT"
ls -lh "$OUT"
