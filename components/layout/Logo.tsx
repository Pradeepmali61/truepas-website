import Link from "next/link";
import LogoMark from "@/components/ui/LogoMark";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="TruePas home">
      <LogoMark className="h-[22px] w-auto text-primary" />
      <span className="text-2xl leading-[26px] font-bold text-primary">TRUEPAS</span>
    </Link>
  );
}
