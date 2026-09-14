import type { Metadata } from "next";
import BokunEventCards from "@/components/BokunEventCards";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { itemListJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { buildPageMetadata } from "@/lib/site-metadata";
import { listBokunActivities } from "@/lib/bokun";

export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadata({
  title: "Adventures",
  description:
    "Explore Arctic adventures from glacier hiking to Northern Lights chasing.",
  path: "/adventures",
});

export default async function ActivitiesPage() {
  const items = await listBokunActivities();

  return (
    <section className="bg-frost-light pb-24">
      <JsonLd data={itemListJsonLd(items, "/adventures", "Adventures")} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Adventures", path: "/adventures" },
        ])}
      />
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
        items={items}
        linkBase="/adventures"
        emptyTitle="No upcoming adventures"
        emptyDescription="Check back soon for new adventure dates."
      />
    </section>
  );
}
