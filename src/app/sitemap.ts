import type { MetadataRoute } from "next";
import {
  listBokunRaces,
  listBokunTours,
  listBokunActivities,
  listBokunLodges,
  getBokunRaceDetail,
  type BokunRaceCard,
} from "@/lib/bokun";
import { SITE_URL } from "@/lib/site-metadata";

export const revalidate = 3600;

const STATIC_ROUTES = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/tours", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/races", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/adventures", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/arctic-lodges", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/tour-map", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/about-us", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/contact-us", priority: 0.5, changeFrequency: "monthly" as const },
];

/** All catalogue items across the four collections. */
export async function listAllCatalogueItems(): Promise<BokunRaceCard[]> {
  const results = await Promise.allSettled([
    listBokunTours(),
    listBokunActivities(),
    listBokunLodges(),
    listBokunRaces(),
  ]);
  return results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
}

/**
 * Bokun's search response carries no modification date, so <lastmod> comes from
 * the detail endpoint. Those responses are already cached and fetched by the
 * detail pages themselves, so this reuses the cache rather than adding load.
 */
async function lastModifiedFor(item: BokunRaceCard): Promise<Date | undefined> {
  try {
    const detail = await getBokunRaceDetail(item.id);
    return detail.lastModified ? new Date(detail.lastModified) : undefined;
  } catch {
    return undefined;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const items = await listAllCatalogueItems();
  const stamps = await Promise.all(items.map(lastModifiedFor));

  // Newest catalogue edit doubles as the freshness signal for the listing pages.
  const newest = stamps.reduce<Date | undefined>(
    (acc, d) => (d && (!acc || d > acc) ? d : acc),
    undefined
  );

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: newest,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const detailEntries: MetadataRoute.Sitemap = items.map((item, i) => ({
    url: `${SITE_URL}/${item.collection}/${item.slug}`,
    lastModified: stamps[i],
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...detailEntries];
}
