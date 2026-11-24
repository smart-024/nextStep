import { hasSession, privateResponse } from '../../../server/iber-auth.js';
import arquitecturaActual from '../../../server/images/arquitectura-actual.js';
import arquitecturaDestino from '../../../server/images/arquitectura-destino.js';

// Private images: only served with a valid session, never from public/.
const images = {
  'arquitectura-actual.png': { data: arquitecturaActual, type: 'image/png' },
  'arquitectura-destino.png': { data: arquitecturaDestino, type: 'image/png' },
};

const decode = (base64) => Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
const cache = new Map();

export async function onRequest({ request, params, env }) {
  if (!await hasSession(request, env)) return privateResponse(null, { status: 401 });
  const image = images[params.name];
  if (!image) return privateResponse(null, { status: 404 });
  if (!cache.has(params.name)) cache.set(params.name, decode(image.data));
  return privateResponse(cache.get(params.name), { headers: { 'Content-Type': image.type } });
}
