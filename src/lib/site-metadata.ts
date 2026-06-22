import type { Metadata } from "next";

export const SITE_URL = "https://www.greenlandarcticxplorers.com";
export const SITE_NAME = "Greenland Arctic Xplorers";
export const SITE_DESCRIPTION =
  "Experience the pristine Arctic wilderness of Greenland. Glacier expeditions, Northern Lights chases, fjord kayaking, and unforgettable adventures in the world's last frontier.";
export const SITE_PHONE = "+299260720";
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

type OpenGraphInput = {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
};

export function buildOpenGraph({
  title,
  description,
  url,
  imageUrl,
}: OpenGraphInput): NonNullable<Metadata["openGraph"]> {
  return {
    title,
    description,
    url,
    images: imageUrl ? [{ url: imageUrl }] : [DEFAULT_OG_IMAGE],
  };
}
