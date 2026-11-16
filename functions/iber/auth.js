import { createSession, credentialsMatch, isConfigured, jsonResponse, sameOrigin, sessionCookie } from '../../server/iber-auth.js';

export async function onRequest({ request, env }) {
  if (request.method !== 'POST') return jsonResponse({ error: 'Método no permitido.' }, 405, { Allow: 'POST' });
  if (!sameOrigin(request)) return jsonResponse({ error: 'Solicitud no permitida.' }, 403);
  if (!isConfigured(env)) return jsonResponse({ error: 'Acceso temporalmente no disponible.' }, 503);
  if (request.headers.get('Content-Type')?.split(';')[0] !== 'application/x-www-form-urlencoded') {
    return jsonResponse({ error: 'Formato de solicitud no permitido.' }, 415);
  }
  // Bound the request before parsing it, including requests without Content-Length.
  if (Number(request.headers.get('Content-Length')) > 8192) return jsonResponse({ error: 'Solicitud demasiado grande.' }, 413);
  const reader = request.body?.getReader();
  if (!reader) return jsonResponse({ error: 'Completá usuario y contraseña.' }, 400);
  const chunks = [];
  let length = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > 8192) {
      await reader.cancel();
      return jsonResponse({ error: 'Solicitud demasiado grande.' }, 413);
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  const form = new URLSearchParams(new TextDecoder().decode(bytes));
  if (!await credentialsMatch(form.get('username'), form.get('password'), env)) {
    return jsonResponse({ error: 'Usuario o contraseña incorrectos.' }, 401);
  }
  return jsonResponse({ ok: true }, 200, { 'Set-Cookie': sessionCookie(await createSession(env)) });
}
