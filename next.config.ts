import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Short vanity URLs for the four in-house portfolio demos. Each
   * `/<slug>` rewrites (not redirects) to the actual static HTML
   * sitting in `/public/portfolio/<slug>-site/index.html`, so the
   * browser address bar keeps the clean short form (`dvddev.com/luxor`)
   * while Vercel serves the underlying file.
   *
   * The demos' index.html files reference assets with ABSOLUTE
   * `/portfolio/<slug>-site/...` paths so they continue to resolve
   * correctly under the rewritten URL — no wildcard rewrite needed.
   */
  async rewrites() {
    return [
      { source: "/luxor", destination: "/portfolio/luxor-site/index.html" },
      { source: "/phoenix", destination: "/portfolio/phoenix-site/index.html" },
      { source: "/pecaai", destination: "/portfolio/pecaai-site/index.html" },
      { source: "/woodframe", destination: "/portfolio/woodframe-site/index.html" },
    ];
  },
};

export default nextConfig;
