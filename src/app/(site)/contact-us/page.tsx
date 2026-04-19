import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us — Greenland Arctic Xplorers",
  description: "Get in touch with Greenland Arctic Xplorers for bookings and inquiries.",
};

export default function ContactUsPage() {
  return <ContactContent />;
}
