import { industries } from "@/lib/industries";

// Absolute site URL for metadata, the sitemap and robots.txt. On Vercel this is the production domain (the custom
// domain once one is added), so it needs no change at launch; NEXT_PUBLIC_SITE_URL overrides it elsewhere
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

// Linked, finished pages, for the sitemap and the chat assistant's open_page action. /compliances (unlinked,
// "Compliance name" placeholders) and the hidden Blogs stay out
export const publicRoutes = [
  "/",
  "/users",
  "/who-are-we",
  "/contact",
  ...Object.keys(industries).map((slug) => `/industries/${slug}`),
  "/privacy-policy",
  "/terms-and-conditions",
  "/cookie-policy",
];
