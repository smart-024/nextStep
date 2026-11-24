// Tab behavior only; client scenario content stays in authenticated HTML.
document.querySelectorAll('[data-scenario-tabs]').forEach((container) => {
  const list = container.querySelector('.scenario-tab-list');
  const tabs = [...container.querySelectorAll('.scenario-tab')];
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));
  if (!list || !tabs.length || panels.some((panel) => !panel)) return;
  const fadeDuration = Number(container.dataset.fadeDuration) || 200;
  container.querySelector('.scenario-panel-shell')?.setAttribute('data-tabs-ready', '');

  list.setAttribute('role', 'tablist');
  tabs.forEach((tab, index) => {
    tab.disabled = false;
    tab.setAttribute('role', 'tab');
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].tabIndex = 0;
  });
  let activeIndex = -1;
  let selectionVersion = 0;
  let fade;
  const select = async (index, focus = false) => {
    const version = ++selectionVersion;
    const previous = panels[activeIndex];
    const opacity = previous ? getComputedStyle(previous).opacity : '1';
    fade?.cancel();
    tabs.forEach((tab, position) => {
      const selected = position === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    if (focus) tabs[index].focus({ preventScroll: true });
    if (activeIndex === index) return;
    const animate = previous && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (animate) {
      fade = previous.animate([{ opacity }, { opacity: 0 }], {
        duration: fadeDuration / 2, easing: 'ease-out', fill: 'forwards',
      });
      await fade.finished.catch(() => {});
      // A newer click or keyboard selection takes priority over this transition.
      if (version !== selectionVersion) return;
    }
    panels.forEach((panel, position) => { panel.hidden = position !== index; });
    activeIndex = index;
    fade?.cancel();
    if (animate) {
      fade = panels[index].animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: fadeDuration, easing: 'ease-in-out',
      });
    }
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      select(next, true);
    });
  });
  select(0);
});
