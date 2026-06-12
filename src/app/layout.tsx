import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SiteStarfield } from "@/components/ui/SiteStarfield";
import { AnnouncementBar } from "@/components/ui/AnnouncementBar";
import { NavBar } from "@/components/ui/NavBar";
import { SITE, SOCIAL_CHANNELS } from "@/lib/constants";
import "./globals.css";

/**
 * Person + WebSite schema injected as JSON-LD. Helps Google understand
 * who runs the site → richer SERP snippet (knowledge panel for the
 * person, sitelinks search box for the site). The shape follows
 * schema.org/Person and schema.org/WebSite verbatim.
 */
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE.url}/#person`,
      name: "David Romualdo",
      alternateName: "dvddev",
      url: SITE.url,
      image: `${SITE.url}${SITE.ogImage}`,
      jobTitle: "Front-end Developer",
      description: SITE.description,
      sameAs: [
        SOCIAL_CHANNELS.linkedinUrl,
        SOCIAL_CHANNELS.instagramUrl,
        "https://upwardbr.com",
      ],
      worksFor: {
        "@type": "Organization",
        name: "Upward",
        url: "https://upwardbr.com",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      publisher: { "@id": `${SITE.url}/#person` },
      inLanguage: ["en", "pt-BR"],
    },
  ],
};

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.brand }],
  creator: SITE.brand,
  keywords: [
    "landing pages",
    "Next.js",
    "React",
    "Tailwind CSS",
    "front-end developer",
    "freelance developer",
    "Upwork",
    "conversion-driven design",
    "portfolio",
    "dvddev",
  ],
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    creator: SITE.twitterHandle,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE.url,
  },
};

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* JSON-LD structured data — see STRUCTURED_DATA above. Inline
            script with no children-array hack works in App Router
            because the HTML is rendered server-side. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </head>
      <body>
        <SmoothScrollProvider>
          <LanguageProvider>
            <ThemeProvider>
              {/* Site chrome — announcement strip above the sticky nav.
                  Both live above the scrolling content; the Hero pulls
                  itself to 100dvh − announcement-bar internally. */}
              <AnnouncementBar />
              <NavBar />

              {/* Site-wide cosmic backdrop. Lives behind every section
                  (Hero's video covers it; everything else is now
                  transparent so the starfield shows through). */}
              <SiteStarfield />
              {children}
            </ThemeProvider>
          </LanguageProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
