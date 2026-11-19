package com.exambuddy.lite;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class AlarmActionReceiver extends BroadcastReceiver {
    public static final String ACTION_STOP = "com.exambuddy.lite.action.ALARM_STOP";
    public static final String ACTION_SNOOZE = "com.exambuddy.lite.action.ALARM_SNOOZE";

    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent == null) return;
        String action = intent.getAction();
        if (ACTION_STOP.equals(action)) {
            AlarmService.stop(context);
        } else if (ACTION_SNOOZE.equals(action)) {
            AlarmService.snooze(context);
        }
    }
}
