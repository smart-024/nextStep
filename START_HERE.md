# START HERE — NextStep website

> Project context for contributors and AI coding assistants (including Codex in VS Code).
> Last updated: 2026-11-17. Inspect the repository to confirm the current implementation before editing.

## 1. Project overview

**NextStep — Consultoría en Tecnología** is a fictional technology consulting firm created for a college assignment. The website is a Spanish-language, content-focused corporate presentation inspired by the visual approach of Accenture: strong typography, spacious layouts, polished transitions, and a professional feel. It is **not** intended to copy Accenture's branding or content.

The site is essentially a single-page presentation. It does not require accounts, a database, a backend API, or a CMS.

- Primary domain: `https://laconsultoranextstep.com.ar`
- Another existing project uses `juiceshop.laconsultoranextstep.com.ar`; **do not change its DNS or deployment**.
- Hosting: Cloudflare Pages, connected to GitHub for automatic deployment from `main`.
- Development environment: VS Code.

## 2. Technology decisions

- **Astro** for static-site generation and reusable `.astro` components.
- **TypeScript** supported by Astro; use it pragmatically for scripts and structured data.
- **Tailwind CSS v4**, integrated using `@tailwindcss/vite`.
- **Plain CSS** for custom animations and global styling.
- **Minimal client-side JavaScript** only when necessary (for example, the mobile navigation menu).
- **Git + GitHub** for version control and **Cloudflare Pages** for deployment.

Avoid adding React, Next.js, databases, authentication, server-side rendering, large animation libraries, or other dependencies unless the task genuinely requires them and the user approves.

## 3. Brand identity

Brand: **NextStep**
Descriptor: **Consultoría en Tecnología**
Language: **Spanish (`lang="es"`)**, using Argentine-friendly copy where appropriate (e.g. “Explorá”, “Descubrí”).

Official palette:

| Token | Hex | Intended use |
| --- | --- | --- |
| `brand-primary` | `#6B2737` | Burgundy; primary background and text |
| `brand-cream` | `#EEE0CB` | Light background and light text |
| `brand-taupe` | `#BAA898` | Secondary surfaces |
| `brand-gray` | `#848586` | Neutral accents |
| `brand-rose` | `#C2847A` | Accent, buttons, highlights |
| `brand-accent` | `#E16036` | Burnt-orange heading highlights and homepage gradients |

The source logo is `public/logo_next_step.svg`. Preserve the logo and palette unless explicitly asked to change them. Ensure sufficient contrast when using the logo against dark or light backgrounds.

Tailwind v4 design tokens are defined in `src/styles/global.css` using `@theme`, making classes such as `bg-brand-primary` and `text-brand-rose` available.

### Typography

- **Fraunces**: main headings (`h1`, `h2`), smaller headings, and form legends, all in regular weight.
- **Saans**: body copy and form inputs.
- **ABC Diatype**: navigation, labels, buttons, and uppercase category text.
- Shared font definitions and typography rules live in `public/typography.css`, linked by all Astro pages and the server-rendered IBER page. Font files live in `public/fonts/`; only the selected static faces are loaded with `font-display: swap`.
- The supplied Saans and Diatype filenames are marked `Trial`; confirm the applicable web-use rights before publishing those assets. Replace the font sources with licensed webfont files when available.

## 4. Current website structure

Expected relevant files:

```text
public/
  logo_next_step.svg
src/
  components/
    Navbar.astro
    Hero.astro
  pages/
    index.astro
  styles/
    global.css
astro.config.mjs
package.json
package-lock.json
tsconfig.json
README.md
```

The actual repository is the source of truth. Do not assume a file exists solely because it appears here.

### Homepage sections

1. **Navigation** — `Navbar.astro`: sticky burgundy header, desktop links, mobile dropdown, and IBER access.
2. **Hero** — `Hero.astro`: “Adelantarse al futuro.”, supporting copy, and a rounded CTA with a background-color fade.
3. **Nosotros** — `About.astro`: centered heading and three values. The former introductory paragraphs and photo panel have been removed.
4. **Servicios** — `Services.astro`: three rounded, borderless cards with hover/tap details. Their controls remain available to screen readers without visible footer labels.
5. **Contacto** — closing invitation linking to the contact form at `/contacto`.
6. **Footer** — NextStep and copyright.

The grainy gradient design is now the homepage at `/`. Its styles are in `src/styles/home.css`, scoped to `body.homepage`, with SVG noise at `public/textures/grain.svg`. The former `/gradient` preview route and comparison link have been removed. Keep the current regular-weight typography and reduced-motion support. Private `/iber` remains served through authenticated Cloudflare Functions.

