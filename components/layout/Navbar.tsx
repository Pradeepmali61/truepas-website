"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button, { DownloadIcon } from "@/components/ui/Button";
import Logo from "./Logo";

const links = [
  { label: "For Enterprises", href: "/" },
  { label: "For Users", href: "/users" },
  { label: "Who are we", href: "/who-are-we" },
  { label: "Blogs", href: "#" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const solid = scrolled || menuOpen;
  const usersPage = pathname === "/users";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-5 transition-all duration-300 md:px-10 ${
        solid ? `${menuOpen ? "bg-white/95" : "bg-white/70"} py-3 shadow-card backdrop-blur-md` : "pt-6 lg:pt-10"
      }`}
    >
      <div className="container-page flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <div className="justify-self-start">
          <Logo />
        </div>
        <nav aria-label="Main" className="hidden items-center gap-10 lg:flex">
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
        <div className="hidden justify-self-end lg:block">
          <Button size="md" icon={usersPage ? <DownloadIcon className="size-6" /> : true}>
            {usersPage ? "Download the app" : "Book a Demo"}
          </Button>
        </div>
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex size-10 items-center justify-center rounded-lg text-ink-3 hover:bg-white/60 lg:hidden"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Mobile" className="container-page mt-3 flex flex-col gap-1 border-t border-line pt-3 pb-2 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              aria-current={l.href === pathname ? "page" : undefined}
              className={`rounded-lg px-3 py-3 text-base leading-6 text-ink-3 hover:bg-sky-50 ${l.href === pathname ? "font-semibold" : ""}`}
            >
              {l.label}
            </Link>
          ))}
          <Button size="md" icon={usersPage ? <DownloadIcon className="size-6" /> : true} className="mt-2 w-full">
            {usersPage ? "Download the app" : "Book a Demo"}
          </Button>
        </nav>
      )}
    </header>
  );
}
