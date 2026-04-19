"use client";

import { useEffect, useState, type FormEvent } from "react";
import { getContact } from "@/lib/content";
import type { ContactContent as ContactData } from "@/lib/types";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function ContactContent() {
  const [data, setData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    getContact()
      .then((d) => {
        if (d) setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setResult(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!res.ok) {
        setResult({ type: "error", text: json.error || "Something went wrong." });
      } else {
        setResult({
          type: "success",
          text: "Thank you! Your message has been sent. We'll get back to you shortly.",
        });
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      }
    } catch {
      setResult({
        type: "error",
        text: "Failed to send. Please try again or email us directly.",
      });
    }

    setSending(false);
  };

  const update = (field: string, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));

  const inputClass =
    "w-full rounded-xl border border-border bg-ice px-4 py-3 font-body text-sm text-charcoal outline-none transition-colors focus:border-glacier focus:ring-2 focus:ring-glacier/20";
  const labelClass =
    "mb-1.5 block font-heading text-[11px] font-600 uppercase tracking-wider text-muted";

  const socials = data?.socialLinks?.filter((l) => l.platform && l.url) || [];

  return (
    <section className="mx-auto max-w-6xl px-6 pt-40 pb-24 lg:px-12">
      {/* Header */}
      <p className="mb-3 font-heading text-xs font-600 uppercase tracking-[0.15em] text-glacier">
        {data?.overline || "Get In Touch"}
      </p>
      <h1 className="mb-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-800 leading-tight text-navy">
        {data?.title || "Contact Us"}
      </h1>
      {(data?.introText || !loading) && (
        <p className="mb-14 max-w-2xl font-body text-lg leading-relaxed text-charcoal/70">
          {data?.introText ||
            "Ready to plan your Arctic adventure? Reach out to our team for bookings, custom itineraries, or any questions about our expeditions."}
        </p>
      )}

      <div className="grid gap-16 lg:grid-cols-5">
        {/* ── Contact form (3 cols) ── */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>
                  Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your full name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Email <span className="text-error">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+299 ..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  placeholder="What is this about?"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Message <span className="text-error">*</span>
              </label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Tell us about your plans or ask us anything…"
                className={inputClass}
              />
            </div>

            {/* Result banner */}
            {result && (
              <div
                className={`flex items-start gap-3 rounded-xl px-4 py-3 text-sm ${
                  result.type === "success"
                    ? "bg-success/10 text-success"
                    : "bg-error/10 text-error"
                }`}
              >
                {result.type === "success" ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                )}
                <p>{result.text}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 rounded-xl bg-glacier px-6 py-3 font-heading text-sm font-600 text-white transition-all hover:bg-glacier-hover active:scale-[0.98] disabled:opacity-50"
            >
              {sending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {sending ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>

        {/* ── Sidebar info (2 cols) ── */}
        <div className="space-y-8 lg:col-span-2">
          {loading && (
            <div className="space-y-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-10 w-10 flex-shrink-0 animate-pulse rounded-xl bg-mist" />
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="h-3 w-16 animate-pulse rounded bg-mist" />
                    <div className="h-4 w-36 animate-pulse rounded bg-mist" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Address */}
          {data?.address && (
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-glacier/10">
                <MapPin className="h-5 w-5 text-glacier" />
              </div>
              <div>
                <p className="mb-1 font-heading text-xs font-600 uppercase tracking-wider text-muted">
                  Address
                </p>
                <p className="font-body text-sm leading-relaxed text-charcoal whitespace-pre-line">
                  {data.address}
                </p>
                {data.mapLink && (
                  <a
                    href={data.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block font-heading text-xs font-500 text-glacier hover:underline"
                  >
                    View on map &rarr;
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Phone */}
          {data?.phone && (
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-glacier/10">
                <Phone className="h-5 w-5 text-glacier" />
              </div>
              <div>
                <p className="mb-1 font-heading text-xs font-600 uppercase tracking-wider text-muted">
                  Phone
                </p>
                <a
                  href={`tel:${data.phone.replace(/\s/g, "")}`}
                  className="font-body text-sm text-charcoal hover:text-glacier"
                >
                  {data.phone}
                </a>
              </div>
            </div>
          )}

          {/* Email */}
          {data?.email && (
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-glacier/10">
                <Mail className="h-5 w-5 text-glacier" />
              </div>
              <div>
                <p className="mb-1 font-heading text-xs font-600 uppercase tracking-wider text-muted">
                  Email
                </p>
                <a
                  href={`mailto:${data.email}`}
                  className="font-body text-sm text-charcoal hover:text-glacier"
                >
                  {data.email}
                </a>
              </div>
            </div>
          )}

          {/* Social links */}
          {socials.length > 0 && (
            <div>
              <p className="mb-3 font-heading text-xs font-600 uppercase tracking-wider text-muted">
                Follow Us
              </p>
              <div className="flex flex-wrap gap-2">
                {socials.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-border px-3 py-1.5 font-heading text-xs font-500 text-charcoal transition-colors hover:border-glacier hover:text-glacier"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Fallback if no Firestore data */}
          {!loading && !data && (
            <>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-glacier/10">
                  <Phone className="h-5 w-5 text-glacier" />
                </div>
                <div>
                  <p className="mb-1 font-heading text-xs font-600 uppercase tracking-wider text-muted">
                    Phone
                  </p>
                  <p className="font-body text-sm text-charcoal">
                    +299 55 81 28 / +299 26 07 20
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-glacier/10">
                  <Mail className="h-5 w-5 text-glacier" />
                </div>
                <div>
                  <p className="mb-1 font-heading text-xs font-600 uppercase tracking-wider text-muted">
                    Email
                  </p>
                  <a
                    href="mailto:info@gax.gl"
                    className="font-body text-sm text-charcoal hover:text-glacier"
                  >
                    info@gax.gl
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-glacier/10">
                  <MapPin className="h-5 w-5 text-glacier" />
                </div>
                <div>
                  <p className="mb-1 font-heading text-xs font-600 uppercase tracking-wider text-muted">
                    Address
                  </p>
                  <p className="font-body text-sm leading-relaxed text-charcoal">
                    3905 Qinngorput
                    <br />
                    Nuuk, Greenland
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
