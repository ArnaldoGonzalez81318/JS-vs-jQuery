type ThemeName = 'light' | 'dark';

const toggleSwitches = Array.from(document.querySelectorAll<HTMLInputElement>('[data-theme-toggle]'));
const themePreferenceKey = 'js-vs-jquery-theme';
const themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme: ThemeName, persist = true) {
  document.documentElement.setAttribute('data-theme', theme);
  toggleSwitches.forEach((toggleSwitch) => {
    toggleSwitch.checked = theme === 'dark';
  });
  if (persist) {
    localStorage.setItem(themePreferenceKey, theme);
  }
}

function getStoredTheme() {
  return localStorage.getItem(themePreferenceKey);
}

function isThemeName(value: string | null): value is ThemeName {
  return value === 'light' || value === 'dark';
}

function setInitialTheme() {
  const storedTheme = getStoredTheme();
  if (isThemeName(storedTheme)) {
    setTheme(storedTheme, false);
  } else {
    setTheme(themeMediaQuery.matches ? 'dark' : 'light', false);
  }
}

toggleSwitches.forEach((toggleSwitch) => {
  toggleSwitch.addEventListener('change', () => {
    setTheme(toggleSwitch.checked ? 'dark' : 'light');
  });
});

const mediaQueryListener = (event: MediaQueryListEvent) => {
  if (!getStoredTheme()) {
    setTheme(event.matches ? 'dark' : 'light', false);
  }
};

themeMediaQuery.addEventListener('change', mediaQueryListener);

setInitialTheme();