import { cache } from "react";
import { getBokunRaceDetail } from "./bokun";
import { getItemBySlug, type CollectionName } from "./content";

export type DetailMeta = {
  title: string;
  description?: string;
  imageUrl?: string;
};

function extractBokunId(slug: string): string | null {
  const m = slug.match(/-(\d{5,})$/);
  return m ? m[1] : null;
}

export const getDetailMeta = cache(async function getDetailMeta(
  collection: CollectionName,
  slug: string
): Promise<DetailMeta | null> {
  const bokunId = extractBokunId(slug);
  if (bokunId) {
    try {
      const item = await getBokunRaceDetail(bokunId);
      return {
        title: item.title,
        description: item.shortDescription,
        imageUrl: item.featuredImage?.url,
      };
    } catch {
      return null;
    }
  }

  const item = await getItemBySlug(collection, slug);
  if (!item) return null;
  return {
    title: item.title,
    description: item.shortDescription,
    imageUrl: item.featuredImage?.url,
  };
});
