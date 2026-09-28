// Stats are still "Title" placeholders in Figma
const stats = ["Title", "Title", "Title", "Title"];

export default function Numbers() {
  return (
    <section className="bg-primary px-40 py-20">
      <div className="container-page flex flex-col items-center gap-12">
        <h2 className="text-5xl leading-[72px] font-bold text-white">Numbers</h2>
        <div className="flex w-full justify-between">
          {stats.map((s, i) => (
            <div key={i} className="flex w-[250px] flex-col items-center gap-4">
              <div className="size-[72px] rounded-sm bg-white/[0.03] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35),2px_2px_16px_rgba(0,0,0,0.12)]" />
              <p className="text-center text-xl leading-8 font-semibold text-white">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
