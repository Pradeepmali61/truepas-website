// Solid brand-blue tile with a white icon (client request, 19 Oct 2026; Figma had a glass tile with a black icon).
// The Figma SVG is drawn black, so it is applied as a mask over a white fill instead of shown as an <img>
export default function IconBox({ icon }: { icon: string }) {
  const mask = `url(/icons/${icon}.svg) center / contain no-repeat`;
  return (
    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[#2b8fff] to-[#0062d6] shadow-[0_8px_20px_rgba(0,122,255,0.3)] md:size-[72px]">
      <span aria-hidden className="size-7 bg-white md:size-8" style={{ mask, WebkitMask: mask }} />
    </div>
  );
}
