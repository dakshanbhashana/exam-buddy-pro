const STORAGE_KEYS = {
  exams: "examBuddy_exams",
  tasks: "examBuddy_tasks",
  flashcards: "examBuddy_flashcards",
  theme: "examBuddy_theme",
  language: "examBuddy_language",
  pomodoro: "examBuddy_pomodoro",
  timer: "examBuddy_timer"
};

const DEFAULT_SETTINGS = {
  focus: 25,
  short: 5,
  long: 15,
  autoBreaks: false,
  autoFocus: false,
  sound: true,
  alarmTone: 0,
  alarmVibrate: true,
  alarmBluetooth: true,
  alarmSnooze: 5
};

const ALARM_TONE_NAMES = ["classic", "mechanical", "beep"];
const ALARM_TONE_LABELS = ["alarmToneClassic", "alarmToneMechanical", "alarmToneBeep"];
const ALARM_LOCAL_STORAGE_KEY = "examBuddy_alarmOverlay";

const MODES = {
  focus: { label: "mode.focus", status: "timerReady" },
  short: { label: "mode.short", status: "timerRecharge" },
  long: { label: "mode.long", status: "timerRest" }
};

const CIRCUMFERENCE = 2 * Math.PI * 104;
const DAY_MS = 1000 * 60 * 60 * 24;
const SNAPSHOT_VERSION = 5;
const EXAM_LIMIT = 3;
const TECHNIQUES = {
  pomodoro: { focus: 25, short: 5, long: 15, cycle: 4 },
  deep50: { focus: 50, short: 10, long: 20, cycle: 3 },
  ultradian: { focus: 90, short: 20, long: 30, cycle: 2 },
  fiftyTwo: { focus: 52, short: 17, long: 17, cycle: 3 },
  timeblock: { focus: 0, short: 0, long: 0, cycle: 0 },
  custom: { focus: 0, short: 0, long: 0, cycle: 0 }
};
const STUDY_METHODS = ["none", "activeRecall", "spaced", "feynman", "interleaving", "sq3r"];
const REMINDER_KINDS = ["start", "end"];
const REMINDER_BREAK_LIMIT = 20;

const CARD_MASTERED_BOX = 4;
const CARD_MAX_BOX = 5;
const CARD_INTERVALS = [10 * 60 * 1000, DAY_MS, 3 * DAY_MS, 7 * DAY_MS, 16 * DAY_MS, 35 * DAY_MS];

const APP_VERSION_NAME = "2.2.0";
const APP_VERSION_CODE = 14;
const UPDATE_CONFIG = {
  manifestUrl: "https://raw.githubusercontent.com/dakshanbhashana/exam-buddy-pro/main/version.json",
  releaseNotesUrl: "https://github.com/dakshanbhashana/exam-buddy-pro/releases/latest",
  checkIntervalMs: 6 * 60 * 60 * 1000,
  lastCheckKey: "examBuddy_lastUpdateCheck",
  allowedHosts: [
    "github.com",
    "raw.githubusercontent.com",
    "objects.githubusercontent.com",
    "github-releases.githubusercontent.com"
  ]
};

const PERMISSION_KEYS = ["notifications", "alarm", "battery", "files", "install"];
const PERMISSION_SNOOZE_KEY = "examBuddy_permissionsSnooze";
const BACKUP_MAX_BYTES = 2 * 1024 * 1024;

