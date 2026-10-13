import type { Metadata } from "next";
import CtaBanner from "@/components/sections/CtaBanner";
import BlogList from "@/components/sections/blogs/BlogList";

export const metadata: Metadata = {
  title: "TruePas — Blogs",
  description: "Insights on biometric identity, privacy and seamless customer journeys from the TruePas team.",
};

export default function BlogsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <BlogList />
      <CtaBanner />
    </main>
  );
}
