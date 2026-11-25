// Supplier evaluation (templates 07 and 08). Content stays in authenticated IBER HTML.
import { rfpAspects } from './render-iber-rfp.js';

// Scores out of 100, calculated from the compliance columns of the RFP matrix (template 06).
// Montevideo COMM only quoted licenses: it stays "Sin evaluar", so no total is shown for it.
const aspectScores = {
  funcional: { kpi: 69.6, mvd: 2, why: 'Cubre los seis tableros de la primera etapa, pero como desarrollo a medida sobre Community y no de forma nativa. Es fuerte en exploración: filtros, navegación al detalle y comparación entre períodos son nativos de Odoo. Lo bajan los indicadores propios, que dependen de las hojas de cálculo de Enterprise, no cotizadas, y el filtrado del tablero, que es un filtro global. Transportistas e importaciones quedan para una etapa siguiente.' },
  tecnico: { kpi: 85.5, mvd: 5, why: 'Cumple los tres requisitos excluyentes: funciona dentro del ERP, carga las planillas por importación o formularios y deja los datos en Uruguay. Seguridad y permisos por sucursal son su punto más fuerte. Lo bajan el impacto sobre el ERP (la copia de solo lectura no está cotizada), la alternativa en la nube sin alcance ni costo y el ciclo de vida: Community no tiene soporte del fabricante.' },
  proveedor: { kpi: 74.5, mvd: 7.5, why: 'Metodología, capacitación y documentación obtienen el máximo: conciliación de cada indicador con la planilla de Administración, diagnóstico de datos antes de construir y un mes de acompañamiento por etapa. Tiene presencia en Uruguay y es partner Silver de Odoo. Lo baja el soporte: no hay acuerdo de servicio con tiempos comprometidos ni responsabilidades definidas con Montevideo COMM, que administra el ERP.' },
  economico: { kpi: 100, mvd: null, provisional: true, why: 'USD 42.400 a tres años, sin licencias en Community. El puntaje es provisional: es la única cotización completa y la escala compara contra la menor oferta, así que obtiene el máximo por construcción.' },
};
const categoryScores = {
  '1.1': [65, 0], '1.2': [100, 0], '1.3': [71.2, 20], '1.4': [75, 0], '1.5': [50, 0],
  '2.1': [82.5, 0], '2.2': [66.3, 20], '2.3': [96.3, 0], '2.4': [77.5, 0], '2.5': [75, 0], '2.6': [100, 0], '2.7': [87.5, 30],
  '3.1': [70, 0], '3.2': [47.5, 0], '3.3': [100, 0], '3.4': [100, 0], '3.5': [92.5, 50],
  '4.1': [100, null], '4.2': [100, null], '4.3': [100, null], '4.4': [100, null],
};
const kpiTotal = rfpAspects.reduce((sum, aspect) => sum + aspect.weight * aspectScores[aspect.id].kpi, 0);

const proposals = [
  {
    id: 'kpi', company: 'KPI+', solution: 'Tableros de Odoo', status: 'Habilitada', note: 'Partner Silver de Odoo con sociedad en Uruguay. Propone construir los tableros dentro del ERP actual, sobre Odoo 18 Community.',
    facts: [['Implementación', 'USD 12.000, en cuatro pagos contra entregables'], ['Soporte', 'USD 950 por mes desde el mes 5'], ['Licencias', 'Sin costo en Community'], ['Cotizado a tres años', 'USD 42.400'], ['Puntaje en la matriz', `${formatNumber(kpiTotal, 1)} sobre 100`]],
  },
  {
    id: 'mvd', company: 'Montevideo COMM', solution: 'Power BI', status: 'Sin evaluar', note: 'Proveedor actual del ERP. Cotizó licencias de Power BI Pro y aclaró que no implementa tableros.',
    facts: [['Implementación', 'No incluida'], ['Soporte', 'Solo el portal de licencias'], ['Licencias', 'USD 168 por usuario al año'], ['Cotizado a tres años', 'USD 13.608, solo licencias'], ['Puntaje en la matriz', 'Sin evaluar']],
  },
];