const I18N = {
  en: {
    appTitle: "Exam Buddy Pro",
    brandName: "Exam Buddy",
    brandSubtitle: "Plan smarter. Focus deeper. Ace every exam.",
    themeToggleTitle: "Switch theme",
    switchThemeDark: "Switch to dark mode",
    switchThemeLight: "Switch to light mode",
    switchLanguage: "Switch language",
    lang: { english: "English", sinhala: "Sinhala" },
    languageChanged: "Language switched to {lang}",
    "lang.english": "English",
    "lang.sinhala": "Sinhala",
    languageCardTitle: "Language",
    languageCardDesc: "Choose your preferred language. Changes apply instantly.",
    mainSections: "Main sections",
    "tab.dashboard": "Dashboard",
    "tab.exams": "Exams",
    "tab.tasks": "Tasks",
    "tab.focus": "Focus",
    "tab.insights": "Insights",
    "tab.about": "About",
    create: "Create",
    today: "Today",
    tomorrow: "Tomorrow",
    welcome: "Welcome back",
    newExam: "+ New exam",
    "stat.upcoming": "Upcoming Exams",
    "stat.pending": "Pending Tasks",
    "stat.completed": "Completed Exams",
    "stat.doneTasks": "Tasks Done",
    "stat.daysNext": "Days to Next",
    "stat.focusToday": "Focus Today",
    "stat.streak": "Study Streak",
    day: "day",
    days: "days",
    dayShort: "d",
    minuteShort: "m",
    hourShort: "h",
    nextExam: "Next Exam",
    liveCountdown: "Live countdown",
    countdownLabel: "Time remaining until next exam",
    "countdown.days": "days",
    "countdown.hours": "hrs",
    "countdown.mins": "min",
    "countdown.secs": "sec",
    prepHint: "Add an exam to start tracking your preparation.",
    noUpcoming: "No upcoming exams. Add one in the Exams tab.",
    noUpcomingShort: "No upcoming exams.",
    prepProgress: "{p}% of your prep window used · {when}",
    daysLeft: "{n} day(s) left",
    daysCount: "{n} day(s)",
    quickActions: "Quick Actions",
    "quick.addExam": "Add exam",
    "quick.addExamHint": "Track a new deadline",
    "quick.addTask": "Add task",
    "quick.addTaskHint": "Plan your revision",
    "quick.startFocus": "Start focus",
    "quick.startFocusHint": "Begin a Pomodoro",
    "quick.viewInsights": "View insights",
    "quick.viewInsightsHint": "See your progress",
    todaysPlan: "Today's Plan",
    upcomingDeadlines: "Upcoming deadlines & tasks",
    nextTasks: "Next tasks",
    anytime: "Anytime",
    noPendingTasks: "No pending tasks.",
    "exams.title": "Exams",
    addExam: "Add Exam",
    editExam: "Edit Exam",
    saveChanges: "Save Changes",
    cancelEdit: "Cancel edit",
    subject: "Subject",
    subjectPlaceholder: "e.g. Mathematics",
    examName: "Exam name",
    date: "Date",
    examDate: "Exam date",
    category: "Category",
    "category.general": "General",
    "category.mathematics": "Mathematics",
    "category.science": "Science",
    "category.language": "Language",
    "category.history": "History",
    "category.other": "Other",
    notes: "Notes (optional)",
    notesPlaceholder: "Chapters, topics, room...",
    examList: "Exam List",
    examCount: "{n} exams",
    examSearchPlaceholder: "Search exams or notes...",
    searchExams: "Search exams",
    filterExams: "Filter exams",
    all: "All",
    upcoming: "Upcoming",
    past: "Past",
    completed: "Completed",
    completedShort: "Completed",
    pending: "Pending",
    examEmpty: "No exams yet.",
    examNoMatch: "No exams match your filters.",
    edit: "Edit",
    done: "Done",
    undo: "Undo",
    delete: "Delete",
    toDo: "To-Do",
    "tasks.title": "Study Tasks",
    addTask: "Add Task",
    editTask: "Edit Task",
    taskLabel: "Task",
    taskPlaceholder: "e.g. Revise chapter 5",
    priority: "Priority",
    low: "Low",
    medium: "Medium",
    high: "High",
    due: "Due (optional)",
    taskList: "Task List",
    clearCompleted: "Clear completed",
    taskSearchPlaceholder: "Search tasks...",
    searchTasks: "Search tasks",
    filterTasks: "Filter tasks",
    active: "Active",
    highPriority: "High priority",
    taskEmpty: "No tasks yet.",
    taskNoMatch: "No tasks match your filters.",
    overdue: "Overdue",
    dueToday: "Due today",
    dueOn: "Due {date}",
    linkedExam: "Exam (optional)",
    noExam: "No exam",
    startDate: "Start date",
    startTime: "Start time",
    endTime: "Lesson finish time",
    technique: "Study technique",
    "technique.pomodoro": "Pomodoro 25/5",
    "technique.deep50": "Deep work 50/10",
    "technique.ultradian": "Ultradian 90/20",
    "technique.fiftyTwo": "52/17 focus",
    "technique.timeblock": "Time blocking",
    "technique.custom": "Custom plan",
    "technique.hint.pomodoro": "25 minutes of focus, a 5 minute break, and a 15 minute long break after 4 rounds.",
    "technique.hint.deep50": "50 minutes of deep focus with a 10 minute break. Good for problem sets.",
    "technique.hint.ultradian": "90 minutes of focus with a 20 minute break, following your natural energy cycle.",
    "technique.hint.fiftyTwo": "52 minutes of focus and 17 minutes of rest, a researched desk-work rhythm.",
    "technique.hint.timeblock": "One protected block. Add your own tea, food and rest breaks.",
    "technique.hint.custom": "Build a plan that fits your day. Add your own breaks.",
    studyMethod: "Study method",
    "method.none": "None",
    "method.activeRecall": "Active recall",
    "method.spaced": "Spaced repetition",
    "method.feynman": "Feynman technique",
    "method.interleaving": "Interleaving",
    "method.sq3r": "SQ3R reading",
    "method.hint.none": "",
    "method.hint.activeRecall": "Close the book and write what you remember, then check the gaps.",
    "method.hint.spaced": "Review this lesson again after 1 day, 3 days and 7 days.",
    "method.hint.feynman": "Explain the lesson in simple words as if teaching a friend.",
    "method.hint.interleaving": "Mix this topic with a related topic instead of repeating one block.",
    "method.hint.sq3r": "Survey, question, read, recite and review the chapter.",
    alarm: "Alarm",
    notification: "Notification",
    breaks: "Breaks",
    autoPlan: "Auto-plan",
    addBreak: "+ Add break",
    breakEmpty: "Add tea, food or rest breaks inside your study window.",
    breakName: "Break name",
    breakLabelPlaceholder: "Tea / Food / Rest",
    breakDefaultTea: "Tea",
    breakDefaultFood: "Food",
    breakDefaultRest: "Rest",
    needTimeWindow: "Add a start and finish time first.",
    noAutoBreaks: "Choose a focus technique and a long enough time window.",
    breaksPlanned: "{n} break(s) planned",
    invalidTimeWindow: "Finish time must be after start time.",
    invalidBreak: "Each break needs a start and finish time inside your study window.",
    todaySchedule: "Today's schedule",
    noSchedule: "No schedule",
    examLimitHint: "Upcoming exams: {n}/{max}. Only the next {max} can be planned.",
    examLimitReached: "Exam limit reached ({max}). Complete or delete one to add another.",
    examLimitToast: "You can plan only the next {max} exams.",
    alarmBadge: "Alarm",
    notifyBadge: "Notify",
    editBreaks: "Breaks",
    reminderPermission: "Allow notifications so reminders can reach you.",
    reminderNotSupported: "Reminders work in the Android app.",
    reminderSaved: "Reminder scheduled",
    reminderPending: "Alarm will be set when you save.",
    reminderStartTitle: "Time to study: {task}",
    reminderStartBody: "Your planned study block is starting now.",
    reminderEndTitle: "Lesson time is over: {task}",
    reminderEndBody: "Take a break or mark the task complete.",
    reminderBreakTitle: "Break time: {task}",
    reminderBreakBody: "{label} break is starting now.",
    reminderBreakBodyDefault: "Take a short break now.",
    needStartDate: "Add a start date for this task.",
    scheduleTitle: "Plan",
    focusBlock: "Focus",
    breakBlock: "Break",
    deepWork: "Deep work studio",
    focusTimer: "Focus Timer",
    pomodoroTechnique: "Pomodoro technique",
    pomodoroSettings: "Pomodoro Settings",
    pomodoro: "Pomodoro",
    focus: "Focus",
    break: "Break",
    "mode.focus": "Focus",
    "mode.short": "Short break",
    "mode.long": "Long break",
    timerMode: "Timer mode",
    timerReady: "Ready when you are",
    timerRecharge: "Time to recharge",
    timerRest: "Take a longer rest",
    timerProgress: "In progress — stay with it",
    timerPaused: "Paused",
    start: "Start",
    startFocus: "Start focus",
    startMode: "Start {mode}",
    pause: "Pause",
    resume: "Resume",
    reset: "Reset",
    skip: "Skip",
    resetTimer: "Reset timer",
    skipTimer: "Skip session",
    sessionsUntil: "Sessions until long break",
    sessionDots: "Completed focus sessions in this cycle",
    tipSpace: "Tip: press Space on this tab to start or pause.",
    focusMin: "Focus (min)",
    shortMin: "Short break (min)",
    longMin: "Long break (min)",
    autoBreaks: "Auto-start breaks",
    autoFocus: "Auto-start focus",
    sound: "Completion chime",
    alarmSettings: "Task alarm",
    alarmTone: "Alarm ringtone",
    alarmToneClassic: "Classic bell",
    alarmToneMechanical: "Mechanical clock",
    alarmToneBeep: "Alert beep",
    alarmVibrate: "Vibrate with alarm",
    alarmBluetooth: "Bluetooth only when connected",
    alarmSnooze: "Snooze (minutes)",
    alarmTest: "Test alarm",
    alarmHint: "Alarms ring loudly even when the app is closed, and play through Bluetooth when a device is connected. They stop automatically after one minute.",
    alarmTestTitle: "Alarm test",
    alarmTestBody: "This is how your study alarm will sound.",
    alarmOverlayEyebrow: "Exam Buddy alarm",
    alarmTurnOff: "Turn off alarm",
    alarmSnoozeAction: "Snooze",
    alarmOverlayNote: "The alarm stops automatically after one minute.",
    alarmAutoStop: "Stops automatically in {n}s",
    alarmStopped: "Alarm turned off",
    alarmSnoozed: "Snoozed for {n} min",
    alarmReminderTitle: "Study reminder",
    alarmFullScreenHint: "Turn off the alarm from the notification if the full-screen alert does not appear.",
    alarmFullScreenAccess: "Allow full-screen alarms",
    backgroundAccess: "Background running access",
    backgroundAllowed: "Background timer is allowed.",
    backgroundBlocked: "Allow background activity and battery access so the timer keeps running.",
    backgroundUnavailable: "Background timer is available in the Android app.",
    backgroundHint: "Your timer keeps running in the background.",
    saveSettings: "Save settings",
    todaySessions: "Today's Sessions",
    sessionsEmpty: "Finish a focus session to see it here.",
    minutesCount: "{n} min",
    yourProgress: "Your progress",
    insights: "Insights",
    last7: "Last 7 days",
    focusWeek: "Focus This Week",
    sessions: "Sessions",
    taskCompletion: "Task Completion",
    examsTracked: "Exams Tracked",
    focusMinutes: "Focus Minutes",
    daily: "Daily",
    taskBalance: "Task Balance",
    allTime: "All time",
    coachesNote: "Coach's Note",
    insightEmpty: "Add exams and tasks to unlock personalized study tips.",
    tipExam: "You have {n} exam(s) ahead. Try one {m}-minute focus session today to build momentum.",
    tipTasks: "Your focus time is growing. Tackle two pending tasks in your next session to lift your completion rate.",
    tipNice: "Nice work — {time} of focus this week. Keep sessions short, breaks real, and deadlines visible.",
    tipDate: "Add your next exam date so your countdown and preparation progress can do the remembering for you.",
    appearance: "Appearance",
    appearanceDesc: "Choose your preferred look.",
    theme: "Theme",
    themeLight: "Light",
    themeDark: "Dark",
    android: "Android",
    aboutBadge: "About Exam Buddy",
    aboutHeroTitle: "Study with less friction, more focus.",
    aboutHeroText: "Exam Buddy is a calm, lightweight workspace for everything exam season throws at you. Deadlines, revision tasks and focus sessions live in one place — right on your device.",
    factLocal: "local",
    factAccounts: "accounts",
    factDistractions: "distractions",
    whatYouGet: "What you get",
    smallTools: "Small tools, big momentum",
    builtForStudents: "Built for students",
    feature1Title: "Live countdowns",
    feature1Text: "Add an exam date once. A precise days-to-seconds timer and prep progress bar keep the deadline visible.",
    feature2Title: "Pomodoro focus",
    feature2Text: "Work in focused sprints with configurable focus and break lengths, auto-start options and a completion chime.",
    feature3Title: "Task planning",
    feature3Text: "Capture revision to-dos, set priorities and due dates, then filter and search to find exactly what matters now.",
    feature4Title: "Honest insights",
    feature4Text: "A seven-day focus chart, task balance and a coach's note turn your activity into gentle, useful feedback.",
    feature5Title: "Private by design",
    feature5Text: "Everything stays on your device. No account, no tracking, no server — you own your study data.",
    feature6Title: "Made to feel right",
    feature6Text: "Light and dark themes, smooth transitions and keyboard-friendly controls keep the workspace comfortable.",
    howWorks: "How it works",
    threeSteps: "Three simple steps",
    step1Title: "Map your term",
    step1Text: "Add your exams and the tasks that lead up to them. Your next deadline is always one glance away.",
    step2Title: "Focus in sprints",
    step2Text: "Start a Pomodoro, keep distractions out, and let the ring show how much time is left.",
    step3Title: "Watch it add up",
    step3Text: "Finished sessions and tasks feed your insights and streak, so progress stays motivating.",
    privacyTitle: "Your data stays yours",
    privacyText: "Exams, tasks and focus history never leave this device. Your information stays private on your phone.",
    developedBy: "Developed by Dakshan Bhashna",
    liteNote: "A lightweight study companion built to keep deadlines visible and focus simple.",
    "about.label": "ABOUT",
    "about.subtitle": "Sinhala English study app",
    "about.privacy": "Privacy policy",
    "about.licences": "Licences and credits",
    "about.privacyNote": "Privacy Policy",
    "about.licencesNote": "Licences and Credits",
    "developer.label": "DEVELOPER",
    "developer.role": "Developer and owner",
    "developer.message": "Questions ideas or a problem Message me",
    "developer.website": "Website",
    "about.checkUpdates": "Check for updates",
    "about.privacyHint": "Your data never leaves this device",
    "about.licencesHint": "Sounds, fonts and libraries",
    "about.updateHint": "Always get the latest release",
    version: "Version 2.2.0",
    footerText: "Exam Buddy Pro — your data stays private on this device.",
    backToTop: "Back to top",
    "update.title": "Update available",
    "update.newVersion": "New version {version} is ready to install.",
    "update.current": "You are using version {version}",
    "update.changelogTitle": "What's new",
    "update.now": "Update now",
    "update.later": "Later",
    "update.releasePage": "View release notes",
    "update.checking": "Checking for updates…",
    "update.upToDate": "You're on the latest version",
    "update.failed": "Could not check for updates. Try again later.",
    "update.availableToast": "New version {version} available",
    "greet.morning": "Good morning",
    "greet.afternoon": "Good afternoon",
    "greet.evening": "Good evening",
    couldNotSave: "Could not save your data",
    examUpdated: "Exam updated",
    examAdded: "Exam added",
    taskUpdated: "Task updated",
    taskAdded: "Task added",
    noCompletedToClear: "No completed tasks to clear",
    confirmClear: "Remove {n} completed task(s)?",
    completedCleared: "Completed tasks cleared",
    darkEnabled: "Dark mode enabled",
    lightEnabled: "Light mode enabled",
    timerReset: "Timer reset",
    focusDone: "Focus session complete — take a break!",
    breakDone: "Break over — ready to focus?",
    settingsSaved: "Timer settings saved",
    "permissions.eyebrow": "Quick setup",
    "permissions.title": "Let's set up Exam Buddy",
    "permissions.subtitle": "Allow these to keep reminders, the focus timer and updates working while you study.",
    "permissions.note": "You can change any of these later in Android Settings.",
    "permissions.continue": "Continue",
    "permissions.allowAll": "Allow recommended",
    "permissions.allow": "Allow",
    "permissions.allowed": "Allowed",
    "permissions.denied": "Not allowed",
    "permissions.openSettings": "Settings",
    "permissions.manage": "App access",
    "permissions.banner": "Some access is missing — tap to finish setup.",
    "permissions.saved": "Setup updated",
    "permissions.notSupported": "This access is only available in the Android app.",
    "permissions.notifications.title": "Notifications",
    "permissions.notifications.desc": "Task reminders and focus timer alerts.",
    "permissions.alarm.title": "Exact alarms",
    "permissions.alarm.desc": "Start and finish study sessions on time.",
    "permissions.battery.title": "Battery access",
    "permissions.battery.desc": "Keep the focus timer alive when the screen is off.",
    "permissions.files.title": "File access",
    "permissions.files.desc": "Save your study data and future backups on this device.",
    "permissions.install.title": "App updates",
    "permissions.install.desc": "Download and install new versions without leaving the app.",
    "permissions.installHint": "Android will ask you to allow installs from Exam Buddy.",
    "permissions.recommended": "Recommended",
    "permissions.optional": "Optional",
    "permissions.notNow": "Not now",
    "permissions.granted": "All permissions are ready.",
    "permissions.needed": "Grant the missing access to keep everything reliable.",
    "detail.subtitle": "{n} item(s)",
    "detail.empty": "Nothing here yet.",
    "detail.openTasks": "Open Tasks",
    "detail.openExams": "Open Exams",
    "detail.edit": "Edit",
    "detail.editBreaks": "Edit breaks",
    "detail.done": "Mark done",
    "detail.undo": "Mark not done",
    "detail.delete": "Delete",
    "detail.close": "Close",
    "detail.nextExam": "Next exam",
    "detail.pending": "Pending tasks",
    "detail.upcoming": "Upcoming exams",
    "detail.completedExams": "Completed exams",
    "detail.doneTasks": "Completed tasks",
    "detail.daysNext": "Days to next exam",
    "detail.focusToday": "Focus today",
    "detail.streak": "Study streak",
    "detail.bestStreak": "Best streak",
    "detail.taskTitle": "Task details",
    "detail.examTitle": "Exam details",
    "detail.noExam": "No exam linked",
    "detail.schedule": "Schedule",
    "detail.noSchedule": "No schedule set",
    "detail.breaks": "Breaks",
    "detail.reminders": "Reminders",
    "detail.on": "On",
    "detail.off": "Off",
    "smart.quickAdd": "Quick add",
    "smart.tea": "Tea 10 min",
    "smart.food": "Food 30 min",
    "smart.rest": "Rest 15 min",
    "smart.breakAdded": "{label} break added at {time}",
    "smart.autoTechnique": "Auto-selected {technique} to fit your break plan.",
    "smart.autoApplied": "Study technique auto-adjusted to {technique}.",
    "smart.noGap": "No free space for that break. Adjust your study window.",
    "smart.needWindow": "Add a start and finish time first.",
    "update.downloading": "Downloading update…",
    "update.downloadProgress": "Downloading {p}%",
    "update.installing": "Opening the installer…",
    "update.permission": "Allow installs from Exam Buddy, then return to the app.",
    "update.playProtect": "If Play Protect asks, choose “Install anyway”. The update is signed with the same key as your current app.",
    "update.downloadOnly": "Download only",
    "update.failedInstall": "Update download failed. Try again.",
    "update.badUrl": "This update link is not trusted.",
    "update.ready": "Update downloaded. Finish installing in the Android installer.",
    "tab.cards": "Cards",
    "stat.cardsDue": "Cards Due",
    "quick.reviewCards": "Review cards",
    "quick.reviewCardsHint": "Practice active recall",
    "detail.cardsDue": "Cards due",
    "detail.openCards": "Open Cards",
    "cards.eyebrow": "Active recall",
    "cards.title": "Flashcards",
    "cards.reviewDue": "Review due",
    "cards.total": "Total cards",
    "cards.due": "Due now",
    "cards.mastered": "Mastered",
    "cards.addCard": "Add card",
    "cards.editCard": "Edit card",
    "cards.front": "Question",
    "cards.frontPlaceholder": "e.g. What is the powerhouse of the cell?",
    "cards.back": "Answer",
    "cards.backPlaceholder": "e.g. The mitochondria",
    "cards.deck": "Deck",
    "cards.deckPlaceholder": "e.g. Biology",
    "cards.linkedExam": "Exam (optional)",
    "cards.yourCards": "Your cards",
    "cards.defaultDeck": "General",
    "cards.searchPlaceholder": "Search cards or decks...",
    "cards.searchLabel": "Search cards",
    "cards.filterDeck": "Filter by deck",
    "cards.filterStatus": "Filter by status",
    "cards.filterAll": "All cards",
    "cards.filterDue": "Due",
    "cards.filterMastered": "Mastered",
    "cards.allDecks": "All decks",
    "cards.empty": "No flashcards yet. Add your first card above.",
    "cards.noMatch": "No cards match your filters.",
    "cards.count": "{n} cards",
    "cards.study": "Study",
    "cards.dueNowLabel": "Due now",
    "cards.dueIn": "In {n} day(s)",
    "cards.dueInMinutes": "In {n} min",
    "cards.added": "Flashcard added",
    "cards.updated": "Flashcard updated",
    "cards.deleted": "Flashcard deleted",
    "cards.needBoth": "Add both a question and an answer.",
    "cards.noDue": "Nothing is due right now. Add cards or review a single card from the list.",
    "cards.deleteConfirm": "Delete this flashcard?",
    "cards.masteredBadge": "Mastered",
    "cards.dueBadge": "Due",
    "cards.reviewed": "{n} reviews",
    "cards.study.title": "Study session",
    "cards.study.question": "Question",
    "cards.study.answer": "Answer",
    "cards.study.tap": "Tap to reveal the answer",
    "cards.study.showAnswer": "Show answer",
    "cards.study.again": "Again",
    "cards.study.good": "Good",
    "cards.study.easy": "Easy",
    "cards.study.progress": "{current} / {total}",
    "cards.study.remaining": "{n} left in this session",
    "cards.study.doneTitle": "Session complete",
    "cards.study.doneBody": "You reviewed {n} card(s).",
    "cards.study.done": "Done",
    "cards.study.caughtUpTitle": "All caught up",
    "cards.study.empty": "No cards are due right now. Add new cards or come back later.",
    "cards.study.startHint": "Cards you find hard come back in the same session.",
    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    monthsLong: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    weekdaysLong: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  },
  si: {
    appTitle: "Exam Buddy Pro",
    brandName: "Exam Buddy",
    brandSubtitle: "වඩා බුද්ධිමත්ව සැලසුම් කරන්න. ගැඹුරින් අවධානය යොමු කරන්න. සෑම විභාගයක්ම ජය ගන්න.",
    themeToggleTitle: "තේමාව මාරු කරන්න",
    switchThemeDark: "අඳුරු පෙනුමට මාරු වෙන්න",
    switchThemeLight: "ආලෝක පෙනුමට මාරු වෙන්න",
    switchLanguage: "භාෂාව මාරු කරන්න",
    lang: { english: "English", sinhala: "සිංහල" },
    languageChanged: "භාෂාව {lang} බවට මාරු විය",
    "lang.english": "English",
    "lang.sinhala": "සිංහල",
    languageCardTitle: "භාෂාව",
    languageCardDesc: "ඔබ කැමති භාෂාව තෝරන්න. වෙනස්කම් වහාම ක්‍රියාත්මක වේ.",
    mainSections: "ප්‍රධාන අංශ",
    "tab.dashboard": "උපකරණ පුවරුව",
    "tab.exams": "විභාග",
    "tab.tasks": "කාර්යයන්",
    "tab.focus": "අවධානය",
    "tab.insights": "තීක්ෂ්ණ බුද්ධිය",
    "tab.about": "පිළිබඳ",
    create: "එකතු කරන්න",
    today: "අද",
    tomorrow: "හෙට",
    welcome: "නැවතත් සාදරයෙන් පිළිගනිමු",
    newExam: "+ නව විභාගයක්",
    "stat.upcoming": "ඉදිරි විභාග",
    "stat.pending": "ඉතිරි කාර්යයන්",
    "stat.completed": "සම්පූර්ණ කළ විභාග",
    "stat.doneTasks": "කළ කාර්යයන්",
    "stat.daysNext": "ඊළඟට ඉතිරි දින",
    "stat.focusToday": "අද අවධානය",
    "stat.streak": "අධ්‍යයන පෙළ",
    day: "දිනය",
    days: "දින",
    dayShort: "දි",
    minuteShort: "මි",
    hourShort: "පැ",
    nextExam: "ඊළඟ විභාගය",
    liveCountdown: "සජීවී ගණන් කිරීම",
    countdownLabel: "ඊළඟ විභාගයට ඉතිරි කාලය",
    "countdown.days": "දින",
    "countdown.hours": "පැය",
    "countdown.mins": "මිනිත්තු",
    "countdown.secs": "තත්පර",
    prepHint: "ඔබේ සූදානම නිරීක්ෂණය කිරීමට විභාගයක් එක් කරන්න.",
    noUpcoming: "ඉදිරි විභාග නැත. විභාග අංශයෙන් එකක් එක් කරන්න.",
    noUpcomingShort: "ඉදිරි විභාග නැත.",
    prepProgress: "ඔබේ සූදානම් කාලයෙන් {p}% භාවිතා වී ඇත · {when}",
    daysLeft: "ඉතිරි දින {n}",
    daysCount: "දින {n}",
    quickActions: "ඉක්මන් ක්‍රියා",
    "quick.addExam": "විභාගයක් එක් කරන්න",
    "quick.addExamHint": "නව අවසන් දිනයක් සටහන් කරන්න",
    "quick.addTask": "කාර්යයක් එක් කරන්න",
    "quick.addTaskHint": "පුනරීක්ෂණය සැලසුම් කරන්න",
    "quick.startFocus": "අවධානය ආරම්භ කරන්න",
    "quick.startFocusHint": "පොමොදෝරෝ සැසියක් ආරම්භ කරන්න",
    "quick.viewInsights": "තීක්ෂ්ණ බුද්ධිය බලන්න",
    "quick.viewInsightsHint": "ඔබේ ප්‍රගතිය දැක ගන්න",
    todaysPlan: "අද දවසේ සැලැස්ම",
    upcomingDeadlines: "ඉදිරි අවසන් දින සහ කාර්යයන්",
    nextTasks: "ඊළඟ කාර්යයන්",
    anytime: "ඕනෑම වේලාවක",
    noPendingTasks: "ඉතිරි කාර්යයන් නැත.",
    "exams.title": "විභාග",
    addExam: "විභාගයක් එක් කරන්න",
    editExam: "විභාගය සංස්කරණය කරන්න",
    saveChanges: "වෙනස්කම් සුරකින්න",
    cancelEdit: "සංස්කරණය අවලංගු කරන්න",
    subject: "විෂය",
    subjectPlaceholder: "උදා: ගණිතය",
    examName: "විභාගයේ නම",
    date: "දිනය",
    examDate: "විභාග දිනය",
    category: "කාණ්ඩය",
    "category.general": "සාමාන්‍ය",
    "category.mathematics": "ගණිතය",
    "category.science": "විද්‍යාව",
    "category.language": "භාෂාව",
    "category.history": "ඉතිහාසය",
    "category.other": "වෙනත්",
    notes: "සටහන් (විකල්ප)",
    notesPlaceholder: "පරිච්ඡේද, මාතෘකා, කාමරය...",
    examList: "විභාග ලැයිස්තුව",
    examCount: "විභාග {n}ක්",
    examSearchPlaceholder: "විභාග හෝ සටහන් සොයන්න...",
    searchExams: "විභාග සොයන්න",
    filterExams: "විභාග පෙරහන් කරන්න",
    all: "සියල්ල",
    upcoming: "ඉදිරි",
    past: "අතීත",
    completed: "සම්පූර්ණ",
    completedShort: "සම්පූර්ණ",
    pending: "ඉතිරි",
    examEmpty: "තවම විභාග නැත.",
    examNoMatch: "ඔබේ පෙරහන්වලට ගැළපෙන විභාග නැත.",
    edit: "සංස්කරණය",
    done: "සම්පූර්ණ",
    undo: "ආපසු",
    delete: "මකන්න",
    toDo: "කරගත යුතු දේ",
    "tasks.title": "අධ්‍යයන කාර්යයන්",
    addTask: "කාර්යයක් එක් කරන්න",
    editTask: "කාර්යය සංස්කරණය කරන්න",
    taskLabel: "කාර්යය",
    taskPlaceholder: "උදා: 5වන පරිච්ඡේදය පුනරීක්ෂණය කරන්න",
    priority: "ප්‍රමුඛතාවය",
    low: "අඩු",
    medium: "මධ්‍යම",
    high: "ඉහළ",
    due: "අවසන් දිනය (විකල්ප)",
    taskList: "කාර්ය ලැයිස්තුව",
    clearCompleted: "සම්පූර්ණ කළ ඒවා මකන්න",
    taskSearchPlaceholder: "කාර්යයන් සොයන්න...",
    searchTasks: "කාර්යයන් සොයන්න",
    filterTasks: "කාර්යයන් පෙරහන් කරන්න",
    active: "ක්‍රියාකාරී",
    highPriority: "ඉහළ ප්‍රමුඛතාවය",
    taskEmpty: "තවම කාර්යයන් නැත.",
    taskNoMatch: "ඔබේ පෙරහන්වලට ගැළපෙන කාර්යයන් නැත.",
    overdue: "කල් ඉකුත් වී ඇත",
    dueToday: "අද දිනට",
    dueOn: "{date} දිනට",
    linkedExam: "විභාගය (විකල්ප)",
    noExam: "විභාගයක් නැත",
    startDate: "ආරම්භක දිනය",
    startTime: "ආරම්භක වේලාව",
    endTime: "පාඩම අවසන් වන වේලාව",
    technique: "අධ්‍යයන ක්‍රමය",
    "technique.pomodoro": "පොමොදෝරෝ 25/5",
    "technique.deep50": "ගැඹුරු වැඩ 50/10",
    "technique.ultradian": "අල්ට්‍රාඩියන් 90/20",
    "technique.fiftyTwo": "52/17 අවධානය",
    "technique.timeblock": "කාල කොටස් කිරීම",
    "technique.custom": "අභිරුචි සැලැස්ම",
    "technique.hint.pomodoro": "මිනිත්තු 25ක අවධානයක්, මිනිත්තු 5ක විවේකයක් සහ වට 4කට පසු මිනිත්තු 15ක දිගු විවේකයක්.",
    "technique.hint.deep50": "මිනිත්තු 50ක ගැඹුරු අවධානයක් සහ මිනිත්තු 10ක විවේකයක්. ගැටලු විසඳීමට සුදුසුයි.",
    "technique.hint.ultradian": "ඔබේ ස්වාභාවික ශක්ති චක්‍රයට අනුව මිනිත්තු 90ක අවධානයක් සහ මිනිත්තු 20ක විවේකයක්.",
    "technique.hint.fiftyTwo": "මිනිත්තු 52ක අවධානයක් සහ මිනිත්තු 17ක විවේකයක් — පර්යේෂණයෙන් තහවුරු වූ රිද්මයක්.",
    "technique.hint.timeblock": "එක් ආරක්ෂිත කාල කොටසක්. තේ, කෑම සහ විවේක ඔබම එක් කරන්න.",
    "technique.hint.custom": "ඔබේ දවසට ගැළපෙන සැලැස්මක් සාදන්න. විවේක ඔබම එක් කරන්න.",
    studyMethod: "අධ්‍යයන ක්‍රමවේදය",
    "method.none": "නැත",
    "method.activeRecall": "සක්‍රීය සිහිපත් කිරීම",
    "method.spaced": "විරාම පුනරාවර්තනය",
    "method.feynman": "ෆේන්මන් ක්‍රමය",
    "method.interleaving": "මිශ්‍ර කරමින් ඉගෙනීම",
    "method.sq3r": "SQ3R කියවීම",
    "method.hint.none": "",
    "method.hint.activeRecall": "පොත වසා ඔබට මතක දේ ලියන්න, පසුව අඩුපාඩු පරීක්ෂා කරන්න.",
    "method.hint.spaced": "මෙම පාඩම දින 1කට, 3කට සහ 7කට පසු නැවත පුනරීක්ෂණය කරන්න.",
    "method.hint.feynman": "මිතුරෙකුට උගන්වනවා සේ සරල වචනවලින් පාඩම පැහැදිලි කරන්න.",
    "method.hint.interleaving": "එකම කොටස නැවත නැවත නොකර, සම්බන්ධ මාතෘකාවක් සමඟ මිශ්‍ර කරන්න.",
    "method.hint.sq3r": "පරිච්ඡේදය සමීක්ෂණය කර, ප්‍රශ්න අසා, කියවා, කියාපාර කර නැවත බලන්න.",
    alarm: "ඇලාම්",
    notification: "දැනුම්දීම",
    breaks: "විවේක",
    autoPlan: "ස්වයං සැලැස්ම",
    addBreak: "+ විවේකයක් එක් කරන්න",
    breakEmpty: "ඔබේ අධ්‍යයන කාලය තුළ තේ, කෑම හෝ විවේක එක් කරන්න.",
    breakName: "විවේකයේ නම",
    breakLabelPlaceholder: "තේ / කෑම / විවේක",
    breakDefaultTea: "තේ",
    breakDefaultFood: "කෑම",
    breakDefaultRest: "විවේකය",
    needTimeWindow: "පළමුව ආරම්භක සහ අවසන් වේලාවන් එක් කරන්න.",
    noAutoBreaks: "focus ක්‍රමයක් සහ ප්‍රමාණවත් කාලයක් තෝරන්න.",
    breaksPlanned: "විවේක {n}ක් සැලසුම් කර ඇත",
    invalidTimeWindow: "අවසන් වේලාව ආරම්භක වේලාවට පසුව විය යුතුය.",
    invalidBreak: "සෑම විවේකයකටම අධ්‍යයන කාලය තුළ ආරම්භක සහ අවසන් වේලාවක් අවශ්‍යයි.",
    todaySchedule: "අද කාලසටහන",
    noSchedule: "කාලසටහනක් නැත",
    examLimitHint: "ඉදිරි විභාග: {n}/{max}. ඊළඟ {max}ක් පමණක් සැලසුම් කළ හැක.",
    examLimitReached: "විභාග සීමාවට ළඟා වී ඇත ({max}). තවත් එකක් එක් කිරීමට එකක් සම්පූර්ණ කරන්න හෝ මකන්න.",
    examLimitToast: "ඔබට සැලසුම් කළ හැක්කේ ඊළඟ විභාග {max}ක් පමණි.",
    alarmBadge: "ඇලාම්",
    notifyBadge: "දැනුම්දීම",
    editBreaks: "විවේක",
    reminderPermission: "මතක් කිරීම් ලැබීමට දැනුම්දීම්වලට අවසර දෙන්න.",
    reminderNotSupported: "මතක් කිරීම් Android යෙදුම තුළ ක්‍රියා කරයි.",
    reminderSaved: "මතක් කිරීම සකසා ඇත",
    reminderPending: "සුරකින විට ඇලාම් සකසනු ඇත.",
    reminderStartTitle: "අධ්‍යයනයට වේලාවයි: {task}",
    reminderStartBody: "ඔබේ සැලසුම් කළ අධ්‍යයන කාලය දැන් ආරම්භ වේ.",
    reminderEndTitle: "පාඩම් වේලාව අවසන්: {task}",
    reminderEndBody: "විවේකයක් ගන්න හෝ කාර්යය සම්පූර්ණ කරන්න.",
    reminderBreakTitle: "විවේක වේලාව: {task}",
    reminderBreakBody: "{label} විවේකය දැන් ආරම්භ වේ.",
    reminderBreakBodyDefault: "දැන් කෙටි විවේකයක් ගන්න.",
    needStartDate: "මෙම කාර්යයට ආරම්භක දිනයක් එක් කරන්න.",
    scheduleTitle: "සැලැස්ම",
    focusBlock: "අවධානය",
    breakBlock: "විවේකය",
    deepWork: "ගැඹුරු වැඩ චිත්‍රාගාරය",
    focusTimer: "අවධානය කාලමානය",
    pomodoroTechnique: "පොමොදෝරෝ ක්‍රමය",
    pomodoroSettings: "පොමොදෝරෝ සැකසුම්",
    pomodoro: "පොමොදෝරෝ",
    focus: "අවධානය",
    break: "විවේකය",
    "mode.focus": "අවධානය",
    "mode.short": "කෙටි විවේකය",
    "mode.long": "දිගු විවේකය",
    timerMode: "කාලමාන මාදිලිය",
    timerReady: "ඔබ සූදානම් වූ විට",
    timerRecharge: "නැවත බල ගැන්වීමට කාලයයි",
    timerRest: "ටිකක් දිගු විවේකයක් ගන්න",
    timerProgress: "ක්‍රියාත්මකයි — අවධානය රඳවා ගන්න",
    timerPaused: "නවත්වා ඇත",
    start: "ආරම්භ කරන්න",
    startFocus: "අවධානය ආරම්භ කරන්න",
    startMode: "{mode} ආරම්භ කරන්න",
    pause: "නවත්වන්න",
    resume: "නැවත ආරම්භ කරන්න",
    reset: "නැවත සකසන්න",
    skip: "මඟ හරින්න",
    resetTimer: "කාලමානය නැවත සකසන්න",
    skipTimer: "සැසිය මඟ හරින්න",
    sessionsUntil: "දිගු විවේකයට ඉතිරි සැසි",
    sessionDots: "මෙම චක්‍රයේ සම්පූර්ණ කළ අවධාන සැසි",
    tipSpace: "උපදෙස්: ආරම්භ කිරීමට හෝ නවත්වීමට මෙම අංශයේ Space ඔබන්න.",
    focusMin: "අවධානය (මිනිත්තු)",
    shortMin: "කෙටි විවේකය (මිනිත්තු)",
    longMin: "දිගු විවේකය (මිනිත්තු)",
    autoBreaks: "විවේක ස්වයංක්‍රීයව ආරම්භ කරන්න",
    autoFocus: "අවධානය ස්වයංක්‍රීයව ආරම්භ කරන්න",
    sound: "සම්පූර්ණ වීමේ ශබ්දය",
    alarmSettings: "කාර්ය ඇලාම්",
    alarmTone: "ඇලාම් සංගීතය",
    alarmToneClassic: "සාම්ප්‍රදායික සීනුව",
    alarmToneMechanical: "යාන්ත්‍රික ඔරලෝසුව",
    alarmToneBeep: "අනතුරු ඇඟවීමේ බීප්",
    alarmVibrate: "ඇලාම් සමඟ කම්පනය",
    alarmBluetooth: "සම්බන්ධ නම් Bluetooth හරහා පමණි",
    alarmSnooze: "Snooze (විනාඩි)",
    alarmTest: "ඇලාම් පරීක්ෂා කරන්න",
    alarmHint: "යෙදුම වසා තිබුණත් ඇලාම් හයියෙන් නාද වේ. Bluetooth උපාංගයක් සම්බන්ධ නම් එය හරහා නාද වේ. විනාඩියකින් ස්වයංක්‍රීයව නවතී.",
    alarmTestTitle: "ඇලාම් පරීක්ෂණය",
    alarmTestBody: "ඔබේ අධ්‍යයන ඇලාම් නාද වන්නේ මෙසේයි.",
    alarmOverlayEyebrow: "Exam Buddy ඇලාම්",
    alarmTurnOff: "ඇලාම් නවත්වන්න",
    alarmSnoozeAction: "Snooze",
    alarmOverlayNote: "ඇලාම් විනාඩියකින් ස්වයංක්‍රීයව නවතී.",
    alarmAutoStop: "තත්පර {n}කින් ස්වයංක්‍රීයව නවතී",
    alarmStopped: "ඇලාම් නවත්වා ඇත",
    alarmSnoozed: "විනාඩි {n}ක් සඳහා Snooze කර ඇත",
    alarmReminderTitle: "අධ්‍යයන මතක් කිරීම",
    alarmFullScreenHint: "සම්පූර්ණ තිර ඇඟවීම නොපෙනේ නම් දැනුම්දීමෙන් ඇලාම් නවත්වන්න.",
    alarmFullScreenAccess: "සම්පූර්ණ තිර ඇලාම්වලට අවසර දෙන්න",
    backgroundAccess: "පසුබිම් ක්‍රියාකාරීත්ව අවසරය",
    backgroundAllowed: "පසුබිම් කාලමානයට අවසර ඇත.",
    backgroundBlocked: "යෙදුමෙන් පිටව ගියත් කාලමානය දිගටම ධාවනය වීමට පසුබිම් සහ බැටරි අවසර දෙන්න.",
    backgroundUnavailable: "පසුබිම් කාලමානය Android යෙදුම තුළ ඇත.",
    backgroundHint: "කාලමානය පසුබිමේ දිගටම ධාවනය වේ.",
    saveSettings: "සැකසුම් සුරකින්න",
    todaySessions: "අද සැසි",
    sessionsEmpty: "මෙහි දැක ගැනීමට අවධාන සැසියක් සම්පූර්ණ කරන්න.",
    minutesCount: "මිනිත්තු {n}",
    yourProgress: "ඔබේ ප්‍රගතිය",
    insights: "තීක්ෂ්ණ බුද්ධිය",
    last7: "පසුගිය දින 7",
    focusWeek: "මෙම සතියේ අවධානය",
    sessions: "සැසි",
    taskCompletion: "කාර්ය සම්පූර්ණතාවය",
    examsTracked: "නිරීක්ෂණය කළ විභාග",
    focusMinutes: "අවධාන මිනිත්තු",
    daily: "දිනපතා",
    taskBalance: "කාර්ය සමබරතාවය",
    allTime: "මුළු කාලය",
    coachesNote: "උපදේශකගේ සටහන",
    insightEmpty: "ඔබට පුද්ගලීකෘත අධ්‍යයන උපදෙස් ලබා ගැනීමට විභාග සහ කාර්යයන් එක් කරන්න.",
    tipExam: "ඔබට ඉදිරියේ විභාග {n}ක් ඇත. ප්‍රගතියක් ඇති කර ගැනීමට අද එක් {m} මිනිත්තු අවධාන සැසියක් උත්සාහ කරන්න.",
    tipTasks: "ඔබේ අවධාන කාලය වර්ධනය වෙමින් පවතී. සම්පූර්ණතාව ඉහළ නැංවීමට ඊළඟ සැසියේ ඉතිරි කාර්යයන් දෙකක් සම්පූර්ණ කරන්න.",
    tipNice: "හොඳ වැඩක් — මෙම සතියේ අවධානය {time}. සැසි කෙටිව, විවේක සැබෑව, අවසන් දින පෙනෙන සේ තබා ගන්න.",
    tipDate: "ඔබේ ඊළඟ විභාග දිනය එක් කරන්න, එවිට ගණන් කිරීම සහ සූදානම් වීමේ ප්‍රගතිය ඔබ වෙනුවෙන් මතක තබා ගනී.",
    appearance: "පෙනුම",
    appearanceDesc: "ඔබ කැමති පෙනුම තෝරන්න.",
    theme: "තේමාව",
    themeLight: "ආලෝක",
    themeDark: "අඳුරු",
    android: "Android",
    aboutBadge: "Exam Buddy පිළිබඳ",
    aboutHeroTitle: "අඩු බාධාවලින්, වැඩි අවධානයකින් අධ්‍යයනය කරන්න.",
    aboutHeroText: "විභාග කාලය ගෙන එන සෑම දෙයක්ම සඳහා Exam Buddy යනු සන්සුන්, සැහැල්ලු වැඩබිමකි. අවසන් දින, පුනරීක්ෂණ කාර්යයන් සහ අවධාන සැසි සියල්ල එකම තැනක — ඔබේ උපාංගයේමය.",
    factLocal: "ප්‍රාදේශීය",
    factAccounts: "ගිණුම්",
    factDistractions: "බාධා",
    whatYouGet: "ඔබට ලැබෙන දේ",
    smallTools: "කුඩා මෙවලම්, විශාල ප්‍රගතියක්",
    builtForStudents: "සිසුන් සඳහා නිර්මාණය කළ",
    feature1Title: "සජීවී ගණන් කිරීම්",
    feature1Text: "විභාග දිනයක් එක් වරක් එක් කරන්න. නිවැරදි දින-to-තත්පර කාලමානයක් සහ සූදානම් කිරීමේ ප්‍රගති තීරුවක් අවසන් දිනය නිරන්තරයෙන් පෙන්වයි.",
    feature2Title: "පොමොදෝරෝ අවධානය",
    feature2Text: "වින්‍යාස කළ හැකි අවධානය සහ විවේක කාලය, ස්වයංක්‍රීය ආරම්භ විකල්ප සහ සම්පූර්ණ ශබ්දය සමඟ අවධාන සැසිවල වැඩ කරන්න.",
    feature3Title: "කාර්ය සැලසුම් කිරීම",
    feature3Text: "පුනරීක්ෂණ කාර්යයන් සටහන් කරන්න, ප්‍රමුඛතා සහ අවසන් දින නියම කරන්න, පසුව පෙරහන් සහ සෙවුම් භාවිතයෙන් අවශ්‍ය දේ සොයා ගන්න.",
    feature4Title: "අව්‍යාජ තීක්ෂ්ණ බුද්ධිය",
    feature4Text: "දින හතක අවධාන වගුවක්, කාර්ය සමබරතාවයක් සහ උපදේශක සටහනක් ඔබේ ක්‍රියාකාරිත්වය ප්‍රයෝජනවත් ප්‍රතිචාරයක් බවට පත් කරයි.",
    feature5Title: "පැහැදිලිවම පුද්ගලික",
    feature5Text: "සියල්ල ඔබේ උපාංගයේම පවතී. ගිණුමක් නැත, නිරීක්ෂණයක් නැත, සේවාදායකයක් නැත — ඔබේ අධ්‍යයන දත්ත ඔබේමය.",
    feature6Title: "හැඟීමට හරියන සේ",
    feature6Text: "ආලෝක සහ අඳුරු තේමා, සුමට සංක්‍රාන්ති සහ යතුරුපුවරුවට හිතකර පාලනයන් වැඩබිම සුවපහසුව තබා ගනී.",
    howWorks: "ක්‍රියා කරන ආකාරය",
    threeSteps: "සරල පියවර තුනක්",
    step1Title: "ඔබේ වාරය සිතියම් කරන්න",
    step1Text: "ඔබේ විභාග සහ ඒවාට පෙර කළ යුතු කාර්යයන් එක් කරන්න. ඊළඟ අවසන් දිනය එක් බැල්මකින් දැක ගත හැකිය.",
    step2Title: "සැසි වශයෙන් අවධානය යොමු කරන්න",
    step2Text: "පොමොදෝරෝ සැසියක් ආරම්භ කරන්න, බාධා ඈත් කරන්න, ඉතිරි කාලය වළය පෙන්වයි.",
    step3Title: "එකතු වන ආකාරය බලන්න",
    step3Text: "සම්පූර්ණ සැසි සහ කාර්යයන් ඔබේ තීක්ෂ්ණ බුද්ධිය සහ පෙළ පෝෂණය කරයි, එවිට ප්‍රගතිය පෙළඹවීමක් ලෙස පවතී.",
    privacyTitle: "ඔබේ දත්ත ඔබේමය",
    privacyText: "විභාග, කාර්යයන් සහ අවධාන ඉතිහාසය කිසිදා මෙම උපාංගයෙන් පිට නොයයි. ඔබේ තොරතුරු ඔබේ දුරකථනයේ පුද්ගලිකව පවතී.",
    developedBy: "Dakshan Bhashna විසින් සංවර්ධනය කරන ලදී",
    liteNote: "අවසන් දින පෙනෙන සේ තබා ගැනීමට සහ අවධානය සරල කිරීමට නිර්මාණය කළ සැහැල්ලු අධ්‍යයන සහායකයක්.",
    "about.label": "පිළිබඳ",
    "about.subtitle": "සිංහල ඉංග්‍රීසි අධ්‍යයන යෙදුම",
    "about.privacy": "පෞද්ගලිකතා ප්‍රතිපත්තිය",
    "about.licences": "බලපත්‍ර සහ ගෞරව",
    "about.privacyNote": "පෞද්ගලිකතා ප්‍රතිපත්තිය",
    "about.licencesNote": "බලපත්‍ර සහ ගෞරව",
    "developer.label": "සංවර්ධක",
    "developer.role": "සංවර්ධක සහ හිමිකරු",
    "developer.message": "ප්‍රශ්න අදහස් හෝ ගැටලුවක් ඇත්නම් මට පණිවිඩයක් එවන්න",
    "developer.website": "වෙබ් අඩවිය",
    "about.checkUpdates": "යාවත්කාලීන පරීක්ෂා කරන්න",
    "about.privacyHint": "ඔබේ දත්ත කිසිදා මෙම උපාංගයෙන් පිට නොයයි",
    "about.licencesHint": "ශබ්ද, අකුරු සහ පුස්තකාල",
    "about.updateHint": "නවතම සංස්කරණය සැමවිටම ලබා ගන්න",
    version: "Version 2.2.0",
    footerText: "Exam Buddy Pro — ඔබේ දත්ත මෙම උපාංගයේ පුද්ගලිකව පවතී.",
    backToTop: "ඉහළට යන්න",
    "update.title": "යාවත්කාලීනයක් ඇත",
    "update.newVersion": "නව සංස්කරණය {version} ස්ථාපනයට සූදානම්.",
    "update.current": "ඔබ භාවිතා කරන්නේ {version} සංස්කරණයයි",
    "update.changelogTitle": "අලුතෙන් එන දේ",
    "update.now": "දැන් යාවත්කාලීන කරන්න",
    "update.later": "පසුව",
    "update.releasePage": "නිකුතු සටහන් බලන්න",
    "update.checking": "යාවත්කාලීන පරීක්ෂා කරමින්…",
    "update.upToDate": "ඔබ අලුත්ම සංස්කරණයේ සිටී",
    "update.failed": "යාවත්කාලීන පරීක්ෂා කළ නොහැක. පසුව නැවත උත්සාහ කරන්න.",
    "update.availableToast": "නව සංස්කරණය {version} ඇත",
    "greet.morning": "සුභ උදෑසනක්",
    "greet.afternoon": "සුභ සන්ධ්‍යාවක්",
    "greet.evening": "සුභ රාත්‍රියක්",
    couldNotSave: "ඔබේ දත්ත සුරකිමට නොහැකි විය",
    examUpdated: "විභාගය යාවත්කාලීන විය",
    examAdded: "විභාගය එක් විය",
    taskUpdated: "කාර්යය යාවත්කාලීන විය",
    taskAdded: "කාර්යය එක් විය",
    noCompletedToClear: "මකා හැරීමට සම්පූර්ණ කළ කාර්යයන් නැත",
    confirmClear: "සම්පූර්ණ කළ කාර්යයන් {n}ක් ඉවත් කරන්නද?",
    completedCleared: "සම්පූර්ණ කළ කාර්යයන් මකා හැරිණි",
    darkEnabled: "අඳුරු පෙනුම ක්‍රියාත්මකයි",
    lightEnabled: "ආලෝක පෙනුම ක්‍රියාත්මකයි",
    timerReset: "කාලමානය නැවත සකස් විය",
    focusDone: "අවධාන සැසිය සම්පූර්ණයි — විවේකයක් ගන්න!",
    breakDone: "විවේකය අවසන් — නැවත අවධානය යොමු කරන්නද?",
    settingsSaved: "කාලමාන සැකසුම් සුරකිනු ලැබීය",
    "permissions.eyebrow": "ඉක්මන් සැකසුම",
    "permissions.title": "Exam Buddy සකසමු",
    "permissions.subtitle": "මතක් කිරීම්, අවධාන කාලමානය සහ යාවත්කාලීන නිවැරදිව ක්‍රියා කරවීමට මේවාට අවසර දෙන්න.",
    "permissions.note": "පසුව Android සැකසුම්වලින් ඕනෑම එකක් වෙනස් කළ හැක.",
    "permissions.continue": "ඉදිරියට",
    "permissions.allowAll": "නිර්දේශිත ඒවාට අවසර දෙන්න",
    "permissions.allow": "අවසර දෙන්න",
    "permissions.allowed": "අවසර දී ඇත",
    "permissions.denied": "අවසර නැත",
    "permissions.openSettings": "සැකසුම්",
    "permissions.manage": "යෙදුම් අවසර",
    "permissions.banner": "සමහර අවසර අඩුයි — සැකසුම සම්පූර්ණ කිරීමට තට්ටු කරන්න.",
    "permissions.saved": "සැකසුම යාවත්කාලීන විය",
    "permissions.notSupported": "මෙම අවසරය Android යෙදුමේ පමණක් ලබා ගත හැක.",
    "permissions.notifications.title": "දැනුම්දීම්",
    "permissions.notifications.desc": "කාර්ය මතක් කිරීම් සහ කාලමාන ඇඟවීම්.",
    "permissions.alarm.title": "නිශ්චිත ඇලාම්",
    "permissions.alarm.desc": "අධ්‍යයන සැසි නියමිත වේලාවට ආරම්භ කර අවසන් කරන්න.",
    "permissions.battery.title": "බැටරි අවසර",
    "permissions.battery.desc": "තිරය නිවී ඇති විටත් කාලමානය දිගටම ධාවනය වේ.",
    "permissions.files.title": "ගොනු ප්‍රවේශය",
    "permissions.files.desc": "ඔබේ අධ්‍යයන දත්ත සහ අනාගත උපස්ථ මෙම උපාංගයේ සුරකින්න.",
    "permissions.install.title": "යෙදුම් යාවත්කාලීන",
    "permissions.install.desc": "යෙදුමෙන් පිටතට නොයා නව සංස්කරණ බාගෙන ස්ථාපනය කරන්න.",
    "permissions.installHint": "Exam Buddy වෙතින් ස්ථාපනයට අවසර දෙන ලෙස Android ඔබෙන් අසයි.",
    "permissions.recommended": "නිර්දේශිත",
    "permissions.optional": "අමතර",
    "permissions.notNow": "දැන් නොවේ",
    "permissions.granted": "සියලු අවසර සූදානම්.",
    "permissions.needed": "සියල්ල නිවැරදිව ක්‍රියා කරවීමට අඩු අවසර ලබා දෙන්න.",
    "detail.subtitle": "අයිතම {n}",
    "detail.empty": "තවම කිසිවක් නැත.",
    "detail.openTasks": "කාර්යයන් විවෘත කරන්න",
    "detail.openExams": "විභාග විවෘත කරන්න",
    "detail.edit": "සංස්කරණය",
    "detail.editBreaks": "විරාම සංස්කරණය",
    "detail.done": "සම්පූර්ණ කරන්න",
    "detail.undo": "නැවත විවෘත කරන්න",
    "detail.delete": "මකන්න",
    "detail.close": "වසන්න",
    "detail.nextExam": "ඊළඟ විභාගය",
    "detail.pending": "විවෘත කාර්යයන්",
    "detail.upcoming": "ඉදිරි විභාග",
    "detail.completedExams": "සම්පූර්ණ කළ විභාග",
    "detail.doneTasks": "සම්පූර්ණ කළ කාර්යයන්",
    "detail.daysNext": "ඊළඟ විභාගයට දින",
    "detail.focusToday": "අද අවධානය",
    "detail.streak": "අධ්‍යයන අඛණ්ඩතාව",
    "detail.bestStreak": "හොඳම අඛණ්ඩතාව",
    "detail.taskTitle": "කාර්ය විස්තර",
    "detail.examTitle": "විභාග විස්තර",
    "detail.noExam": "විභාගයක් සම්බන්ධ නැත",
    "detail.schedule": "කාලසටහන",
    "detail.noSchedule": "කාලසටහනක් නැත",
    "detail.breaks": "විරාම",
    "detail.reminders": "මතක් කිරීම්",
    "detail.on": "ක්‍රියාත්මකයි",
    "detail.off": "නිවා ඇත",
    "smart.quickAdd": "ඉක්මන් එකතු කිරීම",
    "smart.tea": "තේ මිනිත්තු 10",
    "smart.food": "කෑම මිනිත්තු 30",
    "smart.rest": "විවේක මිනිත්තු 15",
    "smart.breakAdded": "{label} විරාමය {time} ට එක් විය",
    "smart.autoTechnique": "ඔබේ විරාම සැලැස්මට ගැලපෙන {technique} තෝරා ගන්නා ලදී.",
    "smart.autoApplied": "අධ්‍යයන ක්‍රමය {technique} ලෙස ස්වයංක්‍රීයව සකස් විය.",
    "smart.noGap": "එම විරාමයට නිදහස් කාලයක් නැත. අධ්‍යයන කාලය සකසන්න.",
    "smart.needWindow": "පළමුව ආරම්භක සහ අවසන් වේලාව ඇතුළත් කරන්න.",
    "update.downloading": "යාවත්කාලීනය බාගනිමින්…",
    "update.downloadProgress": "බාගනිමින් {p}%",
    "update.installing": "ස්ථාපකය විවෘත කරමින්…",
    "update.permission": "Exam Buddy වෙතින් ස්ථාපනයට අවසර දී නැවත යෙදුමට එන්න.",
    "update.playProtect": "Play Protect අසන්නේ නම් “Install anyway” තෝරන්න. යාවත්කාලීනය ඔබේ යෙදුමේම යතුරෙන් අත්සන් කර ඇත.",
    "update.downloadOnly": "බාගන්න පමණයි",
    "update.failedInstall": "යාවත්කාලීනය බාගැනීම අසාර්ථකයි. නැවත උත්සාහ කරන්න.",
    "update.badUrl": "මෙම යාවත්කාලීන සබැඳිය විශ්වාසදායක නොවේ.",
    "update.ready": "යාවත්කාලීනය බාගත විය. Android ස්ථාපකයේ ස්ථාපනය සම්පූර්ණ කරන්න.",
    "tab.cards": "කාඩ්පත්",
    "stat.cardsDue": "ඉගෙන ගත යුතු කාඩ්පත්",
    "quick.reviewCards": "කාඩ්පත් අධ්‍යයනය",
    "quick.reviewCardsHint": "සක්‍රීය මතකය පුරුදු කරන්න",
    "detail.cardsDue": "ඉගෙන ගත යුතු කාඩ්පත්",
    "detail.openCards": "කාඩ්පත් විවෘත කරන්න",
    "cards.eyebrow": "සක්‍රීය මතකය",
    "cards.title": "ෆ්ලෑෂ් කාඩ්පත්",
    "cards.reviewDue": "නියමිත ඒවා අධ්‍යයනය",
    "cards.total": "මුළු කාඩ්පත්",
    "cards.due": "දැන් ඉගෙන ගන්න",
    "cards.mastered": "හොඳින් දත්",
    "cards.addCard": "කාඩ්පතක් එක් කරන්න",
    "cards.editCard": "කාඩ්පත සංස්කරණය",
    "cards.front": "ප්‍රශ්නය",
    "cards.frontPlaceholder": "උදා: සෛලයේ බලාගාරය කුමක්ද?",
    "cards.back": "පිළිතුර",
    "cards.backPlaceholder": "උදා: මයිටොකොන්ඩ්‍රියා",
    "cards.deck": "තට්ටුව",
    "cards.deckPlaceholder": "උදා: ජීව විද්‍යාව",
    "cards.linkedExam": "විභාගය (අත්‍යවශ්‍ය නොවේ)",
    "cards.yourCards": "ඔබේ කාඩ්පත්",
    "cards.defaultDeck": "සාමාන්‍ය",
    "cards.searchPlaceholder": "කාඩ්පත් හෝ තට්ටු සොයන්න...",
    "cards.searchLabel": "කාඩ්පත් සොයන්න",
    "cards.filterDeck": "තට්ටුව අනුව පෙරන්න",
    "cards.filterStatus": "තත්ත්වය අනුව පෙරන්න",
    "cards.filterAll": "සියලු කාඩ්පත්",
    "cards.filterDue": "නියමිත",
    "cards.filterMastered": "හොඳින් දත්",
    "cards.allDecks": "සියලු තට්ටු",
    "cards.empty": "තවම ෆ්ලෑෂ් කාඩ්පත් නැත. ඉහතින් ඔබේ පළමු කාඩ්පත එක් කරන්න.",
    "cards.noMatch": "ඔබේ පෙරහන්වලට ගැලපෙන කාඩ්පත් නැත.",
    "cards.count": "කාඩ්පත් {n}",
    "cards.study": "අධ්‍යයනය",
    "cards.dueNowLabel": "දැන් නියමිතයි",
    "cards.dueIn": "දින {n} කින්",
    "cards.dueInMinutes": "මිනිත්තු {n} කින්",
    "cards.added": "ෆ්ලෑෂ් කාඩ්පත එක් විය",
    "cards.updated": "ෆ්ලෑෂ් කාඩ්පත යාවත්කාලීන විය",
    "cards.deleted": "ෆ්ලෑෂ් කාඩ්පත මකා දැමිණි",
    "cards.needBoth": "ප්‍රශ්නය සහ පිළිතුර යන දෙකම එක් කරන්න.",
    "cards.noDue": "දැන් නියමිත කාඩ්පත් නැත. නව කාඩ්පත් එක් කරන්න හෝ ලැයිස්තුවෙන් එක් කාඩ්පතක් අධ්‍යයනය කරන්න.",
    "cards.deleteConfirm": "මෙම ෆ්ලෑෂ් කාඩ්පත මකා දමන්නද?",
    "cards.masteredBadge": "හොඳින් දත්",
    "cards.dueBadge": "නියමිත",
    "cards.reviewed": "සමාලෝචන {n}",
    "cards.study.title": "අධ්‍යයන සැසිය",
    "cards.study.question": "ප්‍රශ්නය",
    "cards.study.answer": "පිළිතුර",
    "cards.study.tap": "පිළිතුර බැලීමට ස්පර්ශ කරන්න",
    "cards.study.showAnswer": "පිළිතුර පෙන්වන්න",
    "cards.study.again": "නැවත",
    "cards.study.good": "හොඳයි",
    "cards.study.easy": "පහසුයි",
    "cards.study.progress": "{current} / {total}",
    "cards.study.remaining": "මෙම සැසියේ {n} ක් ඉතිරියි",
    "cards.study.doneTitle": "සැසිය සම්පූර්ණයි",
    "cards.study.doneBody": "ඔබ කාඩ්පත් {n} ක් අධ්‍යයනය කළා.",
    "cards.study.done": "අවසන්",
    "cards.study.caughtUpTitle": "සියල්ල සම්පූර්ණයි",
    "cards.study.empty": "දැන් නියමිත කාඩ්පත් නැත. නව කාඩ්පත් එක් කරන්න හෝ පසුව නැවත එන්න.",
    "cards.study.startHint": "අපහසු යැයි සිතන කාඩ්පත් එම සැසිය තුළම නැවත පැමිණේ.",
    monthsShort: ["ජන", "පෙබ", "මාර්", "අප්‍රි", "මැයි", "ජූනි", "ජූලි", "අගෝ", "සැප්", "ඔක්", "නොවැ", "දෙසැ"],
    monthsLong: ["ජනවාරි", "පෙබරවාරි", "මාර්තු", "අප්‍රේල්", "මැයි", "ජූනි", "ජූලි", "අගෝස්තු", "සැප්තැම්බර්", "ඔක්තෝබර්", "නොවැම්බර්", "දෙසැම්බර්"],
    weekdaysLong: ["ඉරිදා", "සඳුදා", "අඟහරුවාදා", "බදාදා", "බ්‍රහස්පතින්දා", "සිකුරාදා", "සෙනසුරාදා"],
    weekdaysShort: ["ඉරි", "සඳු", "අඟහ", "බදා", "බ්‍රහ", "සිකු", "සෙන"]
  }
};

