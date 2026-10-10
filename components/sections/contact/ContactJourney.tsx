import SectionLabel from "@/components/ui/SectionLabel";

const steps = [
  { title: "Share Your Requirements", text: "Tell us about your industry, customer journey, systems and operational goals." },
  { title: "Connect With Our Team", text: "We will review your requirements and help identify the right demonstration or discussion." },
  { title: "Experience TruePas", text: "See how one reusable identity can simplify verification, entry and connected services." },
];

export default function ContactJourney() {
  return (
    <section className="section-pad bg-linear-to-b from-white to-sky-200">
      <div className="container-page flex flex-col items-center text-center">
        <SectionLabel>How It Works</SectionLabel>
        <h2 className="heading-lg mt-4">A Simple Path to Seamless Identity</h2>
        <ol className="mt-[38px] grid w-full gap-6 text-left md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="flex min-h-[210px] flex-col gap-3.5 rounded-2xl bg-white p-7 shadow-card-strong">
              <span aria-hidden className="grid size-11 place-items-center rounded-full bg-primary font-bold text-white">
                {i + 1}
              </span>
              <h3 className="text-xl leading-8 font-semibold">{s.title}</h3>
              <p className="text-[15px] leading-6 text-ink-3">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
