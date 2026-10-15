// Absolute site URL for metadata, the sitemap and robots.txt. On Vercel this is the production domain (the custom
// domain once one is added), so it needs no change at launch; NEXT_PUBLIC_SITE_URL overrides it elsewhere
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
