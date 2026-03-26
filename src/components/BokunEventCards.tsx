"use client";

import { useEffect, useState } from "react";
import BokunEventCard, { type BokunEventCardData } from "@/components/BokunEventCard";

type BokunListItem = Omit<BokunEventCardData, "href"> & { slug: string };

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
            <BokunEventCard
              key={ev.id}
              ev={{ ...ev, href: `${linkBase}/${ev.slug}` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

