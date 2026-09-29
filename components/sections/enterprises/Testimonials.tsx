import Image from "next/image";

const testimonials = [
  {
    title: "Seamless User Experience",
    quote:
      "TruePas offers an intuitive interface that simplifies the verification process, allowing users to complete tasks quickly without any technical hassle.",
    name: "Liam Chen",
    role: "Tech Reviewer",
    avatar: "/images/avatar-liam.jpg",
  },
  {
    title: "Reliable Customer Support",
    quote:
      "Their support team is responsive and knowledgeable, providing timely assistance whenever I encountered issues or had questions.",
    name: "Maria Gomez",
    role: "Small Business Owner",
    avatar: "/images/avatar-maria.jpg",
  },
  {
    title: "Enhanced Privacy Controls",
    quote:
      "TruePas gives me control over what personal data is shared and with whom, ensuring my privacy is always respected and managed effectively.",
    name: "David Smith",
    role: "Privacy Advocate",
    avatar: "/images/avatar-david.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white px-40 py-20">
      <div className="container-page flex flex-col items-center gap-10">
        <h2 className="text-center text-5xl leading-[72px] font-bold">What our customers are saying</h2>
        <div className="grid w-full grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <figure key={t.name} className="glass flex flex-col gap-6 rounded-2xl px-8 py-6">
              <div className="flex gap-1.5" role="img" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }, (_, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src="/icons/star-rate.svg" alt="" width={24} height={24} />
                ))}
              </div>
              <h3 className="text-xl leading-8 font-semibold">{t.title}</h3>
              <blockquote className="flex-1 text-base leading-6">{t.quote}</blockquote>
              <figcaption className="flex items-center gap-4">
                <Image src={t.avatar} alt="" width={56} height={56} className="size-14 rounded-full bg-placeholder object-cover" />
                <div className="flex flex-col gap-1">
                  <span className="text-xl leading-8 font-semibold">{t.name}</span>
                  <span className="text-base leading-6">{t.role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
