import { privateResponse, sameOrigin, sessionCookie } from '../../server/iber-auth.js';

export function onRequest({ request }) {
  if (request.method !== 'POST') return privateResponse('Método no permitido.', { status: 405, headers: { Allow: 'POST' } });
  if (!sameOrigin(request)) return privateResponse('Solicitud no permitida.', { status: 403 });
  return privateResponse(null, {
    status: 303,
    headers: { Location: '/iber/login', 'Set-Cookie': sessionCookie('', 0) },
  });
}
