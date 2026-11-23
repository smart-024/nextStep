// Server-only evaluation transcribed from the supplied criteria/score table.
export const scenarioCriteria = [
  { label: 'Integración con Odoo y con planillas Excel', weight: 20, scores: [5, 5, 3, 3] },
  { label: 'Riesgo y adopción (validar los indicadores antes de usarlos)', weight: 20, scores: [1, 4, 1, 4] },
  { label: 'Costo total a 3 años (licencias, implementación, infraestructura)', weight: 15, scores: [4, 4, 2, 3] },
  { label: 'Operable sin personal de IT propio', weight: 15, scores: [2, 2, 4, 4] },
  { label: 'Tiempo hasta los primeros tableros', weight: 10, scores: [2, 4, 3, 5] },
  { label: 'Protección y ubicación de los datos (Ley 18.331)', weight: 10, scores: [5, 5, 2, 2] },
  { label: 'Escalabilidad y acceso móvil para unas 27 personas', weight: 10, scores: [3, 3, 5, 5] },
];

const modalities = ['On-premises + Big Bang', 'On-premises + Modular', 'SaaS + Big Bang', 'SaaS + Modular'];
export const scenarioScores = modalities.map((modality, index) => ({
  id: `E${index + 1}`,
  modality,
  score: scenarioCriteria.reduce((sum, criterion) => sum + criterion.weight * criterion.scores[index] / 100, 0),
}));
const formatScore = (value) => value.toFixed(2).replace('.', ',');

export function renderScenarioScores() {
  const ranked = [...scenarioScores].sort((a, b) => b.score - a.score);
  return `<section class="business-block" aria-labelledby="mejor-escenario-titulo">
    <h3 id="mejor-escenario-titulo">Escenario mejor posicionado</h3>
    <div class="organization-copy"><p><strong>El escenario 2 (On-premises + Modular) obtuvo el mayor puntaje: 3,90 sobre 5.</strong> Propone instalar la plataforma de análisis en el data center de Montevideo COMM, junto al ERP, e implementarla progresivamente. Permite mantener los datos en la infraestructura local y validar los indicadores por etapas antes de extender su uso.</p></div>
    <figure class="scenario-score-chart" aria-labelledby="scenario-score-caption">
      <figcaption id="scenario-score-caption">Puntaje ponderado · escala de 0 a 5</figcaption>
      <ol class="scenario-score-list">
        ${ranked.map((scenario, index) => `<li class="${index === 0 ? 'scenario-score-best' : ''}">
          <div class="scenario-score-label"><span><span class="scenario-score-rank">${index + 1}.º</span> ${scenario.id} <span class="scenario-score-modality">${scenario.modality}</span></span><span class="scenario-score-value">${formatScore(scenario.score)} <span>/ 5</span></span></div>
          <div class="domain-gap-track" aria-hidden="true"><span style="width: ${(scenario.score / 5 * 100).toFixed(2)}%"></span></div>
        </li>`).join('')}
      </ol>
    </figure>
    <div class="scenario-score-table-region" role="region" aria-label="Comparación de criterios y puntajes de los cuatro escenarios" tabindex="0">
      <table class="scenario-score-table">
        <caption>Criterios de evaluación y ponderación · puntajes de 1 a 5</caption>
        <thead><tr><th scope="col">Criterio</th><th scope="col">Peso</th>${scenarioScores.map((scenario) => `<th scope="col"${scenario.id === 'E2' ? ' class="score-best-column"' : ''}>${scenario.id}</th>`).join('')}</tr></thead>
        <tbody>${scenarioCriteria.map((criterion) => `<tr><th scope="row">${criterion.label}</th><td>${criterion.weight}%</td>${criterion.scores.map((score, index) => `<td${index === 1 ? ' class="score-best-column"' : ''}>${score}</td>`).join('')}</tr>`).join('')}</tbody>
        <tfoot>
          <tr><th scope="row">Puntaje ponderado</th><td>100%</td>${scenarioScores.map((scenario) => `<td${scenario.id === 'E2' ? ' class="score-best-column"' : ''}>${formatScore(scenario.score)}</td>`).join('')}</tr>
          <tr><th scope="row">Ranking</th><td>—</td>${scenarioScores.map((scenario) => `<td${scenario.id === 'E2' ? ' class="score-best-column"' : ''}>${ranked.findIndex((item) => item.id === scenario.id) + 1}.º</td>`).join('')}</tr>
        </tfoot>
      </table>
    </div>
    <div class="organization-copy scenario-score-closing"><p>El escenario 4 (SaaS + Modular) permanece como alternativa si IBER confirma que puede alojar sus datos en la nube. Por eso, ambas modalidades se consideran en el pedido de propuestas.</p></div>
  </section>`;
}
