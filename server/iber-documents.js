import files from '../.astro/iber-documents.js';
import { iberDocuments } from './iber-document-manifest.js';
export { iberDocuments };

export function getDocument(name) {
  if (!Object.values(iberDocuments).some((document) => document.name === name)) return null;
  return files[name] ?? null;
}

export function renderSectionDownload(sectionId) {
  const document = iberDocuments[sectionId];
  if (!document) return '';
  return `<a class="section-download" href="/iber/documentos/${document.name}" download="${document.filename}" aria-label="Descargar ${document.label} (PDF)" title="Descargar ${document.label} (PDF)">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></svg>
    <span class="download-label" aria-hidden="true">Descargar PDF</span>
  </a>`;
}
