import Link from "next/link";
import Logo from "./Logo";

const primary = [
  { label: "For Enterprises", href: "/" },
  { label: "Blogs", href: "/blogs" },
  { label: "Who we are", href: "/who-are-we" },
  // The store links live on the Users page until the app store URLs arrive
  { label: "Download the app", href: "/users" },
];
const social = [
  { label: "Linkedin", href: "https://www.linkedin.com/company/truepas/" },
  // Not in Figma; added at the client's request
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61595153494823" },
  { label: "Instagram", href: "#" },
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
                  <Link href={l.href} className="hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className={list}>
              <li>Stay Connected</li>
              {social.map((l) => (
                <li key={l.label}>
                  {/* Social profiles open in a new tab; "#" (no URL yet) stays in place */}
                  <Link
                    href={l.href}
                    {...(l.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                    className="hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-col-reverse gap-4 text-sm leading-[21px] font-medium tracking-[-0.14px] md:flex-row md:justify-between">
          <p>Copyright 2026 TruePas.</p>
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
