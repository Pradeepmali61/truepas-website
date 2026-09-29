import Button from "@/components/ui/Button";

export default function CtaBanner() {
  return (
    <section className="bg-linear-to-b from-white to-sky-200 px-40 py-10">
      <div className="container-page glass flex h-64 flex-col items-center justify-center gap-10 rounded-2xl px-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-[32px] leading-[48px] font-bold">See TruePas in Action</h2>
          <p className="text-base leading-6">Ready to eliminate friction across your venues? Talk to our team.</p>
        </div>
        <Button icon>Request demo</Button>
      </div>
    </section>
  );
}
