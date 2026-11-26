// Supplier evaluation (final templates 06 v7, 07 v2 and 08 v2). Content stays in authenticated IBER HTML.
import { rfpAspects } from './render-iber-rfp.js';

// Three enabled alternatives, in ranking order. Scores out of 100 come from the RFP matrix v7.
const alternatives = [
  { id: 'odoo-kpi', name: 'Odoo · KPI+', short: 'Odoo · KPI+' },
  { id: 'powerbi-kpi', name: 'Power BI · KPI+', short: 'Power BI · KPI+' },
  { id: 'odoo-opentech', name: 'Odoo · OpenTech', short: 'Odoo · OpenTech' },
];

const aspectScores = {
  funcional: { scores: [69.6, 78.5, 57.1], why: 'Las tres construyen los tableros de IBER a medida. Power BI suma lo que en esa herramienta es nativo: tableros que se filtran desde los gráficos, semáforos e indicadores propios sin programar. OpenTech no cubre segmentos de cliente, rangos de precio, transportistas ni importaciones.' },
  tecnico: { scores: [85.5, 86.8, 64.3], why: 'Las tres cumplen los requisitos excluyentes. Odoo · KPI+ funciona dentro del ERP, con los datos en Uruguay. Power BI necesita una puerta de enlace y guarda los datos fuera del país, con garantías contractuales de Microsoft. OpenTech trabaja sobre una copia sincronizada, pero al principio sin permisos por sucursal.' },
  proveedor: { scores: [74.5, 69.3, 45.8], why: 'KPI+ obtiene el máximo en metodología, capacitación y documentación, con la conciliación de cada indicador contra la planilla de Administración. En Power BI baja porque no es partner de Microsoft. OpenTech no informa soporte, seguimiento ni acompañamiento. Ninguna tiene acuerdo de servicio con tiempos comprometidos.' },
  economico: { scores: [80.8, 43.3, 83], why: 'OpenTech tiene el menor costo estimado y Odoo · KPI+ el segundo. Power BI · KPI+ es la más cara por las licencias por usuario: queda más de un 40% por encima de la menor.' },
};
const categoryScores = {
  '1.1': [65, 65, 50], '1.2': [100, 100, 100], '1.3': [71.3, 100, 58.8], '1.4': [75, 78.8, 37.5], '1.5': [50, 87.5, 50],
  '2.1': [82.5, 87.5, 78.8], '2.2': [66.3, 43.8, 80], '2.3': [96.3, 88.8, 48.8], '2.4': [77.5, 77.5, 55], '2.5': [75, 100, 75], '2.6': [100, 100, 58.8], '2.7': [87.5, 100, 50],
  '3.1': [70, 70, 60], '3.2': [47.5, 47.5, 25], '3.3': [100, 100, 67.5], '3.4': [100, 100, 25], '3.5': [92.5, 57.5, 60],
  '4.1': [60, 60, 100], '4.2': [85, 35, 80], '4.3': [100, 0, 100], '4.4': [100, 100, 0],
};
const totals = alternatives.map((_, index) => rfpAspects.reduce((sum, aspect) => sum + aspect.weight * aspectScores[aspect.id].scores[index], 0));

const proposals = [
  { note: 'Partner Silver de Odoo con sociedad en Uruguay. Construye los tableros dentro del ERP actual, sobre Odoo 18 Community.', facts: [['Implementación', 'USD 12.000, en cuatro pagos contra entregables'], ['Soporte', 'USD 950 por mes desde el mes 5'], ['Licencias', 'Sin costo en Community'], ['Costo a tres años', 'USD 42.400']] },
  { note: 'KPI+ confirmó que hace el mismo alcance en Power BI, al mismo precio de implementación, sumando las licencias por usuario.', facts: [['Implementación', 'USD 12.000, el mismo precio que en Odoo'], ['Soporte', 'USD 950 por mes desde el mes 5'], ['Licencias', 'Power BI Pro, USD 168 por usuario al año'], ['Costo a tres años', 'USD 56.008']] },
  { note: 'Partner de Odoo en Montevideo y proveedor actual de redes de IBER. Envió una propuesta de referencia sobre Odoo 18 Community.', facts: [['Implementación', 'USD 6.000 a 9.000, como referencia'], ['Soporte', 'Por horas, a USD 80, más alojamiento'], ['Licencias', 'Sin costo en Community'], ['Costo a tres años', 'USD 39.580, estimación']] },
];

