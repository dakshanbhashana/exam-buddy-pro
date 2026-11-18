const STORAGE_KEYS = {
  exams: "examBuddy_exams",
  tasks: "examBuddy_tasks",
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
  sound: true
};

const MODES = {
  focus: { label: "mode.focus", status: "timerReady" },
  short: { label: "mode.short", status: "timerRecharge" },
  long: { label: "mode.long", status: "timerRest" }
};

const CIRCUMFERENCE = 2 * Math.PI * 104;
const DAY_MS = 1000 * 60 * 60 * 24;
const SNAPSHOT_VERSION = 3;

const APP_VERSION_NAME = "1.6";
const APP_VERSION_CODE = 7;
const UPDATE_CONFIG = {
  manifestUrl: "https://raw.githubusercontent.com/dakshanbhashana/exam-buddy-pro/main/version.json",
  releaseNotesUrl: "https://github.com/dakshanbhashana/exam-buddy-pro/releases/latest",
  checkIntervalMs: 6 * 60 * 60 * 1000,
  lastCheckKey: "examBuddy_lastUpdateCheck"
};

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
    languageCardTitle: "Language",
    languageCardDesc: "Choose your preferred language. Changes apply instantly.",
    mainSections: "Main sections",
    "tab.dashboard": "Dashboard",
    "tab.exams": "Exams",
    "tab.tasks": "Tasks",
    "tab.focus": "Focus",
    "tab.insights": "Insights",
    "tab.about": "About",
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
    version: "Version 1.6",
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
    languageCardTitle: "භාෂාව",
    languageCardDesc: "ඔබ කැමති භාෂාව තෝරන්න. වෙනස්කම් වහාම ක්‍රියාත්මක වේ.",
    mainSections: "ප්‍රධාන අංශ",
    "tab.dashboard": "උපකරණ පුවරුව",
    "tab.exams": "විභාග",
    "tab.tasks": "කාර්යයන්",
    "tab.focus": "අවධානය",
    "tab.insights": "තීක්ෂ්ණ බුද්ධිය",
    "tab.about": "පිළිබඳ",
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
    version: "Version 1.6",
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
  persistSnapshot();
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

