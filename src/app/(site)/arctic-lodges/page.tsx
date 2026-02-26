import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arctic Lodges — Greenland Arctic Xplorers",
  description: "Stay in our remote Arctic lodges surrounded by pristine wilderness.",
};

export default function ArcticLodgesPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-40 pb-24 lg:px-12">
      <p className="mb-3 font-heading text-xs font-600 uppercase tracking-[0.15em] text-polar-teal">
        Accommodation
      </p>
      <h1 className="mb-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-800 leading-tight text-arctic-navy">
        Arctic Lodges
      </h1>
      <p className="max-w-2xl font-body text-lg leading-relaxed text-stone">
        Experience comfort in the heart of the Arctic. Our lodges and cabins
        offer warm hospitality, stunning views, and a true wilderness retreat
        after each day&apos;s adventure.
      </p>
    </section>
  );
}
