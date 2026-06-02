(() => {
  const storageKey = 'pow-gopika-theme';
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const body = document.body;
  const preferredTheme = 'dark';

  const renderToggle = (theme) => {
    if (!themeToggle) {
      return;
    }

    const isDark = theme === 'dark';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.innerHTML = isDark
      ? '<i class="ti ti-sun-high" aria-hidden="true"></i><span>light mode</span>'
      : '<i class="ti ti-moon-stars" aria-hidden="true"></i><span>dark mode</span>';
  };

  const applyTheme = (theme) => {
    body.dataset.theme = theme;
    renderToggle(theme);
  };

  let storedTheme = preferredTheme;

  try {
    const savedTheme = window.localStorage.getItem(storageKey);
    if (savedTheme === 'dark' || savedTheme === 'light') {
      storedTheme = savedTheme;
    }
  } catch (error) {
    storedTheme = preferredTheme;
  }

  applyTheme(storedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);

      try {
        window.localStorage.setItem(storageKey, nextTheme);
      } catch (error) {
        // Ignore storage failures and keep the current session theme.
      }
    });
  }
})();
