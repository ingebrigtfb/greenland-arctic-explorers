"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPublishedByDate } from "@/lib/content";
import type { CollectionItem } from "@/lib/types";
import { MapPin, Calendar, Clock, ArrowRight } from "lucide-react";

function formatPrice(price?: string) {
  if (!price) return null;
  const num = price.replace(/[^\d]/g, "");
  if (!num) return price;
  return `${Number(num).toLocaleString("da-DK")} DKK`;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return null;
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function RacesPage() {
  const [races, setRaces] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedByDate("races")
      .then(setRaces)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-frost-light pb-24">
      {/* Page header with background image */}
      <div className="relative overflow-hidden pb-16 pt-40">
        <div className="absolute inset-0">
          <Image
            src="/races.JPEG"
            alt="Greenland arctic landscape"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-arctic-navy/75" />
        </div>
        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
          <p className="mb-3 font-heading text-xs font-600 uppercase tracking-[0.15em] text-polar-teal">
            Endurance Events
          </p>
          <h1 className="mb-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-800 leading-tight text-white">
            Races
          </h1>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-frost">
            Challenge yourself in the world&apos;s most extreme racing
            environments. Trail runs, ultra-marathons, and Arctic endurance
            events set against Greenland&apos;s breathtaking landscapes.
          </p>
        </div>
      </div>

      {/* Race cards */}
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12 -mt-8">
        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-80 animate-pulse rounded-xl bg-white"
              />
            ))}
          </div>
        ) : races.length === 0 ? (
          <div className="rounded-xl border border-dashed border-mist bg-white p-16 text-center">
            <p className="mb-2 font-heading text-lg font-600 text-arctic-navy">
              No upcoming races
            </p>
            <p className="font-body text-sm text-granite">
              Check back soon for new events.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {races.map((race) => (
              <Link
                key={race.id}
                href={`/races/${race.slug}`}
                className="group overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  {race.featuredImage?.url ? (
                    <Image
                      src={race.featuredImage.url}
                      alt={race.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-glacier/10">
                      <Calendar className="h-10 w-10 text-glacier/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-arctic-navy/40 to-transparent" />

                  {/* Date badge */}
                  {race.date && (
                    <div className="absolute top-4 left-4">
                      <span className="rounded-lg bg-arctic-orange px-3 py-1.5 font-heading text-xs font-700 uppercase tracking-wider text-white">
                        {formatDate(race.date)}
                      </span>
                    </div>
                  )}

                  {/* Price badge */}
                  {race.price && (
                    <div className="absolute top-4 right-4">
                      <span className="rounded-lg bg-white/90 px-3 py-1.5 font-heading text-xs font-700 text-arctic-navy backdrop-blur-sm">
                        {formatPrice(race.price)}
                      </span>
                    </div>
                  )}

                  {/* Diagonal clip */}
                  <div className="absolute -bottom-px left-0 right-0">
                    <svg
                      viewBox="0 0 400 30"
                      preserveAspectRatio="none"
                      className="block h-8 w-full"
                    >
                      <polygon points="0,30 400,30 400,0" fill="white" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-2 font-heading text-lg font-700 text-arctic-navy">
                    {race.title}
                  </h3>

                  {race.shortDescription && (
                    <p className="mb-4 font-body text-sm leading-relaxed text-stone line-clamp-2">
                      {race.shortDescription}
                    </p>
                  )}

                  <div className="mb-5 flex flex-wrap gap-3 text-granite">
                    {race.location && (
                      <span className="inline-flex items-center gap-1.5 font-body text-xs">
                        <MapPin className="h-3.5 w-3.5 text-polar-teal" />
                        {race.location}
                      </span>
                    )}
                    {race.duration && (
                      <span className="inline-flex items-center gap-1.5 font-body text-xs">
                        <Clock className="h-3.5 w-3.5 text-polar-teal" />
                        {race.duration}
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
    </section>
  );
}
