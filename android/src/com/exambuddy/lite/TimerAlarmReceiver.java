package com.exambuddy.lite;

import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class TimerAlarmReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent == null || !TimerService.ACTION_ALARM.equals(intent.getAction())) {
            return;
        }
        long endsAt = intent.getLongExtra(TimerService.EXTRA_ENDS_AT, 0L);
        if (endsAt <= 0L || TimerService.isRunning()) {
            return;
        }
        if (MainActivity.isAppVisible()) {
            return;
        }
        if (!TimerService.claimNotification(context, endsAt)) {
            return;
        }
        String title = intent.getStringExtra(TimerService.EXTRA_COMPLETE_TITLE);
        String body = intent.getStringExtra(TimerService.EXTRA_COMPLETE_BODY);
        String language = intent.getStringExtra(TimerService.EXTRA_LANGUAGE);
        boolean sound = intent.getBooleanExtra(TimerService.EXTRA_SOUND, true);
        if (title == null || title.trim().isEmpty()) {
            title = "Timer finished";
        }
        if (body == null || body.trim().isEmpty()) {
            body = "Exam Buddy Pro";
        }
        if (language == null) {
            language = "en";
        }
        TimerService.postDoneNotification(context, endsAt, title, body, language, sound);
        NotificationManager manager =
                (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        if (manager != null) {
            manager.cancel(4101);
        }
    }
}
