import type { Metadata } from "next";
import BokunEventCards from "@/components/BokunEventCards";
import PageHero from "@/components/PageHero";
import { buildOpenGraph } from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "Tours",
  description: "Explore our signature Arctic expedition tours across Greenland.",
  alternates: {
    canonical: "/tours",
  },
  openGraph: buildOpenGraph({
    title: "Tours — Greenland Arctic Xplorers",
    description: "Explore our signature Arctic expedition tours across Greenland.",
    url: "/tours",
  }),
};

export default function ToursPage() {
  return (
    <section className="bg-frost-light pb-24">
      <PageHero
        image="/CTAImageSection.JPEG"
        alt="Aerial view of a boat moored beside an iceberg in Greenland"
        breadcrumb="Tours"
        eyebrow="Our Expeditions"
        title="Tours"
        lede="Discover our curated selection of Arctic expeditions — from glacier treks and fjord kayaking to multi‑day wilderness crossings. Each tour is led by expert local guides."
        focal="60% center"
      />

      <BokunEventCards
        tone="tours"
        viewLabel="View tour"
        intro={{
          tag: "Expeditions · All itineraries",
          title: "Multi‑day journeys into the Arctic",
        }}
        fetchUrl="/api/bokun/tours"
        linkBase="/tours"
        emptyTitle="No upcoming tours"
        emptyDescription="Check back soon for new tour dates."
      />
    </section>
  );
}