let currentLanguage = "en";

function resolveKey(table, key) {
  if (Object.prototype.hasOwnProperty.call(table, key)) return table[key];
  const parts = key.split(".");
  let value = table;
  for (let i = 0; i < parts.length; i += 1) {
    if (!value || typeof value !== "object") return undefined;
    value = value[parts[i]];
  }
  return typeof value === "string" ? value : undefined;
}

function t(key, vars) {
  const table = I18N[getLanguage()] || I18N.en;
  let value = resolveKey(table, key);
  if (value === undefined) value = resolveKey(I18N.en, key);
  if (value === undefined) value = key;
  if (vars) {
    Object.keys(vars).forEach((name) => {
      value = String(value).split("{" + name + "}").join(String(vars[name]));
    });
  }
  return value;
}

function getLanguage() {
  return currentLanguage === "si" ? "si" : "en";
}

function nativeLang() {
  const bridge = nativeFile();
  return bridge && typeof bridge.getLanguage === "function" ? bridge : null;
}

function detectLanguage(fallback) {
  let stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEYS.language);
  } catch {
  }
  if (stored === "si" || stored === "en") return stored;
  const bridge = nativeLang();
  if (bridge) {
    try {
      const value = bridge.getLanguage();
      if (value === "si" || value === "en") return value;
    } catch {
    }
  }
  return fallback === "si" ? "si" : "en";
}

function saveLanguageNative(lang) {
  const bridge = nativeLang();
  if (!bridge) return;
  try {
    bridge.setLanguage(lang);
  } catch {
  }
}

function categoryLabel(value) {
  const key = "category." + String(value || "General");
  const table = I18N[getLanguage()] || I18N.en;
  if (table[key] !== undefined) return t(key);
  return value || t("category.general");
}

function localeArray(name) {
  const table = I18N[getLanguage()] || I18N.en;
  return Array.isArray(table[name]) ? table[name] : I18N.en[name];
}

function formatGreetingDate() {
  const now = new Date();
  if (getLanguage() === "si") {
    return localeArray("weekdaysLong")[now.getDay()] + " " + now.getDate() + " " + localeArray("monthsLong")[now.getMonth()];
  }
  return now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
}

function weekdayShort(date) {
  if (getLanguage() === "si") return localeArray("weekdaysShort")[date.getDay()];
  return date.toLocaleDateString(undefined, { weekday: "short" });
}

function applyLanguage() {
  const lang = getLanguage();
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = t(el.getAttribute("data-i18n"));
    if (el.textContent !== value) el.textContent = value;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    el.setAttribute("title", t(el.getAttribute("data-i18n-title")));
  });
  document.querySelectorAll("[data-lang-opt]").forEach((el) => {
    el.classList.toggle("active", el.getAttribute("data-lang-opt") === lang);
  });
  const activeName = lang === "si" ? t("lang.sinhala") : t("lang.english");
  const headerButton = document.getElementById("language-toggle");
  if (headerButton) {
    const label = t("switchLanguage") + " — " + activeName;
    headerButton.setAttribute("aria-label", label);
    headerButton.setAttribute("title", label);
  }
  document.title = t("appTitle");
  syncPrettySelects();
  if (document.getElementById("break-list")) {
    renderBreakList();
    updateSchedulePreview();
  }
  if (studyState && studyState.open) renderStudy();
}

function setLanguage(lang) {
  const next = lang === "si" ? "si" : "en";
  currentLanguage = next;
  try {
    localStorage.setItem(STORAGE_KEYS.language, next);
  } catch {
  }
  saveLanguageNative(next);
  applyLanguage();
  applyTheme(getThemeMode());
  renderAll();
  renderTimer();
  if (studyState.open) renderStudy();
  persistSnapshot();
  syncAllTaskReminders();
  showToast(t("languageChanged", { lang: next === "si" ? t("lang.sinhala") : t("lang.english") }), "success");
}

function toggleLanguage() {
  setLanguage(getLanguage() === "en" ? "si" : "en");
}

function setupLanguage() {
  applyLanguage();
  const headerButton = document.getElementById("language-toggle");
  if (headerButton) headerButton.addEventListener("click", toggleLanguage);
  document.querySelectorAll(".about-lang-btn[data-lang-opt]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = button.getAttribute("data-lang-opt") === "si" ? "si" : "en";
      if (next !== getLanguage()) setLanguage(next);
    });
  });
}

function nativeFile() {
  try {
    if (window.ExamBuddyFileBridge && window.ExamBuddyFileBridge.isAvailable()) {
      return window.ExamBuddyFileBridge;
    }
  } catch {
  }
  return null;
}

function nativeTimer() {
  try {
    if (window.ExamBuddyNative && window.ExamBuddyNative.isAvailable()) {
      return window.ExamBuddyNative;
    }
  } catch {
  }
  return null;
}

function nativeAlarm() {
  try {
    const bridge = window.ExamBuddyAlarm;
    if (bridge && typeof bridge.isAvailable === "function" && bridge.isAvailable()) return bridge;
  } catch {
  }
  return null;
}

function alarmToneValue() {
  const tone = Number(pomodoro.settings.alarmTone);
  return Number.isFinite(tone) && tone >= 0 && tone < ALARM_TONE_NAMES.length
    ? Math.round(tone) : 0;
}

function syncAlarmSettingsToNative() {
  const bridge = nativeAlarm();
  if (!bridge) return;
  try {
    bridge.configure(JSON.stringify({
      tone: alarmToneValue(),
      vibrate: Boolean(pomodoro.settings.alarmVibrate),
      bluetooth: Boolean(pomodoro.settings.alarmBluetooth),
      snooze: Number(pomodoro.settings.alarmSnooze) || 5,
      volumeRamp: true
    }));
  } catch {
  }
}

function nativePermissions() {
  try {
    const bridge = window.ExamBuddyPermissions;
    if (bridge && typeof bridge.isAvailable === "function" && bridge.isAvailable()) return bridge;
  } catch {
  }
  return null;
}

function nativeUpdate() {
  try {
    const bridge = window.ExamBuddyUpdate;
    if (bridge && typeof bridge.isAvailable === "function" && bridge.isAvailable()) return bridge;
  } catch {
  }
  return null;
}

function readPermissionStatus() {
  const bridge = nativePermissions();
  const fallback = {
    notifications: typeof Notification === "undefined" || Notification.permission === "granted",
    alarm: false,
    battery: false,
    files: true,
    install: false
  };
  if (!bridge) return { ...fallback, native: false };
  try {
    const raw = bridge.getStatus();
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      notifications: Boolean(parsed.notifications),
      alarm: Boolean(parsed.alarm),
      battery: Boolean(parsed.battery),
      files: Boolean(parsed.files),
      install: Boolean(parsed.install),
      native: true
    };
  } catch {
    return { ...fallback, native: true };
  }
}

function permissionReady(status) {
  return PERMISSION_KEYS.every((key) => status[key]);
}

function requestNativePermission(key) {
  const bridge = nativePermissions();
  if (!bridge) {
    showToast(t("permissions.notSupported"));
    return false;
  }
  const method = {
    notifications: "requestNotifications",
    alarm: "requestExactAlarm",
    battery: "requestBattery",
    files: "requestFiles",
    install: "requestInstall"
  }[key];
  if (!method || typeof bridge[method] !== "function") return false;
  try {
    bridge[method]();
    return true;
  } catch {
    return false;
  }
}

function openAppPermissions() {
  const bridge = nativePermissions();
  if (bridge && typeof bridge.openSettings === "function") {
    try { bridge.openSettings(); return; } catch {}
  }
  showToast(t("permissions.notSupported"));
}

function permissionRows(status) {
  const icon = {
    notifications: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.7 21a2 2 0 0 1-3.4 0"></path></svg>',
    alarm: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"></circle><path d="M12 9v4l2.5 1.5M5 3 2 6M19 3l3 3"></path></svg>',
    battery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="18" height="10" rx="2"></rect><path d="M22 11v2M6 10v4M10 10v4"></path></svg>',
    files: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path></svg>',
    install: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5"></path><path d="M4 21h16"></path></svg>'
  };
  const recommended = { notifications: true, alarm: true, battery: true, files: false, install: true };
  return PERMISSION_KEYS.map((key) => {
    const granted = Boolean(status[key]);
    const badge = !status.native
      ? t("permissions.optional")
      : granted
        ? t("permissions.allowed")
        : recommended[key] ? t("permissions.recommended") : t("permissions.optional");
    const action = !status.native
      ? `<span class="permission-state muted">${escapeHtml(t("permissions.notSupported"))}</span>`
      : granted
        ? `<span class="permission-state granted">${escapeHtml(t("permissions.allowed"))}</span>`
        : `<button type="button" class="permission-state action" data-permission-request="${key}">${escapeHtml(t("permissions.allow"))}</button>`;
    return `
      <div class="permission-row ${granted ? "granted" : ""}" data-permission-row="${key}">
        <span class="permission-icon" aria-hidden="true">${icon[key]}</span>
        <div class="permission-copy">
          <strong>${escapeHtml(t("permissions." + key + ".title"))}</strong>
          <p>${escapeHtml(t("permissions." + key + ".desc"))}</p>
          <span class="permission-badge">${escapeHtml(badge)}</span>
        </div>
        ${action}
      </div>`;
  }).join("");
}

function renderPermissionOverlay() {
  const list = document.getElementById("permission-list");
  if (!list) return;
  const status = readPermissionStatus();
  list.innerHTML = permissionRows(status);
  const subtitle = document.getElementById("permission-subtitle");
  if (subtitle) {
    subtitle.textContent = permissionReady(status) ? t("permissions.granted") : t("permissions.subtitle");
  }
}

function refreshPermissionUi() {
  const status = readPermissionStatus();
  const banner = document.getElementById("permission-banner");
  if (banner) banner.classList.toggle("hidden", permissionReady(status));
  const overlay = document.getElementById("permission-overlay");
  if (overlay && !overlay.classList.contains("hidden")) renderPermissionOverlay();
}

function openPermissionOverlay() {
  const overlay = document.getElementById("permission-overlay");
  if (!overlay) return;
  const wasHidden = overlay.classList.contains("hidden");
  renderPermissionOverlay();
  overlay.classList.remove("hidden");
  if (wasHidden) lockBodyScroll();
}

function closePermissionOverlay(snooze) {
  stopPermissionQueue();
  const overlay = document.getElementById("permission-overlay");
  const wasOpen = overlay && !overlay.classList.contains("hidden");
  if (overlay) overlay.classList.add("hidden");
  if (wasOpen) unlockBodyScroll();
  if (snooze) {
    try { localStorage.setItem(PERMISSION_SNOOZE_KEY, String(Date.now())); } catch {}
  }
}

function maybeShowPermissionOnboarding() {
  if (!nativePermissions()) return;
  const status = readPermissionStatus();
  if (permissionReady(status)) return;
  const updateModal = document.getElementById("update-modal");
  if (updateModal && !updateModal.classList.contains("hidden")) {
    pendingStartupPermissions = true;
    return;
  }
  let snoozedAt = 0;
  try { snoozedAt = Number(localStorage.getItem(PERMISSION_SNOOZE_KEY) || 0) || 0; } catch {}
  if (snoozedAt && Date.now() - snoozedAt < 7 * 24 * 60 * 60 * 1000) return;
  openPermissionOverlay();
}

const PERMISSION_ORDER = ["notifications", "alarm", "battery", "install", "files"];
let permissionQueue = [];
let permissionQueueBusy = false;
let permissionQueueTimer = null;

function clearPermissionQueueTimer() {
  if (permissionQueueTimer) {
    clearTimeout(permissionQueueTimer);
    permissionQueueTimer = null;
  }
}

function stopPermissionQueue() {
  clearPermissionQueueTimer();
  permissionQueue = [];
  permissionQueueBusy = false;
}

function runPermissionQueue() {
  clearPermissionQueueTimer();
  if (!permissionQueue.length) {
    permissionQueueBusy = false;
    refreshPermissionUi();
    return;
  }
  if (!nativePermissions()) {
    stopPermissionQueue();
    return;
  }
  const key = permissionQueue[0];
  const status = readPermissionStatus();
  if (status[key]) {
    permissionQueue.shift();
    runPermissionQueue();
    return;
  }
  permissionQueueBusy = true;
  if (!requestNativePermission(key)) {
    permissionQueue.shift();
    permissionQueueBusy = false;
    runPermissionQueue();
    return;
  }
  permissionQueueTimer = setTimeout(() => {
    permissionQueueTimer = null;
    permissionQueue.shift();
    permissionQueueBusy = false;
    refreshPermissionUi();
    runPermissionQueue();
  }, 12000);
}

