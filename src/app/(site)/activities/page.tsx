import type { Metadata } from "next";
import BokunEventCards from "@/components/BokunEventCards";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Activities — Greenland Arctic Xplorers",
  description: "Explore Arctic activities from glacier hiking to Northern Lights chasing.",
};

export default function ActivitiesPage() {
  return (
    <section className="bg-frost-light pb-24">
      <div className="relative overflow-hidden pb-16 pt-40">
        <div className="absolute inset-0">
          <Image
            src="/races.JPEG"
            alt="Greenland arctic landscape"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-arctic-navy/75" />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
          <p className="mb-3 font-heading text-xs font-600 uppercase tracking-[0.15em] text-polar-teal">
            Things To Do
          </p>
          <h1 className="mb-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-800 leading-tight text-white">
            Activities
          </h1>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-frost">
            From glacier hiking and kayaking to dog sledding and Northern Lights chasing — discover the full range of Arctic experiences waiting for you in Greenland.
          </p>
        </div>
      </div>

      <BokunEventCards
        fetchUrl="/api/bokun/activities"
        linkBase="/activities"
        emptyTitle="No upcoming activities"
        emptyDescription="Check back soon for new activity dates."
      />
    </section>
  );
}
