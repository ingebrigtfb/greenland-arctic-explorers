"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ArrowRight, Mail, Calendar, Users, MapPin, Receipt } from "lucide-react";

function ConfirmationContent() {
  const params = useSearchParams();

  const reference = params.get("ref");
  const tourName = params.get("tour");
  const date = params.get("date");
  const participants = params.get("participants");
  const traveler = params.get("traveler");
  const price = params.get("price");
  const receiptUrl = params.get("receipt");

  return (
    <div className="min-h-screen bg-frost-light">
      {/* Hero strip */}
      <div className="relative overflow-hidden bg-arctic-navy pb-32 pt-36">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/hero1.JPEG"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-arctic-navy/80 to-arctic-navy" />

        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-aurora-green/20">
            <CheckCircle className="h-10 w-10 text-aurora-green" />
          </div>
          <h1 className="mb-3 font-display text-[clamp(2rem,4vw,3rem)] font-800 leading-tight text-white">
            Booking Confirmed!
          </h1>
          <p className="mx-auto max-w-md font-body text-base leading-relaxed text-frost/80">
            Thank you for choosing Greenland Arctic Xplorers. We look forward to meeting you soon.
          </p>
        </div>
      </div>

      {/* Content card */}
      <div className="relative z-10 mx-auto -mt-16 max-w-2xl px-6 pb-24">
        <div className="overflow-hidden rounded-2xl border border-mist bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
          {/* Booking details */}
          <div className="p-8 lg:p-10">
            {reference && (
              <div className="mb-8 rounded-xl bg-frost-light px-5 py-4 text-center">
                <p className="mb-1 font-heading text-[11px] font-600 uppercase tracking-[0.15em] text-granite">
                  Booking Reference
                </p>
                <p className="font-display text-2xl font-800 tracking-wide text-arctic-navy">
                  {reference}
                </p>
              </div>
            )}

            {(tourName || date || participants || traveler || price) && (
              <div className="space-y-4">
                {tourName && (
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-polar-teal" />
                    <div>
                      <p className="font-heading text-[11px] font-600 uppercase tracking-[0.1em] text-granite">
                        Experience
                      </p>
                      <p className="font-heading text-base font-600 text-arctic-navy">{tourName}</p>
                    </div>
                  </div>
                )}

                {date && (
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-polar-teal" />
                    <div>
                      <p className="font-heading text-[11px] font-600 uppercase tracking-[0.1em] text-granite">
                        Date
                      </p>
                      <p className="font-body text-sm text-stone">{date}</p>
                    </div>
                  </div>
                )}

                {participants && (
                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 h-4 w-4 shrink-0 text-polar-teal" />
                    <div>
                      <p className="font-heading text-[11px] font-600 uppercase tracking-[0.1em] text-granite">
                        Participants
                      </p>
                      <p className="font-body text-sm text-stone">{participants}</p>
                    </div>
                  </div>
                )}

                {traveler && (
                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 h-4 w-4 shrink-0 text-polar-teal" />
                    <div>
                      <p className="font-heading text-[11px] font-600 uppercase tracking-[0.1em] text-granite">
                        Lead Traveler
                      </p>
                      <p className="font-body text-sm text-stone">{traveler}</p>
                    </div>
                  </div>
                )}

                {price && (
                  <div className="flex items-start gap-3">
                    <Receipt className="mt-0.5 h-4 w-4 shrink-0 text-polar-teal" />
                    <div>
                      <p className="font-heading text-[11px] font-600 uppercase tracking-[0.1em] text-granite">
                        Total
                      </p>
                      <p className="font-heading text-lg font-700 text-arctic-navy">{price}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bokun receipt embed */}
            {receiptUrl && (
              <div className="mt-8 overflow-hidden rounded-xl border border-mist">
                <iframe
                  src={receiptUrl}
                  title="Booking receipt"
                  className="h-[400px] w-full border-none"
                />
              </div>
            )}

            {/* Email notice */}
            <div className="mt-8 flex items-start gap-3 rounded-xl bg-frost-light px-5 py-4">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-glacier" />
              <div>
                <p className="font-heading text-sm font-600 text-arctic-navy">
                  Confirmation email sent
                </p>
                <p className="mt-1 font-body text-xs leading-relaxed text-granite">
                  You&apos;ll receive a detailed confirmation email shortly with
                  everything you need to know about your upcoming adventure.
                </p>
              </div>
            </div>
          </div>

          {/* What's next */}
          <div className="border-t border-mist bg-frost-light/50 px-8 py-8 lg:px-10">
            <h3 className="mb-4 font-heading text-sm font-600 uppercase tracking-[0.1em] text-granite">
              What&apos;s Next
            </h3>
            <ul className="space-y-3 font-body text-sm text-stone">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-polar-teal/15 text-[10px] font-700 text-polar-teal">1</span>
                Check your email for the detailed confirmation and packing list.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-polar-teal/15 text-[10px] font-700 text-polar-teal">2</span>
                Our team will reach out with meeting point details closer to your date.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-polar-teal/15 text-[10px] font-700 text-polar-teal">3</span>
                Get ready for an unforgettable Arctic adventure!
              </li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 rounded-xl bg-glacier px-6 py-3 font-heading text-sm font-600 text-white transition-colors hover:bg-polar-teal"
          >
            Explore More Tours
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-mist bg-white px-6 py-3 font-heading text-sm font-600 text-arctic-navy transition-colors hover:bg-frost-light"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-frost-light">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-glacier border-t-transparent" />
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