const differences = [
  ['Dónde quedan los datos', 'Las dos alternativas en Odoo los dejan en Uruguay. Power BI como servicio los guarda fuera del país, con garantías contractuales de Microsoft.'],
  ['Integración', 'Odoo · KPI+ no necesita conectores. Power BI necesita una puerta de enlace en el data center. OpenTech trabaja sobre una copia sincronizada en su propio alojamiento.'],
  ['Autonomía de IBER', 'Power BI permite crear indicadores propios, filtrar desde los gráficos y recibir alertas sin desarrollo. En Odoo esas funciones dependen del implementador.'],
  ['Soporte', 'Ninguna tiene acuerdo de servicio con tiempos comprometidos. KPI+ describe su soporte en detalle; OpenTech no lo informa.'],
];

// Cumulative cost in USD, constant values, without taxes.
const costSeries = [
  { id: 'kpi', label: 'Odoo · KPI+', values: [19600, 31000, 42400] },
  { id: 'powerbi', label: 'Power BI · KPI+', values: [24136, 40072, 56008] },
  { id: 'opentech', label: 'Odoo · OpenTech (estimación)', values: [16060, 27820, 39580] },
  { id: 'enterprise', label: 'Odoo · KPI+ con Enterprise (estimación)', values: [24914, 42923, 60933], dashed: true },
];
const costRows = [
  { group: 'Costo inicial (puesta en marcha)' },
  { label: 'Equipo de trabajo y consultoría', values: ['Incluida', 'Incluida', 'Incluida'] },
  { label: 'Implementación', values: [12000, 12000, 7500] },
  { label: 'Hardware y servicios de terceros', values: ['No cotizado', 'No cotizado', '—'] },
  { group: 'Costo recurrente (primer año)' },
  { label: 'Licencias', values: [0, 4536, 0] },
  { label: 'Mantenimiento y soporte', values: [7600, 7600, 6400] },
  { label: 'Alojamiento', values: ['—', '—', 2160] },
  { label: 'Subtotal recurrente año 1', values: [7600, 12136, 8560], subtotal: true },
  { group: 'Costo total por año' },
  { label: 'Año 1', values: [19600, 24136, 16060] },
  { label: 'Año 2', values: [11400, 15936, 11760] },
  { label: 'Año 3', values: [11400, 15936, 11760] },
  { label: 'Costo total a tres años', values: [42400, 56008, 39580], total: true },
];

const reasons = [
  'Obtiene el mayor puntaje, con un costo unos USD 13.600 menor que Power BI a tres años.',
  'No suma una plataforma ni licencias por usuario, y los datos no salen del país.',
  'Presenta la metodología más completa, con la conciliación de cada indicador contra la planilla de Administración.',
];

const balance = [
  {
    strengths: ['Sin plataforma nueva: los usuarios siguen en Odoo y los datos no salen del data center ni del país.', 'Sin costo por usuario: crecer no encarece.', 'Metodología completa y un mes de acompañamiento por etapa.', 'Pago contra entregables aprobados, con factura local.'],
    weaknesses: ['Tableros a medida en Community: más dependencia del implementador para cambiarlos.', 'Recomienda Enterprise sin cotizarlo: puede llevar el costo a unos USD 60.900.', 'Sin acuerdo de servicio con tiempos ni penalidades.', 'La copia de solo lectura no está cotizada.'],
  },
  {
    strengths: ['Mejor cumplimiento técnico-funcional: tableros interactivos, indicadores propios sin programar, alertas y suscripciones.', 'Lee las planillas de OneDrive e ingresa con las cuentas de Microsoft 365 de IBER.', 'El mismo implementador y la misma metodología que en Odoo.'],
    weaknesses: ['Unos USD 13.600 más que Odoo · KPI+ a tres años por las licencias.', 'Datos fuera de Uruguay, con garantías contractuales de Microsoft.', 'Necesita una puerta de enlace cuyo equipo no está cotizado.', 'KPI+ no es partner de Microsoft ni informa personas certificadas en Power BI.'],
  },
  {
    strengths: ['Menor inversión inicial y menor costo total estimado.', 'Calcula los reportes sobre una copia sincronizada, sin cargar la operación, con los datos en Uruguay.', 'Es proveedor actual de IBER.'],
    weaknesses: ['Propuesta de referencia: no informa acuerdo de servicio, horario ni canales de soporte, ni forma de pago.', 'Al principio, una vista única de IBER, sin permisos por sucursal.', 'Alojamiento y soporte estimados; la hora adicional es la más cara (USD 80).'],
  },
];

