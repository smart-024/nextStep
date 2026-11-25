// Documents remain outside public/ and are bundled only into the private Function.
// Each section lists one or more documents; a section with several shows a single button with a menu.
export const documentTypes = {
  pdf: { label: 'PDF', contentType: 'application/pdf', signature: '%PDF-' },
  xlsx: { label: 'Excel', contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', signature: 'PK' },
};

export const iberDocuments = {
  'caso-de-negocio': [{ name: 'caso-de-negocio.pdf', filename: '01 - Caso de Negocio.pdf', label: 'Caso de Negocio', type: 'pdf' }],
  'arquitectura-actual': [{ name: 'arquitectura-actual.pdf', filename: '02 - Arquitectura Empresarial Actual.pdf', label: 'Arquitectura Actual', type: 'pdf' }],
  'arquitectura-destino': [{ name: 'arquitectura-destino.pdf', filename: '03 - Visión de Arquitectura Empresarial Destino.pdf', label: 'Arquitectura destino', type: 'pdf' }],
  'escenarios-de-solucion': [{ name: 'escenarios-de-solucion.pdf', filename: '04 - Matriz de Brechas y Análisis de Escenarios.pdf', label: 'Escenarios de Solución', type: 'pdf' }],
  'alcance-mercado-soluciones': [{ name: 'alcance-mercado-soluciones.pdf', filename: '05 - Alcance y Análisis del Mercado de Soluciones.pdf', label: 'Alcance y análisis del mercado de soluciones', type: 'pdf' }],
  'matriz-rfp': [{ name: 'matriz-rfp.xlsx', filename: '06 - Matriz RFP.xlsx', label: 'Matriz RFP', type: 'xlsx' }],
  'evaluacion-proveedores': [
    { name: 'comparacion-cumplimiento.pdf', filename: '07 - Comparación de Cumplimiento y Evaluación Económica - Next Step (BI).pdf', label: '07 · Comparación de cumplimiento y evaluación económica', type: 'pdf' },
    { name: 'propuesta-comercial-conclusiones.pdf', filename: '08 - Análisis de la Propuesta Comercial y Conclusiones de la Selección - Next Step (BI).pdf', label: '08 · Propuesta comercial y conclusiones de la selección', type: 'pdf' },
  ],
  'innovacion-ia': [
    { name: 'oportunidad-ia.pdf', filename: '09 - Oportunidad de innovación con IA Generativa - Next Step (BI).pdf', label: '09 · Oportunidad de innovación con IA generativa', type: 'pdf' },
    { name: 'diseno-validacion-ia.pdf', filename: '10 - Diseño y validación de la solución de IA Generativa - Next Step (BI).pdf', label: '10 · Diseño y validación de la solución de IA', type: 'pdf' },
  ],
  'conclusiones': [{ name: 'resumen-ejecutivo.pdf', filename: '11 - Resumen Ejecutivo - Next Step (BI).pdf', label: 'Resumen Ejecutivo', type: 'pdf' }],
};

export const iberDocumentList = Object.values(iberDocuments).flat();
