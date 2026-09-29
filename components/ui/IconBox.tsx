export default function IconBox({ icon }: { icon: string }) {
  return (
    <div className="glass flex size-[72px] shrink-0 items-center justify-center rounded-sm">
      <span className="flex size-8 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/icons/${icon}.svg`} alt="" />
      </span>
    </div>
  );
}
