/**
 * Curated URL map for the Bokun catalogue.
 *
 * Bokun exposes no field that can hold a keyword-bearing URL, and the previous
 * scheme derived slugs from the product title (`slugify(title)-<bokunId>`). That
 * made every indexed URL hostage to a title edit: correcting "Hike in greenland",
 * dropping "(Coming Soon)" from Illu Qoornoq, or rolling the races to 2027 dates
 * would each have silently 404'd a live page.
 *
 * Keying on the Bokun id — the one value that never changes — decouples URLs
 * from titles permanently. Titles can be edited freely; URLs hold.
 *
 * Adding a product: add a row here. Until then it still appears on the site at
 * its legacy title-derived slug, and `next build` warns that it is unmapped.
 */

export const SECTIONS = ["tours", "adventures", "arctic-lodges", "races"] as const;
export type Section = (typeof SECTIONS)[number];

export type CatalogueEntry = {
  /** Bokun activity id. Stable across every title and category edit. */
  bokunId: string;
  /** Canonical slug: lowercase, English, keyword-bearing, no id, no date. */
  slug: string;
  section: Section;
};

export const CATALOGUE: readonly CatalogueEntry[] = [
  // ── Tours ─────────────────────────────────────────────────────────────
  { bokunId: "1198350", slug: "nuuk-fjord-boat-tour", section: "tours" },
  { bokunId: "1198348", slug: "nuuk-icefjord-boat-tour", section: "tours" },
  { bokunId: "1198345", slug: "nuuk-whale-watching-safari", section: "tours" },
  { bokunId: "1198342", slug: "kapisillit-day-trip", section: "tours" },
  { bokunId: "1198349", slug: "qoornoq-day-trip", section: "tours" },
  { bokunId: "1198352", slug: "maniitsoq-one-way-boat-transfer", section: "tours" },

  // ── Adventures ────────────────────────────────────────────────────────
  { bokunId: "1236217", slug: "northern-lights-boat-tour-nuuk", section: "adventures" },
  { bokunId: "1236221", slug: "guided-hike-nuuk", section: "adventures" },
  { bokunId: "1198343", slug: "nuuk-fishing-trip", section: "adventures" },
  { bokunId: "1198344", slug: "qooqqut-catch-and-eat", section: "adventures" },
  { bokunId: "1207708", slug: "nuuk-puffin-safari", section: "adventures" },
  { bokunId: "1214082", slug: "ski-touring-nuuk", section: "adventures" },
  { bokunId: "1198354", slug: "ptarmigan-hunting-nuuk", section: "adventures" },

  // ── Arctic Lodges ─────────────────────────────────────────────────────
  // "illu" is Greenlandic for house; kept because it is the product's real name.
  { bokunId: "1207621", slug: "illu-majuala-cabin", section: "arctic-lodges" },
  { bokunId: "1214064", slug: "illu-saqqaannguit-cabin", section: "arctic-lodges" },
  { bokunId: "1214071", slug: "illu-qoornoq-cabin", section: "arctic-lodges" },
  { bokunId: "1203612", slug: "kirkevej-7-apartment-nuuk", section: "arctic-lodges" },
  { bokunId: "1214072", slug: "kirkevej-9-apartment-nuuk", section: "arctic-lodges" },

  // ── Races ─────────────────────────────────────────────────────────────
  // Deliberately undated: the 2026 dates live in the Bokun titles, and rolling
  // them to 2027 must not change these URLs.
  { bokunId: "1198329", slug: "nuukkap-xtreme-running-race", section: "races" },
  { bokunId: "1198338", slug: "kiinaasaq-1653-trail-race", section: "races" },
  { bokunId: "1198339", slug: "kangnu-running-race", section: "races" },
];

const BY_ID = new Map(CATALOGUE.map((e) => [e.bokunId, e]));
const BY_SLUG = new Map(CATALOGUE.map((e) => [e.slug, e]));

export function entryByBokunId(bokunId: string): CatalogueEntry | undefined {
  return BY_ID.get(bokunId);
}

export function entryBySlug(slug: string): CatalogueEntry | undefined {
  return BY_SLUG.get(slug);
}

export function pathFor(entry: CatalogueEntry): string {
  return `/${entry.section}/${entry.slug}`;
}

/** Legacy slugs carry the Bokun id as a trailing `-<digits>` segment. */
export function bokunIdFromLegacySlug(slug: string): string | null {
  const m = slug.match(/-(\d{5,})$/);
  return m ? m[1] : null;
}

