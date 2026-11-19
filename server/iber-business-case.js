// Transcribed from the supplied business-case document. Server-only content.
export const storyCategories = [
  { id: 'importaciones', title: 'Importaciones y abastecimiento', codes: ['US-01', 'US-02', 'US-03'] },
  { id: 'transportistas', title: 'Gestión de transportistas', codes: ['US-04', 'US-05', 'US-06'] },
  { id: 'distribucion', title: 'Distribución y stock', codes: ['US-07', 'US-08'] },
  { id: 'comercial', title: 'Gestión comercial', codes: ['US-09', 'US-10'] },
  { id: 'rentabilidad', title: 'Rentabilidad y demanda', codes: ['US-11', 'US-12', 'US-13', 'US-14'] },
];

export const businessCase = {
  "source": "01 - Caso de Negocio - Next Step (BI).docx",
  "intro": "A partir del relevamiento realizado con el sponsor, se identificaron los principales resultados que IBER busca alcanzar en los próximos años. <br /> La dirección definió tres prioridades de negocio: mejorar el nivel de servicio, incrementar la facturación y fortalecer la rentabilidad de sus sucursales. <br /> Estos resultados establecen el marco para las iniciativas de mejora y permiten vincular las decisiones operativas y tecnológicas con objetivos concretos de negocio.",
  "outcomes": [
    {
      "code": "A",
      "title": "Mejorar el nivel de servicio",
      "measure": "Entregas completas y dentro de los plazos acordados"
    },
    {
      "code": "B",
      "title": "Incrementar la facturación",
      "measure": "Crecimiento interanual de la facturación"
    },
    {
      "code": "C",
      "title": "Mejorar la rentabilidad de las sucursales",
      "measure": "Resultado de cada sucursal después de considerar los gastos centrales"
    }
  ],
  "objectives": [
    {
      "code": "O1",
      "title": "Fortalecer la eficiencia y confiabilidad del abastecimiento regional",
      "indicator": "% de embarques de importación recibidos dentro del plazo planificado",
      "target": "> 95% de los embarques",
      "deadline": "2027 Q4",
      "outcome": "A"
    },
    {
      "code": "O2",
      "title": "Optimizar la distribución dentro de Uruguay",
      "indicator": "% de entregas en plazo de cada transportista (furgón propio, PedidosYa, DAC, dePunta y Moova)",
      "target": "≥ 95% en cada transportista",
      "deadline": "2027 Q4",
      "outcome": "A"
    },
    {
      "code": "O3",
      "title": "Mejorar la trazabilidad y el cumplimiento de las entregas",
      "indicator": "% de entregas completas y dentro del plazo acordado",
      "target": "> 95% de las entregas",
      "deadline": "2027 Q4",
      "outcome": "A"
    },
    {
      "code": "O4",
      "title": "Incrementar la facturación",
      "indicator": "Variación interanual de la facturación",
      "target": "+15% en 2026 respecto de 2025 y +10% adicional en 2027",
      "deadline": "Cierre de 2027",
      "outcome": "B"
    },
    {
      "code": "O5",
      "title": "Mejorar la rentabilidad de las sucursales",
      "indicator": "Margen de cada sucursal después de gastos centrales (resultado / ventas)",
      "target": "≥ 8% en todas las sucursales",
      "deadline": "2028 Q1",
      "outcome": "C"
    },
    {
      "code": "O6",
      "title": "Adecuar el mix de productos y la rotación del stock a la demanda de cada sucursal",
      "indicator": "% del valor del stock sin ventas en más de 90 días, por sucursal",
      "target": "≤ 5% en cada sucursal",
      "deadline": "2028 Q1",
      "outcome": "C"
    }
  ],
  "timeline": [
    "Los plazos de cumplimiento se definieron considerando las etapas previstas para la transformación, la disponibilidad de información y el tiempo necesario para medir los resultados de cada objetivo.",
    "O1, O2 y O3 (2027 Q4): se pueden medir cuando los embarques y los envíos se registran en el ERP con fechas y transportista, al cierre de la etapa 2 de la transformación (2027 Q3). Se deja un trimestre para acumular datos.",
    "O4 (cierre de 2027): son las metas que fijó la dirección. El seguimiento contra la meta del presupuesto puede empezar en la etapa 1 (2027 Q1).",
    "O5 y O6 (2028 Q1): desde la etapa 1 la gerencia revisa cada mes el resultado, la rotación y el stock inmovilizado de cada sucursal. Se estima un año de decisiones sobre el surtido y los costos para alcanzar la meta."
  ],
  "interpretation": "El nivel de servicio, la facturación y la rentabilidad representan los resultados que IBER busca alcanzar. El abastecimiento regional, la distribución y la adecuación del mix de productos constituyen las principales palancas operativas para conseguirlos. La integración y confiabilidad de la información, la automatización y el ERP actúan como habilitadores de esta transformación: permiten gestionar esas palancas y tomar decisiones basadas en información, pero no constituyen objetivos de negocio por sí mismos.",
  "stories": [
    {
      "code": "US-01",
      "title": "Maestro y trazabilidad de operaciones de importación",
      "description": "Como responsable de importaciones, quiero registrar y consultar en un único lugar las operaciones de traslado de mercadería desde Argentina y Chile, con origen, destino, responsable, fechas planificadas, fechas reales y estado de la operación, para contar con trazabilidad del abastecimiento regional y detectar desvíos durante el proceso.",
      "objective": "O1"
    },
    {
      "code": "US-02",
      "title": "Seguimiento de plazos de importación",
      "description": "Como responsable de importaciones, quiero comparar los tiempos planificados y reales de cada operación de importación desde Argentina y Chile, para identificar demoras recurrentes y mejorar la planificación del abastecimiento.",
      "objective": "O1"
    },
    {
      "code": "US-03",
      "title": "Alertas sobre desvíos en importaciones",
      "description": "Como responsable de importaciones, quiero recibir alertas cuando una operación de importación se desvíe del plazo o del hito planificado, para anticipar posibles interrupciones en el abastecimiento y tomar acciones correctivas.",
      "objective": "O1"
    },
    {
      "code": "US-04",
      "title": "Maestro de proveedores logísticos",
      "description": "Como responsable de logística, quiero contar con información centralizada y actualizada de los transportistas, con zonas de cobertura, tarifas, condiciones y tipos de servicio, para disponer de información confiable para elegir el transportista adecuado para cada envío.",
      "objective": "O2"
    },
    {
      "code": "US-05",
      "title": "Asignación del transportista según reglas",
      "description": "Como encargado de tienda, quiero que el sistema indique el transportista que corresponde según el destino y el tipo de envío, y que pida autorización para los traslados urgentes, para que la asignación no dependa de lo que sabe cada persona y que los envíos urgentes queden controlados.",
      "objective": "O2"
    },
    {
      "code": "US-06",
      "title": "Consulta de costos y desempeño de transportistas",
      "description": "Como gerente comercial, quiero consultar el costo y el cumplimiento histórico de cada transportista según tipo de envío, destino y canal, para evaluar las alternativas de distribución y mejorar las decisiones de asignación.",
      "objective": "O2"
    },
    {
      "code": "US-07",
      "title": "Trazabilidad de envíos",
      "description": "Como encargado del centro logístico, quiero registrar y consultar los hitos de cada envío, desde su preparación hasta su entrega, para conocer el estado de cada operación y detectar demoras que puedan afectar el cumplimiento de la entrega.",
      "objective": "O3"
    },
    {
      "code": "US-08",
      "title": "Niveles de stock y reposición",
      "description": "Como encargado de tienda, quiero contar con niveles de stock mínimo y máximo para cada producto y sucursal, para mantener una disponibilidad adecuada de productos y reducir faltantes.",
      "objective": "O3"
    },
    {
      "code": "US-09",
      "title": "Seguimiento de facturación contra la meta",
      "description": "Como gerente general, quiero ver la facturación acumulada frente a la meta anual, desglosada por canal y sucursal, para detectar desvíos respecto del crecimiento esperado y orientar las acciones comerciales hacia los canales con más potencial.",
      "objective": "O4"
    },
    {
      "code": "US-10",
      "title": "Análisis de ventas por segmento y cliente",
      "description": "Como jefatura de marketing, quiero consultar el volumen de compra, la frecuencia y el ticket promedio por segmento y por cliente (corporativo, HORECA, mayorista), para identificar los segmentos y clientes con mayor potencial y orientar las acciones comerciales hacia ellos.",
      "objective": "O4"
    },
    {
      "code": "US-11",
      "title": "Análisis de rentabilidad por sucursal",
      "description": "Como gerente comercial, quiero analizar la rentabilidad de cada sucursal desagregando sus resultados por rubro y categoría de producto, margen, volumen de ventas y costos asociados, para identificar los factores que afectan la rentabilidad de las sucursales y definir acciones para mejorar su resultado.",
      "objective": "O5"
    },
    {
      "code": "US-12",
      "title": "Perfil de demanda por sucursal",
      "description": "Como gerente comercial, quiero comparar entre sucursales las categorías, etiquetas y rangos de precio vendidos, considerando la estacionalidad y el tipo de cliente, para adaptar el surtido de cada sucursal a su demanda real y mejorar la rotación del stock.",
      "objective": "O6"
    },
    {
      "code": "US-13",
      "title": "Rotación por etiqueta y sucursal",
      "description": "Como gerente comercial, quiero consultar la rotación y el porcentaje de venta de cada etiqueta por sucursal, para identificar productos de baja rotación y decidir su redistribución, promoción o reemplazo.",
      "objective": "O6"
    },
    {
      "code": "US-14",
      "title": "Distribución sugerida según demanda",
      "description": "Como encargado del centro logístico, quiero que el sistema proponga las cantidades de cada etiqueta a enviar a cada sucursal según el historial de ventas, la estacionalidad y el stock disponible, para distribuir la mercadería según la demanda esperada y reducir sobrestock y faltantes.",
      "objective": "O6"
    }
  ]
};
