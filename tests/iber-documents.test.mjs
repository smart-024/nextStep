import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createSession, sessionCookie, SESSION_SECONDS } from '../server/iber-auth.js';
import { onRequest } from '../functions/iber/documentos/[name].js';
import { onRequest as privatePage } from '../functions/iber/index.js';
import { documentTypes, iberDocumentList, iberDocuments } from '../server/iber-document-manifest.js';
import { iberSections } from '../server/iber-sections.js';

// Registered documents whose file is not in private-documents/ yet are hidden, not served.
const present = (document) => existsSync(new URL(`../private-documents/${document.filename}`, import.meta.url));
const availableDocuments = iberDocumentList.filter(present);
const missingDocuments = iberDocumentList.filter((document) => !present(document));

const env = { IBER_USERNAME: 'test-user', IBER_PASSWORD: 'synthetic-test-password', IBER_SESSION_SECRET: 'synthetic-session-key-for-tests-only-123456' };
function context(cookie, name = 'caso-de-negocio.pdf', method = 'GET') {
  return { env, params: { name }, request: new Request(`https://nextstep.test/iber/documentos/${name}`, {
    method, headers: cookie ? { Cookie: cookie } : {},
  }) };
}

test('documents reject missing, forged and expired sessions independently of middleware', async () => {
  const expired = sessionCookie(await createSession(env, Date.now() - SESSION_SECONDS * 1000 - 1000));
  for (const document of availableDocuments) {
    for (const cookie of [undefined, sessionCookie('forged'), expired]) {
      const response = await onRequest(context(cookie, document.name));
      assert.equal(response.status, 401);
      assert.equal((await response.arrayBuffer()).byteLength, 0);
      assert.equal(response.headers.get('Cache-Control'), 'no-store');
    }
  }
});

test('authenticated downloads preserve the exact file and force a private attachment', async () => {
  const cookie = sessionCookie(await createSession(env));
  for (const document of availableDocuments) {
    const response = await onRequest(context(cookie, document.name));
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('Content-Type'), documentTypes[document.type].contentType);
    assert.ok(response.headers.get('Content-Disposition').startsWith('attachment;'));
    assert.ok(response.headers.get('Content-Disposition').endsWith(`filename*=UTF-8''${encodeURIComponent(document.filename)}`));
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), await readFile(new URL(`../private-documents/${document.filename}`, import.meta.url)));
    const head = await onRequest(context(cookie, document.name, 'HEAD'));
    assert.equal(head.status, 200);
    assert.equal((await head.arrayBuffer()).byteLength, 0);
  }
  for (const name of ['unknown.pdf', 'toString', '../iber-auth.js', ...missingDocuments.map((document) => document.name)]) {
    assert.equal((await onRequest(context(cookie, name))).status, 404);
  }
  assert.equal((await onRequest(context(cookie, 'caso-de-negocio.pdf', 'POST'))).status, 405);
});

test('every section offers its registered documents, with a menu when it has several', async () => {
  const cookie = sessionCookie(await createSession(env));
  const response = await privatePage(context(cookie));
  const html = await response.text();
  const sectionDocuments = (id) => (iberDocuments[id] ?? []).filter(present);
  const sectionsWithDocuments = iberSections.filter((section) => sectionDocuments(section.id).length);
  assert.equal((html.match(/class="section-download[" ]/g) || []).length, sectionsWithDocuments.length);
  iberSections.forEach((section, index) => {
    const start = html.indexOf(`<section id="${section.id}"`);
    const end = iberSections[index + 1] ? html.indexOf(`<section id="${iberSections[index + 1].id}"`) : html.length;
    const markup = html.slice(start, end);
    const documents = sectionDocuments(section.id);
    for (const document of documents) assert.ok(markup.includes(`/iber/documentos/${document.name}`), section.id);
    for (const document of missingDocuments) assert.ok(!markup.includes(`/iber/documentos/${document.name}`), section.id);
    assert.equal(markup.includes('data-download-menu'), documents.length > 1, section.id);
    if (!documents.length) assert.ok(!markup.includes('class="section-download'), section.id);
  });
  assert.ok(!html.includes('JVBERi0')); // PDF bytes belong only in the authenticated file response.
});
