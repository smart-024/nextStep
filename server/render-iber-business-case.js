import { businessCase } from './iber-business-case.js';

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

function renderStory(description) {
  const parts = description.match(/^Como (.*?), quiero (.*?), para (.*)$/s);
  if (!parts) return `<p>${escapeHtml(description)}</p>`;
  return `<dl class="story-statement">${['Como', 'Quiero', 'Para'].map((label, index) => `
    <div><dt>${label}</dt><dd>${escapeHtml(parts[index + 1])}</dd></div>`).join('')}
  </dl>`;
}

export function renderBusinessCase() {
  const outcomes = new Map(businessCase.outcomes.map((outcome) => [outcome.code, outcome.title]));
  return `
    <section id="caso-de-negocio" class="dashboard-section business-case" aria-labelledby="caso-de-negocio-titulo">
      <h2 id="caso-de-negocio-titulo" tabindex="-1">Caso de Negocio</h2>
      <p class="section-description">IBER · Transformación digital. Objetivos estratégicos y requerimientos iniciales del proyecto.</p>

      <section class="business-block" aria-labelledby="objetivos-titulo">
        <h3 id="objetivos-titulo">Objetivos Estratégicos</h3>
        <p class="business-intro">${escapeHtml(businessCase.intro)}</p>
        <div class="business-outcomes">
          ${businessCase.outcomes.map((outcome) => `
            <article class="panel page-panel">
              <h4>${escapeHtml(outcome.title)}</h4>
              <p>${escapeHtml(outcome.measure)}</p>
            </article>`).join('')}
        </div>
        <div class="objective-grid">
          ${businessCase.objectives.map((objective) => `
            <article class="panel page-panel objective-card">
              <div class="business-card-meta"><span class="status-tag">${escapeHtml(objective.code)}</span><span>${escapeHtml(objective.deadline)}</span></div>
              <h4>${escapeHtml(objective.title)}</h4>
              <dl>
                <div><dt>Indicador</dt><dd>${escapeHtml(objective.indicator)}</dd></div>
                <div><dt>Meta</dt><dd>${escapeHtml(objective.target)}</dd></div>
                <div><dt>Aporta a</dt><dd>${escapeHtml(outcomes.get(objective.outcome))}</dd></div>
              </dl>
            </article>`).join('')}
        </div>
        <details class="panel page-panel business-details">
          <summary>Cómo se fijaron los plazos</summary>
          ${businessCase.timeline.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
        </details>
        <p class="business-interpretation">${escapeHtml(businessCase.interpretation)}</p>
      </section>

      <section class="business-block" aria-labelledby="historias-titulo">
        <h3 id="historias-titulo">Historias de Usuario</h3>
        <p class="section-description">14 historias vinculadas a los objetivos estratégicos: quién necesita la funcionalidad, qué busca hacer y para qué.</p>
        <div class="story-list">
          ${businessCase.stories.map((story) => `
            <article class="panel page-panel user-story">
              <div class="story-meta"><span class="story-code">${escapeHtml(story.code)}</span><span class="status-tag">Objetivo ${escapeHtml(story.objective)}</span></div>
              <h4>${escapeHtml(story.title)}</h4>
              ${renderStory(story.description)}
            </article>`).join('')}
        </div>
      </section>
    </section>`;
}
