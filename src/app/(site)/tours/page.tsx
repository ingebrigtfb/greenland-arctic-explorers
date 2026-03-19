import type { Metadata } from "next";
import BokunEventCards from "@/components/BokunEventCards";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Tours — Greenland Arctic Xplorers",
  description: "Explore our signature Arctic expedition tours across Greenland.",
};

export default function ToursPage() {
  return (
    <section className="bg-frost-light pb-24">
      {/* Page header with background image (same layout as races) */}
      <div className="relative overflow-hidden pb-24 pt-40">
        <div className="absolute inset-0">
          <Image
            src="/races.JPEG"
            alt="Greenland arctic landscape"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-arctic-navy/75" />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
          <p className="mb-3 font-heading text-xs font-600 uppercase tracking-[0.15em] text-polar-teal">
            Our Expeditions
          </p>
          <h1 className="mb-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-800 leading-tight text-white">
            Tours
          </h1>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-frost">
            Discover our curated selection of Arctic expeditions — from glacier
            treks and fjord kayaking to multi-day wilderness crossings. Each tour
            is led by expert local guides.
          </p>
        </div>

        {/* Wavy bottom divider (same as homepage hero) */}
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
        fetchUrl="/api/bokun/tours"
        linkBase="/tours"
        emptyTitle="No upcoming tours"
        emptyDescription="Check back soon for new tour dates."
      />
    </section>
  );
}
