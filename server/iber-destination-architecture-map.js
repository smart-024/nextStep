// Interactive zones over the destination diagram of template 03 (27/10/2026 version, page 10).
// badgeBox includes the stage badge above the body in the same interactive highlight.
// shape: 'chevron' recorta la zona con la forma de flecha de los procesos.
// box = [left, top, right, bottom] in pixels of the 1275x639 image (layers block only; title, legend and footer are HTML). Texts summarize template 03.
export const destinationArchitectureImage = {
  src: '/iber/imagenes/arquitectura-destino.png',
  width: 1275,
  height: 639,
  alt: 'Diagrama de la arquitectura empresarial destino de IBER en cuatro capas: procesos, aplicaciones, datos y tecnología. El color indica la etapa en que cada elemento se incorpora o cambia (E1, E2 o E3), el borde punteado marca los habilitadores y lo tachado se elimina.',
};

export const destinationArchitectureHotspots = [
  // Layers
  { box: [8, 8, 129, 205], title: 'Procesos', text: 'El mapa de procesos se mantiene. Cambia cómo usan la información y se suma un proceso nuevo: la gestión de datos e indicadores.' },
  { box: [8, 215, 129, 357], title: 'Aplicaciones', text: 'Odoo sigue como núcleo. Se suman la plataforma de análisis y, más adelante, el registro logístico y las reglas de reposición en el ERP.' },
  { box: [8, 366, 129, 486], title: 'Datos', text: 'El ERP sigue siendo la fuente única de la operación. Una capa analítica separada consolida sus datos con las planillas que siguen en uso.' },
  { box: [8, 495, 129, 631], title: 'Tecnología', text: 'Se mantiene la infraestructura actual y se suman la plataforma de análisis, la integración con couriers, el respaldo y el soporte con acuerdo de servicio.' },

  // Processes
  { box: [268, 20, 459, 67], badgeBox: [409, 12, 437, 29], shape: 'chevron', title: 'Dirección y planificación · E1', text: 'La facturación se sigue contra la meta por canal, sucursal y segmento, y las decisiones sobre sucursales se toman con su resultado.' },
  { box: [268, 82, 459, 128], badgeBox: [409, 73, 437, 91], shape: 'chevron', title: 'Importación · E2', text: 'Los embarques por camión se registran en el ERP con fechas planificadas y reales, en lugar de la planilla y WhatsApp.' },
  { box: [465, 82, 656, 128], badgeBox: [598, 73, 643, 91], shape: 'chevron', title: 'Compras y reposición · E1 a E3', text: 'El surtido se define según la rotación de cada sucursal (E1) y luego con niveles mínimos y máximos (E3).' },
  { box: [662, 82, 853, 128], badgeBox: [803, 73, 831, 91], shape: 'chevron', title: 'Marketing · E1', text: 'Ventas por segmento y por cliente para orientar las acciones comerciales.' },
  { box: [859, 82, 1050, 128], badgeBox: [1000, 73, 1028, 91], shape: 'chevron', title: 'Ventas · E1', text: 'Ventas por canal y por sucursal visibles en tableros, sin armar planillas.' },
  { box: [1056, 82, 1247, 128], badgeBox: [1197, 73, 1225, 91], shape: 'chevron', title: 'Logística y distribución · E2', text: 'Proceso escrito con responsable: cada envío se registra con transportista, costo y fechas, y los traslados urgentes requieren autorización.' },
  { box: [268, 143, 459, 190], badgeBox: [409, 135, 437, 153], shape: 'chevron', title: 'Gestión de datos e indicadores · E1', text: 'Proceso nuevo: un responsable, una definición única de cada indicador y un control mensual de que la carga esté completa.' },
  { box: [465, 143, 656, 190], badgeBox: [606, 135, 634, 153], shape: 'chevron', title: 'Gestión administrativa y contable · E1', text: 'Las facturas de fletes se asignan a las sucursales según sus movimientos, y no según su facturación.' },
  { box: [662, 143, 853, 190], shape: 'chevron', title: 'Gestión de sistemas · Habilitador', text: 'Acceso a los datos del ERP y acuerdo de servicio formal con el proveedor.' },
  { box: [859, 143, 1050, 190], shape: 'chevron', title: 'Gestión de RRHH · Se mantiene', text: 'Suma la capacitación en el uso de los tableros y en el registro de los datos.' },
  { box: [1056, 143, 1247, 190], shape: 'chevron', title: 'Reportes armados a mano · Se elimina', text: 'La planilla de Administración se retira cuando los tableros coinciden con sus resultados.' },

  // Applications
  { box: [149, 248, 213, 343], title: 'Odoo 18 · Se mantiene', text: 'Sigue como núcleo transaccional: ventas, compras, inventario, contabilidad y e-commerce.' },
  { box: [220, 248, 284, 343], badgeBox: [255, 239, 283, 257], title: 'Registro logístico · E2', text: 'Cada envío con transportista, costo, fecha comprometida y fecha real, y cada embarque de importación con plan y real.' },
  { box: [291, 248, 355, 343], badgeBox: [327, 239, 355, 257], title: 'Reglas de reposición · E3', text: 'Niveles mínimos y máximos por sucursal y una distribución sugerida, que complementan al pronosticador de compras.' },
  { box: [382, 248, 447, 343], badgeBox: [419, 239, 447, 257], title: 'Plataforma de análisis · E1', text: 'Tableros por rol: facturación contra la meta, resultado y productividad por sucursal, rotación y costo logístico. Solo lee los datos del ERP.' },
  { box: [474, 248, 539, 343], title: 'Correo y Teams · Se mantiene', text: 'Con las mismas cuentas de Microsoft 365 se ingresa a los tableros, sin usuarios ni contraseñas aparte.' },
  { box: [545, 248, 609, 343], title: 'Planillas Excel · Se mantiene', text: 'Quedan solo las que todavía no están en un sistema, como metas, superficie y horas, y se integran al análisis.' },
  { box: [637, 248, 701, 343], title: 'Mercado Libre · Se mantiene', text: 'Canal de venta online integrado al ERP.' },
  { box: [707, 248, 772, 343], title: 'Instagram · Se mantiene', text: 'Promoción y comunicación de productos y marcas.' },
  { box: [778, 248, 843, 343], title: 'PlaceToPay · Se mantiene', text: 'Pasarela de pagos del sitio web.' },
  { box: [870, 248, 934, 343], title: 'PedidosYa · Se mantiene', text: 'Sigue para los traslados urgentes, pero cada uno queda registrado y con autorización.' },
  { box: [941, 248, 1005, 343], title: 'Moova · Se mantiene', text: 'Desde la etapa 3, el estado de los envíos vuelve al ERP por la misma API que hoy manda las órdenes.' },
  { box: [1012, 248, 1076, 343], title: 'DAC · Se mantiene', text: 'Desde la etapa 3, el estado de los envíos vuelve al ERP por la misma API que hoy manda las órdenes.' },
  { box: [1082, 248, 1147, 343], title: 'dePunta · Se mantiene', text: 'Desde la etapa 3, el estado de los envíos vuelve al ERP por la misma API que hoy manda las órdenes.' },
  { box: [1174, 248, 1238, 343], title: 'WhatsApp · Se mantiene', text: 'Queda solo como canal de comunicación: la coordinación de importaciones se registra en el ERP.' },

  // Data
  { box: [141, 375, 419, 477], title: 'Base del ERP (PostgreSQL)', text: 'Sigue siendo la fuente única. Los fletes se asignan a las sucursales (E1) y se suman los envíos y los embarques (E2).' },
  { box: [430, 375, 646, 477], badgeBox: [615, 367, 643, 385], title: 'Capa analítica · E1', text: 'Copia de solo lectura del ERP con los indicadores por sucursal, canal, producto y fecha. Se actualiza al menos una vez por día.' },
  { box: [658, 375, 843, 477], title: 'Planillas integradas · Se mantiene', text: 'Metas, superficie y horas entran al análisis como fuente transitoria, mientras no estén en el ERP.' },
  { box: [854, 375, 1060, 477], title: 'Calidad de datos · Habilitador', text: 'Definición única de cada indicador, un responsable y controles mensuales de que la carga esté completa.' },
  { box: [1071, 375, 1246, 477], title: 'Sin registro · Se elimina', text: 'Los envíos y las importaciones dejan de quedar fuera del sistema: pasan a registrarse en el ERP.' },

  // Technology
  { box: [149, 528, 225, 617], title: 'Montevideo COMM · Se mantiene', text: 'Sigue alojando el ERP y su base de datos en su data center.' },
  { box: [231, 528, 308, 617], badgeBox: [279, 520, 307, 538], title: 'Plataforma de análisis · E1', text: 'Se aloja junto al ERP en el mismo data center, sin exponer la base de datos a internet.' },
  { box: [335, 528, 411, 617], title: 'OpenTech · Se mantiene', text: 'Sigue gestionando la red y la infraestructura de las tiendas.' },
  { box: [418, 528, 494, 617], title: 'ANTEL · Se mantiene', text: 'Conectividad de las tiendas, por cable y Wi-Fi.' },
  { box: [500, 528, 576, 617], title: 'MikroTik · Se mantiene', text: 'Routers de las tiendas, gestionados por OpenTech.' },
  { box: [604, 528, 680, 617], title: 'Microsoft 365 · Se mantiene', text: 'Suma el ingreso a los tableros con las cuentas de la organización.' },
  { box: [707, 528, 784, 617], badgeBox: [755, 520, 783, 538], title: 'API con couriers · E3', text: 'Recibir el estado de los envíos por la API que ya existe con Moova, DAC y dePunta.' },
  { box: [811, 528, 887, 617], title: 'Respaldo · Habilitador', text: 'Recuperación de la información del ERP ante fallas, con frecuencia y tiempos acordados con el proveedor.' },
  { box: [894, 528, 970, 617], title: 'Soporte con acuerdo · Habilitador', text: 'Acuerdo de servicio formal con tiempos de respuesta y de resolución.' },
  { box: [997, 528, 1073, 617], title: 'PC de caja · Se mantiene', text: 'Los encargados consultan los tableros de su sucursal desde el navegador.' },
  { box: [1080, 528, 1156, 617], title: 'Notebooks · Se mantiene', text: 'Gerencia y Administración acceden a toda la información desde el navegador.' },
  { box: [1162, 528, 1238, 617], title: 'Celulares · Se mantiene', text: 'Los tableros también se pueden consultar desde el celular.' },
];
