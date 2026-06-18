import type { MetadataRoute } from "next";
import { getPublishedItems, type CollectionName } from "@/lib/content";
import { firebaseConfigured } from "@/lib/firebase";
import { listBokunRaces, listBokunTours, listBokunActivities, listBokunLodges } from "@/lib/bokun";

const SITE_URL = "https://www.greenlandarcticxplorers.com";

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

const COLLECTION_ROUTES: { col: CollectionName; base: string }[] = [
  { col: "tours", base: "/tours" },
  { col: "races", base: "/races" },
  { col: "lodges", base: "/arctic-lodges" },
  { col: "activities", base: "/adventures" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  if (firebaseConfigured) {
    const results = await Promise.allSettled(
      COLLECTION_ROUTES.map((r) => getPublishedItems(r.col))
    );
    results.forEach((result, i) => {
      if (result.status !== "fulfilled") return;
      const { base } = COLLECTION_ROUTES[i];
      for (const item of result.value) {
        entries.push({
          url: `${SITE_URL}${base}/${item.slug}`,
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    });
  }

  const bokunResults = await Promise.allSettled([
    listBokunRaces(),
    listBokunTours(),
    listBokunActivities(),
    listBokunLodges(),
  ]);
  for (const result of bokunResults) {
    if (result.status !== "fulfilled") continue;
    for (const item of result.value) {
      entries.push({
        url: `${SITE_URL}/${item.collection}/${item.slug}`,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
