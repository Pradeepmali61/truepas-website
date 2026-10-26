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
- Links/buttons → `href="#"` unless the target page exists. Demo CTAs ("Book a Demo", "Request demo") use `components/ui/BookDemoButton.tsx`: a Calendly popup, with the widget loaded on first click and the booking page as the `href` fallback. The Calendly URL is the `CALENDLY_URL` constant there (the company account contact@truepas.com, `contact-truepas/30min`, since 23 Oct 2026). `Navbar`/`Footer` live in `app/layout.tsx`; Navbar is sticky, shrinks on scroll, page-aware CTA (`Book a Demo` vs `Download the app` on `/users`) and active-page glass pill via `usePathname`.
- Logo: the client's final logo (gradient symbol #00aae8→#0090cb + navy #110f35 "TruePas" wordmark) is `public/images/truepas-logo.png` (from `5-Oct/Direct/TruePas logo.png` via `optimize-images.mjs`), rendered by `components/ui/BrandLogo.tsx` (`height` prop, e.g. `<BrandLogo height={29} className="h-[29px]" />`) in the navbar/footer (`Logo`), the "Why TruePas" box and the Users hero bar. Favicon = `app/icon.svg` (same symbol paths, same gradient); `app/apple-icon.png` is rendered from it. Ask the client for an SVG of the logo when possible
- Component map: `components/layout/` (Navbar, Footer, Logo, ChatWidget), `components/ui/` (Button+icons, BrandLogo, IconBox, SectionLabel, Placeholder, Photo, PhotoSwap (stacked, preloaded tab images), Accordion `size=md|lg` + `onOpenChange`, Tabs, VideoPlayer (poster + play button; plays the brand video in a dialog)), `components/sections/<page>/`, shared sections in `components/sections/` (CtaBanner, Team; Numbers and Testimonials `heading` prop are currently hidden).

## Verification workflow

1. `npm run dev` (port 3000), screenshot page + each section at 1440
2. `diff.js` pixel-diff vs `design-ref` PNGs; measure element rects via Playwright `getBoundingClientRect` vs Figma `absoluteBoundingBox`
3. Check 375/768/1024 for `scrollWidth === innerWidth` (no horizontal scroll)
4. `npm run lint` + `npx tsc --noEmit` + `npm run build`

Known deltas: Figma sections overlap 1px each (not replicated); grey placeholders diff vs checkerboard (expected); tiny font-rendering pixel noise.

## Progress / remaining work

