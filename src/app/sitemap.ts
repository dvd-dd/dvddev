import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

/**
 * Lists the home + the four short-URL demo entry points so Google
 * can crawl + index each portfolio piece on its own. The demos are
 * served via rewrites from /portfolio/<slug>-site, but Google only
 * needs the public-facing short URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const demos = ["luxor", "phoenix", "pecaai", "woodframe"];
  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...demos.map((slug) => ({
      url: `${SITE.url}/${slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
