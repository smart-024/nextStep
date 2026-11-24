// Interactive zones over the destination diagram of template 03 (27/10/2026 version, page 10).
// shape: 'chevron' recorta la zona con la forma de flecha de los procesos.
// box = [left, top, right, bottom] in pixels of the 1291x726 image. Texts summarize template 03.
export const destinationArchitectureImage = {
  src: '/iber/imagenes/arquitectura-destino.png',
  width: 1291,
  height: 726,
  alt: 'Diagrama de la arquitectura empresarial destino de IBER en cuatro capas: procesos, aplicaciones, datos y tecnología. El color indica la etapa en que cada elemento se incorpora o cambia (E1, E2 o E3), el borde punteado marca los habilitadores y lo tachado se elimina.',
};

export const destinationArchitectureHotspots = [
  // Layers
  { box: [16, 78, 137, 275], title: 'Procesos', text: 'El mapa de procesos se mantiene. Cambia cómo usan la información y se suma un proceso nuevo: la gestión de datos e indicadores.' },
  { box: [16, 285, 137, 427], title: 'Aplicaciones', text: 'Odoo sigue como núcleo. Se suman la plataforma de análisis y, más adelante, el registro logístico y las reglas de reposición en el ERP.' },
  { box: [16, 436, 137, 556], title: 'Datos', text: 'El ERP sigue siendo la fuente única de la operación. Una capa analítica separada consolida sus datos con las planillas que siguen en uso.' },
  { box: [16, 565, 137, 701], title: 'Tecnología', text: 'Se mantiene la infraestructura actual y se suman la plataforma de análisis, la integración con couriers, el respaldo y el soporte con acuerdo de servicio.' },

  // Processes
  { box: [276, 90, 467, 137], shape: 'chevron', title: 'Dirección y planificación · E1', text: 'La facturación se sigue contra la meta por canal, sucursal y segmento, y las decisiones sobre sucursales se toman con su resultado.' },
  { box: [276, 152, 467, 198], shape: 'chevron', title: 'Importación · E2', text: 'Los embarques por camión se registran en el ERP con fechas planificadas y reales, en lugar de la planilla y WhatsApp.' },
  { box: [473, 152, 664, 198], shape: 'chevron', title: 'Compras y reposición · E1 a E3', text: 'El surtido se define según la rotación de cada sucursal (E1) y luego con niveles mínimos y máximos (E3).' },
  { box: [670, 152, 861, 198], shape: 'chevron', title: 'Marketing · E1', text: 'Ventas por segmento y por cliente para orientar las acciones comerciales.' },
  { box: [867, 152, 1058, 198], shape: 'chevron', title: 'Ventas · E1', text: 'Ventas por canal y por sucursal visibles en tableros, sin armar planillas.' },
  { box: [1064, 152, 1255, 198], shape: 'chevron', title: 'Logística y distribución · E2', text: 'Proceso escrito con responsable: cada envío se registra con transportista, costo y fechas, y los traslados urgentes requieren autorización.' },
  { box: [276, 213, 467, 260], shape: 'chevron', title: 'Gestión de datos e indicadores · E1', text: 'Proceso nuevo: un responsable, una definición única de cada indicador y un control mensual de que la carga esté completa.' },
  { box: [473, 213, 664, 260], shape: 'chevron', title: 'Gestión administrativa y contable · E1', text: 'Las facturas de fletes se asignan a las sucursales según sus movimientos, y no según su facturación.' },
  { box: [670, 213, 861, 260], shape: 'chevron', title: 'Gestión de sistemas · Habilitador', text: 'Acceso a los datos del ERP y acuerdo de servicio formal con el proveedor.' },
  { box: [867, 213, 1058, 260], shape: 'chevron', title: 'Gestión de RRHH · Se mantiene', text: 'Suma la capacitación en el uso de los tableros y en el registro de los datos.' },
  { box: [1064, 213, 1255, 260], shape: 'chevron', title: 'Reportes armados a mano · Se elimina', text: 'La planilla de Administración se retira cuando los tableros coinciden con sus resultados.' },

  // Applications
  { box: [157, 318, 221, 413], title: 'Odoo 18 · Se mantiene', text: 'Sigue como núcleo transaccional: ventas, compras, inventario, contabilidad y e-commerce.' },
  { box: [228, 318, 292, 413], title: 'Registro logístico · E2', text: 'Cada envío con transportista, costo, fecha comprometida y fecha real, y cada embarque de importación con plan y real.' },
  { box: [299, 318, 363, 413], title: 'Reglas de reposición · E3', text: 'Niveles mínimos y máximos por sucursal y una distribución sugerida, que complementan al pronosticador de compras.' },
  { box: [390, 318, 455, 413], title: 'Plataforma de análisis · E1', text: 'Tableros por rol: facturación contra la meta, resultado y productividad por sucursal, rotación y costo logístico. Solo lee los datos del ERP.' },
  { box: [482, 318, 547, 413], title: 'Correo y Teams · Se mantiene', text: 'Con las mismas cuentas de Microsoft 365 se ingresa a los tableros, sin usuarios ni contraseñas aparte.' },
  { box: [553, 318, 617, 413], title: 'Planillas Excel · Se mantiene', text: 'Quedan solo las que todavía no están en un sistema, como metas, superficie y horas, y se integran al análisis.' },
  { box: [645, 318, 709, 413], title: 'Mercado Libre · Se mantiene', text: 'Canal de venta online integrado al ERP.' },
  { box: [715, 318, 780, 413], title: 'Instagram · Se mantiene', text: 'Promoción y comunicación de productos y marcas.' },
  { box: [786, 318, 851, 413], title: 'PlaceToPay · Se mantiene', text: 'Pasarela de pagos del sitio web.' },
  { box: [878, 318, 942, 413], title: 'PedidosYa · Se mantiene', text: 'Sigue para los traslados urgentes, pero cada uno queda registrado y con autorización.' },
  { box: [949, 318, 1013, 413], title: 'Moova · Se mantiene', text: 'Desde la etapa 3, el estado de los envíos vuelve al ERP por la misma API que hoy manda las órdenes.' },
  { box: [1020, 318, 1084, 413], title: 'DAC · Se mantiene', text: 'Desde la etapa 3, el estado de los envíos vuelve al ERP por la misma API que hoy manda las órdenes.' },
  { box: [1090, 318, 1155, 413], title: 'dePunta · Se mantiene', text: 'Desde la etapa 3, el estado de los envíos vuelve al ERP por la misma API que hoy manda las órdenes.' },
  { box: [1182, 318, 1246, 413], title: 'WhatsApp · Se mantiene', text: 'Queda solo como canal de comunicación: la coordinación de importaciones se registra en el ERP.' },

  // Data
  { box: [149, 445, 427, 547], title: 'Base del ERP (PostgreSQL)', text: 'Sigue siendo la fuente única. Los fletes se asignan a las sucursales (E1) y se suman los envíos y los embarques (E2).' },
  { box: [438, 445, 654, 547], title: 'Capa analítica · E1', text: 'Copia de solo lectura del ERP con los indicadores por sucursal, canal, producto y fecha. Se actualiza al menos una vez por día.' },
  { box: [666, 445, 851, 547], title: 'Planillas integradas · Se mantiene', text: 'Metas, superficie y horas entran al análisis como fuente transitoria, mientras no estén en el ERP.' },
  { box: [862, 445, 1068, 547], title: 'Calidad de datos · Habilitador', text: 'Definición única de cada indicador, un responsable y controles mensuales de que la carga esté completa.' },
  { box: [1079, 445, 1254, 547], title: 'Sin registro · Se elimina', text: 'Los envíos y las importaciones dejan de quedar fuera del sistema: pasan a registrarse en el ERP.' },

  // Technology
  { box: [157, 598, 233, 687], title: 'Montevideo COMM · Se mantiene', text: 'Sigue alojando el ERP y su base de datos en su data center.' },
  { box: [239, 598, 316, 687], title: 'Plataforma de análisis · E1', text: 'Se aloja junto al ERP en el mismo data center, sin exponer la base de datos a internet.' },
  { box: [343, 598, 419, 687], title: 'OpenTech · Se mantiene', text: 'Sigue gestionando la red y la infraestructura de las tiendas.' },
  { box: [426, 598, 502, 687], title: 'ANTEL · Se mantiene', text: 'Conectividad de las tiendas, por cable y Wi-Fi.' },
  { box: [508, 598, 584, 687], title: 'MikroTik · Se mantiene', text: 'Routers de las tiendas, gestionados por OpenTech.' },
  { box: [612, 598, 688, 687], title: 'Microsoft 365 · Se mantiene', text: 'Suma el ingreso a los tableros con las cuentas de la organización.' },
  { box: [715, 598, 792, 687], title: 'API con couriers · E3', text: 'Recibir el estado de los envíos por la API que ya existe con Moova, DAC y dePunta.' },
  { box: [819, 598, 895, 687], title: 'Respaldo · Habilitador', text: 'Recuperación de la información del ERP ante fallas, con frecuencia y tiempos acordados con el proveedor.' },
  { box: [902, 598, 978, 687], title: 'Soporte con acuerdo · Habilitador', text: 'Acuerdo de servicio formal con tiempos de respuesta y de resolución.' },
  { box: [1005, 598, 1081, 687], title: 'PC de caja · Se mantiene', text: 'Los encargados consultan los tableros de su sucursal desde el navegador.' },
  { box: [1088, 598, 1164, 687], title: 'Notebooks · Se mantiene', text: 'Gerencia y Administración acceden a toda la información desde el navegador.' },
  { box: [1170, 598, 1246, 687], title: 'Celulares · Se mantiene', text: 'Los tableros también se pueden consultar desde el celular.' },
];
