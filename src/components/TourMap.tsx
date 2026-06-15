"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, ArrowRight, ChevronRight, Calendar } from "lucide-react";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

type RoutePoint = { lat: number; lng: number; title?: string };

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
  route?: RoutePoint[];
};

function dotColor(href: string): string {
  if (href.includes("/races/")) return "#FF6E40";       // arctic-orange
  if (href.includes("/tours/")) return "#2E8BA7";       // polar-teal
  if (href.includes("/adventures/")) return "#5FA8D3";  // ice-blue
  return "#1B4965";                                     // glacier (lodges / fallback)
}

function dotColorHover(href: string): string {
  if (href.includes("/races/")) return "rgba(255,110,64,0.35)";
  if (href.includes("/tours/")) return "rgba(46,139,167,0.35)";
  if (href.includes("/adventures/")) return "rgba(95,168,211,0.35)";
  return "rgba(27,73,101,0.35)";
}

type Tooltip = {
  x: number;
  y: number;
  title: string;
  price?: number;
  location?: string;
  locationName?: string;
  duration?: string;
};

function formatPrice(price?: number) {
  if (!price) return null;
  return `${price.toLocaleString("da-DK")} DKK`;
}

function parseGpx(xml: string): [number, number][] {
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  const coords: [number, number][] = [];
  doc.querySelectorAll("trkpt").forEach(pt => {
    const lat = parseFloat(pt.getAttribute("lat") ?? "");
    const lon = parseFloat(pt.getAttribute("lon") ?? "");
    if (Number.isFinite(lat) && Number.isFinite(lon)) coords.push([lon, lat]);
  });
  return coords;
}

