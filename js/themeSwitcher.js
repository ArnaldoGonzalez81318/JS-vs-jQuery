const toggleSwitch = document.getElementById('checkbox');
const themePreferenceKey = 'js-vs-jquery-theme';
const themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme, persist = true) {
  document.documentElement.setAttribute('data-theme', theme);
  if (toggleSwitch) {
    toggleSwitch.checked = theme === 'dark';
  }
  if (persist) {
    localStorage.setItem(themePreferenceKey, theme);
  }
}

function getStoredTheme() {
  return localStorage.getItem(themePreferenceKey);
}

function setInitialTheme() {
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    setTheme(storedTheme, false);
  } else {
    setTheme(themeMediaQuery.matches ? 'dark' : 'light', false);
  }
}

if (toggleSwitch) {
  toggleSwitch.addEventListener('change', () => {
    setTheme(toggleSwitch.checked ? 'dark' : 'light');
  });
}

const mediaQueryListener = (event) => {
  if (!getStoredTheme()) {
    setTheme(event.matches ? 'dark' : 'light', false);
  }
};

if (typeof themeMediaQuery.addEventListener === 'function') {
  themeMediaQuery.addEventListener('change', mediaQueryListener);
} else if (typeof themeMediaQuery.addListener === 'function') {
  themeMediaQuery.addListener(mediaQueryListener);
}

setInitialTheme();