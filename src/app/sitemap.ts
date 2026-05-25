import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

/**
 * Single-page site, but the sitemap still helps Google discover the
 * canonical URL + its lastModified date. Anchors are not listed —
 * they're sections of the same document, not separate routes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
