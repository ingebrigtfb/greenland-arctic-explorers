"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const IMAGES = [
  { src: "/explore-greenland-carusell/explore-green.JPEG",            alt: "Explore Greenland" },
  { src: "/explore-greenland-carusell/20260210_211253_50D3E9.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260210_211253_526BA9.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260210_211253_52E008.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260210_211253_542888.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260210_211253_5852E4.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260210_211253_59ACC3.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260210_211253_5B2DA6.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260210_211253_5D1243.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260210_211253_5D3C1C.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260210_211253_5D75CB.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260210_211253_5E7CE6.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260210_212304_51532C.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260210_212304_5A7BA9.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260211_025407_512529.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260211_025407_5263D4.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260211_025407_58300F.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260211_025407_5D1852 2.JPEG", alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260211_025407_5D1852.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260420_155403_5D431D.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_204113_5054FE.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_204113_590893.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_204113_597B33.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_204113_5AFB24.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_204113_5CD0DC.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_204113_5FB2A5.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_204237_51A9B8.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_204237_542CC4.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_204237_5AEB5A.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_204237_5B1B98.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_204237_5B6A51.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_204237_5C9303.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_204237_5FF330.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_204656_53F40F.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_204656_54FF14.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_204656_5B184A.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_204656_5B3D8D.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_204656_5BE10C.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_204656_5E0AA8.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_205412_50091A.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_205412_5AC98F.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_205412_5BD925.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_205412_5C0E9E.JPEG",   alt: "Greenland" },
  { src: "/explore-greenland-carusell/20260426_205412_5DB321.JPEG",   alt: "Greenland" },
];

export default function ExploreTerritory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const [paused, setPaused] = useState(false);

  const prev = useCallback(() => setActive(i => (i - 1 + IMAGES.length) % IMAGES.length), []);
  const next = useCallback(() => setActive(i => (i + 1) % IMAGES.length), []);

  // Auto-advance every 2 s, paused on user interaction
  useEffect(() => {
    if (paused || lightbox !== null) return;
    const id = setInterval(next, 2000);
    return () => clearInterval(id);
  }, [paused, lightbox, next]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox(i => i !== null ? (i + 1) % IMAGES.length : null);
      if (e.key === "ArrowLeft") setLightbox(i => i !== null ? (i - 1 + IMAGES.length) % IMAGES.length : null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <section id="explore" ref={sectionRef} className="relative overflow-hidden bg-ice-gray py-20 lg:py-28">
      <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-frost opacity-50 blur-3xl" />
      <div className="absolute -right-10 bottom-20 h-48 w-48 rounded-full bg-ice-blue/10 blur-3xl" />

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-12">

        {/* Text column */}
        <div className={`transition-all duration-700 ${visible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}>
          <p className="mb-3 font-heading text-xs font-600 uppercase tracking-[0.15em] text-polar-teal">
            Your Interactive Map
          </p>
          <h2 className="mb-6 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-700 leading-tight text-arctic-navy">
            Explore Greenland
          </h2>
          <p className="mb-4 max-w-lg font-body text-base leading-relaxed text-stone">
            Locate in one click all the equipment, services and key places of
            the territory. This interactive map allows you to explore the
            regions, find expedition bases, shelters, cultural sites, and
            activity zones.
          </p>
          <p className="mb-8 max-w-lg font-body text-base leading-relaxed text-stone">
            A simple, practical tool to better understand the vast Arctic
            landscape and plan your daily explorations.
          </p>
          <a
            href="/tour-map"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-glacier bg-transparent px-6 py-3 font-heading text-[13px] font-600 uppercase tracking-wider text-glacier transition-all duration-200 hover:bg-glacier hover:text-white active:scale-[0.98]"
          >
            View Interactive Map
          </a>
        </div>

        {/* Carousel column */}
        <div className={`transition-all duration-700 delay-200 ${visible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}>

          {/* Mobile: Tinder swipe */}
          <div className="lg:hidden">
            <TinderStack active={active} onAdvance={next} onOpen={setLightbox} onInteract={setPaused} />
            <div className="mt-6 flex justify-center gap-1.5">
              {IMAGES.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} aria-label={`Go to image ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-polar-teal" : "w-1.5 bg-mist"}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop: stacked + clickable lightbox */}
          <div className="hidden lg:block" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="relative aspect-[3/4] w-full">
              {IMAGES.map((img, i) => {
                // depth=0 → active (front/top), depth=1 → next, depth=2 → further back
                const offset = (i - active + IMAGES.length) % IMAGES.length;
                if (offset > 2) return null;
                const depth = offset;
                const isTop = depth === 0;
                return (
                  <button
                    key={img.src}
                    onClick={() => setLightbox(i)}
                    className="absolute inset-0 overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] cursor-zoom-in"
                    style={{
                      transform: `translate(${depth * 28}px, ${-depth * 16}px) scale(${1 - depth * 0.07})`,
                      zIndex: isTop ? 10 : 10 - depth,
                      filter: depth > 0 ? `blur(${depth}px)` : "none",
                      opacity: 1 - depth * 0.15,
                      transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1), filter 0.5s ease, opacity 0.5s ease",
                    }}
                  >
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="50vw" />
                  </button>
                );
              })}

              <button onClick={prev} aria-label="Previous"
                className="absolute -left-5 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.12)] text-arctic-navy transition-all hover:bg-glacier hover:text-white lg:flex">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={next} aria-label="Next"
                className="absolute -right-5 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.12)] text-arctic-navy transition-all hover:bg-glacier hover:text-white lg:flex">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 flex justify-center gap-1.5">
              {IMAGES.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} aria-label={`Go to image ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-polar-teal" : "w-1.5 bg-mist"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </button>
          <div className="absolute top-5 left-1/2 -translate-x-1/2 font-heading text-sm text-white/60">
            {lightbox + 1} / {IMAGES.length}
          </div>
          <button onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i - 1 + IMAGES.length) % IMAGES.length : null); }}
            aria-label="Previous" className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i + 1) % IMAGES.length : null); }}
            aria-label="Next" className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="relative mx-16 max-h-[85vh] max-w-[90vw]" onClick={e => e.stopPropagation()}>
            <Image src={IMAGES[lightbox].src} alt={IMAGES[lightbox].alt} width={1400} height={900}
              className="max-h-[85vh] w-auto rounded-xl object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}

