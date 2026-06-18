import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Greenland Arctic Xplorers for bookings and inquiries.",
  alternates: {
    canonical: "/contact-us",
  },
  openGraph: {
    title: "Contact Us — Greenland Arctic Xplorers",
    description: "Get in touch with Greenland Arctic Xplorers for bookings and inquiries.",
    url: "/contact-us",
  },
};

export default function ContactUsPage() {
  return <ContactContent />;
}
