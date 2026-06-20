import type { Metadata } from "next";

export const SITE_URL = "https://www.greenlandarcticxplorers.com";
export const SITE_NAME = "Greenland Arctic Xplorers";

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
