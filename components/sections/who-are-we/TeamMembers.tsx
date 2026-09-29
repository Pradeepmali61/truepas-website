import Link from "next/link";
import Placeholder from "@/components/ui/Placeholder";

// Members are still "Name" / "Designation" placeholders in Figma
const members = Array.from({ length: 4 }, () => ({ name: "Name", role: "Designation", linkedin: "#" }));

function LinkedInIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        fill="#2867b2"
      />
    </svg>
  );
}

export default function TeamMembers() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page flex flex-col gap-10">
        <h2 className="heading-xl">The Team Behind TruePas</h2>
        <p className="text-base leading-6 whitespace-pre-line text-ink-3">
          {
            "Our team brings over four decades of combined expertise in enterprise technology leadership across finance, aviation, healthcare, and hospitality, with deep specialization in IT infrastructure, cybersecurity, and large-scale digital transformation. We're equally at home in cloud-native architecture and micro-services, as we are in translating complex technology into measurable business outcomes.\n\nTogether, this experience shapes our strategic vision — built to scale, and designed to be secure."
          }
        </p>
        <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:gap-x-10 lg:grid-cols-4">
          {members.map((m, i) => (
            <li key={i} className="flex flex-col gap-6">
              <Placeholder className="aspect-square w-full max-w-60 rounded-2xl shadow-card-strong" label={`${m.name} photo`} />
              <div className="flex flex-col gap-2 text-ink-3">
                <h3 className="text-xl leading-6 font-semibold">{m.name}</h3>
                <p className="text-base leading-6">{m.role}</p>
              </div>
              <Link href={m.linkedin} aria-label={`${m.name} on LinkedIn`} className="w-fit transition-opacity hover:opacity-80">
                <LinkedInIcon />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
