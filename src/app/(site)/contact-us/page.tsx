import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Greenland Arctic Xplorers for bookings and inquiries.",
  path: "/contact-us",
});

export default function ContactUsPage() {
  return <ContactContent />;
}
