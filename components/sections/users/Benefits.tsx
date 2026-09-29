import IconBox from "@/components/ui/IconBox";

const benefits = [
  { icon: "apps", title: "Unified identity", text: "Single verification that eliminates friction and grants access across multiple platforms. " },
  { icon: "database-off", title: "Contactless Convenience", text: "Access complete verification without reaching for your phone or documents." },
  { icon: "encrypted", title: "Fraud & Identity-Theft Protection", text: "3D liveness detection blocks spoofing creating a safer environment for every user." },
  { icon: "acute", title: "Sub-3-Second Verification", text: "Real-time biometric matching at any touchpoint, no matter the venue." },
  { icon: "home-work", title: "Works in diverse conditions", text: "Verifies accurately in low-light and various angles also, with masks and glasses" },
  { icon: "sensor-occupied", title: "Efficiency at Scale", text: "A single identity across physical touchpoint that is effortless and eliminates queues. " },
];

export default function Benefits() {
  return (
    <section className="section-pad bg-sky-50">
      <div className="container-page flex flex-col items-center gap-12 lg:gap-16">
        <h2 className="heading-lg text-center">Benefits</h2>
        <div className="grid w-full gap-x-10 gap-y-7 md:grid-cols-2 md:gap-y-9 lg:grid-cols-3 lg:grid-rows-[172px_196px]">
          {benefits.map((b) => (
            <div key={b.title} className="flex gap-4 md:flex-col">
              <IconBox icon={b.icon} />
              <div className="flex flex-col gap-1">
                <h3 className="text-xl leading-8 font-semibold">{b.title}</h3>
                <p className="text-base leading-6 whitespace-pre-wrap">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
