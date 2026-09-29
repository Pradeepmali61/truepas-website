import Link from "next/link";
import Logo from "./Logo";

const primary = [
  { label: "For Enterprises", href: "/" },
  { label: "Blogs", href: "#" },
  { label: "Who we are", href: "/who-are-we" },
  { label: "Download the app", href: "#" },
];
const social = [
  { label: "Linkedin", href: "#" },
  { label: "Instagram", href: "#" },
];
const legal = ["Privacy Policy", "Terms & Conditions", "Cookie Policy", "Contact"];

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
                  <Link href={l.href} className="hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-col-reverse gap-4 text-sm leading-[21px] font-medium tracking-[-0.14px] md:flex-row md:justify-between">
          <p>Copyright 2026 Company Name.</p>
          <ul className={list}>
            {legal.map((l) => (
              <li key={l}>
                <Link href="#" className="hover:text-primary">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
