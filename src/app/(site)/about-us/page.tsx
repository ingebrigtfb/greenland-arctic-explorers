import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About Us — Greenland Arctic Xplorers",
  description: "Learn about Greenland Arctic Xplorers — our story, mission, and team.",
};

export default function AboutUsPage() {
  return <AboutContent />;
}
