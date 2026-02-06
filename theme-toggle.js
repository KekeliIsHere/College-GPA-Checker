// Theme Toggle Functionality
(function() {
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;
  const body = document.body;

  // Check for saved theme preference or default to 'dark'
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  // Apply saved theme on page load
  if (currentTheme === 'light') {
    body.classList.add('light-mode');
    updateThemeIcon('☀️');
  } else {
    body.classList.remove('light-mode');
    updateThemeIcon('🌙');
  }

  // Toggle theme on button click
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      body.classList.toggle('light-mode');
      const isLightMode = body.classList.contains('light-mode');
      
      // Save preference
      localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
      
      // Update icon
      updateThemeIcon(isLightMode ? '☀️' : '🌙');
    });
  }

  // Update theme icon
  function updateThemeIcon(icon) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
      themeIcon.textContent = icon;
    }
  }

  // Optional: Listen for system theme changes
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeQuery.addListener(function(e) {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        body.classList.remove('light-mode');
        updateThemeIcon('🌙');
      } else {
        body.classList.add('light-mode');
        updateThemeIcon('☀️');
      }
    }
  });
})();
