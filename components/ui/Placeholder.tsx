type Props = { className?: string; label?: string };

// Grey stand-in for images that are still checkerboard placeholders in Figma
export default function Placeholder({ className = "", label = "Image placeholder" }: Props) {
  return <div role="img" aria-label={label} className={`bg-placeholder/80 ${className}`} />;
}
