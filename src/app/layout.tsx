import type { Metadata } from "next";
import { Montserrat, Inter, Sora } from "next/font/google";
import Providers from "@/lib/Providers";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site-metadata";

const SITE_DESCRIPTION =
  "Experience the pristine Arctic wilderness of Greenland. Glacier expeditions, Northern Lights chases, fjord kayaking, and unforgettable adventures in the world's last frontier.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Expedition Tours & Adventures`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Greenland tours",
    "Arctic expeditions",
    "Greenland adventures",
    "Northern Lights Greenland",
    "Greenland races",
    "Arctic lodges",
    "Nuuk tours",
  ],
  authors: [{ name: SITE_NAME }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Expedition Tours & Adventures`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Expedition Tours & Adventures`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  icons: {
    icon: "/gax-logo.png",
    apple: "/gax-logo.png",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/gax-logo.png`,
  email: "info@gax.gl",
  sameAs: [
    "https://www.facebook.com/greenlandarcticxplorers",
    "https://www.instagram.com/greenlandarcticxplorers",
    "https://www.youtube.com/@nuukkapextremerunningrace110",
    "https://www.tripadvisor.com/Profile/Roam10565999676",
  ],
  areaServed: {
    "@type": "Country",
    name: "Greenland",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${sora.variable} ${inter.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
