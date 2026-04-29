"use client";

import { useEffect, useState } from "react";
import BokunEventCard, { type BokunEventCardData, type CardTone } from "@/components/BokunEventCard";

type BokunListItem = Omit<BokunEventCardData, "href"> & { slug: string };

export type SectionIntro = {
  tag: string;
  title: string;
  description: string;
};

const toneDot: Record<CardTone, string> = {
  races: "#FF6E40",
  activities: "#2E8BA7",
  lodges: "#C9743A",
  tours: "#1B4965",
};

export default function BokunEventCards({
  fetchUrl,
  linkBase,
  emptyTitle,
  emptyDescription,
  tone = "races",
  viewLabel = "View details",
  intro,
}: {
  fetchUrl: string;
  linkBase: string;
  emptyTitle?: string;
  emptyDescription?: string;
  tone?: CardTone;
  viewLabel?: string;
  intro?: SectionIntro;
}) {
  const [items, setItems] = useState<BokunListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(fetchUrl)
      .then((r) => r.json())
      .then((data) => setItems(data?.items ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [fetchUrl]);

  return (
    // Negative top margin lets cards tuck into the hero above.
    <div className="relative z-30 bg-frost-light pt-14 pb-6">
      {intro && (
        <div className="mx-auto mb-9 max-w-[1280px] px-6 lg:px-12">
          <div className="max-w-[720px]">
            <div className="mb-2.5 inline-flex items-center gap-2 font-heading text-[11px] font-700 uppercase tracking-[0.2em] text-polar-teal">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: toneDot[tone] }}
              />
              {intro.tag}
            </div>
            <h2 className="m-0 mb-2.5 font-display text-3xl font-700 tracking-[-0.02em] text-arctic-navy lg:text-4xl">
              {intro.title}
            </h2>
            <p className="m-0 font-body text-[15px] leading-relaxed text-stone">{intro.description}</p>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[460px] animate-pulse rounded-2xl bg-white/80" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-mist bg-white p-16 text-center">
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
              <BokunEventCard
                key={ev.id}
                tone={tone}
                viewLabel={viewLabel}
                ev={{ ...ev, href: `${linkBase}/${ev.slug}` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
