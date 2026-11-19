package com.exambuddy.lite;

import android.app.Activity;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.TextView;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class AlarmActivity extends Activity {
    public static final String EXTRA_TITLE = "alarm_title";
    public static final String EXTRA_BODY = "alarm_body";
    public static final String EXTRA_LANGUAGE = "alarm_language";

    private final Handler handler = new Handler(Looper.getMainLooper());
    private final SimpleDateFormat clock = new SimpleDateFormat("HH:mm", Locale.getDefault());
    private String language = "en";
    private long firstSeenAt = 0L;
    private boolean wasRinging = false;

    private final Runnable refresh = new Runnable() {
        @Override
        public void run() {
            if (AlarmService.isRinging()) {
                wasRinging = true;
                long remaining = AlarmService.getRemainingMillis();
                TextView countdown = findViewById(R.id.alarm_countdown);
                if (countdown != null) {
                    int seconds = (int) Math.max(0L, (remaining + 999L) / 1000L);
                    countdown.setText(secondsText(seconds));
                }
            } else if (wasRinging) {
                finish();
                return;
            } else if (System.currentTimeMillis() - firstSeenAt > 2500L) {
                finish();
                return;
            }
            TextView time = findViewById(R.id.alarm_time);
            if (time != null) time.setText(clock.format(new Date()));
            handler.postDelayed(this, 500L);
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        applyLockScreenFlags();
        setContentView(R.layout.activity_alarm);
        firstSeenAt = System.currentTimeMillis();

        Bundle extras = getIntent() == null ? new Bundle() : getIntent().getExtras();
        bindExtras(extras);
        bindButtons();
        handler.post(refresh);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        bindExtras(intent == null ? new Bundle() : intent.getExtras());
    }

    private void applyLockScreenFlags() {
        try {
            getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
                    | WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD
                    | WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED
                    | WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
                setShowWhenLocked(true);
                setTurnScreenOn(true);
            }
        } catch (Exception ignored) {
        }
    }

    private void bindExtras(Bundle extras) {
        if (extras == null) extras = new Bundle();
        language = extras.getString(EXTRA_LANGUAGE, "en");
        String title = extras.getString(EXTRA_TITLE, "Alarm");
        String body = extras.getString(EXTRA_BODY, "Exam Buddy Pro");
        boolean sinhala = "si".equals(language);

        TextView titleView = findViewById(R.id.alarm_title);
        TextView bodyView = findViewById(R.id.alarm_body);
        if (titleView != null) titleView.setText(title);
        if (bodyView != null) bodyView.setText(body);

        Button stop = findViewById(R.id.alarm_stop);
        Button snooze = findViewById(R.id.alarm_snooze);
        Button open = findViewById(R.id.alarm_open_app);
        TextView hint = findViewById(R.id.alarm_hint);
        int minutes = Math.max(1, AlarmService.getSnoozeMinutes());
        if (stop != null) stop.setText(sinhala ? "ඇලාම් නවත්වන්න" : "Turn off alarm");
        if (snooze != null) {
            snooze.setText(sinhala
                    ? "විනාඩි " + minutes + "ක් පසු කරන්න"
                    : "Snooze " + minutes + " min");
        }
        if (open != null) open.setText(sinhala ? "Exam Buddy විවෘත කරන්න" : "Open Exam Buddy");
        if (hint != null) hint.setText(sinhala ? "පසුපසට යාමෙන් snooze වේ" : "Press Back to snooze");
    }

    private void bindButtons() {
        Button stop = findViewById(R.id.alarm_stop);
        if (stop != null) {
            stop.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    AlarmService.stop(AlarmActivity.this);
                    finish();
                }
            });
        }
        Button snooze = findViewById(R.id.alarm_snooze);
        if (snooze != null) {
            snooze.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    AlarmService.snooze(AlarmActivity.this);
                    finish();
                }
            });
        }
        Button open = findViewById(R.id.alarm_open_app);
        if (open != null) {
            open.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    try {
                        Intent intent = new Intent(AlarmActivity.this, MainActivity.class);
                        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK
                                | Intent.FLAG_ACTIVITY_CLEAR_TOP);
                        startActivity(intent);
                    } catch (Exception ignored) {
                    }
                    finish();
                }
            });
        }
    }

    private String secondsText(int seconds) {
        if ("si".equals(language)) {
            return "තත්පර " + seconds + "කින් ස්වයංක්‍රීයව නවතී";
        }
        return "Stops automatically in " + seconds + " seconds";
    }

    @Override
    public void onBackPressed() {
        AlarmService.snooze(this);
        finish();
    }

    @Override
    protected void onDestroy() {
        handler.removeCallbacks(refresh);
        super.onDestroy();
    }
}
