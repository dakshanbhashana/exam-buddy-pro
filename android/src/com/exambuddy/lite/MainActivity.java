package com.exambuddy.lite;

import android.Manifest;
import android.app.Activity;
import android.app.AlarmManager;
import android.app.AlertDialog;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.content.pm.SigningInfo;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.PowerManager;
import android.provider.Settings;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONObject;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import android.app.DownloadManager;
import android.database.Cursor;

public class MainActivity extends Activity {
    private static final String HOST = "exam-buddy.local";
    private static final String BASE_URL = "https://" + HOST + "/index.html";

    private static final int REQUEST_PERMISSIONS = 51;
    private static final int REQUEST_EXACT_ALARM = 52;
    private static final int REQUEST_BACKGROUND_PERMISSIONS = 53;
    private static final int REQUEST_NOTIFICATIONS = 54;
    private static final int REQUEST_INSTALL = 55;

    private static final String DATA_PREFS = "exam_buddy_data";
    private static final String SETTINGS_PREFS = "exam_buddy_settings";
    private static final String KEY_SNAPSHOT = "snapshot_json";
    private static final String KEY_SAVED_AT = "saved_at";
    private static final String KEY_LANGUAGE = "language";
    private static final String DATA_FILE = "exam-buddy-data.json";
    private static final String UPDATE_HOST = "github.com";
    private static final long UPDATE_POLL_MS = 650;

    private WebView webView;
    private ActivityResultLauncher exactAlarmLauncher;
    private final Handler handler = new Handler(Looper.getMainLooper());
    private boolean backPromptShown = false;
    private static volatile boolean appVisible = false;
    private static volatile MainActivity instance = null;

    private long downloadId = -1;
    private boolean updateDownloading = false;
    private String pendingUpdateUrl = null;
    private String pendingUpdateVersion = null;

    public static boolean isAppVisible() {
        return appVisible;
    }

    public static void notifyAlarmTriggered(String stateJson) {
        MainActivity activity = instance;
        if (activity == null) return;
        activity.evaluateAlarmScript(
                "if(window.ExamBuddyAlarmFired)window.ExamBuddyAlarmFired("
                        + JSONObject.quote(stateJson == null ? "{}" : stateJson) + ");");
    }

    public static void notifyAlarmStopped() {
        MainActivity activity = instance;
        if (activity == null) return;
        activity.evaluateAlarmScript(
                "if(window.ExamBuddyAlarmStopped)window.ExamBuddyAlarmStopped();");
    }

    public static void showInAppReminder(String title, String body) {
        MainActivity activity = instance;
        if (activity == null) return;
        activity.evaluateAlarmScript(
                "if(window.ExamBuddyInAppReminder)window.ExamBuddyInAppReminder("
                        + JSONObject.quote(title == null ? "" : title) + ","
                        + JSONObject.quote(body == null ? "" : body) + ");");
    }

