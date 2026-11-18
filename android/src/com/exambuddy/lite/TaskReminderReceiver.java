package com.exambuddy.lite;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;

public class TaskReminderReceiver extends BroadcastReceiver {
    public static final String ACTION_TASK_REMINDER = "com.exambuddy.lite.action.TASK_REMINDER";
    public static final String EXTRA_TASK_ID = "task_id";
    public static final String EXTRA_KIND = "kind";
    public static final String EXTRA_TITLE = "title";
    public static final String EXTRA_BODY = "body";
    public static final String EXTRA_SOUND = "sound";
    public static final String EXTRA_LANGUAGE = "language";

    private static final String CHANNEL_ALERT = "exam_buddy_task_alerts";
    private static final String CHANNEL_SILENT = "exam_buddy_task_silent";
    private static final int NOTIF_BASE = 6200;

    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent == null || !ACTION_TASK_REMINDER.equals(intent.getAction())) {
            return;
        }
        if (MainActivity.isAppVisible()) {
            return;
        }
        String language = intent.getStringExtra(EXTRA_LANGUAGE);
        String title = intent.getStringExtra(EXTRA_TITLE);
        String body = intent.getStringExtra(EXTRA_BODY);
        boolean sound = intent.getBooleanExtra(EXTRA_SOUND, true);
        String taskId = intent.getStringExtra(EXTRA_TASK_ID);
        String kind = intent.getStringExtra(EXTRA_KIND);
        if (title == null || title.trim().isEmpty()) {
            title = "en".equals(language) ? "Study reminder" : "අධ්‍යයන මතක් කිරීම";
        }
        if (body == null) {
            body = "";
        }
        postNotification(context, notificationId(taskId, kind), title, body, sound);
    }

    static int notificationId(String taskId, String kind) {
        String key = (taskId == null ? "" : taskId) + ":" + (kind == null ? "" : kind);
        return NOTIF_BASE + ((key.hashCode() & 0x7FFFFFFF) % 100000);
    }

    static void ensureChannels(Context context) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            return;
        }
        NotificationManager manager =
                (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        if (manager == null) {
            return;
        }
        NotificationChannel alert = new NotificationChannel(
                CHANNEL_ALERT,
                "Study alarms",
                NotificationManager.IMPORTANCE_HIGH);
        alert.setDescription("Alarms for planned study tasks and lesson finish times");
        alert.enableVibration(true);
        manager.createNotificationChannel(alert);

        NotificationChannel silent = new NotificationChannel(
                CHANNEL_SILENT,
                "Study notifications",
                NotificationManager.IMPORTANCE_LOW);
        silent.setDescription("Quiet reminders for planned study tasks");
        silent.setSound(null, null);
        silent.setShowBadge(true);
        manager.createNotificationChannel(silent);
    }

    static void postNotification(Context context, int id, String title, String body, boolean sound) {
        ensureChannels(context);
        NotificationManager manager =
                (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        if (manager == null) {
            return;
        }

        Intent open = new Intent(context, MainActivity.class);
        open.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            flags |= PendingIntent.FLAG_IMMUTABLE;
        }
        PendingIntent contentIntent = PendingIntent.getActivity(context, 6210, open, flags);

        Notification.Builder builder;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            builder = new Notification.Builder(context, sound ? CHANNEL_ALERT : CHANNEL_SILENT);
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
                .setStyle(new Notification.BigTextStyle().bigText(body))
                .setAutoCancel(true)
                .setContentIntent(contentIntent)
                .setCategory(Notification.CATEGORY_REMINDER)
                .setVisibility(Notification.VISIBILITY_PUBLIC)
                .setOnlyAlertOnce(false)
                .setWhen(System.currentTimeMillis())
                .setShowWhen(true);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            builder.setColor(Color.parseColor("#e11d48"));
        }
        try {
            manager.notify(id, builder.build());
        } catch (Exception ignored) {
        }
    }
}