const gaps = [
  { item: '3.2.4', title: 'Acuerdo de servicio sin compromisos', effect: 'Una falla antes del cierre mensual no tiene tiempo de respuesta garantizado.', action: 'Negociar', treatment: 'Tiempos por severidad, disponibilidad, informe mensual y penalidades dentro del abono.' },
  { item: '1.4.1 · 1.5.1 · 2.5.1', title: 'Enterprise recomendado y no cotizado', effect: 'El costo total puede pasar de USD 42.400 a unos USD 60.900.', action: 'Negociar', treatment: 'Que KPI+ detalle qué se resuelve en Community y cotice Enterprise como opción.' },
  { item: '1.5.1', title: 'Indicadores propios sin programar', effect: 'Cada indicador nuevo requiere horas del implementador, a USD 35 la hora.', action: 'Aceptar', treatment: 'Prever una bolsa de horas anual o un desarrollo adicional en Community.' },
  { item: '2.1.4 · 2.2.4', title: 'Copia de solo lectura y capacidad del servidor', effect: 'Riesgo de lentitud en tiendas y e-commerce durante las consultas pesadas.', action: 'Negociar', treatment: 'Acordar con Montevideo COMM la copia o la ampliación del servidor y su costo.' },
  { item: '3.2.6', title: 'Responsabilidades con el proveedor del ERP', effect: 'Ante una falla, nadie es claramente responsable.', action: 'Cambio de proceso', treatment: 'Acuerdo escrito entre IBER, KPI+ y Montevideo COMM, con ambiente de prueba y responsables.' },
  { item: '2.4.1', title: 'Versión de Odoo sin soporte del fabricante', effect: 'La actualización de versión puede ser un costo no previsto.', action: 'Negociar', treatment: 'Incluir la actualización de los tableros en el abono o cotizarla aparte.' },
  { item: '1.1.7 · 1.1.8', title: 'Transportistas e importaciones', effect: 'Esos tableros no están en los cuatro meses de implementación.', action: 'Aceptar', treatment: 'Dependen del registro de la logística en el ERP, previsto en la segunda etapa.' },
  { item: '1.3.3', title: 'Filtrado desde los gráficos', effect: 'El diagnóstico es algo más lento.', action: 'Aceptar', treatment: 'Aceptarlo o validarlo en la demostración con los tableros de IBER.' },
];

const returnIndicators = [
  ['Tiempo de Administración', 'Horas por mes dedicadas a armar la planilla de gestión.'],
  ['Rentabilidad de las sucursales', 'Resultado neto por sucursal y sucursales con margen menor al 8%.'],
  ['Stock inmovilizado', 'Valor del stock sin ventas en más de 90 días, con una meta de hasta 5% por sucursal.'],
  ['Facturación', 'Variación interanual contra la meta de +10% en 2027.'],
  ['Calidad de los datos', 'Registros con errores detectados por los controles antes del cierre.'],
  ['Adopción', 'Usuarios activos por mes sobre los 27 previstos.'],
];

const beforeHiring = [
  'Confirmar si el alcance requiere Odoo Enterprise y su costo.',
  'Un acuerdo de servicio con tiempos comprometidos dentro del abono.',
  'La demostración con los tableros de IBER.',
];

