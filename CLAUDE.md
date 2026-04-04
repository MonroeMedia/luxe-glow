# monroe-media-starter — Claude Code Guide

This is the Monroe Media base starter for client websites. Clone it for each new project, swap in the client's Sanity project credentials, and build on top of the established structure and standards below.

---

## Stack Overview

| Layer        | Tool / Version                              |
| ------------ | ------------------------------------------- |
| Frontend     | Astro 5 (`output: 'static'`)                |
| Styling      | Tailwind CSS v3 + CSS custom properties     |
| CMS          | Sanity v3 (hosted Studio + GROQ API)        |
| Language     | TypeScript (strict mode)                    |
| Deployment   | Vercel (`@astrojs/vercel` v8, static mode)  |
| Sitemap      | `@astrojs/sitemap` (auto-generated at build)|

**Version notes:**
- Astro 5 removed `output: 'hybrid'` — use `output: 'static'` (default) or `output: 'server'`
- `@astrojs/vercel` v8+ requires Astro 5. Import as `@astrojs/vercel` (no subpath)
- `@astrojs/vercel` v7 was the last version compatible with Astro 4 — do not downgrade

---

## Project Structure

```
monroe-media-starter/
├── astro.config.mjs          Astro config — adapter, integrations, output mode
├── tailwind.config.mjs       Tailwind wired to CSS variable tokens
├── tsconfig.json             Strict TypeScript + path aliases
├── vercel.json               Vercel deployment config
├── .env.example              Required env vars documented (copy to .env)
├── CLAUDE.md                 This file
│
├── src/
│   ├── components/           Reusable UI and section components (.astro)
│   │   ├── SEO.astro         Injects meta, OG, and JSON-LD from Sanity
│   │   ├── Nav.astro         Sticky header with mobile toggle
│   │   └── Footer.astro      Business info, service areas, social links
│   ├── layouts/
│   │   └── BaseLayout.astro  HTML shell — named slots: seo, nav, default, footer
│   ├── pages/
│   │   ├── index.astro       Home page (fetches slug "home" from Sanity)
│   │   └── [slug].astro      Dynamic page route via getStaticPaths
│   ├── styles/
│   │   └── global.css        CSS tokens + Tailwind base (all --color-*, --font-*, --space-*)
│   └── lib/
│       ├── sanity.ts         Sanity client + imageUrlBuilder
│       └── queries.ts        Typed interfaces + GROQ fetch helpers
│
└── studio/                   Standalone Sanity Studio (separate npm workspace)
    ├── sanity.config.ts      Studio config — projectId, dataset, schema, structure
    ├── package.json          Studio dependencies (sanity, react, styled-components)
    └── schemas/
        ├── index.ts          Schema registry
        ├── seo.ts            Shared SEO object (title, desc, OG image, noindex, JSON-LD)
        ├── siteSettings.ts   Business name, phone, email, address, service areas, social
        ├── page.ts           Title, slug, SEO, sections array (page builder)
        ├── service.ts        Name, description, icon, price
        └── testimonial.ts    Name, location, stars (1–5), body
```

---

## Environment Variables

The Sanity client reads variables using a fallback pattern — `PUBLIC_`-prefixed names for local Astro dev, unprefixed for Vercel:

| Variable                                   | Required | Description                                      |
| ------------------------------------------ | -------- | ------------------------------------------------ |
| `PUBLIC_SANITY_PROJECT_ID` or `SANITY_PROJECT_ID` | Yes | Sanity project ID — get from sanity.io/manage |
| `PUBLIC_SANITY_DATASET` or `SANITY_DATASET`       | No  | Dataset name, defaults to `production`        |
| `SANITY_API_TOKEN`                         | No       | Read token — needed for draft/preview content    |
| `PUBLIC_SITE_URL`                          | Yes      | Canonical base URL for SEO (e.g. https://client.com) |

**Local setup:**
```bash
cp .env.example .env
# Fill in your values — .env is gitignored
```

**Vercel setup:**
Add these in the Vercel dashboard under Project → Settings → Environment Variables. Use the unprefixed names (`SANITY_PROJECT_ID`, `SANITY_DATASET`) — Vercel does not require the `PUBLIC_` prefix and Astro will read them at build time.

**Where to get credentials:**
- Project ID and dataset: [sanity.io/manage](https://sanity.io/manage) → your project → API
- API token: same page → API → Tokens → Add API token (choose "Viewer" for read-only)

---

## Running Locally

**Start Astro dev server:**
```bash
npm run dev
# → http://localhost:4321
```

**Start Sanity Studio:**
```bash
npm run studio
# → http://localhost:3333
# (runs: cd studio && npm run dev)
```

Both can run simultaneously in separate terminal tabs.

**Build for production (run before committing significant changes):**
```bash
npm run build
# Outputs to dist/ and .vercel/output/
```

**Deploy Studio to sanity.io:**
```bash
npm run studio:deploy
# (runs: cd studio && npm run deploy)
```

---

## GitHub & Vercel Deployment Pipeline

**Repository:** `github.com/MonroeMedia/monroe-media-starter`

**Deployment flow:**
1. Push to `main` → Vercel automatically triggers a build
2. Vercel runs `npm run build` (defined in `vercel.json`)
3. Static output is served from Vercel's edge network
4. Sitemap is auto-generated to `dist/sitemap-index.xml` at build time

**Vercel project settings:**
- Framework: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`
- Node version: 20+

**First deploy checklist:**
- [ ] Add all env vars in Vercel dashboard (see Environment Variables section above)
- [ ] Update `site:` in `astro.config.mjs` with the real domain
- [ ] Update `PUBLIC_SITE_URL` in Vercel env vars
- [ ] Deploy Studio: `npm run studio:deploy`

---

## Starting a New Client Project from This Starter

1. **Clone the repo:**
   ```bash
   git clone https://github.com/MonroeMedia/monroe-media-starter.git client-name
   cd client-name
   ```

2. **Reset git history:**
   ```bash
   rm -rf .git
   git init
   git add .
   git commit -m "feat: init from monroe-media-starter"
   ```

3. **Create a new Sanity project** at [sanity.io/manage](https://sanity.io/manage), or use an existing one. Get the project ID.

4. **Update `studio/sanity.config.ts`** — replace the `projectId` with the new project's ID.

5. **Set up `.env`:**
   ```bash
   cp .env.example .env
   # Fill in the new project ID, dataset, and API token
   ```

6. **Update `astro.config.mjs`** — set `site:` to the client's domain.

7. **Install dependencies:**
   ```bash
   npm install
   cd studio && npm install
   ```

8. **Create a new GitHub repo** and push:
   ```bash
   gh repo create client-name --public --source=. --remote=origin --push
   ```

9. **Connect to Vercel** — import the GitHub repo in the Vercel dashboard, add env vars, deploy.

10. **Deploy Studio:**
    ```bash
    npm run studio:deploy
    ```

---

## Monroe Media Design Standards

- **Sharp corners** — default border-radius is 2–4px (`--radius-sm` / `--radius-md`). No large pill shapes unless explicitly requested by the client.
- **CSS variables for all colors** — never use raw hex values in component `<style>` blocks or Tailwind config. Always reference `var(--color-*)` tokens defined in `src/styles/global.css`. The Tailwind config maps these tokens to utility classes (`text-primary`, `bg-accent`, etc.).
- **Mobile-first** — write base styles for mobile viewport, layer up with `@media (min-width: ...)` or Tailwind's `md:` / `lg:` prefixes. Check 375px width after every new component.
- **Font tokens** — use `var(--font-display)` for headings, `var(--font-body)` for body copy. Do not hardcode font family strings anywhere.
- **Spacing tokens** — prefer `var(--space-*)` for padding and margin in component `<style>` blocks. Tailwind utility classes are fine for one-off or inline spacing.

**Customizing tokens per client** — all tokens live in `:root` in `src/styles/global.css`. Update color, font, and radius values there. Nothing else needs to change.

---

## Monroe Media Code Standards

- **One component per file.** Each `.astro` file exports exactly one component. No co-located helpers or secondary exports.
- **All content from Sanity.** No hardcoded copy inside components or pages. Every string, label, and image must come through a Sanity query in `src/lib/queries.ts`.
- **No hardcoded copy** — placeholder text (`"Lorem ipsum"`, `"Coming soon"`, etc.) is never acceptable in committed code.
- **Typed queries** — every Sanity query must have a corresponding TypeScript interface in `queries.ts`. Do not use `any` or `unknown` without narrowing.
- **Props interfaces** — every Astro component must define a `Props` interface in the frontmatter `---` block.
- **SEO on every page** — every page must pass `seo`, `title`, or `description` to `BaseLayout`, or render `<SEO>` directly inside a `<slot name="seo">`. No page ships without meta tags.
- **No adapter imports outside `astro.config.mjs`** — do not import `@astrojs/vercel` anywhere in `src/`.

---

## Adding New Page Sections (Page Builder Pattern)

Each section is a pair: an Astro component + a Sanity schema object type.

1. **Create the component** in `src/components/` (e.g. `HeroSection.astro`)
2. **Define the schema** in `studio/schemas/` (e.g. `heroSection.ts`) as `type: 'object'`
3. **Register the schema** in `studio/schemas/index.ts`
4. **Add to the `sections` array** in `studio/schemas/page.ts` → `of: [{ type: 'heroSection' }]`
5. **Wire up rendering** in `src/pages/[slug].astro` — map `section._type` to the component
6. **Run `npm run build`** to confirm no type or build errors

---

## Workflow Notes

1. **Check mobile after every component** — resize to 375px before committing.
2. **Run `npm run build` after significant changes** — SSG errors and missing env vars only surface at build time.
3. **Commit after each completed section** — use conventional commits: `feat:`, `fix:`, `chore:`, `style:`.
4. **Never commit `.env`** — it is gitignored. Credentials go in Vercel env vars for production.
5. **Studio schemas and Astro types stay in sync** — when you add a Sanity field, update the TypeScript interface in `queries.ts` at the same time.
