"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ExploreTerritory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="explore"
      ref={sectionRef}
      className="relative overflow-hidden bg-ice-gray py-20 lg:py-28"
    >
      {/* Decorative blobs */}
      <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-frost opacity-50 blur-3xl" />
      <div className="absolute -right-10 bottom-20 h-48 w-48 rounded-full bg-ice-blue/10 blur-3xl" />

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-12">
        {/* Text column */}
        <div
          className={`transition-all duration-700 ${
            visible
              ? "translate-x-0 opacity-100"
              : "-translate-x-8 opacity-0"
          }`}
        >
          <p className="mb-3 font-heading text-xs font-600 uppercase tracking-[0.15em] text-polar-teal">
            Your Interactive Map
          </p>
          <h2 className="mb-6 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-700 leading-tight text-arctic-navy">
            Explore Greenland
          </h2>
          <p className="mb-4 max-w-lg font-body text-base leading-relaxed text-stone">
            Locate in one click all the equipment, services and key places of
            the territory. This interactive map allows you to explore the
            regions, find expedition bases, shelters, cultural sites, and
            activity zones.
          </p>
          <p className="mb-8 max-w-lg font-body text-base leading-relaxed text-stone">
            A simple, practical tool to better understand the vast Arctic
            landscape and plan your daily explorations.
          </p>
          <a
            href="#map"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-glacier bg-transparent px-6 py-3 font-heading text-[13px] font-600 uppercase tracking-wider text-glacier transition-all duration-200 hover:bg-glacier hover:text-white active:scale-[0.98]"
          >
            View Interactive Map
          </a>
        </div>

        {/* Map column */}
        <div
          className={`flex justify-center transition-all duration-700 delay-200 ${
            visible
              ? "translate-x-0 opacity-100"
              : "translate-x-8 opacity-0"
          }`}
        >
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-glacier/5 blur-xl" />
            <Image
              src="/greenland_map_colors.png"
              alt="Map of Greenland with highlighted regions"
              width={440}
              height={440}
              className="relative h-[360px] w-auto drop-shadow-lg lg:h-[440px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
