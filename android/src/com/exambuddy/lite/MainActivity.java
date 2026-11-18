package com.exambuddy.lite;

import android.Manifest;
import android.app.Activity;
import android.app.AlarmManager;
import android.app.AlertDialog;
import android.app.NotificationManager;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
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
import java.util.ArrayList;

public class MainActivity extends Activity {
    private static final String HOST = "exam-buddy.local";
    private static final String BASE_URL = "https://" + HOST + "/index.html";

    private static final int REQUEST_PERMISSIONS = 51;
    private static final int REQUEST_EXACT_ALARM = 52;
    private static final int REQUEST_BACKGROUND_PERMISSIONS = 53;

    private static final String DATA_PREFS = "exam_buddy_data";
    private static final String SETTINGS_PREFS = "exam_buddy_settings";
    private static final String KEY_SNAPSHOT = "snapshot_json";
    private static final String KEY_SAVED_AT = "saved_at";
    private static final String KEY_LANGUAGE = "language";
    private static final String KEY_PERMISSIONS_REQUESTED = "permissions_requested";
    private static final String DATA_FILE = "exam-buddy-data.json";

    private WebView webView;
    private ActivityResultLauncher exactAlarmLauncher;
    private final Handler handler = new Handler(Looper.getMainLooper());
    private boolean permissionsFlowStarted = false;
    private boolean backPromptShown = false;
    private static volatile boolean appVisible = false;

    public static boolean isAppVisible() {
        return appVisible;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        webView = new WebView(this);
        webView.setBackgroundColor(Color.parseColor("#f4f7fb"));

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);

        webView.addJavascriptInterface(new DataBridge(), "ExamBuddyFileBridge");
        webView.addJavascriptInterface(new TimerBridge(), "ExamBuddyNative");

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
                if (!permissionsFlowStarted) {
                    permissionsFlowStarted = true;
                    handler.postDelayed(new Runnable() {
                        @Override
                        public void run() {
                            requestFirstOpenPermissions();
                        }
                    }, 1700);
                }
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

    @Override
    protected void onResume() {
        super.onResume();
        appVisible = true;
        if (webView != null) {
            webView.evaluateJavascript(
                    "(function(){try{if(window.ExamBuddyOnResume)window.ExamBuddyOnResume();}catch(e){}})();",
                    null);
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

    private void requestFirstOpenPermissions() {
        SharedPreferences prefs = settingsPrefs();
        if (prefs.getBoolean(KEY_PERMISSIONS_REQUESTED, false)) {
            requestExactAlarmIfNeeded();
            return;
        }
        ArrayList<String> missing = new ArrayList<String>();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                missing.add(Manifest.permission.POST_NOTIFICATIONS);
            }
        }
        if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.P) {
            if (checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
                missing.add(Manifest.permission.WRITE_EXTERNAL_STORAGE);
            }
            if (checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
                missing.add(Manifest.permission.READ_EXTERNAL_STORAGE);
            }
        } else if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.S_V2) {
            if (checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
                missing.add(Manifest.permission.READ_EXTERNAL_STORAGE);
            }
        }
        if (!missing.isEmpty()) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                requestPermissions(missing.toArray(new String[0]), REQUEST_PERMISSIONS);
            } else {
                prefs.edit().putBoolean(KEY_PERMISSIONS_REQUESTED, true).apply();
                requestExactAlarmIfNeeded();
            }
            return;
        }
        prefs.edit().putBoolean(KEY_PERMISSIONS_REQUESTED, true).apply();
        requestExactAlarmIfNeeded();
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
        if (requestCode == REQUEST_PERMISSIONS) {
            settingsPrefs().edit().putBoolean(KEY_PERMISSIONS_REQUESTED, true).apply();
            requestExactAlarmIfNeeded();
        } else if (requestCode == REQUEST_BACKGROUND_PERMISSIONS) {
            proceedWithBatteryRequest();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_EXACT_ALARM && exactAlarmLauncher != null) {
            exactAlarmLauncher.dispatch(resultCode);
        }
    }

    private boolean handleExternalUri(Uri uri) {
        if (uri == null) return false;
        String scheme = uri.getScheme();
        String host = uri.getHost();
        if (HOST.equals(host)) {
            return false;
        }
        if ("https".equalsIgnoreCase(scheme) || "http".equalsIgnoreCase(scheme)
                || "mailto".equalsIgnoreCase(scheme) || "tel".equalsIgnoreCase(scheme)
                || "intent".equalsIgnoreCase(scheme)) {
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
            if (json == null) {
                return false;
            }
            try {
                new JSONObject(json);
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
}
