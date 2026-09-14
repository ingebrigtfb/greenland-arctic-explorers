import type { Metadata } from "next";
import BokunEventCards from "@/components/BokunEventCards";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { itemListJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { buildPageMetadata } from "@/lib/site-metadata";
import { listBokunRaces } from "@/lib/bokun";

export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadata({
  title: "Races",
  description:
    "Challenge yourself in Greenland's most extreme racing environments — trail runs, ultra-marathons, and Arctic endurance events.",
  path: "/races",
});

export default async function RacesPage() {
  const items = await listBokunRaces();

  return (
    <section className="bg-frost-light pb-24">
      <JsonLd data={itemListJsonLd(items, "/races", "Races")} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Races", path: "/races" },
        ])}
      />
      <PageHero
        image="/races.jpeg"
        alt="Iceberg against a dark Greenland mountain slope"
        breadcrumb="Races"
        eyebrow="Endurance Events"
        title="Races"
        lede="Challenge yourself in the world's most extreme racing environments. Trail runs, ultra‑marathons and Arctic endurance events set against Greenland's breathtaking landscapes."
        focal="68% center"
      />

      <BokunEventCards
        tone="races"
        viewLabel="View details"
        intro={{
          tag: "Upcoming · All events",
          title: "Find your start line",
        }}
        items={items}
        linkBase="/races"
        emptyTitle="No upcoming races"
        emptyDescription="Check back soon for new events."
      />
    </section>
  );
}
