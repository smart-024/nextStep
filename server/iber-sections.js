import { renderBusinessCase } from './render-iber-business-case.js';
import { renderCurrentArchitecture } from './render-iber-architecture.js';
import { renderDestinationArchitecture } from './render-iber-destination.js';
import { renderSolutionScenarios } from './render-iber-solutions.js';
import { renderMarketScope } from './render-iber-market.js';
import { renderRfpMatrix } from './render-iber-rfp.js';
import { renderSupplierEvaluation } from './render-iber-suppliers.js';
import { renderAiInnovation } from './render-iber-ai.js';
import { renderConclusions } from './render-iber-conclusions.js';

// The sidebar and bottom navigation share this order.
export const iberSections = [
  { id: 'caso-de-negocio', title: 'Caso de Negocio', render: renderBusinessCase },
  { id: 'arquitectura-actual', title: 'Arquitectura Actual', render: renderCurrentArchitecture },
  { id: 'arquitectura-destino', title: 'Arquitectura destino', render: renderDestinationArchitecture },
  { id: 'escenarios-de-solucion', title: 'Escenarios de Solución', render: renderSolutionScenarios },
  { id: 'alcance-mercado-soluciones', title: 'Alcance y análisis del mercado de soluciones', render: renderMarketScope },
  { id: 'matriz-rfp', title: 'Matriz RFP', render: renderRfpMatrix },
  { id: 'evaluacion-proveedores', title: 'Evaluación de proveedores', render: renderSupplierEvaluation },
  { id: 'innovacion-ia', title: 'Oportunidad de innovación con IA', render: renderAiInnovation },
  { id: 'conclusiones', title: 'Conclusiones y próximos pasos', render: renderConclusions },
];

export function renderSectionNavigation(index) {
  const previous = iberSections[index - 1];
  const next = iberSections[index + 1];
  return `<nav class="section-navigation" aria-label="Navegación entre secciones">
    ${previous ? `<a class="section-previous" href="#${previous.id}" data-section="${previous.id}" aria-label="Atrás: ${previous.title}">Atrás</a>` : ''}
    ${next ? `<a class="section-next" href="#${next.id}" data-section="${next.id}" aria-label="Siguiente: ${next.title}">Siguiente</a>` : ''}
  </nav>`;
}
