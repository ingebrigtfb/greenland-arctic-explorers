import type { Metadata } from "next";
import TourMap from "@/components/TourMap";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Tour Map",
  description:
    "Interactive map of all expedition routes and destinations across Greenland.",
  path: "/tour-map",
});

export default function TourMapPage() {
  return <TourMap />;
}
