export default function IconBox({ icon }: { icon: string }) {
  return (
    <div className="glass flex size-14 shrink-0 items-center justify-center rounded-sm md:size-[72px]">
      <span className="flex size-8 items-center justify-center">
        {/* Icons keep their natural Figma size; scaled down with the smaller mobile box */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/icons/${icon}.svg`} alt="" className="max-md:scale-[0.875]" />
      </span>
    </div>
  );
}
