// RFP matrix summary (template 06). Content stays in authenticated IBER HTML.
// Weights are transcribed from the matrix; totals and counts are calculated here.
export const rfpAspects = [
  {
    id: 'funcional', code: '1', title: 'Funcional', weight: 0.35,
    question: '¿Responde las preguntas de IBER?',
    description: 'Capacidades para gestionar indicadores, analizar la información y presentarla de forma clara, con datos confiables. Es el aspecto de mayor peso, pero no supera el 35% porque las funciones básicas de análisis son parecidas entre los productos del mercado.',
    categories: [
      { code: '1.1', title: 'Tableros de IBER', weight: 0.5, items: [['Rentabilidad por sucursal', 0.2], ['Facturación contra la meta', 0.15], ['Rotación por etiqueta y sucursal', 0.15], ['Perfil de demanda por sucursal', 0.1], ['Productividad por sucursal', 0.1], ['Ventas por segmento y cliente', 0.1], ['Costos y desempeño de transportistas', 0.1], ['Plazos de importación', 0.1]] },
      { code: '1.2', title: 'Análisis y exploración', weight: 0.15, items: [['Filtros', 0.25], ['Navegación al detalle', 0.3], ['Comparación entre períodos', 0.2], ['Consultas propias sin programar', 0.25]] },
      { code: '1.3', title: 'Visualización y facilidad de uso', weight: 0.1, items: [['Gráficos y tablas', 0.25], ['Semáforos y umbrales', 0.3], ['Tableros interactivos', 0.2], ['Interfaz en español y fácil de usar', 0.25]] },
      { code: '1.4', title: 'Gobierno y calidad de los datos', weight: 0.1, items: [['Definición única de indicadores', 0.35], ['Documentación visible del indicador', 0.25], ['Controles de completitud', 0.25], ['Fecha de actualización visible', 0.15]] },
      { code: '1.5', title: 'Construcción de indicadores propios', weight: 0.15, items: [['Indicadores propios sin programar', 0.5], ['Carga de metas por período y dimensión', 0.25], ['Reparto de costos configurable', 0.25]] },
    ],
  },
  {
    id: 'tecnico', code: '2', title: 'Técnico', weight: 0.25,
    question: '¿Se integra con Odoo y Excel?',
    description: 'Cómo se conecta con las fuentes de datos, dónde se aloja, cómo protege los datos y controla quién ve qué, y qué garantiza para mantenerse en el tiempo. La información de IBER está repartida entre Odoo y planillas, y cada encargado tiene que ver solo los datos de su sucursal.',
    categories: [
      { code: '2.1', title: 'Integración con las fuentes de datos', weight: 0.25, items: [['Conexión con Odoo 18 Community', 0.35, true], ['Planillas Excel como fuente de datos', 0.25, true], ['Actualización automática y monitoreada', 0.15], ['Sin impacto en el sistema de origen', 0.15], ['Nuevas fuentes a futuro', 0.1]] },
      { code: '2.2', title: 'Modalidad de despliegue', weight: 0.1, items: [['Instalación propia', 0.35], ['Servicio en la nube con conexión segura', 0.25], ['Acceso web sin instalaciones', 0.2], ['Infraestructura requerida documentada', 0.2]] },
      { code: '2.3', title: 'Seguridad y protección de datos', weight: 0.2, items: [['Ingreso único con las cuentas de la organización', 0.25], ['Cifrado', 0.15], ['Ubicación de los datos y Ley 18.331', 0.25, true], ['Auditoría de accesos y cambios', 0.15], ['Bases de datos sin exposición a internet', 0.2]] },
      { code: '2.4', title: 'Continuidad y ciclo de vida', weight: 0.1, items: [['Versiones con soporte vigente', 0.3], ['Respaldo y recuperación', 0.3], ['Escalabilidad', 0.2], ['Portabilidad y salida', 0.2]] },
      { code: '2.5', title: 'Preparación y modelado de datos', weight: 0.1, items: [['Combinar fuentes en un modelo', 0.6], ['Datos de referencia mantenidos por el negocio', 0.4]] },
      { code: '2.6', title: 'Usuarios, roles y permisos', weight: 0.15, items: [['Roles y permisos por tablero', 0.25], ['Permisos por sucursal', 0.55], ['Administración de usuarios', 0.2]] },
      { code: '2.7', title: 'Distribución, alertas y acceso móvil', weight: 0.1, items: [['Acceso desde el celular', 0.3], ['Envíos programados por correo', 0.3], ['Alertas por umbral', 0.2], ['Exportación a Excel y PDF', 0.2]] },
    ],
  },
  {
    id: 'proveedor', code: '3', title: 'Proveedor', weight: 0.25,
    question: '¿Quién implementa y da soporte?',
    description: 'Capacidad del implementador para llevar adelante el proyecto y sostener la solución. IBER no tiene personal de IT propio y hoy su soporte no tiene un acuerdo de servicio formal: por eso este aspecto pesa tanto como el técnico.',
    categories: [
      { code: '3.1', title: 'Trayectoria y experiencia', weight: 0.2, items: [['Experiencia con la herramienta ofrecida', 0.2], ['Casos en comercio minorista con sucursales', 0.25], ['Casos con Odoo o PostgreSQL', 0.25], ['Referencias verificables', 0.15], ['Plantillas para comercio minorista', 0.15]] },
      { code: '3.2', title: 'Soporte, operación y acuerdo de servicio', weight: 0.35, items: [['Horario de atención', 0.15], ['Mesa de ayuda con seguimiento', 0.1], ['Atención telefónica o por mensajería', 0.1], ['Acuerdo de servicio', 0.25], ['Soporte en español', 0.1], ['Operable sin IT propio', 0.2], ['Soporte a usuarios sin perfil técnico', 0.1]] },
      { code: '3.3', title: 'Metodología de implementación', weight: 0.2, items: [['Implementación por etapas', 0.25], ['Validación contra los reportes vigentes', 0.25], ['Diagnóstico de la calidad de los datos', 0.2], ['Seguimiento del proyecto', 0.15], ['Documentación y transferencia de conocimiento', 0.15]] },
      { code: '3.4', title: 'Capacitación y adopción', weight: 0.1, items: [['Capacitación por perfil', 0.5], ['Material en español', 0.25], ['Acompañamiento posterior', 0.25]] },
      { code: '3.5', title: 'Solidez y presencia local', weight: 0.15, items: [['Presencia en Uruguay', 0.35], ['Respaldo del fabricante y continuidad del producto', 0.3], ['Equipo certificado', 0.2], ['Tamaño y antigüedad', 0.15]] },
    ],
  },
  {
    id: 'economico', code: '4', title: 'Económico', weight: 0.15,
    question: '¿Cuánto cuesta a tres años?',
    description: 'Costo total de la propuesta a tres años, con sus costos iniciales y recurrentes y sus condiciones comerciales. Pesa menos porque las diferencias de licencia entre productos son chicas frente al costo de una mala adopción.',
    categories: [
      { code: '4.1', title: 'Inversión inicial', weight: 0.35, items: [['Implementación e instalación', 0.4], ['Integración con las fuentes de datos', 0.25], ['Consultoría y preparación de datos', 0.25], ['Capacitación inicial', 0.1]] },
      { code: '4.2', title: 'Costos recurrentes anuales', weight: 0.35, items: [['Licencias o suscripción', 0.5], ['Mantenimiento y soporte', 0.3], ['Alojamiento e infraestructura', 0.2]] },
      { code: '4.3', title: 'Costo total a tres años', weight: 0.2, items: [['Costo total de propiedad a tres años', 0.7], ['Costo de crecer', 0.3]] },
      { code: '4.4', title: 'Condiciones comerciales', weight: 0.1, items: [['Forma y medios de pago', 0.55], ['Valor de la hora adicional', 0.45]] },
    ],
  },
];

