const MONTH_MAP: Record<string, number> = {
  january: 1, jan: 1,
  february: 2, feb: 2,
  march: 3, mar: 3,
  april: 4, apr: 4,
  may: 5,
  june: 6, jun: 6,
  july: 7, jul: 7,
  august: 8, aug: 8,
  september: 9, sep: 9, sept: 9,
  october: 10, oct: 10,
  november: 11, nov: 11,
  december: 12, dec: 12,
};

const MONTH_RE = new RegExp(
  `\\b(${Object.keys(MONTH_MAP).sort((a, b) => b.length - a.length).join("|")})\\b`,
  "i"
);

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * Extracts the earliest date reference from a title string and returns it as
 * a YYYY-MM-DD string, or undefined if no recognisable date is found.
 *
 * Handles:
 *   "Race 2026"                    → "2026-01-01"
 *   "Tour July 2026"               → "2026-07-01"
 *   "Run 15 July 2026"             → "2026-07-15"
 *   "Run 15-17 July 2026"          → "2026-07-15"
 *   "Run July 15 2026"             → "2026-07-15"
 *   "Run July 15-17, 2026"         → "2026-07-15"
 *   "Event 2026-07-15"             → "2026-07-15"
 */
export function extractDateFromTitle(title: string): string | undefined {
  if (!title) return undefined;

  // 1. ISO format YYYY-MM-DD anywhere in the title
  const iso = title.match(/\b(20\d{2})-(0[1-9]|1[0-2])-([0-2]\d|3[01])\b/);
  if (iso) return iso[0];

  // 2. Find year
  const yearMatch = title.match(/\b(20\d{2})\b/);
  if (!yearMatch) return undefined;
  const year = parseInt(yearMatch[1], 10);

  // 3. Find month name
  const monthMatch = title.match(MONTH_RE);
  if (!monthMatch) {
    // Year only — use mid-year placeholder so it shows in upcoming
    return `${year}-01-01`;
  }
  const month = MONTH_MAP[monthMatch[1].toLowerCase()];

  // 4. Find a day number — look for digits before or after the month name
  //    Handles "15 July", "15-17 July", "July 15", "July 15-17", "July 15th"
  const beforeMonth = title.slice(0, monthMatch.index ?? 0);
  const afterMonth = title.slice((monthMatch.index ?? 0) + monthMatch[1].length);

  const dayBefore = beforeMonth.match(/(\d{1,2})(?:-\d{1,2})?(?:st|nd|rd|th)?\s*$/i);
  const dayAfter = afterMonth.match(/^\s*(\d{1,2})(?:-\d{1,2})?(?:st|nd|rd|th)?/i);

  const dayStr = dayBefore?.[1] ?? dayAfter?.[1];
  const day = dayStr ? parseInt(dayStr, 10) : 1;
  const safeDay = day >= 1 && day <= 31 ? day : 1;

  return `${year}-${pad(month)}-${pad(safeDay)}`;
}
