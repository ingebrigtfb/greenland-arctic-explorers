import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Races — Greenland Arctic Xplorers",
  description: "Arctic races and endurance events across Greenland's wilderness.",
};

export default function RacesPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-40 pb-24 lg:px-12">
      <p className="mb-3 font-heading text-xs font-600 uppercase tracking-[0.15em] text-polar-teal">
        Endurance Events
      </p>
      <h1 className="mb-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-800 leading-tight text-arctic-navy">
        Races
      </h1>
      <p className="max-w-2xl font-body text-lg leading-relaxed text-stone">
        Challenge yourself in the world&apos;s most extreme racing environments.
        Trail runs, ultra-marathons, and Arctic endurance events set against
        Greenland&apos;s breathtaking landscapes.
      </p>
    </section>
  );
}
