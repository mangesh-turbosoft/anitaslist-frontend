import type { MetadataRoute } from "next";

const base = "https://anitaslist.com"; // TODO: confirm production origin

/** Designed public pages. Stub routes are left out until they have content. */
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/about", "/sample-lists"].map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: "weekly", priority: path === "/" ? 1 : 0.7 }));
}
