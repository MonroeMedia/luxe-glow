# monroe-media-starter — Claude Code Guide

## Stack Overview

| Layer       | Tool / Framework                            |
| ----------- | ------------------------------------------- |
| Frontend    | Astro 4 (hybrid output)                     |
| Styling     | Tailwind CSS + CSS custom properties        |
| CMS         | Sanity v3 (hosted Studio + API)             |
| Language    | TypeScript (strict)                         |
| Deployment  | Vercel (serverless adapter)                 |
| Sitemap     | @astrojs/sitemap (auto-generated)           |

---

## Project Structure

```
src/
  components/   Reusable section and UI components (.astro)
  layouts/      Page shell layouts (.astro)
  pages/        File-based routes (.astro)
  styles/       global.css — design tokens + Tailwind base
  lib/          sanity.ts (client), queries.ts (typed fetch helpers)

studio/
  schemas/      Sanity document and object schemas
  sanity.config.ts
```

---

## Design Standards

- **Sharp corners** — default border-radius is 2–4px. No large pill shapes unless explicitly requested.
- **CSS variables for all colors** — never use raw hex values in component `<style>` blocks or Tailwind config. Always reference `var(--color-*)` tokens defined in `global.css`.
- **Mobile-first** — write base styles for mobile, layer up with `@media (min-width: ...)` or Tailwind's `md:` / `lg:` prefixes.
- **Font tokens** — use `var(--font-display)` for headings and `var(--font-body)` for body copy. Do not hardcode font family strings.
- **Spacing tokens** — prefer `var(--space-*)` for padding and margin in `<style>` blocks. Tailwind utility classes are fine for one-off spacing.

---

## Code Standards

- **One component per file.** Each `.astro` file exports exactly one component.
- **All content from Sanity.** No hardcoded copy inside components or pages. Strings, labels, and images must come from Sanity queries via `src/lib/queries.ts`.
- **No hardcoded copy** — placeholder text (`"Lorem ipsum"`, `"Coming soon"`, etc.) is not acceptable in committed code.
- **Typed queries** — every Sanity query must have a corresponding TypeScript interface in `queries.ts`. Do not use `any`.
- **Props interfaces** — every Astro component must define a `Props` interface in the frontmatter.
- **SEO on every page** — every page must pass `seo`, `title`, or `description` to `BaseLayout` or render `<SEO>` directly in a `<slot name="seo">`.

---

## Workflow Notes

1. **Check mobile after every component.** Resize to 375px width before committing a new component.
2. **Run `npm run build` after significant changes** — especially after adding new pages, Sanity schema changes, or sitemap-related changes. SSG errors surface only at build time.
3. **Commit after each completed section.** Use descriptive commit messages: `feat: add ServicesGrid component`, `fix: mobile nav toggle`, etc.
4. **Environment variables** — copy `.env.example` to `.env` and fill in Sanity credentials before running `npm run dev`. Never commit `.env`.
5. **Sanity Studio** — run `cd studio && npx sanity dev` to open the local Studio. Deploy Studio with `npx sanity deploy` from the `studio/` directory.
6. **Adding new page sections** — create the Astro component in `src/components/`, add the matching Sanity schema object type in `studio/schemas/`, register it in the `sections` array field inside `page.ts`, and wire up rendering in `src/pages/[slug].astro`.

---

## Environment Variables

| Variable                    | Where used          | Description                         |
| --------------------------- | ------------------- | ----------------------------------- |
| `PUBLIC_SANITY_PROJECT_ID`  | Astro + Studio      | Sanity project ID                   |
| `PUBLIC_SANITY_DATASET`     | Astro               | Dataset name (default: production)  |
| `SANITY_API_TOKEN`          | Astro (server)      | Read token for draft previews       |
| `PUBLIC_SITE_URL`           | SEO component       | Canonical base URL                  |
| `SANITY_STUDIO_PROJECT_ID`  | Studio only         | Same project ID for Studio config   |
| `SANITY_STUDIO_DATASET`     | Studio only         | Same dataset for Studio config      |
