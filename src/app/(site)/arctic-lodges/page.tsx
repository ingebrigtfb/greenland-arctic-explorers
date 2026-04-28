import type { Metadata } from "next";
import BokunEventCards from "@/components/BokunEventCards";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Arctic Lodges — Greenland Arctic Xplorers",
  description: "Stay in our remote Arctic lodges surrounded by pristine wilderness.",
};

export default function ArcticLodgesPage() {
  return (
    <section className="bg-frost-light pb-24">
<<<<<<< Updated upstream
      <div className="relative overflow-hidden pb-24 pt-40 min-h-[420px]">
        <div className="absolute inset-0">
          <Image
            src="/races1.JPEG"
            alt="Greenland arctic landscape"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
          <p className="mb-3 font-heading text-xs font-600 uppercase tracking-[0.15em] text-arctic-orange">
            Accommodation
          </p>
          <h1 className="mb-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-800 leading-tight text-white">
            Arctic Lodges
          </h1>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-frost">
            Experience comfort in the heart of the Arctic. Our lodges and cabins offer warm hospitality, stunning views, and a true wilderness retreat after each day&apos;s adventure.
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
=======
      <PageHero
        image="/races2.JPEG"
        alt="Colorful Greenlandic cabins at the edge of a fjord"
        breadcrumb="Arctic Lodges"
        eyebrow="Accommodation"
        title="Arctic Lodges"
        lede="Experience comfort in the heart of the Arctic. Our lodges and cabins offer warm hospitality, stunning fjord views, and a true wilderness retreat after each day's adventure."
        focal="72% 55%"
      />
>>>>>>> Stashed changes

      <BokunEventCards
        tone="lodges"
        viewLabel="View lodge"
        intro={{
          tag: "Stay · All lodges",
          title: "Find your Arctic base camp",
          description:
            "From cedar fjord cabins to full-service wilderness lodges — each stay pairs warm hospitality with access to our guided activities.",
        }}
        fetchUrl="/api/bokun/lodges"
        linkBase="/arctic-lodges"
        emptyTitle="No upcoming lodges"
        emptyDescription="Check back soon for new lodge availability."
      />
    </section>
  );
}
