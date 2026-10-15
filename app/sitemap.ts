import type { MetadataRoute } from "next";
import { publicRoutes, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({ url: `${SITE_URL}${route === "/" ? "" : route}` }));
}
