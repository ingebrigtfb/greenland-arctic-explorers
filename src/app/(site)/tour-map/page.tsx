import type { Metadata } from "next";
import TourMap from "@/components/TourMap";

export const metadata: Metadata = {
  title: "Tour Map",
  description:
    "Interactive map of all expedition routes and destinations across Greenland.",
  alternates: {
    canonical: "/tour-map",
  },
  openGraph: {
    title: "Tour Map — Greenland Arctic Xplorers",
    description: "Interactive map of all expedition routes and destinations across Greenland.",
    url: "/tour-map",
  },
};

export default function TourMapPage() {
  return <TourMap />;
}