function advancePermissionQueue() {
  if (!permissionQueueBusy) return;
  clearPermissionQueueTimer();
  permissionQueueBusy = false;
  if (permissionQueue.length) permissionQueue.shift();
  setTimeout(runPermissionQueue, 500);
}

function requestPermissionKey(key) {
  stopPermissionQueue();
  if (!requestNativePermission(key)) return;
  showToast(t("permissions." + key + ".desc"), "info");
  setTimeout(refreshPermissionUi, 700);
  setTimeout(refreshPermissionUi, 1800);
}

function requestAllPermissions() {
  if (!nativePermissions()) {
    showToast(t("permissions.notSupported"));
    return;
  }
  const status = readPermissionStatus();
  permissionQueue = PERMISSION_ORDER.filter((key) => PERMISSION_KEYS.includes(key) && !status[key]);
  if (!permissionQueue.length) {
    refreshPermissionUi();
    showToast(t("permissions.granted"), "success");
    return;
  }
  permissionQueueBusy = false;
  runPermissionQueue();
}

function setupPermissions() {
  const continueButton = document.getElementById("permission-continue");
  if (continueButton) continueButton.addEventListener("click", () => closePermissionOverlay(true));
  const allowAll = document.getElementById("permission-allow-all");
  if (allowAll) allowAll.addEventListener("click", requestAllPermissions);
  const list = document.getElementById("permission-list");
  if (list) {
    list.addEventListener("click", (event) => {
      const button = event.target.closest("[data-permission-request]");
      if (!button) return;
      requestPermissionKey(button.getAttribute("data-permission-request"));
    });
  }
  const banner = document.getElementById("permission-banner");
  if (banner) banner.addEventListener("click", openPermissionOverlay);
  const settingsButton = document.getElementById("permissions-btn");
  if (settingsButton) settingsButton.addEventListener("click", openPermissionOverlay);
  refreshPermissionUi();
}

window.ExamBuddyPermissionsChanged = function () {
  refreshPermissionUi();
  advancePermissionQueue();
};

function startNativeTimer() {
  const bridge = nativeTimer();
  if (!bridge || !timer.running || !timer.endsAt) return;
  const activeMode = MODES[timer.activeMode] ? timer.activeMode : timer.mode;
  try {
    const modeLabel = t(MODES[activeMode].label);
    const completeTitle = activeMode === "focus" ? t("focusDone") : t("breakDone");
    bridge.startTimer(
      activeMode,
      timer.endsAt,
      modeLabel,
      completeTitle,
      t("appTitle"),
      getLanguage(),
      pomodoro.settings.sound
    );
  } catch {
  }
}

function stopNativeTimer() {
  const bridge = nativeTimer();
  if (!bridge) return;
  try {
    bridge.stopTimer();
  } catch {
  }
}

function readCache() {
  const data = {};
  Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
    let raw = null;
    try {
      raw = localStorage.getItem(key);
    } catch {
    }
    if (name === "theme" || name === "language") {
      data[name] = name === "theme" ? (raw || "auto") : (raw === "si" ? "si" : "en");
      return;
    }
    try {
      data[name] = raw ? JSON.parse(raw) : [];
    } catch {
      data[name] = [];
    }
  });
  return data;
}

function writeCache(snapshot) {
  const defaultPomodoro = { settings: { ...DEFAULT_SETTINGS }, sessions: [], focusCount: 0 };
  const defaultTimer = { mode: "focus", remaining: DEFAULT_SETTINGS.focus * 60, running: false, endsAt: null };
  const values = {
    [STORAGE_KEYS.exams]: snapshot.exams || [],
    [STORAGE_KEYS.tasks]: snapshot.tasks || [],
    [STORAGE_KEYS.flashcards]: snapshot.flashcards || [],
    [STORAGE_KEYS.pomodoro]: snapshot.pomodoro || defaultPomodoro,
    [STORAGE_KEYS.timer]: snapshot.timer || defaultTimer,
    [STORAGE_KEYS.theme]: snapshot.theme || "auto",
    [STORAGE_KEYS.language]: snapshot.language || "en"
  };
  Object.entries(values).forEach(([key, value]) => {
    try {
      localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
    } catch {
    }
  });
}

function readFileSnapshot() {
  const bridge = nativeFile();
  if (!bridge) return null;
  try {
    const raw = bridge.loadJson();
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || !Array.isArray(data.exams) || !Array.isArray(data.tasks)) return null;
    return data;
  } catch {
    return null;
  }
}

function snapshotTime(snapshot) {
  const savedAt = snapshot && typeof snapshot.savedAt === "string" ? Date.parse(snapshot.savedAt) : NaN;
  return Number.isFinite(savedAt) ? savedAt : 0;
}

function initialSnapshot() {
  const fromFile = readFileSnapshot();
  const fromCache = readCache();
  if (fromFile && fromCache) {
    const chosen = snapshotTime(fromCache) > snapshotTime(fromFile) ? fromCache : fromFile;
    if (chosen === fromFile) writeCache(fromFile);
    return chosen;
  }
  if (fromFile) {
    writeCache(fromFile);
    return fromFile;
  }
  return fromCache;
}

const startup = initialSnapshot();

currentLanguage = detectLanguage(startup.language);

let exams = Array.isArray(startup.exams) ? startup.exams : [];
let tasks = Array.isArray(startup.tasks) ? startup.tasks.map(normalizeTask) : [];
let flashcards = Array.isArray(startup.flashcards) ? startup.flashcards.map(normalizeFlashcard) : [];
let pomodoro = normalizePomodoro(startup.pomodoro);
let timer = normalizeTimer(startup.timer);

let timerInterval = null;
let editingExamId = null;
let editingTaskId = null;
let editingCardId = null;
let studyState = { queue: [], total: 0, reviewed: 0, again: 0, good: 0, easy: 0, flipped: false, open: false };
let pendingUpdate = null;
let pendingStartupPermissions = false;
let startupUpdateChecked = false;
let breakDraft = [];
let autoTechnique = true;
let firedReminders = new Set();
let reminderInterval = null;

let taskSearchRenderTimer = null;
let cardSearchRenderTimer = null;

const ui = {
  examSearch: "",
  examFilter: "all",
  taskSearch: "",
  taskFilter: "all",
  cardSearch: "",
  cardDeck: "all",
  cardFilter: "all"
};