Current section anchor IDs: `inicio`, `nosotros`, `servicios`, `contacto`. Preserve them when modifying navigation or section markup.

The hero uses a grid layout with its minimum height calculated from `--home-visible-height` minus `--home-nav-height`. `HomeLoader.astro` measures `visualViewport.height` (falling back to `innerHeight`) and the closed navigation height including its border. It waits for fonts, page load and stable viewport measurements before revealing the hero. Avoid reverting to `100svh` or repeated scroll resets: iOS third-party browser viewport units can differ across reloads. While reading lower sections or pinch-zooming, viewport events must not resize the hero. The title typewriter and delayed supporting content remain paused under the loader.

The contact form, IBER login, and authenticated IBER page share `public/page-theme.css` for grainy gradients, rounded panels and controls, and translucent input borders. This stylesheet supports both Astro pages and the Cloudflare-rendered private page; authentication behavior remains in the existing Functions.

## 5. Design direction

The goal is a polished, modern consulting-company website with a presentation-like flow:

- Large, bold editorial typography and strong hierarchy.
- Burgundy, cream, taupe, gray, and rose throughout.
- Responsive layouts using Tailwind utilities and CSS Grid/Flexbox.
- Tasteful hover effects and scroll/entrance animations, not distracting motion.
- Mobile-friendly navigation and sensible section heights.
- Semantic HTML, accessible interactions, keyboard support, and reduced-motion support.
- Fast loading, optimized imagery, and minimal JavaScript.

Do not force full-screen scroll snapping; content must remain readable on small screens.

## 6. Local development

From the repository root:

```bash
npm install
npm run dev
```

Astro normally serves the local site at `http://localhost:4321/`.

Before proposing a deployment, verify the production build:

```bash
npm run build
```

Use the commands and package versions actually defined in `package.json` rather than assuming a specific version.

## 7. Deployment

The site is built as static files and deployed via **Cloudflare Pages** with GitHub integration.

Expected build settings:

- Production branch: `main`
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: repository root

Pushing to `main` triggers a new deployment if the Git integration is functioning. The public site is intended to be available at `https://laconsultoranextstep.com.ar`.

**DNS safety:** The root domain and the `juiceshop` subdomain are separate services. Never change DNS, domain delegation, or Juice Shop settings without explicit user approval.

## 8. Conventions for Codex and contributors

**No emojis:** Never use emojis in website copy, interface controls, placeholders, or future design changes. Use plain text or SVG icons when an icon is needed. This applies to the public website and every IBER view.

1. **Inspect before editing.** Read relevant source files and `package.json` first. Treat this document as project context, not a replacement for current code.
2. **Explain changes to the user.** The user is learning Astro, TypeScript, and Tailwind. Prefer clear, incremental changes and concise explanations of why they are needed.
3. **Keep changes scoped.** Modify only the files necessary for the requested feature. Preserve working sections and the existing design language.
4. **Prefer Astro components.** Extract reusable UI into `src/components/`; avoid adding client frameworks for simple UI.
5. **Use existing design tokens.** Do not introduce unrelated colors or fonts without a clear design reason.
6. **Maintain Spanish copy.** Keep wording consistent and appropriate for a fictional Argentine consulting firm.
7. **Preserve accessibility.** Use semantic tags, meaningful alt text, keyboard-operable menus, visible focus states, and `prefers-reduced-motion` where relevant.
8. **Check responsiveness.** Test or reason about mobile and desktop breakpoints.
9. **Avoid unnecessary dependencies.** Prefer Astro, Tailwind, and platform APIs already available.
10. **Validate work.** Run `npm run build` after code changes when possible; report errors rather than hiding them.
11. **Do not invent business facts.** Case studies, testimonials, client names, metrics, addresses, and contact details must be clearly fictional or explicitly provided by the user.
12. **Do not deploy or change infrastructure without approval.** Do not alter Cloudflare settings, DNS, or the unrelated Juice Shop project.

## 9. Next likely improvements (not yet implemented)

- Redesign the **Servicios** section into more editorial, visually distinctive panels.
- Improve **Nosotros** and **Contacto** to match the hero's visual quality.
- Add restrained scroll-reveal animations where useful.
- Polish mobile navigation, typography, contrast, and spacing.
- Consider extracting shared page layout and footer components as the site grows.

These are ideas, not instructions to implement all at once. Ask the user what to work on next.

## 10. Suggested first prompt to Codex

> Read `START_HERE.md`, then inspect the actual Astro project structure, `package.json`, `src/pages/index.astro`, `src/components/`, and `src/styles/global.css`. Summarize the current implementation and propose the next small improvement. Do not modify files yet.

## 11. Private IBER section

### Spacing conventions

