import Image from "next/image";

type Props = {
  /** One entry per tab/item; undefined = no image yet (the grey placeholder shows) */
  images: ({ src: string; alt: string } | undefined)[];
  active: number;
  /** Box styling (size, radius, shadow) — same classes a Placeholder would take */
  className?: string;
  /** Accessible name while the active entry has no image */
  label?: string;
};

// Every image is stacked in the box and loads with the section, so switching tabs swaps instantly instead of
// waiting for a fetch on each click. Served as-is (unoptimized) like Photo, so zooming in stays sharp.
export default function PhotoSwap({ images, active, className = "", label = "Image placeholder" }: Props) {
  const current = images[active];
  return (
    <div
      role={current ? undefined : "img"}
      aria-label={current ? undefined : label}
      className={`relative overflow-hidden ${current ? "" : "bg-placeholder/80"} ${className}`}
    >
      {images.map(
        (img, i) =>
          img && (
            <Image
              key={img.src}
              src={img.src}
              alt={i === active ? img.alt : ""}
              aria-hidden={i === active ? undefined : true}
              fill
              unoptimized
              className={`object-cover ${i === active ? "" : "invisible"}`}
            />
          ),
      )}
    </div>
  );
}
