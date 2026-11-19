import { hasSession, privateResponse } from '../../server/iber-auth.js';
import { iberSections, renderSectionNavigation } from '../../server/iber-sections.js';

export async function onRequest({ request, env }) {
  // Also check here so the page is protected independently of middleware routing.
  if (!await hasSession(request, env)) {
    return privateResponse(null, { status: 302, headers: { Location: '/iber/login' } });
  }
  return privateResponse(`<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="stylesheet" href="/typography.css" />
    <link rel="stylesheet" href="/iber.css" />
    <link rel="stylesheet" href="/page-theme.css" />
    <script src="/iber-dashboard.js" defer></script>
    <script src="/iber-processes.js" defer></script>
    <title>IBER | NextStep</title>
  </head>
  <body class="styled-page">
    <header><nav aria-label="Navegación de IBER">
      <div class="dashboard-brand">
        <button id="menu-toggle" type="button" aria-controls="dashboard-menu" aria-expanded="true" disabled><span class="menu-icon" aria-hidden="true"></span><span id="menu-label">Menú</span></button>
        <a href="/">NextStep <span class="brand-divider">/ IBER</span></a>
      </div>
      <form method="POST" action="/iber/logout"><button type="submit">Cerrar sesión</button></form>
    </nav></header>
    <main class="iber-dashboard" id="dashboard">
      <aside id="dashboard-menu" class="dashboard-menu" aria-label="Secciones del dashboard">
        <div class="dashboard-menu-inner">
          <p class="menu-intro">Todo tu proyecto,<br />en un solo lugar.</p>
          <nav aria-label="Secciones">
            ${iberSections.map((section) => `<a href="#${section.id}" data-section="${section.id}">${section.title} <span aria-hidden="true">↗</span></a>`).join('')}
          </nav>
          <a class="back" href="/">Volver a página principal</a>
        </div>
      </aside>
      <div class="dashboard-content">
        ${iberSections.map((section, index) => section.render(renderSectionNavigation(index))).join('')}
      </div>
    </main>
  </body>
</html>`, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
