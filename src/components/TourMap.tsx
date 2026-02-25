"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

export default function TourMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
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

    map.on("load", () => setMapLoaded(true));

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

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
          </div>
        </div>
      )}
    </div>
  );
}
