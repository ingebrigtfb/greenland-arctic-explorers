import BokunEventCards from "@/components/BokunEventCards";
import PageHero from "@/components/PageHero";

export default function RacesPage() {
  return (
    <section className="bg-frost-light pb-24">
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
        fetchUrl="/api/bokun/races"
        linkBase="/races"
        emptyTitle="No upcoming races"
        emptyDescription="Check back soon for new events."
      />
    </section>
  );
}
