# Figma fidelity

The Figma file is the spec. Page → node map and file key are in `AGENTS.md`; the data pipeline is in `HANDOFF.md`.

## Values
- Take sizes, spacing, colors, radii and type from the Figma node JSON, not from eyeballing the PNG. Check the local cache `%TEMP%\figma\nodes.json` first; only hit the API when it is missing or stale.
- Exact Figma pixel values are expected (`px-[19px]`, `lg:w-[540px]`). Don't round them to the nearest Tailwind step.
- Figma's GLASS effect isn't exposed by the API; always use the `glass` utility, never re-derive it per component.

## Copy
- Copy is verbatim from Figma, including dummy text ("Title", "Name", "Designation", "Company Name"). Do not rewrite, "improve" or correct wording unless the user asks for that specific change.
- When Figma has no copy for an item, write a plausible draft and mark the data array with a comment, e.g. `// Only the first answer has copy in Figma; the rest are drafts pending client review`. Mention drafts in your summary to the user.

## Images
- Checkerboard image areas in Figma → `<Placeholder>` with a descriptive `label` and the Figma box classes (height, radius, shadow). Image ref `ece298d0…` is the checkerboard.
- Keep placeholders until the user explicitly asks for real images (the first images pass was reverted in `bd137eb`). Never import from the raw content folders `First 22-*` / `ForUser 23-*`.

## Links and pages
- Links and buttons use `href="#"` unless the target route exists in `app/`.
- Don't add nav/footer links, pages or sections that aren't in Figma (e.g. `/compliances` is intentionally unlinked).

## Acceptable deltas
Don't chase these in diffs: Figma's 1px overlap between sections, grey placeholder vs checkerboard, font anti-aliasing noise, `glass` approximation.

## Figma API
- The token only ever comes from the `FIGMA_TOKEN` env var. Never write it to a file, commit it, or echo it in command output.
- `/v1/images` (render) returns 429 under bursts: back off 15s+ between retries. Node JSON reads are cheap.
