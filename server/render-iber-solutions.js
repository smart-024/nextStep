// Client analysis stays in the authenticated IBER response.
import { scenarioAnalysis } from './iber-scenario-analysis.js';
import { renderScenarioScores } from './render-iber-scenario-scores.js';

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

function renderScenarioComparison(id) {
  const analysis = scenarioAnalysis[id];
  return `<div class="scenario-comparison" role="group" aria-label="Fortalezas y debilidades del escenario ${id}">
    ${[
      { key: 'strengths', title: 'Fortalezas' },
      { key: 'weaknesses', title: 'Debilidades' },
    ].map((column) => `<section class="scenario-comparison-column scenario-${column.key}" aria-labelledby="scenario-${id}-${column.key}">
      <h4 id="scenario-${id}-${column.key}">${column.title}</h4>
      <ul>${analysis[column.key].map((text) => `<li>${escapeHtml(text)}</li>`).join('')}</ul>
    </section>`).join('')}
  </div>`;
}

const distribution = [
  { label: 'Incluidos', count: 18, className: 'gap-included' },
  { label: 'A mejorar', count: 26, className: 'gap-improve' },
  { label: 'A eliminar', count: 6, className: 'gap-remove' },
];

const domainGaps = [
  { label: 'Datos', percent: 38 },
  { label: 'Aplicaciones', percent: 27 },
  { label: 'Tecnología', percent: 27 },
  { label: 'Negocio', percent: 12 },
];

const solutionScenarios = [
  { id: 'E1', modality: 'On-premises + Big Bang', description: 'Instalación propia. Todos los tableros y usuarios al mismo tiempo.' },
  { id: 'E2', modality: 'On-premises + Modular', description: 'Instalación propia. Implementación gradual por olas.', bestRated: true },
  { id: 'E3', modality: 'SaaS + Big Bang', description: 'Servicio en la nube. Todos los tableros y usuarios al mismo tiempo.' },
  { id: 'E4', modality: 'SaaS + Modular', description: 'Servicio en la nube. Implementación gradual por olas.' },
];

function renderPie() {
  const total = distribution.reduce((sum, item) => sum + item.count, 0);
  let angle = -Math.PI / 2;
  return distribution.map((item) => {
    const start = angle;
    angle += item.count / total * Math.PI * 2;
    const point = (a, radius) => `${(140 + Math.cos(a) * radius).toFixed(3)} ${(140 + Math.sin(a) * radius).toFixed(3)}`;
    const midpoint = (start + angle) / 2;
    const percent = Math.round(item.count / total * 100);
    return `<g class="${item.className}">
      <path d="M 140 140 L ${point(start, 128)} A 128 128 0 ${item.count / total > 0.5 ? 1 : 0} 1 ${point(angle, 128)} Z" />
      <text x="${(140 + Math.cos(midpoint) * 85).toFixed(3)}" y="${(140 + Math.sin(midpoint) * 85).toFixed(3)}">${percent}%</text>
    </g>`;
  }).join('');
}

export function renderSolutionScenarios(navigation = '') {
  return `<section id="escenarios-de-solucion" class="dashboard-section solution-scenarios" aria-labelledby="escenarios-de-solucion-titulo">
    <h2 id="escenarios-de-solucion-titulo" tabindex="-1">Brechas y escenarios de solución</h2>
    <p class="section-description">Comparamos la arquitectura actual con la arquitectura destino para identificar qué debe mantenerse, mejorarse, eliminarse o incorporarse, y evaluar los caminos posibles para alcanzar los objetivos de IBER.</p>
    <section class="business-block" aria-labelledby="resumen-brechas-titulo">
      <h3 id="resumen-brechas-titulo">Resumen del análisis de brechas</h3>
      <div class="organization-copy"><p>El análisis comparó 50 bloques de construcción (ABB) actuales con 55 elementos en la arquitectura destino. De los 50 actuales, 18 se mantienen, 26 requieren mejoras y 6 se eliminan. Además, la arquitectura destino incorpora 14 elementos nuevos.</p></div>
      <figure class="gap-distribution" aria-labelledby="distribucion-brechas-caption">
        <svg class="gap-pie" viewBox="0 0 280 280" role="img" aria-labelledby="distribucion-brechas-titulo distribucion-brechas-descripcion">
          <title id="distribucion-brechas-titulo">Distribución de los 50 ABB actuales</title>
          <desc id="distribucion-brechas-descripcion">18 incluidos (36%), 26 a mejorar (52%) y 6 a eliminar (12%).</desc>
          ${renderPie()}
        </svg>
        <figcaption id="distribucion-brechas-caption">
          <p class="gap-chart-title">Distribución de los ABB actuales</p>
          <ul class="gap-legend">
            ${distribution.map((item) => `<li><span class="gap-swatch ${item.className}" aria-hidden="true"></span><span>${item.label}</span><span class="gap-value">${item.count} <span>(${Math.round(item.count / 50 * 100)}%)</span></span></li>`).join('')}
          </ul>
        </figcaption>
      </figure>
    </section>
    <section class="business-block" aria-labelledby="brechas-dominio-titulo">
      <h3 id="brechas-dominio-titulo">Brechas por dominio</h3>
      <div class="organization-copy"><p>El dominio de datos concentra la mayor proporción de elementos nuevos. Esto refleja la necesidad de incorporar capacidades de análisis, gobierno y calidad de la información. En negocio predominan las mejoras sobre procesos existentes; aplicaciones y tecnología acompañan la incorporación de la plataforma de análisis.</p></div>
      <figure class="domain-gap-chart" aria-labelledby="brechas-dominio-caption">
        <figcaption id="brechas-dominio-caption">ABB nuevos por dominio (%)</figcaption>
        <ul class="domain-gap-list">
          ${domainGaps.map((domain) => `<li>
            <div class="domain-gap-label"><span>${domain.label}</span><span class="domain-gap-value">${domain.percent}%</span></div>
            <div class="domain-gap-track" aria-hidden="true"><span style="width: ${domain.percent}%"></span></div>
          </li>`).join('')}
        </ul>
      </figure>
    </section>
    <section class="business-block" aria-labelledby="soluciones-escenarios-titulo">
      <h3 id="soluciones-escenarios-titulo">Escenarios de solución</h3>
      <div class="organization-copy"><p>Para definir cómo incorporar la plataforma de análisis, se evaluaron dos variables: dónde se instala la solución y cómo se implementa. La combinación dio lugar a cuatro escenarios.</p></div>
      <div class="scenario-tabs" data-scenario-tabs>
        <div class="scenario-tab-list" aria-labelledby="soluciones-escenarios-titulo">
          ${solutionScenarios.map((scenario) => `<button id="scenario-tab-${scenario.id}" type="button" class="scenario-tab${scenario.bestRated ? ' scenario-best-rated' : ''}" aria-controls="scenario-panel-${scenario.id}" disabled><span class="scenario-code">${scenario.id}</span><span>${scenario.modality}</span>${scenario.bestRated ? '<span class="scenario-recommendation">Escenario mejor puntuado</span>' : ''}</button>`).join('')}
        </div>
        <div class="scenario-panel-shell">
          ${solutionScenarios.map((scenario) => `<div id="scenario-panel-${scenario.id}" class="scenario-panel" aria-labelledby="scenario-tab-${scenario.id}"><p>${scenario.description}</p>${renderScenarioComparison(scenario.id)}</div>`).join('')}
        </div>
      </div>
    </section>
    ${renderScenarioScores()}
    ${navigation}
  </section>`;
}