function loadData(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function buildSnapshot() {
  return {
    app: "Exam Buddy Lite",
    version: SNAPSHOT_VERSION,
    savedAt: new Date().toISOString(),
    exams: exams,
    tasks: tasks,
    flashcards: flashcards,
    pomodoro: pomodoro,
    timer: timer,
    theme: getThemeMode(),
    language: getLanguage()
  };
}

function writeFile(snapshot) {
  const bridge = nativeFile();
  if (!bridge) return false;
  try {
    return !!bridge.saveJson(JSON.stringify(snapshot));
  } catch {
    return false;
  }
}

let snapshotDirty = false;

function persistSnapshot(force = true) {
  if (!force && !snapshotDirty) return true;
  const snapshot = buildSnapshot();
  snapshotDirty = false;
  writeCache(snapshot);
  return writeFile(snapshot);
}

function saveData() {
  snapshotDirty = true;
  persistSnapshot();
}

function saveTimer() {
  snapshotDirty = true;
  persistSnapshot();
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function daysUntil(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + "T00:00:00");
  const diffMs = target - today;
  return Math.round(diffMs / DAY_MS);
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  if (Number.isNaN(d.getTime())) return dateStr;
  if (getLanguage() === "si") {
    return d.getDate() + " " + localeArray("monthsShort")[d.getMonth()] + " " + d.getFullYear();
  }
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  const next = String(value);
  if (el.textContent === next) return;
  el.textContent = next;
  if (el.classList.contains("stat-value")) {
    el.classList.remove("value-pop");
    void el.offsetWidth;
    el.classList.add("value-pop");
  }
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function dateKey(value) {
  const d = new Date(value);
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
}

function todayKey() {
  return dateKey(new Date());
}

function formatClock(totalSeconds) {
  const s = Math.max(0, Math.ceil(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return h ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}

function minutesLabel(minutes) {
  if (minutes < 60) return minutes + t("minuteShort");
  const h = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${h}${t("hourShort")} ${rest}${t("minuteShort")}` : `${h}${t("hourShort")}`;
}

function parseTimeToMinutes(value) {
  if (!value || typeof value !== "string") return NaN;
  const parts = value.split(":");
  if (parts.length < 2) return NaN;
  const hours = Number(parts[0]);
  const minutes = Number(parts[1]);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return NaN;
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return NaN;
  return hours * 60 + minutes;
}

function minutesToClock(totalMinutes) {
  const value = ((Math.round(totalMinutes) % 1440) + 1440) % 1440;
  return pad(Math.floor(value / 60)) + ":" + pad(value % 60);
}

function normalizeClock(value) {
  const minutes = parseTimeToMinutes(value);
  return Number.isFinite(minutes) ? minutesToClock(minutes) : "";
}

function normalizeDateValue(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : "";
}

function normalizeBreakList(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      id: typeof item.id === "string" && item.id ? item.id : uid(),
      label: typeof item.label === "string" ? item.label.slice(0, 60) : "",
      start: normalizeClock(item.start),
      end: normalizeClock(item.end)
    }))
    .filter((item) => item.label || item.start || item.end);
}

function normalizeTask(raw) {
  const task = raw && typeof raw === "object" ? raw : {};
  return {
    ...task,
    id: typeof task.id === "string" && task.id ? task.id : uid(),
    text: typeof task.text === "string" ? task.text : "",
    priority: ["low", "medium", "high"].includes(task.priority) ? task.priority : "medium",
    due: normalizeDateValue(task.due),
    completed: Boolean(task.completed),
    createdAt: Number(task.createdAt) || Date.now(),
    completedAt: Number(task.completedAt) || null,
    examId: typeof task.examId === "string" ? task.examId : "",
    startDate: normalizeDateValue(task.startDate),
    startTime: normalizeClock(task.startTime),
    endTime: normalizeClock(task.endTime),
    technique: TECHNIQUES[task.technique] ? task.technique : "pomodoro",
    method: STUDY_METHODS.includes(task.method) ? task.method : "none",
    breaks: normalizeBreakList(task.breaks),
    alarm: Boolean(task.alarm),
    notify: Boolean(task.notify)
  };
}

function normalizeFlashcard(raw) {
  const card = raw && typeof raw === "object" ? raw : {};
  const box = Number(card.box);
  return {
    ...card,
    id: typeof card.id === "string" && card.id ? card.id : uid(),
    front: typeof card.front === "string" ? card.front.slice(0, 500) : "",
    back: typeof card.back === "string" ? card.back.slice(0, 1000) : "",
    deck: typeof card.deck === "string" && card.deck.trim() ? card.deck.trim().slice(0, 40) : "",
    examId: typeof card.examId === "string" ? card.examId : "",
    createdAt: Number(card.createdAt) || Date.now(),
    updatedAt: Number(card.updatedAt) || Number(card.createdAt) || Date.now(),
    dueAt: Number(card.dueAt) || 0,
    box: Number.isFinite(box) ? Math.min(CARD_MAX_BOX, Math.max(0, Math.round(box))) : 0,
    reviews: Math.max(0, Number(card.reviews) || 0),
    lapses: Math.max(0, Number(card.lapses) || 0),
    lastReviewedAt: Number(card.lastReviewedAt) || 0
  };
}

function cardDeckName(card) {
  return (card && card.deck) || t("cards.defaultDeck");
}

function cardIsMastered(card) {
  return (Number(card.box) || 0) >= CARD_MASTERED_BOX;
}

function cardIsDue(card) {
  return !card.dueAt || card.dueAt <= Date.now();
}

function cardDueLabel(card) {
  if (cardIsDue(card)) return t("cards.dueNowLabel");
  const diff = card.dueAt - Date.now();
  if (diff < DAY_MS) return t("cards.dueInMinutes", { n: Math.max(1, Math.ceil(diff / 60000)) });
  return t("cards.dueIn", { n: Math.ceil(diff / DAY_MS) });
}

function cardExam(card) {
  return exams.find((exam) => exam.id === card.examId) || null;
}

function techniqueLabel(key) {
  return t("technique." + (TECHNIQUES[key] ? key : "pomodoro"));
}

function sortBreaks(raw) {
  return normalizeBreakList(raw)
    .map((item) => ({
      ...item,
      startMin: parseTimeToMinutes(item.start),
      endMin: parseTimeToMinutes(item.end)
    }))
    .filter((item) => Number.isFinite(item.startMin) && Number.isFinite(item.endMin) && item.endMin > item.startMin)
    .sort((a, b) => a.startMin - b.startMin);
}

function buildScheduleSegments(source) {
  const startMin = parseTimeToMinutes(source && source.startTime);
  const endMin = parseTimeToMinutes(source && source.endTime);
  if (!Number.isFinite(startMin) || !Number.isFinite(endMin) || endMin <= startMin) return [];
  const segments = [];
  let cursor = startMin;
  sortBreaks(source.breaks)
    .filter((item) => item.startMin >= startMin && item.endMin <= endMin)
    .forEach((item) => {
      if (item.startMin > cursor) {
        segments.push({ type: "focus", start: cursor, end: item.startMin });
      }
      segments.push({
        type: "break",
        start: item.startMin,
        end: item.endMin,
        label: item.label || t("breakBlock")
      });
      cursor = Math.max(cursor, item.endMin);
    });
  if (cursor < endMin) segments.push({ type: "focus", start: cursor, end: endMin });
  return segments;
}

function scheduleChipsHtml(segments, limit) {
  const max = Number.isFinite(limit) ? limit : 12;
  if (!segments.length) return "";
  return `<div class="schedule-chips">` + segments.slice(0, max).map((segment) => {
    const label = segment.type === "focus" ? t("focusBlock") : (segment.label || t("breakBlock"));
    return `<span class="schedule-chip ${segment.type}"><strong>${minutesToClock(segment.start)}–${minutesToClock(segment.end)}</strong> ${escapeHtml(label)}</span>`;
  }).join("") + `</div>`;
}

function taskScheduleChips(task, limit) {
  return scheduleChipsHtml(buildScheduleSegments(task), limit);
}

function makeBreakDraft(label, start, end) {
  return { id: uid(), label: label || "", start: start || "", end: end || "" };
}

function renderBreakList() {
  const list = document.getElementById("break-list");
  const empty = document.getElementById("break-empty");
  if (!list) return;
  list.innerHTML = "";
  breakDraft.forEach((item) => {
    const row = document.createElement("div");
    row.className = "break-row";
    row.dataset.breakId = item.id;
    row.innerHTML = `
      <input type="text" class="break-label" maxlength="60" value="${escapeHtml(item.label)}" placeholder="${escapeHtml(t("breakLabelPlaceholder"))}" aria-label="${escapeHtml(t("breakName"))}">
      <input type="time" class="break-start" value="${escapeHtml(item.start)}" aria-label="${escapeHtml(t("startTime"))}">
      <span class="break-dash" aria-hidden="true">–</span>
      <input type="time" class="break-end" value="${escapeHtml(item.end)}" aria-label="${escapeHtml(t("endTime"))}">
      <button type="button" class="danger-btn break-remove" data-break-remove="${item.id}" aria-label="${escapeHtml(t("delete"))}">×</button>
    `;
    list.appendChild(row);
  });
  if (empty) empty.classList.toggle("hidden", breakDraft.length > 0);
}

function syncBreakDraftFromDom() {
  document.querySelectorAll("#break-list .break-row").forEach((row) => {
    const item = breakDraft.find((entry) => entry.id === row.dataset.breakId);
    if (!item) return;
    const label = row.querySelector(".break-label");
    const start = row.querySelector(".break-start");
    const end = row.querySelector(".break-end");
    if (label) item.label = label.value.trim();
    if (start) item.start = start.value;
    if (end) item.end = end.value;
  });
}

function addBreakDraft() {
  syncBreakDraftFromDom();
  breakDraft.push(makeBreakDraft("", "", ""));
  renderBreakList();
  updateSchedulePreview();
  const rows = document.querySelectorAll("#break-list .break-row");
  const last = rows[rows.length - 1];
  if (last) {
    const input = last.querySelector(".break-label");
    if (input) input.focus();
  }
}

function focusGaps(startTime, endTime, breaks) {
  return buildScheduleSegments({ startTime, endTime, breaks })
    .filter((segment) => segment.type === "focus" && segment.end > segment.start);
}

function suggestedTechniqueKey(startMin, endMin, breaks, methodKey) {
  if (!Number.isFinite(startMin) || !Number.isFinite(endMin) || endMin <= startMin) return null;
  const gaps = focusGaps(minutesToClock(startMin), minutesToClock(endMin), breaks);
  const longest = gaps.reduce((max, segment) => Math.max(max, segment.end - segment.start), 0);
  const total = gaps.reduce((sum, segment) => sum + (segment.end - segment.start), 0);
  if (!longest || total < 15) return "timeblock";
  const method = STUDY_METHODS.includes(methodKey) ? methodKey : "none";
  if (method === "feynman" || method === "activeRecall") {
    return longest >= 45 ? "deep50" : "pomodoro";
  }
  if (method === "sq3r") {
    return longest >= 40 ? "deep50" : "pomodoro";
  }
  if (method === "spaced" || method === "interleaving") {
    return longest >= 50 ? "fiftyTwo" : "pomodoro";
  }
  if (longest >= 80) return "ultradian";
  if (longest >= 45) return "deep50";
  if (longest >= 20) return "pomodoro";
  return "timeblock";
}

function applySuggestedTechnique(startMin, endMin, notify) {
  if (!autoTechnique) return;
  const methodSelect = document.getElementById("task-method");
  const key = suggestedTechniqueKey(startMin, endMin, breakDraft, methodSelect ? methodSelect.value : "none");
  if (!key) return;
  const select = document.getElementById("task-technique");
  const note = document.getElementById("auto-technique-note");
  if (!select || select.value === key) {
    if (note) note.classList.add("hidden");
    return;
  }
  select.value = key;
  syncPrettySelects();
  if (note) {
    note.textContent = t("smart.autoApplied", { technique: techniqueLabel(key) });
    note.classList.remove("hidden");
  }
  if (notify) showToast(t("smart.autoApplied", { technique: techniqueLabel(key) }), "success");
}

function addQuickBreak(kind) {
  syncBreakDraftFromDom();
  const durations = { tea: 10, food: 30, rest: 15 };
  const labels = { tea: t("breakDefaultTea"), food: t("breakDefaultFood"), rest: t("breakDefaultRest") };
  const duration = durations[kind] || 10;
  const startTime = document.getElementById("task-start-time").value;
  const endTime = document.getElementById("task-end-time").value;
  const startMin = parseTimeToMinutes(startTime);
  const endMin = parseTimeToMinutes(endTime);
  if (!Number.isFinite(startMin) || !Number.isFinite(endMin) || endMin <= startMin) {
    showToast(t("smart.needWindow"), "error");
    return;
  }
  const gaps = focusGaps(startTime, endTime, breakDraft)
    .filter((segment) => segment.end - segment.start >= duration + 10);
  if (!gaps.length) {
    showToast(t("smart.noGap"), "error");
    return;
  }
  const gap = gaps.sort((a, b) => (b.end - b.start) - (a.end - a.start))[0];
  const breakStart = Math.round(gap.start + Math.max(0, (gap.end - gap.start - duration) / 2));
  const breakEnd = breakStart + duration;
  breakDraft.push(makeBreakDraft(labels[kind] || t("breakDefaultRest"), minutesToClock(breakStart), minutesToClock(breakEnd)));
  autoTechnique = true;
  renderBreakList();
  updateSchedulePreview();
  applySuggestedTechnique(startMin, endMin, false);
  showToast(t("smart.breakAdded", {
    label: labels[kind] || t("breakDefaultRest"),
    time: minutesToClock(breakStart)
  }), "success");
}

function autoPlanBreaks() {
  syncBreakDraftFromDom();
  const startTime = document.getElementById("task-start-time").value;
  const endTime = document.getElementById("task-end-time").value;
  const techniqueKey = document.getElementById("task-technique").value;
  const profile = TECHNIQUES[techniqueKey] || TECHNIQUES.pomodoro;
  const startMin = parseTimeToMinutes(startTime);
  const endMin = parseTimeToMinutes(endTime);
  if (!Number.isFinite(startMin) || !Number.isFinite(endMin) || endMin <= startMin) {
    showToast(t("needTimeWindow"), "error");
    return;
  }
  if (!profile.focus || !profile.short) {
    showToast(t("noAutoBreaks"), "error");
    return;
  }
  const manual = sortBreaks(breakDraft).map((item) => makeBreakDraft(item.label, item.start, item.end));
  const gaps = focusGaps(startTime, endTime, breakDraft);
  const generated = [];
  gaps.forEach((gap) => {
    let cursor = gap.start;
    let round = 0;
    while (cursor + profile.focus < gap.end) {
      cursor += profile.focus;
      const isLong = profile.cycle > 0 && (round + 1) % profile.cycle === 0;
      const duration = isLong ? profile.long : profile.short;
      if (!duration || cursor + duration > gap.end) break;
      const label = duration >= 20 ? t("breakDefaultFood") : t("breakDefaultTea");
      generated.push(makeBreakDraft(label, minutesToClock(cursor), minutesToClock(cursor + duration)));
      cursor += duration;
      round += 1;
    }
  });
  if (!generated.length) {
    showToast(t("noAutoBreaks"), "error");
    return;
  }
  breakDraft = manual.concat(generated);
  autoTechnique = false;
  renderBreakList();
  updateSchedulePreview();
  showToast(t("breaksPlanned", { n: generated.length }), "success");
}

function validateBreakDraft() {
  const startMin = parseTimeToMinutes(document.getElementById("task-start-time").value);
  const endMin = parseTimeToMinutes(document.getElementById("task-end-time").value);
  const hasWindow = Number.isFinite(startMin) && Number.isFinite(endMin) && endMin > startMin;
  for (let i = 0; i < breakDraft.length; i += 1) {
    const item = breakDraft[i];
    if (!item.label && !item.start && !item.end) continue;
    const breakStart = parseTimeToMinutes(item.start);
    const breakEnd = parseTimeToMinutes(item.end);
    if (!Number.isFinite(breakStart) || !Number.isFinite(breakEnd) || breakEnd <= breakStart) return false;
    if (hasWindow && (breakStart < startMin || breakEnd > endMin)) return false;
  }
  return true;
}

function updateSchedulePreview() {
  const container = document.getElementById("task-schedule-preview");
  const hint = document.getElementById("technique-hint");
  if (!container) return;
  syncBreakDraftFromDom();
  const startMin = parseTimeToMinutes(document.getElementById("task-start-time").value);
  const endMin = parseTimeToMinutes(document.getElementById("task-end-time").value);
  applySuggestedTechnique(startMin, endMin, false);
  const techniqueKey = document.getElementById("task-technique").value;
  const methodKey = document.getElementById("task-method").value;
  if (hint) {
    const parts = [t("technique.hint." + (TECHNIQUES[techniqueKey] ? techniqueKey : "pomodoro"))];
    if (methodKey && methodKey !== "none") parts.push(t("method.hint." + methodKey));
    hint.textContent = parts.filter(Boolean).join(" ");
  }
  const segments = buildScheduleSegments({
    startTime: document.getElementById("task-start-time").value,
    endTime: document.getElementById("task-end-time").value,
    breaks: breakDraft
  });
  if (!segments.length) {
    container.innerHTML = "";
    return;
  }
  container.innerHTML = `<span class="schedule-label">${escapeHtml(t("scheduleTitle"))}</span>` + scheduleChipsHtml(segments);
}

function nativeReminder() {
  try {
    const bridge = window.ExamBuddyReminders;
    if (bridge && typeof bridge.isAvailable === "function" && bridge.isAvailable()) return bridge;
  } catch (e) {
  }
  return null;
}

function reminderTimestamp(dateStr, timeStr) {
  if (!dateStr || !timeStr) return null;
  const value = new Date(dateStr + "T" + timeStr + ":00").getTime();
  return Number.isFinite(value) ? value : null;
}

function reminderEvents(task) {
  const events = [];
  if (!task.startDate) return events;
  const startAt = reminderTimestamp(task.startDate, task.startTime);
  if (startAt) {
    events.push({
      kind: "start",
      at: startAt,
      title: t("reminderStartTitle", { task: task.text }),
      body: t("reminderStartBody")
    });
  }
  const endAt = reminderTimestamp(task.startDate, task.endTime);
  if (endAt) {
    events.push({
      kind: "end",
      at: endAt,
      title: t("reminderEndTitle", { task: task.text }),
      body: t("reminderEndBody")
    });
  }
  (task.breaks || []).forEach((item, index) => {
    if (index >= REMINDER_BREAK_LIMIT) return;
    const at = reminderTimestamp(task.startDate, item.start);
    if (!at) return;
    events.push({
      kind: "break-" + index,
      at,
      title: t("reminderBreakTitle", { task: task.text }),
      body: item.label ? t("reminderBreakBody", { label: item.label }) : t("reminderBreakBodyDefault")
    });
  });
  return events;
}

function cancelTaskReminders(taskId) {
  const bridge = nativeReminder();
  if (!bridge) return;
  try {
    if (typeof bridge.cancelAll === "function") {
      bridge.cancelAll(taskId);
      return;
    }
    REMINDER_KINDS.forEach((kind) => bridge.cancel(taskId, kind));
    for (let i = 0; i < REMINDER_BREAK_LIMIT; i += 1) bridge.cancel(taskId, "break-" + i);
  } catch (e) {
  }
}

function syncTaskReminders(task, requestPermission) {
  cancelTaskReminders(task.id);
  if (!task || !task.startDate) return;
  if (!task.alarm && !task.notify) return;
  if (daysUntil(task.startDate) < 0) return;

  const bridge = nativeReminder();
  const events = reminderEvents(task).filter((event) => event.at > Date.now());
  if (!events.length) return;

  if (bridge) {
    try {
      events.forEach((event) => {
        bridge.schedule(task.id, event.kind, event.at, event.title, event.body, task.alarm, getLanguage());
      });
      if (requestPermission && (task.alarm || task.notify) && typeof bridge.areNotificationsEnabled === "function" && !bridge.areNotificationsEnabled()) {
        if (typeof bridge.requestNotificationPermission === "function") bridge.requestNotificationPermission();
        showToast(t("reminderPermission"));
      }
    } catch (e) {
    }
    return;
  }

  if (requestPermission && task.notify && typeof Notification !== "undefined" && Notification.permission === "default") {
    try {
      Notification.requestPermission();
    } catch (e) {
    }
  }
}

function syncAllTaskReminders() {
  tasks.forEach((task) => syncTaskReminders(task, false));
}

function checkTaskReminders() {
  if (document.hidden) return;
  const now = Date.now();
  const native = nativeReminder();
  tasks.forEach((task) => {
    if (task.completed || !task.alarm && !task.notify) return;
    if (!task.startDate || task.startDate !== todayKey()) return;
    if (native) return;
    reminderEvents(task).forEach((event) => {
      if (now < event.at || now - event.at > 60000) return;
      const key = task.id + ":" + event.kind + ":" + event.at;
      if (firedReminders.has(key)) return;
      firedReminders.add(key);
      showToast(event.title, "success");
      if (task.alarm) playChime(true);
      if (task.notify && typeof Notification !== "undefined") {
        try {
          new Notification(event.title, { body: event.body });
        } catch (e) {
        }
      }
    });
  });
}

function startReminderLoop() {
  if (reminderInterval) clearInterval(reminderInterval);
  reminderInterval = setInterval(checkTaskReminders, 60000);
}

function normalizePomodoro(raw) {
  const base = {
    settings: { ...DEFAULT_SETTINGS },
    sessions: [],
    focusCount: 0
  };
  if (!raw || Array.isArray(raw) || typeof raw !== "object") return base;

  if (raw.settings && typeof raw.settings === "object") {
    base.settings = { ...DEFAULT_SETTINGS, ...raw.settings };
  }
  ["focus", "short", "long"].forEach((key) => {
    const value = Number(base.settings[key]);
    base.settings[key] = Number.isFinite(value) && value > 0
      ? Math.min(Math.round(value), key === "focus" ? 180 : 90)
      : DEFAULT_SETTINGS[key];
  });
  ["autoBreaks", "autoFocus", "sound", "alarmVibrate", "alarmBluetooth"].forEach((key) => {
    base.settings[key] = Boolean(base.settings[key]);
  });
  const alarmTone = Number(base.settings.alarmTone);
  base.settings.alarmTone = Number.isFinite(alarmTone) && alarmTone >= 0 && alarmTone < ALARM_TONE_NAMES.length
    ? Math.round(alarmTone) : DEFAULT_SETTINGS.alarmTone;
  const alarmSnooze = Number(base.settings.alarmSnooze);
  base.settings.alarmSnooze = Number.isFinite(alarmSnooze) && alarmSnooze > 0
    ? Math.min(30, Math.round(alarmSnooze)) : DEFAULT_SETTINGS.alarmSnooze;

  base.sessions = Array.isArray(raw.sessions)
    ? raw.sessions
        .filter((s) => s && typeof s.date === "string" && Number.isFinite(Number(s.minutes)))
        .map((s) => ({
          id: s.id || uid(),
          date: s.date,
          minutes: Number(s.minutes),
          mode: MODES[s.mode] ? s.mode : "focus",
          at: Number(s.at) || Date.now()
        }))
    : [];
  base.focusCount = Number.isFinite(raw.focusCount)
    ? Math.max(0, Math.floor(raw.focusCount))
    : base.sessions.filter((s) => s.mode === "focus").length;
  return base;
}

function durationFor(mode) {
  const minutes = Number(pomodoro.settings[mode]);
  return Math.max(1, Number.isFinite(minutes) ? minutes : DEFAULT_SETTINGS[mode]) * 60;
}

function timerSavedDefaults() {
  return {
    focus: durationFor("focus"),
    short: durationFor("short"),
    long: durationFor("long")
  };
}

function normalizeTimer(raw) {
  const savedDefaults = timerSavedDefaults();
  const base = {
    mode: "focus",
    activeMode: null,
    remaining: savedDefaults.focus,
    running: false,
    endsAt: null,
    saved: { ...savedDefaults }
  };
  if (!raw || Array.isArray(raw) || typeof raw !== "object") return base;

  const mode = MODES[raw.mode] ? raw.mode : "focus";
  const requestedActive = MODES[raw.activeMode] ? raw.activeMode : mode;
  const running = Boolean(raw.running) && Number.isFinite(raw.endsAt) && MODES[requestedActive];
  const activeMode = running ? requestedActive : null;
  const saved = { ...savedDefaults };
  if (raw.saved && typeof raw.saved === "object") {
    Object.keys(saved).forEach((key) => {
      const value = Number(raw.saved[key]);
      if (Number.isFinite(value) && value >= 0) {
        saved[key] = Math.max(0, Math.min(value, durationFor(key)));
      }
    });
  }
  const rawRemaining = Number(raw.remaining);
  if (Number.isFinite(rawRemaining) && !running) {
    saved[mode] = Math.max(0, Math.min(rawRemaining, durationFor(mode)));
  }
  if (running) {
    saved[activeMode] = Math.max(0, Math.min(
      Math.ceil((raw.endsAt - Date.now()) / 1000),
      durationFor(activeMode)
    ));
  }

  const displayRemaining = running && activeMode === mode
    ? saved[mode]
    : (saved[mode] > 0 ? saved[mode] : durationFor(mode));

  return {
    mode,
    activeMode,
    remaining: displayRemaining,
    running,
    endsAt: running ? raw.endsAt : null,
    saved
  };
}

let modalScrollLocks = 0;
let modalScrollY = 0;

function lockBodyScroll() {
  if (modalScrollLocks === 0) {
    modalScrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    document.body.style.position = "fixed";
    document.body.style.top = "-" + modalScrollY + "px";
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
  }
  modalScrollLocks += 1;
  document.body.classList.add("modal-open");
}

function unlockBodyScroll() {
  if (modalScrollLocks <= 0) {
    modalScrollLocks = 0;
    return;
  }
  modalScrollLocks -= 1;
  if (modalScrollLocks > 0) return;
  document.body.classList.remove("modal-open");
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  document.body.style.overflow = "";
  const y = modalScrollY;
  modalScrollY = 0;
  const previousBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";
  try {
    window.scrollTo(0, y);
  } catch (e) {
    document.documentElement.scrollTop = y;
    document.body.scrollTop = y;
  }
  document.documentElement.style.scrollBehavior = previousBehavior;
}

function resetInnerScroll() {
  const main = document.querySelector("main");
  if (main) main.scrollTop = 0;
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.scrollTop = 0;
  });
}

function forceScrollTop() {
  try {
    window.scrollTo(0, 0);
  } catch (e) {
  }
  if (document.documentElement) document.documentElement.scrollTop = 0;
  if (document.body) document.body.scrollTop = 0;
  resetInnerScroll();
}

function scrollToTop() {
  resetInnerScroll();
  try {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (e) {
    forceScrollTop();
  }
}

function switchTab(tab) {
  const buttons = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");
  buttons.forEach((btn) => btn.classList.toggle("active", btn.dataset.tab === tab));
  panels.forEach((panel) => panel.classList.toggle("active", panel.id === tab));
  closePrettySelectMenu();
  if (tab === "dashboard") {
    renderDashboard();
    startCountdownLoop();
  } else {
    stopCountdownLoop();
  }
  if (tab === "exams") renderExams();
  if (tab === "tasks") renderTasks();
  if (tab === "cards") renderFlashcards();
  if (tab === "focus") {
    renderTodaySessions();
    renderSessionDots();
  }
  if (tab === "insights") renderInsights();
  if (timer.running) resumeAppTimer();
  forceScrollTop();
}

function setupTabs() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });
}

function upcomingExams() {
  return exams
    .filter((e) => !e.completed && daysUntil(e.date) >= 0)
    .sort((a, b) => a.date.localeCompare(b.date));
}

function activityDays() {
  const days = new Set();
  pomodoro.sessions.forEach((s) => days.add(s.date));
  tasks.forEach((t) => {
    if (t.createdAt) days.add(dateKey(t.createdAt));
    if (t.completedAt) days.add(dateKey(t.completedAt));
  });
  exams.forEach((e) => {
    if (e.createdAt) days.add(dateKey(e.createdAt));
    if (e.completedAt) days.add(dateKey(e.completedAt));
  });
  flashcards.forEach((card) => {
    if (card.lastReviewedAt) days.add(dateKey(card.lastReviewedAt));
  });
  return days;
}

function calcStreak() {
  const days = activityDays();
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  if (!days.has(dateKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (days.has(dateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function focusMinutesForDay(key) {
  return pomodoro.sessions
    .filter((s) => s.date === key && s.mode === "focus")
    .reduce((sum, s) => sum + s.minutes, 0);
}

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return t("greet.morning");
  if (hour < 18) return t("greet.afternoon");
  return t("greet.evening");
}

function renderDashboard() {
  const upcoming = upcomingExams().length;
  const completed = exams.filter((e) => e.completed).length;
  const pendingTasks = tasks.filter((t) => !t.completed).length;
  const doneTasks = tasks.filter((t) => t.completed).length;
  const dueCards = flashcards.filter(cardIsDue).length;
  const streak = calcStreak();

  setText("stat-upcoming", upcoming);
  setText("stat-completed", completed);
  setText("stat-pending", pendingTasks);
  setText("stat-done-tasks", doneTasks);
  setText("stat-focus-today", minutesLabel(focusMinutesForDay(todayKey())));
  setText("stat-cards-due", dueCards);
  setText("stat-streak", streak + " " + t(streak === 1 ? "day" : "days"));
  setText("greet-date", formatGreetingDate());
  setText("dashboard-heading", greeting());

  const nextExamEl = document.getElementById("next-exam");
  const next = upcomingExams()[0];

  if (!next) {
    nextExamEl.textContent = t("noUpcoming");
    document.getElementById("countdown").classList.add("hidden");
    document.getElementById("next-progress").style.width = "0%";
    setText("next-progress-text", t("prepHint"));
    setText("stat-days-left", "—");
    renderTodayPlan();
    return;
  }

  const days = daysUntil(next.date);
  let when = t("daysLeft", { n: days });
  if (days === 0) when = t("today");
  if (days === 1) when = t("tomorrow");
  nextExamEl.innerHTML = `<strong>${escapeHtml(next.subject)}</strong> — ${formatDate(next.date)} (${when})` +
    (next.notes ? `<br><span class="item-meta">${escapeHtml(next.notes)}</span>` : "");

  const target = new Date(next.date + "T00:00:00").getTime();
  const start = next.createdAt
    ? new Date(next.createdAt).getTime()
    : target - 30 * DAY_MS;
  const span = Math.max(1, target - start);
  const progress = Math.max(0, Math.min(100, Math.round(((Date.now() - start) / span) * 100)));
  document.getElementById("next-progress").style.width = progress + "%";
  setText("next-progress-text", t("prepProgress", { p: progress, when }));
  updateCountdown();
  renderTodayPlan();
}

function updateCountdown() {
  const next = upcomingExams()[0];
  const box = document.getElementById("countdown");
  if (!next) {
    if (box) box.classList.add("hidden");
    setText("stat-days-left", "—");
    return;
  }
  if (box) box.classList.remove("hidden");
  setText("stat-days-left", daysUntil(next.date));

  let diff = Math.max(0, new Date(next.date + "T00:00:00").getTime() - Date.now());
  const days = Math.floor(diff / DAY_MS);
  diff -= days * DAY_MS;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;
  const mins = Math.floor(diff / (1000 * 60));
  diff -= mins * 1000 * 60;
  const secs = Math.floor(diff / 1000);

  setText("cd-days", pad(days));
  setText("cd-hours", pad(hours));
  setText("cd-mins", pad(mins));
  setText("cd-secs", pad(secs));
}

let countdownLoop = null;

function startCountdownLoop() {
  if (countdownLoop) return;
  countdownLoop = setInterval(() => {
    if (document.hidden) return;
    const panel = document.getElementById("dashboard");
    if (!panel || !panel.classList.contains("active")) return;
    updateCountdown();
  }, 1000);
}

function stopCountdownLoop() {
  if (countdownLoop) {
    clearInterval(countdownLoop);
    countdownLoop = null;
  }
}

function renderTodayPlan() {
  const container = document.getElementById("today-plan");
  const examsHtml = upcomingExams()
    .slice(0, 3)
    .map((e) => `<div class="plan-row" data-detail="exam" data-detail-id="${e.id}" role="button" tabindex="0"><span class="plan-dot"></span><span>${escapeHtml(e.subject)}</span><span>${daysUntil(e.date) === 0 ? t("today") : daysUntil(e.date) + t("dayShort")}</span></div>`)
    .join("") || `<p class="item-meta">${t("noUpcomingShort")}</p>`;

  const scheduledToday = tasks
    .filter((task) => !task.completed && task.startDate === todayKey() && task.startTime && task.endTime)
    .sort((a, b) => (a.startTime || "").localeCompare(b.startTime || ""));
  const scheduledHtml = scheduledToday
    .slice(0, 4)
    .map((task) => {
      const exam = taskExam(task);
      const label = exam ? escapeHtml(task.text) + " · " + escapeHtml(exam.subject) : escapeHtml(task.text);
      return `<div class="plan-row" data-detail="task" data-detail-id="${task.id}" role="button" tabindex="0"><span class="plan-dot schedule"></span><span>${label}</span><span>${escapeHtml(task.startTime)}–${escapeHtml(task.endTime)}</span></div>`;
    })
    .join("") || `<p class="item-meta">${t("noSchedule")}</p>`;

  const pending = tasks
    .filter((t) => !t.completed)
    .sort((a, b) => (a.due || "9999-99-99").localeCompare(b.due || "9999-99-99") || b.createdAt - a.createdAt)
    .slice(0, 3);
  const tasksHtml = pending
    .map((task) => `<div class="plan-row" data-detail="task" data-detail-id="${task.id}" role="button" tabindex="0"><span class="plan-dot"></span><span>${escapeHtml(task.text)}</span><span>${task.due ? formatDate(task.due) : t("anytime")}</span></div>`)
    .join("") || `<p class="item-meta">${t("noPendingTasks")}</p>`;

  container.innerHTML =
    `<div class="plan-group"><h4>${t("todaySchedule")}</h4>${scheduledHtml}</div>` +
    `<div class="plan-group"><h4>${t("stat.upcoming")}</h4>${examsHtml}</div>` +
    `<div class="plan-group"><h4>${t("nextTasks")}</h4>${tasksHtml}</div>`;
}

function taskExam(task) {
  if (!task || !task.examId) return null;
  return exams.find((exam) => exam.id === task.examId) || null;
}

function examBadge(exam) {
  if (exam.completed) return `<span class="badge done">${t("completed")}</span>`;
  const days = daysUntil(exam.date);
  if (days < 0) return `<span class="badge overdue">${t("past")}</span>`;
  if (days === 0) return `<span class="badge today">${t("today")}</span>`;
  const label = t("daysCount", { n: days });
  if (days <= 3) return `<span class="badge soon">${label}</span>`;
  return `<span class="badge">${label}</span>`;
}

function taskBadge(task) {
  const priority = ["low", "medium", "high"].includes(task.priority) ? task.priority : "medium";
  let html = `<span class="badge priority-${priority}">${t(priority)}</span>`;
  if (task.due) {
    const days = daysUntil(task.due);
    if (days < 0) html += `<span class="badge overdue">${t("overdue")}</span>`;
    else if (days === 0) html += `<span class="badge today">${t("dueToday")}</span>`;
    else html += `<span class="badge category">${t("dueOn", { date: formatDate(task.due) })}</span>`;
  }
  return html;
}

function renderExams() {
  const list = document.getElementById("exam-list");
  const empty = document.getElementById("exam-empty");
  list.innerHTML = "";

  const query = ui.examSearch.trim().toLowerCase();
  const sorted = [...exams]
    .filter((e) => {
      if (ui.examFilter === "upcoming" && (e.completed || daysUntil(e.date) < 0)) return false;
      if (ui.examFilter === "past" && daysUntil(e.date) >= 0) return false;
      if (ui.examFilter === "completed" && !e.completed) return false;
      if (!query) return true;
      return [e.subject, e.notes, e.category].some((v) => String(v || "").toLowerCase().includes(query));
    })
    .sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return a.date.localeCompare(b.date);
    });

  empty.classList.toggle("hidden", sorted.length > 0);
  empty.textContent = exams.length && !sorted.length ? t("examNoMatch") : t("examEmpty");
  setText("exam-count", t("examCount", { n: exams.length }));

  const upcomingCount = upcomingExams().length;
  const limitHint = document.getElementById("exam-limit-hint");
  if (limitHint) {
    limitHint.textContent = upcomingCount >= EXAM_LIMIT
      ? t("examLimitReached", { max: EXAM_LIMIT })
      : t("examLimitHint", { n: upcomingCount, max: EXAM_LIMIT });
    limitHint.classList.toggle("limit-reached", upcomingCount >= EXAM_LIMIT);
  }

  sorted.forEach((exam) => {
    const li = document.createElement("li");
    li.className = "item" + (exam.completed ? " completed" : "");
    const notes = exam.notes ? `<p class="item-meta">${escapeHtml(exam.notes)}</p>` : "";
    li.innerHTML = `
      <div class="item-main">
        <p class="item-title">${escapeHtml(exam.subject)} ${examBadge(exam)} <span class="badge category">${escapeHtml(categoryLabel(exam.category))}</span></p>
        <p class="item-meta">${formatDate(exam.date)}</p>
        ${notes}
      </div>
      <div class="item-actions">
        <button class="secondary-btn" data-action="edit-exam" data-id="${exam.id}">${t("edit")}</button>
        <button class="secondary-btn" data-action="toggle-exam" data-id="${exam.id}">
          ${t(exam.completed ? "undo" : "done")}
        </button>
        <button class="danger-btn" data-action="delete-exam" data-id="${exam.id}">${t("delete")}</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function taskScheduleMeta(task) {
  const exam = taskExam(task);
  const parts = [];
  if (task.startTime && task.endTime) {
    const when = task.startDate ? formatDate(task.startDate) + " · " : "";
    parts.push(`<p class="item-meta task-schedule-line"><strong>${escapeHtml(t("scheduleTitle"))}:</strong> ${escapeHtml(when + task.startTime + "–" + task.endTime)} <span class="badge technique">${escapeHtml(techniqueLabel(task.technique))}</span>${task.method && task.method !== "none" ? ` <span class="badge method">${escapeHtml(t("method." + task.method))}</span>` : ""}</p>`);
  }
  if (exam) {
    parts.push(`<p class="item-meta task-exam-line"><span class="badge exam">${escapeHtml(exam.subject)}</span></p>`);
  }
  const reminders = `${task.alarm ? `<span class="badge reminder">${escapeHtml(t("alarmBadge"))}</span>` : ""}${task.notify ? `<span class="badge reminder">${escapeHtml(t("notifyBadge"))}</span>` : ""}`;
  if (reminders) parts.push(`<p class="item-meta task-reminder-line">${reminders}</p>`);
  const chips = taskScheduleChips(task, 8);
  if (chips) parts.push(chips);
  return parts.join("");
}

function renderTasks() {
  const list = document.getElementById("task-list");
  const empty = document.getElementById("task-empty");
  list.innerHTML = "";
  populateTaskExamSelect();

  const query = ui.taskSearch.trim().toLowerCase();
  const sorted = [...tasks]
    .filter((t) => {
      if (ui.taskFilter === "active" && t.completed) return false;
      if (ui.taskFilter === "completed" && !t.completed) return false;
      if (ui.taskFilter === "high" && t.priority !== "high") return false;
      if (!query) return true;
      const exam = taskExam(t);
      return [t.text, exam ? exam.subject : ""].some((value) => String(value || "").toLowerCase().includes(query));
    })
    .sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      const aSchedule = a.startDate ? a.startDate + "T" + (a.startTime || "99:99") : "";
      const bSchedule = b.startDate ? b.startDate + "T" + (b.startTime || "99:99") : "";
      if (aSchedule && bSchedule) return aSchedule.localeCompare(bSchedule);
      if (aSchedule !== bSchedule) return aSchedule ? -1 : 1;
      return b.createdAt - a.createdAt;
    });

  empty.classList.toggle("hidden", sorted.length > 0);
  empty.textContent = tasks.length && !sorted.length ? t("taskNoMatch") : t("taskEmpty");

  sorted.forEach((task) => {
    const li = document.createElement("li");
    li.className = "item" + (task.completed ? " completed" : "");
    li.innerHTML = `
      <div class="item-main">
        <p class="item-title">${escapeHtml(task.text)} ${taskBadge(task)}</p>
        ${taskScheduleMeta(task)}
      </div>
      <div class="item-actions">
        <button class="secondary-btn" data-action="edit-task" data-id="${task.id}">${t("edit")}</button>
        <button class="secondary-btn" data-action="edit-breaks" data-id="${task.id}">${t("editBreaks")}</button>
        <button class="secondary-btn" data-action="toggle-task" data-id="${task.id}">
          ${t(task.completed ? "undo" : "done")}
        </button>
        <button class="danger-btn" data-action="delete-task" data-id="${task.id}">${t("delete")}</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function populateTaskExamSelect(selectedId) {
  const select = document.getElementById("task-exam");
  if (!select) return;
  const current = selectedId !== undefined ? selectedId : select.value;
  const ordered = [...exams].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return a.date.localeCompare(b.date);
  });
  const options = [`<option value="">${escapeHtml(t("noExam"))}</option>`];
  ordered.forEach((exam) => {
    const label = exam.subject + " · " + formatDate(exam.date);
    options.push(`<option value="${escapeHtml(exam.id)}">${escapeHtml(label)}</option>`);
  });
  select.innerHTML = options.join("");
  if (current && ordered.some((exam) => exam.id === current)) select.value = current;
  syncPrettySelects();
}

function populateCardExamSelect(selectedId) {
  const select = document.getElementById("card-exam");
  if (!select) return;
  const current = selectedId !== undefined ? selectedId : select.value;
  const ordered = [...exams].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return a.date.localeCompare(b.date);
  });
  const options = [`<option value="">${escapeHtml(t("noExam"))}</option>`];
  ordered.forEach((exam) => {
    options.push(`<option value="${escapeHtml(exam.id)}">${escapeHtml(exam.subject + " · " + formatDate(exam.date))}</option>`);
  });
  select.innerHTML = options.join("");
  if (current && ordered.some((exam) => exam.id === current)) select.value = current;
  syncPrettySelects();
}

function populateCardDeckOptions() {
  const filter = document.getElementById("card-deck-filter");
  const list = document.getElementById("card-deck-options");
  const decks = Array.from(new Set(flashcards.map(cardDeckName))).sort((a, b) => a.localeCompare(b));
  if (list) {
    list.innerHTML = decks.map((deck) => `<option value="${escapeHtml(deck)}"></option>`).join("");
  }
  if (!filter) return;
  const current = ui.cardDeck;
  const options = [`<option value="all">${escapeHtml(t("cards.allDecks"))}</option>`].concat(
    decks.map((deck) => `<option value="${escapeHtml(deck)}">${escapeHtml(deck)}</option>`)
  );
  filter.innerHTML = options.join("");
  filter.value = current !== "all" && decks.includes(current) ? current : "all";
  ui.cardDeck = filter.value;
  syncPrettySelects();
}

function renderCardStats() {
  const due = flashcards.filter(cardIsDue).length;
  const mastered = flashcards.filter(cardIsMastered).length;
  setText("card-stat-total", flashcards.length);
  setText("card-stat-due", due);
  setText("card-stat-mastered", mastered);
}

function renderFlashcards() {
  const list = document.getElementById("card-list");
  const empty = document.getElementById("card-empty");
  if (!list) return;
  populateCardExamSelect();
  populateCardDeckOptions();
  renderCardStats();

  const query = ui.cardSearch.trim().toLowerCase();
  const sorted = [...flashcards]
    .filter((card) => {
      if (ui.cardFilter === "due" && !cardIsDue(card)) return false;
      if (ui.cardFilter === "mastered" && !cardIsMastered(card)) return false;
      if (ui.cardDeck !== "all" && cardDeckName(card) !== ui.cardDeck) return false;
      if (!query) return true;
      return [card.front, card.back, cardDeckName(card)].some((value) => String(value || "").toLowerCase().includes(query));
    })
    .sort((a, b) => {
      const aDue = cardIsDue(a) ? 0 : 1;
      const bDue = cardIsDue(b) ? 0 : 1;
      if (aDue !== bDue) return aDue - bDue;
      if (aDue === 0) return (a.dueAt || 0) - (b.dueAt || 0);
      return (a.dueAt || 0) - (b.dueAt || 0);
    });

  list.innerHTML = "";
  empty.classList.toggle("hidden", sorted.length > 0);
  empty.textContent = flashcards.length && !sorted.length ? t("cards.noMatch") : t("cards.empty");
  setText("card-count", t("cards.count", { n: flashcards.length }));

  sorted.forEach((card) => {
    const li = document.createElement("li");
    li.className = "item flashcard-item";
    const exam = cardExam(card);
    const badge = cardIsMastered(card)
      ? `<span class="badge done">${escapeHtml(t("cards.masteredBadge"))}</span>`
      : cardIsDue(card)
        ? `<span class="badge today">${escapeHtml(t("cards.dueBadge"))}</span>`
        : `<span class="badge">${escapeHtml(cardDueLabel(card))}</span>`;
    const examBadge = exam ? `<span class="badge exam">${escapeHtml(exam.subject)}</span>` : "";
    li.innerHTML = `
      <div class="item-main">
        <p class="item-title">${escapeHtml(card.front)} ${badge}</p>
        <p class="item-meta card-back-preview">${escapeHtml(card.back)}</p>
        <p class="item-meta card-meta-line">
          <span class="badge category">${escapeHtml(cardDeckName(card))}</span>${examBadge}
          <span class="card-review-count">${escapeHtml(t("cards.reviewed", { n: card.reviews }))}</span>
        </p>
      </div>
      <div class="item-actions">
        <button class="secondary-btn" data-action="study-card" data-id="${card.id}">${escapeHtml(t("cards.study"))}</button>
        <button class="secondary-btn" data-action="edit-card" data-id="${card.id}">${escapeHtml(t("edit"))}</button>
        <button class="danger-btn" data-action="delete-card" data-id="${card.id}">${escapeHtml(t("delete"))}</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function studyCurrentCard() {
  const id = studyState.queue[0];
  return id ? flashcards.find((card) => card.id === id) || null : null;
}

function startCardStudy(cardId) {
  const modal = document.getElementById("study-modal");
  if (!modal) return;
  const queue = cardId
    ? flashcards.filter((card) => card.id === cardId).map((card) => card.id)
    : flashcards.filter(cardIsDue).sort((a, b) => (a.dueAt || 0) - (b.dueAt || 0)).map((card) => card.id);
  studyState = { queue, total: queue.length, reviewed: 0, again: 0, good: 0, easy: 0, flipped: false, open: true };
  const wasHidden = modal.classList.contains("hidden");
  modal.classList.remove("hidden");
  if (wasHidden) lockBodyScroll();
  renderStudy();
}

function closeStudyModal() {
  const modal = document.getElementById("study-modal");
  if (!modal || modal.classList.contains("hidden")) return;
  modal.classList.add("hidden");
  unlockBodyScroll();
  const wasOpen = studyState.open;
  studyState.open = false;
  if (wasOpen) renderAll();
}

function setStudyFlipped(flipped) {
  studyState.flipped = Boolean(flipped);
  const cardEl = document.getElementById("study-card");
  const reveal = document.getElementById("study-reveal");
  const grade = document.getElementById("study-grade");
  if (cardEl) cardEl.classList.toggle("flipped", studyState.flipped);
  if (reveal) reveal.classList.toggle("hidden", studyState.flipped);
  if (grade) grade.classList.toggle("hidden", !studyState.flipped);
}

function renderStudy() {
  const modal = document.getElementById("study-modal");
  if (!modal || modal.classList.contains("hidden")) return;
  const stage = document.getElementById("study-stage");
  const empty = document.getElementById("study-empty");
  const done = document.getElementById("study-done");
  const hint = document.getElementById("study-hint");
  const card = studyCurrentCard();
  const hasSession = studyState.total > 0;

  if (!card) {
    if (stage) stage.classList.add("hidden");
    if (hint) hint.classList.add("hidden");
    if (empty) empty.classList.toggle("hidden", hasSession);
    if (done) done.classList.toggle("hidden", !hasSession);
    setText("study-progress", "");
    setText("study-remaining", "");
    if (hasSession) {
      setText("study-done-body", t("cards.study.doneBody", { n: studyState.reviewed }));
      const stats = document.getElementById("study-done-stats");
      if (stats) {
        stats.innerHTML = [
          `<span class="study-stat again">${escapeHtml(t("cards.study.again"))} ${studyState.again}</span>`,
          `<span class="study-stat good">${escapeHtml(t("cards.study.good"))} ${studyState.good}</span>`,
          `<span class="study-stat easy">${escapeHtml(t("cards.study.easy"))} ${studyState.easy}</span>`
        ].join("");
      }
    }
    return;
  }

  if (stage) stage.classList.remove("hidden");
  if (hint) hint.classList.remove("hidden");
  if (empty) empty.classList.add("hidden");
  if (done) done.classList.add("hidden");
  setText("study-modal-subtitle", cardDeckName(card));
  setText("study-progress", t("cards.study.progress", { current: Math.min(studyState.reviewed + 1, studyState.total), total: studyState.total }));
  setText("study-remaining", t("cards.study.remaining", { n: studyState.queue.length }));
  setText("study-front-text", card.front);
  setText("study-back-text", card.back);
  setStudyFlipped(studyState.flipped);
}

function revealStudyCard() {
  if (!studyCurrentCard() || studyState.flipped) return;
  setStudyFlipped(true);
  const grade = document.getElementById("study-grade");
  const firstGrade = grade ? grade.querySelector(".study-grade-btn") : null;
  if (firstGrade) firstGrade.focus();
}

function gradeStudyCard(grade) {
  const card = studyCurrentCard();
  if (!card || !studyState.flipped) return;
  const now = Date.now();
  if (grade === "again") {
    card.box = 0;
    card.lapses += 1;
    studyState.again += 1;
  } else if (grade === "easy") {
    card.box = Math.min(CARD_MAX_BOX, card.box + 2);
    studyState.easy += 1;
  } else {
    card.box = Math.min(CARD_MAX_BOX, card.box + 1);
    studyState.good += 1;
  }
  card.reviews += 1;
  card.lastReviewedAt = now;
  card.updatedAt = now;
  card.dueAt = now + CARD_INTERVALS[card.box];
  studyState.reviewed += 1;
  studyState.queue.shift();
  if (grade === "again") studyState.queue.push(card.id);
  studyState.flipped = false;
  saveData();
  renderCardStats();
  renderStudy();
}

function renderTodaySessions() {
  const list = document.getElementById("today-sessions");
  const today = pomodoro.sessions
    .filter((s) => s.date === todayKey() && s.mode === "focus")
    .sort((a, b) => b.at - a.at);
  list.innerHTML = today
    .map((s) => {
      const time = new Date(s.at).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
      return `<li><span>${escapeHtml(t(MODES[s.mode].label))} · ${t("minutesCount", { n: s.minutes })}</span><span class="mini-meta">${time}</span></li>`;
    })
    .join("");
  setText("session-today-count", today.length);
  document.getElementById("sessions-empty").classList.toggle("hidden", today.length > 0);
}

function renderInsights() {
  const days = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  for (let i = 6; i >= 0; i -= 1) {
    const d = new Date(cursor);
    d.setDate(cursor.getDate() - i);
    days.push({
      key: dateKey(d),
      label: weekdayShort(d)
    });
  }

  const data = days.map((d) => ({ ...d, minutes: focusMinutesForDay(d.key) }));
  const max = Math.max(10, ...data.map((d) => d.minutes));
  document.getElementById("focus-chart").innerHTML = data
    .map((d) => {
      const height = d.minutes ? Math.max(6, Math.round((d.minutes / max) * 100)) : 2;
      return `<div class="bar-col"><div class="bar-track"><div class="bar-fill ${d.minutes ? "" : "zero"}" style="height:${height}%" title="${t("minutesCount", { n: d.minutes })}"></div></div><span class="bar-label">${escapeHtml(d.label)}</span></div>`;
    })
    .join("");

  const weekMinutes = data.reduce((sum, d) => sum + d.minutes, 0);
  const weekSessions = pomodoro.sessions.filter(
    (s) => s.mode === "focus" && days.some((d) => d.key === s.date)
  ).length;
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.completed).length;
  const completion = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;

  setText("ins-focus-week", minutesLabel(weekMinutes));
  setText("ins-sessions-week", weekSessions);
  setText("ins-completion", completion + "%");
  setText("ins-exams-tracked", exams.length);

  document.getElementById("task-chart").innerHTML =
    `<div class="progress-row"><div class="progress-row-head"><strong>${t("completedShort")}</strong><span>${doneTasks}</span></div><div class="mini-track"><div class="mini-fill" style="width:${completion}%"></div></div></div>` +
    `<div class="progress-row"><div class="progress-row-head"><strong>${t("pending")}</strong><span>${totalTasks - doneTasks}</span></div><div class="mini-track"><div class="mini-fill" style="width:${totalTasks ? 100 - completion : 0}%"></div></div></div>`;

  let tip = t("insightEmpty");
  if (upcomingExams().length && weekMinutes === 0) {
    tip = t("tipExam", { n: upcomingExams().length, m: pomodoro.settings.focus });
  } else if (weekMinutes > 0 && completion < 50 && totalTasks) {
    tip = t("tipTasks");
  } else if (weekMinutes > 0) {
    tip = t("tipNice", { time: minutesLabel(weekMinutes) });
  } else if (totalTasks && !upcomingExams().length) {
    tip = t("tipDate");
  }
  setText("insight-tip", tip);
}

let detailState = { kind: "", id: "" };

function bestStreak() {
  const keys = Array.from(activityDays()).sort();
  let best = 0;
  let run = 0;
  let previous = null;
  keys.forEach((key) => {
    const current = new Date(key + "T00:00:00").getTime();
    run = previous !== null && Math.round((current - previous) / DAY_MS) === 1 ? run + 1 : 1;
    best = Math.max(best, run);
    previous = current;
  });
  return best;
}

function detailTaskRow(task) {
  const exam = taskExam(task);
  const meta = [];
  if (task.startDate) {
    meta.push(formatDate(task.startDate) + (task.startTime ? " · " + task.startTime + "–" + (task.endTime || "") : ""));
  }
  if (exam) meta.push(exam.subject);
  return `<div class="detail-item ${task.completed ? "completed" : ""}">
    <div class="detail-item-main">
      <strong>${escapeHtml(task.text)}</strong>
      <p>${escapeHtml(meta.join(" · ") || t("detail.noSchedule"))}</p>
      <span class="detail-chip">${escapeHtml(techniqueLabel(task.technique))}</span>
    </div>
    <div class="detail-item-actions">
      <button type="button" class="ghost-btn" data-detail-action="toggle-task" data-id="${task.id}">${escapeHtml(t(task.completed ? "detail.undo" : "detail.done"))}</button>
      <button type="button" class="ghost-btn" data-detail-action="edit-task" data-id="${task.id}">${escapeHtml(t("detail.edit"))}</button>
      <button type="button" class="danger-btn" data-detail-action="delete-task" data-id="${task.id}">${escapeHtml(t("detail.delete"))}</button>
    </div>
  </div>`;
}

function detailExamRow(exam) {
  return `<div class="detail-item ${exam.completed ? "completed" : ""}">
    <div class="detail-item-main">
      <strong>${escapeHtml(exam.subject)}</strong>
      <p>${formatDate(exam.date)} · ${escapeHtml(categoryLabel(exam.category))}</p>
      ${exam.notes ? `<p>${escapeHtml(exam.notes)}</p>` : ""}
    </div>
    <div class="detail-item-actions">
      <button type="button" class="ghost-btn" data-detail-action="toggle-exam" data-id="${exam.id}">${escapeHtml(t(exam.completed ? "detail.undo" : "detail.done"))}</button>
      <button type="button" class="ghost-btn" data-detail-action="edit-exam" data-id="${exam.id}">${escapeHtml(t("detail.edit"))}</button>
      <button type="button" class="danger-btn" data-detail-action="delete-exam" data-id="${exam.id}">${escapeHtml(t("detail.delete"))}</button>
    </div>
  </div>`;
}

function renderDetailModal() {
  const title = document.getElementById("detail-modal-title");
  const subtitle = document.getElementById("detail-modal-subtitle");
  const body = document.getElementById("detail-modal-body");
  const actions = document.getElementById("detail-modal-actions");
  if (!title || !subtitle || !body || !actions) return;
  const kind = detailState.kind;
  let items = [];
  let content = "";
  let footer = "";

  if (kind === "task" || kind === "todayTask") {
    const task = tasks.find((item) => item.id === detailState.id);
    if (!task) {
      detailState = { kind: "", id: "" };
      closeDetailModal();
      return;
    }
    title.textContent = t("detail.taskTitle");
    subtitle.textContent = task.due ? formatDate(task.due) : "";
    content = detailTaskRow(task) +
      `<div class="detail-note">${escapeHtml(t("detail.schedule"))}: ${escapeHtml(task.startTime ? task.startTime + "–" + task.endTime : t("detail.noSchedule"))}</div>` +
      `<div class="detail-note">${escapeHtml(t("detail.reminders"))}: ${escapeHtml(task.alarm || task.notify ? t("detail.on") : t("detail.off"))}</div>` +
      taskScheduleChips(task, 12);
    footer = `<button type="button" class="secondary-btn" data-detail-action="edit-breaks" data-id="${task.id}">${escapeHtml(t("detail.editBreaks"))}</button>`;
  } else if (kind === "exam") {
    const exam = exams.find((item) => item.id === detailState.id);
    if (!exam) {
      detailState = { kind: "", id: "" };
      closeDetailModal();
      return;
    }
    title.textContent = t("detail.examTitle");
    subtitle.textContent = formatDate(exam.date);
    const linked = tasks.filter((task) => task.examId === exam.id);
    content = detailExamRow(exam) + (linked.length
      ? `<h4 class="detail-heading">${escapeHtml(t("detail.pending"))}</h4>` + linked.map(detailTaskRow).join("")
      : `<p class="detail-empty">${escapeHtml(t("detail.empty"))}</p>`);
  } else if (kind === "pending" || kind === "doneTasks") {
    items = kind === "pending" ? tasks.filter((task) => !task.completed) : tasks.filter((task) => task.completed);
    title.textContent = t("detail." + kind);
    subtitle.textContent = t("detail.subtitle", { n: items.length });
    content = items.length ? items.map(detailTaskRow).join("") : `<p class="detail-empty">${escapeHtml(t("detail.empty"))}</p>`;
    footer = `<button type="button" class="secondary-btn" data-detail-action="open-tab" data-tab="tasks">${escapeHtml(t("detail.openTasks"))}</button>`;
  } else if (kind === "upcoming" || kind === "completedExams") {
    items = kind === "upcoming"
      ? upcomingExams()
      : exams.filter((exam) => exam.completed).sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0));
    title.textContent = t("detail." + kind);
    subtitle.textContent = t("detail.subtitle", { n: items.length });
    content = items.length ? items.map(detailExamRow).join("") : `<p class="detail-empty">${escapeHtml(t("detail.empty"))}</p>`;
    footer = `<button type="button" class="secondary-btn" data-detail-action="open-tab" data-tab="exams">${escapeHtml(t("detail.openExams"))}</button>`;
  } else if (kind === "daysNext" || kind === "nextExam") {
    const next = upcomingExams()[0];
    title.textContent = t(kind === "daysNext" ? "detail.daysNext" : "detail.nextExam");
    if (!next) {
      subtitle.textContent = "";
      content = `<p class="detail-empty">${escapeHtml(t("noUpcoming"))}</p>`;
    } else {
      const days = Math.max(0, daysUntil(next.date));
      subtitle.textContent = formatDate(next.date);
      content = `<div class="detail-hero"><strong>${escapeHtml(next.subject)}</strong><span>${escapeHtml(days + " " + t(days === 1 ? "day" : "days"))}</span></div>` +
        detailExamRow(next);
      footer = `<button type="button" class="secondary-btn" data-detail-action="open-tab" data-tab="exams">${escapeHtml(t("detail.openExams"))}</button>`;
    }
  } else if (kind === "focusToday") {
    const sessions = pomodoro.sessions.filter((session) => session.date === todayKey() && session.mode === "focus");
    title.textContent = t("detail.focusToday");
    subtitle.textContent = minutesLabel(focusMinutesForDay(todayKey()));
    content = sessions.length
      ? sessions.map((session) => `<div class="detail-item"><div class="detail-item-main"><strong>${escapeHtml(t("tab.focus"))}</strong><p>${minutesLabel(session.minutes)} · ${escapeHtml(new Date(session.at || Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))}</p></div></div>`).join("")
      : `<p class="detail-empty">${escapeHtml(t("detail.empty"))}</p>`;
    footer = `<button type="button" class="secondary-btn" data-detail-action="open-tab" data-tab="focus">${escapeHtml(t("tab.focus"))}</button>`;
  } else if (kind === "streak") {
    const current = calcStreak();
    const best = bestStreak();
    const days = [];
    for (let i = 6; i >= 0; i -= 1) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = dateKey(date);
      days.push({ key, label: weekdayShort(date), minutes: focusMinutesForDay(key), active: activityDays().has(key) });
    }
    title.textContent = t("detail.streak");
    subtitle.textContent = current + " " + t(current === 1 ? "day" : "days");
    content = `<div class="detail-hero"><strong>${current} ${escapeHtml(t(current === 1 ? "day" : "days"))}</strong><span>${escapeHtml(t("detail.streak"))}</span></div>` +
      `<p class="detail-note">${escapeHtml(t("detail.bestStreak"))}: ${escapeHtml(String(best))} ${escapeHtml(t("days"))}</p>` +
      `<div class="detail-days">${days.map((day) => `<div class="detail-day ${day.active ? "active" : ""}"><span>${escapeHtml(day.label)}</span><strong>${day.minutes ? escapeHtml(minutesLabel(day.minutes)) : "—"}</strong></div>`).join("")}</div>`;
  } else if (kind === "cardsDue") {
    const due = flashcards.filter(cardIsDue).sort((a, b) => (a.dueAt || 0) - (b.dueAt || 0));
    title.textContent = t("detail.cardsDue");
    subtitle.textContent = t("detail.subtitle", { n: due.length });
    content = due.length
      ? due.map((card) => `<div class="detail-item"><div class="detail-item-main"><strong>${escapeHtml(card.front)}</strong><p>${escapeHtml(cardDeckName(card))} · ${escapeHtml(cardDueLabel(card))}</p></div></div>`).join("")
      : `<p class="detail-empty">${escapeHtml(t("cards.study.empty"))}</p>`;
    footer = `<button type="button" class="secondary-btn" data-detail-action="open-tab" data-tab="cards">${escapeHtml(t("detail.openCards"))}</button>`;
  } else {
    closeDetailModal();
    return;
  }

  body.innerHTML = content;
  actions.innerHTML = footer;
}

function openDetail(kind, id) {
  detailState = { kind, id: id || "" };
  renderDetailModal();
  const modal = document.getElementById("detail-modal");
  if (modal) {
    const wasHidden = modal.classList.contains("hidden");
    modal.classList.remove("hidden");
    if (wasHidden) lockBodyScroll();
  }
}

function closeDetailModal() {
  const modal = document.getElementById("detail-modal");
  const wasOpen = modal && !modal.classList.contains("hidden");
  if (modal) modal.classList.add("hidden");
  if (wasOpen) unlockBodyScroll();
  detailState = { kind: "", id: "" };
}

function setupDetailModal() {
  document.addEventListener("click", (event) => {
    const element = event.target.closest("[data-detail]");
    if (!element) return;
    event.preventDefault();
    openDetail(element.getAttribute("data-detail"), element.getAttribute("data-detail-id") || "");
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const element = event.target.closest("[data-detail][role='button']");
    if (!element) return;
    event.preventDefault();
    openDetail(element.getAttribute("data-detail"), element.getAttribute("data-detail-id") || "");
  });
  const modal = document.getElementById("detail-modal");
  if (!modal) return;
  modal.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-detail]")) {
      closeDetailModal();
      return;
    }
    const action = event.target.closest("[data-detail-action]");
    if (!action) return;
    const id = action.getAttribute("data-id");
    const kindAction = action.getAttribute("data-detail-action");
    if (kindAction === "open-tab") {
      closeDetailModal();
      switchTab(action.getAttribute("data-tab"));
      return;
    }
    if (kindAction === "edit-task") {
      closeDetailModal();
      switchTab("tasks");
      startTaskEdit(id, false);
      return;
    }
    if (kindAction === "edit-breaks") {
      closeDetailModal();
      switchTab("tasks");
      startTaskEdit(id, true);
      return;
    }
    if (kindAction === "edit-exam") {
      closeDetailModal();
      switchTab("exams");
      startExamEdit(id);
      return;
    }
    if (kindAction === "toggle-task") {
      const task = tasks.find((item) => item.id === id);
      if (task) {
        task.completed = !task.completed;
        task.completedAt = task.completed ? Date.now() : null;
        if (task.completed) cancelTaskReminders(task.id);
        else syncTaskReminders(task, false);
      }
    } else if (kindAction === "delete-task") {
      if (!confirm(t("delete") + "?")) return;
      cancelTaskReminders(id);
      tasks = tasks.filter((item) => item.id !== id);
      if (editingTaskId === id) resetTaskForm();
    } else if (kindAction === "toggle-exam") {
      const exam = exams.find((item) => item.id === id);
      if (exam) {
        exam.completed = !exam.completed;
        exam.completedAt = exam.completed ? Date.now() : null;
      }
    } else if (kindAction === "delete-exam") {
      if (!confirm(t("delete") + "?")) return;
      exams = exams.filter((item) => item.id !== id);
      tasks.forEach((task) => { if (task.examId === id) task.examId = ""; });
      flashcards.forEach((card) => { if (card.examId === id) card.examId = ""; });
      if (editingExamId === id) clearExamEdit();
    }
    saveData();
    renderAll();
    if (detailState.kind === "task" || detailState.kind === "todayTask" || detailState.kind === "exam") {
      renderDetailModal();
    } else {
      renderDetailModal();
    }
  });
  document.getElementById("detail-modal-close").addEventListener("click", closeDetailModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDetailModal();
  });
}

