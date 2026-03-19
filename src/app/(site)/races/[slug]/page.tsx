"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getItemBySlug } from "@/lib/content";
import { MapPin, Clock, ArrowLeft, ArrowRight, Play, ChevronLeft, ChevronRight, X } from "lucide-react";

type GalleryImage = {
  url: string;
  alt?: string;
  storagePath?: string;
};

type RaceDetail = {
  id: string;
  title: string;
  slug?: string;
  featuredImage?: { url: string };
  date?: string;
  shortDescription?: string;
  longDescription?: string;
  price?: string | number;
  duration?: string;
  location?: string;
  videoUrl?: string;
  gallery?: GalleryImage[];
};

function formatPrice(price?: string | number) {
  if (!price) return null;
  if (typeof price === "number") {
    return `${price.toLocaleString("da-DK")} DKK`;
  }
  const num = price.replace(/[^\d]/g, "");
  if (!num) return price;
  return `${Number(num).toLocaleString("da-DK")} DKK`;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return null;
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getEmbedUrl(url?: string): string | null {
  if (!url) return null;
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return null;
}

function useParallax() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        el.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(${1 + y * 0.0001})`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return ref;
}

export default function RaceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [race, setRace] = useState<RaceDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const parallaxRef = useParallax();

  useEffect(() => {
    if (!slug) return;

    if (slug.startsWith("bokun-")) {
      const id = slug.replace(/^bokun-/, "");
      fetch(`/api/bokun/activity/${encodeURIComponent(id)}`)
        .then((r) => r.json())
        .then((data) => setRace(data?.race ?? null))
        .catch(() => {})
        .finally(() => setLoading(false));
      return;
    }

    getItemBySlug("races", slug)
      .then((r) => setRace(r as unknown as RaceDetail | null))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-arctic-navy">
        <div className="h-screen animate-pulse bg-gradient-to-b from-arctic-navy to-glacier" />
      </div>
    );
  }

  if (!race) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-frost-light pt-32">
        <div className="text-center">
          <h1 className="mb-4 font-display text-3xl font-800 text-arctic-navy">
            Race not found
          </h1>
          <p className="mb-6 font-body text-stone">
            The race you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            href="/races"
            className="inline-flex items-center gap-2 rounded-xl bg-glacier px-6 py-3 font-heading text-sm font-600 text-white transition-colors hover:bg-polar-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glacier"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all races
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ───── HERO ───── */}
      <section className="relative h-[100dvh] overflow-hidden bg-arctic-navy">
        {race.featuredImage?.url && (
          <div ref={parallaxRef} className="absolute inset-0 will-change-transform">
            <Image
              src={race.featuredImage.url}
              alt={race.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-arctic-navy via-arctic-navy/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-arctic-navy/70 via-transparent to-transparent" />

        {/* Back link at top */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-28 lg:pt-32">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
            <Link
              href="/races"
              className="inline-flex items-center gap-1.5 font-heading text-xs font-600 uppercase tracking-wider text-frost/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All Races
            </Link>
          </div>
        </div>

        <div className="relative z-10 flex h-full items-end">
          <div className="w-full pb-20 lg:pb-28">
            <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
              <div className="max-w-3xl">
                {race.date && (
                  <p className="mb-4 animate-fade-in font-heading text-sm font-600 uppercase tracking-[0.2em] text-arctic-orange">
                    {formatDate(race.date)}
                  </p>
                )}

                <h1 className="mb-6 animate-fade-in-up font-display text-[clamp(2.8rem,7vw,6rem)] font-800 leading-[0.95] tracking-tight text-white">
                  {race.title}
                </h1>

                {race.shortDescription && (
                  <p className="mb-10 max-w-xl animate-fade-in-up font-body text-lg leading-relaxed text-frost/90 [animation-delay:200ms]">
                    {race.shortDescription}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-5 animate-fade-in-up [animation-delay:400ms]">
                  <a
                    href="/contact-us"
                    className="inline-flex items-center gap-2 rounded-xl bg-polar-teal px-8 py-3.5 font-heading text-sm font-600 tracking-wider text-white transition-all hover:bg-glacier focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Book This Expedition
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  {race.price && (
                    <span className="font-heading text-2xl font-800 text-white">
                      {formatPrice(race.price)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metadata strip at bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="mx-auto flex max-w-[1280px] items-center gap-6 px-6 py-5 lg:gap-10 lg:px-12">
            {race.location && (
              <div className="flex items-center gap-2 text-frost/70">
                <MapPin aria-hidden="true" className="h-4 w-4" />
                <span className="font-heading text-xs font-600 uppercase tracking-wider">
                  {race.location}
                </span>
              </div>
            )}
            {race.duration && (
              <div className="flex items-center gap-2 text-frost/70">
                <Clock aria-hidden="true" className="h-4 w-4" />
                <span className="font-heading text-xs font-600 uppercase tracking-wider">
                  {race.duration}
                </span>
              </div>
            )}
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-frost/20 to-transparent" />
        </div>
      </section>

      {/* ───── DESCRIPTION + VIDEO & IMAGES ───── */}
      {(race.longDescription || race.videoUrl || (race.gallery && race.gallery.length > 0)) && (
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
              {/* Description */}
              {race.longDescription && (
                <div className={(race.videoUrl || (race.gallery && race.gallery.length > 0)) ? "lg:col-span-7" : "lg:col-span-8 lg:col-start-3"}>
                  <div className="mb-8">
                    <div className="h-px w-12 bg-arctic-orange" />
                    <p className="mt-4 font-heading text-xs font-600 uppercase tracking-[0.2em] text-granite">
                      About This Race
                    </p>
                  </div>
                  <div
                    className="rich-content font-body text-stone"
                    dangerouslySetInnerHTML={{ __html: race.longDescription }}
                  />
                </div>
              )}

              {/* Video + Gallery column */}
              {(race.videoUrl || (race.gallery && race.gallery.length > 0)) && (
                <div className={race.longDescription ? "lg:col-span-5" : "lg:col-span-8 lg:col-start-3"}>
                  {/* Video */}
                  {race.videoUrl && (() => {
                    const embedUrl = getEmbedUrl(race.videoUrl);
                    if (!embedUrl) return null;
                    return (
                      <div>
                        <div className="mb-8">
                          <div className="h-px w-12 bg-arctic-orange" />
                          <p className="mt-4 flex items-center gap-2 font-heading text-xs font-600 uppercase tracking-[0.2em] text-granite">
                            <Play aria-hidden="true" className="h-3.5 w-3.5" />
                            Video
                          </p>
                        </div>
                        <div className="relative aspect-video overflow-hidden rounded-2xl bg-arctic-navy shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                          <iframe
                            src={embedUrl}
                            title={`${race.title} video`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 h-full w-full"
                          />
                        </div>
                      </div>
                    );
                  })()}

                  {/* Gallery images below video */}
                  {race.gallery && race.gallery.length > 0 && (
                    <GalleryImages
                      images={race.gallery}
                      title={race.title}
                      hasVideo={!!race.videoUrl}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function GalleryImages({
  images,
  title,
  hasVideo,
}: {
  images: NonNullable<RaceDetail["gallery"]>;
  title: string;
  hasVideo: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  };

  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex]);

  return (
    <>
      <div className={hasVideo ? "mt-10" : ""}>
        <div className="mb-6">
          <div className="h-px w-12 bg-arctic-orange" />
          <p className="mt-4 font-heading text-xs font-600 uppercase tracking-[0.2em] text-granite">
            Gallery
          </p>
        </div>

        {/* Desktop: stacked full-width under video */}
        <div className="hidden md:flex md:flex-col gap-3">
          {images.map((img, i) => (
            <button
              key={img.storagePath || i}
              onClick={() => openLightbox(i)}
              className="group relative cursor-zoom-in overflow-hidden rounded-xl bg-frost-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glacier"
            >
              <div className="relative aspect-[3/2]">
                <Image
                  src={img.url}
                  alt={img.alt || `${title} gallery image ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-arctic-navy/0 transition-colors duration-300 group-hover:bg-arctic-navy/10" />
              </div>
            </button>
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="relative md:hidden">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-glacier shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all hover:bg-glacier hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glacier"
            aria-label="Scroll gallery left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute -right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-glacier shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all hover:bg-glacier hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glacier"
            aria-label="Scroll gallery right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 scrollbar-none"
            style={{ scrollbarWidth: "none" }}
          >
            {images.map((img, i) => (
              <button
                key={img.storagePath || i}
                onClick={() => openLightbox(i)}
                className="w-[300px] flex-shrink-0 cursor-zoom-in snap-start overflow-hidden rounded-xl bg-frost-light"
              >
                <div className="relative aspect-[3/2]">
                  <Image
                    src={img.url}
                    alt={img.alt || `${title} gallery image ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-arctic-navy/95 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 font-heading text-sm font-600 text-frost/70">
            {lightboxIndex + 1} / {images.length}
          </div>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative mx-16 max-h-[85vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].alt || `${title} gallery image ${lightboxIndex + 1}`}
              width={1400}
              height={900}
              className="max-h-[85vh] w-auto rounded-2xl object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
