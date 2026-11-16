import { hasSession, isConfigured, privateResponse } from '../server/iber-auth.js';

export async function onRequest(context) {
  const path = new URL(context.request.url).pathname;
  if (path !== '/iber' && !path.startsWith('/iber/')) return context.next();

  const loginPaths = ['/iber/login', '/iber/login/', '/iber/login.html', '/iber/login/index.html'];
  const publicPaths = [...loginPaths, '/iber/auth', '/iber/logout'];
  if (!publicPaths.includes(path)) {
    if (!isConfigured(context.env)) {
      return privateResponse('Acceso temporalmente no disponible.', { status: 503 });
    }
    if (!await hasSession(context.request, context.env)) {
      return privateResponse(null, { status: 302, headers: { Location: '/iber/login' } });
    }
  }

  if (loginPaths.includes(path) && await hasSession(context.request, context.env)) {
    return privateResponse(null, { status: 302, headers: { Location: '/iber/' } });
  }
  const upstream = await context.next();
  const response = new Response(upstream.body, upstream);
  response.headers.set('Cache-Control', 'no-store');
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'same-origin');
  return response;
}
