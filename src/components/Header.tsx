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
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(!isHome);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

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
        className={`fixed inset-0 z-[200] bg-white transition-all duration-400 ${
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        {/* Top bar with logo + close */}
        <div className="flex h-16 items-center justify-between px-6 lg:px-12">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Image
              src="/gax-logo.png"
              alt="Greenland Arctic Xplorers"
              width={48}
              height={48}
              className="h-10 w-10"
            />
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted">Close</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-navy transition-all duration-200 hover:bg-frost"
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
        </div>

        {/* Menu content */}
        <div className="h-[calc(100%-4rem)] overflow-y-auto px-8 pb-16 lg:grid lg:grid-cols-12 lg:gap-8 lg:px-16">
          <nav
            className="flex flex-col gap-1 lg:col-span-7"
            aria-label="Menu navigation"
          >
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`group flex items-center gap-4 rounded-xl py-3 transition-all duration-500 ${
                  menuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-8 opacity-0"
                }`}
                style={{
                  transitionDelay: menuOpen ? `${150 + i * 50}ms` : "0ms",
                }}
              >
                <span className="hidden w-8 font-mono text-xs text-muted lg:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-6 w-0 rounded-full bg-glacier" />
                <span className="font-display text-3xl font-600 text-navy sm:text-4xl lg:text-6xl">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Info panel (desktop) */}
          <aside
            className={`hidden flex-col gap-8 border-l border-border pl-8 transition-all lg:col-span-5 lg:flex ${
              menuOpen
                ? "translate-y-0 opacity-100 delay-[400ms] duration-[600ms]"
                : "translate-y-4 opacity-0 duration-300"
            }`}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
              <Image
                src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80"
                alt="Northern lights over Greenland"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-6">
              <div>
                <p className="mb-1.5 text-[11px] font-600 uppercase tracking-[0.12em] text-muted">
                  Email
                </p>
                <a
                  href="mailto:info@greenland-explorers.com"
                  className="text-sm text-charcoal underline decoration-glacier/30 underline-offset-2 transition-colors duration-200 hover:text-glacier"
                >
                  info@greenland-explorers.com
                </a>
              </div>
              <div>
                <p className="mb-1.5 text-[11px] font-600 uppercase tracking-[0.12em] text-muted">
                  Location
                </p>
                <p className="text-sm text-charcoal">
                  12 Harbor Road, Ilulissat<br />Greenland
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 pt-2">
              {["Instagram", "Facebook", "YouTube"].map((name) => (
                <a
                  key={name}
                  href="#"
                  className="text-xs font-600 uppercase tracking-wider text-muted transition-colors duration-200 hover:text-glacier"
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
