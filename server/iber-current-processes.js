// Full process descriptions from Arquitectura de negocio / Listado de procesos. Server-only.
export const currentProcessGroups = [
  {
    "title": "Estratégicos",
    "items": [
      {
        "title": "Planificación de ventas",
        "description": "definición de objetivos comerciales, análisis de mercado, planificación de la demanda y seguimiento de las proyecciones de ventas. La meta anual de facturación surge del presupuesto anual, que se arma en Excel, y es un total de la empresa, sin desglose por sucursal ni por canal."
      },
      {
        "title": "Dirección y planificación",
        "description": "definición de objetivos generales, estrategias de negocio, planes de crecimiento y búsqueda de nuevas oportunidades para la organización."
      },
      {
        "title": "Gestión de riesgos",
        "description": "identificación, evaluación y control de riesgos para asegurar la continuidad del negocio."
      },
      {
        "title": "Mejora continua",
        "description": "evaluación del desempeño de los procesos, identificación de oportunidades e implementación de mejoras. El desempeño de cada sucursal se sigue con los indicadores que arma Administración en Excel. Actualmente, uno de los principales focos de mejora es la estructuración del proceso logístico, buscando mejorar su planificación, control y trazabilidad."
      }
    ]
  },
  {
    "title": "Operativos",
    "items": [
      {
        "title": "Importación",
        "description": "compra de mercadería a proveedores del exterior y gestión de su ingreso al país (camión desde Argentina y Chile; vía marítima desde otros orígenes). El proceso arranca con el pedido de compra a la bodega o al proveedor extranjero. Para Argentina y Chile, el armado de los camiones (pallets, peso, fechas de disponibilidad y urgencias comerciales) se gestiona en Excel, y los camiones se contratan con fleteros. La coordinación con los fleteros y con las bodegas es informal, por WhatsApp y correo: no queda registrado quién se demoró —el fletero, la bodega o la propia empresa—, lo que dificulta la trazabilidad de fechas, demoras y mercadería involucrada. El resto de los orígenes llega por barco a un depósito fiscal, desde donde se incorpora a la distribución interna. El costo de los productos importados que se registra en Odoo incluye el flete y los demás gastos de importación."
      },
      {
        "title": "Compras",
        "description": "adquisición de mercadería a través de proveedores y distribuidores locales —ya sea de producción nacional o de marcas importadas disponibles en el mercado uruguayo— y reposición para abastecer los puntos de venta. El proceso se apoya en un módulo de pronóstico dentro del ERP, que sugiere a diario las órdenes de compra a partir del stock actual y del histórico de ventas; la orden no se envía sola."
      },
      {
        "title": "Marketing",
        "description": "promoción y comunicación de productos, marcas y propuestas comerciales. Gestión del canal e-commerce (sitio web y Mercado Libre)."
      },
      {
        "title": "Ventas",
        "description": "comercialización a través de tiendas físicas, e-commerce, canal HORECA (hoteles, restaurantes y cafés), ventas corporativas, clientes VIP y regalos empresariales."
      },
      {
        "title": "Logística y distribución",
        "description": "recepción y almacenamiento de mercadería importada, distribución y traslado entre centro logístico, tiendas y clientes (HORECA, corporativos y e-commerce). Coordinación con proveedores de transporte. Dentro de Uruguay, IBER trabaja con su furgón eléctrico propio, que abastece a los clientes HORECA y hace los traslados entre tiendas; con PedidosYa, para los traslados urgentes entre tiendas, que los encargados piden sin aprobación; con DAC y dePunta, para todo lo que va al interior, y con Moova, para los pedidos web de Montevideo, el más usado, con unos 200 envíos por mes. Con todos tiene cuenta a crédito a 30 días, y cada envío web tiene un número de seguimiento que se le manda al cliente por correo. Las facturas de fletes y couriers llegan como un total mensual por transportista y se registran así en la contabilidad de Odoo: el costo no queda asociado a cada envío ni a cada sucursal."
      }
    ]
  },
  {
    "title": "Apoyo",
    "items": [
      {
        "title": "Gestión de RRHH",
        "description": "selección, capacitación, desarrollo y bienestar del personal, a cargo de la Jefatura de Gestión Humana."
      },
      {
        "title": "Gestión de sistemas",
        "description": "soporte tecnológico, desarrollo y mantenimiento de sistemas e infraestructura. IBER no cuenta con personal de IT propio: el ERP Odoo lo administra Montevideo COMM, sin un acuerdo de servicio formal, y la red y la infraestructura de las tiendas las gestiona otro proveedor, OpenTech."
      },
      {
        "title": "Gestión administrativa y contable",
        "description": "actividades administrativas, contables y financieras de la organización. Los gastos de cada sucursal se registran en la contabilidad de Odoo identificados por local, y las facturas de fletes y couriers, por transportista. El gerente de Administración mantiene una planilla de gestión en Excel que se actualiza con los datos de Odoo y los combina con las planillas de superficie y horas trabajadas de cada sucursal. La planilla incluye el estado de resultados (P&L) de la empresa y de cada tienda —con el resultado primario y el resultado después de gastos centrales, que se reparten según la participación de cada sucursal en la facturación total— y los indicadores de productividad: facturación por metro cuadrado, por hora hombre y sobre el costo de alquiler. Se actualiza a mano y sin una frecuencia fija. Las ventas y la rentabilidad de cada rubro (por ejemplo, vinos uruguayos y argentinos) se siguen en otras planillas Excel."
      }
    ]
  }
];
