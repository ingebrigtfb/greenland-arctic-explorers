import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Greenland Arctic Xplorers",
  description: "Learn about Greenland Arctic Xplorers — our story, mission, and team.",
};

export default function AboutUsPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-40 pb-24 lg:px-12">
      <p className="mb-3 font-heading text-xs font-600 uppercase tracking-[0.15em] text-polar-teal">
        Our Story
      </p>
      <h1 className="mb-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-800 leading-tight text-arctic-navy">
        About Us
      </h1>
      <p className="max-w-2xl font-body text-lg leading-relaxed text-stone">
        Founded in 2022, Greenland Arctic Xplorers was born from a passion for
        sharing the raw beauty of the Arctic with the world. Our team of local
        guides and expedition leaders brings decades of combined experience.
      </p>
    </section>
  );
}
