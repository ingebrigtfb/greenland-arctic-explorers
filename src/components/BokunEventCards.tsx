"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Clock, ArrowRight } from "lucide-react";

type BokunEventCard = {
  id: string;
  slug: string;
  title: string;
  shortDescription?: string;
  featuredImage?: { url: string };
  price?: number;
  duration?: string;
  location?: string;
  date?: string;
};

function formatPrice(price?: string | number) {
  if (!price) return null;
  if (typeof price === "number") return `${price.toLocaleString("da-DK")} DKK`;
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

export default function BokunEventCards({
  fetchUrl,
  linkBase,
  emptyTitle,
  emptyDescription,
}: {
  fetchUrl: string;
  linkBase: string;
  emptyTitle?: string;
  emptyDescription?: string;
}) {
  const [items, setItems] = useState<BokunEventCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(fetchUrl)
      .then((r) => r.json())
      .then((data) => setItems(data?.items ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [fetchUrl]);

  return (
    <div className="relative z-30 mx-auto max-w-[1280px] px-6 lg:px-12 -mt-8">
      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 animate-pulse rounded-xl bg-white" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-mist bg-white p-16 text-center">
          <p className="mb-2 font-heading text-lg font-600 text-arctic-navy">
            {emptyTitle ?? "No upcoming events"}
          </p>
          <p className="font-body text-sm text-granite">
            {emptyDescription ?? "Check back soon for new events."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((ev) => (
            <Link
              key={ev.id}
              href={`${linkBase}/${ev.slug}`}
              className="group overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            >
              <div className="relative h-52 overflow-hidden">
                {ev.featuredImage?.url ? (
                  <Image
                    src={ev.featuredImage.url}
                    alt={ev.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-glacier/10">
                    <Calendar className="h-10 w-10 text-glacier/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-arctic-navy/40 to-transparent" />

                {ev.date && (
                  <div className="absolute top-4 left-4">
                    <span className="rounded-lg bg-arctic-orange px-3 py-1.5 font-heading text-xs font-700 uppercase tracking-wider text-white">
                      {formatDate(ev.date)}
                    </span>
                  </div>
                )}

                {ev.price && (
                  <div className="absolute top-4 right-4">
                    <span className="rounded-lg bg-white/90 px-3 py-1.5 font-heading text-xs font-700 text-arctic-navy backdrop-blur-sm">
                      {formatPrice(ev.price)}
                    </span>
                  </div>
                )}

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

              <div className="p-6">
                <h3 className="mb-2 font-heading text-lg font-700 text-arctic-navy">
                  {ev.title}
                </h3>

                {ev.shortDescription && (
                  <p className="mb-4 font-body text-sm leading-relaxed text-stone line-clamp-2">
                    {ev.shortDescription}
                  </p>
                )}

                <div className="mb-5 flex flex-wrap gap-3 text-granite">
                  {ev.location && (
                    <span className="inline-flex items-center gap-1.5 font-body text-xs">
                      <MapPin className="h-3.5 w-3.5 text-polar-teal" />
                      {ev.location}
                    </span>
                  )}
                  {ev.duration && (
                    <span className="inline-flex items-center gap-1.5 font-body text-xs">
                      <Clock className="h-3.5 w-3.5 text-polar-teal" />
                      {ev.duration}
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
  );
}

