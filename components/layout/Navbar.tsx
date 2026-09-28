"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import Logo from "./Logo";

const links = [
  { label: "For Enterprises", href: "/" },
  { label: "For Users", href: "#" },
  { label: "Who are we", href: "#" },
  { label: "Blogs", href: "#" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-40 transition-all duration-300 ${
        scrolled ? "bg-white/70 py-3 shadow-card backdrop-blur-md" : "pt-10"
      }`}
    >
      <div className="container-page grid grid-cols-[1fr_auto_1fr] items-center">
        <div className="justify-self-start">
          <Logo />
        </div>
        <nav className="flex items-center gap-10">
          {links.map((l) =>
            l.href === pathname ? (
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
      </div>
    </header>
  );
}
