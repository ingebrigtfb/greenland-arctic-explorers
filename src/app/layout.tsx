import type { Metadata } from "next";
import { Montserrat, Inter, Sora } from "next/font/google";
import Providers from "@/lib/Providers";
import { DEFAULT_OG_IMAGE, SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site-metadata";
import { organizationJsonLd } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Greenland Arctic Tours & Expedition Adventures | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
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
    title: `Greenland Arctic Tours & Expedition Adventures | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `Greenland Arctic Tours & Expedition Adventures | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  icons: {
    icon: "/gax-logo.png",
    apple: "/gax-logo.png",
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
        <JsonLd data={organizationJsonLd()} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
