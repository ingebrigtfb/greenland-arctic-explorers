import type { Metadata } from "next";
import BokunEventCards from "@/components/BokunEventCards";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { itemListJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { buildPageMetadata } from "@/lib/site-metadata";
import { listBokunLodges } from "@/lib/bokun";

export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadata({
  title: "Arctic Lodges",
  description:
    "Stay in our remote Arctic lodges surrounded by pristine wilderness.",
  path: "/arctic-lodges",
});

export default async function ArcticLodgesPage() {
  const items = await listBokunLodges();

  return (
    <section className="bg-frost-light pb-24">
      <JsonLd data={itemListJsonLd(items, "/arctic-lodges", "Arctic Lodges")} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Arctic Lodges", path: "/arctic-lodges" },
        ])}
      />
      <PageHero
        image="/races2.JPEG"
        alt="Colorful Greenlandic cabins at the edge of a fjord"
        breadcrumb="Arctic Lodges"
        eyebrow="Accommodation"
        title="Arctic Lodges"
        lede="Experience comfort in the heart of the Arctic. Our lodges and cabins offer warm hospitality, stunning fjord views, and a true wilderness retreat after each day's adventure."
        focal="72% 55%"
      />

      <BokunEventCards
        tone="lodges"
        viewLabel="View lodge"
        intro={{
          tag: "Stay · All lodges",
          title: "Find your Arctic base camp",
        }}
        items={items}
        linkBase="/arctic-lodges"
        emptyTitle="No upcoming lodges"
        emptyDescription="Check back soon for new lodge availability."
      />
    </section>
  );
}