// ── Tinder-style swipe stack for mobile ──────────────────────────────────────
function TinderStack({ active, onAdvance, onOpen, onInteract }: {
  active: number;
  onAdvance: () => void;
  onOpen: (i: number) => void;
  onInteract: (paused: boolean) => void;
}) {
  const [drag, setDrag] = useState({ x: 0, y: 0, dragging: false });
  const [flying, setFlying] = useState<"left" | "right" | null>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    onInteract(true);
    startRef.current = { x: e.clientX, y: e.clientY };
    setDrag({ x: 0, y: 0, dragging: true });
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.dragging || !startRef.current) return;
    const start = startRef.current;
    setDrag(d => ({ ...d, x: e.clientX - start.x, y: e.clientY - start.y }));
  };

  const onPointerUp = () => {
    if (!drag.dragging) return;
    const { x } = drag;
    if (Math.abs(x) > 80) {
      setFlying(x > 0 ? "right" : "left");
      setTimeout(() => {
        onAdvance();
        setFlying(null);
        setDrag({ x: 0, y: 0, dragging: false });
        onInteract(false);
      }, 320);
    } else {
      setDrag({ x: 0, y: 0, dragging: false });
      onInteract(false);
    }
    startRef.current = null;
  };

  const rotation = drag.x * 0.07;
  const flyX = flying === "right" ? 400 : flying === "left" ? -400 : drag.x;
  const flyY = flying ? -60 : drag.y * 0.15;
  const flyRotate = flying ? (flying === "right" ? 25 : -25) : rotation;
  const isAnimating = !!flying;

  return (
    <div className="relative select-none aspect-[3/4] w-full">
      {/* Back card */}
      {IMAGES[(active + 1) % IMAGES.length] && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
          style={{
            transform: `translate(16px, -10px) scale(0.95)`,
            filter: "blur(1px)",
            opacity: 0.85,
            zIndex: 1,
            transition: "transform 0.4s ease",
          }}>
          <Image src={IMAGES[(active + 1) % IMAGES.length].src} alt={IMAGES[(active + 1) % IMAGES.length].alt}
            fill className="object-cover" sizes="100vw" />
        </div>
      )}

      {/* Top card — draggable */}
      <div
        ref={cardRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClick={() => { if (Math.abs(drag.x) < 5) onOpen(active); }}
        className="absolute inset-0 overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] cursor-grab active:cursor-grabbing"
        style={{
          zIndex: 10,
          transform: `translate(${flyX}px, ${flyY}px) rotate(${flyRotate}deg)`,
          transition: isAnimating ? "transform 0.32s cubic-bezier(0.4,0,0.2,1)" : drag.dragging ? "none" : "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          touchAction: "none",
        }}
      >
        <Image src={IMAGES[active].src} alt={IMAGES[active].alt} fill className="object-cover" sizes="100vw" />

        {/* Swipe direction hints */}
        {drag.dragging && (
          <>
            {drag.x > 20 && (
              <div className="absolute inset-0 flex items-center justify-start p-6" style={{ opacity: Math.min(drag.x / 100, 1) }}>
                <div className="rounded-xl border-4 border-polar-teal px-4 py-2 font-heading text-xl font-800 text-polar-teal rotate-[-20deg]">NEXT</div>
              </div>
            )}
            {drag.x < -20 && (
              <div className="absolute inset-0 flex items-center justify-end p-6" style={{ opacity: Math.min(-drag.x / 100, 1) }}>
                <div className="rounded-xl border-4 border-arctic-orange px-4 py-2 font-heading text-xl font-800 text-arctic-orange rotate-[20deg]">BACK</div>
              </div>
            )}
          </>
        )}
      </div>

    </div>
  );
}
