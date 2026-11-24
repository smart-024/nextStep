import { businessCase, storyCategories } from './iber-business-case.js';

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

// Allow only explicit line breaks; escape all other markup in the copy.
const renderTextWithBreaks = (value) => String(value)
  .split(/<br\s*\/?>|\r?\n/gi)
  .map(escapeHtml)
  .join('<br />');

function renderStory(description) {
  const parts = description.match(/^Como (.*?), quiero (.*?), para (.*)$/s);
  if (!parts) return `<p>${escapeHtml(description)}</p>`;
  return `<dl class="story-statement">${['Como', 'Quiero', 'Para'].map((label, index) => `
    <div><dt>${label}</dt><dd>${escapeHtml(parts[index + 1])}</dd></div>`).join('')}
  </dl>`;
}

export function renderBusinessCase(navigation = '') {
  const outcomes = new Map(businessCase.outcomes.map((outcome) => [outcome.code, outcome.title]));
  const storiesByCode = new Map(businessCase.stories.map((story) => [story.code, story]));
  return `
    <section id="caso-de-negocio" class="dashboard-section business-case" aria-labelledby="caso-de-negocio-titulo">
      <h2 id="caso-de-negocio-titulo" tabindex="-1">Caso de negocio - IBER</h2>
        <p class="section-description">
          Relevamiento organizacional y oportunidades de transformación digital.<br />
          Conocé la organización, sus objetivos estratégicos y los principales desafíos identificados durante el relevamiento realizado por NextStep.
        </p>
      <section class="business-block organization-context" aria-labelledby="contexto-organizacional-titulo">
        <h3 id="contexto-organizacional-titulo">Contexto organizacional</h3>
        <div class="organization-copy">
          <p>IBER es una empresa uruguaya especializada en la comercialización de vinos, bebidas alcohólicas y productos gourmet. Con 30 años de trayectoria y aproximadamente 100 colaboradores, cuenta con presencia en distintas localidades del país y un canal de venta online.</p>
          <p>Su modelo de negocio combina productos nacionales e importados y atiende a distintos segmentos del mercado, entre ellos consumidores finales, clientes corporativos, restaurantes, vinotecas y mayoristas. Esta diversidad de productos, canales y puntos de venta configura una operación descentralizada, que requiere coordinación entre las áreas comerciales, administrativas y logísticas.</p>
          <p>En este contexto, NextStep realizó un relevamiento organizacional para comprender la situación actual de IBER, identificar sus principales desafíos y detectar oportunidades de mejora vinculadas con la gestión, los procesos y la tecnología.</p>
        </div>
        <div class="organization-facts">
          <dl class="organization-stats">
            <div><dt>años de trayectoria</dt><dd class="organization-number">30</dd></div>
            <div><dt>colaboradores</dt><dd class="organization-number">100</dd></div>
          </dl>
          <ul class="organization-traits" aria-label="Cobertura y canales de venta">
            <li>Alcance nacional</li>
            <li>Locales físicos</li>
            <li>Canal online</li>
          </ul>
        </div>
      </section>

      <section class="business-block" aria-labelledby="objetivos-titulo">
        <h3 id="objetivos-titulo">Objetivos Estratégicos</h3>
        <p class="business-intro">${renderTextWithBreaks(businessCase.intro)}</p>
        <div class="business-outcomes">
          ${businessCase.outcomes.map((outcome) => `
            <article class="business-outcome">
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
        <p class="section-description">A partir de los objetivos estratégicos y las problemáticas identificadas, se definieron 14 historias de usuario que representan las necesidades funcionales de la organización. <br />Cada historia describe quién requiere una funcionalidad, qué necesita realizar y cuál es el resultado esperado, vinculando los requerimientos con los objetivos de negocio.</p>
        ${storyCategories.map((category) => `
          <section class="story-group" aria-labelledby="historias-${category.id}-titulo">
            <h4 id="historias-${category.id}-titulo">${escapeHtml(category.title)}</h4>
            <div class="story-list">
          ${category.codes.map((code) => storiesByCode.get(code)).map((story) => `
            <details class="panel page-panel user-story">
              <summary>
                <div class="story-meta"><span class="story-code">${escapeHtml(story.code)}</span><span class="status-tag">${escapeHtml(story.objective)}</span></div>
                <h5>${escapeHtml(story.title)}</h5>
              </summary>
              <div class="story-content">${renderStory(story.description)}</div>
            </details>`).join('')}
            </div>
          </section>`).join('')}
      </section>
      ${navigation}
    </section>`;
}
