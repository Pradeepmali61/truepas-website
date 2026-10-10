import Link from "next/link";
import Placeholder from "@/components/ui/Placeholder";
import SectionLabel from "@/components/ui/SectionLabel";
import type { BlogPost } from "@/lib/blog-posts";
import { formatDate } from "@/lib/format";

export default function BlogArticle({ post }: { post: BlogPost }) {
  return (
    <section className="flex-1 bg-linear-to-b from-sky-200 to-white px-5 pt-32 pb-16 md:px-10 lg:pt-40 lg:pb-20">
      <article className="mx-auto flex w-full max-w-[760px] flex-col gap-8">
        <Link href="/blogs" className="w-fit text-base leading-6 text-ink-3 hover:text-primary">
          ← All blogs
        </Link>
        <header className="flex flex-col gap-4">
          <SectionLabel>{post.category}</SectionLabel>
          <h1 className="heading-md">{post.title}</h1>
          <p className="text-sm leading-5 text-ink-3/70">
            {formatDate(post.date)} · {post.readMinutes} min read
          </p>
        </header>
        <Placeholder label={`${post.title} cover image`} className="h-56 rounded-2xl md:h-[400px]" />
        <div className="flex flex-col gap-6">
          {post.body.map((b) => (
            <div key={b.heading ?? b.text} className="flex flex-col gap-2">
              {b.heading && <h2 className="text-2xl leading-9 font-semibold">{b.heading}</h2>}
              <p className="text-base leading-7 text-ink-3">{b.text}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
