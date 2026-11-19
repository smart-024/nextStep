const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

const stages = [
  { code: 'E1', title: 'Decidir con los datos actuales', period: '2026 Q4 – 2027 Q1' },
  { code: 'E2', title: 'Registrar la logística', period: '2027 Q2 – Q3' },
  { code: 'E3', title: 'Integrar y optimizar', period: '2027 Q4 – 2028' },
];

const stateLabels = { enabler: 'Habilitador', removed: 'Se elimina' };
const itemClass = (item) => [
  item.outside ? 'architecture-outside' : '',
  item.state ? `architecture-${item.state}` : '',
  item.stage ? `architecture-stage-${item.stage.includes('E3') ? '3' : item.stage.includes('E2') ? '2' : '1'}` : '',
].filter(Boolean).join(' ');

function itemLabel(item) {
  return `${escapeHtml(item.title)}${item.stage ? `<span class="architecture-stage-tag">${escapeHtml(item.stage)}</span>` : ''}${item.state ? `<span class="architecture-state-tag">${escapeHtml(stateLabels[item.state])}</span>` : ''}${item.outside ? '<span class="visually-hidden"> · Fuera del ERP o sin registro</span>' : ''}`;
}

function renderItem(item, id) {
  const value = typeof item === 'string' ? { title: item } : item;
  if (!value.description) return `<li class="${itemClass(value)}">${itemLabel(value)}</li>`;
  return `<li class="architecture-process ${itemClass(value)}">
    <button class="architecture-process-trigger" type="button" popovertarget="${id}" aria-expanded="false" aria-controls="${id}">
      ${itemLabel(value)}
    </button>
    <div id="${id}" class="architecture-process-popover" popover="auto" role="region" aria-labelledby="${id}-title">
      <div class="process-popover-heading"><h5 id="${id}-title">${escapeHtml(value.title)}</h5><button type="button" popovertarget="${id}" popovertargetaction="hide" aria-label="Cerrar detalle de ${escapeHtml(value.title)}"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg></button></div>
      <div class="process-popover-content" tabindex="0" role="region" aria-labelledby="${id}-title">${Array.isArray(value.description)
        ? value.description.map((detail) => `<div class="process-popover-detail"><h6>${escapeHtml(detail.title)}</h6><p>${escapeHtml(detail.text)}</p></div>`).join('')
        : `<p>${escapeHtml(value.description)}</p>`}</div>
    </div>
  </li>`;
}

export function renderArchitectureDiagram({ id, title, description, caption, layers, destination = false, navigation = '', afterDiagram = '' }) {
  return `
    <section id="${id}" class="dashboard-section architecture${destination ? ' architecture-destination' : ''}" aria-labelledby="${id}-titulo">
      <h2 id="${id}-titulo" tabindex="-1">${escapeHtml(title)}</h2>
      <p class="section-description">${(Array.isArray(description) ? description : [description]).map(escapeHtml).join('<br />')}</p>
      <figure class="architecture-diagram" aria-labelledby="${id}-caption">
        <figcaption id="${id}-caption">${escapeHtml(caption)}</figcaption>
        ${destination ? `
          <ul class="architecture-stage-legend" aria-label="Etapas de la transformación">
            ${stages.map((stage, index) => `<li><span class="architecture-stage-tag architecture-stage-${index + 1}">${stage.code}</span><div>${stage.title}<small>${stage.period}</small></div></li>`).join('')}
          </ul>
          <ul class="architecture-state-legend" aria-label="Tipos de cambio">
            <li><span class="legend-retained" aria-hidden="true"></span>Se mantiene</li>
            <li><span class="legend-enabler" aria-hidden="true"></span>Habilitador</li>
            <li><span class="legend-removed" aria-hidden="true"></span>Se elimina</li>
          </ul>` : `
          <ul class="architecture-state-legend" aria-label="Integración con el ERP">
            <li><span class="legend-integrated" aria-hidden="true"></span>Componentes integrados al ERP</li>
            <li><span class="legend-enabler" aria-hidden="true"></span>Operan por fuera del sistema o no cuentan con un registro centralizado.</li>
          </ul>`}
        <div class="architecture-layers">
          ${layers.map((layer, index) => `
            <section class="architecture-layer architecture-layer-${index + 1}" aria-labelledby="${id}-layer-${index + 1}-title">
              <h3 id="${id}-layer-${index + 1}-title">${escapeHtml(layer.title)}</h3>
              <div class="architecture-groups">
                ${layer.groups.map((group, groupIndex) => `
                  <div class="architecture-group ${itemClass(group)}">
                    <h4>${itemLabel(group)}</h4>
                    <ul>
                      ${group.items.map((item, itemIndex) => renderItem(item, `${id}-detail-${index}-${groupIndex}-${itemIndex}`)).join('')}
                    </ul>
                  </div>`).join('')}
              </div>
            </section>`).join('')}
        </div>
      </figure>
      ${afterDiagram}
      ${navigation}
    </section>`;
}