function formatNumber(value, digits = 0) {
  return value.toLocaleString('es-AR', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}
const usd = (value) => (typeof value === 'number' ? `USD ${formatNumber(value)}` : value);
const scoreLabel = (value) => formatNumber(value, Number.isInteger(value) ? 0 : 1);

function renderScoreBars(scores, label) {
  return `<div class="supplier-bars" role="img" aria-label="${label}: ${alternatives.map((alternative, index) => `${alternative.name} ${scoreLabel(scores[index])}`).join('; ')}">
    ${scores.map((score, index) => `<div class="supplier-bar supplier-bar-${index + 1}"><span class="supplier-bar-track"><span style="width: ${score}%"></span></span><span class="supplier-bar-value">${scoreLabel(score)}</span></div>`).join('')}
  </div>`;
}

function renderAspectPanel(aspect) {
  const { why } = aspectScores[aspect.id];
  return `<div id="supplier-panel-${aspect.id}" class="scenario-panel supplier-aspect-panel" aria-labelledby="supplier-tab-${aspect.id}">
    <h4>${aspect.title} · ${Math.round(aspect.weight * 100)}% del total</h4>
    <p>${why}</p>
    <ol class="supplier-category-list" aria-label="Puntaje por categoría del aspecto ${aspect.title}">
      ${aspect.categories.map((category) => `<li><span class="supplier-category-name"><span class="rfp-code">${category.code}</span> ${category.title}</span>${renderScoreBars(categoryScores[category.code], category.title)}</li>`).join('')}
    </ol>
  </div>`;
}

function renderLegend() {
  return `<div class="supplier-legend" aria-hidden="true">${alternatives.map((alternative, index) => `<span class="supplier-key-${index + 1}">${alternative.name}</span>`).join('')}</div>`;
}

function renderCostChart() {
  const width = 640;
  const height = 300;
  const left = 64;
  const right = 210;
  const top = 20;
  const bottom = 44;
  const max = 70000;
  const x = (index) => left + (index * (width - left - right)) / 2;
  const y = (value) => top + (1 - value / max) * (height - top - bottom);
  const grid = [0, 20000, 40000, 60000].map((value) => `<g class="cost-grid"><line x1="${left}" x2="${width - right + 12}" y1="${y(value)}" y2="${y(value)}" /><text x="${left - 10}" y="${y(value) + 4}">${formatNumber(value / 1000)} mil</text></g>`).join('');
  const years = [0, 1, 2].map((index) => `<text class="cost-year" x="${x(index)}" y="${height - 16}">Año ${index + 1}</text>`).join('');
  // End labels are nudged apart so the two Odoo lines, which end close together, stay readable.
  const labelOffsets = { kpi: -4, opentech: 12, powerbi: 4, enterprise: 4 };
  const lines = costSeries.map((series) => {
    const points = series.values.map((value, index) => `${x(index).toFixed(1)},${y(value).toFixed(1)}`).join(' ');
    const last = series.values.at(-1);
    return `<g class="cost-series cost-series-${series.id}" data-series="${series.id}">
      <polyline points="${points}"${series.dashed ? ' stroke-dasharray="6 6"' : ''} />
      ${series.values.map((value, index) => `<circle cx="${x(index).toFixed(1)}" cy="${y(value).toFixed(1)}" r="4.5"><title>${series.label}, año ${index + 1}: ${usd(value)} acumulado</title></circle>`).join('')}
      <text class="cost-end-label" x="${x(2) + 14}" y="${(y(last) + labelOffsets[series.id]).toFixed(1)}">${usd(last)}</text>
    </g>`;
  }).join('');
  return `<figure class="cost-chart" data-cost-chart aria-labelledby="cost-chart-caption">
    <figcaption id="cost-chart-caption">Costo acumulado a tres años · dólares sin impuestos, a valores constantes</figcaption>
    <div class="cost-legend" role="group" aria-label="Resaltar una alternativa">
      ${costSeries.map((series) => `<button class="cost-choice cost-choice-${series.id}" type="button" data-series="${series.id}" aria-pressed="false" disabled><span class="cost-swatch" aria-hidden="true"></span>${series.label}</button>`).join('')}
    </div>
    <svg class="cost-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Costo acumulado a tres años: ${costSeries.map((series) => `${series.label} ${usd(series.values.at(-1))}`).join('; ')}">
      ${grid}${years}${lines}
    </svg>
  </figure>`;
}

export function renderSupplierEvaluation(navigation = '') {
  return `<section id="evaluacion-proveedores" class="dashboard-section supplier-evaluation" aria-labelledby="evaluacion-proveedores-titulo">
    <h2 id="evaluacion-proveedores-titulo" tabindex="-1">Evaluación de proveedores</h2>
    <p class="section-description">Tres alternativas, una recomendación.<br />Calificamos cada propuesta con la matriz RFP, sobre lo cotizado, y comparamos su costo a tres años. Las tres cumplen los requisitos excluyentes.</p>

    <section class="business-block" aria-labelledby="propuestas-evaluadas-titulo">
      <h3 id="propuestas-evaluadas-titulo">Propuestas evaluadas</h3>
      <div class="organization-copy"><p>KPI+ respondió con dos alternativas, en Odoo y en Power BI, y OpenTech envió una propuesta de referencia en Odoo. Montevideo COMM cotizó solo las licencias de Power BI y Arkano no respondió. La demostración con los tableros de IBER queda pendiente.</p></div>
      <div class="supplier-proposals">
        ${alternatives.map((alternative, index) => `<article class="supplier-proposal supplier-proposal-${index + 1}" aria-labelledby="propuesta-${alternative.id}-titulo">
          <div class="supplier-proposal-head">
            <h4 id="propuesta-${alternative.id}-titulo">${alternative.name}</h4>
            <span class="status-tag">${index + 1}.º</span>
          </div>
          <p class="supplier-score"><span>${formatNumber(totals[index])}</span> sobre 100</p>
          <p class="supplier-note">${proposals[index].note}</p>
          <dl>${proposals[index].facts.map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join('')}</dl>
        </article>`).join('')}
      </div>
    </section>

    <section class="business-block" aria-labelledby="cumplimiento-titulo">
      <h3 id="cumplimiento-titulo">Cumplimiento por aspecto</h3>
      <div class="organization-copy"><p>Power BI tiene el mejor cumplimiento técnico y funcional; Odoo · KPI+ gana por el equilibrio entre cumplimiento y costo. Seleccioná un aspecto para ver el detalle por categoría.</p></div>
      ${renderLegend()}
      <ol class="supplier-aspect-overview" aria-label="Puntaje por aspecto">
        ${rfpAspects.map((aspect) => `<li><span class="supplier-category-name">${aspect.title} <span class="rfp-value-note">· ${Math.round(aspect.weight * 100)}%</span></span>${renderScoreBars(aspectScores[aspect.id].scores, aspect.title)}</li>`).join('')}
      </ol>
      <div class="scenario-tabs supplier-aspect-tabs" data-scenario-tabs>
        <div class="scenario-tab-list" aria-label="Detalle por aspecto">
          ${rfpAspects.map((aspect) => `<button id="supplier-tab-${aspect.id}" class="scenario-tab" type="button" aria-controls="supplier-panel-${aspect.id}" disabled>
            <span class="rfp-tab-weight">${Math.round(aspect.weight * 100)}%</span>
            <span>${aspect.title}</span>
          </button>`).join('')}
        </div>
        <div class="scenario-panel-shell">${rfpAspects.map(renderAspectPanel).join('')}</div>
      </div>
    </section>

    <section class="business-block" aria-labelledby="diferencias-titulo">
      <h3 id="diferencias-titulo">Qué las diferencia</h3>
      <dl class="supplier-comparable">${differences.map(([term, text]) => `<div><dt>${term}</dt><dd>${text}</dd></div>`).join('')}</dl>
    </section>

    <section class="business-block" aria-labelledby="costo-titulo">
      <h3 id="costo-titulo">Costo a tres años</h3>
      <div class="organization-copy"><p>Las dos alternativas en Odoo quedan cerca: OpenTech, unos USD 2.800 por debajo de KPI+, según las horas de soporte que use IBER. Power BI cuesta unos USD 13.600 más que Odoo · KPI+, el precio de las funciones de autoservicio. Si Odoo · KPI+ requiere Enterprise, sube a unos USD 60.900.</p></div>
      ${renderCostChart()}
      <details class="business-details supplier-cost-details">
        <summary>Ver el detalle por concepto</summary>
        <div class="scenario-score-table-region" role="region" aria-label="Costo total de propiedad por concepto" tabindex="0">
          <table class="scenario-score-table supplier-cost-table">
            <caption>Costo total de propiedad · dólares sin impuestos</caption>
            <thead><tr><th scope="col">Concepto</th>${alternatives.map((alternative) => `<th scope="col">${alternative.short}</th>`).join('')}</tr></thead>
            <tbody>${costRows.map((row) => (row.group
              ? `<tr class="supplier-cost-group"><th scope="rowgroup" colspan="4">${row.group}</th></tr>`
              : `<tr class="${row.total ? 'supplier-cost-total' : row.subtotal ? 'supplier-cost-subtotal' : ''}"><th scope="row">${row.label}</th>${row.values.map((value) => `<td>${typeof value === 'number' ? formatNumber(value) : value}</td>`).join('')}</tr>`)).join('')}</tbody>
          </table>
        </div>
        <p class="supplier-table-note">El soporte del primer año son ocho meses (meses 5 a 12). OpenTech es una estimación de la consultora: implementación en el punto medio de su rango, 10 horas de soporte por mes y USD 180 por mes de alojamiento. Las alternativas de KPI+ excluyen la copia de solo lectura y la puerta de enlace, que dependen de Montevideo COMM.</p>
      </details>
    </section>

    <section class="business-block" aria-labelledby="recomendacion-proveedor-titulo">
      <div class="diagnosis-opportunity supplier-conclusion">
        <h3 id="recomendacion-proveedor-titulo">Recomendamos Odoo con KPI+</h3>
        <ol class="supplier-conditions">${reasons.map((item) => `<li>${item}</li>`).join('')}</ol>
        <div class="organization-copy"><p>Power BI con KPI+ es una alternativa válida si IBER valora más la autonomía para crear sus propios indicadores que el costo y la ubicación de los datos. OpenTech no se recomienda con la información actual: si completa su propuesta, puede volver a calificarse con la misma matriz. La decisión final es de IBER.</p></div>
      </div>
      <div class="scenario-tabs supplier-balance-tabs" data-scenario-tabs>
        <div class="scenario-tab-list supplier-balance-list" aria-label="Ventajas y desventajas por alternativa">
          ${alternatives.map((alternative, index) => `<button id="balance-tab-${alternative.id}" class="scenario-tab" type="button" aria-controls="balance-panel-${alternative.id}" disabled>
            <span class="scenario-code">${index + 1}.º · ${formatNumber(totals[index])} sobre 100</span>
            <span>${alternative.name}</span>
          </button>`).join('')}
        </div>
        <div class="scenario-panel-shell">
          ${alternatives.map((alternative, index) => `<div id="balance-panel-${alternative.id}" class="scenario-panel" aria-labelledby="balance-tab-${alternative.id}">
            <div class="scenario-comparison supplier-balance">
              <section class="scenario-comparison-column"><h4>Ventajas</h4><ul>${balance[index].strengths.map((item) => `<li>${item}</li>`).join('')}</ul></section>
              <section class="scenario-comparison-column scenario-weaknesses"><h4>Desventajas</h4><ul>${balance[index].weaknesses.map((item) => `<li>${item}</li>`).join('')}</ul></section>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="business-block" aria-labelledby="brechas-titulo">
      <h3 id="brechas-titulo">Brechas de la alternativa recomendada</h3>
      <div class="organization-copy"><p>Cada punto débil de Odoo · KPI+ tiene un tratamiento posible antes de contratar. Si IBER elige Power BI, los indicadores propios y el filtrado desde los gráficos se resuelven de forma nativa, y se suman la puerta de enlace y la revisión de la transferencia internacional de datos.</p></div>
      <ul class="supplier-gaps">
        ${gaps.map((gap) => `<li class="supplier-gap-${gap.action === 'Aceptar' ? 'accept' : gap.action === 'Negociar' ? 'negotiate' : 'process'}">
          <div class="supplier-gap-head"><span class="rfp-code">${gap.item}</span><span class="status-tag">${gap.action}</span></div>
          <h4>${gap.title}</h4>
          <p>${gap.effect}</p>
          <p class="supplier-gap-treatment">${gap.treatment}</p>
        </li>`).join('')}
      </ul>
    </section>

    <section class="business-block" aria-labelledby="antes-contratar-titulo">
      <h3 id="antes-contratar-titulo">Antes de contratar</h3>
      <div class="organization-copy"><p>Con el proveedor elegido, IBER debería resolver estos tres puntos. Si quiere contrastar el precio de una implementación de Power BI con un partner de Microsoft, Arkano (Montevideo) es una referencia.</p></div>
      <ol class="supplier-conditions supplier-before">${beforeHiring.map((item) => `<li>${item}</li>`).join('')}</ol>
    </section>

    <section class="business-block" aria-labelledby="retorno-titulo">
      <h3 id="retorno-titulo">Cómo medir el retorno</h3>
      <div class="organization-copy"><p>El retorno se calcula al año de uso, cuando se mida con IBER la situación inicial de cada indicador: beneficio menos inversión, sobre la inversión.</p></div>
      <ul class="supplier-return">
        ${returnIndicators.map(([title, indicator]) => `<li><h4>${title}</h4><p>${indicator}</p></li>`).join('')}
      </ul>
    </section>
    ${navigation}
  </section>`;
}
