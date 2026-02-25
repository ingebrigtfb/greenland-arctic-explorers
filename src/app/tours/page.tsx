import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tours — Greenland Arctic Xplorers",
  description: "Explore our signature Arctic expedition tours across Greenland.",
};

export default function ToursPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-40 pb-24 lg:px-12">
      <p className="mb-3 font-heading text-xs font-600 uppercase tracking-[0.15em] text-polar-teal">
        Our Expeditions
      </p>
      <h1 className="mb-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-800 leading-tight text-arctic-navy">
        Tours
      </h1>
      <p className="max-w-2xl font-body text-lg leading-relaxed text-stone">
        Discover our curated selection of Arctic expeditions — from glacier
        treks and fjord kayaking to multi-day wilderness crossings. Each tour
        is led by expert local guides.
      </p>
    </section>
  );
}
