"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const lodges = [
  {
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
    badge: "Sleeps 6",
    title: "Icefjord Cabin",
    description:
      "A cosy timber lodge overlooking the Ilulissat Icefjord with panoramic views of calving glaciers.",
    price: "$320 / night",
  },
  {
    image:
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80",
    badge: "Sleeps 4",
    title: "Aurora Dome",
    description:
      "A glass-roofed geodesic dome designed for northern lights viewing from the warmth of your bed.",
    price: "$410 / night",
  },
  {
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
    badge: "Sleeps 8",
    title: "Fjord Lodge",
    description:
      "A spacious waterfront lodge with a private sauna, kayak dock, and mountain-ringed fjord access.",
    price: "$475 / night",
  },
];

export default function FeaturedTours() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="lodges"
      ref={sectionRef}
      className="bg-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="mb-3 font-heading text-xs font-600 uppercase tracking-[0.15em] text-polar-teal">
            Stay in the Wild
          </p>
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-700 leading-tight text-arctic-navy">
            Arctic Lodges for Rent
          </h2>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {lodges.map((lodge, i) => (
            <article
              key={lodge.title}
              className={`group overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1),0_12px_32px_rgba(0,0,0,0.08)] ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
              style={{
                transitionDelay: visible ? `${i * 120}ms` : "0ms",
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={lodge.image}
                  alt={lodge.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-arctic-navy/80 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-md bg-polar-teal/90 px-3 py-1 font-heading text-[11px] font-600 uppercase tracking-wider text-white backdrop-blur-sm">
                  {lodge.badge}
                </span>
                <h3 className="absolute bottom-4 left-4 right-4 font-heading text-xl font-700 text-white">
                  {lodge.title}
                </h3>
              </div>

              <div className="p-5 lg:p-6">
                <p className="mb-4 font-body text-sm leading-relaxed text-stone">
                  {lodge.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-heading text-lg font-700 text-arctic-navy">
                    {lodge.price}
                  </span>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 font-heading text-[13px] font-600 text-glacier transition-colors hover:text-ice-blue"
                  >
                    Details
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
