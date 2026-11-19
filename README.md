# Exam Buddy Pro

A lightweight Sinhala/English study companion for Android. Plan exams, track revision tasks, run Pomodoro focus sessions, and watch your progress add up — all offline and private on your device.

Built with HTML, CSS and JavaScript, packaged as an Android WebView app.

Alarm ringtones are CC0 public-domain sounds sourced from Wikimedia Commons: “Alarm Clock” and “Mechanical Clock Ring” by Yoo-toob-FX / Directory.Audio, and “Alarm Alert sound in United States 2025” by Ranch9613.

## Download

**[Download the latest APK](https://github.com/dakshanbhashana/exam-buddy-pro/releases/latest/download/exam-buddy-lite.apk)**

> Android may ask you to allow "Install unknown apps" for your browser or file manager the first time you install.

## Features

- **Live exam countdown** with preparation progress
- **Exams and tasks** with categories, priorities, search and filters
- **Focused detail sheets** when you tap a task, exam, or dashboard stat
- **Pomodoro focus timer** with configurable focus/break lengths and auto-start
- **Smart study plans** with tea, food and rest breaks plus automatic techniques
- **Insights** including a 7-day focus chart, task balance and study streak
- **Sinhala and English** interface with instant switching
- **Rose light and dark themes** with an automatic mode
- **Reliable task alarms** that ring even when the app is closed, with exact alarm-clock scheduling
- **Full-screen lock-screen alarm** with turn off and snooze, plus an in-app alarm popup
- **Bluetooth-aware audio** that plays through a connected headset or speaker, otherwise the phone speaker
- **Three bundled alarm ringtones** (CC0), vibration, volume ramp-up and a test-alarm button
- **Auto-stop protection** so an unattended alarm stops after one minute
- **Guided permissions** for notifications, alarms, battery, files and updates
- **Private by design** — data stays on your device, no account and no tracking
- **In-app updates** that verify the APK signature and open the installer

## Alarms

Task alarms are scheduled as exact alarm-clock events so they wake the device even in Doze. When an alarm fires, a foreground service starts within the broadcast, plays the selected ringtone on the alarm stream, and raises the alarm volume temporarily. If a Bluetooth A2DP/BLE audio device is connected, playback is routed to that device instead. The service posts a high-priority alarm notification with **Turn off** and **Snooze** actions and, when the app is not visible, a full-screen alarm activity over the lock screen. Alarms stop automatically after 60 seconds. Pending alarms are stored natively and rescheduled after a reboot or an app update.

## How updates work

Every release is published on the [GitHub Releases](https://github.com/dakshanbhashana/exam-buddy-pro/releases) page.

The app reads a small manifest at the root of this repository:

```
https://raw.githubusercontent.com/dakshanbhashana/exam-buddy-pro/main/version.json
```

`version.json` contains the latest `versionCode`, `versionName`, the APK download URL and the changelog in English and Sinhala. As soon as the loading screen finishes, the app fetches this file and compares the remote `versionCode` with its own. If the remote version is newer, an update dialog appears immediately with exactly what changed and a one-tap **Update now** button. The app downloads the APK, verifies its package name, signing certificate and version, then opens the Android installer — no need to visit GitHub.

Users can also check manually from **About → Check for updates**.

## Releasing a new version

1. Create a release config, for example `release-notes/v1.6.0.json`:

   ```json
   {
     "versionCode": 7,
     "versionName": "1.6",
     "changelog": {
       "en": ["First change", "Second change"],
       "si": ["පළමු වෙනස", "දෙවන වෙනස"]
     },
     "releaseNotes": "Markdown shown on the GitHub release page"
   }
   ```

2. Run the release script:

   ```bash
   export GH_TOKEN="<your GitHub token>"
   scripts/release.sh release-notes/v1.6.0.json
   ```

The script bumps the version in `AndroidManifest.xml`, `script.js`, `index.html` and `version.json`, rebuilds the signed APK, commits and pushes, then creates a GitHub release with the APK attached. Existing users receive the update the next time the app checks.

`versionCode` **must always increase** (6, 7, 8, ...). Android will not install an update with a lower or equal code.

## Building locally

Requirements: Termux (or Linux) with `openjdk-17`, `aapt2`, `d8`, `apksigner`, `keytool`, `python3` and an Android platform `android.jar`.

```bash
bash android/build.sh
```

Output: `exam-buddy-lite.apk` in the project root.

The build script creates a signing keystore at `android/build/exam-buddy.jks` if one does not exist. **Back this file up and keep it safe.** Android only installs updates signed with the same key, so losing it means future updates cannot be installed over existing installs.

The signing password is read from the git-ignored `android/build/signing.env` file:

```bash
export EXAM_BUDDY_STORE_PASS="your-keystore-password"
```

Alternatively, export `EXAM_BUDDY_STORE_PASS` before running the build. The keystore, signing settings and build folder are intentionally git-ignored.

## Project structure

```
index.html            App UI and update dialog markup
style.css             App styles, including detail and update dialogs
script.js             App logic, i18n and update checker
theme-init.js         Early light/dark theme bootstrap
logo.svg              App icon source
version.json          Update manifest read by installed apps
release-notes/        One JSON file per release
scripts/              Version bump and release automation
android/              Android WebView wrapper and build script
```

## Privacy

Exam Buddy Pro does not create accounts, does not run its own backend for study data, and does not sell personal information. Exams, tasks, focus sessions and settings are stored locally on the device. The only network request the app makes is an HTTPS request to GitHub to check for updates.

## Developer

Dakshan Bhashna
- WhatsApp: [wa.me/94743706283](https://wa.me/94743706283)
- Email: dakshanbhashana01@gmail.com

---

### සිංහලෙන් කෙටියෙන්

Exam Buddy Pro යනු විභාග සැලසුම් කිරීම, කාර්යයන් නිරීක්ෂණය සහ Pomodoro අවධාන සැසි සඳහා නිර්මාණය කළ සැහැල්ලු අධ්‍යයන යෙදුමකි. දත්ත සියල්ල ඔබේ දුරකථනයේම රැඳේ.

- **අලුත්ම APK බාගන්න:** [Releases](https://github.com/dakshanbhashana/exam-buddy-pro/releases/latest)
- නව සංස්කරණයක් නිකුත් වූ විට යෙදුම තුළින්ම වෙනස්කම් සහිත යාවත්කාලීන දැනුම්දීමක් පෙන්වයි.
- **About → Check for updates** මගින් අතින්ද පරීක්ෂා කළ හැක.
- නව සංස්කරණයක් නිකුත් කිරීමට `release-notes/` තුළ JSON එකක් සාදා `scripts/release.sh` ධාවනය කරන්න.
