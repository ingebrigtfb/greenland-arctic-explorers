import type { Metadata } from "next";
import BokunEventCards from "@/components/BokunEventCards";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Activities — Greenland Arctic Xplorers",
  description: "Explore Arctic activities from glacier hiking to Northern Lights chasing.",
};

export default function ActivitiesPage() {
  return (
    <section className="bg-frost-light pb-24">
      <PageHero
        image="/races1.JPEG"
        alt="Kayak and boat beside an iceberg in a Greenland fjord"
        breadcrumb="Activities"
        eyebrow="Things To Do"
        title="Activities"
        lede="From dog sledding and glacier hikes to kayaking and Northern Lights excursions — find the perfect Arctic activity for your adventure."
        focal="62% center"
      />

      <BokunEventCards
        tone="activities"
        viewLabel="View details"
        intro={{
          tag: "Browse · All experiences",
          title: "Pick your Arctic moment",
        }}
        fetchUrl="/api/bokun/activities"
        linkBase="/activities"
        emptyTitle="No upcoming activities"
        emptyDescription="Check back soon for new activity dates."
      />
    </section>
  );
}
