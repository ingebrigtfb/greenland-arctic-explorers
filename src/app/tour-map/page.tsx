import type { Metadata } from "next";
import TourMap from "@/components/TourMap";

export const metadata: Metadata = {
  title: "Tour Map — Greenland Arctic Xplorers",
  description:
    "Interactive map of all expedition routes and destinations across Greenland.",
};

export default function TourMapPage() {
  return <TourMap />;
}
