import { hasSession, privateResponse } from '../../server/iber-auth.js';

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
    <title>IBER | NextStep</title>
  </head>
  <body>
    <header><nav aria-label="Navegación de IBER"><a href="/">NextStep</a><form method="POST" action="/iber/logout"><button type="submit">Cerrar sesión</button></form></nav></header>
    <main>
      <p class="eyebrow">Espacio privado</p>
      <h1>IBER</h1>
      <p class="intro">Bienvenido al espacio privado de NextStep.</p>
      <section aria-labelledby="contenido-titulo" class="panel">
        <h2 id="contenido-titulo">Tu próximo espacio de trabajo.</h2>
        <p>Acá vamos a incorporar los contenidos de IBER.</p>
      </section>
      <a class="back" href="/">Volver a página principal</a>
    </main>
  </body>
</html>`, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
