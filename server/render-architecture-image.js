const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

const percent = (value) => `${Number(value.toFixed(3))}%`;

// Each zone stores its position over the image, in percentages so it scales with it.
function renderHotspot(hotspot, index, id, image) {
  const [bodyLeft, bodyTop, bodyRight, bodyBottom] = hotspot.box;
  const [left, top, right, bottom] = hotspot.badgeBox ? [
    Math.min(bodyLeft, hotspot.badgeBox[0]), Math.min(bodyTop, hotspot.badgeBox[1]),
    Math.max(bodyRight, hotspot.badgeBox[2]), Math.max(bodyBottom, hotspot.badgeBox[3]),
  ] : hotspot.box;
  const x = (left / image.width) * 100;
  const y = (top / image.height) * 100;
  const w = ((right - left) / image.width) * 100;
  const h = ((bottom - top) / image.height) * 100;
  const style = [
    `--x:${percent(x)}`, `--y:${percent(y)}`, `--w:${percent(w)}`, `--h:${percent(h)}`,
  ].join(';');
  const descriptionId = `${id}-zona-${index + 1}`;
  let highlight = '';
  if (hotspot.badgeBox) {
    const width = right - left;
    const height = bottom - top;
    const x = bodyLeft - left;
    const y = bodyTop - top;
    const w = bodyRight - bodyLeft;
    const h = bodyBottom - bodyTop;
    const [badgeLeft, badgeTop, badgeRight, badgeBottom] = hotspot.badgeBox;
    const body = hotspot.shape === 'chevron'
      ? `<polygon points="${x},${y} ${x + w * 0.927},${y} ${x + w},${y + h / 2} ${x + w * 0.927},${y + h} ${x},${y + h} ${x + w * 0.073},${y + h / 2}"/>`
      : `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>`;
    // A single clipped surface covers the union, avoiding darker overlaps at the badge.
    highlight = `<svg class="hotspot-highlight" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs><clipPath id="${descriptionId}-contorno">${body}<rect x="${badgeLeft - left}" y="${badgeTop - top}" width="${badgeRight - badgeLeft}" height="${badgeBottom - badgeTop}" rx="${(badgeBottom - badgeTop) / 2}"/></clipPath></defs>
      <rect width="${width}" height="${height}" clip-path="url(#${descriptionId}-contorno)"/>
    </svg>`;
  }
  return `<button class="architecture-hotspot${hotspot.badgeBox ? ' architecture-hotspot-badged' : hotspot.shape ? ` architecture-hotspot-${hotspot.shape}` : ''}" type="button" style="${style}" aria-describedby="${descriptionId}">
      ${highlight}
      <span class="visually-hidden" data-hotspot-title>${escapeHtml(hotspot.title)}</span>
      <span class="visually-hidden" id="${descriptionId}" data-hotspot-text>${escapeHtml(hotspot.text)}</span>
    </button>`;
}

// legend and note are trusted HTML written in each view; they replace the title, legend and footer cropped out of the image.
export function renderArchitectureImage({ id, title, description, caption, image, hotspots, legend = '', note = '', navigation = '', afterDiagram = '' }) {
  return `
    <section id="${id}" class="dashboard-section architecture" aria-labelledby="${id}-titulo">
      <h2 id="${id}-titulo" tabindex="-1">${escapeHtml(title)}</h2>
      <p class="section-description">${(Array.isArray(description) ? description : [description]).map(escapeHtml).join('<br />')}</p>
      <figure class="architecture-image" aria-labelledby="${id}-caption">
        <figcaption id="${id}-caption">${escapeHtml(caption)}</figcaption>
        ${legend}
        <p class="architecture-image-hint">Pasá el cursor o tocá un recuadro para ver qué representa.</p>
        <div class="architecture-map-frame" data-architecture-map>
          <div class="architecture-map-scroll">
            <div class="architecture-map">
              <img src="${image.src}" width="${image.width}" height="${image.height}" alt="${escapeHtml(image.alt)}" decoding="async" />
              ${hotspots.map((hotspot, index) => renderHotspot(hotspot, index, id, image)).join('')}
            </div>
          </div>
          <div class="architecture-map-tip" aria-hidden="true" hidden><strong></strong><p></p></div>
        </div>
        ${note ? `<p class="architecture-image-note">${escapeHtml(note)}</p>` : ''}
      </figure>
      ${afterDiagram}
      ${navigation}
    </section>`;
}
