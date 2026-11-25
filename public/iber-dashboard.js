// Only interface behavior belongs here. Client information is rendered after authentication.
(() => {
  const dashboard = document.querySelector('#dashboard');
  const toggle = document.querySelector('#menu-toggle');
  const label = document.querySelector('#menu-label');
  const menu = document.querySelector('#dashboard-menu');
  if (!dashboard || !toggle || !label || !menu) return;

  const links = [...menu.querySelectorAll('[data-section]')];
  const sections = [...dashboard.querySelectorAll('.dashboard-section')];
  if (!sections.length) return;
  // Lift the floating download above the footer as it enters the viewport.
  // Moving a fixed control adds no document height or extra scrolling space.
  let downloadFrame = 0;
  const positionDownload = () => {
    if (downloadFrame) return;
    downloadFrame = requestAnimationFrame(() => {
      downloadFrame = 0;
      const section = sections.find((item) => !item.hidden);
      const button = section?.querySelector('.section-download');
      const navigation = section?.querySelector('.section-navigation');
      if (!button || !navigation) return;
      const previousLift = parseFloat(button.style.getPropertyValue('--download-lift')) || 0;
      const baseBottom = parseFloat(getComputedStyle(button).bottom) - previousLift;
      const rect = navigation.getBoundingClientRect();
      const lift = rect.bottom > 0
        ? Math.max(0, window.innerHeight - baseBottom - rect.top + 16)
        : 0;
      button.style.setProperty('--download-lift', `${lift}px`);
    });
  };
  window.addEventListener('scroll', positionDownload, { passive: true });
  window.addEventListener('resize', positionDownload);
  window.visualViewport?.addEventListener('resize', positionDownload);
  const downloadObserver = new ResizeObserver(positionDownload);
  sections.forEach((section) => downloadObserver.observe(section));
  const setMenu = (open) => {
    dashboard.dataset.menuOpen = String(open);
    toggle.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Cerrar menú' : 'Menú';
    menu.inert = !open;
    menu.setAttribute('aria-hidden', String(!open));
  };
  const selectSection = (id, focus = false) => {
    if (!sections.some((section) => section.id === id)) id = sections[0].id;
    sections.forEach((section) => { section.hidden = section.id !== id; });
    links.forEach((link) => {
      if (link.dataset.section === id) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    if (focus) {
      setMenu(false);
      document.getElementById(id)?.querySelector('h2')?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    positionDownload();
  };

  toggle.disabled = false;
  setMenu(false);
  selectSection(window.location.hash.slice(1));
  toggle.addEventListener('click', () => {
    const open = dashboard.dataset.menuOpen !== 'true';
    setMenu(open);
    if (open) menu.querySelector('[aria-current]')?.focus();
  });
  dashboard.querySelectorAll('a[data-section]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const id = link.dataset.section;
      window.history.pushState(null, '', '#' + id);
      selectSection(id, true);
    });
  });
  window.addEventListener('hashchange', () => selectSection(window.location.hash.slice(1), true));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dashboard.dataset.menuOpen === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
})();
