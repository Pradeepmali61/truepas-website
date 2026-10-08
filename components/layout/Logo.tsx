import Link from "next/link";
import BrandLogo from "@/components/ui/BrandLogo";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center" aria-label="TruePas home">
      <BrandLogo height={29} className="h-[29px]" eager />
    </Link>
  );
}
