"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Clock, ArrowRight } from "lucide-react";

export type BokunEventCardData = {
  id: string;
  href: string;
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

export default function BokunEventCard({
  ev,
  onNavigate,
  disableHover = false,
}: {
  ev: BokunEventCardData;
  onNavigate?: () => void;
  disableHover?: boolean;
}) {
  return (
    <Link
      href={ev.href}
      onClick={onNavigate}
      className={[
        "group overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-300",
        disableHover
          ? ""
          : "hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]",
      ].join(" ")}
    >
      <div className="relative h-52 overflow-hidden">
        {ev.featuredImage?.url ? (
          <Image
            src={ev.featuredImage.url}
            alt={ev.title}
            fill
            className={[
              "object-cover transition-transform duration-500",
              disableHover ? "" : "group-hover:scale-105",
            ].join(" ")}
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
  );
}

