import type { Metadata } from "next";
import BokunEventCards from "@/components/BokunEventCards";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Arctic Lodges",
  description: "Stay in our remote Arctic lodges surrounded by pristine wilderness.",
  alternates: {
    canonical: "/arctic-lodges",
  },
  openGraph: {
    title: "Arctic Lodges — Greenland Arctic Xplorers",
    description: "Stay in our remote Arctic lodges surrounded by pristine wilderness.",
    url: "/arctic-lodges",
  },
};

export default function ArcticLodgesPage() {
  return (
    <section className="bg-frost-light pb-24">
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
        fetchUrl="/api/bokun/lodges"
        linkBase="/arctic-lodges"
        emptyTitle="No upcoming lodges"
        emptyDescription="Check back soon for new lodge availability."
      />
    </section>
  );
}
