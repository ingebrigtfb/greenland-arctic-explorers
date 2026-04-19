"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BokunRaceCard } from "@/lib/bokun";
import BokunEventCard from "@/components/BokunEventCard";

export default function UpcomingEvents() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [events, setEvents] = useState<BokunRaceCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    fetch("/api/bokun/upcoming")
      .then((r) => r.json())
      .then((data) => setEvents(data?.items ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState);
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [events, loading]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const handleCarouselKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scroll("left");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scroll("right");
    }
  };

  return (
    <section
      id="events"
      ref={sectionRef}
      aria-label="Upcoming Expeditions"
      className="bg-frost-light py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Header */}
        <div
          className={`mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between transition-all duration-600 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div>
            <p className="mb-2 font-heading text-xs font-600 uppercase tracking-[0.15em] text-polar-teal">
              Expeditions, Tours & Highlights
            </p>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-700 leading-tight text-arctic-navy">
              Upcoming Expeditions
            </h2>
          </div>
          {(canScrollLeft || canScrollRight) && (
            <div className="hidden gap-2 sm:flex">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-glacier shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all hover:bg-glacier hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glacier disabled:opacity-30 disabled:cursor-default disabled:hover:bg-white disabled:hover:text-glacier"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-glacier shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all hover:bg-glacier hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glacier disabled:opacity-30 disabled:cursor-default disabled:hover:bg-white disabled:hover:text-glacier"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Carousel */}
        <div>
          <div
            ref={scrollRef}
            role="region"
            aria-label="Expedition cards"
            tabIndex={0}
            onKeyDown={handleCarouselKeyDown}
            className="-mx-2 flex snap-x snap-mandatory gap-5 overflow-x-auto px-2 pb-4 scrollbar-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glacier focus-visible:rounded-xl"
            style={{ scrollbarWidth: "none" }}
          >
            {loading
              ? [1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-[300px] flex-shrink-0 snap-start animate-pulse rounded-xl bg-white sm:w-[360px] lg:w-[390px] h-[460px]"
                  />
                ))
              : events.map((event, i) => (
                  <div
                    key={event.id}
                    className={`w-[300px] flex-shrink-0 snap-start transition-all duration-500 sm:w-[360px] lg:w-[390px] h-[460px] ${
                      visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                    }`}
                    style={{ transitionDelay: visible ? `${200 + i * 100}ms` : "0ms" }}
                  >
                    <BokunEventCard
                      ev={{
                        id: event.id,
                        href: `/${event.collection}/${event.slug}`,
                        title: event.title,
                        shortDescription: event.shortDescription,
                        featuredImage: event.featuredImage,
                        price: event.price,
                        duration: event.duration,
                        location: event.location,
                        date: event.date,
                      }}
                    />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