const comparableNow = [
  ['Dónde quedan los datos', 'KPI+ los deja en el data center de Montevideo y cumple la Ley 18.331 con el máximo puntaje. Para Power BI como servicio, la ubicación y las garantías de transferencia internacional no están informadas.'],
  ['Integración', 'KPI+ no necesita conectores porque trabaja dentro del ERP. Power BI necesita una puerta de enlace en el data center, que no está cotizada.'],
  ['Licencias', 'En Community, KPI+ no tiene costo por usuario. Power BI Pro cuesta USD 4.536 por año para 27 usuarios. Si el alcance de KPI+ termina requiriendo Enterprise, la ventaja se invierte.'],
  ['Lo que Power BI podría cubrir mejor', 'Indicadores propios sin programar, filtrado desde los gráficos y edición de tableros son nativos en Power BI. Se confirmará con una propuesta completa.'],
];

// Cumulative cost in USD, constant values, without taxes.
const costSeries = [
  { id: 'kpi', label: 'KPI+ cotizado', values: [19600, 31000, 42400] },
  { id: 'enterprise', label: 'KPI+ con Enterprise (estimación)', values: [24914, 42923, 60933] },
  { id: 'powerbi', label: 'Power BI, solo licencias', values: [4536, 9072, 13608], partial: true },
];
const costRows = [
  { group: 'Costo inicial (puesta en marcha)' },
  { label: 'Equipo de trabajo y consultoría', values: ['Incluida', 'Incluida', 'A la espera'] },
  { label: 'Implementación', values: [12000, 12000, 'A la espera'] },
  { label: 'Hardware y servicios de terceros', values: ['No cotizado', 'No cotizado', 'No cotizado'] },
  { label: 'Seguridad', values: ['Incluida', 'Incluida', 'A la espera'] },
  { label: 'Subtotal inicial', values: [12000, 12000, 'A la espera'], subtotal: true },
  { group: 'Costo recurrente (primer año)' },
  { label: 'Licencias', values: [0, 5314, 4536] },
  { label: 'Mantenimiento y soporte', values: [7600, 7600, 'A la espera'] },
  { label: 'Capacitación', values: ['Incluida', 'Incluida', 'A la espera'] },
  { label: 'Subtotal recurrente año 1', values: [7600, 12914, 4536], subtotal: true },
  { group: 'Costo total por año' },
  { label: 'Año 1', values: [19600, 24914, 4536] },
  { label: 'Año 2', values: [11400, 18010, 4536] },
  { label: 'Año 3', values: [11400, 18010, 4536] },
  { label: 'Costo total a tres años', values: [42400, 60933, 13608], total: true },
];

const strengths = [
  'Sin plataforma nueva: los usuarios siguen en Odoo y los datos no salen del data center ni del país.',
  'Cumple los tres requisitos excluyentes y los permisos por sucursal sin edición paga.',
  'Metodología completa: diagnóstico de datos, conciliación con la planilla, documentación de propiedad de IBER y un mes de acompañamiento por etapa.',
  'Implementación en cuatro meses, pagada contra entregables aprobados, con factura local.',
  'Sin costo por usuario en Community: sumar usuarios no encarece la solución.',
];
const weaknesses = [
  'En Community los tableros son desarrollo a medida: más dependencia del implementador para cambiarlos.',
  'Recomienda Enterprise sin cotizarlo: si hace falta, suma unos USD 18.500 a tres años para 27 usuarios como mínimo.',
  'Sin acuerdo de servicio con tiempos ni penalidades; atención de 7 a 19 h.',
  'Empresa joven, constituida en 2024, con dos años de experiencia en análisis de datos.',
  'Consulta la base que usa la operación: la copia de solo lectura no está cotizada y hay que coordinarla con Montevideo COMM.',
];

