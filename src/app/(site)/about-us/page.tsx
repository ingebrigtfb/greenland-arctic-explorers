import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us",
  description:
    "Learn about Greenland Arctic Xplorers — our story, mission, and team.",
  path: "/about-us",
});

export default function AboutUsPage() {
  return <AboutContent />;
}
