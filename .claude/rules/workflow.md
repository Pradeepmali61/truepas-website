# Workflow

## Phases and approval
- Work in phases (a section or a small group of sections). Show the result to the user (screenshots at 1440, plus mobile if layout changed) and wait for approval before committing.
- Never commit or push without the user asking. When a page or phase is finished, update "Progress / remaining work" in `HANDOFF.md` in the same commit.

## Definition of done
Run all of these; `next build` no longer lints in Next 16, so lint separately:
1. `npm run lint`
2. `npx tsc --noEmit`
3. `npm run build`
4. `node scripts/screenshot.mjs http://localhost:3000/<route> 1440` and compare side by side with `design-ref/<page>/`
5. At 375, 768 and 1024: `document.documentElement.scrollWidth === innerWidth` (no horizontal scroll)

Report any step you skipped or that failed, with its output.

## Git
- Commit subject: imperative, about 60 chars max, scoped to what changed (`Users page Phase B: Use-cases, App features, FAQ`, `Compact icon lists on mobile`). Use the body for the why.
- Never commit `design-ref/`, `screenshots/`, `out/`, `truepas-offline/` (build/export output), `.env*`, the raw content folders, or any token.

## Dependencies
- Runtime deps are only `next`, `react` and `react-dom`. Ask before adding any package; prefer a few lines of local code (no `clsx`, UI kits or animation libraries).

## Next.js 16
- Before using an API you haven't used in this repo, read it in `node_modules/next/dist/docs/`. Known changes: `next lint` is removed; `middleware.ts` is now `proxy.ts`; `params`/`searchParams` are async; use the global `PageProps<'/route'>` / `LayoutProps<'/route'>` types; Turbopack is the default; dev output lives in `.next/dev`.
- `next dev` rewrites the top block of `AGENTS.md`. Leave it alone; project notes go below it.

## Environment (Windows + OneDrive)
- File operations are slow, and a stale `next dev` can keep the lock or port 3000. Find and kill that node PID rather than switching ports.
- Node scripts must use the Windows temp path (`process.env.TEMP`), not Git Bash's `/tmp`.
