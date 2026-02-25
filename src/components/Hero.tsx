import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/hero1.JPEG"
          alt="Greenland Arctic landscape"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-arctic-navy/60 via-arctic-navy/30 to-arctic-navy/70" />
      </div>

      {/* Content row: text left, map right */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-20 pb-20 lg:mx-auto lg:max-w-5xl lg:flex-row lg:items-center lg:justify-center lg:gap-16">
        <div className="max-w-xl text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] lg:text-left lg:space-y-3">
          <h1 className="mb-2 font-display text-[clamp(2.8rem,6vw,4.8rem)] font-800 leading-[1.05] tracking-tight text-white">
            Greenland
          </h1>
          <p className="mb-4 font-heading text-[clamp(1.25rem,3vw,2rem)] font-medium tracking-[0.08em] text-frost">
            Arctic Explorers
          </p>
          <p className="font-body text-[clamp(0.9rem,1.5vw,1.15rem)] font-medium leading-relaxed text-white">
            We know nature – both on land and at sea!
          </p>
        </div>

        <div className="mt-10 flex justify-center lg:mt-0 lg:ml-12">
          <Image
            src="/greenland_white_outline.png"
            alt="Stylized map of Greenland"
            width={420}
            height={420}
            className="h-auto w-[260px] drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)] lg:w-[340px]"
          />
        </div>
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
