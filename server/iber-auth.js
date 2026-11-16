const COOKIE_NAME = '__Secure-nextstep_iber';
export const SESSION_SECONDS = 60 * 60;
const encoder = new TextEncoder();

export function isConfigured(env) {
  return typeof env.IBER_USERNAME === 'string' && env.IBER_USERNAME.length > 0
    && typeof env.IBER_PASSWORD === 'string' && env.IBER_PASSWORD.length >= 12
    && typeof env.IBER_SESSION_SECRET === 'string' && env.IBER_SESSION_SECRET.length >= 32;
}

function signingKey(env) {
  return crypto.subtle.importKey('raw', encoder.encode(env.IBER_SESSION_SECRET),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

function encode(bytes) {
  return btoa(String.fromCharCode(...bytes)).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}

function decode(value) {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) throw new Error('Invalid encoding');
  return Uint8Array.from(atob(value.replaceAll('-', '+').replaceAll('_', '/')), (char) => char.charCodeAt(0));
}

export async function credentialsMatch(username, password, env) {
  if (!isConfigured(env) || typeof username !== 'string' || typeof password !== 'string') return false;
  if (username.length > 256 || password.length > 1024) return false;
  const key = await signingKey(env);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(JSON.stringify([env.IBER_USERNAME, env.IBER_PASSWORD])));
  // Web Crypto verifies the fixed-length MAC rather than comparing secret strings.
  return crypto.subtle.verify('HMAC', key, signature, encoder.encode(JSON.stringify([username, password])));
}

export async function createSession(env, now = Date.now()) {
  if (!isConfigured(env)) throw new Error('IBER authentication is not configured');
  const payload = encode(encoder.encode(JSON.stringify({ v: 1, exp: Math.floor(now / 1000) + SESSION_SECONDS })));
  const signature = await crypto.subtle.sign('HMAC', await signingKey(env), encoder.encode(payload));
  return `${payload}.${encode(new Uint8Array(signature))}`;
}

export async function hasSession(request, env, now = Date.now()) {
  if (!isConfigured(env)) return false;
  const cookie = (request.headers.get('Cookie') ?? '').split(';').map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`));
  const token = cookie?.slice(COOKIE_NAME.length + 1);
  if (!token || token.length > 1024) return false;
  try {
    const [payload, signature, extra] = token.split('.');
    if (!payload || !signature || extra !== undefined) return false;
    if (!await crypto.subtle.verify('HMAC', await signingKey(env), decode(signature), encoder.encode(payload))) return false;
    const data = JSON.parse(new TextDecoder().decode(decode(payload)));
    const seconds = Math.floor(now / 1000);
    return data.v === 1 && Number.isInteger(data.exp) && data.exp > seconds && data.exp <= seconds + SESSION_SECONDS;
  } catch {
    return false;
  }
}

export function sessionCookie(token, maxAge = SESSION_SECONDS) {
  return `${COOKIE_NAME}=${token}; Path=/iber; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Strict`;
}

export function sameOrigin(request) {
  return request.headers.get('Origin') === new URL(request.url).origin;
}

export function privateResponse(body, init = {}) {
  const response = new Response(body, init);
  response.headers.set('Cache-Control', 'no-store');
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'same-origin');
  response.headers.set('X-Frame-Options', 'DENY');
  return response;
}

export function jsonResponse(data, status = 200, headers = {}) {
  return privateResponse(JSON.stringify(data), {
    status, headers: { ...headers, 'Content-Type': 'application/json; charset=utf-8' },
  });
}
