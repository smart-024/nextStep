// Server-only application details: Uso actual column from Aplicaciones en Uso.
export const currentApplicationGroups = [
  {
    "title": "ERP",
    "items": [
      {
        "title": "Odoo 18 - ERP y e-commerce",
        "description": [
          {
            "title": "ERP Odoo 18 Community",
            "text": "Ventas y punto de venta, compras, inventario y transferencias, contabilidad y e-commerce. Concentra la información de la operación."
          },
          {
            "title": "Pronosticador de compras (módulo del ERP)",
            "text": "Sugiere a diario las órdenes de compra según el stock y el histórico de ventas; no las envía solo."
          },
          {
            "title": "Contabilidad de Odoo",
            "text": "Gastos identificados por sucursal y facturas de fletes y couriers por transportista."
          },
          {
            "title": "E-commerce (módulo de Odoo)",
            "text": "Venta online. Al confirmar el pedido genera la etiqueta y el número de envío del courier."
          }
        ]
      }
    ]
  },
  {
    "title": "Microsoft 365",
    "items": [
      "Email",
      "Teams",
      {
        "title": "Planillas Excel",
        "outside": true
      }
    ]
  },
  {
    "title": "Canales y pagos",
    "items": [
      {
        "title": "Mercado Libre",
        "description": "Canal de venta online, a cargo de Marketing."
      },
      {
        "title": "Instagram",
        "description": "Promoción y comunicación."
      },
      {
        "title": "PlaceToPay",
        "description": "Pasarela de pagos del sitio web; redirige a cada banco o tarjeta."
      }
    ]
  },
  {
    "title": "Envíos",
    "items": [
      {
        "title": "PedidosYa",
        "description": "Traslados urgentes entre tiendas."
      },
      {
        "title": "Moova",
        "description": "Reparten los pedidos web: Moova en Montevideo (unos 200 envíos por mes), DAC y dePunta al interior. Reciben la orden por API y devuelven la etiqueta y el número de seguimiento; el estado de la entrega se carga a mano."
      },
      {
        "title": "DAC",
        "description": "Reparten los pedidos web: Moova en Montevideo (unos 200 envíos por mes), DAC y dePunta al interior. Reciben la orden por API y devuelven la etiqueta y el número de seguimiento; el estado de la entrega se carga a mano."
      },
      {
        "title": "dePunta",
        "description": "Reparten los pedidos web: Moova en Montevideo (unos 200 envíos por mes), DAC y dePunta al interior. Reciben la orden por API y devuelven la etiqueta y el número de seguimiento; el estado de la entrega se carga a mano."
      }
    ]
  },
  {
    "title": "Coordinación",
    "items": [
      {
        "title": "WhatsApp",
        "description": "Coordinación con los fleteros de importación y las bodegas, y entre tiendas.",
        "outside": true
      }
    ]
  }
];
