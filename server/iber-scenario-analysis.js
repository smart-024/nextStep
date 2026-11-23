// Server-only transcription of the supplied scenario strengths/weaknesses table.
export const scenarioAnalysis = {
  E1: {
    strengths: [
      'Los datos no salen del data center ni del país.',
      'Conexión directa a la base, sin exponerla a internet.',
      'Puede no tener costo por usuario si la herramienta es de código abierto.',
      'Un solo proveedor coordina el ERP y el análisis.',
    ],
    weaknesses: [
      'Todos los tableros y usuarios a la vez, sin validar las definiciones: riesgo de números que no coinciden con la planilla de Administración.',
      'Montevideo COMM no es especialista en análisis de datos.',
      'IBER depende de que el proveedor mantenga servidores y versiones.',
      'Los beneficios llegan recién al final.',
    ],
  },
  E2: {
    strengths: [
      'Las mismas ventajas de datos y conexión que el escenario 1.',
      'Primeros tableros para la gerencia en pocas semanas.',
      'Cada ola se valida contra la planilla actual antes de retirarla.',
      'Las definiciones de los indicadores se ajustan de a poco.',
    ],
    weaknesses: [
      'Mayor duración total.',
      'Conviven la planilla y los tableros durante la transición.',
      'Depende del proveedor para mantener la plataforma.',
      'Las funciones dependen de lo que se pueda instalar: código abierto o licencias de servidor.',
    ],
  },
  E3: {
    strengths: [
      'Sin servidores que mantener: el fabricante se ocupa de la infraestructura y las actualizaciones.',
      'Funciones maduras de fábrica.',
      'Posible ingreso con las cuentas de Microsoft 365.',
    ],
    weaknesses: [
      'Datos fuera de Uruguay: hay que revisar la transferencia internacional (Ley 18.331).',
      'Requiere un conector junto a la base, que Montevideo COMM debe habilitar.',
      'Costo por usuario para unas 27 personas, en general en dólares.',
      'Todo a la vez: mismo riesgo de adopción que el escenario 1.',
      'Suma un proveedor más.',
    ],
  },
  E4: {
    strengths: [
      'Sin servidores que mantener.',
      'Empieza con pocas licencias (gerencia) y suma a los encargados después: el costo crece por etapas.',
      'Validación por olas.',
      'Funciones maduras y posible integración con Microsoft 365.',
    ],
    weaknesses: [
      'Datos fuera de Uruguay.',
      'Conector junto a la base.',
      'Costo recurrente que crece con los usuarios.',
      'Depende de dos proveedores: el fabricante y Montevideo COMM para el acceso a los datos.',
    ],
  },
};
