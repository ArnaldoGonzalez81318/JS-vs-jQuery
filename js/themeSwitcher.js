const toggleSwitch = document.getElementById('checkbox');

// Function to set the initial theme based on system preferences
function setInitialTheme() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Dark mode preferred
    toggleSwitch.checked = true;
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    // Light mode preferred
    toggleSwitch.checked = false;
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

// Event listener for theme switch toggle
toggleSwitch.addEventListener('change', function () {
  if (this.checked) {
    console.log('Dark theme');
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    console.log('Light theme');
    document.documentElement.setAttribute('data-theme', 'light');
  }
});

// Set initial theme
setInitialTheme();