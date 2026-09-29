// Compliances are still "Compliance name" placeholders in Figma
const compliances = ["Compliance name", "Compliance name", "Compliance name", "Compliance name"];

export default function ComplianceList() {
  return (
    // Extra top padding clears the fixed navbar; Figma's frame starts below it
    <section className="section-pad flex-1 bg-sky-50 pt-32 lg:pt-40">
      <div className="container-page flex flex-col items-center gap-12">
        <h1 className="heading-lg text-center">Compliances</h1>
        <ul className="grid w-full grid-cols-2 gap-x-5 gap-y-10 md:gap-x-10 lg:flex lg:justify-between">
          {compliances.map((c, i) => (
            <li key={i} className="flex flex-col gap-6 lg:w-[250px]">
              <div role="img" aria-label={`${c} badge`} className="size-20 rounded-full bg-white/25 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.9),inset_3px_3px_8px_rgba(0,0,0,0.05),2px_2px_16px_rgba(0,0,0,0.12)]" />
              <p className="text-xl leading-8 font-semibold">{c}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
