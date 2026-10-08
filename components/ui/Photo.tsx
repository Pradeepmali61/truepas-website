import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** Box styling (size, radius, shadow) — same classes a Placeholder would take */
  className?: string;
  /** contain = show the whole image (diagrams); cover = fill and crop (photos) */
  fit?: "cover" | "contain";
  /** Above-the-fold images load immediately */
  eager?: boolean;
  /** Extra classes on the <img>, e.g. an edge-fade mask */
  imgClassName?: string;
};

// Served as-is (unoptimized): scripts/optimize-images.mjs already made the WebP, and the full-size file keeps
// zoomed-in images sharp instead of stretching a screen-sized, re-compressed copy
export default function Photo({ src, alt, className = "", fit = "cover", eager = false, imgClassName = "" }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        loading={eager ? "eager" : undefined}
        fetchPriority={eager ? "high" : undefined}
        className={`${fit === "contain" ? "object-contain" : "object-cover"} ${imgClassName}`}
      />
    </div>
  );
}
