// The supplied evaluation results stay in authenticated HTML.
const solutions = [
  { id: 'power-bi', title: 'Power BI', logo: 'power-bi.svg', shortlisted: true, result: 'Preseleccionada', summary: 'Integración con Microsoft 365 y Excel; red amplia de implementadores.' },
  { id: 'metabase', title: 'Metabase', logo: 'metabase.svg', shortlisted: true, result: 'Preseleccionada', summary: 'Conexión con PostgreSQL y posibilidad de instalación junto al ERP.' },
  { id: 'tableau', title: 'Tableau', logo: 'tableau.svg', shortlisted: false, result: 'Evaluada; no preseleccionada', summary: 'Mayor costo y no se identificó implementador en Uruguay.' },
  { id: 'odoo', title: 'Análisis en Odoo', logo: 'odoo.svg', shortlisted: false, result: 'Evaluado; no preseleccionado', summary: 'la versión Community no cubre las necesidades de tableros y la versión Enterprise implica licenciar todo el ERP.' },
];

export function renderMarketShortlist() {
  return `<section class="business-block" aria-labelledby="mercado-preseleccion-titulo">
    <h3 id="mercado-preseleccion-titulo">Mercado relevado y preselección</h3>
    <div class="organization-copy"><p>Se analizaron herramientas comerciales, soluciones de código abierto y las capacidades de análisis disponibles dentro de Odoo.</p></div>
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
