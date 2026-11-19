package com.exambuddy.lite;

import android.app.AlarmManager;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public final class ReminderScheduler {
    private static final String PREFS = "exam_buddy_reminders";
    private static final String KEY_ITEMS = "items";

    private ReminderScheduler() {
    }

    public static int requestCode(String taskId, String kind) {
        String key = (taskId == null ? "" : taskId) + ":" + (kind == null ? "" : kind);
        return 52000 + ((key.hashCode() & 0x7FFFFFFF) % 100000);
    }

    private static PendingIntent pendingIntent(Context context, String taskId, String kind,
                                               long triggerAt, String title, String body,
                                               boolean sound, String language) {
        Intent intent = new Intent(context, TaskReminderReceiver.class);
        intent.setAction(TaskReminderReceiver.ACTION_TASK_REMINDER);
        intent.putExtra(TaskReminderReceiver.EXTRA_TASK_ID, taskId);
        intent.putExtra(TaskReminderReceiver.EXTRA_KIND, kind);
        intent.putExtra(TaskReminderReceiver.EXTRA_TITLE, title);
        intent.putExtra(TaskReminderReceiver.EXTRA_BODY, body);
        intent.putExtra(TaskReminderReceiver.EXTRA_SOUND, sound);
        intent.putExtra(TaskReminderReceiver.EXTRA_LANGUAGE, language);
        intent.putExtra(TaskReminderReceiver.EXTRA_TRIGGER_AT, triggerAt);
        intent.putExtra(TaskReminderReceiver.EXTRA_ALARM_ID,
                (taskId == null ? "" : taskId) + ":" + (kind == null ? "" : kind) + ":" + triggerAt);
        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            flags |= PendingIntent.FLAG_IMMUTABLE;
        }
        return PendingIntent.getBroadcast(context, requestCode(taskId, kind), intent, flags);
    }

    public static void schedule(Context context, String taskId, String kind, long triggerAt,
                                String title, String body, boolean sound, String language) {
        if (triggerAt <= System.currentTimeMillis()) {
            return;
        }
        AlarmManager manager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if (manager == null) return;
        PendingIntent operation = pendingIntent(context, taskId, kind, triggerAt,
                title, body, sound, language);
        try {
            if (sound && canScheduleExact(manager)) {
                PendingIntent show = showIntent(context, requestCode(taskId, kind));
                manager.setAlarmClock(
                        new AlarmManager.AlarmClockInfo(triggerAt, show), operation);
            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S
                    && !manager.canScheduleExactAlarms()) {
                manager.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerAt, operation);
            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                manager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerAt, operation);
            } else {
                manager.setExact(AlarmManager.RTC_WAKEUP, triggerAt, operation);
            }
        } catch (SecurityException securityError) {
            try {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    manager.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerAt, operation);
                } else {
                    manager.set(AlarmManager.RTC_WAKEUP, triggerAt, operation);
                }
            } catch (Exception ignored) {
            }
        } catch (Exception ignored) {
        }
        store(context, taskId, kind, triggerAt, title, body, sound, language);
    }

    private static boolean canScheduleExact(AlarmManager manager) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            return manager.canScheduleExactAlarms();
        }
        return true;
    }

    private static PendingIntent showIntent(Context context, int requestCode) {
        Intent show = new Intent(context, MainActivity.class);
        show.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            flags |= PendingIntent.FLAG_IMMUTABLE;
        }
        return PendingIntent.getActivity(context, requestCode + 1, show, flags);
    }

    public static void cancel(Context context, String taskId, String kind) {
        AlarmManager manager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if (manager != null) {
            try {
                manager.cancel(pendingIntent(context, taskId, kind, 0L,
                        null, null, true, "en"));
            } catch (Exception ignored) {
            }
        }
        try {
            NotificationManager notifications =
                    (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
            if (notifications != null) {
                notifications.cancel(TaskReminderReceiver.notificationId(taskId, kind));
            }
        } catch (Exception ignored) {
        }
        removeStored(context, taskId, kind);
    }

    public static void cancelAll(Context context, String taskId) {
        cancel(context, taskId, "start");
        cancel(context, taskId, "end");
        for (int i = 0; i < 20; i += 1) {
            cancel(context, taskId, "break-" + i);
        }
        cancelStoredForTask(context, taskId);
    }

    private static void cancelStoredForTask(Context context, String taskId) {
        try {
            SharedPreferences prefs = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
            JSONObject items = new JSONObject(prefs.getString(KEY_ITEMS, "{}"));
            AlarmManager manager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
            NotificationManager notifications =
                    (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
            List<String> remove = new ArrayList<>();
            Iterator<String> keys = items.keys();
            while (keys.hasNext()) {
                String key = keys.next();
                JSONObject item = items.optJSONObject(key);
                if (item == null) {
                    remove.add(key);
                    continue;
                }
                String storedTask = item.optString("taskId", "");
                if (taskId == null || !taskId.equals(storedTask)) continue;
                String kind = item.optString("kind", "");
                if (manager != null) {
                    try {
                        manager.cancel(pendingIntent(context, taskId, kind, 0L,
                                null, null, true, "en"));
                    } catch (Exception ignored) {
                    }
                }
                if (notifications != null) {
                    try {
                        notifications.cancel(TaskReminderReceiver.notificationId(taskId, kind));
                    } catch (Exception ignored) {
                    }
                }
                remove.add(key);
            }
            for (String key : remove) items.remove(key);
            prefs.edit().putString(KEY_ITEMS, items.toString()).apply();
        } catch (Exception ignored) {
        }
    }

    private static void store(Context context, String taskId, String kind, long triggerAt,
                              String title, String body, boolean sound, String language) {
        try {
            SharedPreferences prefs = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
            JSONObject items = new JSONObject(prefs.getString(KEY_ITEMS, "{}"));
            JSONObject item = new JSONObject();
            item.put("taskId", taskId == null ? "" : taskId);
            item.put("kind", kind == null ? "" : kind);
            item.put("triggerAt", triggerAt);
            item.put("title", title == null ? "" : title);
            item.put("body", body == null ? "" : body);
            item.put("sound", sound);
            item.put("language", language == null ? "en" : language);
            items.put(String.valueOf(requestCode(taskId, kind)), item);
            prefs.edit().putString(KEY_ITEMS, items.toString()).apply();
        } catch (Exception ignored) {
        }
    }

    private static void removeStored(Context context, String taskId, String kind) {
        try {
            SharedPreferences prefs = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
            JSONObject items = new JSONObject(prefs.getString(KEY_ITEMS, "{}"));
            items.remove(String.valueOf(requestCode(taskId, kind)));
            prefs.edit().putString(KEY_ITEMS, items.toString()).apply();
        } catch (Exception ignored) {
        }
    }

    public static void rescheduleAll(Context context) {
        try {
            SharedPreferences prefs = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
            JSONObject items = new JSONObject(prefs.getString(KEY_ITEMS, "{}"));
            List<JSONObject> restore = new ArrayList<>();
            Iterator<String> keys = items.keys();
            List<String> remove = new ArrayList<>();
            long now = System.currentTimeMillis();
            while (keys.hasNext()) {
                String key = keys.next();
                JSONObject item = items.optJSONObject(key);
                if (item == null) {
                    remove.add(key);
                    continue;
                }
                long triggerAt = item.optLong("triggerAt", 0L);
                if (triggerAt <= now) {
                    remove.add(key);
                    continue;
                }
                restore.add(item);
            }
            for (String key : remove) items.remove(key);
            prefs.edit().putString(KEY_ITEMS, items.toString()).apply();

            for (JSONObject item : restore) {
                schedule(context,
                        item.optString("taskId", ""),
                        item.optString("kind", ""),
                        item.optLong("triggerAt", 0L),
                        item.optString("title", ""),
                        item.optString("body", ""),
                        item.optBoolean("sound", true),
                        item.optString("language", "en"));
            }
        } catch (Exception ignored) {
        }
    }
}