All private IBER views share a compact spacing rhythm defined on `.dashboard-content` in `public/iber.css`. Reuse these variables when adding or editing a section:

| CSS variable | Value | Use |
| --- | --- | --- |
| `--iber-heading-gap` | `0.75rem` | Between a heading and its text or content |
| `--iber-paragraph-gap` | `1rem` | Between paragraphs and related text groups |
| `--iber-content-gap` | `1.25rem` | Between explanatory text and a chart, diagram, cards, or controls |
| `--iber-section-gap` | `2rem` | Between major subsections and before bottom navigation |
| `--iber-gutter` | `clamp(1.5rem, 4vw, 4rem)` | Vertical dashboard padding (`2rem` on mobile) |
| `--iber-container-width` | `80rem` | Shared maximum width for header and dashboard content |
| `--iber-inline-padding` | `1.5rem` (`1rem` on mobile) | Shared horizontal padding inside both containers |

- Use `.business-block` for major subsections. It prevents child margins from collapsing outside the block; avoid adding extra top or bottom margins that duplicate its section gap.
- Keep heading-to-text spacing consistent across Caso de Negocio, Arquitectura Actual, Arquitectura destino, and Escenarios de Solución. Use the same rhythm for story groups, diagram legends, diagnosis findings, and comparison charts.
- Keep text widths and line spacing separate from vertical gaps: prose uses `min(75%, 80ch)` on desktop, full width below 64rem, and a line height of `1.75`.
- Bottom Atrás/Siguiente navigation spans its section, capped at `80rem`, with a `2rem` gap above it and `1rem` between its separator and buttons. Keep this width cap on large monitors.
- Scenario tabs keep one stationary background sized to the tallest panel. Only the panel contents fade; all four panels start at the same position, without extra margins on E2–E4. Extra space needed to preserve this stable box height is intentional.
- Preserve comfortable control padding, keyboard focus indicators, and mobile readability. Compact spacing should remove redundant gaps rather than compress every element indiscriminately.

### Implementation notes

- `server/render-iber-market.js` renders the market/scope view, with the consulting scope and an Incluye / No incluye comparison. It uses the shared spacing and reading-width rules, stacks its columns on mobile, and is registered after solution scenarios with automatic bottom navigation.

- `server/render-iber-market-shortlist.js` adds four selectable vendor cards at the end of the market view (Power BI, Metabase, Tableau and Odoo). They reuse the scenario tab controls, keyboard navigation and stationary text-fade panel. Evaluation results stay server-side; vendor logos are served locally from `public/logos/` with sources recorded in `SOURCES.txt`. Preserve original logo colors.

- The market view's evaluation criteria are rendered by `server/render-iber-evaluation-criteria.js`: a selectable pie chart (35% functional, 25% technical, 25% provider, 15% economic) and a stationary detail panel with the same text-only fade as scenario tabs. `public/iber-criteria.js` handles mouse/touch and keyboard selection, rapid changes and reduced motion. Graph slices and legend buttons select the same detail. Future server-rendered detail graphs can be supplied through `renderEvaluationCriteria({ renderDetailGraph })`; empty slots stay hidden until real data is available, and client information must remain in authenticated HTML.

- The IBER header navigation and dashboard content use matching centered containers capped at `80rem`, including `1.5rem` horizontal padding (`1rem` on mobile). Page headings, cards, diagrams and bottom navigation align with the header controls when the menu is closed. The content remains centered in its available grid column when the push-back menu opens. Reading paragraphs retain their separate width limit inside this container.

- Current application details come only from the Uso actual column of Aplicaciones en Uso, stored server-side in `server/iber-current-applications.js`. The single Odoo item groups ERP, purchase forecasting, accounting and e-commerce in one popup with four subsections. Microsoft 365 items have no popups. Application items reuse the process popup controls, 225ms opening/closing animation and inset scrollbar; provider/administrator details are excluded.

- Current architecture process items use the complete Listado de procesos from the supplied current-architecture document, stored server-side in `server/iber-current-processes.js` (4 strategic, 5 operational, 3 support). Native popovers show the full description on click, keyboard activation, or tap, and close with the X, Escape, outside click, or another click on the selected item. They open above or below the item without covering it, with a subtle entrance from its direction (disabled for reduced motion). `public/iber-processes.js` only positions and controls those popovers; the document text is in authenticated HTML. Popovers use the browser top layer so the diagram's rounded clipping cannot hide long text.

- `server/iber-sections.js` defines the order and renderers of IBER views. Both the sidebar and the bottom Atrás/Siguiente links use this registry; the first/last view omits unavailable directions. New sections should be registered here. Navigation switches the visible view, updates its hash and sidebar selection, focuses its heading, and returns to the top. Hash links remain usable without JavaScript.

