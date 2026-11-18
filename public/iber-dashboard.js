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
    }
  };

  toggle.disabled = false;
  setMenu(false);
  selectSection(window.location.hash.slice(1));
  toggle.addEventListener('click', () => {
    const open = dashboard.dataset.menuOpen !== 'true';
    setMenu(open);
    if (open) menu.querySelector('[aria-current]')?.focus();
  });
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
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
