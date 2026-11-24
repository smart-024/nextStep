import { hasSession, privateResponse } from '../../server/iber-auth.js';
import { iberSections, renderSectionNavigation } from '../../server/iber-sections.js';

export async function onRequest({ request, env }) {
  // Each deploy gets a new version, so browsers never reuse old CSS or JS from their cache.
  const version = encodeURIComponent((env.CF_PAGES_COMMIT_SHA || 'local').slice(0, 12));
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
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
    <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png?v=2" />
    <link rel="icon" href="/favicon.ico?v=2" sizes="16x16 32x32 48x48" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="stylesheet" href="/typography.css?v=${version}" />
    <link rel="stylesheet" href="/iber.css?v=${version}" />
    <link rel="stylesheet" href="/page-theme.css?v=${version}" />
    <script src="/iber-dashboard.js?v=${version}" defer></script>
    <script src="/iber-processes.js?v=${version}" defer></script>
    <script src="/iber-architecture-map.js?v=${version}" defer></script>
    <script src="/iber-scenarios.js?v=${version}" defer></script>
    <script src="/iber-criteria.js?v=${version}" defer></script>
<<<<<<< HEAD
    <script src="/iber-story-grid.js?v=${version}" defer></script>
=======
>>>>>>> 76e37727f83e7c9026517148c31c9bcbaf3f2f8f
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
