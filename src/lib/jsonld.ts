import { SITE_NAME, SITE_URL } from "./site-metadata";

export type BreadcrumbCrumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: BreadcrumbCrumb[]) {
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

type ProductItem = {
  id: string;
  slug: string;
  title: string;
  shortDescription?: string;
  featuredImage?: { url: string };
  price?: number | string;
  collection: string;
};

export function productListJsonLd(items: ProductItem[], basePath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        "@id": `${SITE_URL}${basePath}/${item.slug}`,
        name: item.title,
        description: item.shortDescription,
        image: item.featuredImage?.url,
        url: `${SITE_URL}${basePath}/${item.slug}`,
        brand: { "@type": "Brand", name: SITE_NAME },
        ...(item.price
          ? {
              offers: {
                "@type": "Offer",
                priceCurrency: "DKK",
                price: String(item.price).replace(/[^\d.]/g, ""),
                availability: "https://schema.org/InStock",
                url: `${SITE_URL}${basePath}/${item.slug}`,
              },
            }
          : {}),
      },
    })),
  };
}

type EventItem = {
  id: string;
  slug: string;
  title: string;
  shortDescription?: string;
  featuredImage?: { url: string };
  date?: string;
  location?: string;
};

export function eventListJsonLd(items: EventItem[], basePath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items
      .filter((item) => item.date)
      .map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Event",
          "@id": `${SITE_URL}${basePath}/${item.slug}`,
          name: item.title,
          description: item.shortDescription,
          image: item.featuredImage?.url,
          url: `${SITE_URL}${basePath}/${item.slug}`,
          startDate: item.date,
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: item.location || "Nuuk, Greenland",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Nuuk",
              addressCountry: "GL",
            },
          },
          organizer: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
        },
      })),
  };
}

type LodgingItem = {
  id: string;
  slug: string;
  title: string;
  shortDescription?: string;
  featuredImage?: { url: string };
  price?: number | string;
  location?: string;
};

export function lodgingListJsonLd(items: LodgingItem[], basePath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "LodgingBusiness",
        "@id": `${SITE_URL}${basePath}/${item.slug}`,
        name: item.title,
        description: item.shortDescription,
        image: item.featuredImage?.url,
        url: `${SITE_URL}${basePath}/${item.slug}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: item.location || "Nuuk",
          addressCountry: "GL",
        },
        ...(item.price
          ? { priceRange: `${String(item.price).replace(/[^\d.]/g, "")} DKK` }
          : {}),
      },
    })),
  };
}
