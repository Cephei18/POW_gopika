// Small ambient details. Nothing load-bearing — the page reads fine without JS.
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // — time-aware greeting, in her timezone (IST) —
  const greetingEl = document.querySelector('[data-greeting]');
  const hourIST = () => {
    // IST = UTC+5:30, computed from the visitor's clock so it stays correct anywhere.
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + 5.5 * 3600000);
  };

  if (greetingEl) {
    const h = hourIST().getHours();
    let line;
    if (h >= 5 && h < 8) line = 'up before the network is';
    else if (h >= 8 && h < 12) line = 'somewhere in the morning tabs';
    else if (h >= 12 && h < 17) line = 'deep in the afternoon build';
    else if (h >= 17 && h < 22) line = 'shipping into the evening';
    else if (h >= 22 || h < 1) line = 'awake. the good ideas come late';
    else line = 'almost certainly asleep (probably)';
    greetingEl.textContent = line;
  }

  // — live local clock (IST), only what makes the node feel "on" —
  const clockEl = document.querySelector('[data-clock]');
  if (clockEl) {
    const tick = () => {
      const d = hourIST();
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      clockEl.textContent = `${hh}:${mm} IST`;
    };
    tick();
    setInterval(tick, 15000);
  }

  // — rotating "currently" fragments —
  const rotator = document.querySelector('[data-rotate]');
  if (rotator && !reduceMotion) {
    const fragments = [
      'crypto-native agents',
      'agents that act onchain',
      'semantic tool planning',
      'farcaster-native AI',
      'uniswap v4 hooks',
      'autonomous ecosystem intel',
      'what agents can be trusted to do',
      'coordination, automated',
    ];
    let i = 0;
    setInterval(() => {
      rotator.classList.add('swap');
      setTimeout(() => {
        i = (i + 1) % fragments.length;
        rotator.textContent = fragments[i];
        rotator.classList.remove('swap');
      }, 450);
    }, 3400);
  }

  // — last-deploy stamp, relative + human —
  const buildEl = document.querySelector('[data-build]');
  if (buildEl) {
    const built = buildEl.getAttribute('data-build');
    if (built) {
      const diff = Date.now() - new Date(built).getTime();
      const days = Math.floor(diff / 86400000);
      buildEl.textContent =
        days <= 0 ? 'today' : days === 1 ? 'yesterday' : `${days}d ago`;
    }
  }

  // — a note for whoever opens the console —
  const tag = 'color:#4f9cf9;font-family:monospace;font-size:12px';
  const dim = 'color:#6c789e;font-family:monospace;font-size:11px';
  console.log('%c// you opened the console. of course you did.', tag);
  console.log('%cif you build weird things too, say hi → farcaster.xyz/okgopika', dim);
})();
