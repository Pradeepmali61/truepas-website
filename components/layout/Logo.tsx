import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="TruePas home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/image-8.svg" alt="" width={31} height={32} />
      <span className="text-2xl leading-[26px] font-bold text-primary">TRUEPAS</span>
    </Link>
  );
}
