"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Users, Home } from "lucide-react";
import { getPublishedItems } from "@/lib/content";
import type { CollectionItem } from "@/lib/types";

export default function FeaturedTours() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [lodges, setLodges] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedItems("lodges")
      .then(setLodges)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
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
        {/* Header */}
        <div
          className={`mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between transition-all duration-600 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div>
            <p className="mb-2 font-heading text-xs font-600 uppercase tracking-[0.15em] text-polar-teal">
              Stay in the Wild
            </p>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-700 leading-tight text-arctic-navy">
              Arctic Lodges for Rent
            </h2>
          </div>
          <a
            href="/arctic-lodges"
            className="inline-flex self-start rounded-lg border-2 border-glacier px-5 py-2.5 font-heading text-xs font-600 uppercase tracking-wider text-glacier transition-all hover:bg-glacier hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glacier sm:self-auto"
          >
            View All Lodges
          </a>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {loading
            ? [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-96 animate-pulse rounded-xl bg-frost-light"
                />
              ))
            : lodges.map((lodge, i) => (
                <article
                  key={lodge.id}
                  className={`group overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] ${
                    visible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: visible ? `${150 + i * 120}ms` : "0ms",
                  }}
                >
                  {/* Image area */}
                  <div className="relative h-64 overflow-hidden sm:h-72">
                    {lodge.featuredImage?.url ? (
                      <Image
                        src={lodge.featuredImage.url}
                        alt={lodge.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-glacier/10">
                        <Home aria-hidden="true" className="h-10 w-10 text-glacier/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-arctic-navy/40 to-transparent" />

                    {/* Badge + price floating on image */}
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                      {lodge.duration && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-polar-teal/90 px-3 py-1.5 font-heading text-xs font-600 uppercase tracking-wider text-white backdrop-blur-sm">
                          <Users aria-hidden="true" className="h-3 w-3" />
                          {lodge.duration}
                        </span>
                      )}
                      {lodge.price && (
                        <span className="rounded-lg bg-white/90 px-3 py-1.5 font-heading text-xs font-700 text-arctic-navy backdrop-blur-sm">
                          {lodge.price}
                        </span>
                      )}
                    </div>

                    {/* Diagonal clip */}
                    <div className="absolute -bottom-px left-0 right-0">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 400 30"
                        preserveAspectRatio="none"
                        className="block h-8 w-full"
                      >
                        <polygon points="0,30 400,30 400,0" fill="white" />
                      </svg>
                    </div>
                  </div>

                  {/* Content area */}
                  <div className="p-6">
                    <h3 className="mb-2 font-heading text-lg font-700 text-arctic-navy">
                      {lodge.title}
                    </h3>
                    {lodge.shortDescription && (
                      <p className="mb-5 font-body text-sm leading-relaxed text-stone">
                        {lodge.shortDescription}
                      </p>
                    )}
                    <a
                      href={`/arctic-lodges/${lodge.slug}`}
                      className="inline-flex items-center gap-1.5 font-heading text-[13px] font-600 text-glacier transition-colors hover:text-polar-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glacier rounded"
                    >
                      View Details
                      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
}
