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

export function renderArchitectureDiagram({ id, title, description, caption, layers, destination = false }) {
  return `
    <section id="${id}" class="dashboard-section architecture" aria-labelledby="${id}-titulo">
      <h2 id="${id}-titulo" tabindex="-1">${escapeHtml(title)}</h2>
      <p class="section-description">${escapeHtml(description)}</p>
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
          </ul>` : '<p class="architecture-legend"><span aria-hidden="true"></span> Borde punteado: fuera del ERP o sin registro.</p>'}
        <div class="architecture-layers">
          ${layers.map((layer, index) => `
            <section class="architecture-layer architecture-layer-${index + 1}" aria-labelledby="${id}-layer-${index + 1}-title">
              <h3 id="${id}-layer-${index + 1}-title">${escapeHtml(layer.title)}</h3>
              <div class="architecture-groups">
                ${layer.groups.map((group) => `
                  <div class="architecture-group ${itemClass(group)}">
                    <h4>${itemLabel(group)}</h4>
                    <ul>
                      ${group.items.map((item) => {
                        const value = typeof item === 'string' ? { title: item } : item;
                        return `<li class="${itemClass(value)}">${itemLabel(value)}</li>`;
                      }).join('')}
                    </ul>
                  </div>`).join('')}
              </div>
            </section>`).join('')}
        </div>
      </figure>
    </section>`;
}
