# TruePas Website — Agent Handoff / Context Document

This file explains where all design data comes from and how the Figma-to-code pipeline works, so any agent can continue the build.

## Goal

Pixel-accurate recreation of a Figma design as a Next.js + TypeScript + Tailwind v4 website. Built in phases, each approved by the user before committing.

## Figma source of truth

- **File:** `TruePas`, file key `jj854H0LwiYxUmxJOO2NxG`
- **Figma page:** `High-Fi designs` (the file contains other pages — ignore them)
- **Frames on that page (each = one website page):**

| Site page | Figma node ID | Route | Desktop size |
|---|---|---|---|
| Enterprises | `506:2836` | `/` | 1440×10149 (13 sections) |
| Users | `222:98` | `/users` | 1440×9594 (12 sections) |
| Who are we | `506:3325` | `/who-are-we` | 1440×2026 (4 sections) |
| Compliances | `525:3426` | `/compliances` | 1440×416 (1 section) |

## How the Figma connection works

**No MCP/plugin is used.** Everything goes through the **Figma REST API** with a **personal access token** (PAT) supplied by the user:

- Endpoints used:
  - `GET /v1/files/{key}/nodes?ids={nodeId}` — full node tree JSON (layout, fills, fonts, effects)
  - `GET /v1/images/{key}?ids={ids}&format=png&scale=1` — rendered PNG references per node
  - `GET /v1/images/{key}?ids={ids}&format=svg&svg_outline_text=false` — icon SVG exports
  - `GET /v1/files/{key}/images` — map of image-fill refs → download URLs (avatars etc.)
- Header: `X-Figma-Token: <token>`
- The token is passed via env var `FIGMA_TOKEN` and is **never stored in the repo**. The token shared earlier in chat should be revoked in Figma → Settings → Security when work finishes; a new PAT (File content → Read only scope) can be generated anytime.
- **Rate limits:** the `/images` render endpoint 429s under burst load — retry with 15s+ backoff. Node JSON reads are cheap.

## Where the data lives

### Repo (committed)

- `public/icons/*.svg` — Figma-exported icons (Google Material-style glyphs + `group-1.svg`/`group-2.svg` = Apple/Play badges)
- `public/images/*.jpg|png` — Figma image fills (testimonial avatars). Filenames = first 10 chars of the Figma `imageRef`
- `design-ref/<page>/*.png` — **gitignored** Figma reference renders: `00-full.png` + one per top-level section (`NN-<nodeid>.png`)
- `screenshots/` — **gitignored** Playwright screenshots, same naming (`1440-NN.png`)

### Local cache (NOT in repo — `%TEMP%\figma\`)

- `file.json` — whole-file document JSON (frame list)
- `nodes.json` — full node subtrees for all 4 frames: `nodes["222:98"].document` etc. **This is the primary data source — most builds need no new API calls**
- `users.png`, `whoarewe.png`, `compliances.png`, `enterprises.png` — 720px-wide full-page renders
- `compare.js` — builds a stacked FIGMA-vs-BROWSER PNG: `node compare.js <figma.png> <browser.png> <out.png>`
- `diff.js` — pixel-diff of two dirs of same-named PNGs: `node diff.js <refDir> <shotDir>`

Regenerate the cache any time with the API, e.g. `curl -H "X-Figma-Token: $FIGMA_TOKEN" "https://api.figma.com/v1/files/.../nodes?ids=222:98"`. Git Bash `/tmp/figma` = `C:\Users\ADMINI~1\AppData\Local\Temp\figma` — Node needs the Windows path (`process.env.TEMP`).

### Scripts

- `FIGMA_TOKEN=… node scripts/figma-export.mjs <frameNodeId> <refDir>` — exports icons → `public/icons/`, image fills → `public/images/` (detects jpg vs png by magic bytes), section renders → `design-ref/<refDir>/`
- `node scripts/screenshot.mjs <url> <width> <outDir>` — Playwright full-page + per-`<section>` screenshots at a viewport width