function renderAll() {
  renderDashboard();
  const active = document.querySelector(".tab-panel.active");
  const tab = active ? active.id : "dashboard";
  if (tab === "exams" || tab === "tasks") {
    renderExams();
    renderTasks();
  } else if (tab === "cards") {
    renderFlashcards();
  } else if (tab === "focus") {
    renderTodaySessions();
    renderSessionDots();
  } else if (tab === "insights") {
    renderInsights();
  }
}

function clearExamEdit() {
  editingExamId = null;
  setText("exam-form-title", t("addExam"));
  setText("exam-submit", t("addExam"));
  document.getElementById("exam-cancel-edit").classList.add("hidden");
}

function clearTaskEdit() {
  editingTaskId = null;
  setText("task-form-title", t("addTask"));
  setText("task-submit", t("addTask"));
  document.getElementById("task-cancel-edit").classList.add("hidden");
}

function resetTaskForm() {
  clearTaskEdit();
  const form = document.getElementById("task-form");
  if (form) form.reset();
  const technique = document.getElementById("task-technique");
  const method = document.getElementById("task-method");
  if (technique) technique.value = "pomodoro";
  if (method) method.value = "none";
  populateTaskExamSelect("");
  breakDraft = [];
  autoTechnique = true;
  const note = document.getElementById("auto-technique-note");
  if (note) note.classList.add("hidden");
  renderBreakList();
  updateSchedulePreview();
  syncPrettySelects();
}

function startExamEdit(id) {
  const exam = exams.find((x) => x.id === id);
  if (!exam) return;
  editingExamId = id;
  document.getElementById("exam-subject").value = exam.subject;
  document.getElementById("exam-date").value = exam.date;
  document.getElementById("exam-notes").value = exam.notes || "";
  document.getElementById("exam-category").value = exam.category || "General";
  setText("exam-form-title", t("editExam"));
  setText("exam-submit", t("saveChanges"));
  document.getElementById("exam-cancel-edit").classList.remove("hidden");
  document.getElementById("exam-subject").focus();
  syncPrettySelects();
}

function startTaskEdit(id, focusBreaks) {
  const task = tasks.find((x) => x.id === id);
  if (!task) return;
  editingTaskId = id;
  populateTaskExamSelect(task.examId || "");
  document.getElementById("task-text").value = task.text;
  document.getElementById("task-priority").value = ["low", "medium", "high"].includes(task.priority) ? task.priority : "medium";
  document.getElementById("task-due").value = task.due || "";
  document.getElementById("task-start-date").value = task.startDate || "";
  document.getElementById("task-start-time").value = task.startTime || "";
  document.getElementById("task-end-time").value = task.endTime || "";
  document.getElementById("task-technique").value = TECHNIQUES[task.technique] ? task.technique : "pomodoro";
  document.getElementById("task-method").value = STUDY_METHODS.includes(task.method) ? task.method : "none";
  document.getElementById("task-alarm").checked = Boolean(task.alarm);
  document.getElementById("task-notify").checked = Boolean(task.notify);
  breakDraft = (task.breaks || []).map((item) => makeBreakDraft(item.label, item.start, item.end));
  autoTechnique = false;
  renderBreakList();
  updateSchedulePreview();
  setText("task-form-title", t("editTask"));
  setText("task-submit", t("saveChanges"));
  document.getElementById("task-cancel-edit").classList.remove("hidden");
  if (focusBreaks) {
    document.getElementById("task-text").focus();
    const breakList = document.getElementById("break-list");
    if (breakList) breakList.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    document.getElementById("task-text").focus();
  }
  syncPrettySelects();
}

function setupTaskPlanner() {
  const addButton = document.getElementById("add-break");
  if (addButton) addButton.addEventListener("click", addBreakDraft);
  const autoButton = document.getElementById("auto-plan-breaks");
  if (autoButton) autoButton.addEventListener("click", autoPlanBreaks);
  const breakList = document.getElementById("break-list");
  if (breakList) {
    breakList.addEventListener("click", (e) => {
      const remove = e.target.closest("[data-break-remove]");
      if (!remove) return;
      syncBreakDraftFromDom();
      breakDraft = breakDraft.filter((item) => item.id !== remove.getAttribute("data-break-remove"));
      renderBreakList();
      updateSchedulePreview();
    });
    breakList.addEventListener("input", () => updateSchedulePreview());
  }
  document.querySelectorAll("[data-quick-break]").forEach((button) => {
    button.addEventListener("click", () => addQuickBreak(button.getAttribute("data-quick-break")));
  });
  ["task-start-time", "task-end-time", "task-technique", "task-method"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("change", () => {
      if (id === "task-technique") autoTechnique = false;
      updateSchedulePreview();
    });
  });
  const alarm = document.getElementById("task-alarm");
  if (alarm) {
    alarm.addEventListener("change", () => {
      if (alarm.checked) showToast(t("reminderPending"));
    });
  }
  const notify = document.getElementById("task-notify");
  if (notify) {
    notify.addEventListener("change", () => {
      const bridge = nativeReminder();
      if (notify.checked && bridge && typeof bridge.areNotificationsEnabled === "function" && !bridge.areNotificationsEnabled()) {
        showToast(t("reminderPermission"));
      } else if (notify.checked && !bridge) {
        showToast(t("reminderNotSupported"));
      }
    });
  }
  renderBreakList();
  updateSchedulePreview();
}

function resetCardForm() {
  editingCardId = null;
  const form = document.getElementById("card-form");
  if (form) form.reset();
  setText("card-form-title", t("cards.addCard"));
  setText("card-submit", t("cards.addCard"));
  const cancel = document.getElementById("card-cancel-edit");
  if (cancel) cancel.classList.add("hidden");
  populateCardExamSelect("");
}

function startCardEdit(id) {
  const card = flashcards.find((item) => item.id === id);
  if (!card) return;
  editingCardId = id;
  const front = document.getElementById("card-front");
  const back = document.getElementById("card-back");
  const deck = document.getElementById("card-deck");
  if (front) front.value = card.front;
  if (back) back.value = card.back;
  if (deck) deck.value = card.deck || "";
  populateCardExamSelect(card.examId || "");
  setText("card-form-title", t("cards.editCard"));
  setText("card-submit", t("saveChanges"));
  const cancel = document.getElementById("card-cancel-edit");
  if (cancel) cancel.classList.remove("hidden");
  if (front) front.focus();
  syncPrettySelects();
}

