"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getHero } from "@/lib/content";

export default function Hero() {
  const [heroImage, setHeroImage] = useState<string | null>(null);

  useEffect(() => {
    getHero()
      .then((data) => {
        if (data?.heroImage?.url) setHeroImage(data.heroImage.url);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage || "/hero1.JPEG"}
          alt="Greenland Arctic landscape"
          fill
          priority
          className="object-cover"
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

      {/* Content row: text left, map right */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-16 lg:mx-auto lg:max-w-[1280px] lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:gap-16">
        <div className="max-w-xl text-center drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)] lg:text-left">
          <h1 className="mb-2 font-display text-[clamp(3rem,8vw,6.5rem)] font-800 leading-[1.05] tracking-tight text-white">
            Greenland
          </h1>
          <p className="mb-4 font-heading text-[clamp(1.25rem,3vw,2rem)] font-medium tracking-[0.08em] text-frost">
            Arctic Explorers
          </p>
          <p className="mb-6 font-body text-[clamp(0.95rem,1.5vw,1.15rem)] font-medium leading-relaxed text-white/90">
            We know nature – both on land and at sea!
          </p>
          <a
            href="/tour-map"
            className="inline-flex lg:hidden items-center gap-2 rounded-xl bg-glacier px-7 py-3 font-heading text-sm font-600 tracking-wider text-white transition-all duration-200 hover:bg-polar-teal active:scale-[0.98]"
          >
            Start Exploring
          </a>
        </div>

        <div className="hidden justify-center lg:flex">
          <Image
            src="/greenland_white_outline.png"
            alt="Stylized map of Greenland"
            width={420}
            height={420}
            className="h-auto w-[340px] opacity-60 drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>

      {/* Wavy bottom divider */}
      <div className="absolute -bottom-px left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60 C240 120 480 0 720 60 C960 120 1200 0 1440 60 L1440 120 L0 120Z"
            className="fill-frost-light"
          />
        </svg>
      </div>
    </section>
  );
}
