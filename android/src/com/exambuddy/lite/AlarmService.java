package com.exambuddy.lite;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ServiceInfo;
import android.content.res.AssetFileDescriptor;
import android.graphics.Color;
import android.media.AudioAttributes;
import android.media.AudioDeviceInfo;
import android.media.AudioFocusRequest;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.os.PowerManager;
import android.os.VibrationEffect;
import android.os.Vibrator;

import org.json.JSONObject;

public class AlarmService extends Service {
    public static final String ACTION_START = "com.exambuddy.lite.action.START_ALARM";

    public static final String EXTRA_TITLE = "alarm_title";
    public static final String EXTRA_BODY = "alarm_body";
    public static final String EXTRA_LANGUAGE = "alarm_language";
    public static final String EXTRA_TASK_ID = "alarm_task_id";
    public static final String EXTRA_KIND = "alarm_kind";
    public static final String EXTRA_ALARM_ID = "alarm_id";
    public static final String EXTRA_VISIBLE = "alarm_visible";

    public static final String SETTINGS_PREFS = "exam_buddy_alarm_settings";
    public static final String KEY_TONE = "tone";
    public static final String KEY_VIBRATE = "vibrate";
    public static final String KEY_BLUETOOTH = "bluetooth";
    public static final String KEY_SNOOZE = "snooze";
    public static final String KEY_VOLUME_RAMP = "volume_ramp";

    private static final String STATE_PREFS = "exam_buddy_alarm_state";
    private static final String KEY_ACTIVE = "active";
    private static final String KEY_TITLE = "title";
    private static final String KEY_BODY = "body";
    private static final String KEY_LANGUAGE = "language";
    private static final String KEY_TASK_ID = "task_id";
    private static final String KEY_KIND = "kind";
    private static final String KEY_TONE_VALUE = "tone";
    private static final String KEY_STARTED_AT = "started_at";
    private static final String KEY_AUTO_STOP_AT = "auto_stop_at";
    private static final String KEY_ALARM_ID = "alarm_id";
    private static final String KEY_VISIBLE = "visible";

    private static final String CHANNEL_ALARM = "exam_buddy_alarm_full";
    private static final int NOTIF_ALARM = 4301;
    private static final long ALARM_TIMEOUT_MS = 60000L;
    private static final long RAMP_STEP_MS = 380L;
    private static final int RAMP_STEPS = 8;

    private static volatile boolean ringing = false;
    private static volatile String title = "Alarm";
    private static volatile String body = "Exam Buddy Pro";
    private static volatile String language = "en";
    private static volatile String taskId = "";
    private static volatile String kind = "";
    private static volatile String alarmId = "";
    private static volatile int tone = 0;
    private static volatile int snoozeMinutes = 5;
    private static volatile boolean visible = false;
    private static volatile long startedAt = 0L;
    private static volatile long autoStopAt = 0L;
    private static volatile AlarmService instance = null;

    private final Handler handler = new Handler(Looper.getMainLooper());
    private MediaPlayer player;
    private AudioManager audioManager;
    private AudioFocusRequest focusRequest;
    private Vibrator vibrator;
    private PowerManager.WakeLock wakeLock;
    private int previousVolume = -1;
    private int raisedStream = -1;
    private int rampStep = 0;
    private boolean playingThroughBluetooth = false;

    private final AudioManager.OnAudioFocusChangeListener focusListener =
            new AudioManager.OnAudioFocusChangeListener() {
                @Override
                public void onAudioFocusChange(int focusChange) {
                    if (focusChange == AudioManager.AUDIOFOCUS_LOSS && player != null) {
                        try {
                            player.setVolume(0.25f, 0.25f);
                        } catch (Exception ignored) {
                        }
                    }
                }
            };

    private final Runnable volumeRamp = new Runnable() {
        @Override
        public void run() {
            if (!ringing || player == null) return;
            rampStep += 1;
            float level = Math.min(1f, 0.28f + (0.72f * rampStep / RAMP_STEPS));
            try {
                player.setVolume(level, level);
            } catch (Exception ignored) {
            }
            if (rampStep < RAMP_STEPS) {
                handler.postDelayed(this, RAMP_STEP_MS);
            }
        }
    };

    private final Runnable autoStop = new Runnable() {
        @Override
        public void run() {
            stopAlarm();
        }
    };

    public static boolean isRinging() {
        return ringing;
    }