const gaps = [
  { item: '3.2.4', title: 'Acuerdo de servicio sin compromisos', effect: 'Una falla antes del cierre mensual no tiene tiempo de respuesta garantizado.', action: 'Negociar', treatment: 'Tiempos por severidad, disponibilidad, informe mensual y penalidades dentro del abono.' },
  { item: '1.4.1 · 1.5.1 · 2.5.1', title: 'Enterprise recomendado y no cotizado', effect: 'El costo total puede pasar de USD 42.400 a unos USD 60.900; cada 10 usuarios más del ERP suman unos USD 2.450 por año.', action: 'Negociar', treatment: 'Que KPI+ detalle qué se resuelve en Community y cotice Enterprise como opción.' },
  { item: '1.5.1', title: 'Indicadores propios sin programar', effect: 'Cada indicador nuevo requiere horas del implementador, a USD 35 la hora.', action: 'Aceptar', treatment: 'Prever una bolsa de horas anual o un desarrollo adicional en Community.' },
  { item: '2.1.4 · 2.2.4', title: 'Copia de solo lectura y capacidad del servidor', effect: 'Riesgo de lentitud en tiendas y e-commerce durante las consultas pesadas.', action: 'Negociar', treatment: 'Acordar con Montevideo COMM la copia o la ampliación del servidor y su costo.' },
  { item: '3.2.6', title: 'Responsabilidades con el proveedor del ERP', effect: 'Ante una falla, nadie es claramente responsable.', action: 'Cambio de proceso', treatment: 'Acuerdo escrito entre IBER, KPI+ y Montevideo COMM, con ambiente de prueba y responsables.' },
  { item: '2.4.1', title: 'Versión de Odoo sin soporte del fabricante', effect: 'La actualización de versión puede ser un costo no previsto.', action: 'Negociar', treatment: 'Incluir la actualización de los tableros en el abono o cotizarla aparte.' },
  { item: '1.1.7 · 1.1.8', title: 'Transportistas e importaciones', effect: 'Esos tableros no están en los cuatro meses de implementación.', action: 'Aceptar', treatment: 'Dependen del registro de la logística en el ERP, previsto en la segunda etapa.' },
  { item: '1.3.3', title: 'Filtrado desde los gráficos', effect: 'El diagnóstico es algo más lento.', action: 'Aceptar', treatment: 'Aceptarlo o validarlo en la demostración con los tableros de IBER.' },
];

const returnIndicators = [
  ['Tiempo de Administración', 'Horas por mes dedicadas a armar la planilla de gestión.', 'Los tableros reemplazan el armado manual.'],
  ['Rentabilidad de las sucursales', 'Resultado neto por sucursal y sucursales con margen menor al 8%.', 'Diagnóstico mensual de las sucursales en rojo.'],
  ['Stock inmovilizado', 'Valor del stock sin ventas en más de 90 días, con una meta de hasta 5% por sucursal.', 'Redistribución y ajuste del surtido.'],
  ['Facturación', 'Variación interanual contra la meta de +10% en 2027.', 'Seguimiento por sucursal y canal.'],
  ['Calidad de los datos', 'Registros con errores detectados por los controles antes del cierre.', 'Gobierno de datos e indicadores.'],
  ['Adopción', 'Usuarios activos por mes sobre los 27 previstos.', 'Capacitación y acompañamiento.'],
];

const conditions = [
  'Definir si el alcance requiere Odoo Enterprise, porque puede sumar un 44% o más al costo.',
  'Un acuerdo de servicio con tiempos comprometidos dentro del abono.',
  'Al menos una segunda propuesta completa, de un implementador de Power BI o de otro partner de Odoo, para comparar precio y alcance.',
];
const nextSteps = [
  'Designar al responsable de datos e indicadores.',
  'Aprobar el diccionario de indicadores.',
  'Pedir a Montevideo COMM el costo de una copia de solo lectura de la base.',
];

