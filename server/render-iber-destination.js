import { renderArchitectureDiagram } from './render-architecture-diagram.js';

// Server-only transcription of the four-layer destination diagram in the supplied document.
const layers = [
  {
    title: 'Procesos',
    groups: [
      { title: 'Estratégicos', items: [{ title: 'Dirección y planificación', stage: 'E1' }] },
      { title: 'Operativos', items: [
        { title: 'Importación', stage: 'E2' },
        { title: 'Compras y reposición', stage: 'E1 · E3' },
        { title: 'Marketing', stage: 'E1' },
        { title: 'Ventas', stage: 'E1' },
        { title: 'Logística y distribución', stage: 'E2' },
      ] },
      { title: 'Apoyo', items: [
        { title: 'Gestión de datos e indicadores', stage: 'E1' },
        { title: 'Gestión administrativa y contable', stage: 'E1' },
        { title: 'Gestión de sistemas', state: 'enabler' },
        'Gestión de RRHH',
        { title: 'Reportes armados a mano', state: 'removed' },
      ] },
    ],
  },
  {
    title: 'Aplicaciones',
    groups: [
      { title: 'ERP', items: ['Odoo 18', { title: 'Registro logístico', stage: 'E2' }, { title: 'Reglas de reposición', stage: 'E3' }] },
      { title: 'Análisis', items: [{ title: 'Plataforma de análisis', stage: 'E1' }] },
      { title: 'Microsoft 365', items: ['Correo y Teams', 'Planillas Excel'] },
      { title: 'Canales y pagos', items: ['Mercado Libre', 'Instagram', 'PlaceToPay'] },
      { title: 'Envíos', items: ['PedidosYa', 'Moova', 'DAC', 'dePunta'] },
      { title: 'Canal', items: ['WhatsApp'] },
    ],
  },
  {
    title: 'Datos',
    groups: [
      { title: 'Base del ERP · PostgreSQL', items: ['Ventas', 'Stock', 'Gastos', { title: 'Fletes', stage: 'E1' }, { title: 'Envíos y embarques', stage: 'E2' }] },
      { title: 'Capa analítica', stage: 'E1', items: ['Copia de solo lectura', 'Indicadores'] },
      { title: 'Planillas integradas', items: ['Metas', 'm² y horas'] },
      { title: 'Calidad de datos', state: 'enabler', items: ['Definición única', 'Responsable'] },
      { title: 'Sin registro', state: 'removed', items: ['Envíos', 'Importaciones'] },
    ],
  },
  {
    title: 'Tecnología',
    groups: [
      { title: 'Data center', items: ['Montevideo COMM', { title: 'Plataforma de análisis', stage: 'E1' }] },
      { title: 'Red de tiendas', items: ['OpenTech', 'ANTEL', 'MikroTik'] },
      { title: 'Nube', items: ['Microsoft 365'] },
      { title: 'Integración', items: [{ title: 'API con couriers', stage: 'E3' }] },
      { title: 'Servicio', items: [{ title: 'Respaldo', state: 'enabler' }, { title: 'Soporte con acuerdo', state: 'enabler' }] },
      { title: 'Equipos', items: ['PC de caja', 'Notebooks', 'Celulares'] },
    ],
  },
];

export function renderDestinationArchitecture() {
  return renderArchitectureDiagram({
    id: 'arquitectura-destino',
    title: 'Arquitectura destino',
    description: 'La arquitectura propuesta para IBER en tres etapas, de 2026 a 2028. Odoo se mantiene como núcleo transaccional y se incorpora una plataforma de análisis separada.',
    caption: 'Diagrama integrador de la arquitectura empresarial destino',
    layers,
    destination: true,
  });
}
