import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tour Map — Greenland Arctic Xplorers",
  description: "Interactive map of all expedition routes and destinations across Greenland.",
};

export default function TourMapPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-40 pb-24 lg:px-12">
      <p className="mb-3 font-heading text-xs font-600 uppercase tracking-[0.15em] text-polar-teal">
        Explore the Territory
      </p>
      <h1 className="mb-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-800 leading-tight text-arctic-navy">
        Tour Map
      </h1>
      <p className="max-w-2xl font-body text-lg leading-relaxed text-stone">
        Browse our interactive map to discover expedition routes, lodges, and
        points of interest across Greenland&apos;s vast Arctic landscape.
      </p>
    </section>
  );
}
