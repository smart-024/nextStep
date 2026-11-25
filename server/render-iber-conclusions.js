// Closing view (template 11, Resumen Ejecutivo). Short on purpose: the detail lives in the other views.
const findings = [
  ['Qué encontramos', 'IBER tiene un ERP que ya registra casi todo lo que necesita para decidir. El problema es cómo se usa esa información: dispersa, armada a mano y sin responsable.'],
  ['Qué recomendamos', 'Una plataforma de BI con gobierno de datos, junto al ERP y por etapas, empezando por la gerencia. La logística avanza después y la IA generativa se suma cuando los indicadores estén validados.'],
  ['Qué quedó abierto', 'Con una sola propuesta completa no se puede afirmar que KPI+ sea la mejor opción. Antes de contratar hace falta al menos otra propuesta, evaluada con la misma matriz.'],
];

const decision = [
  'Aprobar el camino de BI con gobierno de datos.',
  'Designar al responsable de los datos.',
  'Autorizar una nueva vuelta de propuestas.',
];

const roadmap = [
  {
    id: 'inmediato', title: 'Inmediato', note: 'No depende de haber elegido un proveedor.',
    items: [
      ['BI', 'Conseguir al menos otra propuesta completa: insistir con Arkano y OpenTech y sumar otros implementadores.'],
      ['BI', 'Pedir a KPI+ la demostración, las referencias, el alcance de Community frente a Enterprise y un acuerdo de servicio.'],
      ['BI', 'Pedir a Montevideo COMM el costo de la copia de solo lectura y un acuerdo de servicio.'],
      ['IA', 'Validar el prototipo con un usuario de IBER.'],
    ],
  },
  {
    id: 'corto', title: 'Corto plazo', note: 'Hasta cerrar la etapa 1.',
    items: [
      ['BI', 'Comparar las propuestas con la matriz, elegir e implementar la etapa 1 y el costeo logístico.'],
      ['IA', 'Instituir la revisión mensual por sucursal, al principio sin asistente.'],
    ],
  },
  {
    id: 'mediano', title: 'Mediano plazo', note: 'Después de la etapa 1.',
    items: [
      ['IA', 'Comparar la IA de la herramienta elegida con un asistente propio y hacer un piloto de tres meses.'],
      ['Logística', 'Registrar envíos y embarques en el ERP; después, integrar couriers y reposición.'],
    ],
  },
];

export function renderConclusions(navigation = '') {
  return `<section id="conclusiones" class="dashboard-section conclusions" aria-labelledby="conclusiones-titulo">
    <h2 id="conclusiones-titulo" tabindex="-1">Conclusiones y próximos pasos</h2>
    <p class="section-description">Qué hacer está claro; con quién, todavía no.<br />Una plataforma de BI con gobierno de datos, que empieza con información que IBER ya tiene. La elección del proveedor necesita una segunda propuesta completa.</p>

    <section class="business-block" aria-labelledby="conclusiones-sintesis-titulo">
      <h3 id="conclusiones-sintesis-titulo" class="visually-hidden">Síntesis</h3>
      <ul class="conclusion-findings">${findings.map(([title, text]) => `<li><h4>${title}</h4><p>${text}</p></li>`).join('')}</ul>
    </section>

    <section class="business-block" aria-labelledby="decision-iber-titulo">
      <div class="diagnosis-opportunity conclusion-decision">
        <h3 id="decision-iber-titulo">La decisión que le toca a IBER</h3>
        <ol>${decision.map((item) => `<li>${item}</li>`).join('')}</ol>
        <p>Los tres pasos se pueden dar sin comprometer todavía la inversión en un proveedor.</p>
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
