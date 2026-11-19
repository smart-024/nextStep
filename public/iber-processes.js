// Process descriptions stay in authenticated HTML; this file only controls their presentation.
document.querySelectorAll('.architecture-process').forEach((item) => {
  const trigger = item.querySelector('.architecture-process-trigger');
  const panel = item.querySelector('.architecture-process-popover');
  if (!trigger || !panel || !panel.showPopover) return;
  const isOpen = () => panel.matches(':popover-open');
  const position = () => {
    if (!isOpen()) return;
    const viewport = window.visualViewport;
    const width = viewport?.width || window.innerWidth;
    const height = viewport?.height || window.innerHeight;
    const viewportLeft = viewport?.offsetLeft || 0;
    const viewportTop = viewport?.offsetTop || 0;
    panel.style.width = `${Math.min(544, width - 32)}px`;
    const anchor = trigger.getBoundingClientRect();
    const belowSpace = Math.max(0, viewportTop + height - 16 - anchor.bottom - 10);
    const aboveSpace = Math.max(0, anchor.top - 10 - viewportTop - 16);
    panel.style.maxHeight = `${Math.max(belowSpace, aboveSpace)}px`;
    // Measure at full size; animation transforms must not affect placement.
    const bounds = { width: panel.offsetWidth, height: panel.offsetHeight };
    const left = Math.max(viewportLeft + 16, Math.min(anchor.left, viewportLeft + width - bounds.width - 16));
    const below = bounds.height <= belowSpace || belowSpace >= aboveSpace;
    panel.style.maxHeight = `${below ? belowSpace : aboveSpace}px`;
    const top = below ? anchor.bottom + 10 : anchor.top - panel.offsetHeight - 10;
    const originX = Math.max(0, Math.min(anchor.left + anchor.width / 2 - left, bounds.width));
    panel.style.transformOrigin = `${originX}px ${below ? 'top' : 'bottom'}`;
    panel.dataset.placement = below ? 'below' : 'above';
    panel.style.setProperty('--process-offset', below ? '-6px' : '6px');
    Object.assign(panel.style, { inset: 'auto', margin: '0', left: `${left}px`, top: `${top}px` });
  };
  const show = () => {
    if (!isOpen()) panel.showPopover();
    trigger.setAttribute('aria-expanded', 'true');
    position();
  };
  const hide = () => {
    if (isOpen()) panel.hidePopover();
    trigger.setAttribute('aria-expanded', 'false');
  };
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    if (isOpen()) hide();
    else show();
  });
  panel.addEventListener('toggle', (event) => {
    const open = event.newState === 'open';
    trigger.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      event.preventDefault();
      hide();
      trigger.focus({ preventScroll: true });
    }
  });
  window.addEventListener('resize', position);
  window.visualViewport?.addEventListener('resize', position);
  window.addEventListener('scroll', position, { capture: true, passive: true });
});