- Hidden at the client's request (9 Oct 2026), to be added back later: `Numbers` (blue "Title" stats, Enterprises + Users), `Testimonials` (reviews, Enterprises + Users) and `who-are-we/TeamMembers` (Name/Designation grid). The components are kept but not rendered; re-add by importing them in the page again (Users used `<Testimonials heading="What our users are saying" />`; on Enterprises Numbers sat after IndustrySolutions and Testimonials after Dashboard, on Users Numbers after UseCases and Testimonials after SecurityPrivacy, TeamMembers after About). They are still in Figma, so don't restore them unless asked
- Blogs hidden at the client's request (13 Oct 2026) until their articles arrive: the route folder is renamed to `app/_blogs` (a private folder, so `/blogs` and `/blogs/<slug>` return 404 and can't be indexed), and the "Blogs" links in `Navbar` and `Footer` are commented out. Restore by renaming the folder back to `app/blogs` and uncommenting both links; the components (`components/sections/blogs/`) and posts (`lib/blog-posts.ts`) are untouched
- Chat assistant (15 Oct 2026, client request; not in Figma): floating "TruePas Assistant" on every page. `components/layout/ChatWidget.tsx` is an AG-UI client (protocol subset hand-written in `lib/chat/protocol.ts`, no `@ag-ui/*` packages) that posts each run to `app/api/chat/route.ts`, which streams Gemini (`@google/genai`, model `gemini-3.8-flash`, falling back to `gemini-3.5-flash-lite` when Flash is overloaded or out of quota, on the Gemini API free tier, thinking level low) back as AG-UI server-sent events. The client chose the free tier (15 Oct 2026) over a paid Claude model: free-tier prompts may be used by Google to improve its products (the widget says so), and when the free quota (see Google AI Studio) runs out the assistant answers "busy" until it resets; a paid tier is the fix. Answers come only from the site copy in `lib/chat/knowledge.ts` (industry journeys are read from `lib/industries`; update the rest when page copy changes). Earlier actions are replayed to Gemini as real functionCall/functionResponse parts (with Google's `skip_thought_signature_validator` placeholder, since the browser doesn't keep thought signatures); they used to be "[Action: ...]" text notes, which the model copied into its replies instead of calling the function (19 Oct 2026 bug: the note showed in the chat and the page never opened). If a reply still says it is opening something without a call (Flash-Lite does this), the route asks the same model again with function calling mode ANY, and the widget hides any leaked note. Three frontend actions run in the browser after a run finishes: `book_demo` (Calendly popup via `openDemoBooking`), `open_contact_form` (prefills industry + inquiry type via `contactHref` in `lib/contact.ts`) and `open_page` (only `publicRoutes` from `lib/site.ts`). Needs the `GEMINI_API_KEY` env var on Vercel (key from Google AI Studio); without it the widget isn't rendered and the route returns 503, and adding the key takes a redeploy (pages are prerendered). Abuse limits in the route: 20 requests per IP per 10 minutes (in memory, per instance), 1,500 characters per message, 40 messages per conversation, same-origin only. Chat text goes to Google: the client's Privacy Policy doesn't mention this yet. Test locally with a mocked `/api/chat` stream (Playwright `page.route`) when no key is available
- Enterprises Industry Solutions (13 Oct 2026): "Explore TruePas for <industry>" opens that industry's page, `/industries/<slug>` (not in Figma; added at the client's request). One dynamic route (`app/industries/[slug]`) renders `IndustryHero` + `IndustryJourney` (6 numbered steps, styled like the Users "How TruePas works" grid) + `CtaBanner` from `lib/industries/<slug>.ts`; add an industry by adding a file there and a key in `lib/industries/index.ts`. All copy except the hero titles (from the Industry Solutions tabs) is draft. Step images are generated with Kimi from `docs/industry-image-prompts.md` (one prompt per step, shared style block), saved as `5-Oct/Industries/<slug>-<n>-<key>.png` and optimised with `node scripts/optimize-images.mjs industries/<slug>` into `public/images/industries/`. Done (13 Oct 2026) for every step of all seven industries. The hero "Talk to Our Team" button opens `/contact?industry=<slug>&inquiry=request-demo#inquiry`, which preselects the industry and inquiry type and shows a per-industry message hint (drafts). The "Read more" button next to it is commented out until there are industry articles to link to; uncomment it in `IndustrySolutions.tsx` and give it the article `href`. The Users Use-cases "Read more" (`users/UseCases.tsx`) is hidden the same way
- Businesses `/businesses` (26 Oct 2026, client request; not in Figma): the Industry Solutions section moved off Enterprises into its own page, linked as the 4th navbar tab "Businesses" (`components/sections/businesses/IndustrySolutions.tsx`, now the page h1 with navbar-clearing top padding). The Enterprises hero "Explore Solutions" button links there, and `/industries/<slug>` pages highlight the Businesses tab. Not added to the footer.
- Enterprises `/` — DONE (all 13 sections, responsive, committed)
- Users `/users` — DONE (all 12 sections; Phase A committed `56da2b1`, Phase B = Use-cases, Numbers, App features, Security & Privacy, Testimonials, FAQ, Team, CTA). Draft copy (non-Airports tabs, App feature answers 2–10, FAQ answers 2–4, "Global Certification" text) is marked in code and awaits client copy
- Who are we `/who-are-we` — DONE (About, team member grid, CTA; verified against the 720px cache render + Figma bounding boxes)
- Compliances `/compliances` — DONE (single section; extra top padding clears the fixed navbar, section grows so the footer sits at the bottom). Not linked from navbar/footer because Figma has no link to it
- Footer link pages — DONE (not in Figma; design and copy from the client's `truepas-website-pages` package, rebuilt in Tailwind). `/privacy-policy` and `/terms-and-conditions` are verbatim from the client's .docx (9 Oct 2026) via `lib/legal.ts`; the docx drafting notes ("before publication…") are kept as code comments, the Address line is removed at the client's request, and the remaining `[…]` contact placeholders show in a highlighted box until the legal entity details arrive. `/cookie-policy` is the package's draft plus the cookie audit of 11 Oct 2026: the site sets no cookies itself, only the Calendly popup sets third-party ones (`__cf_bm`, `_cfuvid`, `OptanonConsent`, Stripe `m`), listed in section 7. The review badges, the table's Examples/Duration columns and the cookie contact placeholder are removed at the client's request (section 11 points to the Contact page); re-audit when any analytics or marketing tool is added. The cookie consent banner, the footer "Cookie Settings" button and section 9 "Managing Cookie Preferences" (category table + preferences panel) were removed at the client's request (11 Oct 2026); a consent banner is needed again before adding any optional cookies. `/contact` = hero, inquiry form + Business Inquiry panel, How It Works; `ContactForm` posts each inquiry from the visitor's browser straight to FormSubmit, which emails it to truepasai@gmail.com (`INBOX` constant; no account, no API route). FormSubmit blocks server-side requests from Vercel (they fail with 502), so it must stay client-side. Activation is per inbox and per domain: the first inquiry from a new domain triggers an "Activate Form" email and fails until its link is clicked (done for localhost and truepas-blond.vercel.app on 12 Oct 2026; needed again on the final domain). Inquiry data passes through FormSubmit; the client chose it over Google Apps Script or SMTP (12 Oct 2026). `/blogs` and `/blogs/[slug]` (currently hidden, see above) use draft posts (`lib/blog-posts.ts`) until the client's articles arrive; their covers reuse site photos (`image` per post) until article artwork arrives. Every "Download the app" button (`components/ui/DownloadButton.tsx`, plus the footer link) opens the "Download and Sign Up" popup (`components/ui/DownloadDialog.tsx`, mounted once in the root layout) with App Store and Google Play badges; each badge shows "Coming soon" until `APP_STORE_URL` / `PLAY_STORE_URL` in `components/ui/StoreLinks.tsx` is set (22 Oct 2026). The App features and Users hero "Download the app" buttons were removed on request, and Use cases shows the same store badges (`StoreBadges`) instead of its button; the hero's "Available on" Apple and Google Play icons are links to the stores (a "coming soon" notice until the URLs are set, 23 Oct 2026)
- Brand video — DONE: `VideoPlayer` (Enterprises "Why TruePas", Users hero) shows the 2:00 poster frame and plays `public/videos/truepas-brand.mp4` in a dialog
- Images (5-Oct delivery + revisions in the same Drive folder) — placed: Enterprises Hero, the 3 Fold 2 steps (Set 1, chosen by us at the user's request: one character, matches the step copy; "Image 2/3" are taken as Set 1), all 7 Merchant Benefits, all 7 Industry tabs, Integrations (diagram sent directly by the client, kept in `5-Oct/Direct/`, shown with `contain`), Dashboard, Team (shared section, also on Users); Who are we About ("About Us.jpg", delivered in the For Enterprises folder); Users Hero, 6 enrollment steps, 6 use-case tabs, all 10 App features (Multi-Venue: the user picked the version without the "1" suffix). Tab/accordion images use `PhotoSwap`. Quicker Check-In, Higher Throughput, Hotels and Stadiums show third-party branding (Spotify, Hertz/Avis/Budget/Enterprise, Hilton, FC Barcelona); the user chose to use them as delivered (8 Oct 2026). The Fold 2 logo box is built in code with the final logo. All requirement-doc images are placed. Waiting (from the client, not the designer): Who are we team member headshots (480×480 square) with names, designations and LinkedIn links; the TeamMembers section is hidden until they arrive
- Still to do when a FIGMA_TOKEN is available: export 1440 section renders to `design-ref/who-are-we` + `design-ref/compliances` for pixel diffs. All remaining copy (Name/Designation, Compliance name, drafts) awaits the client

Gotchas: project lives in OneDrive (slow file ops, occasional stale dev-server lock — kill the PID and restart `npm run dev`); port 3000 may be held by a zombie `next dev`; stray `package-lock.json` in `C:\Users\Administrator` triggers a harmless Next.js warning.