function formatNumber(value, digits = 0) {
  return value.toLocaleString('es-AR', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}
const usd = (value) => (typeof value === 'number' ? `USD ${formatNumber(value)}` : value);
const scoreLabel = (value) => (value === null ? 'Sin información' : formatNumber(value, Number.isInteger(value) ? 0 : 1));

function renderScoreBars(kpi, mvd, label) {
  return `<div class="supplier-bars" role="img" aria-label="${label}: KPI+ ${scoreLabel(kpi)}; Montevideo COMM ${scoreLabel(mvd)}">
    <div class="supplier-bar supplier-bar-kpi"><span class="supplier-bar-track"><span style="width: ${kpi}%"></span></span><span class="supplier-bar-value">${scoreLabel(kpi)}</span></div>
    <div class="supplier-bar supplier-bar-mvd"><span class="supplier-bar-track"><span style="width: ${mvd ?? 0}%"></span></span><span class="supplier-bar-value">${scoreLabel(mvd)}</span></div>
  </div>`;
}

function renderAspectPanel(aspect) {
  const score = aspectScores[aspect.id];
  return `<div id="supplier-panel-${aspect.id}" class="scenario-panel supplier-aspect-panel" aria-labelledby="supplier-tab-${aspect.id}">
    <h4>${aspect.title} · ${Math.round(aspect.weight * 100)}% del total</h4>
    <p>${score.why}</p>
    <ol class="supplier-category-list" aria-label="Puntaje por categoría del aspecto ${aspect.title}">
      ${aspect.categories.map((category) => {
        const [kpi, mvd] = categoryScores[category.code];
        return `<li><span class="supplier-category-name"><span class="rfp-code">${category.code}</span> ${category.title}</span>${renderScoreBars(kpi, mvd, category.title)}</li>`;
      }).join('')}
    </ol>
  </div>`;
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
  const lines = costSeries.map((series) => {
    const points = series.values.map((value, index) => `${x(index).toFixed(1)},${y(value).toFixed(1)}`).join(' ');
    const last = series.values.at(-1);
    return `<g class="cost-series cost-series-${series.id}" data-series="${series.id}">
      <polyline points="${points}"${series.partial ? ' stroke-dasharray="6 6"' : ''} />
      ${series.values.map((value, index) => `<circle cx="${x(index).toFixed(1)}" cy="${y(value).toFixed(1)}" r="4.5"><title>${series.label}, año ${index + 1}: ${usd(value)} acumulado</title></circle>`).join('')}
      <text class="cost-end-label" x="${x(2) + 14}" y="${y(last) + 4}">${usd(last)}</text>
    </g>`;
  }).join('');
  return `<figure class="cost-chart" data-cost-chart aria-labelledby="cost-chart-caption">
    <figcaption id="cost-chart-caption">Costo acumulado a tres años · dólares sin impuestos, a valores constantes</figcaption>
    <div class="cost-legend" role="group" aria-label="Resaltar una alternativa">
      ${costSeries.map((series) => `<button class="cost-choice cost-choice-${series.id}" type="button" data-series="${series.id}" aria-pressed="false" disabled><span class="cost-swatch" aria-hidden="true"></span>${series.label}</button>`).join('')}
    </div>
    <svg class="cost-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Costo acumulado: KPI+ cotizado USD 42.400; KPI+ con Enterprise USD 60.933; Power BI solo licencias USD 13.608">
      ${grid}${years}${lines}
    </svg>
  </figure>`;
}

export function renderSupplierEvaluation(navigation = '') {
  return `<section id="evaluacion-proveedores" class="dashboard-section supplier-evaluation" aria-labelledby="evaluacion-proveedores-titulo">
    <h2 id="evaluacion-proveedores-titulo" tabindex="-1">Evaluación de proveedores</h2>
    <p class="section-description">Dos respuestas, una sola propuesta completa.<br />Calificamos cada respuesta con la matriz RFP, sobre lo cotizado, y comparamos su costo a tres años para entender qué ofrece cada alternativa y qué falta para decidir.</p>

    <section class="business-block" aria-labelledby="propuestas-recibidas-titulo">
      <h3 id="propuestas-recibidas-titulo">Propuestas recibidas</h3>
      <div class="organization-copy"><p>De las cuatro empresas invitadas respondieron dos, con alcances distintos. Arkano (Power BI) y OpenTech (Odoo) no respondieron. La calificación se hizo sin la demostración con los tableros de IBER, que queda pendiente.</p></div>
      <div class="supplier-proposals">
        ${proposals.map((proposal) => `<article class="supplier-proposal supplier-proposal-${proposal.id}" aria-labelledby="propuesta-${proposal.id}-titulo">
          <div class="supplier-proposal-head">
            <div><h4 id="propuesta-${proposal.id}-titulo">${proposal.company}</h4><p class="supplier-solution">${proposal.solution}</p></div>
            <span class="status-tag">${proposal.status}</span>
          </div>
          <p class="supplier-note">${proposal.note}</p>
          <dl>${proposal.facts.map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join('')}</dl>
        </article>`).join('')}
      </div>
    </section>

    <section class="business-block" aria-labelledby="cumplimiento-titulo">
      <h3 id="cumplimiento-titulo">Cumplimiento por aspecto</h3>
      <div class="organization-copy"><p>KPI+ alcanza ${formatNumber(kpiTotal, 1)} puntos sobre 100 y está habilitada, porque cumple los tres requisitos excluyentes. Sin el aspecto económico, que es provisional, su cumplimiento técnico y funcional es del 76%. Seleccioná un aspecto para ver el detalle por categoría.</p></div>
      <div class="supplier-legend" aria-hidden="true"><span class="supplier-key-kpi">Odoo · KPI+</span><span class="supplier-key-mvd">Power BI · Montevideo COMM</span></div>
      <ol class="supplier-aspect-overview" aria-label="Puntaje por aspecto">
        ${rfpAspects.map((aspect) => {
          const score = aspectScores[aspect.id];
          return `<li><span class="supplier-category-name">${aspect.title} <span class="rfp-value-note">· ${Math.round(aspect.weight * 100)}%${score.provisional ? ' · provisional' : ''}</span></span>${renderScoreBars(score.kpi, score.mvd, aspect.title)}</li>`;
        }).join('')}
      </ol>
      <div class="scenario-tabs supplier-aspect-tabs" data-scenario-tabs>
        <div class="scenario-tab-list" aria-label="Detalle por aspecto">
          ${rfpAspects.map((aspect) => `<button id="supplier-tab-${aspect.id}" class="scenario-tab" type="button" aria-controls="supplier-panel-${aspect.id}" disabled>
            <span class="rfp-tab-weight">${Math.round(aspectScores[aspect.id].kpi)}</span>
            <span>${aspect.title}</span>
            <span class="scenario-code">Puntaje de KPI+</span>
          </button>`).join('')}
        </div>
        <div class="scenario-panel-shell">${rfpAspects.map(renderAspectPanel).join('')}</div>
      </div>
      <div class="diagnosis-opportunity supplier-unrated">
        <h4>Por qué Power BI queda sin evaluar</h4>
        <div class="organization-copy"><p>La respuesta de Montevideo COMM solo permite calificar el acceso web y móvil, los tableros interactivos, su presencia en Uruguay y su condición de partner de Microsoft. El resto de los ítems, que equivalen al 91% del peso de la matriz, figura como «Sin información» y vale 0. Tampoco informa los tres requisitos excluyentes. Su puntaje no mide el producto sino lo que falta cotizar: Power BI no queda descartado, sino a la espera de un implementador que complete la propuesta.</p></div>
      </div>
    </section>

    <section class="business-block" aria-labelledby="comparable-titulo">
      <h3 id="comparable-titulo">Lo que ya se puede comparar</h3>
      <div class="organization-copy"><p>La comparación no está en igualdad de condiciones: KPI+ respondió la matriz punto por punto y Montevideo COMM cotizó un componente. Aun así, hay diferencias claras entre las dos soluciones.</p></div>
      <dl class="supplier-comparable">${comparableNow.map(([term, text]) => `<div><dt>${term}</dt><dd>${text}</dd></div>`).join('')}</dl>
    </section>

    <section class="business-block" aria-labelledby="costo-titulo">
      <h3 id="costo-titulo">Costo a tres años</h3>
      <div class="organization-copy"><p>KPI+ concentra el 28% del costo en la implementación y el resto es abono mensual. Como recomienda Odoo Enterprise sin cotizarlo, se suma una estimación de la consultora con el precio publicado por Odoo para 27 usuarios, que es el mínimo. Power BI solo tiene cotizadas las licencias, así que su línea no es un costo total.</p></div>
      ${renderCostChart()}
      <div class="supplier-breakeven">
        <div><span class="supplier-breakeven-value">USD 28.792</span><p>Lo que una propuesta de Power BI podría sumar en implementación, soporte y puerta de enlace para costar lo mismo que KPI+ en Community.</p></div>
        <div><span class="supplier-breakeven-value">USD 47.325</span><p>El mismo margen si KPI+ termina requiriendo Enterprise para 27 usuarios.</p></div>
      </div>
      <details class="business-details supplier-cost-details">
        <summary>Ver el detalle por concepto</summary>
        <div class="scenario-score-table-region" role="region" aria-label="Costo total de propiedad por concepto" tabindex="0">
          <table class="scenario-score-table supplier-cost-table">
            <caption>Costo total de propiedad · dólares sin impuestos</caption>
            <thead><tr><th scope="col">Concepto</th><th scope="col">KPI+ cotizado</th><th scope="col">KPI+ con Enterprise</th><th scope="col">Power BI</th></tr></thead>
            <tbody>${costRows.map((row) => (row.group
              ? `<tr class="supplier-cost-group"><th scope="rowgroup" colspan="4">${row.group}</th></tr>`
              : `<tr class="${row.total ? 'supplier-cost-total' : row.subtotal ? 'supplier-cost-subtotal' : ''}"><th scope="row">${row.label}</th>${row.values.map((value) => `<td>${typeof value === 'number' ? formatNumber(value) : value}</td>`).join('')}</tr>`)).join('')}</tbody>
          </table>
        </div>
        <p class="supplier-table-note">En KPI+ el soporte del primer año son ocho meses (meses 5 a 12). Las tres alternativas excluyen la copia de solo lectura o la ampliación del servidor y la puerta de enlace, que dependen de Montevideo COMM. La estimación de Enterprise usa USD 16,40 por usuario por mes el primer año y USD 20,40 después. Power BI incluye solo licencias.</p>
      </details>
    </section>

    <section class="business-block" aria-labelledby="kpi-balance-titulo">
      <h3 id="kpi-balance-titulo">Ventajas y desventajas de KPI+</h3>
      <div class="organization-copy"><p>Frente a lo pedido, KPI+ cubre bien lo que más pesa para IBER: trabaja con los datos donde ya están, los deja en Uruguay, concilia cada indicador con la planilla de Administración y acompaña la adopción. Queda por debajo en soporte y en la autonomía de IBER para crear indicadores.</p></div>
      <div class="scenario-comparison supplier-balance">
        <section class="scenario-comparison-column" aria-labelledby="kpi-ventajas-titulo"><h4 id="kpi-ventajas-titulo">Ventajas</h4><ul>${strengths.map((item) => `<li>${item}</li>`).join('')}</ul></section>
        <section class="scenario-comparison-column scenario-weaknesses" aria-labelledby="kpi-desventajas-titulo"><h4 id="kpi-desventajas-titulo">Desventajas</h4><ul>${weaknesses.map((item) => `<li>${item}</li>`).join('')}</ul></section>
      </div>
    </section>

    <section class="business-block" aria-labelledby="brechas-titulo">
      <h3 id="brechas-titulo">Brechas y cómo tratarlas</h3>
      <div class="organization-copy"><p>Cada punto débil de la propuesta tiene un tratamiento posible antes de contratar: negociarlo con el proveedor, aceptarlo o resolverlo con un cambio de proceso.</p></div>
      <ul class="supplier-gaps">
        ${gaps.map((gap) => `<li class="supplier-gap-${gap.action === 'Aceptar' ? 'accept' : gap.action === 'Negociar' ? 'negotiate' : 'process'}">
          <div class="supplier-gap-head"><span class="rfp-code">${gap.item}</span><span class="status-tag">${gap.action}</span></div>
          <h4>${gap.title}</h4>
          <p>${gap.effect}</p>
          <p class="supplier-gap-treatment">${gap.treatment}</p>
        </li>`).join('')}
      </ul>
    </section>

    <section class="business-block" aria-labelledby="retorno-titulo">
      <h3 id="retorno-titulo">Cómo medir el retorno</h3>
      <div class="organization-copy"><p>El retorno de la inversión no se puede calcular todavía: requiere medir con IBER la situación inicial de cada indicador. Proponemos seguir estos indicadores, que ya están en el caso de negocio, y calcular el retorno al año de uso como el beneficio menos la inversión, sobre la inversión.</p></div>
      <ul class="supplier-return">
        ${returnIndicators.map(([title, indicator, origin]) => `<li><h4>${title}</h4><p>${indicator}</p><p class="supplier-return-origin">${origin}</p></li>`).join('')}
      </ul>
    </section>

    <section class="business-block" aria-labelledby="conclusion-seleccion-titulo">
      <div class="diagnosis-opportunity supplier-conclusion">
        <h3 id="conclusion-seleccion-titulo">Todavía no hay información para una recomendación certera</h3>
        <div class="organization-copy"><p>Esperábamos comparar al menos dos soluciones completas, pero de cuatro empresas contactadas solo una presentó una propuesta completa. El puntaje de KPI+ describe cuánto cubre su propuesta, no que sea la mejor opción disponible. La evaluación sí deja un marco listo: la matriz, las escalas y el cálculo del costo a tres años permiten calificar cualquier propuesta nueva en igualdad de condiciones.</p></div>
        <h4>Para decidir hace falta</h4>
        <ol class="supplier-conditions">${conditions.map((item) => `<li>${item}</li>`).join('')}</ol>
        <h4>Mientras tanto, IBER puede adelantar</h4>
        <ul class="supplier-next-steps">${nextSteps.map((item) => `<li>${item}</li>`).join('')}</ul>
      </div>
    </section>
    ${navigation}
  </section>`;
}
