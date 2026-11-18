(function () {
  try {
    var mode = localStorage.getItem("examBuddy_theme") || "auto";
    var dark = mode === "dark" || (mode === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    var lang = localStorage.getItem("examBuddy_language") || "en";
    document.documentElement.lang = lang;
  } catch (e) {
    document.documentElement.dataset.theme = "light";
  }
})();
