import type { Metadata } from "next";
import BokunEventCards from "@/components/BokunEventCards";
import PageHero from "@/components/PageHero";
import { buildOpenGraph } from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "Adventures",
  description: "Explore Arctic adventures from glacier hiking to Northern Lights chasing.",
  alternates: {
    canonical: "/adventures",
  },
  openGraph: buildOpenGraph({
    title: "Adventures — Greenland Arctic Xplorers",
    description: "Explore Arctic adventures from glacier hiking to Northern Lights chasing.",
    url: "/adventures",
  }),
};

export default function ActivitiesPage() {
  return (
    <section className="bg-frost-light pb-24">
      <PageHero
        image="/races1.JPEG"
        alt="Kayak and boat beside an iceberg in a Greenland fjord"
        breadcrumb="Adventures"
        eyebrow="Things To Do"
        title="Adventures"
        lede="From glacier hikes to kayaking and Northern Lights excursions — find the perfect Arctic adventure for your trip."
        focal="62% center"
      />

      <BokunEventCards
        tone="activities"
        viewLabel="View details"
        intro={{
          tag: "Browse · All experiences",
          title: "Pick your Arctic moment",
        }}
        fetchUrl="/api/bokun/adventures"
        linkBase="/adventures"
        emptyTitle="No upcoming adventures"
        emptyDescription="Check back soon for new adventure dates."
      />
    </section>
  );
}