export default function TourMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selected, setSelected] = useState<MapPoint | null>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  useEffect(() => {
    if (!MAPBOX_TOKEN) return;
    if (!mapContainer.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [-51.72, 64.18],
      zoom: 9,
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

        for (const m of markersRef.current) m.remove();
        markersRef.current = [];

        for (const p of points) {
          if (!Number.isFinite(p.lat) || !Number.isFinite(p.lng)) continue;

          const color = dotColor(p.href);
          const hoverGlow = dotColorHover(p.href);

          const el = document.createElement("div");
          el.style.cssText =
            `width:14px;height:14px;border-radius:50%;background:${color};` +
            "box-shadow:0 0 0 2px white,0 6px 18px rgba(0,0,0,0.25);" +
            "cursor:pointer;transition:box-shadow 0.15s ease;";

          el.addEventListener("mouseenter", (e) => {
            el.style.boxShadow =
              `0 0 0 2px white,0 0 0 7px ${hoverGlow},0 6px 18px rgba(0,0,0,0.25)`;
            const rect = el.getBoundingClientRect();
            setTooltip({
              x: rect.left + rect.width / 2,
              y: rect.top,
              title: p.title,
              price: p.price,
              location: p.location,
              locationName: p.locationName,
              duration: p.duration,
            });
            void e;
          });

          el.addEventListener("mouseleave", () => {
            el.style.boxShadow = "0 0 0 2px white,0 6px 18px rgba(0,0,0,0.25)";
            setTooltip(null);
          });

          el.addEventListener("click", (e) => {
            e.stopPropagation();
            setTooltip(null);
            setSelected(p);
          });

          const marker = new mapboxgl.Marker({ element: el, anchor: "center" })
            .setLngLat([p.lng, p.lat])
            .addTo(map);

          markersRef.current.push(marker);
        }
      } catch {
        // map still works without points
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
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  // Draw/remove route line when a point is selected — GPX takes priority over Bokun start points
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    const removeRoute = () => {
      if (!mapRef.current) return;
      try {
        if (map.getLayer("route-line")) map.removeLayer("route-line");
        if (map.getLayer("route-start")) map.removeLayer("route-start");
        if (map.getSource("route")) map.removeSource("route");
        if (map.getSource("route-points")) map.removeSource("route-points");
      } catch { /* map may have been removed */ }
    };

    removeRoute();

    if (!selected) return removeRoute;

    let aborted = false;

    const drawRoute = (coords: [number, number][], solid = false) => {
      if (aborted || coords.length < 2) return;
      const m = mapRef.current;
      if (!m || !m.isStyleLoaded()) return;
      try {
        m.addSource("route", {
          type: "geojson",
          data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: coords } },
        });
        m.addLayer({
          id: "route-line",
          type: "line",
          source: "route",
          paint: {
            "line-color": "#FF6E40",
            "line-width": 3,
            "line-opacity": 0.9,
            ...(solid ? {} : { "line-dasharray": [2, 1.5] }),
          },
        });

        m.addSource("route-points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              { type: "Feature", properties: { color: "#22c55e" }, geometry: { type: "Point", coordinates: coords[0] } },
              { type: "Feature", properties: { color: "#FF6E40" }, geometry: { type: "Point", coordinates: coords[coords.length - 1] } },
            ],
          },
        });
        m.addLayer({
          id: "route-start",
          type: "circle",
          source: "route-points",
          paint: {
            "circle-radius": 10,
            "circle-color": ["get", "color"],
            "circle-stroke-width": 2,
            "circle-stroke-color": "#fff",
          },
        });

        const bounds = coords.reduce(
          (b, c) => b.extend(c),
          new mapboxgl.LngLatBounds(coords[0], coords[0])
        );
        m.fitBounds(bounds, { padding: 80, maxZoom: 14, duration: 800 });
      } catch { /* style race */ }
    };

    (async () => {
      // Try GPX file first (named by activity id)
      try {
        const res = await fetch(`/gpx/${selected.id}.gpx`);
        if (!aborted && res.ok) {
          const xml = await res.text();
          const coords = parseGpx(xml);
          if (coords.length >= 2) {
            drawRoute(coords, true);
            return;
          }
        }
      } catch { /* no GPX */ }

      // Fall back to Bokun start points
      if (!aborted && selected.route && selected.route.length >= 2) {
        drawRoute(selected.route.map(p => [p.lng, p.lat] as [number, number]));
      }
    })();

    return () => {
      aborted = true;
      removeRoute();
    };
  }, [selected]);

  const close = useCallback(() => setSelected(null), []);

  return (
    <div className="fixed inset-0 z-0">
      <div ref={mapContainer} className="h-full w-full" />

      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-frost-light">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-glacier border-t-transparent" />
            <p className="font-heading text-sm font-600 text-glacier">Loading map…</p>
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

      {/* Dot hover tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none fixed z-[150]"
          style={{
            left: tooltip.x,
            top: tooltip.y - 12,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="relative rounded-xl bg-white px-3.5 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.18)]">
            <p className="whitespace-nowrap font-heading text-sm font-700 text-arctic-navy">
              {tooltip.title}
            </p>
            {(tooltip.location || tooltip.locationName || tooltip.duration || tooltip.price) && (
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                {(tooltip.location || tooltip.locationName) && (
                  <span className="inline-flex items-center gap-1 font-body text-xs text-granite">
                    <MapPin className="h-3 w-3 text-polar-teal" />
                    {tooltip.location ?? tooltip.locationName}
                  </span>
                )}
                {tooltip.duration && (
                  <span className="inline-flex items-center gap-1 font-body text-xs text-granite">
                    <Clock className="h-3 w-3 text-polar-teal" />
                    {tooltip.duration}
                  </span>
                )}
                {tooltip.price && (
                  <span className="font-heading text-xs font-700 text-arctic-navy">
                    {formatPrice(tooltip.price)}
                  </span>
                )}
              </div>
            )}
            {/* Downward arrow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full overflow-hidden h-2.5 w-5">
              <div className="mx-auto h-2.5 w-2.5 -translate-y-1/2 rotate-45 bg-white shadow-[1px_1px_3px_rgba(0,0,0,0.08)]" />
            </div>
          </div>
        </div>
      )}

      {/* Side panel */}
      <div
        className={`fixed top-16 right-0 z-[200] flex h-[calc(100%-4rem)] w-full flex-col bg-white shadow-[-6px_0_32px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-in-out sm:w-[400px] lg:top-[72px] lg:h-[calc(100%-72px)] lg:w-[440px] ${
          selected ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Arrow tab — desktop only (panel is not full-width there) */}
        {selected && (
          <button
            onClick={close}
            aria-label="Close panel"
            className="absolute -left-10 top-24 hidden sm:flex h-10 w-10 items-center justify-center rounded-l-xl bg-white text-arctic-navy shadow-[-4px_0_12px_rgba(0,0,0,0.12)] transition-colors hover:bg-frost-light"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        {selected && (
          <div className="flex h-full flex-col overflow-y-auto">
            {/* Hero image */}
            <div className="relative h-[55vh] flex-shrink-0 overflow-hidden bg-glacier/10">
              {selected.featuredImageUrl ? (
                <Image
                  src={selected.featuredImageUrl}
                  alt={selected.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Calendar className="h-12 w-12 text-glacier/30" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-arctic-navy/70 via-arctic-navy/10 to-transparent" />

              {/* Mobile close button */}
              <button
                onClick={close}
                aria-label="Close panel"
                className="absolute left-4 top-4 z-10 flex sm:hidden h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
              >
                <ChevronRight className="h-5 w-5 rotate-180" />
              </button>

              {selected.price && (
                <div className="absolute top-4 right-4">
                  <span className="rounded-lg bg-white/90 px-3 py-1.5 font-heading text-xs font-700 text-arctic-navy backdrop-blur-sm">
                    {formatPrice(selected.price)}
                  </span>
                </div>
              )}

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h2 className="font-display text-2xl font-800 leading-tight text-white drop-shadow-sm">
                  {selected.title}
                </h2>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-6">
              <div className="mb-4 flex flex-wrap gap-3">
                {(selected.location || selected.locationName) && (
                  <span className="inline-flex items-center gap-1.5 font-body text-sm text-granite">
                    <MapPin className="h-4 w-4 text-polar-teal" />
                    {selected.location ?? selected.locationName}
                  </span>
                )}
                {selected.duration && (
                  <span className="inline-flex items-center gap-1.5 font-body text-sm text-granite">
                    <Clock className="h-4 w-4 text-polar-teal" />
                    {selected.duration}
                  </span>
                )}
              </div>

              {selected.shortDescription && (
                <p className="mb-6 font-body text-sm leading-relaxed text-stone">
                  {selected.shortDescription}
                </p>
              )}

              <div className="mt-auto">
                <Link
                  href={selected.href}
                  onClick={close}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-polar-teal px-6 py-3.5 font-heading text-sm font-700 tracking-wide text-white transition-colors hover:bg-glacier"
                >
                  Book Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
