// Highlight behavior only; cost figures stay in authenticated HTML.
document.querySelectorAll('[data-cost-chart]').forEach((chart) => {
  const buttons = [...chart.querySelectorAll('.cost-choice')];
  const series = [...chart.querySelectorAll('.cost-series')];
  const focus = (id) => {
    chart.dataset.focus = id || '';
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.series === id)));
    series.forEach((line) => line.classList.toggle('is-dimmed', Boolean(id) && line.dataset.series !== id));
  };
  buttons.forEach((button) => {
    button.disabled = false;
    // A second click on the highlighted alternative shows all lines again.
    button.addEventListener('click', () => focus(chart.dataset.focus === button.dataset.series ? '' : button.dataset.series));
  });
  series.forEach((line) => {
    line.addEventListener('pointerenter', () => { if (!chart.dataset.focus) series.forEach((other) => other.classList.toggle('is-dimmed', other !== line)); });
    line.addEventListener('pointerleave', () => { if (!chart.dataset.focus) series.forEach((other) => other.classList.remove('is-dimmed')); });
  });
});
