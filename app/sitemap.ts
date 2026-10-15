import type { MetadataRoute } from "next";
import { industries } from "@/lib/industries";
import { SITE_URL } from "@/lib/site";

// Linked, finished pages only: /compliances (unlinked, "Compliance name" placeholders) and the hidden Blogs stay out
const routes = [
  "/",
  "/users",
  "/who-are-we",
  "/contact",
  ...Object.keys(industries).map((slug) => `/industries/${slug}`),
  "/privacy-policy",
  "/terms-and-conditions",
  "/cookie-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `${SITE_URL}${route === "/" ? "" : route}` }));
}
