// Simple enhancements: current year, mobile menu, active link highlight, count-up stats
document.addEventListener('DOMContentLoaded', () => {
  // Year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile menu toggle
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Active section link highlight
  const links = [...document.querySelectorAll('.menu a')];
  const ids = links.map(a => a.getAttribute('href')).filter(h => h.startsWith('#'));
  const sections = ids.map(id => document.querySelector(id));
  const onScroll = () => {
    const y = window.scrollY + 120;
    let active = null;
    for (const sec of sections) {
      if (!sec) continue;
      if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
        active = '#' + sec.id;
        break;
      }
    }
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === active));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Count-up stats
  const counters = document.querySelectorAll('.stat-num[data-count]');
  const rAF = window.requestAnimationFrame || (cb => setTimeout(cb, 16));
  counters.forEach(el => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    let start = null;
    const base = 0;
    const dur = 1200;
    const step = ts => {
      if (!start) start = ts;
      const t = Math.min(1, (ts - start) / dur);
      const val = Math.floor(base + (target - base) * (t * (2 - t))); // ease-out
      el.textContent = String(val);
      if (t < 1) rAF(step);
    };
    rAF(step);
  });
});
