package com.exambuddy.lite;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ServiceInfo;
import android.graphics.Color;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;

public class TimerService extends Service {
    public static final String ACTION_START = "com.exambuddy.lite.action.START_TIMER";
    public static final String ACTION_STOP = "com.exambuddy.lite.action.STOP_TIMER";
    public static final String ACTION_ALARM = "com.exambuddy.lite.action.TIMER_ALARM";

    public static final String EXTRA_MODE = "mode";
    public static final String EXTRA_MODE_LABEL = "mode_label";
    public static final String EXTRA_ENDS_AT = "ends_at";
    public static final String EXTRA_COMPLETE_TITLE = "complete_title";
    public static final String EXTRA_COMPLETE_BODY = "complete_body";
    public static final String EXTRA_LANGUAGE = "language";
    public static final String EXTRA_SOUND = "sound";

    public static final String PREFS = "exam_buddy_timer";
    public static final String KEY_NOTIFIED_END = "notified_end";

    private static final String CHANNEL_ONGOING = "exam_buddy_timer_progress";
    private static final String CHANNEL_DONE = "exam_buddy_timer_done";
    private static final String CHANNEL_DONE_SILENT = "exam_buddy_timer_done_silent";
    private static final int NOTIF_ONGOING = 4101;
    private static final int NOTIF_DONE = 4102;
    private static final int ALARM_REQUEST = 4103;
    private static final long ALARM_INTERVAL = 1000L;

    private static volatile boolean running = false;

    private final Handler handler = new Handler(Looper.getMainLooper());
    private final Runnable ticker = new Runnable() {
        @Override
        public void run() {
            if (!running) return;
            long left = remainingSeconds();
            if (left <= 0) {
                finishNow();
                return;
            }
            NotificationManager manager = notificationManager();
            if (manager != null) {
                manager.notify(NOTIF_ONGOING, buildOngoingNotification(left));
            }
            handler.postDelayed(this, ALARM_INTERVAL);
        }
    };

    private long endsAt;
    private String mode = "focus";
    private String modeLabel = "Focus";
    private String completeTitle = "Timer finished";
    private String completeBody = "Exam Buddy Pro";
    private String language = "en";
    private boolean sound = true;
    private boolean finished = false;

    public static boolean isRunning() {
        return running;
    }

    public static void start(Context context, String mode, long endsAt, String modeLabel,
                             String completeTitle, String completeBody, String language, boolean sound) {
        Intent intent = new Intent(context, TimerService.class);
        intent.setAction(ACTION_START);
        intent.putExtra(EXTRA_MODE, mode);
        intent.putExtra(EXTRA_ENDS_AT, endsAt);
        intent.putExtra(EXTRA_MODE_LABEL, modeLabel);
        intent.putExtra(EXTRA_COMPLETE_TITLE, completeTitle);
        intent.putExtra(EXTRA_COMPLETE_BODY, completeBody);
        intent.putExtra(EXTRA_LANGUAGE, language);
        intent.putExtra(EXTRA_SOUND, sound);
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

    public static void stop(Context context) {
        running = false;
        cancelAlarm(context);
        NotificationManager manager =
                (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        if (manager != null) {
            manager.cancel(NOTIF_ONGOING);
        }
        try {
            context.stopService(new Intent(context, TimerService.class));
        } catch (Exception ignored) {
        }
    }

    public static void cancelAlarm(Context context) {
        AlarmManager manager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if (manager == null) return;
        try {
            manager.cancel(alarmPendingIntent(context));
        } catch (Exception ignored) {
        }
    }

    private static PendingIntent alarmPendingIntent(Context context) {
        Intent intent = alarmIntent(context);
        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            flags |= PendingIntent.FLAG_IMMUTABLE;
        }
        return PendingIntent.getBroadcast(context, ALARM_REQUEST, intent, flags);
    }

    private static Intent alarmIntent(Context context) {
        Intent intent = new Intent(context, TimerAlarmReceiver.class);
        intent.setAction(ACTION_ALARM);
        return intent;
    }

    public static synchronized boolean claimNotification(Context context, long endsAt) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        if (prefs.getLong(KEY_NOTIFIED_END, 0L) == endsAt) {
            return false;
        }
        prefs.edit().putLong(KEY_NOTIFIED_END, endsAt).commit();
        return true;
    }