function startNativeTimer() {
  const bridge = nativeTimer();
  if (!bridge || !timer.running || !timer.endsAt) return;
  try {
    const modeLabel = t(MODES[timer.mode].label);
    const completeTitle = timer.mode === "focus" ? t("focusDone") : t("breakDone");
    bridge.startTimer(
      timer.mode,
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

function requestBackgroundAccess() {
  const bridge = nativeTimer();
  if (!bridge) {
    showToast(t("backgroundUnavailable"));
    return;
  }
  try {
    bridge.requestBackgroundAccess();
  } catch {
  }
}

function updateBackgroundStatus() {
  const status = document.getElementById("background-status");
  if (!status) return;
  const bridge = nativeTimer();
  if (!bridge) {
    status.textContent = t("backgroundUnavailable");
    status.classList.remove("ok");
    return;
  }
  let battery = false;
  let notifications = true;
  try {
    battery = !!bridge.isIgnoringBatteryOptimizations();
    notifications = !!bridge.areNotificationsEnabled();
  } catch {
  }
  const ready = battery && notifications;
  status.textContent = ready ? t("backgroundAllowed") : t("backgroundBlocked");
  status.classList.toggle("ok", ready);
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
let tasks = Array.isArray(startup.tasks) ? startup.tasks : [];
let pomodoro = normalizePomodoro(startup.pomodoro);
let timer = normalizeTimer(startup.timer);

let timerInterval = null;
let editingExamId = null;
let editingTaskId = null;
let pendingUpdate = null;

const ui = {
  examSearch: "",
  examFilter: "all",
  taskSearch: "",
  taskFilter: "all"
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

function persistSnapshot() {
  const snapshot = buildSnapshot();
  writeCache(snapshot);
  return writeFile(snapshot);
}

function saveData() {
  persistSnapshot();
}

function saveTimer() {
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
  ["autoBreaks", "autoFocus", "sound"].forEach((key) => {
    base.settings[key] = Boolean(base.settings[key]);
  });

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

function normalizeTimer(raw) {
  const base = { mode: "focus", remaining: durationFor("focus"), running: false, endsAt: null };
  if (!raw || Array.isArray(raw) || typeof raw !== "object") return base;

  const mode = MODES[raw.mode] ? raw.mode : "focus";
  const running = Boolean(raw.running) && Number.isFinite(raw.endsAt);
  const rawRemaining = Number(raw.remaining);
  const remaining = Number.isFinite(rawRemaining)
    ? Math.max(0, Math.min(rawRemaining, durationFor(mode)))
    : durationFor(mode);

  return {
    mode,
    remaining: running ? Math.max(0, Math.ceil((raw.endsAt - Date.now()) / 1000)) : remaining,
    running,
    endsAt: running ? raw.endsAt : null
  };
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
  if (tab === "insights") renderInsights();
  if (timer.running) resumeAppTimer();
  forceScrollTop();
  requestAnimationFrame(forceScrollTop);
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
  const streak = calcStreak();

  setText("stat-upcoming", upcoming);
  setText("stat-completed", completed);
  setText("stat-pending", pendingTasks);
  setText("stat-done-tasks", doneTasks);
  setText("stat-focus-today", minutesLabel(focusMinutesForDay(todayKey())));
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

function renderTodayPlan() {
  const container = document.getElementById("today-plan");
  const examsHtml = upcomingExams()
    .slice(0, 3)
    .map((e) => `<div class="plan-row"><span class="plan-dot"></span><span>${escapeHtml(e.subject)}</span><span>${daysUntil(e.date) === 0 ? t("today") : daysUntil(e.date) + t("dayShort")}</span></div>`)
    .join("") || `<p class="item-meta">${t("noUpcomingShort")}</p>`;

  const pending = tasks
    .filter((t) => !t.completed)
    .sort((a, b) => (a.due || "9999-99-99").localeCompare(b.due || "9999-99-99") || b.createdAt - a.createdAt)
    .slice(0, 3);
  const tasksHtml = pending
    .map((task) => `<div class="plan-row"><span class="plan-dot"></span><span>${escapeHtml(task.text)}</span><span>${task.due ? formatDate(task.due) : t("anytime")}</span></div>`)
    .join("") || `<p class="item-meta">${t("noPendingTasks")}</p>`;

  container.innerHTML =
    `<div class="plan-group"><h4>${t("stat.upcoming")}</h4>${examsHtml}</div>` +
    `<div class="plan-group"><h4>${t("nextTasks")}</h4>${tasksHtml}</div>`;
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

function renderTasks() {
  const list = document.getElementById("task-list");
  const empty = document.getElementById("task-empty");
  list.innerHTML = "";

  const query = ui.taskSearch.trim().toLowerCase();
  const sorted = [...tasks]
    .filter((t) => {
      if (ui.taskFilter === "active" && t.completed) return false;
      if (ui.taskFilter === "completed" && !t.completed) return false;
      if (ui.taskFilter === "high" && t.priority !== "high") return false;
      if (!query) return true;
      return String(t.text || "").toLowerCase().includes(query);
    })
    .sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
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
      </div>
      <div class="item-actions">
        <button class="secondary-btn" data-action="edit-task" data-id="${task.id}">${t("edit")}</button>
        <button class="secondary-btn" data-action="toggle-task" data-id="${task.id}">
          ${t(task.completed ? "undo" : "done")}
        </button>
        <button class="danger-btn" data-action="delete-task" data-id="${task.id}">${t("delete")}</button>
      </div>
    `;
    list.appendChild(li);
  });
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

function renderAll() {
  renderDashboard();
  renderExams();
  renderTasks();
  renderTodaySessions();
  renderInsights();
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
}

function startTaskEdit(id) {
  const task = tasks.find((x) => x.id === id);
  if (!task) return;
  editingTaskId = id;
  document.getElementById("task-text").value = task.text;
  document.getElementById("task-priority").value = ["low", "medium", "high"].includes(task.priority) ? task.priority : "medium";
  document.getElementById("task-due").value = task.due || "";
  setText("task-form-title", t("editTask"));
  setText("task-submit", t("saveChanges"));
  document.getElementById("task-cancel-edit").classList.remove("hidden");
  document.getElementById("task-text").focus();
}

function setupForms() {
  document.getElementById("exam-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const subject = document.getElementById("exam-subject").value.trim();
    const date = document.getElementById("exam-date").value;
    const notes = document.getElementById("exam-notes").value.trim();
    const category = document.getElementById("exam-category").value;
    if (!subject || !date) return;

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
  });

  document.getElementById("task-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const text = document.getElementById("task-text").value.trim();
    const priority = document.getElementById("task-priority").value;
    const due = document.getElementById("task-due").value;
    if (!text) return;

    if (editingTaskId) {
      const task = tasks.find((x) => x.id === editingTaskId);
      if (task) Object.assign(task, { text, priority, due });
      showToast(t("taskUpdated"), "success");
      clearTaskEdit();
    } else {
      tasks.push({ id: uid(), text, priority, due, completed: false, createdAt: Date.now() });
      showToast(t("taskAdded"), "success");
    }
    saveData();
    e.target.reset();
    renderAll();
  });

  document.getElementById("exam-cancel-edit").addEventListener("click", () => {
    clearExamEdit();
    document.getElementById("exam-form").reset();
  });
  document.getElementById("task-cancel-edit").addEventListener("click", () => {
    clearTaskEdit();
    document.getElementById("task-form").reset();
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
      }
    } else if (action === "delete-task") {
      tasks = tasks.filter((x) => x.id !== id);
      if (editingTaskId === id) clearTaskEdit();
    } else if (action === "edit-task") {
      startTaskEdit(id);
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
    tasks = tasks.filter((task) => !task.completed);
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
    renderTasks();
  });
  document.getElementById("task-filter").addEventListener("change", (e) => {
    ui.taskFilter = e.target.value;
    renderTasks();
  });
}

function setupQuickActions() {
  document.querySelectorAll("[data-quick]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.quick;
      switchTab(tab);
      if (tab === "exams") setTimeout(() => document.getElementById("exam-subject").focus(), 0);
      if (tab === "tasks") setTimeout(() => document.getElementById("task-text").focus(), 0);
      if (tab === "focus" && !timer.running) {
        if (timer.mode !== "focus") setMode("focus");
        startTimer();
      }
    });
  });
  document.getElementById("quick-add-exam").addEventListener("click", () => {
    switchTab("exams");
    setTimeout(() => document.getElementById("exam-subject").focus(), 0);
  });
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

function startTicking() {
  stopTicking();
  if (!timer.running) return;
  timerInterval = setInterval(tick, 250);
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
  const left = Math.max(0, Math.ceil((timer.endsAt - Date.now()) / 1000));
  if (left !== timer.remaining) {
    timer.remaining = left;
    renderTimer();
  }
  if (left <= 0) completeSession(true);
}

function startTimer() {
  if (timer.running) return;
  if (timer.remaining <= 0) timer.remaining = durationFor(timer.mode);
  timer.running = true;
  timer.endsAt = Date.now() + timer.remaining * 1000;
  startNativeTimer();
  saveTimer();
  renderTimer();
  startTicking();
}

function pauseTimer() {
  if (!timer.running) return;
  timer.remaining = Math.max(0, Math.ceil((timer.endsAt - Date.now()) / 1000));
  timer.running = false;
  timer.endsAt = null;
  stopNativeTimer();
  saveTimer();
  renderTimer();
  stopTicking();
}

function resetTimer() {
  timer.running = false;
  timer.endsAt = null;
  timer.remaining = durationFor(timer.mode);
  stopNativeTimer();
  saveTimer();
  renderTimer();
  stopTicking();
  showToast(t("timerReset"));
}

function setMode(mode, keepRunning = false) {
  if (!MODES[mode]) return;
  if (!keepRunning) {
    timer.running = false;
    timer.endsAt = null;
    stopTicking();
    stopNativeTimer();
  }
  timer.mode = mode;
  timer.remaining = durationFor(mode);
  saveTimer();
  renderTimer();
}

function completeSession(log) {
  const finishedMode = timer.mode;
  let nextMode;

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

  setMode(nextMode, false);
  const autoStart = nextMode === "focus" ? pomodoro.settings.autoFocus : pomodoro.settings.autoBreaks;
  if (autoStart && log) startTimer();

  saveData();
  renderAll();
  renderTimer();
}

function playChime() {
  if (!pomodoro.settings.sound) return;
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

function renderSessionDots() {
  const filled = timer.mode === "long" ? 4 : pomodoro.focusCount % 4;
  document.getElementById("session-dots").innerHTML = Array.from({ length: 4 }, (_, i) =>
    `<span class="session-dot ${i < filled ? "filled" : ""}"></span>`
  ).join("");
}

function renderTimer() {
  const duration = durationFor(timer.mode);
  const remaining = Math.max(0, Math.min(timer.remaining, duration));
  setText("timer-time", formatClock(remaining));
  const modeLabel = t(MODES[timer.mode].label);
  setText("timer-mode-label", modeLabel);
  setText(
    "timer-status",
    timer.running ? t("timerProgress") : remaining === duration ? t(MODES[timer.mode].status) : t("timerPaused")
  );

  const ring = document.getElementById("timer-ring-progress");
  ring.style.strokeDasharray = String(CIRCUMFERENCE);
  ring.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - remaining / duration));

  document.querySelectorAll(".mode-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.mode === timer.mode);
  });
  setText(
    "start-pause",
    timer.running ? t("pause") : remaining < duration ? t("resume") : t("startMode", { mode: modeLabel })
  );
  renderSessionDots();
  document.title = timer.running
    ? `${formatClock(remaining)} · ${modeLabel} — ${t("appTitle")}`
    : t("appTitle");
}

function setupPomodoro() {
  document.querySelectorAll(".mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => setMode(btn.dataset.mode));
  });
  document.getElementById("start-pause").addEventListener("click", () => {
    if (timer.running) pauseTimer();
    else startTimer();
  });
  document.getElementById("reset-timer").addEventListener("click", resetTimer);
  document.getElementById("skip-timer").addEventListener("click", () => completeSession(false));
  const backgroundButton = document.getElementById("background-access-btn");
  if (backgroundButton) {
    backgroundButton.addEventListener("click", requestBackgroundAccess);
  }
  updateBackgroundStatus();

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

    if (!timer.running) timer.remaining = durationFor(timer.mode);
    document.getElementById("focus-duration").value = pomodoro.settings.focus;
    document.getElementById("short-duration").value = pomodoro.settings.short;
    document.getElementById("long-duration").value = pomodoro.settings.long;
    document.getElementById("auto-start-breaks").checked = pomodoro.settings.autoBreaks;
    document.getElementById("auto-start-focus").checked = pomodoro.settings.autoFocus;
    document.getElementById("sound-enabled").checked = pomodoro.settings.sound;

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
      if (timer.running) pauseTimer();
      else startTimer();
    }
  });
}

function applySettingsToForm() {
  document.getElementById("focus-duration").value = pomodoro.settings.focus;
  document.getElementById("short-duration").value = pomodoro.settings.short;
  document.getElementById("long-duration").value = pomodoro.settings.long;
  document.getElementById("auto-start-breaks").checked = pomodoro.settings.autoBreaks;
  document.getElementById("auto-start-focus").checked = pomodoro.settings.autoFocus;
  document.getElementById("sound-enabled").checked = pomodoro.settings.sound;
}

function restoreTimer() {
  stopTicking();
  if (timer.running && timer.endsAt) {
    if (timer.endsAt <= Date.now()) {
      timer.running = false;
      timer.endsAt = null;
      stopNativeTimer();
      completeSession(true);
    } else {
      timer.remaining = Math.max(0, Math.ceil((timer.endsAt - Date.now()) / 1000));
      startNativeTimer();
      startTicking();
    }
  } else {
    timer.running = false;
    timer.endsAt = null;
    stopNativeTimer();
  }
  renderTimer();
}

function resumeAppTimer() {
  if (!timer.running || !timer.endsAt) {
    renderTimer();
    updateBackgroundStatus();
    return;
  }
  if (timer.endsAt <= Date.now()) {
    timer.running = false;
    timer.endsAt = null;
    stopNativeTimer();
    completeSession(true);
    return;
  }
  timer.remaining = Math.max(0, Math.ceil((timer.endsAt - Date.now()) / 1000));
  renderTimer();
  startNativeTimer();
  startTicking();
  updateBackgroundStatus();
}

window.ExamBuddyOnResume = resumeAppTimer;

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) resumeAppTimer();
});
window.addEventListener("pageshow", () => resumeAppTimer());
window.addEventListener("focus", () => {
  if (document.visibilityState !== "hidden") resumeAppTimer();
});

function setupBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;
  const update = () => btn.classList.toggle("show", window.scrollY > 320);
  window.addEventListener("scroll", update, { passive: true });
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
      <p><strong>Exam Buddy Pro</strong> — Version 1.6</p>
      <p>Developed by Dakshan Bhashna.</p>
      <ul>
        <li>Built with HTML, CSS, and JavaScript.</li>
        <li>Packaged as an Android app with a native WebView shell.</li>
        <li>Uses system fonts and inline SVG icons created for this project.</li>
      </ul>
      <p>Thank you for using Exam Buddy Pro.</p>
    `;
  }
  modal.classList.remove("hidden");
}

function closeAboutModal() {
  const modal = document.getElementById("about-modal");
  if (modal) modal.classList.add("hidden");
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
      scheme === "http" || scheme === "https" || scheme === "intent";
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
    try { persistSnapshot(); } catch {}
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
}

const SPLASH_DURATION_MS = 5000;

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
  const now = document.getElementById("update-now-link");
  if (now) now.setAttribute("href", info.apkUrl || UPDATE_CONFIG.releaseNotesUrl);
  const notes = document.getElementById("update-notes-link");
  if (notes) {
    notes.setAttribute("href", info.releaseNotesUrl || UPDATE_CONFIG.releaseNotesUrl);
    notes.textContent = t("update.releasePage");
  }
  const later = document.getElementById("update-later-btn");
  if (later) later.textContent = t("update.later");
  modal.classList.remove("hidden");
}

function closeUpdateModal() {
  const modal = document.getElementById("update-modal");
  if (modal) modal.classList.add("hidden");
}

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

function checkForUpdates(manual) {
  if (manual) showToast(t("update.checking"), "info");
  return requestUpdateManifest()
    .then((manifest) => {
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

function maybeAutoCheckUpdates() {
  let last = 0;
  try {
    last = Number(localStorage.getItem(UPDATE_CONFIG.lastCheckKey) || 0) || 0;
  } catch {
  }
  if (Date.now() - last < UPDATE_CONFIG.checkIntervalMs) return;
  try {
    localStorage.setItem(UPDATE_CONFIG.lastCheckKey, String(Date.now()));
  } catch {
  }
  setTimeout(() => {
    checkForUpdates(false);
  }, 2600);
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
  const checkButton = document.getElementById("about-update-btn");
  if (checkButton) checkButton.addEventListener("click", () => checkForUpdates(true));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeUpdateModal();
  });
  maybeAutoCheckUpdates();
}


document.addEventListener("DOMContentLoaded", () => {
  setupSplash();
  setupLanguage();
  setupTheme();
  setupTabs();
  setupForms();
  setupActions();
  setupFilters();
  setupQuickActions();
  setupPomodoro();
  setupBackToTop();
  setupAbout();
  setupUpdates();
  setupExternalLinks();
  setupAutoSave();
  positionToastContainer();
  window.addEventListener("scroll", positionToastContainer, { passive: true });
  window.addEventListener("resize", positionToastContainer);
  applySettingsToForm();
  restoreTimer();
  renderAll();
  persistSnapshot();
  updateCountdown();
  setInterval(updateCountdown, 1000);
  setText("footer-year", "© " + new Date().getFullYear());
});
