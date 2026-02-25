import Image from "next/image";
import GreenlandMap from "./GreenlandMap";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/hero.JPEG"
          alt="Greenland Arctic landscape"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-arctic-navy/60 via-arctic-navy/30 to-arctic-navy/70" />
      </div>

      {/* Decorative map in top right */}
      <div className="absolute right-0 top-0 hidden opacity-20 lg:block">
        <GreenlandMap className="h-[500px] w-auto translate-x-16 -translate-y-4" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-20 pb-32">
        {/* Overline */}
        <p className="mb-4 font-heading text-xs font-500 uppercase tracking-[0.2em] text-frost/80">
          Community of Arctic Explorers
        </p>

        {/* Title */}
        <h1 className="mb-2 text-center font-display text-[clamp(2.5rem,6vw,4.5rem)] font-800 leading-[1.05] tracking-tight text-white">
          Greenland
        </h1>
        <p className="text-center font-heading text-[clamp(1.25rem,3vw,2rem)] font-400 tracking-[0.08em] text-frost/90">
          Arctic Explorers
        </p>
      </div>

      {/* Wavy bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
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
