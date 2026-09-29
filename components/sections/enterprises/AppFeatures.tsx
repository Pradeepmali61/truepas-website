const features = [
  { icon: "acute", title: "Faster Check-In and Entry", text: "Replace manual document and ticket checks with fast identity recognition." },
  { icon: "arrow-cool-down", title: "Lower Operational Workload", text: "Automate repetitive verification tasks so staff can focus on customer support" },
  { icon: "encrypted", title: "Stronger Fraud Prevention", text: "Verify with true identity, reduce unauthorized access, duplication  and manual errors." },
  { icon: "ar-on-you", title: "Better Customer Experience", text: "Give customers one consistent identity experience across locations and services" },
  { icon: "speed", title: "Increased Customer Throughput", text: "Scan more customers during peak periods with unmatched security and efficiency." },
  { icon: "diamond-shine", title: "Personalized Engagement", text: "Recognize authorized users at the touchpoints." },
  { icon: "open-with", title: "Scalable Deployment", text: "Start with single location and expand across  properties, departments, and journeys." },
];

export function IconBox({ icon }: { icon: string }) {
  return (
    <div className="glass flex size-[72px] shrink-0 items-center justify-center rounded-sm">
      <span className="flex size-8 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/icons/${icon}.svg`} alt="" />
      </span>
    </div>
  );
}

export default function AppFeatures() {
  return (
    <section className="section-pad bg-sky-50">
      <div className="container-page flex flex-col items-center gap-12 lg:gap-16">
        <div className="flex flex-col items-center gap-5 text-center">
          <h2 className="heading-lg">App Features</h2>
          <p className="text-base leading-6">Reduce Friction at Every Stage of the Customer Journey</p>
        </div>
        <div className="grid w-full gap-x-10 gap-y-9 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_196px_auto]">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col gap-4">
              <IconBox icon={f.icon} />
              <div className="flex flex-col gap-1">
                <h3 className="text-xl leading-8 font-semibold">{f.title}</h3>
                <p className="text-base leading-6 whitespace-pre-wrap">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
