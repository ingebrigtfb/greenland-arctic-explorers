import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ExploreTerritory from "@/components/ExploreTerritory";
import FeaturedTours from "@/components/FeaturedTours";
import UpcomingEvents from "@/components/UpcomingEvents";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Expedition Tours & Adventures in Greenland",
  description:
    "Discover Greenland with Arctic expedition tours, endurance races, guided adventures, and remote Arctic lodges. Book your unforgettable trip with Greenland Arctic Xplorers.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Greenland Arctic Xplorers — Expedition Tours & Adventures",
    description:
      "Discover Greenland with Arctic expedition tours, endurance races, guided adventures, and remote Arctic lodges.",
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <UpcomingEvents />
      <ExploreTerritory />
      <FeaturedTours />
      <CTASection />
    </>
  );
}