- Private IBER reading styles are centralized in `public/iber.css` under `.dashboard-content`: introductory prose uses a shared width of `min(75%, 80ch)` on desktop and full width below 64rem; paragraphs and descriptive values use 1.75 line spacing, left alignment with natural word spacing, and Spanish automatic hyphenation. Cards and boxes use left alignment without automatic hyphenation. Full justification was removed because it created uneven gaps between words. Shared spacing tokens set paragraphs to 1rem, sections to 2rem, heading-to-content gaps to 0.75rem, and content-to-visual gaps to 1.25rem. All private views use this rhythm, including story groups, diagrams, diagnosis and bottom navigation. Headings, navigation, statistics, badges and diagram labels retain their own alignment, and diagram/card grids can use the full available width.

- IBER has five views: Caso de Negocio (the default), Arquitectura Actual, Arquitectura destino, Escenarios de Solución, and Alcance y análisis del mercado de soluciones. Escenarios de Solución is rendered by `server/render-iber-solutions.js`, with the gap-analysis summary and an accessible SVG pie chart of the 50 current ABB; its content stays in authenticated HTML. The initial Resumen, Proyectos, and Documentos placeholders have been removed. The push-back menu supports Escape and section hashes; without JavaScript, all sections remain readable. Interface behavior is in `public/iber-dashboard.js` and responsive styles are in `public/iber.css`.
- Caso de Negocio renders the supplied document's business outcomes, six objectives and fourteen user stories as Como / Quiero / Para cards. Content stays in `server/iber-business-case.js`, rendered by `server/render-iber-business-case.js` only after authentication.
- Arquitectura Actual shows the template 02 integrative diagram as an image (professor's request), rendered by `server/render-architecture-image.js`. The PNG lives base64-encoded in `server/images/arquitectura-actual.js` and is served only with a valid session by `functions/iber/imagenes/[name].js` (never put it in `public/`). Interactive zones and their short texts are in `server/iber-current-architecture-map.js` (pixel boxes over the 1291x726 image); `public/iber-architecture-map.js` shows the tooltip on hover, focus or tap. If the image changes, re-measure the boxes. The Diagnóstico block below it is unchanged. `server/iber-current-processes.js` and `server/iber-current-applications.js` are no longer used by this view.
- Arquitectura destino works the same way with the template 03 diagram (page 10): image in `server/images/arquitectura-destino.js`, zones and texts in `server/iber-destination-architecture-map.js` (titles include the stage E1/E2/E3, Habilitador, Se mantiene or Se elimina). `server/render-architecture-diagram.js` and `public/iber-processes.js` are no longer used by any view.
- `/iber/login` is a public Astro login page. `/iber` is served by a Cloudflare Pages Function after authentication.
- Authentication uses one shared username/password. Signed sessions expire after one hour; cookies use `HttpOnly`, `Secure`, and `SameSite=Strict`. Logout removes the browser cookie. Rotating the signing secret invalidates all existing sessions.
- Credentials belong in **Cloudflare Pages secrets**, never in `src/`, `public/`, or Git. Configure `IBER_USERNAME`, `IBER_PASSWORD` (at least 12 characters), and `IBER_SESSION_SECRET` (an independent random value of at least 32 characters) for each deployment environment that needs IBER.
- For a signing secret, generate a value locally with `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`. Keep the result private.
- For local testing, copy `.dev.vars.example` to `.dev.vars`, fill in your own values, run `npm run build`, then `npx wrangler pages dev dist --local-protocol https`. Open the HTTPS address Wrangler prints. The local certificate may require a browser trust exception. The ordinary Astro development server previews the login design but does **not** run authentication Functions.
- Test authentication logic with `node --test tests/iber-auth.test.mjs`.
- `public/_routes.json` routes IBER requests through Functions. Keep private content and downloads in authenticated Functions; do not put them in public static files or client bundles. The private page intentionally has no `src/pages/iber/index.astro` or static HTML equivalent.
- Before public use, configure login attempt rate limiting in Cloudflare, and select **fail closed** for Pages Functions quota exhaustion. These dashboard changes are not made by repository edits.
- Source implementation: `functions/_middleware.js`, `functions/iber/`, and `server/iber-auth.js`. Runtime handlers use Web APIs and require no Astro SSR adapter or database.
- Cloudflare references: [middleware](https://developers.cloudflare.com/pages/functions/middleware/), [secrets](https://developers.cloudflare.com/pages/functions/bindings/#secrets), [local development](https://developers.cloudflare.com/pages/functions/local-development/), and [routing and failure behavior](https://developers.cloudflare.com/pages/functions/routing/).
