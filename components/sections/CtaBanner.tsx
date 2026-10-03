import BookDemoButton from "@/components/ui/BookDemoButton";

export default function CtaBanner() {
  return (
    <section className="bg-linear-to-b from-white to-sky-200 px-5 py-10 md:px-10">
      <div className="container-page glass flex flex-col items-center justify-center gap-10 rounded-2xl px-6 py-10 md:px-10 lg:h-64 lg:py-0">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-[28px] leading-9 font-bold md:text-[32px] md:leading-[48px]">See TruePas in Action</h2>
          <p className="text-base leading-6">Ready to eliminate friction across your venues? Talk to our team.</p>
        </div>
        <BookDemoButton>Request demo</BookDemoButton>
      </div>
    </section>
  );
}
