"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { BokunRaceCard } from "@/lib/bokun";

function formatDate(dateStr?: string) {
  if (!dateStr) return null;
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric", year: "numeric",
  });
}

function formatPrice(price?: number) {
  if (!price) return null;
  return `${price.toLocaleString("da-DK")} DKK`;
}

const PAGE_SIZE = 3;

export default function UpcomingEvents() {
  const sectionRef = useRef<HTMLElement>(null);
  const snowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [events, setEvents] = useState<BokunRaceCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch("/api/bokun/upcoming")
      .then((r) => r.json())
      .then((data) => setEvents(data?.items ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = snowRef.current;
    if (!container) return;
    for (let i = 0; i < 28; i++) {
      const s = document.createElement("span");
      s.style.cssText = `
        position:absolute;top:-10px;width:3px;height:3px;border-radius:50%;
        background:rgba(255,255,255,0.85);box-shadow:0 0 6px rgba(255,255,255,0.4);
        left:${Math.random() * 100}%;
        animation:snowFall ${14 + Math.random() * 16}s linear infinite;
        animation-delay:${-Math.random() * 20}s;
        transform:scale(${(0.5 + Math.random() * 1.2).toFixed(2)});
        opacity:${(0.3 + Math.random() * 0.5).toFixed(2)};
      `;
      container.appendChild(s);
    }
    return () => { container.innerHTML = ""; };
  }, []);

  const totalPages = Math.max(1, Math.ceil(events.length / PAGE_SIZE));
  const pageStart = page * PAGE_SIZE;
  const visible3 = events.slice(pageStart, pageStart + PAGE_SIZE);
  const featured = visible3[0];
  const stacked = visible3.slice(1, 3);

  return (
    <section
      id="events"
      ref={sectionRef}
      aria-label="Upcoming Expeditions"
      className="relative overflow-hidden bg-frost-light py-20 lg:py-28"
    >
      <style>{`
        @keyframes auroraBreathe {
          0%   { transform: translateY(0) scale(1); opacity: 0.9; }
          100% { transform: translateY(-24px) scale(1.04); opacity: 0.6; }
        }
        @keyframes snowFall {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          10%  { opacity: 0.9; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(110vh) translateX(40px); opacity: 0; }
        }
      `}</style>

      {/* Aurora haze */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 h-[620px]"
        style={{
          background: `radial-gradient(ellipse 800px 280px at 75% 20%, rgba(95,168,211,0.18), transparent 65%),
                       radial-gradient(ellipse 700px 260px at 15% 10%, rgba(46,139,167,0.10), transparent 60%)`,
          animation: "auroraBreathe 18s ease-in-out infinite alternate",
        }}
      />

      {/* Snow */}
      <div ref={snowRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Header */}
        <div
          className={`mb-10 flex items-end justify-between transition-all duration-700 ${
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
          {totalPages > 1 && (
            <div className="hidden items-center gap-2 sm:flex">
              <span className="mr-1 font-heading text-sm font-500 tabular-nums text-granite">
                {String(page + 1).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
              </span>
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-glacier shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all hover:bg-glacier hover:text-white disabled:cursor-default disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-glacier"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-glacier shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all hover:bg-glacier hover:text-white disabled:cursor-default disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-glacier"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.25fr_1fr]">
            <div className="h-[500px] animate-pulse rounded-xl bg-white" />
            <div className="flex flex-col gap-6">
              <div className="h-[240px] animate-pulse rounded-xl bg-white" />
              <div className="h-[240px] animate-pulse rounded-xl bg-white" />
            </div>
          </div>
        )}

        {/* Asymmetric grid */}
        {!loading && featured && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.25fr_1fr]">
            {/* Featured card */}
            <Link
              href={`/${featured.collection}/${featured.slug}`}
              className={`group block overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] ${
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: visible ? "200ms" : "0ms" }}
            >

              <div className="relative h-[420px] -mb-px overflow-hidden">
                {featured.featuredImage?.url ? (
                  <Image
                    src={featured.featuredImage.url}
                    alt={featured.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full bg-glacier/10" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-arctic-navy/40 to-transparent" />
                {featured.date && (
                  <div className="absolute left-4 top-4">
                    <span className="rounded-lg bg-arctic-orange px-3 py-1.5 font-heading text-xs font-700 uppercase tracking-wider text-white">
                      {formatDate(featured.date)}
                    </span>
                  </div>
                )}
                {featured.price && (
                  <div className="absolute right-4 top-4">
                    <span className="rounded-lg bg-white/90 px-3 py-1.5 font-heading text-xs font-700 text-arctic-navy backdrop-blur-sm">
                      {formatPrice(featured.price)}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0">
                  <svg viewBox="0 0 400 30" preserveAspectRatio="none" className="block h-8 w-full">
                    <polygon points="0,30 400,30 400,0" fill="white" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-2 font-heading text-xl font-700 leading-snug text-arctic-navy">
                  {featured.title}
                </h3>
                {featured.shortDescription && (
                  <p className="mb-4 font-body text-sm leading-relaxed text-stone line-clamp-2">
                    {featured.shortDescription}
                  </p>
                )}
                {(featured.location || featured.duration) && (
                  <div className="mb-5 flex flex-wrap gap-6 border-t border-mist pt-4">
                    {featured.location && (
                      <div>
                        <div className="font-heading text-[10px] font-600 uppercase tracking-[0.1em] text-granite">Location</div>
                        <div className="font-heading text-sm font-700 text-arctic-navy">{featured.location}</div>
                      </div>
                    )}
                    {featured.duration && (
                      <div>
                        <div className="font-heading text-[10px] font-600 uppercase tracking-[0.1em] text-granite">Duration</div>
                        <div className="font-heading text-sm font-700 text-arctic-navy">{featured.duration}</div>
                      </div>
                    )}
                  </div>
                )}
                <span className="inline-flex items-center gap-1.5 font-heading text-[13px] font-600 text-glacier transition-colors group-hover:text-polar-teal">
                  View Details
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>

            {/* Side stack — vertical on lg, horizontal scroll on mobile */}
            {stacked.length > 0 && (
              <div className="flex gap-5 overflow-x-auto pb-2 lg:flex-col lg:gap-6 lg:overflow-visible lg:pb-0" style={{ scrollbarWidth: "none" }}>
                {stacked.map((event, i) => (
                  <Link
                    key={event.id}
                    href={`/${event.collection}/${event.slug}`}
                    className={`group flex w-[80vw] flex-shrink-0 flex-col overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] sm:w-[360px] lg:w-auto lg:flex-1 ${
                      visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                    }`}
                    style={{ transitionDelay: visible ? `${300 + i * 100}ms` : "0ms" }}
                  >
                    <div className="relative h-44 -mb-px overflow-hidden">
                      {event.featuredImage?.url ? (
                        <Image
                          src={event.featuredImage.url}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full bg-glacier/10" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-arctic-navy/40 to-transparent" />
                      {event.date && (
                        <div className="absolute left-3 top-3">
                          <span className="rounded-lg bg-arctic-orange px-2.5 py-1 font-heading text-xs font-700 uppercase tracking-wider text-white">
                            {formatDate(event.date)}
                          </span>
                        </div>
                      )}
                      {event.price && (
                        <div className="absolute right-3 top-3">
                          <span className="rounded-lg bg-white/90 px-2.5 py-1 font-heading text-xs font-700 text-arctic-navy backdrop-blur-sm">
                            {formatPrice(event.price)}
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0">
                        <svg viewBox="0 0 400 30" preserveAspectRatio="none" className="block h-8 w-full">
                          <polygon points="0,30 400,30 400,0" fill="white" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="mb-2 font-heading text-base font-700 leading-snug text-arctic-navy">
                        {event.title}
                      </h3>
                      {event.shortDescription && (
                        <p className="mb-3 font-body text-xs leading-relaxed text-stone line-clamp-2">
                          {event.shortDescription}
                        </p>
                      )}
                      <div className="mb-3 mt-auto flex flex-wrap gap-3 text-granite">
                        {event.location && (
                          <span className="inline-flex items-center gap-1.5 font-body text-xs">
                            <MapPin className="h-3 w-3 text-polar-teal" />
                            {event.location}
                          </span>
                        )}
                        {event.duration && (
                          <span className="inline-flex items-center gap-1.5 font-body text-xs">
                            <Clock className="h-3 w-3 text-polar-teal" />
                            {event.duration}
                          </span>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1.5 font-heading text-[13px] font-600 text-glacier transition-colors group-hover:text-polar-teal">
                        View Details
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {!loading && !featured && (
          <p className="py-12 text-center font-body text-stone">
            No upcoming expeditions right now. Check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
