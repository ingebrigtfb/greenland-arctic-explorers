import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ExploreTerritory from "@/components/ExploreTerritory";
import FeaturedTours from "@/components/FeaturedTours";
import UpcomingEvents from "@/components/UpcomingEvents";
import CTASection from "@/components/CTASection";
import { buildPageMetadata } from "@/lib/site-metadata";
import { listBokunHighlights, listBokunLodges } from "@/lib/bokun";

export const revalidate = 3600;

const TITLE = "Greenland Arctic Tours & Expedition Adventures | Greenland Arctic Xplorers";
const DESCRIPTION =
  "Book Greenland tours, Arctic endurance races, guided adventures, and remote Arctic lodges with Greenland Arctic Xplorers. Small-group expeditions led by local Nuuk-based guides.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

export default async function Home() {
  const [highlights, lodges] = await Promise.all([
    listBokunHighlights(),
    listBokunLodges(),
  ]);

  return (
    <>
      <Hero />
      <UpcomingEvents events={highlights.items} mode={highlights.mode} />
      <ExploreTerritory />
      <FeaturedTours lodges={lodges} />
      <CTASection />
    </>
  );
}
