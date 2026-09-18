import type { MetadataRoute } from "next";

/** Public marketing routes only; authenticated app pages carry noindex in their own metadata. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/hub", "/lists", "/registries", "/account", "/search", "/styleguide"] }],
    sitemap: "https://anitaslist.com/sitemap.xml",
  };
}
