// Generative AI opportunity (templates 09 and 10), focused on the value for IBER.
// Content stays in authenticated IBER HTML. Example figures are the prototype's fictitious data.
const prototypeUrl = 'https://claude.ai/artifact/HWo9WnJc6zifTip95XRdFe';

const today = [
  ['El resultado se arma a mano', 'Administración mantiene una planilla con el resultado de cada sucursal, sin una frecuencia fija.'],
  ['No se sabe por qué una sucursal pierde', 'Hay sucursales con resultado negativo y cada una pierde por una combinación distinta de causas.'],
  ['Las decisiones no quedan registradas', 'El análisis depende de una persona y no deja registro de las acciones acordadas.'],
];

const flow = [
  ['El BI calcula', 'La plataforma de BI publica los indicadores de cada sucursal al cierre del mes.'],
  ['La IA redacta', 'El asistente explica las causas del resultado y propone acciones, usando solo esas cifras.'],
  ['El gerente decide', 'El gerente comercial revisa, corrige y aprueba antes de la reunión mensual.'],
];

const deliverables = [
  'Un diagnóstico por sucursal, con las causas del resultado ordenadas por impacto.',
  'Hasta tres acciones para proponer, a las que el gerente asigna responsable y plazo.',
  'Hasta dos preguntas para el encargado de la sucursal.',
  'El seguimiento de lo que se acordó el mes anterior.',
];

// Walkthrough built from the prototype test cases (Salto and Paysandú, fictitious figures).
const example = [
  {
    id: 'detecta', step: '1', title: 'Detecta', heading: 'Detecta la sucursal en rojo',
    text: 'Al cierre de septiembre, la revisión del mes muestra cada sucursal con un semáforo: verde desde 8% de margen neto, ámbar entre 0% y 8% y rojo debajo de 0%. Salto cerró con un margen neto de −1,5%: está en pérdida.',
    figures: [['Margen neto', '−1,5%'], ['Meta', '8% o más']],
  },
  {
    id: 'explica', step: '2', title: 'Explica', heading: 'Explica por qué pierde',
    text: 'El asistente ordena las causas por su impacto, y cada cifra muestra de qué indicador sale. En Salto, la causa principal es el mix de productos; después vienen las ventas bajo la meta.',
    figures: [['Margen bruto', '31% contra 38,7% de la red'], ['Ventas', '96% de la meta del mes'], ['Stock sin ventas en más de 90 días', '18%, contra una meta de 5%']],
  },
  {
    id: 'contexto', step: '3', title: 'Suma contexto', heading: 'Suma lo que no está en los números',
    text: 'El gerente puede escribir una nota con lo que pasó en el mes. Si cuenta que la calle frente al local estuvo cortada 20 días, el asistente lo toma como un hecho puntual: explica unos $U 200 mil de ventas por debajo de lo habitual, pero el surtido sigue siendo la causa principal.',
    figures: [['Hecho del mes', 'Corte de calle, 20 días'], ['Lectura', 'Puntual, no estructural']],
  },
  {
    id: 'propone', step: '4', title: 'Propone', heading: 'Propone qué hacer',
    text: 'Sugiere hasta tres acciones del ciclo mensual, empezando por la causa principal: por ejemplo, cambiar el surtido o redistribuir y promocionar las etiquetas de baja rotación. También prepara preguntas para el encargado de la sucursal.',
    figures: [['Acciones', 'Hasta tres'], ['Preguntas al encargado', 'Hasta dos']],
  },
  {
    id: 'decide', step: '5', title: 'Decide', heading: 'El gerente decide',
    text: 'El gerente comercial corrige el texto, acepta o descarta cada acción y le asigna responsable y plazo. Recién entonces la sucursal pasa al resumen para la reunión. Al mes siguiente, el asistente retoma lo acordado para hacer el seguimiento.',
    figures: [['Aprobación', 'Siempre del gerente comercial'], ['Seguimiento', 'Al mes siguiente']],
  },
];

