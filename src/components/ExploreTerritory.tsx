"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const IMAGES = [
  { src: "/explore-green.JPEG",   alt: "Explore Greenland" },
  { src: "/hero1.JPEG",           alt: "Arctic fjord" },
  { src: "/races1.JPEG",          alt: "Arctic expedition" },
  { src: "/races2.JPEG",          alt: "Greenland landscape" },
  { src: "/CTAImageSection.JPEG", alt: "Arctic adventure" },
];

export default function ExploreTerritory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const prev = useCallback(() => setActive(i => (i - 1 + IMAGES.length) % IMAGES.length), []);
  const next = useCallback(() => setActive(i => (i + 1) % IMAGES.length), []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <section
      id="explore"
      ref={sectionRef}
      className="relative overflow-hidden bg-ice-gray py-20 lg:py-28"
    >
      <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-frost opacity-50 blur-3xl" />
      <div className="absolute -right-10 bottom-20 h-48 w-48 rounded-full bg-ice-blue/10 blur-3xl" />

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-12">

        {/* Text column */}
        <div className={`transition-all duration-700 ${visible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}>
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
            href="/tour-map"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-glacier bg-transparent px-6 py-3 font-heading text-[13px] font-600 uppercase tracking-wider text-glacier transition-all duration-200 hover:bg-glacier hover:text-white active:scale-[0.98]"
          >
            View Interactive Map
          </a>
        </div>

        {/* Stacked carousel — shared between mobile and desktop */}
        <div className={`transition-all duration-700 delay-200 ${visible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}>
          <div
            className="relative select-none"
            style={{ height: 340 }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {IMAGES.map((img, i) => {
              const offset = (i - active + IMAGES.length) % IMAGES.length;
              if (offset > 2) return null;
              const depth = 2 - offset; // 0 = top card
              return (
                <div
                  key={img.src}
                  className="absolute inset-0 overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
                  style={{
                    transform: `translate(${depth * 28}px, ${-depth * 16}px) scale(${1 - depth * 0.07})`,
                    zIndex: 10 - depth,
                    filter: depth > 0 ? `blur(${depth}px)` : "none",
                    opacity: 1 - depth * 0.15,
                    transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1), filter 0.5s ease, opacity 0.5s ease",
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
              );
            })}

            {/* Prev / Next — visible on desktop, hidden on mobile (use swipe) */}
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute -left-5 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.12)] text-arctic-navy transition-all hover:bg-glacier hover:text-white lg:flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute -right-5 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.12)] text-arctic-navy transition-all hover:bg-glacier hover:text-white lg:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-1.5">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-polar-teal" : "w-1.5 bg-mist"}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
