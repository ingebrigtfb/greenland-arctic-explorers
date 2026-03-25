import Image from "next/image";
import BokunEventCards from "@/components/BokunEventCards";

export default function RacesPage() {
  return (
    <section className="bg-frost-light pb-24">
      {/* Page header with background image */}
      <div className="relative overflow-hidden pb-16 pt-40">
        <div className="absolute inset-0">
          <Image
            src="/races2.JPEG"
            alt="Greenland arctic landscape"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
          <div>
            <p className="mb-3 font-heading text-xs font-600 uppercase tracking-[0.15em] text-polar-teal">
              Endurance Events
            </p>
            <h1 className="mb-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-800 leading-tight text-white">
              Races
            </h1>
            <p className="max-w-2xl font-body text-lg leading-relaxed text-white/90">
              Challenge yourself in the world&apos;s most extreme racing
              environments. Trail runs, ultra-marathons, and Arctic endurance
              events set against Greenland&apos;s breathtaking landscapes.
            </p>
          </div>
        </div>
      </div>

      <BokunEventCards
        fetchUrl="/api/bokun/races"
        linkBase="/races"
        emptyTitle="No upcoming races"
        emptyDescription="Check back soon for new events."
      />
    </section>
  );
}
