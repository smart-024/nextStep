# START HERE — NextStep website

> Project context for contributors and AI coding assistants (including Codex in VS Code).
> Last updated: 2026-10-24. This file describes the project as established in the planning conversation; inspect the repository to confirm the current implementation before editing.

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

The source logo is `public/logo_next_step.svg`. Preserve the logo and palette unless explicitly asked to change them. Ensure sufficient contrast when using the logo against dark or light backgrounds.

Tailwind v4 design tokens are defined in `src/styles/global.css` using `@theme`, making classes such as `bg-brand-primary` and `text-brand-rose` available.

### Typography

- **Switzer**: main headings (`h1`, `h2`), smaller headings, and form legends, all in regular weight.
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

1. **Navigation** — `Navbar.astro`: sticky burgundy header, logo, desktop links, responsive mobile menu.
2. **Hero** — `Hero.astro`: dramatic oversized heading (“El futuro no se espera. Se construye.”), supporting copy, CTA buttons, decorative circular outlines, entrance animations.
3. **Nosotros** — about the fictional firm.
4. **Servicios** — three services, currently defined as an array in `index.astro` and rendered as cards.
5. **Contacto** — closing invitation, currently informational (not a working contact form).
6. **Footer** — NextStep and academic-project notice.

Current section anchor IDs: `inicio`, `nosotros`, `servicios`, `contacto`. Preserve them when modifying navigation or section markup.

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

- `/iber/login` is a public Astro login page. `/iber` is served by a Cloudflare Pages Function after authentication, with a placeholder for future private content.
- Authentication uses one shared username/password. Signed sessions expire after one hour; cookies use `HttpOnly`, `Secure`, and `SameSite=Strict`. Logout removes the browser cookie. Rotating the signing secret invalidates all existing sessions.
- Credentials belong in **Cloudflare Pages secrets**, never in `src/`, `public/`, or Git. Configure `IBER_USERNAME`, `IBER_PASSWORD` (at least 12 characters), and `IBER_SESSION_SECRET` (an independent random value of at least 32 characters) for each deployment environment that needs IBER.
- For a signing secret, generate a value locally with `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`. Keep the result private.
- For local testing, copy `.dev.vars.example` to `.dev.vars`, fill in your own values, run `npm run build`, then `npx wrangler pages dev dist --local-protocol https`. Open the HTTPS address Wrangler prints. The local certificate may require a browser trust exception. The ordinary Astro development server previews the login design but does **not** run authentication Functions.
- Test authentication logic with `node --test tests/iber-auth.test.mjs`.
- `public/_routes.json` routes IBER requests through Functions. Keep private content and downloads in authenticated Functions; do not put them in public static files or client bundles. The private page intentionally has no `src/pages/iber/index.astro` or static HTML equivalent.
- Before public use, configure login attempt rate limiting in Cloudflare, and select **fail closed** for Pages Functions quota exhaustion. These dashboard changes are not made by repository edits.
- Source implementation: `functions/_middleware.js`, `functions/iber/`, and `server/iber-auth.js`. Runtime handlers use Web APIs and require no Astro SSR adapter or database.
- Cloudflare references: [middleware](https://developers.cloudflare.com/pages/functions/middleware/), [secrets](https://developers.cloudflare.com/pages/functions/bindings/#secrets), [local development](https://developers.cloudflare.com/pages/functions/local-development/), and [routing and failure behavior](https://developers.cloudflare.com/pages/functions/routing/).
