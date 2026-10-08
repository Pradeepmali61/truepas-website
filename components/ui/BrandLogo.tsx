import Image from "next/image";

// Final TruePas logo (gradient symbol + navy "TruePas" wordmark) from the client: public/images/truepas-logo.png, 1400×276.
// Served as-is (unoptimized): the full-size PNG stays crisp on 3x screens and when zoomed in.
const RATIO = 1400 / 276;

type Props = {
  /** Largest rendered height in px (sets the width/height attributes). Smaller breakpoints go in className, e.g. "h-11 md:h-[66px]" */
  height: number;
  className?: string;
  /** Above-the-fold logos (navbar) load immediately */
  eager?: boolean;
};

export default function BrandLogo({ height, className = "", eager = false }: Props) {
  return (
    <Image
      src="/images/truepas-logo.png"
      alt="TruePas"
      width={Math.round(height * RATIO)}
      height={height}
      unoptimized
      loading={eager ? "eager" : undefined}
      className={`w-auto ${className}`}
    />
  );
}
