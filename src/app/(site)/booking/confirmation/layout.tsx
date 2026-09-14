import type { Metadata } from "next";

// The page itself is a client component and cannot export metadata, so the
// noindex lives here. Post-checkout receipts have no search value and their
// URLs must never be indexed.
export const metadata: Metadata = {
  title: "Booking Confirmed",
  robots: { index: false, follow: false },
};

export default function BookingConfirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