    private void evaluateAlarmScript(final String js) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (webView == null) return;
                try {
                    webView.evaluateJavascript(js, null);
                } catch (Exception ignored) {
                }
            }
        });
    }

    private void pushAlarmState() {
        if (webView == null) return;
        try {
            String state = AlarmService.getStateJson();
            webView.evaluateJavascript(
                    "if(window.ExamBuddyAlarmState)window.ExamBuddyAlarmState("
                            + JSONObject.quote(state) + ");",
                    null);
        } catch (Exception ignored) {
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        instance = this;

        webView = new WebView(this);
        webView.setBackgroundColor(Color.parseColor("#fff1f2")); // Light rose background

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setAllowFileAccessFromFileURLs(false);
        settings.setAllowUniversalAccessFromFileURLs(false);
        settings.setJavaScriptCanOpenWindowsAutomatically(false);
        settings.setGeolocationEnabled(false);
        settings.setMediaPlaybackRequiresUserGesture(true);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setSaveFormData(false);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            settings.setSafeBrowsingEnabled(true);
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(false);
        }

        webView.addJavascriptInterface(new DataBridge(), "ExamBuddyFileBridge");
        webView.addJavascriptInterface(new TimerBridge(), "ExamBuddyNative");
        webView.addJavascriptInterface(new ReminderBridge(), "ExamBuddyReminders");
        webView.addJavascriptInterface(new AlarmBridge(), "ExamBuddyAlarm");
        webView.addJavascriptInterface(new PermissionBridge(), "ExamBuddyPermissions");
        webView.addJavascriptInterface(new UpdateBridge(), "ExamBuddyUpdate");

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if (!HOST.equals(uri.getHost())) {
                    return null;
                }
                return assetResponse(uri);
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                return handleExternalUri(uri);
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                try {
                    return handleExternalUri(Uri.parse(url));
                } catch (Exception e) {
                    return false;
                }
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                handler.postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        pushPermissionStatus();
                        pushAlarmState();
                    }
                }, 700);
            }
        });

        setContentView(webView);

        PermissionResultCallback noOpCallback = new PermissionResultCallback() {
            @Override
            public void onResult(int resultCode) {
            }
        };
        exactAlarmLauncher = registerForActivityResult(noOpCallback);

        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState);
        } else {
            webView.loadUrl(BASE_URL);
        }
    }

    private void pushPermissionStatus() {
        if (webView == null) return;
        webView.evaluateJavascript(
                "if(window.ExamBuddyPermissionsChanged) window.ExamBuddyPermissionsChanged();",
                null);
    }

    @Override
    protected void onResume() {
        super.onResume();
        appVisible = true;
        if (webView != null) {
            webView.evaluateJavascript(
                    "(function(){try{if(window.ExamBuddyOnResume)window.ExamBuddyOnResume();if(window.ExamBuddyPermissionsChanged)window.ExamBuddyPermissionsChanged();}catch(e){}})();",
                    null);
            handler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    pushAlarmState();
                }
            }, 350);
        }
        if (pendingUpdateUrl != null) {
            String url = pendingUpdateUrl;
            String version = pendingUpdateVersion;
            pendingUpdateUrl = null;
            pendingUpdateVersion = null;
            if (hasInstallPermission()) {
                startUpdateDownload(url, version);
            } else {
                updateStatus("permission", 0);
            }
        }
    }

    @Override
    protected void onPause() {
        appVisible = false;
        super.onPause();
    }

    private boolean hasNotificationPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            return checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED;
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            NotificationManager manager =
                    (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            return manager == null || manager.areNotificationsEnabled();
        }
        return true;
    }

    private boolean isIgnoringBatteryOptimizations() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
            return true;
        }
        PowerManager manager = (PowerManager) getSystemService(Context.POWER_SERVICE);
        return manager != null && manager.isIgnoringBatteryOptimizations(getPackageName());
    }

    private void requestBackgroundAccess() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU && !hasNotificationPermission()) {
            requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, REQUEST_BACKGROUND_PERMISSIONS);
            return;
        }
        proceedWithBatteryRequest();
    }

    private void proceedWithBatteryRequest() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !isIgnoringBatteryOptimizations()) {
            try {
                Intent intent = new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
                intent.setData(Uri.parse("package:" + getPackageName()));
                startActivity(intent);
                return;
            } catch (Exception ignored) {
            }
            try {
                startActivity(new Intent(Settings.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS));
                return;
            } catch (Exception ignored) {
            }
        }
    }

    private void handleTimerBackPress() {
        if (!backPromptShown && (!isIgnoringBatteryOptimizations() || !hasNotificationPermission())) {
            backPromptShown = true;
            boolean sinhala = "si".equals(settingsPrefs().getString(KEY_LANGUAGE, "en"));
            String title = sinhala ? "පසුබිම් කාලමානය" : "Keep timer running";
            String message = sinhala
                    ? "ඔබ යෙදුමෙන් පිටව ගියත් focus හෝ විවේක කාලමානය දිගටම ක්‍රියා කිරීමට පසුබිම් ක්‍රියාකාරීත්වය සහ බැටරි ප්‍රශස්තකරණයෙන් නිදහස් කිරීම අවශ්‍යයි. දැන් අවසර දෙන්නද?"
                    : "Allow background activity and ignore battery optimisation so your focus or break timer keeps running after you leave the app. Allow now?";
            String allow = sinhala ? "අවසර දෙන්න" : "Allow";
            String later = sinhala ? "පසුව" : "Later";
            new AlertDialog.Builder(this)
                    .setTitle(title)
                    .setMessage(message)
                    .setPositiveButton(allow, new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            requestBackgroundAccess();
                        }
                    })
                    .setNegativeButton(later, null)
                    .setOnDismissListener(new DialogInterface.OnDismissListener() {
                        @Override
                        public void onDismiss(DialogInterface dialog) {
                            handler.postDelayed(new Runnable() {
                                @Override
                                public void run() {
                                    moveTaskToBack(true);
                                }
                            }, 600);
                        }
                    })
                    .show();
            return;
        }
        moveTaskToBack(true);
    }

    private void requestExactAlarmIfNeeded() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) {
            return;
        }
        AlarmManager manager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
        if (manager != null && manager.canScheduleExactAlarms()) {
            return;
        }
        Intent intent = new Intent(Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM);
        try {
            exactAlarmLauncher.launch(intent);
        } catch (Exception ignored) {
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQUEST_BACKGROUND_PERMISSIONS) {
            proceedWithBatteryRequest();
        }
        pushPermissionStatus();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_EXACT_ALARM && exactAlarmLauncher != null) {
            exactAlarmLauncher.dispatch(resultCode);
        }
        pushPermissionStatus();
    }

    private boolean handleExternalUri(Uri uri) {
        if (uri == null) return false;
        String scheme = uri.getScheme();
        String host = uri.getHost();
        if (HOST.equals(host)) {
            return false;
        }
        if ("https".equalsIgnoreCase(scheme) || "http".equalsIgnoreCase(scheme)
                || "mailto".equalsIgnoreCase(scheme) || "tel".equalsIgnoreCase(scheme)) {
            try {
                Intent intent;
                if ("mailto".equalsIgnoreCase(scheme)) {
                    intent = new Intent(Intent.ACTION_SENDTO, uri);
                } else {
                    intent = new Intent(Intent.ACTION_VIEW, uri);
                }
                intent.addCategory(Intent.CATEGORY_BROWSABLE);
                if ("https".equalsIgnoreCase(scheme) || "http".equalsIgnoreCase(scheme)) {
                    String h = host == null ? "" : host.toLowerCase();
                    if (h.contains("wa.me") || h.contains("whatsapp.com") || h.contains("api.whatsapp.com")) {
                        intent.setPackage("com.whatsapp");
                        if (intent.resolveActivity(getPackageManager()) == null) {
                            intent.setPackage(null);
                        }
                    } else if (h.contains("youtube.com") || h.contains("youtu.be") || h.contains("m.youtube.com")) {
                        intent.setPackage("com.google.android.youtube");
                        if (intent.resolveActivity(getPackageManager()) == null) {
                            intent.setPackage(null);
                        }
                    }
                }
                startActivity(intent);
                return true;
            } catch (Exception e) {
                try {
                    if ("https".equalsIgnoreCase(scheme) || "http".equalsIgnoreCase(scheme)) {
                        Intent fallback = new Intent(Intent.ACTION_VIEW, uri);
                        fallback.addCategory(Intent.CATEGORY_BROWSABLE);
                        startActivity(fallback);
                        return true;
                    }
                } catch (Exception ignored) {
                }
            }
            return true;
        }
        return false;
    }

    private SharedPreferences dataPrefs() {
        return getSharedPreferences(DATA_PREFS, Context.MODE_PRIVATE);
    }

    private SharedPreferences settingsPrefs() {
        return getSharedPreferences(SETTINGS_PREFS, Context.MODE_PRIVATE);
    }

    private File privateDataFile() {
        return new File(getFilesDir(), DATA_FILE);
    }

    private File externalDataFile() {
        File directory = getExternalFilesDir(null);
        return directory == null ? null : new File(directory, DATA_FILE);
    }

    private WebResourceResponse assetResponse(Uri uri) {
        if (!HOST.equals(uri.getHost())) {
            return notFound();
        }

        String name = uri.getPath();
        if (name == null || name.equals("/") || name.isEmpty()) {
            name = "/index.html";
        }
        name = name.substring(1);
        if (name.contains("..") || name.contains("\\")) {
            return notFound();
        }

        String mime;
        if (name.endsWith(".html")) {
            mime = "text/html";
        } else if (name.endsWith(".css")) {
            mime = "text/css";
        } else if (name.endsWith(".js")) {
            mime = "application/javascript";
        } else if (name.endsWith(".png")) {
            mime = "image/png";
        } else if (name.endsWith(".svg")) {
            mime = "image/svg+xml";
        } else {
            mime = "application/octet-stream";
        }

        try {
            InputStream stream = getAssets().open("www/" + name);
            return new WebResourceResponse(mime, "UTF-8", stream);
        } catch (IOException e) {
            return notFound();
        }
    }

    private WebResourceResponse notFound() {
        return new WebResourceResponse("text/plain", "UTF-8", new ByteArrayInputStream(new byte[0]));
    }

    private void writeQuietly(File file, String json) {
        if (file == null) {
            return;
        }
        OutputStream out = null;
        try {
            File parent = file.getParentFile();
            if (parent != null && !parent.exists()) {
                parent.mkdirs();
            }
            out = new FileOutputStream(file, false);
            out.write(json.getBytes("UTF-8"));
            out.flush();
        } catch (Exception ignored) {
        } finally {
            closeQuietly(out);
        }
    }

    private String readQuietly(File file) {
        if (file == null || !file.exists()) {
            return null;
        }
        InputStream in = null;
        try {
            in = new FileInputStream(file);
            ByteArrayOutputStream buffer = new ByteArrayOutputStream();
            byte[] chunk = new byte[4096];
            int read;
            while ((read = in.read(chunk)) != -1) {
                buffer.write(chunk, 0, read);
                if (buffer.size() > 4000000) {
                    return null;
                }
            }
            return new String(buffer.toByteArray(), "UTF-8");
        } catch (Exception ignored) {
            return null;
        } finally {
            closeQuietly(in);
        }
    }

    private void closeQuietly(InputStream in) {
        if (in == null) {
            return;
        }
        try {
            in.close();
        } catch (IOException ignored) {
        }
    }

    private void closeQuietly(OutputStream out) {
        if (out == null) {
            return;
        }
        try {
            out.close();
        } catch (IOException ignored) {
        }
    }

    private ActivityResultLauncher registerForActivityResult(PermissionResultCallback callback) {
        return registerForActivityResult(callback, REQUEST_EXACT_ALARM);
    }

    private ActivityResultLauncher registerForActivityResult(PermissionResultCallback callback, int requestCode) {
        return new ActivityResultLauncher(this, requestCode, callback);
    }

    private interface PermissionResultCallback {
        void onResult(int resultCode);
    }

    private static final class ActivityResultLauncher {
        private final Activity activity;
        private final int requestCode;
        private final PermissionResultCallback callback;

        ActivityResultLauncher(Activity activity, int requestCode, PermissionResultCallback callback) {
            this.activity = activity;
            this.requestCode = requestCode;
            this.callback = callback;
        }

        void launch(Intent intent) {
            activity.startActivityForResult(intent, requestCode);
        }

        void request(String[] permissions) {
            ActivityCompat.requestPermissions(activity, permissions, requestCode);
        }

        void dispatch(int resultCode) {
            callback.onResult(resultCode);
        }
    }

    private static final class ActivityCompat {
        static void requestPermissions(Activity activity, String[] permissions, int requestCode) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                activity.requestPermissions(permissions, requestCode);
            }
        }
    }

    private void scheduleTaskReminder(String taskId, String kind, long triggerAt, String title,
                                      String body, boolean sound, String language) {
        ReminderScheduler.schedule(this, taskId, kind, triggerAt, title, body, sound, language);
    }

    private void cancelTaskReminder(String taskId, String kind) {
        ReminderScheduler.cancel(this, taskId, kind);
    }

    private class PermissionBridge {
        @JavascriptInterface
        public boolean isAvailable() {
            return true;
        }

        @JavascriptInterface
        public String getStatus() {
            try {
                JSONObject status = new JSONObject();
                status.put("notifications", hasNotificationPermission());

                boolean alarm = true;
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                    AlarmManager manager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
                    alarm = manager != null && manager.canScheduleExactAlarms();
                }
                status.put("alarm", alarm);
                status.put("battery", isIgnoringBatteryOptimizations());

                boolean storage = true;
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && Build.VERSION.SDK_INT <= Build.VERSION_CODES.P) {
                    storage = checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED;
                } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q && Build.VERSION.SDK_INT <= Build.VERSION_CODES.S_V2) {
                    storage = checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED;
                }
                status.put("files", storage);

                boolean install = true;
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    install = getPackageManager().canRequestPackageInstalls();
                }
                status.put("install", install);

                return status.toString();
            } catch (Exception e) {
                return "{}";
            }
        }

        @JavascriptInterface
        public void requestNotifications() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                        requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, REQUEST_NOTIFICATIONS);
                    }
                }
            });
        }

        @JavascriptInterface
        public void requestExactAlarm() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    requestExactAlarmIfNeeded();
                }
            });
        }

        @JavascriptInterface
        public void requestBattery() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    proceedWithBatteryRequest();
                }
            });
        }

        @JavascriptInterface
        public void requestFiles() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                        ArrayList<String> missing = new ArrayList<>();
                        if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.P) {
                            missing.add(Manifest.permission.WRITE_EXTERNAL_STORAGE);
                            missing.add(Manifest.permission.READ_EXTERNAL_STORAGE);
                        } else if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.S_V2) {
                            missing.add(Manifest.permission.READ_EXTERNAL_STORAGE);
                        }
                        if (!missing.isEmpty()) {
                            requestPermissions(missing.toArray(new String[0]), REQUEST_PERMISSIONS);
                        }
                    }
                }
            });
        }

        @JavascriptInterface
        public void requestInstall() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        if (!getPackageManager().canRequestPackageInstalls()) {
                            startActivity(new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, Uri.parse("package:" + getPackageName())));
                        }
                    }
                }
            });
        }

        @JavascriptInterface
        public void openSettings() {
            Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
            intent.setData(Uri.parse("package:" + getPackageName()));
            startActivity(intent);
        }
    }

    private boolean hasInstallPermission() {
        return Build.VERSION.SDK_INT < Build.VERSION_CODES.O
                || getPackageManager().canRequestPackageInstalls();
    }

    private boolean isTrustedUpdateUrl(String raw) {
        try {
            Uri uri = Uri.parse(raw == null ? "" : raw);
            if (!"https".equalsIgnoreCase(uri.getScheme())) return false;
            String host = uri.getHost();
            if (host == null) return false;
            host = host.toLowerCase();
            return UPDATE_HOST.equals(host)
                    || "raw.githubusercontent.com".equals(host)
                    || host.endsWith(".githubusercontent.com");
        } catch (Exception e) {
            return false;
        }
    }

    private void requestInstallPermission(String url, String version) {
        pendingUpdateUrl = url;
        pendingUpdateVersion = version;
        updateStatus("permission", 0);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            try {
                startActivity(new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,
                        Uri.parse("package:" + getPackageName())));
            } catch (Exception e) {
                try {
                    startActivity(new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES));
                } catch (Exception ignored) {
                }
            }
        } else {
            startUpdateDownload(url, version);
        }
    }

    private void startUpdateDownload(final String url, final String version) {
        updateDownloading = false;
        downloadId = -1;
        if (!isTrustedUpdateUrl(url)) {
            updateStatus("error", 0);
            return;
        }
        if (!hasInstallPermission()) {
            requestInstallPermission(url, version);
            return;
        }
        try {
            File dir = getExternalFilesDir(null);
            if (dir == null) throw new IOException("Storage unavailable");
            File target = new File(dir, UpdateFileProvider.FILE_NAME);
            if (target.exists() && !target.delete()) throw new IOException("Cannot replace old update");
            DownloadManager.Request request = new DownloadManager.Request(Uri.parse(url));
            request.setTitle("Exam Buddy update");
            request.setDescription(version == null || version.isEmpty()
                    ? "Downloading update..." : "Downloading " + version);
            request.setMimeType("application/vnd.android.package-archive");
            request.setAllowedOverMetered(true);
            request.setAllowedOverRoaming(false);
            request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
            request.setDestinationInExternalFilesDir(MainActivity.this, null, UpdateFileProvider.FILE_NAME);
            DownloadManager manager = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
            if (manager == null) throw new IOException("Download manager unavailable");
            downloadId = manager.enqueue(request);
            if (downloadId < 0) throw new IOException("Download did not start");
            updateDownloading = true;
            updateStatus("downloading", 0);
            handler.postDelayed(updatePoll, UPDATE_POLL_MS);
        } catch (Exception e) {
            finishUpdateWithError();
        }
    }

    private final Runnable updatePoll = new Runnable() {
        @Override
        public void run() {
            if (!updateDownloading) return;
            DownloadManager manager = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
            if (manager == null || downloadId < 0) {
                finishUpdateWithError();
                return;
            }
            Cursor cursor = null;
            try {
                DownloadManager.Query query = new DownloadManager.Query().setFilterById(downloadId);
                cursor = manager.query(query);
                if (cursor == null || !cursor.moveToFirst()) {
                    scheduleUpdatePoll();
                    return;
                }
                int status = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_STATUS));
                long done = cursor.getLong(cursor.getColumnIndex(DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR));
                long total = cursor.getLong(cursor.getColumnIndex(DownloadManager.COLUMN_TOTAL_SIZE_BYTES));
                if (status == DownloadManager.STATUS_SUCCESSFUL) {
                    updateDownloading = false;
                    downloadId = -1;
                    File dir = getExternalFilesDir(null);
                    File file = dir == null ? null : new File(dir, UpdateFileProvider.FILE_NAME);
                    if (!verifyApkSignature(file)) {
                        if (file != null && file.exists()) file.delete();
                        updateStatus("error", 0);
                        showToast("Update failed security verification", true);
                        return;
                    }
                    updateStatus("installing", 100);
                    installUpdateApk(file);
                    return;
                }
                if (status == DownloadManager.STATUS_FAILED) {
                    finishUpdateWithError();
                    return;
                }
                int progress = total > 0
                        ? (int) Math.max(0, Math.min(100, (done * 100) / total)) : 0;
                updateStatus("downloading", progress);
                scheduleUpdatePoll();
            } catch (Exception e) {
                finishUpdateWithError();
            } finally {
                if (cursor != null) cursor.close();
            }
        }
    };

    private void scheduleUpdatePoll() {
        if (updateDownloading) handler.postDelayed(updatePoll, UPDATE_POLL_MS);
    }

    private void finishUpdateWithError() {
        updateDownloading = false;
        downloadId = -1;
        updateStatus("error", 0);
    }

    private void updateStatus(String state, int progress) {
        if (webView == null) return;
        try {
            JSONObject status = new JSONObject();
            status.put("state", state);
            status.put("progress", progress);
            final String js = "if(window.ExamBuddyUpdateStatus)window.ExamBuddyUpdateStatus("
                    + JSONObject.quote(status.toString()) + ");";
            handler.post(new Runnable() {
                @Override
                public void run() {
                    if (webView != null) webView.evaluateJavascript(js, null);
                }
            });
        } catch (Exception ignored) {
        }
    }

    private Set<String> signatureDigests(Signature[] signatures) {
        Set<String> digests = new HashSet<String>();
        if (signatures == null) return digests;
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            for (Signature signature : signatures) {
                if (signature == null) continue;
                digest.reset();
                byte[] hash = digest.digest(signature.toByteArray());
                StringBuilder hex = new StringBuilder(hash.length * 2);
                for (byte value : hash) {
                    hex.append(String.format("%02x", value & 0xff));
                }
                digests.add(hex.toString());
            }
        } catch (Exception ignored) {
        }
        return digests;
    }

    private boolean verifyApkSignature(File file) {
        if (file == null || !file.isFile() || file.length() <= 0) return false;
        try {
            PackageManager manager = getPackageManager();
            int flags = Build.VERSION.SDK_INT >= Build.VERSION_CODES.P
                    ? PackageManager.GET_SIGNING_CERTIFICATES
                    : PackageManager.GET_SIGNATURES;
            PackageInfo archive = manager.getPackageArchiveInfo(file.getAbsolutePath(), flags);
            if (archive == null || !getPackageName().equals(archive.packageName)) return false;
            PackageInfo installed = manager.getPackageInfo(getPackageName(), flags);
            if (archive.versionCode <= installed.versionCode) return false;
            Signature[] archiveSignatures;
            Signature[] installedSignatures;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                SigningInfo archiveInfo = archive.signingInfo;
                SigningInfo installedInfo = installed.signingInfo;
                if (archiveInfo == null || installedInfo == null) return false;
                archiveSignatures = archiveInfo.hasMultipleSigners()
                        ? archiveInfo.getApkContentsSigners()
                        : archiveInfo.getSigningCertificateHistory();
                installedSignatures = installedInfo.hasMultipleSigners()
                        ? installedInfo.getApkContentsSigners()
                        : installedInfo.getSigningCertificateHistory();
            } else {
                archiveSignatures = archive.signatures;
                installedSignatures = installed.signatures;
            }
            Set<String> archiveDigests = signatureDigests(archiveSignatures);
            Set<String> installedDigests = signatureDigests(installedSignatures);
            return !archiveDigests.isEmpty() && archiveDigests.equals(installedDigests);
        } catch (Exception e) {
            return false;
        }
    }

    private void installUpdateApk(File file) {
        if (file == null || !file.isFile()) {
            updateStatus("error", 0);
            return;
        }
        try {
            Intent intent = new Intent(Intent.ACTION_VIEW);
            intent.setDataAndType(UpdateFileProvider.uri(), "application/vnd.android.package-archive");
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(intent);
        } catch (Exception e) {
            updateStatus("error", 0);
        }
    }

    private class UpdateBridge {
        @JavascriptInterface
        public boolean isAvailable() {
            return true;
        }

        @JavascriptInterface
        public void downloadAndInstall(final String url, final String version) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    startUpdateDownload(url, version);
                }
            });
        }
    }

    private void showToast(final String message, final boolean isError) {
        handler.post(new Runnable() {
            @Override
            public void run() {
                android.widget.Toast.makeText(MainActivity.this, message, android.widget.Toast.LENGTH_SHORT).show();
                if (webView != null) {
                    try {
                        String js = "if(window.showToast)window.showToast("
                                + JSONObject.quote(message == null ? "" : message)
                                + ",'" + (isError ? "error" : "info") + "');";
                        webView.evaluateJavascript(js, null);
                    } catch (Exception ignored) {
                    }
                }
            }
        });
    }

    private class ReminderBridge {
        @JavascriptInterface
        public boolean isAvailable() {
            return true;
        }

        @JavascriptInterface
        public boolean areNotificationsEnabled() {
            return hasNotificationPermission();
        }

        @JavascriptInterface
        public void requestNotificationPermission() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU
                            && !hasNotificationPermission()) {
                        requestPermissions(
                                new String[]{Manifest.permission.POST_NOTIFICATIONS},
                                REQUEST_NOTIFICATIONS);
                    }
                }
            });
        }

        @JavascriptInterface
        public void schedule(final String taskId, final String kind, final long triggerAt,
                             final String title, final String body, final boolean sound,
                             final String language) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    scheduleTaskReminder(taskId, kind, triggerAt, title, body, sound, language);
                }
            });
        }

        @JavascriptInterface
        public void cancel(final String taskId, final String kind) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    cancelTaskReminder(taskId, kind);
                }
            });
        }

        @JavascriptInterface
        public void cancelAll(final String taskId) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    ReminderScheduler.cancelAll(MainActivity.this, taskId);
                }
            });
        }
    }

    private class AlarmBridge {
        @JavascriptInterface
        public boolean isAvailable() {
            return true;
        }

        @JavascriptInterface
        public boolean isRinging() {
            return AlarmService.isRinging();
        }

        @JavascriptInterface
        public String getState() {
            return AlarmService.getStateJson();
        }

        @JavascriptInterface
        public void configure(String json) {
            AlarmService.configure(MainActivity.this, json);
        }

        @JavascriptInterface
        public boolean canUseFullScreen() {
            if (Build.VERSION.SDK_INT >= 34) {
                NotificationManager manager =
                        (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
                return manager == null || manager.canUseFullScreenIntent();
            }
            return true;
        }

        @JavascriptInterface
        public void requestFullScreen() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    if (Build.VERSION.SDK_INT < 34) return;
                    try {
                        Intent intent = new Intent(
                                Settings.ACTION_MANAGE_APP_USE_FULL_SCREEN_INTENT,
                                Uri.parse("package:" + getPackageName()));
                        startActivity(intent);
                    } catch (Exception ignored) {
                    }
                }
            });
        }

        @JavascriptInterface
        public void stop() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    AlarmService.stop(MainActivity.this);
                }
            });
        }

        @JavascriptInterface
        public void snooze() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    AlarmService.snooze(MainActivity.this);
                }
            });
        }

        @JavascriptInterface
        public void test(final String title, final String body, final String language) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    AlarmService.startAlarm(MainActivity.this,
                            title == null || title.trim().isEmpty() ? "Alarm test" : title,
                            body == null || body.trim().isEmpty() ? "Exam Buddy Pro" : body,
                            language == null ? "en" : language,
                            "test", "test",
                            "test:" + System.currentTimeMillis(), true);
                }
            });
        }
    }

    private class TimerBridge {
        @JavascriptInterface
        public boolean isAvailable() {
            return true;
        }

        @JavascriptInterface
        public void startTimer(final String mode, final long endsAt, final String modeLabel,
                               final String completeTitle, final String completeBody,
                               final String language, final boolean sound) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    TimerService.start(MainActivity.this, mode, endsAt, modeLabel,
                            completeTitle, completeBody, language, sound);
                }
            });
        }

        @JavascriptInterface
        public void stopTimer() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    TimerService.stop(MainActivity.this);
                }
            });
        }

        @JavascriptInterface
        public boolean isIgnoringBatteryOptimizations() {
            return MainActivity.this.isIgnoringBatteryOptimizations();
        }

        @JavascriptInterface
        public boolean areNotificationsEnabled() {
            return hasNotificationPermission();
        }

        @JavascriptInterface
        public void requestBackgroundAccess() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    MainActivity.this.requestBackgroundAccess();
                }
            });
        }
    }

    private class DataBridge {
        @JavascriptInterface
        public boolean isAvailable() {
            return true;
        }

        @JavascriptInterface
        public String getLanguage() {
            String language = settingsPrefs().getString(KEY_LANGUAGE, "en");
            return "si".equals(language) ? "si" : "en";
        }

        @JavascriptInterface
        public void setLanguage(String language) {
            String value = "si".equals(language) ? "si" : "en";
            settingsPrefs().edit().putString(KEY_LANGUAGE, value).apply();
        }

        @JavascriptInterface
        public boolean saveJson(String json) {
            if (json == null || json.length() > 2000000) {
                return false;
            }
            try {
                JSONObject parsed = new JSONObject(json);
                if (!parsed.has("exams") || !parsed.has("tasks")) {
                    return false;
                }
                writeQuietly(privateDataFile(), json);
                writeQuietly(externalDataFile(), json);
                dataPrefs().edit()
                        .putString(KEY_SNAPSHOT, json)
                        .putLong(KEY_SAVED_AT, System.currentTimeMillis())
                        .apply();
                return true;
            } catch (Exception ignored) {
                return false;
            }
        }

        @JavascriptInterface
        public String loadJson() {
            String json = readQuietly(privateDataFile());
            if (json == null) {
                json = readQuietly(externalDataFile());
            }
            if (json != null) {
                return json;
            }
            return dataPrefs().getString(KEY_SNAPSHOT, null);
        }
    }

    @Override
    public void onBackPressed() {
        if (TimerService.isRunning()) {
            handleTimerBackPress();
            return;
        }
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        webView.saveState(outState);
    }

    @Override
    protected void onDestroy() {
        if (instance == this) instance = null;
        super.onDestroy();
    }
}