function setupFlashcards() {
  const form = document.getElementById("card-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const front = document.getElementById("card-front").value.trim();
    const back = document.getElementById("card-back").value.trim();
    const deck = document.getElementById("card-deck").value.trim();
    const examId = document.getElementById("card-exam").value;
    if (!front || !back) {
      showToast(t("cards.needBoth"), "error");
      return;
    }
    if (editingCardId) {
      const card = flashcards.find((item) => item.id === editingCardId);
      if (card) {
        Object.assign(card, { front, back, deck, examId, updatedAt: Date.now() });
        const index = flashcards.findIndex((item) => item.id === card.id);
        if (index >= 0) flashcards[index] = normalizeFlashcard(card);
      }
      showToast(t("cards.updated"), "success");
    } else {
      flashcards.push(normalizeFlashcard({
        id: uid(),
        front,
        back,
        deck,
        examId,
        createdAt: Date.now(),
        dueAt: Date.now()
      }));
      showToast(t("cards.added"), "success");
    }
    saveData();
    resetCardForm();
    renderAll();
  });

  const cancel = document.getElementById("card-cancel-edit");
  if (cancel) cancel.addEventListener("click", resetCardForm);

  const reviewDue = document.getElementById("cards-review-due");
  if (reviewDue) reviewDue.addEventListener("click", () => startCardStudy());

  const list = document.getElementById("card-list");
  if (list) {
    list.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-action]");
      if (!button) return;
      const action = button.getAttribute("data-action");
      const id = button.getAttribute("data-id");
      if (action === "study-card") {
        startCardStudy(id);
        return;
      }
      if (action === "edit-card") {
        startCardEdit(id);
        switchTab("cards");
        return;
      }
      if (action === "delete-card") {
        if (!confirm(t("cards.deleteConfirm"))) return;
        flashcards = flashcards.filter((card) => card.id !== id);
        if (editingCardId === id) resetCardForm();
        if (studyState.queue.indexOf(id) >= 0) {
          studyState.queue = studyState.queue.filter((cardId) => cardId !== id);
          studyState.total = studyState.reviewed + studyState.queue.length;
          if (studyState.open) renderStudy();
        }
        saveData();
        renderAll();
        showToast(t("cards.deleted"), "success");
      }
    });
  }

  const search = document.getElementById("card-search");
  if (search) {
    search.addEventListener("input", (event) => {
      ui.cardSearch = event.target.value;
      clearTimeout(cardSearchRenderTimer);
      cardSearchRenderTimer = setTimeout(() => renderFlashcards(), 250);
    });
  }
  const deckFilter = document.getElementById("card-deck-filter");
  if (deckFilter) {
    deckFilter.addEventListener("change", (event) => {
      ui.cardDeck = event.target.value;
      renderFlashcards();
    });
  }
  const statusFilter = document.getElementById("card-status-filter");
  if (statusFilter) {
    statusFilter.addEventListener("change", (event) => {
      ui.cardFilter = event.target.value;
      renderFlashcards();
    });
  }

  const studyCard = document.getElementById("study-card");
  if (studyCard) studyCard.addEventListener("click", revealStudyCard);
  const reveal = document.getElementById("study-reveal");
  if (reveal) reveal.addEventListener("click", revealStudyCard);
  const grade = document.getElementById("study-grade");
  if (grade) {
    grade.addEventListener("click", (event) => {
      const button = event.target.closest("[data-grade]");
      if (!button) return;
      gradeStudyCard(button.getAttribute("data-grade"));
    });
  }
  const close = document.getElementById("study-modal-close");
  if (close) close.addEventListener("click", closeStudyModal);
  const doneBtn = document.getElementById("study-done-btn");
  if (doneBtn) doneBtn.addEventListener("click", closeStudyModal);
  const emptyBtn = document.getElementById("study-empty-btn");
  if (emptyBtn) emptyBtn.addEventListener("click", closeStudyModal);
  const modal = document.getElementById("study-modal");
  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target && event.target.getAttribute("data-close-study") === "true") closeStudyModal();
    });
  }
  document.addEventListener("keydown", (event) => {
    if (!studyState.open) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeStudyModal();
      return;
    }
    const target = event.target;
    if (target && ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"].includes(target.tagName)) return;
    if ((event.key === " " || event.key === "Enter") && studyCurrentCard() && !studyState.flipped) {
      event.preventDefault();
      revealStudyCard();
    }
  });
}

function setupForms() {
  document.getElementById("exam-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const subject = document.getElementById("exam-subject").value.trim();
    const date = document.getElementById("exam-date").value;
    const notes = document.getElementById("exam-notes").value.trim();
    const category = document.getElementById("exam-category").value;
    if (!subject || !date) return;

    if (!editingExamId && daysUntil(date) >= 0 && upcomingExams().length >= EXAM_LIMIT) {
      showToast(t("examLimitToast", { max: EXAM_LIMIT }), "error");
      return;
    }

    if (editingExamId) {
      const exam = exams.find((x) => x.id === editingExamId);
      if (exam) Object.assign(exam, { subject, date, notes, category });
      showToast(t("examUpdated"), "success");
      clearExamEdit();
    } else {
      exams.push({ id: uid(), subject, date, notes, category, completed: false, createdAt: Date.now() });
      showToast(t("examAdded"), "success");
    }
    saveData();
    e.target.reset();
    renderAll();
    syncPrettySelects();
  });

  document.getElementById("task-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const text = document.getElementById("task-text").value.trim();
    const priority = document.getElementById("task-priority").value;
    const due = document.getElementById("task-due").value;
    const examId = document.getElementById("task-exam").value;
    const startDate = document.getElementById("task-start-date").value;
    const startTime = document.getElementById("task-start-time").value;
    const endTime = document.getElementById("task-end-time").value;
    const technique = document.getElementById("task-technique").value;
    const method = document.getElementById("task-method").value;
    const alarm = document.getElementById("task-alarm").checked;
    const notify = document.getElementById("task-notify").checked;
    if (!text) return;

    syncBreakDraftFromDom();
    const startMin = parseTimeToMinutes(startTime);
    const endMin = parseTimeToMinutes(endTime);
    if ((startTime || endTime) && (!startTime || !endTime)) {
      showToast(t("needTimeWindow"), "error");
      return;
    }
    if (startTime && endTime && !startDate) {
      showToast(t("needStartDate"), "error");
      return;
    }
    if (startTime && endTime && (!Number.isFinite(startMin) || !Number.isFinite(endMin) || endMin <= startMin)) {
      showToast(t("invalidTimeWindow"), "error");
      return;
    }
    const hasBreaks = breakDraft.some((item) => item.label || item.start || item.end);
    if (hasBreaks && (!startTime || !endTime)) {
      showToast(t("needTimeWindow"), "error");
      return;
    }
    if (!validateBreakDraft()) {
      showToast(t("invalidBreak"), "error");
      return;
    }
    if ((alarm || notify) && !startDate) {
      showToast(t("needStartDate"), "error");
      return;
    }
    if ((alarm || notify) && !startTime) {
      showToast(t("needTimeWindow"), "error");
      return;
    }

    const payload = {
      text,
      priority,
      due,
      examId,
      startDate,
      startTime,
      endTime,
      technique: TECHNIQUES[technique] ? technique : "pomodoro",
      method: STUDY_METHODS.includes(method) ? method : "none",
      breaks: breakDraft
        .filter((item) => item.label || item.start || item.end)
        .map((item) => ({ id: item.id, label: item.label, start: item.start, end: item.end })),
      alarm,
      notify
    };

    let savedTask = null;
    if (editingTaskId) {
      const task = tasks.find((x) => x.id === editingTaskId);
      if (task) {
        Object.assign(task, payload);
        savedTask = normalizeTask(task);
        const index = tasks.findIndex((x) => x.id === task.id);
        if (index >= 0) tasks[index] = savedTask;
      }
      showToast(t("taskUpdated"), "success");
    } else {
      savedTask = normalizeTask({ ...payload, id: uid(), completed: false, createdAt: Date.now() });
      tasks.push(savedTask);
      showToast(t("taskAdded"), "success");
    }

    if (savedTask) syncTaskReminders(savedTask, true);
    saveData();
    resetTaskForm();
    renderAll();
  });

  document.getElementById("exam-cancel-edit").addEventListener("click", () => {
    clearExamEdit();
    document.getElementById("exam-form").reset();
  });
  document.getElementById("task-cancel-edit").addEventListener("click", () => {
    resetTaskForm();
  });
}

function setupActions() {
  document.getElementById("exam-list").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const { action, id } = btn.dataset;
    if (action === "toggle-exam") {
      const exam = exams.find((x) => x.id === id);
      if (exam) {
        exam.completed = !exam.completed;
        exam.completedAt = exam.completed ? Date.now() : null;
      }
    } else if (action === "delete-exam") {
      exams = exams.filter((x) => x.id !== id);
      tasks.forEach((task) => {
        if (task.examId === id) task.examId = "";
      });
      flashcards.forEach((card) => {
        if (card.examId === id) card.examId = "";
      });
      if (editingExamId === id) clearExamEdit();
    } else if (action === "edit-exam") {
      startExamEdit(id);
      return;
    }
    saveData();
    renderAll();
  });

  document.getElementById("task-list").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const { action, id } = btn.dataset;
    if (action === "toggle-task") {
      const task = tasks.find((x) => x.id === id);
      if (task) {
        task.completed = !task.completed;
        task.completedAt = task.completed ? Date.now() : null;
        if (task.completed) cancelTaskReminders(task.id);
        else syncTaskReminders(task, false);
      }
    } else if (action === "delete-task") {
      cancelTaskReminders(id);
      tasks = tasks.filter((x) => x.id !== id);
      if (editingTaskId === id) resetTaskForm();
    } else if (action === "edit-task") {
      startTaskEdit(id, false);
      return;
    } else if (action === "edit-breaks") {
      startTaskEdit(id, true);
      return;
    }
    saveData();
    renderAll();
  });

  document.getElementById("clear-completed").addEventListener("click", () => {
    const count = tasks.filter((t) => t.completed).length;
    if (!count) {
      showToast(t("noCompletedToClear"));
      return;
    }
    if (!confirm(t("confirmClear", { n: count }))) return;
    tasks.filter((task) => task.completed).forEach((task) => cancelTaskReminders(task.id));
    tasks = tasks.filter((task) => !task.completed);
    if (editingTaskId) resetTaskForm();
    saveData();
    renderAll();
    showToast(t("completedCleared"), "success");
  });
}

function setupFilters() {
  document.getElementById("exam-search").addEventListener("input", (e) => {
    ui.examSearch = e.target.value;
    renderExams();
  });
  document.getElementById("exam-filter").addEventListener("change", (e) => {
    ui.examFilter = e.target.value;
    renderExams();
  });
  document.getElementById("task-search").addEventListener("input", (e) => {
    ui.taskSearch = e.target.value;
    clearTimeout(taskSearchRenderTimer);
    taskSearchRenderTimer = setTimeout(() => renderTasks(), 250);
  });
  document.getElementById("task-filter").addEventListener("change", (e) => {
    ui.taskFilter = e.target.value;
    renderTasks();
  });
}

const prettySelectStates = new Map();
let openPrettySelectState = null;

function syncPrettySelectState(state) {
  if (!state) return;
  const select = state.select;
  const option = select.options[select.selectedIndex];
  state.label.textContent = option ? option.textContent.trim() : "";
  state.wrap.classList.toggle("is-disabled", select.disabled);
  state.wrap.classList.toggle("has-value", Boolean(select.value));
  state.trigger.disabled = select.disabled;
  if (openPrettySelectState === state) buildPrettySelectMenu(state);
}

function syncPrettySelects() {
  prettySelectStates.forEach((state) => syncPrettySelectState(state));
}

function closePrettySelectMenu() {
  if (!openPrettySelectState) return;
  const state = openPrettySelectState;
  openPrettySelectState = null;
  if (state.menu && state.menu.parentNode) state.menu.parentNode.removeChild(state.menu);
  state.menu = null;
  state.wrap.classList.remove("open");
  state.trigger.setAttribute("aria-expanded", "false");
}

function choosePrettyOption(state, index) {
  const select = state.select;
  if (index < 0 || index >= select.options.length) return;
  select.selectedIndex = index;
  try {
    select.dispatchEvent(new Event("input", { bubbles: true }));
    select.dispatchEvent(new Event("change", { bubbles: true }));
  } catch (e) {
  }
  syncPrettySelectState(state);
  closePrettySelectMenu();
  state.trigger.focus();
}

function focusPrettyOption(state, index) {
  if (!state.menu) return;
  const options = state.menu.querySelectorAll(".pretty-option:not([disabled])");
  if (!options.length) return;
  const next = Math.max(0, Math.min(index, options.length - 1));
  options[next].focus();
}

function buildPrettySelectMenu(state) {
  closePrettySelectMenu();
  const select = state.select;
  const rect = state.trigger.getBoundingClientRect();
  const menu = document.createElement("div");
  menu.className = "pretty-select-menu";
  menu.setAttribute("role", "listbox");
  menu.setAttribute("aria-label", state.trigger.getAttribute("aria-label") || "");

  Array.from(select.options).forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pretty-option";
    button.dataset.index = String(index);
    button.setAttribute("role", "option");
    button.setAttribute("aria-selected", index === select.selectedIndex ? "true" : "false");
    button.disabled = option.disabled;
    const check = document.createElement("span");
    check.className = "pretty-option-check";
    check.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7"></path></svg>';
    const text = document.createElement("span");
    text.className = "pretty-option-text";
    text.textContent = option.textContent.trim();
    button.appendChild(check);
    button.appendChild(text);
    menu.appendChild(button);
  });

  menu.style.width = Math.max(170, Math.round(rect.width)) + "px";
  menu.style.top = "-9999px";
  menu.style.left = "-9999px";
  document.body.appendChild(menu);

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const menuHeight = menu.offsetHeight;
  const menuWidth = menu.offsetWidth;
  const spaceBelow = viewportHeight - rect.bottom - 10;
  const spaceAbove = rect.top - 10;
  let top = rect.bottom + 6;
  if (menuHeight > spaceBelow && spaceAbove > spaceBelow) top = rect.top - menuHeight - 6;
  top = Math.max(8, Math.min(top, viewportHeight - menuHeight - 8));
  let left = Math.max(8, Math.min(rect.left, viewportWidth - menuWidth - 8));
  menu.style.top = Math.round(top) + "px";
  menu.style.left = Math.round(left) + "px";

  menu.addEventListener("click", (event) => {
    const option = event.target.closest(".pretty-option");
    if (!option) return;
    choosePrettyOption(state, Number(option.dataset.index));
  });
  menu.addEventListener("keydown", (event) => {
    const buttons = Array.from(menu.querySelectorAll(".pretty-option:not([disabled])"));
    const current = buttons.indexOf(document.activeElement);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = buttons[Math.min(buttons.length - 1, current + 1)];
      if (next) next.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const prev = buttons[Math.max(0, current - 1)];
      if (prev) prev.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      if (buttons[0]) buttons[0].focus();
    } else if (event.key === "End") {
      event.preventDefault();
      if (buttons.length) buttons[buttons.length - 1].focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      closePrettySelectMenu();
      state.trigger.focus();
    }
  });

  state.menu = menu;
  openPrettySelectState = state;
  state.wrap.classList.add("open");
  state.trigger.setAttribute("aria-expanded", "true");

  const selected = menu.querySelector('.pretty-option[aria-selected="true"]');
  if (selected) {
    try { selected.focus({ preventScroll: true }); } catch (e) { selected.focus(); }
    if (typeof selected.scrollIntoView === "function") {
      selected.scrollIntoView({ block: "nearest" });
    }
  }
}

function enhancePrettySelect(select) {
  if (!select || select.dataset.prettyReady === "true") return null;
  select.dataset.prettyReady = "true";
  const wrap = document.createElement("div");
  wrap.className = "pretty-select";
  select.parentNode.insertBefore(wrap, select);
  wrap.appendChild(select);
  select.classList.add("pretty-native");

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "pretty-select-trigger";
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-expanded", "false");
  const label = document.createElement("span");
  label.className = "pretty-select-label";
  const chevron = document.createElement("span");
  chevron.className = "pretty-select-chevron";
  chevron.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>';
  trigger.appendChild(label);
  trigger.appendChild(chevron);
  wrap.appendChild(trigger);

  const state = { select, wrap, trigger, label, menu: null };
  prettySelectStates.set(select, state);

  select.addEventListener("change", () => syncPrettySelectState(state));
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (select.disabled) return;
    if (openPrettySelectState === state) {
      closePrettySelectMenu();
      return;
    }
    buildPrettySelectMenu(state);
  });
  trigger.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!openPrettySelectState) buildPrettySelectMenu(state);
      const buttons = state.menu ? state.menu.querySelectorAll(".pretty-option:not([disabled])") : [];
      if (buttons.length) buttons[0].focus();
    }
  });

  if (typeof MutationObserver !== "undefined") {
    const observer = new MutationObserver(() => syncPrettySelectState(state));
    observer.observe(select, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["disabled"]
    });
    state.observer = observer;
  }
  syncPrettySelectState(state);
  return state;
}

function setupPrettySelects() {
  document.querySelectorAll("select").forEach((select) => enhancePrettySelect(select));
  document.addEventListener("click", (event) => {
    if (!openPrettySelectState) return;
    if (!openPrettySelectState.wrap.contains(event.target)) closePrettySelectMenu();
  });
  document.addEventListener("reset", () => setTimeout(syncPrettySelects, 0), true);
  window.addEventListener("resize", closePrettySelectMenu);
  window.addEventListener("scroll", closePrettySelectMenu, { passive: true });
}

function setupQuickActions() {
  document.querySelectorAll("[data-quick]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.quick;
      switchTab(tab);
      if (tab === "exams") setTimeout(() => document.getElementById("exam-subject").focus(), 0);
      if (tab === "tasks") setTimeout(() => document.getElementById("task-text").focus(), 0);
      if (tab === "cards") setTimeout(() => startCardStudy(), 0);
      if (tab === "focus") {
        if (timer.mode !== "focus") setMode("focus");
        if (activeTimerMode() !== "focus") startTimer();
      }
    });
  });
  document.getElementById("quick-add-exam").addEventListener("click", () => {
    switchTab("exams");
    setTimeout(() => document.getElementById("exam-subject").focus(), 0);
  });
}

function setupCreateButtons() {
  const examCreate = document.getElementById("exam-create-btn");
  if (examCreate) {
    examCreate.addEventListener("click", () => {
      clearExamEdit();
      switchTab("exams");
      setTimeout(() => document.getElementById("exam-subject").focus(), 60);
    });
  }
  const taskCreate = document.getElementById("task-create-btn");
  if (taskCreate) {
    taskCreate.addEventListener("click", () => {
      resetTaskForm();
      switchTab("tasks");
      setTimeout(() => {
        const form = document.getElementById("task-form");
        if (form) form.scrollIntoView({ block: "start" });
        const field = document.getElementById("task-text");
        if (field) field.focus();
      }, 60);
    });
  }
  const cardCreate = document.getElementById("card-create-btn");
  if (cardCreate) {
    cardCreate.addEventListener("click", () => {
      resetCardForm();
      switchTab("cards");
      setTimeout(() => {
        const form = document.getElementById("card-form");
        if (form) form.scrollIntoView({ block: "start" });
        const field = document.getElementById("card-front");
        if (field) field.focus();
      }, 60);
    });
  }
}

