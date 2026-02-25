"use client";

import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="bg-white py-20 lg:py-28">
      <div
        className={`mx-auto max-w-3xl px-6 text-center transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <Quote className="mx-auto mb-6 h-10 w-10 text-frost" />

        <blockquote className="mb-8 font-heading text-[clamp(1.25rem,2.5vw,1.75rem)] font-600 leading-relaxed text-arctic-navy">
          &ldquo;Standing on the Greenland ice sheet, watching icebergs calve
          into the fjord — it was the most humbling, extraordinary experience
          of my life. The guides were world-class and every detail was
          perfect.&rdquo;
        </blockquote>

        <div className="flex flex-col items-center gap-3">
          <div className="h-14 w-14 overflow-hidden rounded-full bg-frost">
            <div className="flex h-full w-full items-center justify-center font-heading text-lg font-700 text-glacier">
              SL
            </div>
          </div>
          <div>
            <p className="font-heading text-sm font-600 text-charcoal">
              Sarah Lindström
            </p>
            <p className="font-body text-xs text-granite">
              Explorer — Glacier Expedition, August 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