    public static long getRemainingMillis() {
        if (!ringing) return 0L;
        return Math.max(0L, autoStopAt - System.currentTimeMillis());
    }

    public static int getSnoozeMinutes() {
        return snoozeMinutes;
    }

    public static void configure(Context context, String json) {
        SharedPreferences prefs =
                context.getSharedPreferences(SETTINGS_PREFS, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();
        try {
            JSONObject settings = new JSONObject(json == null ? "{}" : json);
            int nextTone = settings.optInt("tone", 0);
            if (nextTone < 0 || nextTone > 2) nextTone = 0;
            editor.putInt(KEY_TONE, nextTone);
            editor.putBoolean(KEY_VIBRATE, settings.optBoolean("vibrate", true));
            editor.putBoolean(KEY_BLUETOOTH, settings.optBoolean("bluetooth", true));
            editor.putBoolean(KEY_VOLUME_RAMP, settings.optBoolean("volumeRamp", true));
            int nextSnooze = settings.optInt("snooze", 5);
            editor.putInt(KEY_SNOOZE, Math.max(1, Math.min(30, nextSnooze)));
            editor.apply();
        } catch (Exception ignored) {
        }
    }

    public static void startAlarm(Context context, String alarmTitle, String alarmBody,
                                  String alarmLanguage, String sourceTaskId, String sourceKind,
                                  String id, boolean isVisible) {
        Intent intent = new Intent(context, AlarmService.class);
        intent.setAction(ACTION_START);
        intent.putExtra(EXTRA_TITLE, alarmTitle);
        intent.putExtra(EXTRA_BODY, alarmBody);
        intent.putExtra(EXTRA_LANGUAGE, alarmLanguage);
        intent.putExtra(EXTRA_TASK_ID, sourceTaskId);
        intent.putExtra(EXTRA_KIND, sourceKind);
        intent.putExtra(EXTRA_ALARM_ID, id);
        intent.putExtra(EXTRA_VISIBLE, isVisible);
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                context.startForegroundService(intent);
            } else {
                context.startService(intent);
            }
        } catch (Exception ignored) {
            try {
                context.startService(intent);
            } catch (Exception ignoredAgain) {
            }
        }
    }

    public static String getStateJson() {
        try {
            JSONObject state = new JSONObject();
            state.put("ringing", ringing);
            if (ringing) {
                state.put("title", title == null ? "" : title);
                state.put("body", body == null ? "" : body);
                state.put("language", language == null ? "en" : language);
                state.put("taskId", taskId == null ? "" : taskId);
                state.put("kind", kind == null ? "" : kind);
                state.put("tone", tone);
                state.put("startedAt", startedAt);
                state.put("autoStopAt", autoStopAt);
                state.put("autoStopIn", Math.max(0L, autoStopAt - System.currentTimeMillis()));
                state.put("snoozeMinutes", snoozeMinutes);
            }
            return state.toString();
        } catch (Exception ignored) {
            return "{\"ringing\":false}";
        }
    }

    public static void stop(Context context) {
        Context app = context.getApplicationContext();
        AlarmService service = instance;
        if (service != null) {
            service.stopAlarm();
        } else {
            ringing = false;
            clearPersistedState(app);
            cancelNotification(app);
            notifyStopped();
            try {
                app.stopService(new Intent(app, AlarmService.class));
            } catch (Exception ignored) {
            }
        }
    }

    public static void snooze(Context context) {
        Context app = context.getApplicationContext();
        SharedPreferences state = app.getSharedPreferences(STATE_PREFS, Context.MODE_PRIVATE);
        SharedPreferences settings = app.getSharedPreferences(SETTINGS_PREFS, Context.MODE_PRIVATE);
        String nextTitle = ringing ? title : state.getString(KEY_TITLE, "Alarm");
        String nextBody = ringing ? body : state.getString(KEY_BODY, "Exam Buddy Pro");
        String nextLanguage = ringing ? language : state.getString(KEY_LANGUAGE, "en");
        String nextTaskId = ringing ? taskId : state.getString(KEY_TASK_ID, "");
        int minutes = Math.max(1, Math.min(30, settings.getInt(KEY_SNOOZE, 5)));
        long when = System.currentTimeMillis() + minutes * 60000L;
        ReminderScheduler.schedule(app, nextTaskId, "snooze-" + when, when,
                nextTitle, nextBody, true, nextLanguage);
        stop(app);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;
        audioManager = (AudioManager) getSystemService(Context.AUDIO_SERVICE);
        vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
        ensureChannels();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent == null) {
            return restoreFromState();
        }
        String action = intent.getAction();
        if (action == null || !ACTION_START.equals(action)) {
            return START_NOT_STICKY;
        }

        String nextAlarmId = safe(intent.getStringExtra(EXTRA_ALARM_ID));
        if (ringing && !nextAlarmId.isEmpty() && nextAlarmId.equals(alarmId)) {
            updateNotification();
            return START_REDELIVER_INTENT;
        }

        String nextTitle = safe(intent.getStringExtra(EXTRA_TITLE));
        String nextBody = safe(intent.getStringExtra(EXTRA_BODY));
        String nextLanguage = safe(intent.getStringExtra(EXTRA_LANGUAGE));
        String nextTaskId = safe(intent.getStringExtra(EXTRA_TASK_ID));
        String nextKind = safe(intent.getStringExtra(EXTRA_KIND));
        boolean nextVisible = MainActivity.isAppVisible() || intent.getBooleanExtra(EXTRA_VISIBLE, false);

        if (nextTitle.isEmpty()) nextTitle = "Alarm";
        if (nextBody.isEmpty()) nextBody = "Exam Buddy Pro";
        if (nextLanguage.isEmpty()) nextLanguage = "en";
        if (nextKind.isEmpty()) nextKind = "alarm";

        SharedPreferences settings =
                getSharedPreferences(SETTINGS_PREFS, Context.MODE_PRIVATE);
        tone = Math.max(0, Math.min(2, settings.getInt(KEY_TONE, 0)));
        snoozeMinutes = Math.max(1, Math.min(30, settings.getInt(KEY_SNOOZE, 5)));

        if (ringing) {
            stopPlayback();
        }

        title = nextTitle;
        body = nextBody;
        language = nextLanguage;
        taskId = nextTaskId;
        kind = nextKind;
        alarmId = nextAlarmId;
        visible = nextVisible;
        startedAt = System.currentTimeMillis();
        autoStopAt = startedAt + ALARM_TIMEOUT_MS;
        ringing = true;
        rampStep = 0;

        savePersistedState();
        startForegroundCompat(buildAlarmNotification());
        acquireWakeLock();
        startPlayback();
        startVibration();
        handler.removeCallbacks(autoStop);
        handler.postDelayed(autoStop, ALARM_TIMEOUT_MS);

        if (visible) {
            MainActivity.notifyAlarmTriggered(getStateJson());
        }
        return START_REDELIVER_INTENT;
    }

    private int restoreFromState() {
        SharedPreferences prefs = getSharedPreferences(STATE_PREFS, Context.MODE_PRIVATE);
        long savedAutoStop = prefs.getLong(KEY_AUTO_STOP_AT, 0L);
        if (!prefs.getBoolean(KEY_ACTIVE, false) || savedAutoStop <= System.currentTimeMillis()) {
            clearPersistedState(this);
            stopSelf();
            return START_NOT_STICKY;
        }
        title = prefs.getString(KEY_TITLE, "Alarm");
        body = prefs.getString(KEY_BODY, "Exam Buddy Pro");
        language = prefs.getString(KEY_LANGUAGE, "en");
        taskId = prefs.getString(KEY_TASK_ID, "");
        kind = prefs.getString(KEY_KIND, "alarm");
        tone = prefs.getInt(KEY_TONE_VALUE, 0);
        alarmId = prefs.getString(KEY_ALARM_ID, "");
        visible = prefs.getBoolean(KEY_VISIBLE, false);
        startedAt = prefs.getLong(KEY_STARTED_AT, System.currentTimeMillis());
        autoStopAt = savedAutoStop;
        SharedPreferences settings =
                getSharedPreferences(SETTINGS_PREFS, Context.MODE_PRIVATE);
        snoozeMinutes = Math.max(1, Math.min(30, settings.getInt(KEY_SNOOZE, 5)));
        ringing = true;
        rampStep = 0;
        startForegroundCompat(buildAlarmNotification());
        acquireWakeLock();
        startPlayback();
        startVibration();
        handler.removeCallbacks(autoStop);
        handler.postDelayed(autoStop, Math.max(500L, autoStopAt - System.currentTimeMillis()));
        if (visible) {
            MainActivity.notifyAlarmTriggered(getStateJson());
        }
        return START_REDELIVER_INTENT;
    }

    private void stopAlarm() {
        if (!ringing) {
            stopSelf();
            return;
        }
        ringing = false;
        handler.removeCallbacks(autoStop);
        stopPlayback();
        stopVibration();
        releaseWakeLock();
        cancelNotification(this);
        clearPersistedState(this);
        notifyStopped();
        try {
            stopForeground(true);
        } catch (Exception ignored) {
        }
        stopSelf();
    }

    private static void notifyStopped() {
        MainActivity.notifyAlarmStopped();
    }

    private void startPlayback() {
        stopPlayback();
        if (audioManager == null) {
            audioManager = (AudioManager) getSystemService(Context.AUDIO_SERVICE);
        }
        int resId = toneResource(tone);
        AudioDeviceInfo bluetoothDevice = findBluetoothDevice();
        SharedPreferences settings =
                getSharedPreferences(SETTINGS_PREFS, Context.MODE_PRIVATE);
        boolean bluetoothOnly = settings.getBoolean(KEY_BLUETOOTH, true);
        boolean ramp = settings.getBoolean(KEY_VOLUME_RAMP, true);
        playingThroughBluetooth = bluetoothOnly && bluetoothDevice != null;
        int stream = playingThroughBluetooth
                ? AudioManager.STREAM_MUSIC : AudioManager.STREAM_ALARM;

        if (audioManager != null) {
            try {
                previousVolume = audioManager.getStreamVolume(stream);
                raisedStream = stream;
                int max = audioManager.getStreamMaxVolume(stream);
                audioManager.setStreamVolume(stream, max, 0);
            } catch (Exception ignored) {
            }
        }

        AudioAttributes attributes = new AudioAttributes.Builder()
                .setUsage(playingThroughBluetooth
                        ? AudioAttributes.USAGE_MEDIA : AudioAttributes.USAGE_ALARM)
                .setContentType(playingThroughBluetooth
                        ? AudioAttributes.CONTENT_TYPE_MUSIC : AudioAttributes.CONTENT_TYPE_SONIFICATION)
                .build();

        try {
            player = new MediaPlayer();
            AssetFileDescriptor descriptor = getResources().openRawResourceFd(resId);
            if (descriptor != null) {
                player.setDataSource(descriptor.getFileDescriptor(),
                        descriptor.getStartOffset(), descriptor.getLength());
                descriptor.close();
            } else {
                player.setDataSource(copyRawTone(resId).getAbsolutePath());
            }
            player.setAudioAttributes(attributes);
            player.setLooping(true);
            if (playingThroughBluetooth) {
                try {
                    player.setPreferredDevice(bluetoothDevice);
                } catch (Exception ignored) {
                }
            }
            requestAudioFocus(attributes);
            player.prepare();
            player.setVolume(ramp ? 0.28f : 1f, ramp ? 0.28f : 1f);
            player.start();
            if (ramp) {
                rampStep = 0;
                handler.removeCallbacks(volumeRamp);
                handler.postDelayed(volumeRamp, RAMP_STEP_MS);
            }
        } catch (Exception ignored) {
            stopPlayback();
        }
    }

    private void requestAudioFocus(AudioAttributes attributes) {
        if (audioManager == null) return;
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                focusRequest = new AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN_TRANSIENT)
                        .setAudioAttributes(attributes)
                        .setOnAudioFocusChangeListener(focusListener)
                        .build();
                audioManager.requestAudioFocus(focusRequest);
            } else {
                audioManager.requestAudioFocus(focusListener,
                        playingThroughBluetooth ? AudioManager.STREAM_MUSIC : AudioManager.STREAM_ALARM,
                        AudioManager.AUDIOFOCUS_GAIN_TRANSIENT);
            }
        } catch (Exception ignored) {
        }
    }

    private void stopPlayback() {
        handler.removeCallbacks(volumeRamp);
        if (player != null) {
            try {
                player.stop();
            } catch (Exception ignored) {
            }
            try {
                player.release();
            } catch (Exception ignored) {
            }
            player = null;
        }
        if (audioManager != null) {
            try {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && focusRequest != null) {
                    audioManager.abandonAudioFocusRequest(focusRequest);
                } else {
                    audioManager.abandonAudioFocus(focusListener);
                }
            } catch (Exception ignored) {
            }
            focusRequest = null;
            try {
                if (raisedStream >= 0 && previousVolume >= 0) {
                    audioManager.setStreamVolume(raisedStream, previousVolume, 0);
                }
            } catch (Exception ignored) {
            }
        }
        raisedStream = -1;
        previousVolume = -1;
    }

    private void startVibration() {
        SharedPreferences settings =
                getSharedPreferences(SETTINGS_PREFS, Context.MODE_PRIVATE);
        if (!settings.getBoolean(KEY_VIBRATE, true)) return;
        if (vibrator == null) vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
        if (vibrator == null || !vibrator.hasVibrator()) return;
        long[] pattern = new long[]{0L, 650L, 420L, 650L, 900L};
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                vibrator.vibrate(VibrationEffect.createWaveform(pattern, 0));
            } else {
                vibrator.vibrate(pattern, 0);
            }
        } catch (Exception ignored) {
        }
    }

    private void stopVibration() {
        if (vibrator == null) vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
        if (vibrator == null) return;
        try {
            vibrator.cancel();
        } catch (Exception ignored) {
        }
    }

    private AudioDeviceInfo findBluetoothDevice() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M || audioManager == null) {
            return null;
        }
        try {
            AudioDeviceInfo fallback = null;
            for (AudioDeviceInfo device : audioManager.getDevices(AudioManager.GET_DEVICES_OUTPUTS)) {
                int type = device.getType();
                if (type == AudioDeviceInfo.TYPE_BLUETOOTH_A2DP
                        || type == AudioDeviceInfo.TYPE_BLE_HEADSET
                        || type == AudioDeviceInfo.TYPE_BLE_SPEAKER) {
                    return device;
                }
                if (fallback == null && (type == AudioDeviceInfo.TYPE_BLUETOOTH_SCO
                        || type == AudioDeviceInfo.TYPE_HEARING_AID)) {
                    fallback = device;
                }
            }
            return fallback;
        } catch (Exception ignored) {
            return null;
        }
    }

    private int toneResource(int index) {
        if (index == 1) return R.raw.alarm_mechanical;
        if (index == 2) return R.raw.alarm_beep;
        return R.raw.alarm_classic;
    }

    private java.io.File copyRawTone(int resId) throws Exception {
        java.io.File target = new java.io.File(getCacheDir(),
                "alarm_tone_" + tone + ".ogg");
        if (target.isFile() && target.length() > 0) return target;
        java.io.InputStream in = getResources().openRawResource(resId);
        java.io.FileOutputStream out = new java.io.FileOutputStream(target);
        byte[] buffer = new byte[8192];
        int read;
        try {
            while ((read = in.read(buffer)) != -1) {
                out.write(buffer, 0, read);
            }
            out.flush();
        } finally {
            try {
                in.close();
            } catch (Exception ignored) {
            }
            try {
                out.close();
            } catch (Exception ignored) {
            }
        }
        return target;
    }

    public static void ensureChannels(Context context) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return;
        NotificationManager manager =
                (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        if (manager == null) return;
        NotificationChannel channel = new NotificationChannel(
                CHANNEL_ALARM,
                "Study alarms",
                NotificationManager.IMPORTANCE_HIGH);
        channel.setDescription("Full alarm sound for task reminders and finished timers");
        channel.setSound(null, null);
        channel.enableVibration(false);
        channel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
        channel.setShowBadge(true);
        manager.createNotificationChannel(channel);
    }

    private void ensureChannels() {
        ensureChannels(this);
    }

    private void startForegroundCompat(Notification notification) {
        try {
            if (Build.VERSION.SDK_INT >= 34) {
                startForeground(NOTIF_ALARM, notification,
                        ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE);
            } else {
                startForeground(NOTIF_ALARM, notification);
            }
        } catch (Exception ignored) {
        }
    }

    private Notification buildAlarmNotification() {
        ensureChannels();
        Intent openIntent = new Intent(this, AlarmActivity.class);
        openIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        openIntent.putExtra(AlarmActivity.EXTRA_TITLE, title);
        openIntent.putExtra(AlarmActivity.EXTRA_BODY, body);
        openIntent.putExtra(AlarmActivity.EXTRA_LANGUAGE, language);

        Intent stopIntent = new Intent(this, AlarmActionReceiver.class);
        stopIntent.setAction(AlarmActionReceiver.ACTION_STOP);
        Intent snoozeIntent = new Intent(this, AlarmActionReceiver.class);
        snoozeIntent.setAction(AlarmActionReceiver.ACTION_SNOOZE);

        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            flags |= PendingIntent.FLAG_IMMUTABLE;
        }
        PendingIntent open = PendingIntent.getActivity(this, 4310, openIntent, flags);
        PendingIntent stop = PendingIntent.getBroadcast(this, 4311, stopIntent, flags);
        PendingIntent snooze = PendingIntent.getBroadcast(this, 4312, snoozeIntent, flags);

        boolean sinhala = "si".equals(language);
        String heading = sinhala ? "Exam Buddy ඇලාම්" : "Exam Buddy alarm";
        String autoText = sinhala
                ? "තත්පර 60කින් ස්වයංක්‍රීයව නවතී"
                : "Stops automatically in 60 seconds";
        String stopLabel = sinhala ? "ඇලාම් නවත්වන්න" : "Turn off alarm";
        String snoozeLabel = sinhala
                ? "විනාඩි " + snoozeMinutes + "ක් පසු කරන්න"
                : "Snooze " + snoozeMinutes + " min";

        Notification.Builder builder;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            builder = new Notification.Builder(this, CHANNEL_ALARM);
        } else {
            builder = new Notification.Builder(this);
            builder.setPriority(Notification.PRIORITY_HIGH);
            builder.setDefaults(0);
        }
        builder.setSmallIcon(R.drawable.ic_stat_timer)
                .setContentTitle(title)
                .setContentText(body)
                .setStyle(new Notification.BigTextStyle().bigText(body))
                .setSubText(heading)
                .setOngoing(true)
                .setAutoCancel(false)
                .setContentIntent(open)
                .setCategory(Notification.CATEGORY_ALARM)
                .setVisibility(Notification.VISIBILITY_PUBLIC)
                .setOnlyAlertOnce(true)
                .setWhen(startedAt)
                .setShowWhen(true)
                .addAction(R.drawable.ic_stat_timer, stopLabel, stop)
                .addAction(R.drawable.ic_stat_timer, snoozeLabel, snooze)
                .setDeleteIntent(stop);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            builder.setColor(Color.parseColor("#e11d48"));
        }
        if (!visible) {
            builder.setFullScreenIntent(open, true);
        }
        return builder.build();
    }

    private void updateNotification() {
        NotificationManager manager =
                (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        if (manager == null) return;
        try {
            manager.notify(NOTIF_ALARM, buildAlarmNotification());
        } catch (Exception ignored) {
        }
    }

    private static void cancelNotification(Context context) {
        NotificationManager manager =
                (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        if (manager == null) return;
        try {
            manager.cancel(NOTIF_ALARM);
        } catch (Exception ignored) {
        }
    }

    private void acquireWakeLock() {
        try {
            PowerManager power = (PowerManager) getSystemService(Context.POWER_SERVICE);
            if (power == null) return;
            if (wakeLock == null) {
                wakeLock = power.newWakeLock(
                        PowerManager.PARTIAL_WAKE_LOCK, "ExamBuddy:alarm");
                wakeLock.setReferenceCounted(false);
            }
            wakeLock.acquire(ALARM_TIMEOUT_MS + 15000L);
        } catch (Exception ignored) {
        }
    }

    private void releaseWakeLock() {
        try {
            if (wakeLock != null && wakeLock.isHeld()) wakeLock.release();
        } catch (Exception ignored) {
        }
        wakeLock = null;
    }

    private void savePersistedState() {
        SharedPreferences.Editor editor =
                getSharedPreferences(STATE_PREFS, Context.MODE_PRIVATE).edit();
        editor.putBoolean(KEY_ACTIVE, true)
                .putString(KEY_TITLE, title)
                .putString(KEY_BODY, body)
                .putString(KEY_LANGUAGE, language)
                .putString(KEY_TASK_ID, taskId)
                .putString(KEY_KIND, kind)
                .putInt(KEY_TONE_VALUE, tone)
                .putLong(KEY_STARTED_AT, startedAt)
                .putLong(KEY_AUTO_STOP_AT, autoStopAt)
                .putString(KEY_ALARM_ID, alarmId)
                .putBoolean(KEY_VISIBLE, visible)
                .apply();
    }

    private static void clearPersistedState(Context context) {
        try {
            context.getSharedPreferences(STATE_PREFS, Context.MODE_PRIVATE)
                    .edit().clear().apply();
        } catch (Exception ignored) {
        }
    }

    private static String safe(String value) {
        return value == null ? "" : value;
    }

    @Override
    public void onDestroy() {
        ringing = false;
        handler.removeCallbacks(autoStop);
        stopPlayback();
        stopVibration();
        releaseWakeLock();
        cancelNotification(this);
        if (instance == this) instance = null;
        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
