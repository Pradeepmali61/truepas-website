import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** Box styling (size, radius, shadow) — same classes a Placeholder would take */
  className?: string;
  /** Rendered width hints for the srcset, e.g. "(min-width: 1024px) 540px, 100vw" */
  sizes: string;
  /** contain = show the whole image (diagrams); cover = fill and crop (photos) */
  fit?: "cover" | "contain";
  /** Above-the-fold images load immediately */
  eager?: boolean;
  /** Extra classes on the <img>, e.g. an edge-fade mask */
  imgClassName?: string;
};

export default function Photo({ src, alt, className = "", sizes, fit = "cover", eager = false, imgClassName = "" }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : undefined}
        fetchPriority={eager ? "high" : undefined}
        className={`${fit === "contain" ? "object-contain" : "object-cover"} ${imgClassName}`}
      />
    </div>
  );
}
