"use client";

import Image from "next/image";
import Link from "next/link";

type Cta = { label: string; href: string };

export type PageHeroProps = {
  /** Path to the background image (public/ path or remote URL) */
  image: string;
  /** Accessibility alt text */
  alt?: string;
  /** Small uppercase label above the title */
  eyebrow: string;
  /** Main hero title */
  title: string;
  /** One paragraph of supporting copy */
  lede: string;
  /** CTAs */
  primaryCta?: Cta;
  secondaryCta?: Cta;
  /** Current section label for the breadcrumb */
  breadcrumb: string;
  /**
   * CSS background-position for the image — tune per page so the dark
   * scrim sits over an already-dark region of the photo.
   * Example: "68% center" | "60% 35%"
   */
  focal?: string;
};

export default function PageHero({
  image,
  alt = "",
  eyebrow,
  title,
  lede,
  primaryCta,
  secondaryCta,
  breadcrumb,
  focal = "center",
}: PageHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-arctic-navy h-[620px] lg:h-[720px]">
      {/* Photo */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={alt}
          fill
          priority
          className="object-cover"
          style={{ objectPosition: focal }}
          sizes="100vw"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(13,27,42,0.88) 0%, rgba(13,27,42,0.65) 34%, rgba(13,27,42,0.2) 62%, rgba(13,27,42,0) 82%), linear-gradient(180deg, rgba(13,27,42,0.45) 0%, rgba(13,27,42,0) 22%, rgba(13,27,42,0) 55%, rgba(13,27,42,0.5) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full w-full pt-32 pb-36 lg:pt-40 lg:pb-44">
        <div className="mx-auto flex h-full max-w-[1280px] items-end px-6 lg:px-12">
          <div className="max-w-[640px] text-white" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.4)" }}>
            <div className="mb-5 flex items-center gap-2.5 font-heading text-[11px] font-600 uppercase tracking-[0.18em] text-white/70">
              <span>Home</span>
              <span className="opacity-40">/</span>
              <span className="text-frost">{breadcrumb}</span>
            </div>

            <div className="mb-5 inline-flex items-center gap-2.5 font-heading text-xs font-700 uppercase tracking-[0.22em] text-arctic-orange">
              <span aria-hidden className="h-[2px] w-7 bg-arctic-orange" />
              {eyebrow}
            </div>

            <h1 className="m-0 mb-5 font-display text-[clamp(3rem,8vw,6.5rem)] font-800 leading-[0.98] tracking-[-0.028em] text-white">
              {title}
            </h1>

            <p className="mb-8 font-body text-base leading-relaxed text-white/90 lg:text-lg">
              {lede}
            </p>

            {(primaryCta || secondaryCta) && (
              <div className="flex flex-wrap gap-3">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="group inline-flex items-center gap-2.5 rounded-[10px] bg-arctic-orange px-6 py-[14px] font-heading text-[13px] font-600 uppercase tracking-[0.06em] text-white transition-all hover:-translate-y-[1px] hover:bg-arctic-orange-hover"
                  >
                    {primaryCta.label}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex items-center gap-2.5 rounded-[10px] border-[1.5px] border-white/40 bg-white/[0.06] px-6 py-[14px] font-heading text-[13px] font-600 uppercase tracking-[0.06em] text-white backdrop-blur-md transition-colors hover:bg-white/[0.14]"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom fade → frost-light so the cards section below can tuck in */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-[160px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(232,244,255,0) 0%, rgba(232,244,255,0) 35%, #E8F4FF 100%)",
        }}
      />

      {/* Wavy frost divider */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5]">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 40 C240 80 480 0 720 40 C960 80 1200 0 1440 40 L1440 80 L0 80Z"
            className="fill-frost-light"
          />
        </svg>
      </div>
    </section>
  );
}
