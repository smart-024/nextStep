// Menu behavior for sections with several downloads. Hover and focus open it with CSS;
// this script adds tap support, Escape and closing on an outside click.
document.querySelectorAll('[data-download-menu]').forEach((menu) => {
  const toggle = menu.querySelector('.section-download-toggle');
  if (!toggle) return;
  const setOpen = (open) => {
    menu.toggleAttribute('data-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setOpen(!menu.hasAttribute('data-open')));
  menu.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !menu.hasAttribute('data-open')) return;
    setOpen(false);
    toggle.focus();
  });
  document.addEventListener('click', (event) => { if (!menu.contains(event.target)) setOpen(false); });
  menu.querySelectorAll('.download-options a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
});
