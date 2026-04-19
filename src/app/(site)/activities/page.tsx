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
      <div className="relative overflow-hidden pb-24 pt-40 min-h-[420px]">
        <div className="absolute inset-0">
          <Image
            src="/activities.png"
            alt="Greenland arctic landscape"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-arctic-navy/75" />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
          <p className="mb-3 font-heading text-xs font-600 uppercase tracking-[0.15em] text-arctic-orange">
            Things To Do
          </p>
          <h1 className="mb-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-800 leading-tight text-white">
            Activities
          </h1>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-frost">
            From dog sledding and glacier hikes to kayaking and Northern Lights excursions — find the perfect Arctic activity for your adventure.
          </p>
        </div>

        <div className="absolute -bottom-px left-0 right-0 z-20">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60 C240 120 480 0 720 60 C960 120 1200 0 1440 60 L1440 120 L0 120Z"
              className="fill-frost-light"
            />
          </svg>
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
