"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, ArrowLeft, ChevronLeft, ChevronRight, X,
} from "lucide-react";

type GalleryImage = { url: string; alt?: string; storagePath?: string };

type Lodge = {
  id: string;
  title: string;
  shortDescription?: string;
  longDescription?: string;
  featuredImage?: { url: string };
  gallery?: GalleryImage[];
  price?: number;
  location?: string;
  meetingPoint?: string;
  videoUrl?: string;
};

function formatPrice(price?: number) {
  if (!price) return null;
  return `${price.toLocaleString("da-DK")} DKK`;
}

function getEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

export default function LodgeDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [lodge, setLodge] = useState<Lodge | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) return;
    const match = slug.match(/-(\d{5,})$/);
    if (match) {
      const id = match[1];
      fetch(`/api/bokun/activity/${encodeURIComponent(id)}`)
        .then(r => r.json())
        .then(data => setLodge(data?.race ?? null))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  if (loading) return (
    <div className="min-h-screen bg-frost-light pt-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="h-8 w-40 animate-pulse rounded-lg bg-mist mb-8" />
        <div className="h-10 w-2/3 animate-pulse rounded-lg bg-mist mb-4" />
        <div className="h-[500px] animate-pulse rounded-2xl bg-mist mt-8" />
      </div>
    </div>
  );

  if (!lodge) return (
    <div className="flex min-h-screen items-center justify-center bg-frost-light pt-32">
      <div className="text-center">
        <h1 className="mb-4 font-display text-3xl font-800 text-arctic-navy">Lodge not found</h1>
        <Link href="/arctic-lodges" className="inline-flex items-center gap-2 rounded-xl bg-glacier px-6 py-3 font-heading text-sm font-600 text-white hover:bg-polar-teal">
          <ArrowLeft className="h-4 w-4" /> All Arctic Lodges
        </Link>
      </div>
    </div>
  );

  const allPhotos: GalleryImage[] = [
    ...(lodge.featuredImage ? [{ url: lodge.featuredImage.url, alt: lodge.title }] : []),
    ...(lodge.gallery ?? []),
  ];
  const gridPhotos = allPhotos.slice(0, 5);
  const embedUrl = getEmbedUrl(lodge.videoUrl);

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* ─── TOP BAR ─── */}
        <div className="sticky top-0 z-40 border-b border-mist bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 lg:px-12">
            <Link
              href="/arctic-lodges"
              className="inline-flex items-center gap-1.5 font-heading text-sm font-600 text-arctic-navy transition-colors hover:text-polar-teal"
            >
              <ArrowLeft className="h-4 w-4" />
              Arctic Lodges
            </Link>
            {lodge.price && (
              <div className="hidden sm:block font-heading text-sm font-700 text-arctic-navy">
                From <span className="text-lg text-arctic-orange">{formatPrice(lodge.price)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mx-auto max-w-[1280px] px-6 pb-32 pt-8 lg:px-12 lg:pb-16">
          {/* ─── TITLE ROW ─── */}
          <div className="mb-6">
            <div className="mb-1.5 inline-flex items-center gap-2 font-heading text-[11px] font-700 uppercase tracking-[0.2em] text-polar-teal">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9743A]" />
              Arctic Lodge
            </div>
            <h1 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-800 leading-tight tracking-tight text-arctic-navy">
              {lodge.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-stone">
              {(lodge.location || lodge.meetingPoint) && (
                <span className="inline-flex items-center gap-1.5 font-body text-sm">
                  <MapPin className="h-4 w-4 text-polar-teal" />
                  {lodge.location ?? lodge.meetingPoint}
                </span>
              )}
            </div>
          </div>

          {/* ─── PHOTO GRID ─── */}
          {gridPhotos.length > 0 && (
            <PhotoGrid photos={gridPhotos} title={lodge.title} onOpen={setLightbox} />
          )}

          {/* ─── MAIN CONTENT + BOOKING CARD ─── */}
          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px] lg:gap-14">
            {/* Left column */}
            <div>
              {(lodge.longDescription || lodge.shortDescription) && (
                <div className="border-t border-mist pt-8">
                  <h2 className="mb-4 font-display text-xl font-700 text-arctic-navy">About this lodge</h2>
                  {lodge.longDescription ? (
                    <div
                      className="rich-content font-body text-[15px] leading-relaxed text-stone"
                      dangerouslySetInnerHTML={{ __html: lodge.longDescription }}
                    />
                  ) : (
                    <p className="font-body text-[15px] leading-relaxed text-stone">{lodge.shortDescription}</p>
                  )}
                </div>
              )}

              {embedUrl && (
                <div className="mt-10 border-t border-mist pt-8">
                  <h2 className="mb-4 font-display text-xl font-700 text-arctic-navy">Video</h2>
                  <div className="relative aspect-video overflow-hidden rounded-2xl bg-arctic-navy shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                    <iframe
                      src={embedUrl}
                      title={`${lodge.title} video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* ─── STICKY ENQUIRY CARD ─── */}
            <div>
              <EnquiryCard
                lodgeName={lodge.title}
                price={lodge.price}
                location={lodge.location ?? lodge.meetingPoint}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─── LIGHTBOX ─── */}
      {lightbox !== null && allPhotos.length > 0 && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
          <div className="absolute top-5 left-1/2 -translate-x-1/2 font-heading text-sm text-white/60">{lightbox + 1} / {allPhotos.length}</div>
          {allPhotos.length > 1 && <>
            <button onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + allPhotos.length) % allPhotos.length); }} className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Previous"><ChevronLeft className="h-6 w-6" /></button>
            <button onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % allPhotos.length); }} className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Next"><ChevronRight className="h-6 w-6" /></button>
          </>}
          <div className="relative mx-16 max-h-[85vh] max-w-[90vw]" onClick={e => e.stopPropagation()}>
            <Image src={allPhotos[lightbox].url} alt={allPhotos[lightbox].alt || lodge.title} width={1400} height={900} className="max-h-[85vh] w-auto rounded-xl object-contain" />
          </div>
        </div>
      )}
    </>
  );
}

function PhotoGrid({ photos, title, onOpen }: { photos: GalleryImage[]; title: string; onOpen: (i: number) => void }) {
  if (photos.length === 1) {
    return (
      <button onClick={() => onOpen(0)} className="relative block w-full overflow-hidden rounded-2xl">
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/7]">
          <Image src={photos[0].url} alt={title} fill className="object-cover" />
        </div>
      </button>
    );
  }

  return (
    <>
      {/* Mobile: stacked hero + thumbnail strip */}
      <div className="sm:hidden">
        <button onClick={() => onOpen(0)} className="relative block w-full overflow-hidden rounded-xl">
          <div className="relative aspect-[4/3] w-full">
            <Image src={photos[0].url} alt={title} fill className="object-cover" sizes="100vw" />
          </div>
        </button>
        {photos.length > 1 && (
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {photos.slice(1).map((photo, i) => (
              <button
                key={i + 1}
                onClick={() => onOpen(i + 1)}
                className="relative h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-lg"
              >
                <Image src={photo.url} alt={`${title} ${i + 2}`} fill className="object-cover" sizes="72px" />
              </button>
            ))}
          </div>
        )}
        {photos.length >= 3 && (
          <button
            onClick={() => onOpen(0)}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl border border-mist bg-frost-light px-4 py-2.5 font-heading text-xs font-600 text-arctic-navy"
          >
            Show all {photos.length} photos
          </button>
        )}
      </div>

      {/* Desktop: Airbnb-style grid */}
      <div className="relative hidden overflow-hidden rounded-2xl sm:block">
        <div className="grid h-[480px] grid-cols-2 gap-2">
          <button onClick={() => onOpen(0)} className="group relative overflow-hidden">
            <Image src={photos[0].url} alt={title} fill className="object-cover" sizes="50vw" />
          </button>
          <div className="grid grid-rows-2 gap-2">
            {[1, 2, 3, 4].map(i => (
              photos[i] ? (
                <button key={i} onClick={() => onOpen(i)} className="group relative overflow-hidden">
                  <Image src={photos[i].url} alt={`${title} ${i + 1}`} fill className="object-cover" sizes="25vw" />
                </button>
              ) : (
                <div key={i} className="bg-mist" />
              )
            ))}
          </div>
        </div>
        {photos.length >= 3 && (
          <button
            onClick={() => onOpen(0)}
            className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl border border-mist bg-white/95 px-4 py-2 font-heading text-xs font-600 text-arctic-navy shadow-sm backdrop-blur-sm hover:bg-white"
          >
            Show all {photos.length} photos
          </button>
        )}
      </div>
    </>
  );
}

type EnquiryForm = { name: string; email: string; phone: string; message: string };
type FormStatus = "idle" | "sending" | "success" | "error";

function EnquiryCard({ lodgeName, price, location }: {
  lodgeName: string; price?: number; location?: string;
}) {
  const [form, setForm] = useState<EnquiryForm>({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");

  function set(field: keyof EnquiryForm) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject: lodgeName }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-mist bg-frost-light px-4 py-3 font-body text-sm text-arctic-navy placeholder:text-granite focus:border-glacier focus:outline-none";

  return (
    <div className="sticky top-24">
      <div className="rounded-2xl border border-mist bg-white p-6 shadow-[0_4px_24px_rgba(13,27,42,0.10)]">
        {price && (
          <div className="mb-5 flex items-baseline gap-1.5 border-b border-mist pb-5">
            <span className="font-display text-2xl font-800 text-arctic-navy">{formatPrice(price)}</span>
            <span className="font-body text-sm text-granite">/ person</span>
          </div>
        )}

        {location && (
          <div className="mb-5 divide-y divide-mist rounded-xl border border-mist">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="font-heading text-[11px] font-600 uppercase tracking-wider text-granite">Location</span>
              <span className="font-heading text-sm font-600 text-arctic-navy">{location}</span>
            </div>
          </div>
        )}

        <h3 className="mb-4 font-display text-base font-700 text-arctic-navy">Enquire about this lodge</h3>

        {status === "success" ? (
          <div className="rounded-xl bg-polar-teal/10 p-4 text-center">
            <p className="font-heading text-sm font-600 text-polar-teal">Message sent! We&apos;ll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            {status === "error" && (
              <p className="font-body text-xs text-red-600">Something went wrong. Please try again.</p>
            )}
            <input required type="text" placeholder="Your name" value={form.name} onChange={set("name")} className={inputClass} />
            <input required type="email" placeholder="Email address" value={form.email} onChange={set("email")} className={inputClass} />
            <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={set("phone")} className={inputClass} />
            <textarea
              required
              rows={3}
              placeholder="Your message…"
              value={form.message}
              onChange={set("message")}
              className={`${inputClass} resize-none`}
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full inline-flex items-center justify-center rounded-xl bg-glacier px-6 py-3.5 font-heading text-sm font-600 tracking-wider text-white transition-all hover:bg-polar-teal active:scale-[0.98] disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send Enquiry"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
