import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activities — Greenland Arctic Xplorers",
  description: "Explore Arctic activities from glacier hiking to Northern Lights chasing.",
};

export default function ActivitiesPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-40 pb-24 lg:px-12">
      <p className="mb-3 font-heading text-xs font-600 uppercase tracking-[0.15em] text-polar-teal">
        Things To Do
      </p>
      <h1 className="mb-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-800 leading-tight text-arctic-navy">
        Activities
      </h1>
      <p className="max-w-2xl font-body text-lg leading-relaxed text-stone">
        From glacier hiking and kayaking to dog sledding and Northern Lights
        chasing — discover the full range of Arctic experiences waiting for
        you in Greenland.
      </p>
    </section>
  );
}