const opportunities = [
  { title: 'Asistente para la revisión mensual por sucursal', area: 'Revisión mensual de resultados', status: 'Seleccionada', state: 'selected', reason: 'Ataca la rentabilidad de las sucursales con datos que IBER ya registra y sin datos personales.' },
  { title: 'Propuestas de regalos corporativos', area: 'Ventas corporativas', status: 'Alternativa', state: 'alternative', reason: 'Su validación caería en la temporada alta de fin de año.' },
  { title: 'Registro de embarques a partir de mensajes y correos', area: 'Importación', status: 'Postergada', state: 'later', reason: 'Se retoma cuando se registre la logística en el ERP.' },
  { title: 'Consultas en lenguaje natural sobre los indicadores', area: 'Gestión con indicadores', status: 'Descartada por ahora', state: 'discarded', reason: 'Todavía no existen el modelo de datos ni el diccionario de indicadores.' },
  { title: 'Asistente de procedimientos para encargados', area: 'Logística entre tiendas', status: 'Descartada por ahora', state: 'discarded', reason: 'Los procedimientos que necesita todavía no están escritos.' },
];

const safeguards = [
  ['Las cifras las calcula el sistema', 'El asistente no hace cuentas: si falta un indicador, no genera el diagnóstico y avisa qué falta.'],
  ['Nada llega a la reunión sin aprobación', 'El borrador siempre lo revisa y lo aprueba el gerente comercial.'],
  ['Sin datos personales', 'Trabaja con indicadores agregados de una sucursal por vez, nunca con datos de clientes ni de empleados.'],
  ['No decide sobre personas', 'Los pedidos sobre personas o sobre el cierre de una sucursal se derivan a la dirección.'],
];

const nextSteps = [
  'Validar el prototipo en una sesión de unos 20 minutos con el sponsor.',
  'Implementar la plataforma de BI con el gobierno de datos y asignar el costo logístico a cada sucursal.',
  'Instituir la revisión mensual por sucursal, aunque al principio sea sin asistente.',
  'Con indicadores confiables, hacer un piloto de tres meses en las sucursales en rojo.',
];

