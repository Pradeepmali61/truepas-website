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

- `node scripts/optimize-video.mjs` — needs `ffmpeg` on PATH (installed via winget). Compresses the brand video (`5-Oct/Direct/Truepas Brand Video.mp4`, from the client's SharePoint link) to `public/videos/truepas-brand.mp4` (1080p H.264 CRF 26 + AAC, faststart, ~34 MB) and saves the 2:00 frame as `public/images/video-poster.webp`

- `FIGMA_TOKEN=… node scripts/figma-export.mjs <frameNodeId> <refDir>` — exports icons → `public/icons/`, image fills → `public/images/` (detects jpg vs png by magic bytes), section renders → `design-ref/<refDir>/`
- `node scripts/screenshot.mjs <url> <width> <outDir>` — Playwright full-page + per-`<section>` screenshots at a viewport width
- `node scripts/optimize-images.mjs` — converts the content team's raw images (gitignored `5-Oct/For Enterprises`, `5-Oct/For Users` in the repo root, mirroring the "5-Oct" Drive folder; `5-Oct/Direct` holds images sent outside Drive) to WebP (quality 88, max 1400px wide) in `public/images/{enterprises,users}/`, plus the logo PNG. Add a mapping entry per image; place it with `components/ui/Photo.tsx` or `PhotoSwap.tsx` (next/image `fill`, `cover`/`contain`). These components and `BrandLogo` use `unoptimized`: the browser gets the full-size file, so zooming stays sharp and nothing is compressed twice (avatars still go through the optimizer)

## Build conventions

- **Desktop-accurate at 1440px**; Figma values apply from `lg` (1024px) up, stacking below. Figma's 160px side padding = `px-5 md:px-10` + the 1120px `container-page` utility.
- Shared utilities in `app/globals.css`: `section-pad`, `heading-xl/lg/md`, `glass` (approximation of Figma's GLASS effect — its params aren't exposed by the API), color tokens (`primary` #007aff, `sky-*`, `ink-*`…).
- **Placeholders:** checkerboard image areas in Figma → `<Placeholder>` (grey box). Image ref `ece298d0…` IS the checkerboard — the export script skips it.
- Copy is verbatim from Figma, including dummy text ("Title", "Name", "Designation"). Draft copy written for missing content is commented as such in the file.
- Links/buttons → `href="#"` unless the target page exists. Demo CTAs ("Book a Demo", "Request demo") use `components/ui/BookDemoButton.tsx`: a Calendly popup, with the widget loaded on first click and the booking page as the `href` fallback. The Calendly URL is the `CALENDLY_URL` constant there (currently a personal test account; swap for the client's). `Navbar`/`Footer` live in `app/layout.tsx`; Navbar is sticky, shrinks on scroll, page-aware CTA (`Book a Demo` vs `Download the app` on `/users`) and active-page glass pill via `usePathname`.
- Logo: the client's final logo (gradient symbol #00aae8→#0090cb + navy #110f35 "TruePas" wordmark) is `public/images/truepas-logo.png` (from `5-Oct/Direct/TruePas logo.png` via `optimize-images.mjs`), rendered by `components/ui/BrandLogo.tsx` (`height` prop, e.g. `<BrandLogo height={29} className="h-[29px]" />`) in the navbar/footer (`Logo`), the "Why TruePas" box and the Users hero bar. Favicon = `app/icon.svg` (same symbol paths, same gradient); `app/apple-icon.png` is rendered from it. Ask the client for an SVG of the logo when possible
- Component map: `components/ui/` (Button+icons, BrandLogo, IconBox, SectionLabel, Placeholder, Photo, PhotoSwap (stacked, preloaded tab images), Accordion `size=md|lg` + `onOpenChange`, Tabs, VideoPlayer (poster + play button; plays the brand video in a dialog)), `components/sections/<page>/`, shared sections in `components/sections/` (CtaBanner, Team; Numbers and Testimonials `heading` prop are currently hidden).

## Verification workflow

1. `npm run dev` (port 3000), screenshot page + each section at 1440
2. `diff.js` pixel-diff vs `design-ref` PNGs; measure element rects via Playwright `getBoundingClientRect` vs Figma `absoluteBoundingBox`
3. Check 375/768/1024 for `scrollWidth === innerWidth` (no horizontal scroll)
4. `npm run lint` + `npx tsc --noEmit` + `npm run build`

Known deltas: Figma sections overlap 1px each (not replicated); grey placeholders diff vs checkerboard (expected); tiny font-rendering pixel noise.

## Progress / remaining work

- Hidden at the client's request (9 Oct 2026), to be added back later: `Numbers` (blue "Title" stats, Enterprises + Users), `Testimonials` (reviews, Enterprises + Users) and `who-are-we/TeamMembers` (Name/Designation grid). The components are kept but not rendered; re-add by importing them in the page again (Users used `<Testimonials heading="What our users are saying" />`; on Enterprises Numbers sat after IndustrySolutions and Testimonials after Dashboard, on Users Numbers after UseCases and Testimonials after SecurityPrivacy, TeamMembers after About). They are still in Figma, so don't restore them unless asked
- Enterprises `/` — DONE (all 13 sections, responsive, committed)
- Users `/users` — DONE (all 12 sections; Phase A committed `56da2b1`, Phase B = Use-cases, Numbers, App features, Security & Privacy, Testimonials, FAQ, Team, CTA). Draft copy (non-Airports tabs, App feature answers 2–10, FAQ answers 2–4, "Global Certification" text) is marked in code and awaits client copy
- Who are we `/who-are-we` — DONE (About, team member grid, CTA; verified against the 720px cache render + Figma bounding boxes)
- Compliances `/compliances` — DONE (single section; extra top padding clears the fixed navbar, section grows so the footer sits at the bottom). Not linked from navbar/footer because Figma has no link to it
- Footer link pages — DONE (not in Figma; design and copy from the client's `truepas-website-pages` package, rebuilt in Tailwind). `/privacy-policy` and `/terms-and-conditions` are verbatim from the client's .docx (9 Oct 2026) via `lib/legal.ts`; the docx drafting notes ("before publication…") are kept as code comments, the Address line is removed at the client's request, and the remaining `[…]` contact placeholders show in a highlighted box until the legal entity details arrive. `/cookie-policy` is the package's draft (needs a cookie audit) with a preference panel saved in localStorage (`lib/consent.ts`); no site-wide cookie banner yet. `/contact` = hero, inquiry form + Business Inquiry panel, How It Works; the form posts to `app/api/contact/route.ts`, which forwards to `CONTACT_WEBHOOK_URL` and returns a "not configured" error until that env var is set. `/blogs` and `/blogs/[slug]` use draft posts (`lib/blog-posts.ts`) until the client's articles arrive
- Brand video — DONE: `VideoPlayer` (Enterprises "Why TruePas", Users hero) shows the 2:00 poster frame and plays `public/videos/truepas-brand.mp4` in a dialog
- Images (5-Oct delivery + revisions in the same Drive folder) — placed: Enterprises Hero, the 3 Fold 2 steps (Set 1, chosen by us at the user's request: one character, matches the step copy; "Image 2/3" are taken as Set 1), all 7 Merchant Benefits, all 7 Industry tabs, Integrations (diagram sent directly by the client, kept in `5-Oct/Direct/`, shown with `contain`), Dashboard, Team (shared section, also on Users); Who are we About ("About Us.jpg", delivered in the For Enterprises folder); Users Hero, 6 enrollment steps, 6 use-case tabs, all 10 App features (Multi-Venue: the user picked the version without the "1" suffix). Tab/accordion images use `PhotoSwap`. Quicker Check-In, Higher Throughput, Hotels and Stadiums show third-party branding (Spotify, Hertz/Avis/Budget/Enterprise, Hilton, FC Barcelona); the user chose to use them as delivered (8 Oct 2026). The Fold 2 logo box is built in code with the final logo. All requirement-doc images are placed. Waiting (from the client, not the designer): Who are we team member headshots (480×480 square) with names, designations and LinkedIn links; the TeamMembers section is hidden until they arrive
- Still to do when a FIGMA_TOKEN is available: export 1440 section renders to `design-ref/who-are-we` + `design-ref/compliances` for pixel diffs. All remaining copy (Name/Designation, Compliance name, drafts) awaits the client

Gotchas: project lives in OneDrive (slow file ops, occasional stale dev-server lock — kill the PID and restart `npm run dev`); port 3000 may be held by a zombie `next dev`; stray `package-lock.json` in `C:\Users\Administrator` triggers a harmless Next.js warning.
