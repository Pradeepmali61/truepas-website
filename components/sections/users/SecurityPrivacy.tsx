import IconBox from "@/components/ui/IconBox";
import SectionLabel from "@/components/ui/SectionLabel";

const items = [
  {
    icon: "fingerprint",
    title: "Privacy-by-Design Architecture",
    text: "Biometric data is encrypted and stored locally, with strict access controls. No centralized face database.",
  },
  {
    icon: "language",
    title: "Global Certification & Compliance",
    // Figma reads "<Need copy from Anuja/Vishal>"; draft copy pending client review
    text: "Built to align with international privacy, security, and biometric data regulations.",
  },
  {
    icon: "ar-on-you",
    title: "User Control & Transparency",
    text: "Transparent data handling policies, user-controlled deletion, and one simple promise: Your Face, Your Control.",
  },
  { icon: "person-shield", title: "Fraud Protection", text: "3D liveness detection prevents spoofing and identity theft at every checkpoint." },
];

export default function SecurityPrivacy() {
  return (
    <section className="section-pad bg-sky-50">
      <div className="container-page flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-4">
          <SectionLabel>Security &amp; Privacy</SectionLabel>
          <h2 className="heading-lg text-center">Turning compliance into a competitive advantage through a privacy-first approach.</h2>
        </div>
        <div className="grid w-full gap-10 md:grid-cols-2">
          {items.map((it) => (
            <div key={it.title} className="flex flex-col gap-4">
              <IconBox icon={it.icon} />
              <div className="flex flex-col gap-1">
                <h3 className="text-xl leading-8 font-semibold">{it.title}</h3>
                <p className="text-base leading-6">{it.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
