import type { BokunRaceCard, BokunRaceDetail } from "./bokun";
import {
  SITE_NAME,
  SITE_URL,
  SITE_PHONE,
  SITE_EMAIL,
  SITE_SOCIALS,
  SITE_ADDRESS,
} from "./site-metadata";

/** Stable node id so per-page blobs can reference the organization instead of restating it. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

type JsonLdValue = string | number | boolean | JsonLdObject | JsonLdValue[];
export type JsonLdObject = { [key: string]: JsonLdValue | undefined };

/** Drop undefined/empty entries so absent source data never becomes an empty property. */
function compact(obj: JsonLdObject): JsonLdObject {
  const out: JsonLdObject = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    if (typeof v === "string" && v.trim() === "") continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = v;
  }
  return out;
}

/** Strip Bokun's description HTML down to plain text for JSON-LD string fields. */
export function toPlainText(html?: string, maxLength = 1200): string | undefined {
  if (!html) return undefined;
  const text = html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/(p|div|li|h[1-6])>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return undefined;
  return text.length > maxLength ? `${text.slice(0, maxLength - 1).trimEnd()}…` : text;
}

export function postalAddress(): JsonLdObject {
  return compact({
    "@type": "PostalAddress",
    streetAddress: SITE_ADDRESS.streetAddress,
    postalCode: SITE_ADDRESS.postalCode,
    addressLocality: SITE_ADDRESS.addressLocality,
    addressCountry: SITE_ADDRESS.addressCountry,
  });
}

export function organizationJsonLd(): JsonLdObject {
  return compact({
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/gax-logo.png`,
    image: `${SITE_URL}/hero1.JPEG`,
    email: SITE_EMAIL,
    telephone: SITE_PHONE,
    address: postalAddress(),
    sameAs: SITE_SOCIALS,
    areaServed: { "@type": "Country", name: "Greenland" },
    currenciesAccepted: "DKK",
  });
}

/**
 * Reference to the organization node declared in the root layout. Carries @type
 * and name as well as @id: consumers that merge the page graph resolve the full
 * node, and those that read each blob in isolation still get a named provider.
 */
const providerRef: JsonLdObject = {
  "@type": "TravelAgency",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  url: SITE_URL,
};

function offer(item: BokunRaceDetail, url: string): JsonLdObject | undefined {
  if (item.price === undefined) return undefined;
  return compact({
    "@type": "Offer",
    price: item.price,
    priceCurrency: "DKK",
    availability: "https://schema.org/InStock",
    url,
    seller: providerRef,
  });
}

function placeFor(item: BokunRaceDetail): JsonLdObject | undefined {
  const name = item.meetingPoint ?? item.location;
  if (!name) return undefined;
  return compact({
    "@type": "Place",
    name,
    address: compact({
      "@type": "PostalAddress",
      streetAddress: item.meetingPoint,
      addressLocality: item.location ?? SITE_ADDRESS.addressLocality,
      addressCountry: "GL",
    }),
  });
}

export type BreadcrumbCrumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: BreadcrumbCrumb[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

/**
 * schema.org/TouristTrip for tours and adventures.
 * Note: Trip has no `duration` property, so duration is carried by the visible
 * markup rather than invented here.
 */
export function touristTripJsonLd(item: BokunRaceDetail, path: string): JsonLdObject {
  const url = `${SITE_URL}${path}`;
  return compact({
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": url,
    name: item.title,
    description: toPlainText(item.longDescription) ?? item.shortDescription,
    image: item.featuredImage?.url,
    url,
    provider: providerRef,
    itinerary: placeFor(item),
    offers: offer(item, url),
  });
}

/** schema.org/SportsEvent for races. */
export function sportsEventJsonLd(item: BokunRaceDetail, path: string): JsonLdObject {
  const url = `${SITE_URL}${path}`;
  return compact({
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "@id": url,
    name: item.title,
    description: toPlainText(item.longDescription) ?? item.shortDescription,
    image: item.featuredImage?.url,
    url,
    startDate: item.date,
    duration: item.durationIso,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    organizer: providerRef,
    location:
      placeFor(item) ??
      compact({
        "@type": "Place",
        name: "Nuuk, Greenland",
        address: postalAddress(),
      }),
    offers: offer(item, url),
  });
}

/** schema.org/LodgingBusiness for cabins and apartments. */
export function lodgingJsonLd(item: BokunRaceDetail, path: string): JsonLdObject {
  const url = `${SITE_URL}${path}`;
  return compact({
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": url,
    name: item.title,
    description: toPlainText(item.longDescription) ?? item.shortDescription,
    image: item.featuredImage?.url ? [item.featuredImage.url] : undefined,
    url,
    telephone: SITE_PHONE,
    address: compact({
      "@type": "PostalAddress",
      addressLocality: item.location ?? SITE_ADDRESS.addressLocality,
      addressCountry: "GL",
    }),
    containedInPlace: item.location
      ? compact({ "@type": "Place", name: item.location })
      : undefined,
    priceRange: item.price !== undefined ? `From ${item.price} DKK` : undefined,
    makesOffer: offer(item, url),
  });
}

/** ItemList for a listing page, so the catalogue is machine-readable as a set. */
export function itemListJsonLd(
  items: BokunRaceCard[],
  basePath: string,
  name: string
): JsonLdObject {
  return compact({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}${basePath}/${item.slug}`,
      name: item.title,
    })),
  });
}

/** FAQPage built from the same source as the visible markup. */
export function faqJsonLd(faqs: { question: string; answer: string }[]): JsonLdObject | undefined {
  if (faqs.length === 0) return undefined;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
