// Interaction only. Descriptions and detail graphs come from authenticated HTML.
document.querySelectorAll('[data-evaluation-criteria]').forEach((section) => {
  const controls = [...section.querySelectorAll('[data-criterion]')];
  const slices = [...section.querySelectorAll('.criteria-slice')];
  const choices = [...section.querySelectorAll('.criteria-choice')];
  const panels = [...section.querySelectorAll('.criteria-detail')];
  if (!slices.length || panels.length !== slices.length) return;
  section.dataset.criteriaReady = '';
  choices.forEach((choice) => { choice.disabled = false; });
  let selected;
  let version = 0;
  let fade;
  const select = async (id) => {
    const request = ++version;
    const previous = panels.find((panel) => panel.id === `criterion-detail-${selected}`);
    const next = panels.find((panel) => panel.id === `criterion-detail-${id}`);
    if (!next) return;
    const opacity = previous ? getComputedStyle(previous).opacity : '1';
    fade?.cancel();
    controls.forEach((control) => control.setAttribute('aria-pressed', String(control.dataset.criterion === id)));
    if (selected === id) return;
    const animate = previous && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (animate) {
      fade = previous.animate([{ opacity }, { opacity: 0 }], { duration: 100, easing: 'ease-out', fill: 'forwards' });
      await fade.finished.catch(() => {});
      if (request !== version) return;
    }
    panels.forEach((panel) => { panel.hidden = panel !== next; });
    selected = id;
    fade?.cancel();
    if (animate) fade = next.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: 'ease-in-out' });
  };
  controls.forEach((control) => {
    control.addEventListener('click', () => select(control.dataset.criterion));
    control.addEventListener('keydown', (event) => {
      if (control.matches('.criteria-slice') && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        select(control.dataset.criterion);
        return;
      }
      const group = control.matches('.criteria-slice') ? slices : choices;
      const index = group.indexOf(control);
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % group.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + group.length) % group.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = group.length - 1;
      else return;
      event.preventDefault();
      group[next].focus({ preventScroll: true });
      select(group[next].dataset.criterion);
    });
  });
  select(slices[0].dataset.criterion);
});
