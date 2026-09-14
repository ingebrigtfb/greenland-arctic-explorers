import type { Metadata } from "next";

export const SITE_URL = "https://www.greenlandarcticxplorers.com";
export const SITE_NAME = "Greenland Arctic Xplorers";
export const SITE_DESCRIPTION =
  "Experience the pristine Arctic wilderness of Greenland. Glacier expeditions, Northern Lights chases, fjord kayaking, and unforgettable adventures in the world's last frontier.";
export const SITE_PHONE = "+299260720";
/**
 * Single source of truth for the postal address (NAP).
 * Matches the footer and Firestore `content/contact`. External directory
 * listings disagree — see MISSING-DATA.md.
 */
export const SITE_ADDRESS = {
  streetAddress: "Qinngorput",
  postalCode: "3905",
  addressLocality: "Nuuk",
  addressCountry: "GL",
} as const;
export const SITE_EMAIL = "info@gax.gl";
export const SITE_SOCIALS = [
  "https://www.facebook.com/greenlandarcticxplorers",
  "https://www.instagram.com/greenlandarcticxplorers",
  "https://www.youtube.com/@nuukkapextremerunningrace110",
  "https://www.tripadvisor.com/Profile/Roam10565999676",
];

export const DEFAULT_OG_IMAGE = {
  url: "/hero1.JPEG",
  width: 2048,
  height: 1366,
  alt: SITE_NAME,
};

/**
 * Title, OpenGraph and Twitter for one page, from a single input.
 *
 * Subpages previously set `openGraph` only, so every one of them inherited the
 * homepage's twitter:title and twitter:description from the root layout. They
 * also used an em dash where <title> used a pipe. Building all three here keeps
 * them consistent and makes the omission impossible to repeat.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  imageUrl,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  imageUrl?: string;
  /** Set when `title` already contains the site name (the homepage). */
  absoluteTitle?: boolean;
}): Metadata {
  const social = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const images = imageUrl ? [{ url: imageUrl }] : [DEFAULT_OG_IMAGE];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: social,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: social,
      description,
      images: images.map((i) => i.url),
    },
  };
}
