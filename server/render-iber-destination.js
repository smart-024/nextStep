import { renderArchitectureImage } from './render-architecture-image.js';
import { destinationArchitectureImage, destinationArchitectureHotspots } from './iber-destination-architecture-map.js';

// Stages of the transformation, summarized from template 03 ("Etapas de la transformación").
const stages = [
  {
    code: 'E1',
    period: '2026 Q4 – 2027 Q1',
    title: 'Decidir con los datos actuales',
    adds: 'Diagnóstico de datos, indicadores con responsable, plataforma de análisis y fletes asignados a las sucursales.',
    measurable: 'Facturación contra la meta; resultado, productividad y rotación por sucursal; costo logístico estimado.',
  },
  {
    code: 'E2',
    period: '2027 Q2 – Q3',
    title: 'Registrar la logística en el ERP',
    adds: 'Proceso logístico escrito con responsable, envíos con costo y fechas, y embarques de importación.',
    measurable: 'Entregas completas y en plazo, importaciones en plazo y costo logístico real por sucursal.',
  },
  {
    code: 'E3',
    period: '2027 Q4 – 2028',
    title: 'Integrar y optimizar',
    adds: 'Estados de envío desde los couriers, niveles mínimos y máximos con distribución sugerida y evaluación de transportistas.',
    measurable: 'Demoras detectadas antes del vencimiento; faltantes y stock inmovilizado frente a niveles definidos.',
  },
];

const roadmap = `
  <section class="business-block architecture-diagnosis" aria-labelledby="camino-destino-titulo">
    <h3 id="camino-destino-titulo">Cómo se llega al destino</h3>
    <div class="organization-copy">
      <p>La transformación no reemplaza el ERP: le suma una capa de análisis y ordena el registro de la información que hoy falta. 
      Se avanza en tres etapas sucesivas. Cada una entrega valor por sí misma y genera los datos que aprovecha la siguiente.</p>
    </div>
    <ol class="destination-stages">
      ${stages.map((stage, index) => `
        <li class="destination-stage">
          <p class="destination-stage-period"><span class="architecture-stage-tag architecture-stage-${index + 1}">${stage.code}</span>${stage.period}</p>
          <h4>${stage.title}</h4>
          <dl>
            <div><dt>Incorpora</dt><dd>${stage.adds}</dd></div>
            <div><dt>Se vuelve medible</dt><dd>${stage.measurable}</dd></div>
          </dl>
        </li>`).join('')}
    </ol>
    <section class="diagnosis-opportunity" aria-labelledby="orden-etapas-titulo">
      <h4 id="orden-etapas-titulo">Por qué en este orden</h4>
      <div class="organization-copy">
        <p>Se empieza por la facturación y la rentabilidad de las sucursales porque sus datos ya están en el ERP. El nivel de servicio recién se puede medir cuando se registren las fechas de cada entrega.</p>
        <p>En las tres etapas, la calidad de los datos, el respaldo y el soporte con acuerdo de servicio son condiciones habilitadoras.</p>
      </div>
    </section>
  </section>`;

// Template 03 destination diagram shown as an image with interactive zones.
export function renderDestinationArchitecture(navigation = '') {
  return renderArchitectureImage({
    id: 'arquitectura-destino',
    title: 'Arquitectura destino',
    description: ['Una visión de evolución para IBER: integrar la información, mejorar la gestión y acompañar el crecimiento del negocio sin reemplazar su ERP actual.','La transformación se plantea en tres etapas progresivas, desde el análisis de los datos disponibles hasta la integración y optimización de los procesos.'],
    caption: 'Diagrama integrador de la arquitectura empresarial destino',
    legend: `<ul class="architecture-stage-legend" aria-label="Etapas de la transformación">
          ${stages.map((stage, index) => `<li><span class="architecture-stage-tag architecture-stage-${index + 1}">${stage.code}</span><div>${stage.title}<small>${stage.period}</small></div></li>`).join('')}
        </ul>
        <ul class="architecture-state-legend" aria-label="Tipos de cambio">
          <li><span class="legend-retained" aria-hidden="true"></span>Se mantiene</li>
          <li><span class="legend-enabler" aria-hidden="true"></span>Habilitador</li>
          <li><span class="legend-removed" aria-hidden="true"></span>Se elimina</li>
        </ul>`,
    image: destinationArchitectureImage,
    hotspots: destinationArchitectureHotspots,
    navigation,
    afterDiagram: roadmap,
  });
}
