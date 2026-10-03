---
paths:
  - "app/**/*.tsx"
  - "app/**/*.css"
  - "components/**/*.tsx"
---

# Styling (Tailwind v4)

## Theme
- There is no `tailwind.config.*`. All tokens and custom utilities live in `app/globals.css` (`@theme`, `@utility`). Add new ones there.
- Use the tokens: `primary`, `ink`/`ink-2`/`ink-3`, `accent`, `danger`, `placeholder`, `surface`, `sky-50`/`100`/`200`, `line`/`line-2`/`line-3`, `shadow-card`, `shadow-card-strong`.
- Only `sky-50/100/200` are Figma colors. Other `sky-*` shades are Tailwind defaults; don't use them.
- `rounded-sm` is overridden to 4.6px (Figma), not Tailwind's default.
- A one-off Figma hex inline is fine (`text-[#3194ff]`). If the same value appears a second time, promote it to a `@theme` token.
- Tailwind v4 class names: `bg-linear-to-b` (not `bg-gradient-to-b`), `size-*`, `@media (width >= 64rem)` inside `@utility`.

## Layout and breakpoints
- Mobile-first. Base classes = mobile, `md:` = tablet (768), `lg:` = Figma desktop values (1024+). Never put a Figma desktop pixel value on a base class.
- Standard section shell:
  ```tsx
  <section className="section-pad bg-…">
    <div className="container-page flex flex-col …">
  ```
  Elements that don't use `section-pad` (hero, navbar, footer) get side padding from `px-5 md:px-10` + `container-page`.
- Hero sections add top padding to clear the fixed navbar (`pt-32 … lg:pt-[200px]`).
- Nothing may cause horizontal scroll at 375/768/1024. Edge-to-edge scrollers use negative margins matching the gutter (see `Tabs`).

## Typography
- Section/page headings use `heading-xl` (56), `heading-lg` (48) or `heading-md` (40); they already include weight and responsive sizes. Don't hand-roll heading sizes.
- Always pair a font size with its Figma line-height: `text-sm leading-5`, `text-base leading-6`, `text-xl leading-8`, `text-2xl leading-9`.

## Class composition
- Compose classes with template literals. No `clsx`, `cn` or `tailwind-merge`.
- Variants are object maps keyed by prop (`sizes`, `variants` in `Button`/`Accordion`). Repeated class strings are hoisted to a module `const` (see `list` in `Footer`).
- Components that accept styling take `className = ""` and append it last.