/**
 * The slug an item should be listed under: its canonical slug when mapped,
 * otherwise the legacy title-derived form so new products still appear.
 */
export function slugFor(bokunId: string, legacySlug: string): string {
  return BY_ID.get(bokunId)?.slug ?? legacySlug;
}

export type SlugResolution =
  /** Serve this page. */
  | { kind: "render"; bokunId: string }
  /** Permanently redirect to the canonical URL. */
  | { kind: "redirect"; to: string }
  | { kind: "notFound" };

/**
 * Resolve an incoming detail URL.
 *
 * Handles, in one place: canonical hits, legacy id-bearing slugs, a canonical
 * slug requested under the wrong section, and unmapped products. Because legacy
 * slugs embed the Bokun id, this keeps working even after a title edit changes
 * what the legacy slug would be.
 */
export function resolveDetailSlug(section: Section, slug: string): SlugResolution {
  const canonical = entryBySlug(slug);
  if (canonical) {
    return canonical.section === section
      ? { kind: "render", bokunId: canonical.bokunId }
      : { kind: "redirect", to: pathFor(canonical) };
  }

  const bokunId = bokunIdFromLegacySlug(slug);
  if (!bokunId) return { kind: "notFound" };

  const mapped = entryByBokunId(bokunId);
  // Mapped product reached by an old URL — send it to the canonical one.
  if (mapped) return { kind: "redirect", to: pathFor(mapped) };

  // Unmapped product: serve it where it is until someone curates a slug.
  return { kind: "render", bokunId };
}


// Duplicate slugs would make two products fight over one URL. Caught at module
// load so it surfaces the moment the file is imported, not on a later request.
if (BY_SLUG.size !== CATALOGUE.length) {
  const seen = new Set<string>();
  const dupes = CATALOGUE.map((e) => e.slug).filter((s) => !seen.add(s));
  throw new Error(`Duplicate catalogue slug(s): ${[...new Set(dupes)].join(", ")}`);
}
if (BY_ID.size !== CATALOGUE.length) {
  throw new Error("Duplicate bokunId in CATALOGUE");
}

export type CatalogueDrift = {
  /** Live in Bokun but absent from the map — served at a legacy slug for now. */
  unmapped: { bokunId: string; title: string; section: Section }[];
  /** In the map but no longer returned by Bokun — a stale row. */
  stale: CatalogueEntry[];
  /** Mapped, but Bokun's product code now implies a different section. */
  sectionMismatch: { entry: CatalogueEntry; bokunSection: Section }[];
};

/**
 * Compare the map against what Bokun actually returns.
 *
 * The map is authoritative — that is what keeps URLs stable — so drift is
 * reported rather than silently applied. Called during sitemap generation, so
 * it surfaces on every build and every hourly revalidation.
 */
export function reportCatalogueDrift(
  live: { bokunId: string; title: string; section: Section; codeSection: Section | null }[]
): CatalogueDrift {
  const liveIds = new Set(live.map((l) => l.bokunId));

  const drift: CatalogueDrift = {
    unmapped: live
      .filter((l) => !BY_ID.has(l.bokunId))
      .map(({ bokunId, title, section }) => ({ bokunId, title, section })),
    stale: CATALOGUE.filter((e) => !liveIds.has(e.bokunId)),
    sectionMismatch: live.flatMap((l) => {
      const entry = BY_ID.get(l.bokunId);
      return entry && l.codeSection && entry.section !== l.codeSection
        ? [{ entry, bokunSection: l.codeSection }]
        : [];
    }),
  };

  for (const u of drift.unmapped) {
    console.warn(
      `[catalogue] Unmapped product ${u.bokunId} "${u.title}" — serving at its legacy slug. ` +
        `Add a row to src/lib/catalogue.ts to give it a permanent URL.`
    );
  }
  for (const e of drift.stale) {
    console.warn(
      `[catalogue] Mapped product ${e.bokunId} (${e.slug}) is no longer in Bokun. ` +
        `Remove the row, or redirect ${pathFor(e)} if the URL is indexed.`
    );
  }
  for (const m of drift.sectionMismatch) {
    console.warn(
      `[catalogue] Section mismatch for ${m.entry.bokunId} (${m.entry.slug}): ` +
        `map says "${m.entry.section}", Bokun product code says "${m.bokunSection}". ` +
        `The map wins. Update it if the move is intended — the old URL will redirect.`
    );
  }
  return drift;
}
