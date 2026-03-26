"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Link from "next/link";
import BokunEventCard, { type BokunEventCardData } from "@/components/BokunEventCard";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

type MapPoint = {
  id: string;
  title: string;
  href: string;
  featuredImageUrl?: string;
  shortDescription?: string;
  price?: number;
  duration?: string;
  location?: string;
  locationName?: string;
  lat: number;
  lng: number;
};

export default function TourMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selected, setSelected] = useState<MapPoint | null>(null);

  useEffect(() => {
    if (!MAPBOX_TOKEN) return;
    if (!mapContainer.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [-42, 68],
      zoom: 3.8,
      minZoom: 3,
      maxZoom: 12,
      pitch: 0,
      attributionControl: false,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.addControl(
      new mapboxgl.AttributionControl({ compact: true }),
      "bottom-right"
    );

    map.on("load", async () => {
      setMapLoaded(true);

      try {
        const res = await fetch("/api/bokun/map");
        const json = await res.json();
        const points: MapPoint[] = Array.isArray(json?.points) ? json.points : [];

        // Clear existing markers if any
        for (const m of markersRef.current) m.remove();
        markersRef.current = [];

        for (const p of points) {
          if (!Number.isFinite(p.lat) || !Number.isFinite(p.lng)) continue;

          const el = document.createElement("div");
          el.className =
            "h-3.5 w-3.5 rounded-full bg-polar-teal ring-2 ring-white shadow-[0_6px_18px_rgba(0,0,0,0.25)]";
          el.style.cursor = "pointer";
          el.addEventListener("click", (e) => {
            e.stopPropagation();
            setSelected(p);
          });

          const marker = new mapboxgl.Marker({ element: el, anchor: "center" })
            .setLngLat([p.lng, p.lat])
            .addTo(map);

          markersRef.current.push(marker);
        }
      } catch {
        // ignore map points failures; map still works
      }
    });

    mapRef.current = map;

    return () => {
      for (const m of markersRef.current) m.remove();
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <div className="fixed inset-0 z-0">
      <div ref={mapContainer} className="h-full w-full" />

      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-frost-light">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-glacier border-t-transparent" />
            <p className="font-heading text-sm font-600 text-glacier">
              Loading map…
            </p>
          </div>
        </div>
      )}

      {!MAPBOX_TOKEN && (
        <div className="absolute inset-0 flex items-center justify-center bg-frost-light">
          <div className="max-w-sm rounded-xl border border-mist bg-white p-6 text-center shadow-lg">
            <p className="mb-2 font-heading text-sm font-600 text-arctic-navy">
              Mapbox Token Required
            </p>
            <p className="font-body text-xs leading-relaxed text-stone">
              Add{" "}
              <code className="rounded bg-frost px-1.5 py-0.5 font-mono text-[11px] text-glacier">
                NEXT_PUBLIC_MAPBOX_TOKEN
              </code>{" "}
              to your{" "}
              <code className="rounded bg-frost px-1.5 py-0.5 font-mono text-[11px] text-glacier">
                .env.local
              </code>{" "}
              file.
            </p>
            <div className="mt-4">
              <Link
                href="/"
                className="inline-flex rounded-lg border-2 border-glacier px-4 py-2 font-heading text-xs font-600 uppercase tracking-wider text-glacier transition-all hover:bg-glacier hover:text-white"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Experience modal */}
      {selected && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-arctic-navy/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />

          <div className="relative mx-4 w-full max-w-md">
            <div className="isolate overflow-hidden rounded-xl bg-white shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
              <BokunEventCard
                disableHover
                onNavigate={() => setSelected(null)}
                ev={
                  {
                    id: selected.id,
                    href: selected.href,
                    title: selected.title,
                    shortDescription: selected.shortDescription,
                    featuredImage: selected.featuredImageUrl
                      ? { url: selected.featuredImageUrl }
                      : undefined,
                    price: selected.price,
                    duration: selected.duration,
                    location: selected.location ?? selected.locationName,
                  } satisfies BokunEventCardData
                }
              />
            </div>

            <div className="mt-3 flex justify-end">
              <button
                onClick={() => setSelected(null)}
                className="rounded-xl bg-white/90 px-4 py-2 font-heading text-xs font-700 uppercase tracking-wider text-arctic-navy shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm hover:bg-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