    public static void ensureChannels(Context context) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return;
        NotificationManager manager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        if (manager == null) return;

        NotificationChannel ongoing = new NotificationChannel(
                CHANNEL_ONGOING,
                "Focus timer",
                NotificationManager.IMPORTANCE_LOW);
        ongoing.setDescription("Shows the running Pomodoro timer");
        ongoing.setSound(null, null);
        ongoing.setShowBadge(false);
        manager.createNotificationChannel(ongoing);

        NotificationChannel done = new NotificationChannel(
                CHANNEL_DONE,
                "Timer finished",
                NotificationManager.IMPORTANCE_HIGH);
        done.setDescription("Alerts you when a focus or break session ends");
        manager.createNotificationChannel(done);

        NotificationChannel silent = new NotificationChannel(
                CHANNEL_DONE_SILENT,
                "Timer finished (silent)",
                NotificationManager.IMPORTANCE_LOW);
        silent.setDescription("Silent timer completion alerts");
        silent.setSound(null, null);
        manager.createNotificationChannel(silent);
    }

    public static void postDoneNotification(Context context, long endsAt, String title, String body,
                                            String language, boolean sound) {
        ensureChannels(context);
        NotificationManager manager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        if (manager == null) return;

        Intent open = new Intent(context, MainActivity.class);
        open.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            flags |= PendingIntent.FLAG_IMMUTABLE;
        }
        PendingIntent contentIntent = PendingIntent.getActivity(context, 4104, open, flags);

        Notification.Builder builder;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            builder = new Notification.Builder(context, sound ? CHANNEL_DONE : CHANNEL_DONE_SILENT);
        } else {
            builder = new Notification.Builder(context);
            builder.setPriority(sound ? Notification.PRIORITY_HIGH : Notification.PRIORITY_LOW);
            if (sound) {
                builder.setDefaults(Notification.DEFAULT_SOUND | Notification.DEFAULT_VIBRATE);
            }
        }
        builder.setSmallIcon(R.drawable.ic_stat_timer)
                .setContentTitle(title)
                .setContentText(body)
                .setAutoCancel(true)
                .setContentIntent(contentIntent)
                .setCategory(Notification.CATEGORY_REMINDER)
                .setVisibility(Notification.VISIBILITY_PUBLIC)
                .setOnlyAlertOnce(false)
                .setWhen(System.currentTimeMillis())
                .setShowWhen(true);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            builder.setColor(Color.parseColor("#4f46e5"));
        }

        try {
            manager.notify(NOTIF_DONE, builder.build());
        } catch (Exception ignored) {
        }
    }

    @Override
    public void onCreate() {
        super.onCreate();
        ensureChannels(this);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent == null) {
            stopEverything();
            return START_NOT_STICKY;
        }
        String action = intent.getAction();
        if (ACTION_STOP.equals(action)) {
            stopEverything();
            return START_NOT_STICKY;
        }
        if (!ACTION_START.equals(action)) {
            return START_NOT_STICKY;
        }

        long now = System.currentTimeMillis();
        endsAt = intent.getLongExtra(EXTRA_ENDS_AT, 0L);
        if (endsAt <= now) {
            stopEverything();
            return START_NOT_STICKY;
        }

        mode = intent.getStringExtra(EXTRA_MODE);
        modeLabel = intent.getStringExtra(EXTRA_MODE_LABEL);
        completeTitle = intent.getStringExtra(EXTRA_COMPLETE_TITLE);
        completeBody = intent.getStringExtra(EXTRA_COMPLETE_BODY);
        language = intent.getStringExtra(EXTRA_LANGUAGE);
        sound = intent.getBooleanExtra(EXTRA_SOUND, true);
        if (mode == null) mode = "focus";
        if (modeLabel == null || modeLabel.trim().isEmpty()) {
            modeLabel = "focus".equals(mode) ? "Focus" : "Break";
        }
        if (completeTitle == null || completeTitle.trim().isEmpty()) {
            completeTitle = "Timer finished";
        }
        if (completeBody == null || completeBody.trim().isEmpty()) {
            completeBody = "Exam Buddy Pro";
        }
        if (language == null) language = "en";

        finished = false;
        running = true;
        handler.removeCallbacks(ticker);

        startForegroundCompat(buildOngoingNotification(remainingSeconds()));
        scheduleAlarm();
        handler.postDelayed(ticker, ALARM_INTERVAL);
        return START_NOT_STICKY;
    }

    private void startForegroundCompat(Notification notification) {
        if (Build.VERSION.SDK_INT >= 34) {
            startForeground(NOTIF_ONGOING, notification, ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE);
        } else {
            startForeground(NOTIF_ONGOING, notification);
        }
    }

    private Notification buildOngoingNotification(long left) {
        Intent open = new Intent(this, MainActivity.class);
        open.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            flags |= PendingIntent.FLAG_IMMUTABLE;
        }
        PendingIntent contentIntent = PendingIntent.getActivity(this, 4105, open, flags);

        String text = formatClock(left) + " " + (isSinhala() ? "ඉතිරියි" : "remaining");
        Notification.Builder builder;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            builder = new Notification.Builder(this, CHANNEL_ONGOING);
        } else {
            builder = new Notification.Builder(this);
            builder.setPriority(Notification.PRIORITY_LOW);
        }
        builder.setSmallIcon(R.drawable.ic_stat_timer)
                .setContentTitle(modeLabel)
                .setContentText(text)
                .setContentIntent(contentIntent)
                .setOngoing(true)
                .setOnlyAlertOnce(true)
                .setShowWhen(false)
                .setCategory(Notification.CATEGORY_STOPWATCH)
                .setVisibility(Notification.VISIBILITY_PUBLIC);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            builder.setColor(Color.parseColor("#4f46e5"));
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            builder.setSubText(isSinhala() ? "පසුබිමේ ධාවනය වේ" : "Running in background");
        }
        return builder.build();
    }

    private boolean isSinhala() {
        return "si".equals(language);
    }

    private NotificationManager notificationManager() {
        return (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
    }

    private long remainingSeconds() {
        return Math.max(0L, (endsAt - System.currentTimeMillis() + 999L) / 1000L);
    }

    private static String formatClock(long totalSeconds) {
        long s = Math.max(0L, totalSeconds);
        long h = s / 3600L;
        long m = (s % 3600L) / 60L;
        long sec = s % 60L;
        if (h > 0) {
            return String.format("%d:%02d:%02d", h, m, sec);
        }
        return String.format("%02d:%02d", m, sec);
    }

    private void scheduleAlarm() {
        AlarmManager manager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
        if (manager == null) return;
        Intent intent = new Intent(this, TimerAlarmReceiver.class);
        intent.setAction(ACTION_ALARM);
        intent.putExtra(EXTRA_ENDS_AT, endsAt);
        intent.putExtra(EXTRA_COMPLETE_TITLE, completeTitle);
        intent.putExtra(EXTRA_COMPLETE_BODY, completeBody);
        intent.putExtra(EXTRA_LANGUAGE, language);
        intent.putExtra(EXTRA_SOUND, sound);
        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            flags |= PendingIntent.FLAG_IMMUTABLE;
        }
        PendingIntent pending = PendingIntent.getBroadcast(this, ALARM_REQUEST, intent, flags);
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                if (manager.canScheduleExactAlarms()) {
                    manager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, endsAt, pending);
                } else {
                    manager.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, endsAt, pending);
                }
            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                manager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, endsAt, pending);
            } else {
                manager.setExact(AlarmManager.RTC_WAKEUP, endsAt, pending);
            }
        } catch (Exception ignored) {
        }
    }

    private void finishNow() {
        if (finished) return;
        finished = true;
        running = false;
        handler.removeCallbacks(ticker);
        cancelAlarm(this);
        if (!MainActivity.isAppVisible() && claimNotification(this, endsAt)) {
            postDoneNotification(this, endsAt, completeTitle, completeBody, language, sound);
        }
        NotificationManager manager = notificationManager();
        if (manager != null) {
            manager.cancel(NOTIF_ONGOING);
        }
        try {
            stopForeground(true);
        } catch (Exception ignored) {
        }
        stopSelf();
    }

    private void stopEverything() {
        running = false;
        finished = true;
        handler.removeCallbacks(ticker);
        cancelAlarm(this);
        NotificationManager manager = notificationManager();
        if (manager != null) {
            manager.cancel(NOTIF_ONGOING);
        }
        try {
            stopForeground(true);
        } catch (Exception ignored) {
        }
        stopSelf();
    }

    @Override
    public void onDestroy() {
        running = false;
        handler.removeCallbacks(ticker);
        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