function positionToastContainer() {
  const header = document.querySelector(".app-header");
  const tabs = document.querySelector(".tabs");
  const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
  const tabsBottom = tabs ? tabs.getBoundingClientRect().bottom : 0;
  const top = Math.max(0, Math.round(Math.max(headerBottom, tabsBottom) + 10));
  document.documentElement.style.setProperty("--toast-top", top + "px");
}

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  positionToastContainer();
  const toast = document.createElement("div");
  toast.className = "toast " + type;
  toast.setAttribute("role", "status");
  toast.innerHTML = `<span class="toast-dot"></span><span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("out");
    setTimeout(() => toast.remove(), 220);
  }, 2000);
}

function getThemeMode() {
  try {
    return localStorage.getItem(STORAGE_KEYS.theme) || "auto";
  } catch {
    return "auto";
  }
}

function resolvedTheme(mode) {
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return mode === "dark" || (mode === "auto" && prefersDark) ? "dark" : "light";
}

function applyTheme(mode) {
  const resolved = resolvedTheme(mode);
  document.documentElement.dataset.theme = resolved;
  const toggle = document.getElementById("theme-toggle");
  if (toggle) toggle.setAttribute("aria-label", resolved === "dark" ? t("switchThemeLight") : t("switchThemeDark"));
  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.classList.toggle("active", button.getAttribute("data-theme-choice") === mode);
  });
}

function setTheme(mode) {
  try {
    localStorage.setItem(STORAGE_KEYS.theme, mode);
  } catch {
  }
  applyTheme(mode);
  persistSnapshot();
}

function setupTheme() {
  applyTheme(getThemeMode());
  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = resolvedTheme(getThemeMode()) === "dark" ? "light" : "dark";
      setTheme(next);
      showToast(next === "dark" ? t("darkEnabled") : t("lightEnabled"), "success");
    });
  }
  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = button.getAttribute("data-theme-choice") === "dark" ? "dark" : "light";
      setTheme(next);
      showToast(next === "dark" ? t("darkEnabled") : t("lightEnabled"), "success");
    });
  });
  if (window.matchMedia) {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (getThemeMode() === "auto") applyTheme("auto");
    };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }
}

function activeTimerMode() {
  return timer.running ? (MODES[timer.activeMode] ? timer.activeMode : timer.mode) : null;
}

function timerRemainingFor(mode) {
  if (!timer.saved) timer.saved = timerSavedDefaults();
  if (timer.running && activeTimerMode() === mode && timer.endsAt) {
    return Math.max(0, Math.ceil((timer.endsAt - Date.now()) / 1000));
  }
  const saved = Number(timer.saved[mode]);
  return Number.isFinite(saved) && saved > 0 ? saved : durationFor(mode);
}

function rememberTimerRemaining() {
  if (!timer.saved) timer.saved = timerSavedDefaults();
  const active = activeTimerMode();
  if (active) {
    const left = Math.max(0, Math.ceil((timer.endsAt - Date.now()) / 1000));
    timer.saved[active] = left;
    if (timer.mode === active) timer.remaining = left;
    return left;
  }
  const left = Math.max(0, timer.remaining);
  timer.saved[timer.mode] = left;
  return left;
}

function startTicking() {
  stopTicking();
  if (!timer.running) return;
  timerInterval = setInterval(tick, 1000);
  tick();
}

function stopTicking() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function tick() {
  if (!timer.running || !timer.endsAt) return;
  const active = activeTimerMode() || timer.mode;
  const left = Math.max(0, Math.ceil((timer.endsAt - Date.now()) / 1000));
  if (!timer.saved) timer.saved = timerSavedDefaults();
  if (left !== timer.saved[active]) {
    timer.saved[active] = left;
    if (timer.mode === active) {
      timer.remaining = left;
      renderTimer();
    }
  }
  if (left <= 0) completeSession(true);
}

function startTimer() {
  if (timer.running) {
    if (activeTimerMode() === timer.mode) return;
    pauseTimer();
  }
  if (timer.remaining <= 0) timer.remaining = durationFor(timer.mode);
  if (!timer.saved) timer.saved = timerSavedDefaults();
  timer.activeMode = timer.mode;
  timer.saved[timer.mode] = timer.remaining;
  timer.running = true;
  timer.endsAt = Date.now() + timer.remaining * 1000;
  startNativeTimer();
  saveTimer();
  renderTimer();
  startTicking();
}

function pauseTimer() {
  if (!timer.running) return;
  rememberTimerRemaining();
  timer.running = false;
  timer.activeMode = null;
  timer.endsAt = null;
  stopNativeTimer();
  saveTimer();
  renderTimer();
  stopTicking();
}

function resetTimer() {
  const active = activeTimerMode();
  if (active === timer.mode) {
    timer.running = false;
    timer.activeMode = null;
    timer.endsAt = null;
    stopNativeTimer();
    stopTicking();
  }
  timer.remaining = durationFor(timer.mode);
  if (!timer.saved) timer.saved = timerSavedDefaults();
  timer.saved[timer.mode] = timer.remaining;
  saveTimer();
  renderTimer();
  showToast(t("timerReset"));
}

function setMode(mode) {
  if (!MODES[mode]) return;
  if (!timer.saved) timer.saved = timerSavedDefaults();
  timer.mode = mode;
  timer.remaining = timerRemainingFor(mode);
  saveTimer();
  renderTimer();
}

function completeSession(log) {
  const finishedMode = activeTimerMode() || timer.mode;
  let nextMode;

  timer.running = false;
  timer.activeMode = null;
  timer.endsAt = null;
  stopTicking();
  stopNativeTimer();

  if (log) {
    pomodoro.sessions.push({
      id: uid(),
      date: todayKey(),
      minutes: Math.max(1, Math.round(durationFor(finishedMode) / 60)),
      mode: finishedMode,
      at: Date.now()
    });
    if (finishedMode === "focus") pomodoro.focusCount += 1;
    playChime();
    const timerCard = document.querySelector(".timer-card");
    if (timerCard) {
      timerCard.classList.remove("celebrate");
      void timerCard.offsetWidth;
      timerCard.classList.add("celebrate");
      setTimeout(() => timerCard.classList.remove("celebrate"), 900);
    }
    showToast(finishedMode === "focus" ? t("focusDone") : t("breakDone"), "success");
  }

  if (finishedMode === "focus") {
    nextMode = pomodoro.focusCount % 4 === 0 ? "long" : "short";
  } else {
    nextMode = "focus";
  }

  setMode(nextMode);
  const autoStart = nextMode === "focus" ? pomodoro.settings.autoFocus : pomodoro.settings.autoBreaks;
  if (autoStart && log) startTimer();

  saveData();
  renderAll();
  renderTimer();
}

function playChime(force) {
  if (!force && !pomodoro.settings.sound) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const at = ctx.currentTime + i * 0.18;
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.exponentialRampToValueAtTime(0.12, at + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(at);
      osc.stop(at + 0.18);
    });
    setTimeout(() => ctx.close(), 900);
  } catch {
  }
}

let alarmOverlayInterval = null;
let alarmOverlayState = null;

function parseAlarmState(raw) {
  if (!raw) return null;
  try {
    return typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch {
    return null;
  }
}

function updateAlarmOverlayClock() {
  const now = new Date();
  setText("alarm-overlay-time", pad(now.getHours()) + ":" + pad(now.getMinutes()));
}

function updateAlarmOverlayCountdown() {
  if (!alarmOverlayState) return;
  const stopAt = Number(alarmOverlayState.autoStopAt) || (Date.now() + 60000);
  const seconds = Math.max(0, Math.ceil((stopAt - Date.now()) / 1000));
  setText("alarm-overlay-countdown", t("alarmAutoStop", { n: seconds }));
  if (seconds <= 0) hideAlarmOverlay();
}

function showAlarmOverlay(raw) {
  const state = parseAlarmState(raw);
  if (!state || !state.ringing) {
    hideAlarmOverlay();
    return;
  }
  alarmOverlayState = state;
  const overlay = document.getElementById("alarm-overlay");
  if (!overlay) return;
  setText("alarm-overlay-title", state.title || t("alarmTestTitle"));
  setText("alarm-overlay-body", state.body || "");
  const time = document.getElementById("alarm-overlay-time");
  if (time) time.textContent = state.time || (pad(new Date().getHours()) + ":" + pad(new Date().getMinutes()));
  const snooze = document.getElementById("alarm-overlay-snooze");
  if (snooze) {
    const minutes = Number(state.snoozeMinutes) || Number(pomodoro.settings.alarmSnooze) || 5;
    snooze.textContent = t("alarmSnoozeAction") + " · " + minutes + " " + t("minuteShort");
  }
  overlay.classList.remove("hidden");
  document.body.classList.add("alarm-open");
  updateAlarmOverlayCountdown();
  if (alarmOverlayInterval) clearInterval(alarmOverlayInterval);
  alarmOverlayInterval = setInterval(() => {
    updateAlarmOverlayClock();
    updateAlarmOverlayCountdown();
  }, 1000);
}

function hideAlarmOverlay() {
  alarmOverlayState = null;
  if (alarmOverlayInterval) {
    clearInterval(alarmOverlayInterval);
    alarmOverlayInterval = null;
  }
  const overlay = document.getElementById("alarm-overlay");
  if (overlay) overlay.classList.add("hidden");
  document.body.classList.remove("alarm-open");
}

function stopAlarmFromOverlay() {
  const bridge = nativeAlarm();
  if (bridge) {
    try {
      bridge.stop();
    } catch {
    }
  }
  hideAlarmOverlay();
  showToast(t("alarmStopped"), "success");
}

function snoozeAlarmFromOverlay() {
  const bridge = nativeAlarm();
  if (bridge) {
    try {
      bridge.snooze();
    } catch {
    }
  }
  hideAlarmOverlay();
  showToast(t("alarmSnoozed", { n: Number(pomodoro.settings.alarmSnooze) || 5 }), "success");
}

function testAlarm() {
  const bridge = nativeAlarm();
  syncAlarmSettingsToNative();
  if (bridge) {
    try {
      bridge.test(t("alarmTestTitle"), t("alarmTestBody"), getLanguage());
      return;
    } catch {
    }
  }
  playChime(true);
  showAlarmOverlay({
    ringing: true,
    title: t("alarmTestTitle"),
    body: t("alarmTestBody"),
    autoStopAt: Date.now() + 60000,
    snoozeMinutes: Number(pomodoro.settings.alarmSnooze) || 5
  });
}

function refreshFullScreenAlarmAccess() {
  const button = document.getElementById("alarm-fullscreen-btn");
  if (!button) return;
  const bridge = nativeAlarm();
  let allowed = true;
  if (bridge && typeof bridge.canUseFullScreen === "function") {
    try {
      allowed = !!bridge.canUseFullScreen();
    } catch {
      allowed = true;
    }
  }
  button.classList.toggle("hidden", allowed);
}

function setupAlarmOverlay() {
  const stop = document.getElementById("alarm-overlay-stop");
  if (stop) stop.addEventListener("click", stopAlarmFromOverlay);
  const fullScreen = document.getElementById("alarm-fullscreen-btn");
  if (fullScreen) {
    fullScreen.addEventListener("click", () => {
      const bridge = nativeAlarm();
      if (bridge && typeof bridge.requestFullScreen === "function") {
        try {
          bridge.requestFullScreen();
        } catch {
        }
      }
    });
  }
  const snooze = document.getElementById("alarm-overlay-snooze");
  if (snooze) snooze.addEventListener("click", snoozeAlarmFromOverlay);
  const test = document.getElementById("alarm-test-btn");
  if (test) test.addEventListener("click", testAlarm);

  window.ExamBuddyAlarmFired = (state) => showAlarmOverlay(state);
  window.ExamBuddyAlarmState = (state) => showAlarmOverlay(state);
  window.ExamBuddyAlarmStopped = () => hideAlarmOverlay();
  window.ExamBuddyInAppReminder = (title, body) => {
    if (title) showToast(title, "success");
    else if (body) showToast(body, "info");
  };

  const bridge = nativeAlarm();
  if (bridge) {
    try {
      const state = parseAlarmState(bridge.getState());
      if (state && state.ringing) showAlarmOverlay(state);
    } catch {
    }
  }
  syncAlarmSettingsToNative();
  refreshFullScreenAlarmAccess();
}

let lastSessionDotsFilled = -1;

function renderSessionDots() {
  const filled = timer.mode === "long" ? 4 : pomodoro.focusCount % 4;
  if (filled === lastSessionDotsFilled) return;
  lastSessionDotsFilled = filled;
  const dots = document.getElementById("session-dots");
  if (!dots) return;
  dots.innerHTML = Array.from({ length: 4 }, (_, i) =>
    `<span class="session-dot ${i < filled ? "filled" : ""}"></span>`
  ).join("");
}

function renderTimer() {
  const duration = durationFor(timer.mode);
  const active = activeTimerMode();
  const displayedRunning = Boolean(active && active === timer.mode);
  if (displayedRunning && timer.endsAt) {
    timer.remaining = Math.max(0, Math.ceil((timer.endsAt - Date.now()) / 1000));
  }
  const remaining = Math.max(0, Math.min(timer.remaining, duration));
  setText("timer-time", formatClock(remaining));
  const modeLabel = t(MODES[timer.mode].label);
  setText("timer-mode-label", modeLabel);
  setText(
    "timer-status",
    displayedRunning ? t("timerProgress") : remaining >= duration ? t(MODES[timer.mode].status) : t("timerPaused")
  );

  const ring = document.getElementById("timer-ring-progress");
  if (ring) {
    const offset = String(CIRCUMFERENCE * (1 - remaining / duration));
    if (ring.style.strokeDashoffset !== offset) {
      ring.style.strokeDasharray = String(CIRCUMFERENCE);
      ring.style.strokeDashoffset = offset;
    }
  }

  document.querySelectorAll(".mode-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.mode === timer.mode);
  });
  setText(
    "start-pause",
    displayedRunning ? t("pause") : remaining < duration ? t("resume") : t("startMode", { mode: modeLabel })
  );
  renderSessionDots();
  const nextTitle = active
    ? `${formatClock(timerRemainingFor(active))} · ${t(MODES[active].label)} — ${t("appTitle")}`
    : t("appTitle");
  if (document.title !== nextTitle) document.title = nextTitle;
}

function setupPomodoro() {
  document.querySelectorAll(".mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setMode(btn.dataset.mode);
    });
  });
  document.getElementById("start-pause").addEventListener("click", () => {
    if (activeTimerMode() === timer.mode) pauseTimer();
    else startTimer();
  });
  document.getElementById("reset-timer").addEventListener("click", resetTimer);
  document.getElementById("skip-timer").addEventListener("click", () => completeSession(false));

  document.getElementById("pomodoro-settings").addEventListener("submit", (e) => {
    e.preventDefault();
    ["focus", "short", "long"].forEach((key) => {
      const input = document.getElementById(key + "-duration");
      const value = Number(input.value);
      pomodoro.settings[key] = Number.isFinite(value) && value > 0
        ? Math.min(Math.round(value), key === "focus" ? 180 : 90)
        : DEFAULT_SETTINGS[key];
      input.value = pomodoro.settings[key];
    });
    pomodoro.settings.autoBreaks = document.getElementById("auto-start-breaks").checked;
    pomodoro.settings.autoFocus = document.getElementById("auto-start-focus").checked;
    pomodoro.settings.sound = document.getElementById("sound-enabled").checked;
    const alarmToneInput = document.getElementById("alarm-tone");
    if (alarmToneInput) {
      const tone = Number(alarmToneInput.value);
      pomodoro.settings.alarmTone = Number.isFinite(tone) && tone >= 0 && tone < ALARM_TONE_NAMES.length
        ? Math.round(tone) : 0;
    }
    const alarmVibrateInput = document.getElementById("alarm-vibrate");
    if (alarmVibrateInput) pomodoro.settings.alarmVibrate = alarmVibrateInput.checked;
    const alarmBluetoothInput = document.getElementById("alarm-bluetooth");
    if (alarmBluetoothInput) pomodoro.settings.alarmBluetooth = alarmBluetoothInput.checked;
    const alarmSnoozeInput = document.getElementById("alarm-snooze");
    if (alarmSnoozeInput) {
      const snooze = Number(alarmSnoozeInput.value);
      pomodoro.settings.alarmSnooze = Number.isFinite(snooze) && snooze > 0
        ? Math.min(30, Math.round(snooze)) : 5;
    }

    timer.saved = timerSavedDefaults();
    if (timer.running) {
      const active = activeTimerMode() || timer.mode;
      const left = timer.endsAt
        ? Math.max(0, Math.ceil((timer.endsAt - Date.now()) / 1000))
        : Math.max(0, timer.remaining);
      timer.saved[active] = left;
      if (timer.mode === active) timer.remaining = left;
    } else {
      timer.remaining = durationFor(timer.mode);
      timer.saved[timer.mode] = timer.remaining;
    }
    document.getElementById("focus-duration").value = pomodoro.settings.focus;
    document.getElementById("short-duration").value = pomodoro.settings.short;
    document.getElementById("long-duration").value = pomodoro.settings.long;
    document.getElementById("auto-start-breaks").checked = pomodoro.settings.autoBreaks;
    document.getElementById("auto-start-focus").checked = pomodoro.settings.autoFocus;
    document.getElementById("sound-enabled").checked = pomodoro.settings.sound;
    applyAlarmSettingsToForm();
    syncAlarmSettingsToNative();

    saveData();
    renderTimer();
    if (timer.running) startNativeTimer();
    showToast(t("settingsSaved"), "success");
  });

  document.addEventListener("keydown", (e) => {
    const tag = (e.target.tagName || "").toLowerCase();
    if (["input", "textarea", "select", "button"].includes(tag)) return;
    if (e.code === "Space" && document.getElementById("focus").classList.contains("active")) {
      e.preventDefault();
      if (activeTimerMode() === timer.mode) pauseTimer();
      else startTimer();
    }
  });
}

function applyAlarmSettingsToForm() {
  const tone = document.getElementById("alarm-tone");
  if (tone) tone.value = String(alarmToneValue());
  const vibrate = document.getElementById("alarm-vibrate");
  if (vibrate) vibrate.checked = Boolean(pomodoro.settings.alarmVibrate);
  const bluetooth = document.getElementById("alarm-bluetooth");
  if (bluetooth) bluetooth.checked = pomodoro.settings.alarmBluetooth !== false;
  const snooze = document.getElementById("alarm-snooze");
  if (snooze) snooze.value = String(Number(pomodoro.settings.alarmSnooze) || 5);
  syncPrettySelects();
}

function applySettingsToForm() {
  document.getElementById("focus-duration").value = pomodoro.settings.focus;
  document.getElementById("short-duration").value = pomodoro.settings.short;
  document.getElementById("long-duration").value = pomodoro.settings.long;
  document.getElementById("auto-start-breaks").checked = pomodoro.settings.autoBreaks;
  document.getElementById("auto-start-focus").checked = pomodoro.settings.autoFocus;
  document.getElementById("sound-enabled").checked = pomodoro.settings.sound;
  applyAlarmSettingsToForm();
}

function syncActiveTimerFromClock() {
  const active = activeTimerMode();
  if (!active || !timer.endsAt) return false;
  if (timer.endsAt <= Date.now()) {
    completeSession(true);
    return true;
  }
  const left = Math.max(0, Math.ceil((timer.endsAt - Date.now()) / 1000));
  if (!timer.saved) timer.saved = timerSavedDefaults();
  timer.saved[active] = left;
  if (timer.mode === active) timer.remaining = left;
  return false;
}

function restoreTimer() {
  stopTicking();
  if (timer.running && timer.endsAt) {
    if (!syncActiveTimerFromClock()) {
      startNativeTimer();
      startTicking();
    }
  } else {
    timer.running = false;
    timer.activeMode = null;
    timer.endsAt = null;
    stopNativeTimer();
  }
  renderTimer();
}

function resumeAppTimer() {
  if (!timer.running || !timer.endsAt) {
    renderTimer();
    return;
  }
  if (syncActiveTimerFromClock()) return;
  renderTimer();
  startNativeTimer();
  startTicking();
}

window.ExamBuddyOnResume = resumeAppTimer;

function resumeReminders() {
  syncAlarmSettingsToNative();
  refreshFullScreenAlarmAccess();
  syncAllTaskReminders();
  checkTaskReminders();
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopTicking();
    stopCountdownLoop();
    return;
  }
  resumeAppTimer();
  resumeReminders();
  refreshPermissionUi();
  const panel = document.getElementById("dashboard");
  if (panel && panel.classList.contains("active")) startCountdownLoop();
});
window.addEventListener("pageshow", () => {
  resumeAppTimer();
  resumeReminders();
});
window.addEventListener("focus", () => {
  if (document.visibilityState !== "hidden") {
    resumeAppTimer();
    resumeReminders();
  }
});

function setupBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;
  let ticking = false;
  const update = () => {
    ticking = false;
    btn.classList.toggle("show", window.scrollY > 320);
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  update();
  btn.addEventListener("click", () => scrollToTop());
}

function openAboutModal(kind) {
  const modal = document.getElementById("about-modal");
  const title = document.getElementById("about-modal-title");
  const body = document.getElementById("about-modal-body");
  if (!modal || !title || !body) return;
  if (kind === "privacy") {
    title.textContent = t("about.privacy");
    body.innerHTML = `
      <p><strong>Exam Buddy Pro</strong> is designed to keep your study data private on this device.</p>
      <p>We store your exams, tasks, focus sessions, settings, and language preference locally on your device so the app can work for you. Data is saved automatically to app private storage.</p>
      <p>We do not create accounts, we do not run our own servers for your study data, and we do not sell your personal information.</p>
      <p>When you tap external links (WhatsApp, Email, Website, YouTube), those services open outside the app and are governed by their own privacy policies.</p>
    `;
  } else {
    title.textContent = t("about.licences");
    body.innerHTML = `
      <p><strong>Exam Buddy Pro</strong> — Version 2.2.0</p>
      <p>Developed by Dakshan Bhashna.</p>
      <ul>
        <li>Built with HTML, CSS, and JavaScript.</li>
        <li>Packaged as an Android app with a native WebView shell.</li>
        <li>Uses system fonts and inline SVG icons created for this project.</li>
        <li>Alarm ringtones are CC0 public-domain sounds from Wikimedia Commons: “Alarm Clock” and “Mechanical Clock Ring” by Yoo-toob-FX / Directory.Audio, and “Alarm Alert sound in United States 2025” by Ranch9613.</li>
      </ul>
      <p>Thank you for using Exam Buddy Pro.</p>
    `;
  }
  const wasHidden = modal.classList.contains("hidden");
  modal.classList.remove("hidden");
  if (wasHidden) lockBodyScroll();
}

function closeAboutModal() {
  const modal = document.getElementById("about-modal");
  if (!modal || modal.classList.contains("hidden")) return;
  modal.classList.add("hidden");
  unlockBodyScroll();
}

function setupExternalLinks() {
  document.addEventListener("click", (e) => {
    const link = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!link) return;
    const href = link.getAttribute("href") || "";
    if (!href || href.charAt(0) === "#") return;
    const scheme = href.split(":")[0].toLowerCase();
    const external = link.getAttribute("data-external-link") === "true" ||
      scheme === "mailto" || scheme === "tel" ||
      scheme === "http" || scheme === "https";
    if (!external) return;
    try {
      const resolved = new URL(href, window.location.href);
      if (resolved.host === "exam-buddy.local") return;
    } catch {
    }
    e.preventDefault();
    try {
      window.location.href = href;
    } catch {
      window.open(href, "_self");
    }
  }, true);
}

function setupAutoSave() {
  let last = 0;
  const flush = (force) => {
    const now = Date.now();
    if (!force && now - last < 1200) return;
    last = now;
    try { persistSnapshot(false); } catch {}
  };
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) flush(true);
    else flush(false);
  });
  window.addEventListener("pagehide", () => flush(true));
  window.addEventListener("beforeunload", () => flush(true));
  window.addEventListener("blur", () => flush(true));
  setInterval(() => flush(false), 10000);
}

function hideSplash() {
  const splash = document.getElementById("app-splash");
  if (!splash || splash.classList.contains("done")) return;
  splash.classList.add("done");
  setTimeout(() => { if (splash.parentNode) splash.remove(); }, 500);
  setTimeout(maybeShowPermissionOnboarding, 700);
  setTimeout(runStartupUpdateCheck, 180);
}

function runStartupUpdateCheck() {
  if (startupUpdateChecked) return;
  startupUpdateChecked = true;
  checkForUpdates(false, { startup: true });
}

const SPLASH_DURATION_MS = 1200;

function setupSplash() {
  const navStart = window.performance && performance.timing && performance.timing.navigationStart;
  const start = Number.isFinite(navStart) && navStart > 0 ? navStart : Date.now();
  const wait = Math.max(0, SPLASH_DURATION_MS - (Date.now() - start));
  setTimeout(hideSplash, wait);
  setTimeout(hideSplash, SPLASH_DURATION_MS + 600);
}

function setupAbout() {
  const privacy = document.getElementById("about-privacy-btn");
  const licences = document.getElementById("about-licences-btn");
  if (privacy) privacy.addEventListener("click", () => openAboutModal("privacy"));
  if (licences) licences.addEventListener("click", () => openAboutModal("licences"));
  const close = document.getElementById("about-modal-close");
  if (close) close.addEventListener("click", closeAboutModal);
  const modal = document.getElementById("about-modal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target && e.target.getAttribute("data-close-modal") === "true") closeAboutModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAboutModal();
  });
}

function changelogFor(manifest) {
  const source = manifest && manifest.changelog && typeof manifest.changelog === "object" ? manifest.changelog : {};
  const lang = getLanguage();
  if (Array.isArray(source[lang]) && source[lang].length) return source[lang];
  if (Array.isArray(source.en) && source.en.length) return source.en;
  if (Array.isArray(manifest && manifest.notes)) return manifest.notes;
  return [];
}

function openUpdateModal(info) {
  const modal = document.getElementById("update-modal");
  if (!modal || !info) return;
  const version = info.versionName || String(info.versionCode || "");
  setText("update-modal-version", version ? "v" + version : "");
  setText("update-modal-current", t("update.current", { version: APP_VERSION_NAME }));
  setText("update-modal-body", t("update.newVersion", { version: version }));
  setText("update-modal-changelog-title", t("update.changelogTitle"));
  const list = document.getElementById("update-modal-changelog");
  if (list) {
    list.innerHTML = "";
    changelogFor(info).forEach((line) => {
      const item = document.createElement("li");
      item.textContent = line;
      list.appendChild(item);
    });
  }
  const button = document.getElementById("update-now-btn");
  if (button) {
    button.disabled = false;
    button.textContent = t("update.now");
  }
  const progress = document.getElementById("update-progress");
  if (progress) progress.classList.add("hidden");
  const hint = document.getElementById("update-install-hint");
  if (hint) hint.classList.add("hidden");
  const notes = document.getElementById("update-notes-link");
  if (notes) {
    notes.setAttribute("href", info.releaseNotesUrl || UPDATE_CONFIG.releaseNotesUrl);
    notes.textContent = t("update.releasePage");
  }
  const later = document.getElementById("update-later-btn");
  if (later) later.textContent = t("update.later");
  const wasHidden = modal.classList.contains("hidden");
  modal.classList.remove("hidden");
  if (wasHidden) lockBodyScroll();
}

function closeUpdateModal() {
  const modal = document.getElementById("update-modal");
  if (!modal || modal.classList.contains("hidden")) return;
  modal.classList.add("hidden");
  unlockBodyScroll();
  if (pendingStartupPermissions) {
    pendingStartupPermissions = false;
    maybeShowPermissionOnboarding();
  }
}

function isTrustedUpdateUrl(raw) {
  try {
    const url = new URL(String(raw || ""));
    if (url.protocol !== "https:") return false;
    const host = url.hostname.toLowerCase();
    return host === "github.com" || host === "raw.githubusercontent.com" || host.endsWith(".githubusercontent.com");
  } catch {
    return false;
  }
}

function setUpdateProgress(percent, text) {
  const wrap = document.getElementById("update-progress");
  const fill = document.getElementById("update-progress-fill");
  const label = document.getElementById("update-progress-text");
  if (wrap) wrap.classList.remove("hidden");
  if (fill) fill.style.width = Math.max(0, Math.min(100, percent)) + "%";
  if (label) label.textContent = text || "";
}

function updateInstallHint(show) {
  const hint = document.getElementById("update-install-hint");
  if (hint) hint.classList.toggle("hidden", !show);
}

function startAppUpdate() {
  if (!pendingUpdate) return;
  const url = pendingUpdate.apkUrl;
  if (!isTrustedUpdateUrl(url)) {
    showToast(t("update.badUrl"), "error");
    return;
  }
  if (!/\.apk(\?|$)/i.test(String(url))) {
    window.open(pendingUpdate.releaseNotesUrl || UPDATE_CONFIG.releaseNotesUrl, "_blank", "noopener");
    return;
  }
  const bridge = nativeUpdate();
  if (bridge && typeof bridge.downloadAndInstall === "function") {
    const button = document.getElementById("update-now-btn");
    if (button) {
      button.disabled = true;
      button.textContent = t("update.downloading");
    }
    setUpdateProgress(0, t("update.downloading"));
    try {
      bridge.downloadAndInstall(url, pendingUpdate.versionName || String(pendingUpdate.versionCode || ""));
    } catch {
      showToast(t("update.failedInstall"), "error");
      if (button) {
        button.disabled = false;
        button.textContent = t("update.now");
      }
    }
    return;
  }
  updateInstallHint(true);
  setUpdateProgress(100, t("update.downloadOnly"));
  window.open(url, "_blank", "noopener");
}

window.ExamBuddyUpdateStatus = function (raw) {
  let info = {};
  try { info = typeof raw === "string" ? JSON.parse(raw) : (raw || {}); } catch { info = {}; }
  const state = String(info.state || "");
  const progress = Number(info.progress);
  const button = document.getElementById("update-now-btn");
  if (state === "downloading") {
    setUpdateProgress(Number.isFinite(progress) ? progress : 0, t("update.downloadProgress", { p: Number.isFinite(progress) ? Math.round(progress) : 0 }));
    updateInstallHint(false);
    if (button) {
      button.disabled = true;
      button.textContent = t("update.downloading");
    }
  } else if (state === "permission") {
    setUpdateProgress(0, t("update.permission"));
    updateInstallHint(true);
    if (button) {
      button.disabled = false;
      button.textContent = t("update.now");
    }
    showToast(t("update.permission"), "info");
  } else if (state === "installing" || state === "ready") {
    setUpdateProgress(100, t("update.installing"));
    updateInstallHint(true);
    if (button) {
      button.disabled = false;
      button.textContent = t("update.now");
    }
    showToast(t("update.ready"), "success");
  } else if (state === "error") {
    setUpdateProgress(0, t("update.failedInstall"));
    updateInstallHint(false);
    if (button) {
      button.disabled = false;
      button.textContent = t("update.now");
    }
    showToast(t("update.failedInstall"), "error");
  }
};

function requestUpdateManifest() {
  return new Promise((resolve, reject) => {
    const url = UPDATE_CONFIG.manifestUrl + "?t=" + Date.now();
    if (typeof fetch === "function") {
      fetch(url, { cache: "no-store" })
        .then((response) => {
          if (!response.ok) throw new Error("HTTP " + response.status);
          return response.json();
        })
        .then(resolve)
        .catch(reject);
      return;
    }
    try {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.timeout = 12000;
      xhr.setRequestHeader("Accept", "application/json");
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error("HTTP " + xhr.status));
        }
      };
      xhr.ontimeout = () => reject(new Error("Request timed out"));
      xhr.onerror = () => reject(new Error("Network error"));
      xhr.send();
    } catch (error) {
      reject(error);
    }
  });
}

function checkForUpdates(manual, options) {
  if (manual) showToast(t("update.checking"), "info");
  return requestUpdateManifest()
    .then((manifest) => {
      markUpdateCheckComplete();
      const code = Number(manifest && manifest.versionCode) || 0;
      const name = manifest && manifest.versionName ? String(manifest.versionName) : String(code);
      const info = {
        versionCode: code,
        versionName: name,
        apkUrl: manifest && manifest.apkUrl ? manifest.apkUrl : UPDATE_CONFIG.releaseNotesUrl,
        releaseNotesUrl: manifest && manifest.releaseNotesUrl ? manifest.releaseNotesUrl : UPDATE_CONFIG.releaseNotesUrl,
        changelog: manifest && manifest.changelog ? manifest.changelog : {},
        notes: manifest && manifest.notes ? manifest.notes : []
      };
      if (code > APP_VERSION_CODE) {
        pendingUpdate = info;
        openUpdateModal(info);
        if (manual) showToast(t("update.availableToast", { version: name }), "success");
        return info;
      }
      pendingUpdate = null;
      if (manual) showToast(t("update.upToDate"), "success");
      return null;
    })
    .catch(() => {
      if (manual) showToast(t("update.failed"), "error");
      return null;
    });
}

function markUpdateCheckComplete() {
  try {
    localStorage.setItem(UPDATE_CONFIG.lastCheckKey, String(Date.now()));
  } catch {
  }
}

function setupUpdates() {
  const close = document.getElementById("update-modal-close");
  if (close) close.addEventListener("click", closeUpdateModal);
  const later = document.getElementById("update-later-btn");
  if (later) later.addEventListener("click", closeUpdateModal);
  const modal = document.getElementById("update-modal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target && e.target.getAttribute("data-close-update") === "true") closeUpdateModal();
    });
  }
  const now = document.getElementById("update-now-btn");
  if (now) now.addEventListener("click", startAppUpdate);
  const checkButton = document.getElementById("about-update-btn");
  if (checkButton) checkButton.addEventListener("click", () => checkForUpdates(true));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeUpdateModal();
  });
}


document.addEventListener("DOMContentLoaded", () => {
  setupSplash();
  setupLanguage();
  setupTheme();
  setupTabs();
  setupForms();
  setupFlashcards();
  setupTaskPlanner();
  setupActions();
  setupFilters();
  setupPrettySelects();
  setupQuickActions();
  setupCreateButtons();
  setupPomodoro();
  setupAlarmOverlay();
  setupBackToTop();
  setupAbout();
  setupPermissions();
  setupDetailModal();
  setupUpdates();
  setupExternalLinks();
  setupAutoSave();
  positionToastContainer();
  window.addEventListener("resize", positionToastContainer);
  applySettingsToForm();
  restoreTimer();
  renderAll();
  persistSnapshot();
  syncAllTaskReminders();
  startReminderLoop();
  updateCountdown();
  startCountdownLoop();
  checkTaskReminders();
  setText("footer-year", "© " + new Date().getFullYear());
});
