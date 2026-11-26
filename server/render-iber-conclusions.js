// Closing view (final template 11 v3, Resumen Ejecutivo). Short on purpose: the detail lives in the other views.
const findings = [
  ['Qué encontramos', 'IBER tiene un ERP que ya registra casi todo lo que necesita para decidir. El problema es cómo se usa esa información: dispersa, armada a mano y sin responsable.'],
  ['Qué recomendamos', 'Una plataforma de BI con gobierno de datos, junto al ERP y por etapas, implementada sobre Odoo con KPI+: 76% de cumplimiento y USD 42.400 a tres años, sin licencias por usuario y con los datos en Uruguay.'],
  ['Qué viene después', 'La logística avanza después, para que el análisis incorpore su costo real. La IA generativa se suma cuando los indicadores del BI estén validados.'],
];

const decision = [
  'Aprobar el camino de BI con gobierno de datos.',
  'Designar al responsable de los datos.',
  'Elegir el proveedor: recomendamos Odoo con KPI+.',
];

const roadmap = [
  {
    id: 'inmediato', title: 'Inmediato', note: 'Antes de contratar.',
    items: [
      ['BI', 'Pedir a KPI+ la demostración, las referencias, el alcance en Community frente a Enterprise y un acuerdo de servicio.'],
      ['BI', 'Designar al responsable de los datos y aprobar el diccionario de indicadores.'],
      ['BI', 'Pedir a Montevideo COMM el costo de la copia de solo lectura y un acuerdo de servicio.'],
    ],
  },
  {
    id: 'corto', title: 'Corto plazo', note: 'Hasta cerrar la etapa 1.',
    items: [
      ['BI', 'Contratar e implementar la primera etapa del BI y el costeo logístico por sucursal.'],
      ['IA', 'Instituir la revisión mensual por sucursal y, después, el piloto del asistente.'],
    ],
  },
  {
    id: 'mediano', title: 'Mediano plazo', note: 'Después de la etapa 1.',
    items: [
      ['Logística', 'Registrar la logística en el ERP; después, integrar couriers y reposición.'],
    ],
  },
];

export function renderConclusions(navigation = '') {
  return `<section id="conclusiones" class="dashboard-section conclusions" aria-labelledby="conclusiones-titulo">
    <h2 id="conclusiones-titulo" tabindex="-1">Conclusiones y próximos pasos</h2>
    <p class="section-description">Un BI sobre Odoo, con KPI+ y por etapas.<br />Se evaluaron tres alternativas con la misma matriz. Power BI con KPI+ es una alternativa válida si IBER prioriza la autonomía para crear sus propios indicadores sobre el costo.</p>

    <section class="business-block" aria-labelledby="conclusiones-sintesis-titulo">
      <h3 id="conclusiones-sintesis-titulo" class="visually-hidden">Síntesis</h3>
      <ul class="conclusion-findings">${findings.map(([title, text]) => `<li><h4>${title}</h4><p>${text}</p></li>`).join('')}</ul>
    </section>

    <section class="business-block" aria-labelledby="decision-iber-titulo">
      <div class="diagnosis-opportunity conclusion-decision">
        <h3 id="decision-iber-titulo">La decisión que le toca a IBER</h3>
        <ol>${decision.map((item) => `<li>${item}</li>`).join('')}</ol>
        <p>La elección de KPI+ queda sujeta a la demostración con los tableros de IBER y a un acuerdo de servicio por escrito.</p>
      </div>
    </section>

    <section class="business-block" aria-labelledby="proximos-pasos-titulo">
      <h3 id="proximos-pasos-titulo">Próximos pasos</h3>
      <ol class="conclusion-roadmap">
        ${roadmap.map((stage) => `<li class="conclusion-stage-${stage.id}">
          <h4>${stage.title}</h4>
          <p class="conclusion-stage-note">${stage.note}</p>
          <ul>${stage.items.map(([tag, text]) => `<li><span class="conclusion-tag">${tag}</span>${text}</li>`).join('')}</ul>
        </li>`).join('')}
      </ol>
    </section>
    ${navigation}
  </section>`;
}
