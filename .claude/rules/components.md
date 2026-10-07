---
paths:
  - "app/**/*.tsx"
  - "components/**/*.tsx"
---

# Components and pages

## Where things go
- `components/ui/`: primitives (`Button`, `BookDemoButton`, `LogoMark`, `IconBox`, `SectionLabel`, `Placeholder`, `Photo`, `PhotoSwap`, `Accordion`, `Tabs`, `VideoPlayer`). Reuse these before writing new markup.
- `components/layout/`: `Navbar`, `Footer`, `Logo`. They render only from `app/layout.tsx`.
- `components/sections/<page>/`: sections used by one page (`enterprises`, `users`, `who-are-we`, `compliances`).
- `components/sections/*.tsx`: sections shared across pages. Per-page differences are props (`Testimonials heading=…`), not copies.
- Import with the `@/` alias. A relative import is only for a sibling in the same folder (`./Logo`).

## Pages
- `app/<route>/page.tsx` exports `metadata` (title format `"TruePas — <Page>"`) and a default `<Name>Page` that returns `<main>` containing only section components.
- Each section's root element is `<section>`, rendered as a direct child of `<main>`. `scripts/screenshot.mjs` selects `main > section`; a wrapper breaks per-section screenshots and diffs.
- One `<h1>` per page (in the hero), `<h2>` per section title, `<h3>` for cards/items. Pick the tag for structure and the `heading-*` utility for size.

## Component shape
- One default-exported function component per file, PascalCase filename. Small helpers (icons like `ChatIcon`, `ChevronDown`) are named exports next to their main user.
- Section content lives in a module-level `const` array above the component and is rendered with `.map`. Key by a stable text field (`title`, `label`), not the index.
- Props: inline type for one or two props, `type Props` above the component for more. Document non-obvious props with a `/** */` comment.
- Comments explain *why* (Figma quirks, layout tricks), not what. Keep them as sparse as the existing files.

## Server vs client
- Server components by default. Add `"use client"` only for state, effects or browser APIs.
- Keep the client boundary small: `Tabs` and `Accordion` are client primitives. A section becomes client only when it owns their state (`IndustrySolutions`, `UseCases`, users `AppFeatures`).

## Images and icons
- SVG icons are files in `public/icons/` (kebab-case, exported from Figma), rendered as `<img>` with `{/* eslint-disable-next-line @next/next/no-img-element */}`. `IconBox` takes the bare name (`icon="fingerprint"`).
- Raster images use `next/image`: avatars with explicit `width`/`height`; section photos through `Photo` (`fill` inside the placeholder's box classes, WebP from `scripts/optimize-images.mjs`); a frame whose image follows tabs or accordion items uses `PhotoSwap`, which stacks and preloads every image so switching is instant.
- Inline SVGs use `fill="currentColor"` where they should follow text colour, plus `aria-hidden`.

## Accessibility
- Decorative images get `alt=""`; inline SVGs get `aria-hidden`. Meaningful images (store badges) get real alt text.
- Navigation uses `Link`/`Button` (`Button` renders a `Link`). In-page actions use `<button type="button">`.
- Interactive elements show `focus-visible:outline-primary`. Overlays and menus close on Escape. ARIA id pairs come from `useId()`.
- `Tabs` is controlled: the parent owns `active` and renders the panel with `id={`${id}-panel`}`, `role="tabpanel"`, `aria-labelledby={`${id}-t${active}`}`.
