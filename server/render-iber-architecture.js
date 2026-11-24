import { renderArchitectureImage } from './render-architecture-image.js';
import { currentArchitectureImage, currentArchitectureHotspots } from './iber-current-architecture-map.js';

const notes = [
  { title: 'El ERP como núcleo', text: 'Odoo 18 Community concentra las ventas en tiendas y en la web, las compras, el stock y la contabilidad. Su base PostgreSQL está alojada en el data center de Montevideo COMM.' },
  { title: 'Gestión fuera del sistema', text: 'El resultado de cada tienda, el presupuesto y la meta, los indicadores de productividad y las importaciones se llevan en planillas Excel que mantiene Administración.' },
  { title: 'Logística y coordinación', text: 'La logística combina el furgón propio, PedidosYa para las urgencias entre tiendas y los couriers Moova, DAC y dePunta. Los envíos se piden desde el ERP, pero el estado de cada entrega se carga a mano. Las importaciones se coordinan con fleteros y bodegas por WhatsApp y correo, sin registro.' },
  { title: 'Infraestructura tercerizada', text: 'IBER no tiene personal de IT propio. La infraestructura, la red y el soporte están tercerizados y no cuentan con un acuerdo de servicio formal.' },
];

const diagnosis = `
  <section class="business-block architecture-diagnosis" aria-labelledby="diagnostico-actual-titulo">
    <h3 id="diagnostico-actual-titulo">Diagnóstico de situación actual</h3>
    <div class="organization-copy">
      <p>El relevamiento permitió identificar una <strong>brecha entre la complejidad operativa de IBER y las herramientas disponibles para gestionar y controlar sus actividades.</strong></p>
      <p>Si bien gran parte de la información comercial y operativa se encuentra registrada en el ERP Odoo, su aprovechamiento para la toma de decisiones depende todavía de procesos manuales, planillas externas y datos dispersos entre distintas áreas.</p>
      <p><strong>Algunos de los puntos débiles identificados son:</strong></p>

    </div>
    <dl class="diagnosis-findings iber-copy">
      <div>
        <dt>Gestión de la información</dt>
        <dd>Los indicadores comerciales y financieros se elaboran manualmente, sin una frecuencia definida ni criterios unificados de seguimiento.</dd>
      </div>
      <div>
        <dt>Rentabilidad de las sucursales</dt>
        <dd>Existen dificultades para identificar los factores que afectan los resultados de cada establecimiento, especialmente en relación con los costos, la demanda y la composición del stock.</dd>
      </div>
      <div>
        <dt>Gestión logística</dt>
        <dd>La trazabilidad de los envíos y las importaciones es limitada. La coordinación con transportistas depende de comunicaciones informales y no existe una visión consolidada de los costos y tiempos de distribución.</dd>
      </div>
      <div>
        <dt>Integración y control</dt>
        <dd>La información se encuentra distribuida entre el ERP, planillas y conversaciones, lo que dificulta contar con una visión integral y confiable de la operación.</dd>
      </div>
    </dl>
    <section class="diagnosis-opportunity" aria-labelledby="oportunidad-transformacion-titulo">
      <h4 id="oportunidad-transformacion-titulo">Oportunidad de transformación</h4>
      <div class="organization-copy">
        <p>La principal oportunidad consiste en <strong>fortalecer la gestión de IBER mediante una mayor integración y aprovechamiento de la información disponible.</strong></p>
        <p>Esto permitiría mejorar la visibilidad de los resultados por sucursal, optimizar el abastecimiento y la distribución, controlar los costos logísticos y facilitar la toma de decisiones basadas en información confiable.</p>
        <p>La tecnología se plantea como un habilitador para mejorar los procesos y acompañar los objetivos estratégicos de la organización.</p>
      </div>
    </section>
  </section>`;

export function renderCurrentArchitecture(navigation = '') {
  return renderArchitectureImage({
    id: 'arquitectura-actual',
    title: 'Arquitectura Actual',
    description: [
      'La arquitectura empresarial de IBER refleja cómo se relacionan sus procesos, aplicaciones, fuentes de información e infraestructura tecnológica.',
      'El relevamiento permite identificar los sistemas que dan soporte a la operación, los intercambios de información y aquellos procesos que todavía dependen de herramientas externas o de registros manuales.',
    ],
    caption: 'Diagrama integrador de la arquitectura empresarial actual',
    legend: `<ul class="architecture-state-legend" aria-label="Referencias del diagrama">
          <li><span class="legend-enabler" aria-hidden="true"></span>Fuera del ERP o sin registro</li>
        </ul>`,
    image: currentArchitectureImage,
    hotspots: currentArchitectureHotspots,
    navigation,
    afterDiagram: diagnosis,
  });
}
