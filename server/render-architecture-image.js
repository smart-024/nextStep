const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

const percent = (value) => `${Number(value.toFixed(3))}%`;

// Each zone stores its position and the background crop that shows the same box enlarged on hover.
function renderHotspot(hotspot, index, id, image) {
  const [left, top, right, bottom] = hotspot.box;
  const x = (left / image.width) * 100;
  const y = (top / image.height) * 100;
  const w = ((right - left) / image.width) * 100;
  const h = ((bottom - top) / image.height) * 100;
  const style = [
    `--x:${percent(x)}`, `--y:${percent(y)}`, `--w:${percent(w)}`, `--h:${percent(h)}`,
    `--crop-size:${percent(10000 / w)} ${percent(10000 / h)}`,
    `--crop-position:${percent((x / (100 - w)) * 100)} ${percent((y / (100 - h)) * 100)}`,
  ].join(';');
  const descriptionId = `${id}-zona-${index + 1}`;
  return `<button class="architecture-hotspot${hotspot.shape ? ` architecture-hotspot-${hotspot.shape}` : ''}" type="button" style="${style}" aria-describedby="${descriptionId}">
      <span class="visually-hidden" data-hotspot-title>${escapeHtml(hotspot.title)}</span>
      <span class="visually-hidden" id="${descriptionId}" data-hotspot-text>${escapeHtml(hotspot.text)}</span>
    </button>`;
}

export function renderArchitectureImage({ id, title, description, caption, image, hotspots, navigation = '', afterDiagram = '' }) {
  return `
    <section id="${id}" class="dashboard-section architecture" aria-labelledby="${id}-titulo">
      <h2 id="${id}-titulo" tabindex="-1">${escapeHtml(title)}</h2>
      <p class="section-description">${(Array.isArray(description) ? description : [description]).map(escapeHtml).join('<br />')}</p>
      <figure class="architecture-image" aria-labelledby="${id}-caption">
        <figcaption id="${id}-caption">${escapeHtml(caption)}</figcaption>
        <p class="architecture-image-hint">Pasá el cursor o tocá un recuadro para ver qué representa.</p>
        <div class="architecture-map-frame" data-architecture-map>
          <div class="architecture-map-scroll">
            <div class="architecture-map" style="--map-image:url('${image.src}')">
              <img src="${image.src}" width="${image.width}" height="${image.height}" alt="${escapeHtml(image.alt)}" decoding="async" />
              ${hotspots.map((hotspot, index) => renderHotspot(hotspot, index, id, image)).join('')}
            </div>
          </div>
          <div class="architecture-map-tip" aria-hidden="true" hidden><strong></strong><p></p></div>
        </div>
      </figure>
      ${afterDiagram}
      ${navigation}
    </section>`;
}
