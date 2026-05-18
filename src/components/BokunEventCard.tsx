"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Users, ArrowRight } from "lucide-react";

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
  groupSize?: string;
};

export type CardTone = "races" | "activities" | "lodges" | "tours";

const toneMap: Record<CardTone, { accent: string; badge: string; pin: string }> = {
  races:      { accent: "linear-gradient(90deg,#FF6E40,#E55A30)", badge: "#FF6E40", pin: "#5FA8D3" },
  activities: { accent: "linear-gradient(90deg,#2E8BA7,#5FA8D3)", badge: "#2E8BA7", pin: "#5FA8D3" },
  lodges:     { accent: "linear-gradient(90deg,#C9743A,#9A5428)", badge: "#C9743A", pin: "#C9743A" },
  tours:      { accent: "linear-gradient(90deg,#1B4965,#2E8BA7)", badge: "#1B4965", pin: "#5FA8D3" },
};

function formatPrice(price?: string | number) {
  if (!price) return null;
  if (typeof price === "number") return `${price.toLocaleString("da-DK")} DKK`;
  const num = String(price).replace(/[^\d]/g, "");
  if (!num) return String(price);
  return `${Number(num).toLocaleString("da-DK")} DKK`;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return null;
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BokunEventCard({
  ev,
  tone = "races",
  viewLabel = "View details",
  onNavigate,
}: {
  ev: BokunEventCardData;
  tone?: CardTone;
  viewLabel?: string;
  onNavigate?: () => void;
}) {
  const t = toneMap[tone];

  return (
    <Link
      href={ev.href}
      onClick={onNavigate}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-glacier/10 bg-white shadow-[0_1px_3px_rgba(13,27,42,0.06),0_12px_28px_rgba(13,27,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_2px_6px_rgba(13,27,42,0.08),0_24px_56px_rgba(13,27,42,0.14)]"
    >
      <div aria-hidden className="h-1 w-full" style={{ background: t.accent }} />

      <div className="relative h-60 w-full overflow-hidden">
        {ev.featuredImage?.url ? (
          <Image
            src={ev.featuredImage.url}
            alt={ev.title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        ) : (
          <div className="h-full w-full bg-glacier/10" />
        )}

        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,27,42,0.45) 0%, rgba(13,27,42,0) 40%, rgba(13,27,42,0) 60%, rgba(13,27,42,0.55) 100%)",
          }}
        />

        <div className="absolute inset-x-4 top-4 z-[2] flex items-center justify-between gap-2.5">
          {ev.date && (
            <span
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-heading text-[10px] font-700 uppercase tracking-[0.15em] text-white shadow-[0_4px_14px_rgba(13,27,42,0.25)]"
              style={{ background: t.badge }}
            >
              {formatDate(ev.date)}
            </span>
          )}
          {ev.price && (
            <span className="rounded-lg bg-white/95 px-3 py-1.5 font-heading text-[11px] font-700 text-arctic-navy backdrop-blur-sm">
              {formatPrice(ev.price)}
            </span>
          )}
        </div>

        <div className="absolute inset-x-5 bottom-[18px] z-[2]">
          {ev.location && (
            <div className="mb-1.5 inline-flex items-center gap-1.5 font-heading text-[10px] font-600 uppercase tracking-[0.2em] text-frost">
              <span
                aria-hidden
                className="h-1 w-1 rounded-full"
                style={{ background: t.pin, boxShadow: `0 0 8px ${t.pin}cc` }}
              />
              {ev.location}
            </div>
          )}
          <h3 className="m-0 font-display text-xl font-700 leading-[1.15] tracking-[-0.01em] text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.4)]">
            {ev.title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3.5 p-5 pb-[22px] pt-[20px]">
        {ev.shortDescription && (
          <p className="m-0 line-clamp-2 font-body text-sm leading-relaxed text-stone">
            {ev.shortDescription}
          </p>
        )}

        <div className="flex items-center gap-3.5 border-y border-mist py-2.5">
          {ev.duration && tone !== "lodges" && (
            <span className="inline-flex items-center gap-1.5 font-body text-xs font-500 text-granite">
              <Clock className="h-3.5 w-3.5 text-polar-teal" />
              {ev.duration}
            </span>
          )}
          {ev.location && (
            <>
              <span aria-hidden className="h-3.5 w-px bg-mist" />
              <span className="inline-flex items-center gap-1.5 font-body text-xs font-500 text-granite">
                <MapPin className="h-3.5 w-3.5 text-polar-teal" />
                {ev.location}
              </span>
            </>
          )}
          {ev.groupSize && (
            <>
              <span aria-hidden className="h-3.5 w-px bg-mist" />
              <span className="inline-flex items-center gap-1.5 font-body text-xs font-500 text-granite">
                <Users className="h-3.5 w-3.5 text-polar-teal" />
                {ev.groupSize}
              </span>
            </>
          )}
        </div>

        <div className="mt-auto flex items-center">
          <span className="inline-flex items-center gap-1.5 font-heading text-[13px] font-600 text-glacier transition-colors group-hover:text-polar-teal">
            {viewLabel}
            <ArrowRight className="h-3.5 w-3.5 text-arctic-orange transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
