import Link from "next/link";
import { DownloadLink } from "@/components/ui/DownloadDialog";
import Logo from "./Logo";

const primary: { label: string; href?: string }[] = [
  { label: "For Enterprises", href: "/" },
  // Blogs (app/_blogs) are hidden until the client's articles arrive: { label: "Blogs", href: "/blogs" },
  { label: "Our Vision", href: "/who-are-we" },
  // No href: opens the "Download and Sign Up" dialog with the store badges
  { label: "Download the app" },
];
// Brand-colored icon tiles (icons only, 27 Oct 2026); paths from Simple Icons (CC0)
const social = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/truepas/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="size-[18px]">
        <path
          fill="#0a66c2"
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"
        />
      </svg>
    ),
  },
  // Not in Figma; added at the client's request
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61595153494823",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="size-5">
        <path
          fill="#0866ff"
          d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
        />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/truepasai/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="size-5">
        <defs>
          <linearGradient id="footer-instagram" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#feda75" />
            <stop offset=".3" stopColor="#fa7e1e" />
            <stop offset=".55" stopColor="#d62976" />
            <stop offset=".8" stopColor="#962fbf" />
            <stop offset="1" stopColor="#4f5bd5" />
          </linearGradient>
        </defs>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="url(#footer-instagram)" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="url(#footer-instagram)" strokeWidth="2" />
        <circle cx="17.3" cy="6.7" r="1.2" fill="url(#footer-instagram)" />
      </svg>
    ),
  },
];
const legal = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Contact", href: "/contact" },
];

const list = "flex flex-wrap gap-x-8 gap-y-3 text-sm leading-[21px] tracking-[-0.14px]";

export default function Footer() {
  return (
    <footer className="bg-sky-200 px-5 pt-14 pb-10 md:px-10 lg:pt-20">
      <div className="container-page flex flex-col gap-8 md:gap-6">
        <div className="flex flex-col items-start gap-8 md:flex-row md:justify-between">
          <Logo />
          <nav aria-label="Footer" className="flex flex-col gap-6 md:items-end">
            <ul className={list}>
              {primary.map((l) => (
                <li key={l.label}>
                  {l.href ? (
                    <Link href={l.href} className="hover:text-primary">
                      {l.label}
                    </Link>
                  ) : (
                    <DownloadLink className="hover:text-primary">{l.label}</DownloadLink>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 text-sm leading-[21px] tracking-[-0.14px]">
              <span>Stay Connected</span>
              <ul className="flex items-center gap-3">
                {social.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`TruePas on ${l.label}`}
                      className="flex size-10 items-center justify-center rounded-xl bg-white shadow-card transition-transform hover:-translate-y-0.5"
                    >
                      {l.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
        <div className="flex flex-col-reverse gap-4 text-sm leading-[21px] font-medium tracking-[-0.14px] md:flex-row md:justify-between">
          <p>Copyright © 2026 TruePas.</p>
          <ul className={list}>
            {legal.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
