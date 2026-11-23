// Consulting scope is rendered only in authenticated IBER HTML.
import { renderEvaluationCriteria } from './render-iber-evaluation-criteria.js';
import { renderMarketShortlist } from './render-iber-market-shortlist.js';
const scopeColumns = [
  {
    id: 'incluye',
    title: 'Incluye',
    items: [
      'Relevamiento y definición de requerimientos.',
      'Definición de criterios ponderados.',
      'Análisis del mercado y preselección de soluciones.',
      'Evaluación de propuestas y recomendación fundamentada.',
      'Hoja de ruta para completar la transformación.',
    ],
  },
  {
    id: 'no-incluye',
    title: 'No incluye',
    items: [
      'Implementación, instalación ni puesta en marcha.',
      'Desarrollo de tableros o integración técnica.',
      'Contratación o adjudicación del proveedor.',
      'Ejecución de proyectos logísticos complementarios.',
      'Gestión del cambio y capacitación durante la implementación.',
    ],
  },
];

export function renderMarketScope(navigation = '') {
  return `<section id="alcance-mercado-soluciones" class="dashboard-section market-scope" aria-labelledby="alcance-mercado-titulo">
    <h2 id="alcance-mercado-titulo" tabindex="-1">Alcance y análisis del mercado de soluciones</h2>
    <p class="section-description">De la necesidad a la selección de alternativas.<br />Definimos el alcance de la consultoría y analizamos las opciones disponibles en el mercado para identificar las soluciones que mejor responden a las necesidades de IBER.</p>
    <section class="business-block" aria-labelledby="alcance-consultoria-titulo">
      <h3 id="alcance-consultoria-titulo">Alcance de la consultoría</h3>
      <div class="organization-copy"><p>El proyecto busca recomendar a IBER una solución de análisis de información y un proveedor que permitan mejorar la toma de decisiones sobre la facturación y la rentabilidad de sus sucursales, aprovechando los datos disponibles en Odoo y en las planillas de gestión.</p></div>
      <div class="scope-comparison" role="group" aria-label="Qué incluye y qué no incluye la consultoría">
        ${scopeColumns.map((column) => `<section class="scope-column scope-${column.id}" aria-labelledby="alcance-${column.id}-titulo">
          <h4 id="alcance-${column.id}-titulo">${column.title}</h4>
          <ul>${column.items.map((item) => `<li>${item}</li>`).join('')}</ul>
        </section>`).join('')}
      </div>
    </section>
    ${renderEvaluationCriteria()}
    ${renderMarketShortlist()}
    <section class="business-block" aria-labelledby="preseleccion-siguientes-pasos-titulo">
      <h3 id="preseleccion-siguientes-pasos-titulo">Preselección: ¿qué sigue?</h3>
      <div class="organization-copy"><p>Power BI y Metabase se preseleccionaron para avanzar a la evaluación formal. El pedido de propuestas solicitará a implementadores de ambas soluciones cotizar la instalación propia y el servicio en la nube, por etapas y por perfil de usuario. La elección final se realizará con precios reales y con la definición de IBER sobre la ubicación de los datos.</p></div>
    </section>
    ${navigation}
  </section>`;
}
