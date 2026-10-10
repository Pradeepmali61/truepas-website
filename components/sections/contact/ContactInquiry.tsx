import BookDemoButton from "@/components/ui/BookDemoButton";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactForm from "./ContactForm";

const areas = [
  { title: "Enterprise Demonstrations", text: "See how TruePas supports identity verification across locations, teams and customer journeys.", icon: "01" },
  { title: "Integration Discussions", text: "Explore API-first connections with reservation, access, ticketing, CRM and operational systems.", icon: "02" },
  { title: "Strategic Partnerships", text: "Discuss opportunities to deliver connected identity experiences across complementary platforms.", icon: "03" },
  { title: "General Support", text: "Ask questions about TruePas capabilities, implementation requirements or account support.", icon: "04" },
];

export default function ContactInquiry() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page grid gap-[30px] lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
        <ContactForm />
        <aside aria-labelledby="business-inquiry" className="flex flex-col gap-[22px] rounded-2xl border border-line/75 bg-sky-50 p-7 shadow-card-strong md:p-10">
          <div className="flex flex-col items-start">
            <SectionLabel>Business Inquiry</SectionLabel>
            <h2 id="business-inquiry" className="mt-4 mb-3 text-2xl leading-8 font-semibold">
              Talk to the Right TruePas Team
            </h2>
            <p className="text-base leading-6 text-ink-3">
              Whether you are evaluating biometric identity for one location or planning a multi-site deployment, we can help you map the right next step.
            </p>
          </div>
          <ul className="flex flex-col gap-4">
            {areas.map((a) => (
              <li key={a.title} className="flex gap-3">
                <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-sm bg-white font-bold text-primary shadow-card">
                  {a.icon}
                </span>
                <div>
                  <h3 className="mb-0.5 text-[15px] font-semibold">{a.title}</h3>
                  <p className="text-sm leading-[22px] text-ink-3">{a.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <BookDemoButton />
        </aside>
      </div>
    </section>
  );
}
