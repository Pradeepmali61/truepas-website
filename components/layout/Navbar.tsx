import Link from "next/link";
import Button from "@/components/ui/Button";
import Logo from "./Logo";

const links = [
  { label: "For Enterprises", href: "/" },
  { label: "For Users", href: "#" },
  { label: "Who are we", href: "#" },
  { label: "Blogs", href: "#" },
];

export default function Navbar({ active = "For Enterprises" }: { active?: string }) {
  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center">
      <div className="justify-self-start">
        <Logo />
      </div>
      <nav className="flex items-center gap-10">
        {links.map((l) =>
          l.label === active ? (
            <Link key={l.label} href={l.href} aria-current="page" className="glass rounded-lg px-3 py-2 text-base leading-6 font-semibold text-ink-3/80">
              {l.label}
            </Link>
          ) : (
            <Link key={l.label} href={l.href} className="text-base leading-6 text-ink-3 hover:text-primary">
              {l.label}
            </Link>
          ),
        )}
      </nav>
      <Button size="md" icon className="justify-self-end">
        Book a Demo
      </Button>
    </header>
  );
}
