#!/usr/bin/env python3
"""Bump the app version from a release config file.

Config format (release-notes/vX.Y.Z.json):
{
  "versionCode": 7,
  "versionName": "1.6",
  "changelog": { "en": ["..."], "si": ["..."] },
  "releaseNotes": "Markdown for the GitHub release page"
}
"""
import datetime
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent


def main():
    if len(sys.argv) < 3:
        sys.exit("usage: bump_version.py <config.json> <notes-output.md>")

    config_path = pathlib.Path(sys.argv[1])
    notes_path = pathlib.Path(sys.argv[2])
    config = json.loads(config_path.read_text(encoding="utf-8"))

    version_name = str(config["versionName"])
    version_code = int(config["versionCode"])
    changelog = config.get("changelog") or {}
    if not isinstance(changelog, dict) or not changelog:
        sys.exit("config.changelog must be a non-empty object")

    manifest = ROOT / "android" / "AndroidManifest.xml"
    text = manifest.read_text(encoding="utf-8")
    text = re.sub(r'android:versionCode="\d+"', f'android:versionCode="{version_code}"', text)
    text = re.sub(r'android:versionName="[^"]*"', f'android:versionName="{version_name}"', text)
    manifest.write_text(text, encoding="utf-8")

    script = ROOT / "script.js"
    text = script.read_text(encoding="utf-8")
    text = re.sub(r'const APP_VERSION_NAME = "[^"]*";',
                  f'const APP_VERSION_NAME = "{version_name}";', text)
    text = re.sub(r'const APP_VERSION_CODE = \d+;',
                  f'const APP_VERSION_CODE = {version_code};', text)
    script.write_text(text, encoding="utf-8")

    index = ROOT / "index.html"
    text = index.read_text(encoding="utf-8")
    text = re.sub(r'Version \d+(?:\.\d+)*', f'Version {version_name}', text)
    index.write_text(text, encoding="utf-8")

    version_file = ROOT / "version.json"
    data = json.loads(version_file.read_text(encoding="utf-8"))
    data["versionCode"] = version_code
    data["versionName"] = version_name
    data["publishedAt"] = datetime.date.today().isoformat()
    data["changelog"] = changelog
    version_file.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    notes = config.get("releaseNotes")
    if not notes:
        lines = [f"## Exam Buddy Pro v{version_name}", ""]
        for lang in ("en", "si"):
            items = changelog.get(lang) or []
            if items:
                lines.append(f"### {'What\'s new' if lang == 'en' else 'අලුතෙන් එන දේ'}")
                lines.extend(f"- {item}" for item in items)
                lines.append("")
        notes = "\n".join(lines).strip() + "\n"
    notes_path.write_text(notes, encoding="utf-8")
    print(version_name)


if __name__ == "__main__":
    main()
