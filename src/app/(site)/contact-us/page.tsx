import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Greenland Arctic Xplorers",
  description: "Get in touch with Greenland Arctic Xplorers for bookings and inquiries.",
};

export default function ContactUsPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-40 pb-24 lg:px-12">
      <p className="mb-3 font-heading text-xs font-600 uppercase tracking-[0.15em] text-polar-teal">
        Get In Touch
      </p>
      <h1 className="mb-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-800 leading-tight text-arctic-navy">
        Contact Us
      </h1>
      <p className="max-w-2xl font-body text-lg leading-relaxed text-stone">
        Ready to plan your Arctic adventure? Reach out to our team for
        bookings, custom itineraries, or any questions about our expeditions.
      </p>
    </section>
  );
}
