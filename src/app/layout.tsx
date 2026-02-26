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

export const metadata: Metadata = {
  title: "Greenland Arctic Xplorers — Expedition Tours & Adventures",
  description:
    "Experience the pristine Arctic wilderness of Greenland. Glacier expeditions, Northern Lights chases, fjord kayaking, and unforgettable adventures in the world's last frontier.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${sora.variable} ${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