export const rfpItems = rfpAspects.flatMap((aspect) => aspect.categories.flatMap((category) => category.items.map(([title, weight, excluding = false], index) => ({
  code: `${category.code}.${index + 1}`,
  title,
  aspect: aspect.title,
  excluding,
  totalWeight: aspect.weight * category.weight * weight,
}))));
const categoryCount = rfpAspects.reduce((sum, aspect) => sum + aspect.categories.length, 0);
const excludingItems = rfpItems.filter((item) => item.excluding);
const itemAnatomy = [
  { title: 'Descripción', text: 'Qué se le pide al proveedor, en términos concretos y verificables.' },
  { title: 'Justificación', text: 'Por qué le importa a IBER y por qué pesa lo que pesa.' },
  { title: 'Origen', text: 'De qué historia de usuario, requerimiento o decisión previa surge.' },
  { title: 'Criterio de evaluación', text: 'Con qué escala se califica la respuesta del proveedor.' },
];

// Final status of the request for proposals (templates 07 and 08, 26/11/2026).
const requests = [
  { company: 'KPI+', solution: 'Tableros de Odoo y Power BI', status: 'Propuesta completa', state: 'complete' },
  { company: 'OpenTech', solution: 'Tableros de Odoo', status: 'Propuesta de referencia', state: 'partial' },
  { company: 'Montevideo COMM', solution: 'Power BI', status: 'Solo cotización de licencias', state: 'partial' },
  { company: 'Arkano', solution: 'Power BI', status: 'Sin respuesta', state: 'none' },
];

