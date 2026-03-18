import type { Metadata } from "next";
import BokunEventCards from "@/components/BokunEventCards";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Arctic Lodges — Greenland Arctic Xplorers",
  description: "Stay in our remote Arctic lodges surrounded by pristine wilderness.",
};

export default function ArcticLodgesPage() {
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
            Accommodation
          </p>
          <h1 className="mb-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-800 leading-tight text-white">
            Arctic Lodges
          </h1>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-frost">
            Experience comfort in the heart of the Arctic. Our lodges and cabins offer warm hospitality, stunning views, and a true wilderness retreat after each day&apos;s adventure.
          </p>
        </div>
      </div>

      <BokunEventCards
        fetchUrl="/api/bokun/lodges"
        linkBase="/arctic-lodges"
        emptyTitle="No upcoming lodges"
        emptyDescription="Check back soon for new lodge availability."
      />
    </section>
  );
}
