"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="book"
      ref={sectionRef}
      className="relative overflow-hidden py-24 lg:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80"
          alt="Arctic mountain landscape at twilight"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-arctic-navy/75" />
      </div>

      <div
        className={`relative z-10 mx-auto max-w-2xl px-6 text-center transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <p className="mb-3 font-heading text-xs font-600 uppercase tracking-[0.2em] text-frost/70">
          Start Your Journey
        </p>
        <h2 className="mb-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-800 leading-tight text-white">
          Your Arctic Adventure Awaits
        </h2>
        <p className="mb-8 font-body text-base leading-relaxed text-mist/80">
          Book your expedition today and discover the raw beauty of Greenland.
          Small groups, expert guides, unforgettable experiences.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#"
            className="inline-flex rounded-lg bg-arctic-orange px-8 py-3.5 font-heading text-sm font-600 uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(255,110,64,0.35)] transition-all duration-200 hover:bg-arctic-orange-hover hover:shadow-[0_6px_20px_rgba(255,110,64,0.45)] active:scale-[0.98]"
          >
            Browse Expeditions
          </a>
          <a
            href="#"
            className="inline-flex rounded-lg border-2 border-white/30 px-8 py-3.5 font-heading text-sm font-600 uppercase tracking-wider text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