// Spanish decimal comma, without trailing zeros (3,5% rather than 3,50%).
const percent = (value, digits = 0) => `${String(Number((value * 100).toFixed(digits))).replace('.', ',')}%`;

function renderAspectPanel(aspect) {
  return `<div id="rfp-panel-${aspect.id}" class="scenario-panel rfp-aspect-panel" aria-labelledby="rfp-tab-${aspect.id}">
    <h4>${aspect.title} · ${percent(aspect.weight)} del total</h4>
    <p>${aspect.description}</p>
    <ol class="domain-gap-list rfp-category-list" aria-label="Categorías del aspecto ${aspect.title}">
      ${aspect.categories.map((category) => `<li>
        <div class="domain-gap-label"><span><span class="rfp-code">${category.code}</span> ${category.title}</span><span class="domain-gap-value">${percent(category.weight)} <span class="rfp-value-note">· ${percent(aspect.weight * category.weight, 2)} del total</span></span></div>
        <div class="domain-gap-track" aria-hidden="true"><span style="width: ${(category.weight * 100).toFixed(2)}%"></span></div>
        <p class="rfp-category-items">${category.items.length} ítems: ${category.items.map(([title]) => title).join(', ')}.</p>
      </li>`).join('')}
    </ol>
  </div>`;
}

