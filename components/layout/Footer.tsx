import Link from "next/link";
import Logo from "./Logo";

const primary = [
  { label: "For Enterprises", href: "/" },
  { label: "Blogs", href: "#" },
  { label: "Who we are", href: "#" },
  { label: "Download the app", href: "#" },
];
const social = [
  { label: "Linkedin", href: "#" },
  { label: "Instagram", href: "#" },
];
const legal = ["Privacy Policy", "Terms & Conditions", "Cookie Policy", "Contact"];

const list = "flex gap-8 text-sm leading-[21px] tracking-[-0.14px]";

export default function Footer() {
  return (
    <footer className="bg-sky-200 px-40 pt-20 pb-10">
      <div className="container-page flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <Logo />
          <nav aria-label="Footer" className="flex flex-col items-end gap-6">
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
        <div className="flex justify-between text-sm leading-[21px] font-medium tracking-[-0.14px]">
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
