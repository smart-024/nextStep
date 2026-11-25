// Market survey and shortlist (templates 05, 06 and the final presentation). Content stays in authenticated HTML.
const solutions = [
  {
    id: 'power-bi', title: 'Power BI', logo: 'power-bi.svg', shortlisted: true, result: 'Preseleccionada',
    summary: 'Herramienta de análisis de Microsoft que funciona como servicio en la nube. Se integra con Microsoft 365 y Excel, que IBER ya usa, permite que cada encargado vea solo los datos de su sucursal y tiene acceso desde el celular. Para leer la base de Odoo necesita una puerta de enlace en el data center. Tiene el menor costo por usuario de las opciones comerciales y una red amplia de implementadores en Uruguay.',
  },
  {
    id: 'odoo', title: 'Análisis en Odoo', logo: 'odoo.svg', shortlisted: true, result: 'Preseleccionada',
    summary: 'Tableros construidos dentro del ERP que IBER ya usa. Trabajan con los datos de Odoo en tiempo real, sin conectores ni copias, y la información no sale del data center de Montevideo, en Uruguay. Los permisos por sucursal se resuelven con las reglas de acceso del propio ERP. En la edición Community no hay costo de licencias y los tableros los desarrolla a medida el implementador; la edición Enterprise suma tableros y hojas de cálculo listos para usar, pero obliga a licenciar a todos los usuarios del ERP. Las planillas de superficie, horas y metas se cargan en Odoo. Hay partners de Odoo en Uruguay.',
  },
  {
    id: 'metabase', title: 'Metabase', logo: 'metabase.svg', shortlisted: false, result: 'Evaluada; de reserva',
    summary: 'Herramienta de código abierto que se instala junto al ERP y se conecta directo a su base de datos. Queda como reserva porque suma otro servidor que operar, los permisos por sucursal requieren la edición paga y no se identificó un implementador en Uruguay.',
  },
  {
    id: 'tableau', title: 'Tableau', logo: 'tableau.svg', shortlisted: false, result: 'Evaluada; de reserva',
    summary: 'Cubre necesidades similares a Power BI y permite la instalación propia, pero su licencia para 27 usuarios cuesta cerca de un 37% más y no se identificó un implementador en Uruguay.',
  },
];

export function renderMarketShortlist() {
  return `<section class="business-block" aria-labelledby="mercado-preseleccion-titulo">
    <h3 id="mercado-preseleccion-titulo">Mercado relevado y preselección</h3>
    <div class="organization-copy"><p>Se analizaron herramientas comerciales, soluciones de código abierto y las capacidades de análisis del propio Odoo. Looker Studio y Apache Superset se descartaron antes de la evaluación: el primero obliga a exponer la base del ERP a internet y el segundo es complejo de operar sin un área de IT.</p></div>
    <div class="scenario-tabs market-cards" data-scenario-tabs>
      <div class="scenario-tab-list market-card-list" aria-labelledby="mercado-preseleccion-titulo">
        ${solutions.map((solution) => `<button id="market-tab-${solution.id}" class="scenario-tab market-card" type="button" aria-controls="market-panel-${solution.id}" disabled>
          <span class="market-logo market-logo-${solution.id}"><img src="/logos/${solution.logo}" alt="" width="150" height="80" loading="lazy" /></span>
          <span>${solution.title}</span>
        </button>`).join('')}
      </div>
      <div class="scenario-panel-shell">
        ${solutions.map((solution) => `<div id="market-panel-${solution.id}" class="scenario-panel market-detail" aria-labelledby="market-tab-${solution.id}">
          <h4>${solution.title}</h4>
          <span class="market-result${solution.shortlisted ? ' market-shortlisted' : ''}">${solution.result}</span>
          <p class="market-summary">${solution.summary}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`;
}
