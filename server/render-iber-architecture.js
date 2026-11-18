import { renderArchitectureDiagram } from './render-architecture-diagram.js';

// Server-only transcription of the integrative diagram in the supplied architecture document.
const layers = [
  {
    title: 'Procesos',
    groups: [
      { title: 'Estratégicos', items: ['Dirección y planificación'] },
      { title: 'Operativos', items: ['Importación', 'Compras', 'Marketing', 'Ventas', 'Logística y distribución'] },
      { title: 'Apoyo', items: ['Gestión administrativa y contable', 'Gestión de sistemas', 'Gestión de RRHH'] },
    ],
  },
  {
    title: 'Aplicaciones',
    groups: [
      { title: 'ERP', items: ['Odoo 18 · ERP y e-commerce'] },
      { title: 'Microsoft 365', items: ['Correo', 'Teams', { title: 'Planillas Excel', outside: true }] },
      { title: 'Canales y pagos', items: ['Mercado Libre', 'Instagram', 'PlaceToPay'] },
      { title: 'Envíos', items: ['PedidosYa', 'Moova', 'DAC', 'dePunta'] },
      { title: 'Coordinación', items: [{ title: 'WhatsApp', outside: true }] },
    ],
  },
  {
    title: 'Datos',
    groups: [
      { title: 'Base del ERP · PostgreSQL', items: ['Ventas', 'Stock', 'Gastos por sucursal', 'Fletes'] },
      { title: 'Planillas Excel', outside: true, items: ['Resultados', 'Presupuesto y meta', 'Importaciones'] },
      { title: 'Sin registro', outside: true, items: ['Estados de envío', 'Coordinación de importaciones'] },
    ],
  },
  {
    title: 'Tecnología',
    groups: [
      { title: 'Data center', items: ['Montevideo COMM'] },
      { title: 'Red de tiendas', items: ['OpenTech', 'ANTEL', 'MikroTik'] },
      { title: 'Nube', items: ['Microsoft 365'] },
      { title: 'Equipos', items: ['PC de caja', 'Notebooks', 'Celulares'] },
      { title: 'Soporte', outside: true, items: ['Tercerizado, sin acuerdo'] },
    ],
  },
];

const notes = [
  { title: 'El ERP como núcleo', text: 'Odoo 18 Community concentra las ventas en tiendas y en la web, las compras, el stock y la contabilidad. Su base PostgreSQL está alojada en el data center de Montevideo COMM.' },
  { title: 'Gestión fuera del sistema', text: 'El resultado de cada tienda, el presupuesto y la meta, los indicadores de productividad y las importaciones se llevan en planillas Excel que mantiene Administración.' },
  { title: 'Logística y coordinación', text: 'La logística combina el furgón propio, PedidosYa para las urgencias entre tiendas y los couriers Moova, DAC y dePunta. Los envíos se piden desde el ERP, pero el estado de cada entrega se carga a mano. Las importaciones se coordinan con fleteros y bodegas por WhatsApp y correo, sin registro.' },
  { title: 'Infraestructura tercerizada', text: 'IBER no tiene personal de IT propio. La infraestructura, la red y el soporte están tercerizados y no cuentan con un acuerdo de servicio formal.' },
];

export function renderCurrentArchitecture() {
  return renderArchitectureDiagram({
    id: 'arquitectura-actual',
    title: 'Arquitectura Actual',
    description: 'Una vista integrada de los procesos, las aplicaciones, los datos y la tecnolog\u00eda de IBER.',
    caption: 'Diagrama integrador de la arquitectura empresarial actual',
    layers,
  });
}
