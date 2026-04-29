"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const heroPages = ["/", "/tours", "/races", "/arctic-lodges", "/activities"];
  const isHeroPage = heroPages.includes(pathname);
  const [scrolled, setScrolled] = useState(!isHeroPage);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHeroPage) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHeroPage]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-[0_1px_8px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-[72px] lg:px-12">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-10 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-glacier"
          >
            <Image
              src="/gax-logo.png"
              alt="Greenland Arctic Xplorers"
              width={48}
              height={48}
              className="h-10 w-10 lg:h-12 lg:w-12"
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`group relative whitespace-nowrap rounded-lg px-3 py-2 font-display text-[13px] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glacier ${
                  scrolled
                    ? "text-navy hover:bg-frost hover:text-glacier"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right — CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact-us"
              className={`hidden rounded-xl px-5 py-2.5 text-sm font-heading font-600 transition-all duration-200 sm:inline-flex lg:inline-flex ${
                scrolled
                  ? "bg-glacier text-white hover:bg-glacier-hover"
                  : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
              }`}
            >
              Get in Touch
            </Link>

            <button
              onClick={() => setMenuOpen(true)}
              className={`z-10 flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 lg:hidden ${
                scrolled
                  ? "border border-border text-navy hover:bg-frost"
                  : "border border-white/30 text-white hover:bg-white/10"
              }`}
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
        </div>
      </header>

      {/* ─── Mobile menu overlay ─── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 z-[200] flex flex-col bg-arctic-navy transition-all duration-300 lg:hidden ${
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        {/* Top bar */}
        <div className="flex h-16 flex-shrink-0 items-center justify-between px-6">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Image
              src="/gax-logo.png"
              alt="Greenland Arctic Xplorers"
              width={48}
              height={48}
              className="h-10 w-10"
            />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 text-white transition-all duration-200 hover:bg-white/10"
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

        <div className="mx-6 border-t border-white/10" />

        {/* Nav links */}
        <nav className="flex flex-col overflow-y-auto px-6" aria-label="Menu navigation">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center justify-between border-b border-white/10 py-4 transition-all duration-400 ${
                pathname === link.href ? "text-arctic-orange" : "text-white/90 hover:text-white"
              } ${
                menuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: menuOpen ? `${80 + i * 40}ms` : "0ms" }}
            >
              <span className="font-display text-xl font-600">{link.label}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-40"
                aria-hidden="true"
              >
                <line x1="3" y1="8" x2="13" y2="8" />
                <polyline points="9,4 13,8 9,12" />
              </svg>
            </Link>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="mt-auto flex-shrink-0 px-6 pb-10 pt-6">
          <p className="mb-1 font-heading text-[11px] font-600 uppercase tracking-[0.12em] text-white/40">
            Ready to explore?
          </p>
          <Link
            href="/contact-us"
            onClick={() => setMenuOpen(false)}
            className="block w-full rounded-xl bg-glacier py-3.5 text-center font-heading text-sm font-600 tracking-wider text-white transition-all hover:bg-polar-teal active:scale-[0.98]"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </>
  );
}
