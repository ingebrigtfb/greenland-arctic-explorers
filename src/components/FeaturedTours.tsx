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
      className="bg-white pt-20 pb-0 lg:pt-28 lg:pb-0"
    >
      {/* Section header */}
      <div className="mx-auto mb-12 max-w-[1280px] px-6 text-center lg:px-12">
        <p className="mb-3 font-heading text-xs font-600 uppercase tracking-[0.15em] text-polar-teal">
          Stay in the Wild
        </p>
        <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-700 leading-tight text-arctic-navy">
          Arctic Lodges for Rent
        </h2>
      </div>

      {/* Card grid – full width, no gaps between columns */}
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-y-8 lg:grid-cols-3 lg:gap-0">
        {lodges.map((lodge, i) => (
            <article
              key={lodge.title}
              className={`group relative h-[90vh] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.25),0_18px_45px_rgba(0,0,0,0.45)] transition-shadow duration-500 hover:shadow-[0_6px_16px_rgba(0,0,0,0.35),0_24px_60px_rgba(0,0,0,0.55)] ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
              style={{
                transitionDelay: visible ? `${i * 120}ms` : "0ms",
              }}
            >
              {/* Full-card background image */}
              <Image
                src={lodge.image}
                alt={lodge.title}
                fill
                className="object-cover transition duration-700 ease-out group-hover:brightness-110 group-hover:saturate-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />

              {/* Text overlay inside the box */}
              <div className="relative z-10 flex h-full flex-col justify-between p-5 lg:p-7">
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-md bg-polar-teal/90 px-3 py-1 font-heading text-[11px] font-600 uppercase tracking-wider text-white backdrop-blur-sm">
                    {lodge.badge}
                  </span>
                  <span className="font-heading text-sm font-600 text-frost/90">
                    {lodge.price}
                  </span>
                </div>

                <div>
                  <h3 className="mb-3 font-heading text-2xl font-700 text-white">
                    {lodge.title}
                  </h3>
                  <p className="mb-6 font-body text-sm leading-relaxed text-frost/90">
                    {lodge.description}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 font-heading text-[13px] font-600 text-frost hover:bg-white/18 hover:text-white"
                  >
                    Details
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </article>
        ))}
      </div>
    </section>
  );
}
