"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, Calendar } from "lucide-react";
import { getPublishedByDate } from "@/lib/content";
import type { CollectionItem } from "@/lib/types";

function formatPrice(price?: string) {
  if (!price) return null;
  const num = price.replace(/[^\d]/g, "");
  if (!num) return price;
  return `${Number(num).toLocaleString("da-DK")} DKK`;
}

export default function UpcomingEvents() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [events, setEvents] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedByDate("races")
      .then(setEvents)
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

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  function formatDate(dateStr?: string) {
    if (!dateStr) return null;
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "long",
    });
  }

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
          <a
            href="/races"
            className="inline-flex self-start rounded-lg border-2 border-glacier px-5 py-2.5 font-heading text-xs font-600 uppercase tracking-wider text-glacier transition-all hover:bg-glacier hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glacier sm:self-auto"
          >
            View All Events
          </a>
        </div>

        {/* Carousel controls */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-glacier shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all hover:bg-glacier hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glacier lg:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute -right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-glacier shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all hover:bg-glacier hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glacier lg:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Scrollable row */}
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
                    className="min-w-[260px] flex-shrink-0 snap-start animate-pulse rounded-xl bg-white sm:min-w-[280px] h-72"
                  />
                ))
              : events.map((event, i) => (
                  <Link
                    key={event.id}
                    href={`/races/${event.slug}`}
                    className={`group min-w-[260px] flex-shrink-0 snap-start overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glacier sm:min-w-[280px] ${
                      visible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-6 opacity-0"
                    }`}
                    style={{
                      transitionDelay: visible ? `${200 + i * 100}ms` : "0ms",
                    }}
                  >
                    {/* Diagonal image crop */}
                    <div className="relative h-44 overflow-hidden">
                      {event.featuredImage?.url ? (
                        <Image
                          src={event.featuredImage.url}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-glacier/10">
                          <Calendar aria-hidden="true" className="h-8 w-8 text-glacier/40" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-arctic-navy/50 to-transparent" />
                      <div className="absolute -bottom-px left-0 right-0">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 300 30"
                          preserveAspectRatio="none"
                          className="block h-8 w-full"
                        >
                          <polygon points="0,30 300,30 300,0" fill="white" />
                        </svg>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {event.date && (
                        <p className="mb-1.5 font-heading text-sm font-700 text-arctic-orange">
                          {formatDate(event.date)}
                        </p>
                      )}
                      <h3 className="mb-2 font-heading text-[15px] font-600 leading-snug text-arctic-navy">
                        {event.title}
                      </h3>
                      <div className="flex items-center justify-between gap-2">
                        {event.location && (
                          <div className="flex items-center gap-1.5 text-granite">
                            <MapPin aria-hidden="true" className="h-3.5 w-3.5 flex-shrink-0" />
                            <span className="font-body text-xs">
                              {event.location}
                            </span>
                          </div>
                        )}
                        {event.price && (
                          <span className="font-heading text-xs font-700 text-glacier">
                            {formatPrice(event.price)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
