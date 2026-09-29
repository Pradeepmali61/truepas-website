<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# TruePas website

Pixel-accurate build of the Figma file `jj854H0LwiYxUmxJOO2NxG` (page "High-Fi designs"). Next.js 16 + TypeScript + Tailwind v4.

## Commands
- `npm run dev` / `npm run build` / `npm run lint` / `npx tsc --noEmit`
- `FIGMA_TOKEN=... node scripts/figma-export.mjs [nodeId] [refDir]` — exports icons (`public/icons`), image fills (`public/images`) and per-section reference PNGs (`design-ref/`, gitignored). Never commit the token.
- `node scripts/screenshot.mjs [url] [width] [outDir]` — Playwright full-page + per-section screenshots (`screenshots/`, gitignored).

## Conventions
- Figma desktop values (1440px frame) apply from `lg` (1024px) up; below that layouts stack. Side padding comes from `px-5 md:px-10` + the 1120px `container-page`, which equals Figma's 160px at 1440.
- Shared utilities in `app/globals.css`: `section-pad`, `heading-xl` (56), `heading-lg` (48), `heading-md` (40), `glass` (approximation of Figma GLASS effect).
- Verify every change at 1440 against the Figma reference PNGs (side-by-side) and check 375/768 for horizontal overflow.
- Enterprises page = `/` (Figma node `506:2836`). Remaining pages: Users (`222:98`), Who are we (`506:3325`), Compliances (`525:3426`).
