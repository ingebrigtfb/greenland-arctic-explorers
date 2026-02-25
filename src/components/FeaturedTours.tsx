"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const tours = [
  {
    image:
      "https://images.unsplash.com/photo-1504233529578-6d46baba6d34?auto=format&fit=crop&w=800&q=80",
    badge: "5 Days",
    title: "Glacier Expedition",
    description:
      "Trek across ancient ice formations in the Ilulissat Icefjord, a UNESCO World Heritage site.",
    price: "From $2,495",
  },
  {
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80",
    badge: "3 Nights",
    title: "Northern Lights Chase",
    description:
      "Witness the aurora borealis from remote Arctic camps with expert guides and premium comfort.",
    price: "From $1,895",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    badge: "7 Days",
    title: "Fjord Kayaking",
    description:
      "Paddle through crystalline Arctic waters alongside towering icebergs and remote settlements.",
    price: "From $3,295",
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
      id="expeditions"
      ref={sectionRef}
      className="bg-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="mb-3 font-heading text-xs font-600 uppercase tracking-[0.15em] text-polar-teal">
            Signature Experiences
          </p>
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-700 leading-tight text-arctic-navy">
            Featured Expeditions
          </h2>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {tours.map((tour, i) => (
            <article
              key={tour.title}
              className={`group overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1),0_12px_32px_rgba(0,0,0,0.08)] ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
              style={{
                transitionDelay: visible ? `${i * 120}ms` : "0ms",
              }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-arctic-navy/80 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-md bg-polar-teal/90 px-3 py-1 font-heading text-[11px] font-600 uppercase tracking-wider text-white backdrop-blur-sm">
                  {tour.badge}
                </span>
                <h3 className="absolute bottom-4 left-4 right-4 font-heading text-xl font-700 text-white">
                  {tour.title}
                </h3>
              </div>

              {/* Content */}
              <div className="p-5 lg:p-6">
                <p className="mb-4 font-body text-sm leading-relaxed text-stone">
                  {tour.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-heading text-lg font-700 text-arctic-navy">
                    {tour.price}
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
