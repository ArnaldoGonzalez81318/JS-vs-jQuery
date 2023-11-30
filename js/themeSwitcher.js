if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  console.log('dark mode')
  document.body.classList.add('dark-mode')
} else {
  console.log('light mode')
  document.body.classList.remove('dark-mode')
}