import { hasSession, privateResponse } from '../../../server/iber-auth.js';
import { getDocument, iberDocuments } from '../../../server/iber-documents.js';

export async function onRequest({ request, env, params }) {
  if (!await hasSession(request, env)) return privateResponse(null, { status: 401 });
  if (!['GET', 'HEAD'].includes(request.method)) {
    return privateResponse(null, { status: 405, headers: { Allow: 'GET, HEAD' } });
  }
  const data = getDocument(params.name);
  if (!data) return privateResponse(null, { status: 404 });
  const document = Object.values(iberDocuments).find((item) => item.name === params.name);
  const asciiFilename = document.filename.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const bytes = Uint8Array.from(atob(data), (character) => character.charCodeAt(0));
  return privateResponse(request.method === 'HEAD' ? null : bytes, { headers: {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="${asciiFilename}"; filename*=UTF-8''${encodeURIComponent(document.filename)}`,
    'Content-Length': String(bytes.byteLength),
  } });
}
