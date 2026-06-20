import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";
import { buildOpenGraph } from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Greenland Arctic Xplorers — our story, mission, and team.",
  alternates: {
    canonical: "/about-us",
  },
  openGraph: buildOpenGraph({
    title: "About Us — Greenland Arctic Xplorers",
    description: "Learn about Greenland Arctic Xplorers — our story, mission, and team.",
    url: "/about-us",
  }),
};

export default function AboutUsPage() {
  return <AboutContent />;
}
