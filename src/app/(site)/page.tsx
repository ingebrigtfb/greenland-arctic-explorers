import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ExploreTerritory from "@/components/ExploreTerritory";
import FeaturedTours from "@/components/FeaturedTours";
import UpcomingEvents from "@/components/UpcomingEvents";
import CTASection from "@/components/CTASection";
import { buildOpenGraph } from "@/lib/site-metadata";
import { listBokunUpcoming, listBokunLodges } from "@/lib/bokun";

export const revalidate = 3600;

const TITLE = "Greenland Arctic Tours & Expedition Adventures | Greenland Arctic Xplorers";
const DESCRIPTION =
  "Book Greenland tours, Arctic endurance races, guided adventures, and remote Arctic lodges with Greenland Arctic Xplorers. Small-group expeditions led by local Nuuk-based guides.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: buildOpenGraph({
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
  }),
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default async function Home() {
  const [events, lodges] = await Promise.all([
    listBokunUpcoming(),
    listBokunLodges(),
  ]);

  return (
    <>
      <Hero />
      <UpcomingEvents events={events} />
      <ExploreTerritory />
      <FeaturedTours lodges={lodges} />
      <CTASection />
    </>
  );
}
