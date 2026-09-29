// Stats are still "Title" placeholders in Figma
const stats = ["Title", "Title", "Title", "Title"];

export default function Numbers() {
  return (
    <section className="section-pad bg-primary">
      <div className="container-page flex flex-col items-center gap-12">
        <h2 className="heading-lg text-white">Numbers</h2>
        <div className="grid w-full grid-cols-2 gap-y-10 lg:flex lg:justify-between">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-4 lg:w-[250px]">
              <div className="size-[72px] rounded-sm bg-white/[0.03] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35),2px_2px_16px_rgba(0,0,0,0.12)]" />
              <p className="text-center text-xl leading-8 font-semibold text-white">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
