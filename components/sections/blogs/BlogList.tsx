import Link from "next/link";
import Placeholder from "@/components/ui/Placeholder";
import SectionLabel from "@/components/ui/SectionLabel";
import { posts } from "@/lib/blog-posts";
import { formatDate } from "@/lib/format";

export default function BlogList() {
  return (
    // Hero-style top padding clears the fixed navbar
    <section className="flex-1 bg-linear-to-b from-sky-200 to-white px-5 pt-32 pb-16 md:px-10 lg:pt-40 lg:pb-20">
      <div className="container-page flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h1 className="heading-xl">Blogs</h1>
          <p className="max-w-[540px] text-base leading-6 text-ink-3">
            Insights on biometric identity, privacy and building seamless customer journeys.
          </p>
        </div>
        <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blogs/${p.slug}`} className="group flex h-full flex-col gap-5 rounded-2xl bg-white p-4 shadow-card transition-shadow hover:shadow-card-strong">
                <Placeholder label={`${p.title} cover image`} className="h-48 rounded-lg" />
                <div className="flex flex-1 flex-col gap-3">
                  <SectionLabel className="text-sm leading-6">{p.category}</SectionLabel>
                  <h2 className="text-xl leading-8 font-semibold group-hover:text-primary">{p.title}</h2>
                  <p className="text-base leading-6 text-ink-3">{p.excerpt}</p>
                  <p className="mt-auto pt-2 text-sm leading-5 text-ink-3/70">
                    {formatDate(p.date)} · {p.readMinutes} min read
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
