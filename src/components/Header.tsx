"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Tours", href: "/tours" },
  { label: "Races", href: "/races" },
  { label: "Arctic Lodges", href: "/arctic-lodges" },
  { label: "Activities", href: "/activities" },
  { label: "Tour Map", href: "/tour-map" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* ─── Header bar ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] px-4 pt-3 transition-all duration-500 ${
          menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div
          className={`relative mx-auto flex h-20 max-w-6xl items-center justify-between overflow-hidden rounded-2xl px-12 transition-all duration-500 lg:h-24 lg:justify-center ${
            scrolled
              ? "bg-arctic-navy shadow-[0_4px_30px_rgba(13,27,42,0.25)] backdrop-blur-md"
              : "bg-transparent"
          }`}
        >
          {/* Shimmer overlay + highlight line (scrolled only) */}
          <div
            className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[--color-ice-blue]/30 to-transparent" />
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="relative z-10 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[--color-ice-blue]"
          >
            <Image
              src="/gax-logo.png"
              alt="Greenland Arctic Xplorers"
              width={56}
              height={56}
              className="h-12 w-12 lg:h-14 lg:w-14"
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="z-10 hidden items-center gap-5 lg:flex lg:ml-8 xl:gap-6"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group relative whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.05em] text-white/90 transition-colors duration-300 hover:text-white focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[--color-ice-blue] xl:text-[12px]"
              >
                <span className="relative z-10 px-2 py-1">{link.label}</span>
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-[--color-ice-blue] transition-all duration-300 group-hover:w-full" />
                <span className="absolute inset-0 rounded-lg bg-[--color-ice-blue]/0 transition-all duration-300 group-hover:bg-[--color-ice-blue]/[0.08]" />
              </Link>
            ))}
          </nav>

          {/* RIGHT — Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 hover:border-white/60 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-ice-blue] lg:hidden"
            aria-label="Open menu"
          >
            <svg
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="0" y1="1" x2="18" y2="1" />
              <line x1="0" y1="7" x2="12" y2="7" />
              <line x1="0" y1="13" x2="18" y2="13" />
            </svg>
          </button>
        </div>
      </header>

      {/* ─── Full-screen menu overlay ─── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 z-[200] origin-top-right bg-[rgba(255,255,255,0.98)] backdrop-blur-sm transition-all duration-500 ${
          menuOpen
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {/* Close button */}
        <div
          className={`absolute right-6 top-6 z-10 flex items-center gap-3 transition-all duration-300 ${
            menuOpen ? "opacity-100 delay-300" : "opacity-0"
          }`}
        >
          {/* Stone (#4A4A4A) on white ≈ 9.7:1 */}
          <span className="text-sm font-medium text-[--color-stone]">
            Close
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[--color-glacier]/25 text-[--color-glacier] transition-all duration-300 hover:border-[--color-glacier]/50 hover:bg-[--color-frost]/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-ice-blue]"
            aria-label="Close menu"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="1" y1="1" x2="13" y2="13" />
              <line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        </div>

        {/* Menu content */}
        <div className="h-full overflow-y-auto px-8 pt-24 pb-16 lg:grid lg:grid-cols-12 lg:gap-8 lg:px-16">
          {/* Left column — Navigation links */}
          <nav
            className="flex flex-col gap-1 lg:col-span-7"
            aria-label="Menu navigation"
          >
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`group flex items-center gap-4 rounded-lg py-3 transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-ice-blue] ${
                  menuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-8 opacity-0"
                }`}
                style={{
                  transitionDelay: menuOpen ? `${200 + i * 50}ms` : "0ms",
                }}
              >
                {/* Number prefix — granite (#6B7280) on white ≈ 5.0:1 */}
                <span className="hidden w-8 font-mono text-xs text-[--color-granite] transition-colors duration-300 group-hover:text-[--color-ice-blue] lg:block">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Accent bar */}
                <span className="hidden h-8 w-0 rounded-full bg-[--color-ice-blue] transition-all duration-300 group-hover:w-1 lg:block" />

                {/* Label — large text: arctic-navy (#0D1B2A) on white ≈ 17.6:1 */}
                <span className="font-heading text-5xl font-bold text-[--color-arctic-navy] transition-all duration-300 group-hover:tracking-wider group-hover:text-[--color-glacier] lg:text-7xl">
                  {link.label}
                </span>

                {/* Arrow */}
                <svg
                  className="h-6 w-6 -translate-x-4 text-[--color-ice-blue] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 lg:h-8 lg:w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            ))}
          </nav>

          {/* Right column — Info panel (desktop only) */}
          <aside
            className={`hidden flex-col gap-8 border-l border-[--color-glacier]/15 pl-8 transition-all lg:col-span-5 lg:flex ${
              menuOpen
                ? "translate-y-0 opacity-100 delay-[400ms] duration-[600ms]"
                : "translate-y-4 opacity-0 duration-300"
            }`}
          >
            {/* Featured image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80"
                alt="Northern lights over Greenland"
                fill
                className="object-cover"
              />
            </div>

            {/* Contact info — stone (#4A4A4A) on white ≈ 9.7:1 */}
            <div className="space-y-6">
              <div>
                {/* Granite (#6B7280) on white ≈ 5.0:1 for small labels */}
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[--color-granite]">
                  Email
                </p>
                <a
                  href="mailto:info@greenland-explorers.com"
                  className="text-sm text-[--color-stone] underline decoration-[--color-glacier]/20 underline-offset-2 transition-colors duration-300 hover:text-[--color-glacier] hover:decoration-[--color-glacier]/50 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-ice-blue]"
                >
                  info@greenland-explorers.com
                </a>
              </div>
              <div>
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[--color-granite]">
                  Location
                </p>
                <p className="text-sm text-[--color-stone]">
                  12 Harbor Road, Ilulissat
                  <br />
                  Greenland
                </p>
              </div>
            </div>

            {/* Social links — granite on white ≈ 5.0:1 */}
            <div className="flex items-center gap-5 pt-2">
              {["Instagram", "Facebook", "YouTube"].map((name) => (
                <a
                  key={name}
                  href="#"
                  className="text-xs font-semibold uppercase tracking-wider text-[--color-granite] transition-colors duration-300 hover:text-[--color-glacier] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-ice-blue]"
                >
                  {name}
                </a>
              ))}
            </div>
          </aside>
        </div>

      </div>
    </>
  );
}
