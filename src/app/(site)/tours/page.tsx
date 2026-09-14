import type { Metadata } from "next";
import BokunEventCards from "@/components/BokunEventCards";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { itemListJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { buildOpenGraph } from "@/lib/site-metadata";
import { listBokunTours } from "@/lib/bokun";

export const revalidate = 3600;

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

export default async function ToursPage() {
  const items = await listBokunTours();

  return (
    <section className="bg-frost-light pb-24">
      <JsonLd data={itemListJsonLd(items, "/tours", "Tours")} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Tours", path: "/tours" },
        ])}
      />
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
        items={items}
        linkBase="/tours"
        emptyTitle="No upcoming tours"
        emptyDescription="Check back soon for new tour dates."
      />
    </section>
  );
}
