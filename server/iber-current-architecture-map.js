// Interactive zones over the integrative diagram of template 02 (current architecture, 27/10/2026 version).
// shape: 'chevron' recorta la zona con la forma de flecha de los procesos.
// box = [left, top, right, bottom] in pixels of the 1275x639 image (layers block only; title, legend and footer are HTML). Texts summarize templates 01 and 02.
export const currentArchitectureImage = {
  src: '/iber/imagenes/arquitectura-actual.png',
  width: 1275,
  height: 639,
  alt: 'Diagrama integrador de la arquitectura empresarial actual de IBER en cuatro capas: procesos, aplicaciones, datos y tecnología. El borde punteado marca lo que está fuera del ERP o no deja registro.',
};

export const currentArchitectureHotspots = [
  // Layers
  { box: [8, 8, 129, 205], title: 'Procesos', text: 'Los procesos estratégicos, operativos y de apoyo de IBER, según su mapa de procesos.' },
  { box: [8, 215, 129, 357], title: 'Aplicaciones', text: 'Odoo 18 Community es el núcleo de la operación. Alrededor conviven Microsoft 365, los canales de venta y pago, los couriers y WhatsApp.' },
  { box: [8, 366, 129, 486], title: 'Datos', text: 'La operación queda en la base del ERP, pero la gestión se arma en planillas Excel y parte de la logística no deja registro.' },
  { box: [8, 495, 129, 631], title: 'Tecnología', text: 'Infraestructura tercerizada: el ERP está en el data center de Montevideo COMM, OpenTech gestiona la red de las tiendas y no hay personal de IT propio.' },

  // Processes
  { box: [268, 20, 459, 67], shape: 'chevron', title: 'Dirección y planificación', text: 'La meta anual de facturación sale del presupuesto en Excel y es un total de la empresa, sin desglose por sucursal ni por canal.' },
  { box: [268, 82, 459, 128], shape: 'chevron', title: 'Importación', text: 'Los camiones desde Argentina y Chile se arman en Excel y se coordinan con fleteros y bodegas por WhatsApp, sin registro de quién se demoró.' },
  { box: [465, 82, 656, 128], shape: 'chevron', title: 'Compras', text: 'Un módulo del ERP sugiere a diario las órdenes de compra según el stock y el histórico de ventas. La orden no se envía sola.' },
  { box: [662, 82, 853, 128], shape: 'chevron', title: 'Marketing', text: 'Promoción de productos y marcas, y gestión del canal online: sitio web y Mercado Libre.' },
  { box: [859, 82, 1050, 128], shape: 'chevron', title: 'Ventas', text: 'Tiendas físicas, e-commerce, canal HORECA, ventas corporativas y regalos empresariales. Todo se registra en el ERP.' },
  { box: [1056, 82, 1247, 128], shape: 'chevron', title: 'Logística y distribución', text: 'Furgón propio, PedidosYa para urgencias, DAC y dePunta al interior y Moova en Montevideo. Los fletes se facturan como un total mensual por transportista.' },
  { box: [268, 143, 459, 190], shape: 'chevron', title: 'Gestión administrativa y contable', text: 'Los gastos se registran por sucursal. El resultado de cada tienda y los indicadores de productividad se arman a mano en una planilla.' },
  { box: [465, 143, 656, 190], shape: 'chevron', title: 'Gestión de sistemas', text: 'IBER no tiene personal de IT propio. Montevideo COMM mantiene el ERP sin un acuerdo de servicio formal.' },
  { box: [662, 143, 853, 190], shape: 'chevron', title: 'Gestión de RRHH', text: 'Selección, capacitación, desarrollo y bienestar del personal, a cargo de la Jefatura de Gestión Humana.' },

  // Applications
  { box: [149, 248, 227, 343], title: 'Odoo 18 · ERP y e-commerce', text: 'Ventas y punto de venta, compras, inventario, contabilidad y sitio web. Concentra la información de la operación.' },
  { box: [254, 248, 332, 343], title: 'Correo', text: 'Correo institucional @iber.uy, también usado para coordinar con proveedores y fleteros.' },
  { box: [339, 248, 417, 343], title: 'Teams', text: 'Comunicación interna de la organización, incluida en Microsoft 365.' },
  { box: [423, 248, 501, 343], title: 'Planillas Excel', text: 'Fuera del ERP: planilla de gestión con el resultado por tienda, presupuesto anual, rentabilidad por rubro, importaciones y superficie y horas.' },
  { box: [528, 248, 606, 343], title: 'Mercado Libre', text: 'Canal de venta online, a cargo de Marketing.' },
  { box: [613, 248, 691, 343], title: 'Instagram', text: 'Promoción y comunicación de productos y marcas.' },
  { box: [697, 248, 775, 343], title: 'PlaceToPay', text: 'Pasarela de pagos del sitio web: redirige a cada banco o tarjeta.' },
  { box: [802, 248, 880, 343], title: 'PedidosYa', text: 'Traslados urgentes entre tiendas, que los encargados piden sin aprobación ni control.' },
  { box: [887, 248, 964, 343], title: 'Moova', text: 'Reparte los pedidos web de Montevideo, unos 200 envíos por mes. Recibe la orden por API y devuelve la etiqueta.' },
  { box: [971, 248, 1049, 343], title: 'DAC', text: 'Envíos al interior. Recibe la orden por API; el estado de la entrega se carga a mano en el ERP.' },
  { box: [1055, 248, 1133, 343], title: 'dePunta', text: 'Envíos al interior. Recibe la orden por API; el estado de la entrega se carga a mano en el ERP.' },
  { box: [1160, 248, 1238, 343], title: 'WhatsApp', text: 'Coordinación con los fleteros de importación, las bodegas y entre tiendas. Lo conversado no queda registrado.' },

  // Data
  { box: [141, 375, 536, 477], title: 'Base del ERP (PostgreSQL)', text: 'Ventas, stock, gastos por sucursal y facturas de fletes. Los fletes se registran por transportista, sin asignarse a sucursales ni a envíos.' },
  { box: [548, 375, 891, 477], title: 'Planillas Excel', text: 'Resultados por tienda, presupuesto con la meta anual e importaciones. Se actualizan a mano y sin una frecuencia fija.' },
  { box: [903, 375, 1247, 477], title: 'Sin registro', text: 'Los estados de envío se consultan en la web de cada courier y se cargan a mano. La coordinación de importaciones queda en WhatsApp y correo.' },

  // Technology
  { box: [197, 528, 293, 617], title: 'Montevideo COMM', text: 'Aloja el ERP y su base PostgreSQL en su data center: no son servidores propios de IBER ni nube pública.' },
  { box: [320, 528, 415, 617], title: 'OpenTech', text: 'Gestiona la red y la infraestructura de las tiendas, incluidos los routers MikroTik.' },
  { box: [422, 528, 517, 617], title: 'ANTEL', text: 'Proveedor de la conectividad de las tiendas, por cable y Wi-Fi.' },
  { box: [523, 528, 619, 617], title: 'MikroTik', text: 'Routers de las tiendas, gestionados por OpenTech.' },
  { box: [646, 528, 741, 617], title: 'Microsoft 365', text: 'Servicio en la nube para el correo y la ofimática, con un plan para empresas que no incluye Power BI.' },
  { box: [769, 528, 864, 617], title: 'PC de caja', text: 'Unos 20 equipos repartidos entre las tiendas para ventas y facturación en Odoo.' },
  { box: [870, 528, 966, 617], title: 'Notebooks', text: 'Unas 15 notebooks de administración y gerencia: Odoo desde el navegador, Microsoft 365 y WhatsApp Web.' },
  { box: [972, 528, 1067, 617], title: 'Celulares', text: 'Entre 30 y 40 celulares corporativos. Son el canal habitual de coordinación con los fleteros y entre tiendas.' },
  { box: [1095, 528, 1191, 617], title: 'Soporte', text: 'Tercerizado y sin acuerdo de servicio formal: no hay tiempos de respuesta ni de resolución comprometidos.' },
];