export function renderRfpMatrix(navigation = '') {
  return `<section id="matriz-rfp" class="dashboard-section rfp-matrix" aria-labelledby="matriz-rfp-titulo">
    <h2 id="matriz-rfp-titulo" tabindex="-1">Matriz RFP</h2>
    <p class="section-description">Un método para comparar propuestas con los mismos criterios.<br />Tradujimos las necesidades de IBER en requisitos medibles, para que cada propuesta se califique con las mismas reglas y la elección del proveedor quede fundamentada.</p>

    <section class="business-block" aria-labelledby="rfp-que-es-titulo">
      <h3 id="rfp-que-es-titulo">Qué es la matriz RFP</h3>
      <div class="organization-copy">
        <p>El pedido de propuestas (RFP, por sus siglas en inglés) es la instancia en la que IBER invita a los implementadores a responder qué ofrecen y a qué costo. La matriz es la herramienta con la que se comparan esas respuestas: parte de los cuatro criterios definidos en el alcance y los desagrega hasta llegar a requisitos concretos.</p>
        <p>Los requisitos no son genéricos. Surgen de las historias de usuario priorizadas en el caso de negocio, de los requerimientos de la arquitectura destino y de las condiciones del escenario elegido: instalación junto al ERP, implementación por etapas y el servicio en la nube como alternativa.</p>
      </div>
      <ul class="rfp-anatomy" aria-label="Qué declara cada ítem de la matriz">
        ${itemAnatomy.map((part) => `<li><h4>${part.title}</h4><p>${part.text}</p></li>`).join('')}
      </ul>
    </section>

    <section class="business-block" aria-labelledby="rfp-composicion-titulo">
      <h3 id="rfp-composicion-titulo">Cómo está compuesta</h3>
      <div class="organization-copy"><p>La matriz tiene tres niveles: aspectos, categorías e ítems. En cada nivel las ponderaciones suman 100%.</p></div>
      <dl class="rfp-stats">
        <div><dt>Aspectos</dt><dd>${rfpAspects.length}</dd></div>
        <div><dt>Categorías</dt><dd>${categoryCount}</dd></div>
        <div><dt>Ítems evaluados</dt><dd>${rfpItems.length}</dd></div>
        <div><dt>Requisitos excluyentes</dt><dd>${excludingItems.length}</dd></div>
      </dl>
      <div class="scenario-tabs rfp-aspect-tabs" data-scenario-tabs>
        <div class="scenario-tab-list" aria-label="Aspectos de la matriz">
          ${rfpAspects.map((aspect) => `<button id="rfp-tab-${aspect.id}" class="scenario-tab" type="button" aria-controls="rfp-panel-${aspect.id}" disabled>
            <span class="rfp-tab-weight">${percent(aspect.weight)}</span>
            <span>${aspect.title}</span>
            <span class="scenario-code">${aspect.question}</span>
          </button>`).join('')}
        </div>
        <div class="scenario-panel-shell">${rfpAspects.map(renderAspectPanel).join('')}</div>
      </div>
    </section>

    <section class="business-block" aria-labelledby="rfp-calificacion-titulo">
      <h3 id="rfp-calificacion-titulo">Cómo se califica</h3>
      <div class="organization-copy"><p>Cada respuesta se califica de 0 a 100 con una escala por aspecto. Por ejemplo, un requisito funcional vale 100 si la solución lo cumple de forma nativa y 75 si necesita un desarrollo. Si el proveedor no lo informa, vale 0.</p></div>
      <div class="rfp-excluding" role="group" aria-labelledby="rfp-excluyentes-titulo">
        <h4 id="rfp-excluyentes-titulo">Requisitos excluyentes</h4>
        <p>Una propuesta que no cumple alguno de estos requisitos queda fuera de la comparación, cualquiera sea su puntaje. Un cumplimiento parcial no excluye.</p>
        <ul>${excludingItems.map((item) => `<li><span class="rfp-code">${item.code}</span> ${item.title}</li>`).join('')}</ul>
      </div>
    </section>

    <section class="business-block" aria-labelledby="rfp-pedido-titulo">
      <h3 id="rfp-pedido-titulo">Pedido de propuestas</h3>
      <div class="organization-copy"><p>El pedido se envió a cuatro implementadores de las dos soluciones preseleccionadas, con la misma información y la misma matriz. La calificación de las respuestas está en la sección siguiente.</p></div>
      <ul class="rfp-requests" aria-label="Empresas invitadas y estado de su respuesta">
        ${requests.map((request) => `<li class="rfp-request-${request.state}">
          <h4>${request.company}</h4>
          <p>${request.solution}</p>
          <span class="status-tag">${request.status}</span>
        </li>`).join('')}
      </ul>
    </section>
    ${navigation}
  </section>`;
}
