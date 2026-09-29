// TruePas symbol (without wordmark). Uses currentColor, so colour it with a text-* class.
// viewBox is 546x404 (≈1.35:1): size it by height and let the width follow, e.g. "h-[22px] w-auto".
export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 546 404" aria-hidden className={`shrink-0 ${className}`} xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M0 0h263c44 0 77 30 77 72 0 14-4 29-11 42L177 404l-76-97 106-195H86L0 0Z" />
      <path fill="currentColor" d="M420 0h93c18 0 33 15 33 32 0 6-2 12-5 18l-15 27c-12 21-39 35-66 35H360L420 0Z" />
    </svg>
  );
}
