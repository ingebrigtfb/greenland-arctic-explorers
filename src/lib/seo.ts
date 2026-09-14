import { cache } from "react";
import {
  getBokunRaceDetail,
  listBokunRaces,
  listBokunTours,
  listBokunActivities,
  listBokunLodges,
  type BokunRaceCard,
  type BokunRaceDetail,
} from "./bokun";
import type { CollectionName } from "./content";

export type DetailMeta = {
  title: string;
  description?: string;
  imageUrl?: string;
};

/** Detail slugs carry the Bokun activity id as a trailing `-<digits>` segment. */
export function extractBokunId(slug: string): string | null {
  const m = slug.match(/-(\d{5,})$/);
  return m ? m[1] : null;
}

const COLLECTION_LISTERS: Record<CollectionName, () => Promise<BokunRaceCard[]>> = {
  tours: listBokunTours,
  races: listBokunRaces,
  lodges: listBokunLodges,
  activities: listBokunActivities,
};

/**
 * Full detail record for a slug, fetched on the server.
 * `cache` dedupes the Bokun call between `generateMetadata` and the page body.
 */
export const getDetailItem = cache(async function getDetailItem(
  slug: string
): Promise<BokunRaceDetail | null> {
  const bokunId = extractBokunId(slug);
  if (!bokunId) return null;
  try {
    return await getBokunRaceDetail(bokunId);
  } catch {
    return null;
  }
});

export async function getDetailMeta(slug: string): Promise<DetailMeta | null> {
  const item = await getDetailItem(slug);
  if (!item) return null;
  return {
    title: item.title,
    description: item.shortDescription,
    imageUrl: item.featuredImage?.url,
  };
}

/** Every slug in a collection, for `generateStaticParams`. */
export async function listCollectionSlugs(
  collection: CollectionName
): Promise<{ slug: string }[]> {
  try {
    const items = await COLLECTION_LISTERS[collection]();
    return items.map((item) => ({ slug: item.slug }));
  } catch {
    // A Bokun outage at build time must not fail the build; these routes then
    // render on demand and are picked up by the next revalidation.
    return [];
  }
}
