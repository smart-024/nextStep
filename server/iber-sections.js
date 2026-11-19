import { renderBusinessCase } from './render-iber-business-case.js';
import { renderCurrentArchitecture } from './render-iber-architecture.js';
import { renderDestinationArchitecture } from './render-iber-destination.js';

// The sidebar and bottom navigation share this order.
export const iberSections = [
  { id: 'caso-de-negocio', title: 'Caso de Negocio', render: renderBusinessCase },
  { id: 'arquitectura-actual', title: 'Arquitectura Actual', render: renderCurrentArchitecture },
  { id: 'arquitectura-destino', title: 'Arquitectura destino', render: renderDestinationArchitecture },
];

export function renderSectionNavigation(index) {
  const previous = iberSections[index - 1];
  const next = iberSections[index + 1];
  return `<nav class="section-navigation" aria-label="Navegación entre secciones">
    ${previous ? `<a class="section-previous" href="#${previous.id}" data-section="${previous.id}" aria-label="Atrás: ${previous.title}">Atrás</a>` : ''}
    ${next ? `<a class="section-next" href="#${next.id}" data-section="${next.id}" aria-label="Siguiente: ${next.title}">Siguiente</a>` : ''}
  </nav>`;
}
