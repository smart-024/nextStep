import files from '../.astro/iber-documents.js';
import { documentTypes, iberDocumentList, iberDocuments } from './iber-document-manifest.js';
export { documentTypes, iberDocumentList, iberDocuments };

// Only documents whose file was bundled at build time are offered or served.
const isAvailable = (document) => Boolean(files[document.name]);

export function findDocument(name) {
  return iberDocumentList.find((document) => document.name === name && isAvailable(document)) ?? null;
}

export function getDocument(name) {
  if (!findDocument(name)) return null;
  return files[name] ?? null;
}

const downloadIcon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></svg>';

export function renderSectionDownload(sectionId) {
  const documents = (iberDocuments[sectionId] ?? []).filter(isAvailable);
  if (!documents.length) return '';
  if (documents.length === 1) {
    const [document] = documents;
    const type = documentTypes[document.type].label;
    return `<a class="section-download" href="/iber/documentos/${document.name}" download="${document.filename}" aria-label="Descargar ${document.label} (${type})" title="Descargar ${document.label} (${type})">
    ${downloadIcon}
    <span class="download-label" aria-hidden="true">Descargar ${type}</span>
  </a>`;
  }
  // Several documents: one round button that reveals a menu on hover, focus or tap.
  return `<div class="section-download section-download-menu" data-download-menu>
    <button class="section-download-toggle" type="button" aria-expanded="false" aria-controls="descargas-${sectionId}" aria-label="Descargar documentos de esta sección">${downloadIcon}</button>
    <div id="descargas-${sectionId}" class="download-options">
      <p class="download-options-title">Elegí qué documento descargar</p>
      <ul>${documents.map((document) => `<li><a href="/iber/documentos/${document.name}" download="${document.filename}"><span>${document.label}</span><span class="download-options-type">${documentTypes[document.type].label}</span></a></li>`).join('')}</ul>
    </div>
  </div>`;
}
