import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CtaBanner from "@/components/sections/CtaBanner";
import BlogArticle from "@/components/sections/blogs/BlogArticle";
import { posts } from "@/lib/blog-posts";

// Only the posts in lib/blog-posts.ts exist; anything else 404s
export const dynamicParams = false;

// While the route is hidden in app/_blogs there is no generated PageProps<"/blogs/[slug]">; switch back to it on restore
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return post ? { title: `TruePas — ${post.title}`, description: post.excerpt } : {};
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  return (
    <main className="flex flex-1 flex-col">
      <BlogArticle post={post} />
      <CtaBanner />
    </main>
  );
}
