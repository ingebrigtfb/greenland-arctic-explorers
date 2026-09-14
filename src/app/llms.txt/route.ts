import { listAllCatalogueItems } from "@/app/sitemap";
import type { BokunRaceCard } from "@/lib/bokun";
import { SITE_NAME, SITE_URL, SITE_EMAIL, SITE_PHONE, SITE_ADDRESS } from "@/lib/site-metadata";

export const revalidate = 3600;

/** One line per link: `- [Title](url): description` */
function line(title: string, path: string, description?: string): string {
  const url = `${SITE_URL}${path}`;
  return description ? `- [${title}](${url}): ${description}` : `- [${title}](${url})`;
}

/** Collapse a Bokun excerpt to a single clean sentence-length summary. */
function summarise(item: BokunRaceCard): string | undefined {
  const raw = item.shortDescription;
  if (!raw) return undefined;
  const text = raw.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  if (!text) return undefined;
  const clipped = text.length > 160 ? `${text.slice(0, 159).trimEnd()}…` : text;
  const facts = [
    item.duration,
    item.price !== undefined ? `from ${item.price} DKK` : undefined,
  ].filter(Boolean);
  return facts.length > 0 ? `${clipped} (${facts.join(", ")})` : clipped;
}

/** Returns null for an empty collection so the section is dropped entirely. */
function section(heading: string, items: BokunRaceCard[], basePath: string): string | null {
  if (items.length === 0) return null;
  const lines = items.map((i) => line(i.title, `${basePath}/${i.slug}`, summarise(i)));
  return `## ${heading}\n\n${lines.join("\n")}`;
}

export async function GET(): Promise<Response> {
  const items = await listAllCatalogueItems();
  const by = (collection: string) => items.filter((i) => i.collection === collection);

  const blocks: (string | null)[] = [
    `# ${SITE_NAME}`,
    [
      `> ${SITE_NAME} is a 100% Greenlandic-owned tour operator based in Nuuk, Greenland.`,
      "> We run boat tours and fjord trips in the Nuuk fjord, guided Arctic adventures,",
      "> Arctic trail races including the NuukKap Xtreme Running Race, and we rent cabins",
      "> and apartments in and around Nuuk. All tours are led by local Greenlandic guides.",
      "> Prices are in Danish kroner (DKK). Bookings are handled through Bokun.",
    ].join("\n"),
    `Contact: ${SITE_EMAIL} · ${SITE_PHONE} · ${SITE_ADDRESS.postalCode} ${SITE_ADDRESS.streetAddress}, ${SITE_ADDRESS.addressLocality}, Greenland`,
    [
      "## Start here",
      "",
      line("Home", "/", "Overview of tours, lodges, races and adventures"),
      line("About Us", "/about-us", `Who ${SITE_NAME} is, our story and our guides`),
      line("Contact Us", "/contact-us", "Enquiries and bookings"),
      line("Tour Map", "/tour-map", "Interactive map of departure points and routes"),
    ].join("\n"),
    section("Tours", by("tours"), "/tours"),
    section("Adventures", by("adventures"), "/adventures"),
    section("Arctic Lodges", by("arctic-lodges"), "/arctic-lodges"),
    section("Races", by("races"), "/races"),
    [
      "## Notes",
      "",
      `- Canonical host is ${SITE_URL}; the apex domain redirects here.`,
      "- The full page list is at /sitemap.xml.",
      "- Content is in English. Guides also speak Greenlandic and Danish.",
    ].join("\n"),
  ];

  // One blank line between blocks — required for the blockquote and headings to
  // parse as separate markdown elements.
  const body = blocks.filter((b): b is string => b !== null).join("\n\n");

  return new Response(`${body}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
