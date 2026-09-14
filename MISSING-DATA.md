# Missing data

Values the site needs but cannot render, because no source holds them. Nothing here is
invented — where a field is absent the page renders nothing rather than a guess.

Regenerate the evidence for this file with the audit scripts under `/tmp` or by querying
the Bokun activity endpoints directly.

## Blocking — pages are live but thin

| Product | Bokun ID | Problem |
|---|---|---|
| Kirkevej 7 | `1203612` | **No description at all** (0 characters in Bokun). Page renders a title, price and photos only. |
| Kirkevej 9 | `1214072` | **No description at all** (0 characters in Bokun). Same. |
| Nuuk fjord day tour | `1198350` | Description is 268 characters. Detail page totals ~176 words — too thin to rank or be quoted. |
| Maniitsoq One-Way Trip | `1198352` | Description is 304 characters. |
| Fishing Trip Nuuk | `1198343` | Description is 232 characters. |
| Ptarmigan Hunting | `1198354` | Description is 258 characters. |

## Fields no source provides

These are the facts AI answer engines quote most often. Bokun has no populated field for
any of them, so they are absent from every detail page and from the JSON-LD.

- **Season / months of operation** — nothing in Bokun. Needed for whale, northern-lights
  and ski-touring pages especially, where seasonality is the search intent.
- **Group size / max participants** — `pricingCategories` carries no min/max per booking.
- **What's included / what to bring** — no `included`, `excluded` or `requirements` field
  is populated on any of the 21 products.
- **Departure point** — `startPoints` has usable coordinates for only **9 of 21** products.
- **Difficulty** — `difficultyLevel` returns `EASY` for all 21 products. This is an unset
  Bokun default, not a rating. Rendering it would publish 21 false claims, so it is ignored.
- **Minimum age** — `minAge` returns `0` for all 21. Same reasoning, also ignored.
- **Know before you go** — `keyValues` is empty on all 21, so `resolveKnowBeforeYouGo()`
  always falls through to `publicNotes`.

## Values to confirm

- **Ski Touring Experience (Randonnée)** `1214082` — priced at **45,000 DKK**, roughly 30×
  every other adventure (next highest is 3,950). Typo, or a genuine private-charter rate?
- **Illu Qoornoq** `1214071` — title still reads "(Coming Soon)". Publish, or exclude from
  the sitemap until it is bookable?
- **Illu Majuala** `1207621` — no Bokun field states its location. The brief's example slug
  implies Kapisillit; unconfirmed, so the location is omitted from the slug and the page.
- **Race dates** — all three races are dated 2026 (Jul 2, Jul 24, Aug 22) and have passed.
  The homepage "Upcoming Expeditions" section filters to `date >= today` and is therefore
  **empty for all visitors**. It needs 2027 dates in Bokun.

## Site-wide

- **Canonical NAP** — the codebase says `3905 Qinngorput, Nuuk` / `+299 260720` (footer,
  Firestore `content/contact`, and the `TravelAgency` JSON-LD all agree). Facebook and
  directory listings say `Uiffak, Nuuk` / `+299 55 81 28`. One set is wrong; pick one.
- **Geo coordinates** — `TravelAgency` JSON-LD has no `geo`. Needs a real lat/lng for the
  office; will not be invented.
- **Legacy URL list** — no record of the old Squarespace paths exists in the repo or in any
  branch's history. Three known 404s: `/tur-i-aben-bad`, `/tur-i-aben-bad-1`,
  `/adventure-races/event-one-65z97-l59a5`. Export Search Console *Performance → Pages*, or
  pull the old sitemap from the Wayback Machine, to build the redirect map.
- **Reviews** — Bokun returns `reviewCount: 0` on all 21 products. No `AggregateRating` or
  `Review` markup is emitted, and none should be until verifiable reviews exist.
