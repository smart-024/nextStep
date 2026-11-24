// Layout/animation only; all story content remains in authenticated HTML.
document.querySelectorAll('.story-list').forEach((group) => {
  const cards = [...group.querySelectorAll('details.user-story')];
  if (!cards.length || !group.animate) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let selected = cards.find((card) => card.open) || null;
  let requested = selected;
  let revision = 0;
  let animations = [];
  let textAnimations = [];
  const textNodes = cards.flatMap((card) => [card.querySelector('summary'), card.querySelector('.story-content')]).filter(Boolean);
  const layoutTiming = { duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'both' };

  const cancelText = () => {
    textAnimations.forEach((animation) => animation.cancel());
    textAnimations = [];
  };
  const fadeText = (opacity, duration) => {
    const startingOpacity = textNodes.map((node) => getComputedStyle(node).opacity);
    cancelText();
    textAnimations = textNodes.map((node, index) => node.animate([
      { opacity: startingOpacity[index] }, { opacity },
    ], { duration, easing: 'ease-in-out', fill: 'both' }));
    return Promise.all(textAnimations.map((animation) => animation.finished.catch(() => {})));
  };
  const restoreText = () => {
    cancelText();
    textNodes.forEach((node) => node.style.removeProperty('opacity'));
  };

  const cancelLayout = () => {
    animations.forEach((animation) => animation.cancel());
    animations = [];
  };
  const applyLayout = (next) => {
    if (next) group.dataset.storyExpanded = '';
    else delete group.dataset.storyExpanded;
    group.style.setProperty('--story-rows', String(Math.max(2, cards.length - 1)));
    let row = 1;
    cards.forEach((card) => {
      card.open = card === next;
      card.dataset.storySelected = String(card === next);
      if (card !== next) card.style.setProperty('--story-row', String(row++));
    });
    selected = next;
  };
  const change = async (next) => {
    const current = ++revision;
    requested = next;
    if (!reducedMotion.matches) {
      // Hide every label and description before any card is scaled or repositioned.
      await fadeText(0, 140);
      if (current !== revision) return;
      textNodes.forEach((node) => { node.style.opacity = '0'; });
      cancelText();
    }

    // Animate from the current visual boxes into the actual new grid layout.
    const before = cards.map((card) => card.getBoundingClientRect());
    const beforeHeight = group.getBoundingClientRect().height;
    cancelLayout();
    applyLayout(next);
    if (reducedMotion.matches) { restoreText(); return; }
    const after = cards.map((card) => card.getBoundingClientRect());
    const afterHeight = group.offsetHeight;
    animations = cards.map((card, index) => {
      const start = before[index];
      const end = after[index];
      const inverse = `translate(${start.left - end.left}px, ${start.top - end.top}px) scale(${start.width / end.width}, ${start.height / end.height})`;
      return card.animate([
        { transform: inverse },
        { transform: 'none' },
      ], layoutTiming);
    });
    const layoutAnimation = group.animate([
      { height: `${beforeHeight}px` }, { height: `${afterHeight}px` },
    ], layoutTiming);
    animations.push(layoutAnimation);
    await layoutAnimation.finished.catch(() => {});
    if (current !== revision) return;
    cancelLayout();
    // Reveal all cards' text at its final, undistorted size after the layout settles.
    await fadeText(1, 240);
    if (current === revision) restoreText();
  };
  cards.forEach((card) => {
    card.querySelector('summary')?.addEventListener('click', (event) => {
      event.preventDefault();
      change(requested === card ? null : card);
    });
  });
  const settle = () => {
    revision++;
    cancelLayout();
    restoreText();
    applyLayout(requested);
  };
  window.addEventListener('resize', settle);
  reducedMotion.addEventListener('change', settle);
});