export function renderAiInnovation(navigation = '') {
  return `<section id="innovacion-ia" class="dashboard-section ai-innovation" aria-labelledby="innovacion-ia-titulo">
    <h2 id="innovacion-ia-titulo" tabindex="-1">Oportunidad de innovación con IA</h2>
    <p class="section-description">De los indicadores a las decisiones.<br />La plataforma de BI muestra qué sucursal está en rojo. Proponemos sumar un asistente con IA generativa que ayude a entender por qué y qué hacer, para que IBER saque conclusiones más rápido en cada revisión mensual.</p>

    <section class="business-block" aria-labelledby="ia-punto-partida-titulo">
      <h3 id="ia-punto-partida-titulo">El punto de partida</h3>
      <div class="organization-copy"><p>El objetivo es mejorar la rentabilidad de las sucursales: un margen después de gastos centrales de 8% o más en todas y un stock sin ventas en más de 90 días de 5% o menos. Los tableros van a mostrar los problemas, pero el riesgo es que no se conviertan en decisiones.</p></div>
      <ul class="ai-today" aria-label="Situación actual">
        ${today.map(([title, text]) => `<li><h4>${title}</h4><p>${text}</p></li>`).join('')}
      </ul>
    </section>

    <section class="business-block" aria-labelledby="ia-valor-titulo">
      <h3 id="ia-valor-titulo">Cómo suma valor</h3>
      <div class="organization-copy"><p>La IA no reemplaza al BI: trabaja arriba de él. Una alerta avisa que una sucursal está en rojo, pero no explica por qué ni propone qué hacer. El asistente lee los indicadores y lo que el gerente sabe del mes, y redacta un diagnóstico listo para revisar.</p></div>
      <ol class="ai-flow" aria-label="Cómo se reparten las tareas">
        ${flow.map(([title, text], index) => `<li class="ai-flow-step-${index + 1}"><span class="ai-flow-number">${index + 1}</span><h4>${title}</h4><p>${text}</p></li>`).join('')}
      </ol>
      <div class="ai-deliverables">
        <h4>Qué recibe el gerente comercial cada mes</h4>
        <ul>${deliverables.map((item) => `<li>${item}</li>`).join('')}</ul>
      </div>
    </section>

    <section class="business-block" aria-labelledby="ia-ejemplo-titulo">
      <h3 id="ia-ejemplo-titulo">Un ejemplo: la sucursal Salto</h3>
      <div class="organization-copy"><p>Recorré paso a paso cómo se prepara la revisión de una sucursal en rojo. Las cifras son ficticias, las mismas que usa el prototipo.</p></div>
      <div class="scenario-tabs ai-example" data-scenario-tabs>
        <div class="scenario-tab-list ai-example-list" aria-label="Pasos del ejemplo">
          ${example.map((item) => `<button id="ia-tab-${item.id}" class="scenario-tab" type="button" aria-controls="ia-panel-${item.id}" disabled>
            <span class="scenario-code">Paso ${item.step}</span>
            <span>${item.title}</span>
          </button>`).join('')}
        </div>
        <div class="scenario-panel-shell">
          ${example.map((item) => `<div id="ia-panel-${item.id}" class="scenario-panel ai-example-panel" aria-labelledby="ia-tab-${item.id}">
            <h4>${item.heading}</h4>
            <p>${item.text}</p>
            <dl class="ai-example-figures">${item.figures.map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join('')}</dl>
          </div>`).join('')}
        </div>
      </div>
      <p class="ai-example-note">Si falta un dato, frena y avisa. En Paysandú no estaba asignado el costo logístico: el asistente no estimó el dato ni generó el diagnóstico, informó qué faltaba y avisó al responsable de datos.</p>
    </section>

    <section class="business-block" aria-labelledby="ia-cuidados-titulo">
      <h3 id="ia-cuidados-titulo">Reglas que no cambian</h3>
      <div class="organization-copy"><p>El asistente prepara el trabajo, pero la decisión siempre es de la gerencia.</p></div>
      <dl class="ai-safeguards">${safeguards.map(([term, text]) => `<div><dt>${term}</dt><dd>${text}</dd></div>`).join('')}</dl>
    </section>

    <section class="business-block" aria-labelledby="ia-prototipo-titulo">
      <div class="diagnosis-opportunity ai-prototype">
        <h3 id="ia-prototipo-titulo">Probalo en el prototipo</h3>
        <div class="organization-copy"><p>Construimos una versión navegable de la revisión mensual con cuatro sucursales reales de IBER (Montevideo, Paysandú, Salto y Punta Carretas Shopping) y cifras ficticias de septiembre y octubre de 2026. Aprobó los 11 casos de prueba que definimos, uno de ellos con observaciones, desde una sucursal con datos completos hasta pedidos fuera de alcance. Falta validarlo con un usuario de IBER.</p></div>
        <a class="ai-prototype-link" href="${prototypeUrl}" target="_blank" rel="noopener noreferrer">Abrir el prototipo<span class="visually-hidden"> (se abre en una pestaña nueva)</span></a>
        <p class="ai-prototype-note">Con una cuenta de claude.ai, el asistente redacta con IA. Sin cuenta, funciona con reglas fijas.</p>
      </div>
    </section>

    <section class="business-block" aria-labelledby="ia-oportunidades-titulo">
      <h3 id="ia-oportunidades-titulo">Otras oportunidades que relevamos</h3>
      <div class="organization-copy"><p>A partir de los procesos y problemas de IBER identificamos cinco oportunidades de IA. Elegimos la que tiene mayor impacto en los objetivos y se puede aprovechar con la información que ya existe.</p></div>
      <ul class="ai-opportunities">
        ${opportunities.map((item) => `<li class="ai-opportunity-${item.state}">
          <span class="status-tag">${item.status}</span>
          <h4>${item.title}</h4>
          <p class="ai-opportunity-area">${item.area}</p>
          <p>${item.reason}</p>
        </li>`).join('')}
      </ul>
    </section>

    <section class="business-block" aria-labelledby="ia-recomendacion-titulo">
      <h3 id="ia-recomendacion-titulo">Nuestra recomendación</h3>
      <div class="organization-copy"><p><strong>Resolver primero las condiciones previas.</strong> El prototipo muestra que la idea funciona, pero su valor depende de dos cosas que hoy no existen: indicadores por sucursal validados en la plataforma de BI y una revisión mensual adoptada por IBER. Por eso proponemos retomarlo cuando la primera etapa del BI esté en marcha.</p></div>
      <ol class="ai-next-steps">${nextSteps.map((item) => `<li>${item}</li>`).join('')}</ol>
    </section>
    ${navigation}
  </section>`;
}
