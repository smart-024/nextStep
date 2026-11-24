// Shows the description of each zone of an architecture image. Texts stay in authenticated HTML;
// this file only places the tooltip. Screen readers get the same text through aria-describedby.
document.querySelectorAll('[data-architecture-map]').forEach((frame) => {
  const map = frame.querySelector('.architecture-map');
  const tip = frame.querySelector('.architecture-map-tip');
  const hotspots = frame.querySelectorAll('.architecture-hotspot');
  if (!map || !tip || !hotspots.length) return;
  const wide = window.matchMedia('(min-width: 48rem)');
  let active = null;
  let pinned = false;

  const place = (hotspot) => {
    if (!wide.matches) {
      tip.style.left = tip.style.top = '';
      return;
    }
    const frameBox = frame.getBoundingClientRect();
    const mapBox = map.getBoundingClientRect();
    const box = hotspot.getBoundingClientRect();
    const gap = 12;
    const left = Math.max(0, Math.min(box.left + box.width / 2 - frameBox.left - tip.offsetWidth / 2, frameBox.width - tip.offsetWidth));
    // Zones in the upper half show the text below them; the rest, above.
    const below = box.top + box.height / 2 < mapBox.top + mapBox.height / 2;
    const top = below ? box.bottom - frameBox.top + gap : box.top - frameBox.top - tip.offsetHeight - gap;
    tip.style.left = `${left}px`;
    tip.style.top = `${top}px`;
    tip.dataset.placement = below ? 'below' : 'above';
  };

  const show = (hotspot) => {
    if (active && active !== hotspot) active.classList.remove('is-active');
    active = hotspot;
    hotspot.classList.add('is-active');
    tip.querySelector('strong').textContent = hotspot.querySelector('[data-hotspot-title]').textContent;
    tip.querySelector('p').textContent = hotspot.querySelector('[data-hotspot-text]').textContent;
    tip.hidden = false;
    place(hotspot);
  };

  const hide = () => {
    active?.classList.remove('is-active');
    active = null;
    pinned = false;
    tip.hidden = true;
  };

  hotspots.forEach((hotspot) => {
    hotspot.addEventListener('pointerenter', (event) => { if (event.pointerType === 'mouse' && !pinned) show(hotspot); });
    hotspot.addEventListener('pointerleave', (event) => { if (event.pointerType === 'mouse' && !pinned) hide(); });
    hotspot.addEventListener('focus', () => { if (!pinned) show(hotspot); });
    hotspot.addEventListener('blur', () => { if (!pinned) hide(); });
    // A click or tap keeps the text visible until another click, Escape or a click outside.
    hotspot.addEventListener('click', () => {
      if (pinned && active === hotspot) { hide(); return; }
      show(hotspot);
      pinned = true;
    });
  });

  document.addEventListener('click', (event) => { if (pinned && !frame.contains(event.target)) hide(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && active) hide(); });
  window.addEventListener('resize', () => { if (active) place(active); });
});
