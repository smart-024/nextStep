// Evaluation content stays in authenticated HTML, including future detail graphs.
export const evaluationCriteria = [
  { id: 'funcional', title: 'Funcional', weight: 35, description: 'Qué tan bien cubre las necesidades de análisis de IBER.' },
  { id: 'tecnico', title: 'Técnico', weight: 25, description: 'Qué tan bien se integra con el entorno tecnológico actual.' },
  { id: 'proveedor', title: 'Proveedor', weight: 25, description: 'Quién implementa, mantiene y acompaña a los usuarios.' },
  { id: 'economico', title: 'Económico', weight: 15, description: 'Cuál es el costo total de la solución en el tiempo.' },
];

// A future server-side chart renderer can fill each slot without changing selection behavior.
export function renderEvaluationCriteria({ renderDetailGraph = () => '' } = {}) {
  let angle = -Math.PI / 2;
  const slices = evaluationCriteria.map((criterion) => {
    const start = angle;
    angle += criterion.weight / 100 * Math.PI * 2;
    const point = (a, radius) => `${(140 + Math.cos(a) * radius).toFixed(3)} ${(140 + Math.sin(a) * radius).toFixed(3)}`;
    const middle = (start + angle) / 2;
    return `<g class="criteria-wedge criterion-${criterion.id}" style="--slice-x: ${(Math.cos(middle) * 7).toFixed(3)}px; --slice-y: ${(Math.sin(middle) * 7).toFixed(3)}px">
      <path class="criteria-slice" data-criterion="${criterion.id}" d="M 140 140 L ${point(start, 128)} A 128 128 0 0 1 ${point(angle, 128)} Z" role="button" tabindex="0" aria-label="${criterion.title}: ${criterion.weight}%" aria-pressed="false" aria-controls="criterion-detail-${criterion.id}" />
      <text x="${(140 + Math.cos(middle) * 86).toFixed(3)}" y="${(140 + Math.sin(middle) * 86).toFixed(3)}" aria-hidden="true">${criterion.weight}%</text>
    </g>`;
  }).join('');
  return `<section class="business-block" aria-labelledby="criterios-evaluacion-titulo" data-evaluation-criteria>
    <h3 id="criterios-evaluacion-titulo">Criterios de evaluación de alternativas</h3>
    <div class="organization-copy"><p>Las alternativas se evaluaron con cuatro criterios ponderados, definidos a partir de las necesidades y restricciones de IBER.</p></div>
    <figure class="criteria-chart" aria-labelledby="criterios-chart-caption">
      <svg class="criteria-pie" viewBox="0 0 280 280" role="group" aria-labelledby="criterios-pie-titulo">
        <title id="criterios-pie-titulo">Ponderación de los criterios de evaluación</title>
        ${slices}
      </svg>
      <figcaption id="criterios-chart-caption">
        <p class="criteria-chart-label">Criterios y ponderación</p>
        <div class="criteria-legend" role="group" aria-label="Seleccionar criterio">
          ${evaluationCriteria.map((criterion) => `<button class="criteria-choice criterion-${criterion.id}" type="button" data-criterion="${criterion.id}" aria-controls="criterion-detail-${criterion.id}" aria-pressed="false" disabled><span class="criteria-swatch" aria-hidden="true"></span><span>${criterion.title}</span><span>${criterion.weight}%</span></button>`).join('')}
        </div>
      </figcaption>
    </figure>
    <div class="criteria-detail-shell" aria-live="polite" aria-atomic="true">
      ${evaluationCriteria.map((criterion) => {
        const graph = renderDetailGraph(criterion);
        return `<div id="criterion-detail-${criterion.id}" class="criteria-detail" role="region" aria-labelledby="criterion-title-${criterion.id}">
          <h4 id="criterion-title-${criterion.id}">${criterion.title}</h4>
          <p>${criterion.description}</p>
          <div class="criteria-detail-graph" data-criterion-graph="${criterion.id}"${graph ? '' : ' hidden'}>${graph}</div>
        </div>`;
      }).join('')}
    </div>
  </section>`;
}
