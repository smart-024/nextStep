import test from 'node:test';
import assert from 'node:assert/strict';
import { createSession, hasSession, sessionCookie, SESSION_SECONDS } from '../server/iber-auth.js';
import { onRequest as login } from '../functions/iber/auth.js';
import { onRequest as logout } from '../functions/iber/logout.js';
import { onRequest as middleware } from '../functions/_middleware.js';
import { onRequest as privatePage } from '../functions/iber/index.js';

// Synthetic credentials only; real credentials are supplied through Cloudflare secrets.
const env = { IBER_USERNAME: 'test-user', IBER_PASSWORD: 'synthetic-test-password', IBER_SESSION_SECRET: 'synthetic-session-key-for-tests-only-123456' };
const origin = 'https://nextstep.test';
function request(path, options = {}) { return new Request(`${origin}${path}`, options); }
function loginRequest(username = env.IBER_USERNAME, password = env.IBER_PASSWORD, extra = {}) {
  return request('/iber/auth', {
    method: 'POST', headers: { Origin: origin, ...extra }, body: new URLSearchParams({ username, password }),
  });
}
function context(req, bindings = env) {
  return { request: req, env: bindings, next: () => new Response('Public page') };
}

test('login issues a secure cookie which grants access to the server-rendered page', async () => {
  const response = await login(context(loginRequest()));
  assert.equal(response.status, 200);
  const cookie = response.headers.get('Set-Cookie');
  for (const attribute of ['HttpOnly', 'Secure', 'SameSite=Strict', 'Path=/iber', 'Max-Age=3600']) assert.ok(cookie.includes(attribute));
  const authenticated = request('/iber/', { headers: { Cookie: cookie.split(';')[0] } });
  const page = await privatePage(context(authenticated));
  assert.equal(page.status, 200);
  assert.ok((await page.text()).includes('Cerrar sesión'));
  assert.equal(page.headers.get('Cache-Control'), 'no-store');
});

test('wrong credentials never issue a session or disclose which field was wrong', async () => {
  for (const [username, password] of [['unknown-user', env.IBER_PASSWORD], [env.IBER_USERNAME, 'wrong-password']]) {
    const response = await login(context(loginRequest(username, password)));
    assert.equal(response.status, 401);
    assert.equal(response.headers.get('Set-Cookie'), null);
    assert.equal((await response.json()).error, 'Usuario o contraseña incorrectos.');
  }
});

test('authentication fails closed when secrets are missing', async () => {
  assert.equal((await login(context(loginRequest(), {}))).status, 503);
  assert.equal((await middleware(context(request('/iber'), {}))).status, 503);
});

test('private pages and nested resources require authentication, while login and public pages remain accessible', async () => {
  for (const path of ['/iber', '/iber/', '/iber/reporte.pdf', '/iber/index.html']) {
    const response = await middleware(context(request(path)));
    assert.equal(response.status, 302);
    assert.equal(response.headers.get('Location'), '/iber/login');
  }
  for (const path of ['/', '/contacto', '/iber/login']) {
    const response = await middleware(context(request(path)));
    assert.equal(response.status, 200);
    assert.equal(await response.text(), 'Public page');
  }
  assert.equal((await privatePage(context(request('/iber/')))).status, 302);
});

test('expired, malformed, forged and differently signed cookies are rejected', async () => {
  const now = Date.now();
  const valid = await createSession(env, now);
  const auth = (token, time = now) => hasSession(request('/iber/', { headers: { Cookie: sessionCookie(token) } }), env, time);
  assert.equal(await auth(valid), true);
  assert.equal(await auth(valid, now + SESSION_SECONDS * 1000), false);
  assert.equal(await auth('invalid'), false);
  assert.equal(await auth(`${valid}.extra`), false);
  const [payload, signature] = valid.split('.');
  const forged = (signature[0] === 'A' ? 'B' : 'A') + signature.slice(1);
  assert.equal(await auth(`${payload}.${forged}`), false);
  const other = await createSession({ ...env, IBER_SESSION_SECRET: 'another-secret-at-least-32-characters-long' }, now);
  assert.equal(await auth(other), false);
});

test('cross-origin login and logout are rejected', async () => {
  assert.equal((await login(context(loginRequest(env.IBER_USERNAME, env.IBER_PASSWORD, { Origin: 'https://elsewhere.test' })))).status, 403);
  assert.equal(logout(context(request('/iber/logout', { method: 'POST', headers: { Origin: 'https://elsewhere.test' } }))).status, 403);
});

test('logout clears the browser session and redirects to login', () => {
  const response = logout(context(request('/iber/logout', { method: 'POST', headers: { Origin: origin } })));
  assert.equal(response.status, 303);
  assert.equal(response.headers.get('Location'), '/iber/login');
  assert.ok(response.headers.get('Set-Cookie').includes('Max-Age=0'));
});

test('login rejects oversized request bodies and unsupported request methods', async () => {
  assert.equal((await login(context(loginRequest('x'.repeat(9000), 'password')))).status, 413);
  assert.equal((await login(context(request('/iber/auth')))).status, 405);
  assert.equal(logout(context(request('/iber/logout'))).status, 405);
});