## Build conventions

- **Desktop-accurate at 1440px**; Figma values apply from `lg` (1024px) up, stacking below. Figma's 160px side padding = `px-5 md:px-10` + the 1120px `container-page` utility.
- Shared utilities in `app/globals.css`: `section-pad`, `heading-xl/lg/md`, `glass` (approximation of Figma's GLASS effect — its params aren't exposed by the API), color tokens (`primary` #007aff, `sky-*`, `ink-*`…).
- **Placeholders:** checkerboard image areas in Figma → `<Placeholder>` (grey box). Image ref `ece298d0…` IS the checkerboard — the export script skips it.
- Copy is verbatim from Figma, including dummy text ("Title", "Name", "Designation"). Draft copy written for missing content is commented as such in the file.
- Links/buttons → `href="#"` unless the target page exists. Demo CTAs ("Book a Demo", "Request demo") use `components/ui/BookDemoButton.tsx`: a Calendly popup, with the widget loaded on first click and the booking page as the `href` fallback. The Calendly URL is the `CALENDLY_URL` constant there (currently a personal test account; swap for the client's). `Navbar`/`Footer` live in `app/layout.tsx`; Navbar is sticky, shrinks on scroll, page-aware CTA (`Book a Demo` vs `Download the app` on `/users`) and active-page glass pill via `usePathname`.
- Logo: the TruePas symbol is `components/ui/LogoMark.tsx` (inline SVG, `currentColor`, size by height e.g. `h-[22px] w-auto`) next to the "TRUEPAS" wordmark; favicon = `app/icon.svg`, `app/apple-icon.png`. It replaced the Figma mark (`image-8.svg`)
- Component map: `components/ui/` (Button+icons, LogoMark, IconBox, SectionLabel, Placeholder, Accordion `size=md|lg`, Tabs, VideoPlayer), `components/sections/<page>/`, shared sections in `components/sections/` (CtaBanner, Numbers, Team, Testimonials `heading` prop).

## Verification workflow

1. `npm run dev` (port 3000), screenshot page + each section at 1440
2. `diff.js` pixel-diff vs `design-ref` PNGs; measure element rects via Playwright `getBoundingClientRect` vs Figma `absoluteBoundingBox`
3. Check 375/768/1024 for `scrollWidth === innerWidth` (no horizontal scroll)
4. `npm run lint` + `npx tsc --noEmit` + `npm run build`

Known deltas: Figma sections overlap 1px each (not replicated); grey placeholders diff vs checkerboard (expected); tiny font-rendering pixel noise.

## Progress / remaining work

- Enterprises `/` — DONE (all 13 sections, responsive, committed)
- Users `/users` — DONE (all 12 sections; Phase A committed `56da2b1`, Phase B = Use-cases, Numbers, App features, Security & Privacy, Testimonials, FAQ, Team, CTA). Draft copy (non-Airports tabs, App feature answers 2–10, FAQ answers 2–4, "Global Certification" text) is marked in code and awaits client copy
- Who are we `/who-are-we` — DONE (About, team member grid, CTA; verified against the 720px cache render + Figma bounding boxes)
- Compliances `/compliances` — DONE (single section; extra top padding clears the fixed navbar, section grows so the footer sits at the bottom). Not linked from navbar/footer because Figma has no link to it
- Still to do when a FIGMA_TOKEN is available: export 1440 section renders to `design-ref/who-are-we` + `design-ref/compliances` for pixel diffs. All remaining copy (Name/Designation, Compliance name, drafts) awaits the client

Gotchas: project lives in OneDrive (slow file ops, occasional stale dev-server lock — kill the PID and restart `npm run dev`); port 3000 may be held by a zombie `next dev`; stray `package-lock.json` in `C:\Users\Administrator` triggers a harmless Next.js warning.
