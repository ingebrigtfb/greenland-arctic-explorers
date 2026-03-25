import crypto from "crypto";

export type BokunImage = {
  url: string;
  alt?: string;
  storagePath?: string;
};

export type BokunRaceCard = {
  id: string;
  slug: string;
  title: string;
  shortDescription?: string;
  featuredImage?: BokunImage;
  price?: number;
  duration?: string;
  location?: string;
  date?: string;
  source: "bokun";
};

export type BokunRaceDetail = {
  id: string;
  slug: string;
  title: string;
  shortDescription?: string;
  longDescription?: string;
  featuredImage?: BokunImage;
  gallery?: BokunImage[];
  price?: number;
  duration?: string;
  location?: string;
  date?: string;
  videoUrl?: string;
  source: "bokun";
};

function getRequiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function utcStamp(d: Date) {
  return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())} ${pad2(
    d.getUTCHours()
  )}:${pad2(d.getUTCMinutes())}:${pad2(d.getUTCSeconds())}`;
}

function signRequest(opts: {
  method: "GET" | "POST" | string;
  pathWithQuery: string;
  dateStr: string;
}) {
  const accessKey = getRequiredEnv("BOKUN_ACCESS_KEY");
  const secretKey = getRequiredEnv("BOKUN_SECRET_KEY");
  const signatureBase = opts.dateStr + accessKey + opts.method.toUpperCase() + opts.pathWithQuery;
  return crypto.createHmac("sha1", secretKey).update(signatureBase).digest("base64");
}

function bokunBaseUrl() {
  return process.env.BOKUN_API_BASE_URL ?? "https://api.bokun.io";
}

type BokunDerivedUrls = {
  large?: { cleanUrl?: string | null } | null;
  preview?: { cleanUrl?: string | null } | null;
  thumbnail?: { cleanUrl?: string | null } | null;
};

type BokunPhoto = {
  derived?: BokunDerivedUrls | null;
  originalUrl?: string | null;
  alternateText?: string | null;
  description?: string | null;
  fileName?: string | null;
  id?: string | number;
};

function getDerivedImageUrl(photo: unknown): string | null {
  const p = photo as BokunPhoto | undefined;
  const derived = p?.derived ?? undefined;
  return (
    derived?.large?.cleanUrl ??
    derived?.preview?.cleanUrl ??
    derived?.thumbnail?.cleanUrl ??
    p?.originalUrl ??
    null
  );
}

function mapBokunPhoto(photo: unknown): BokunImage | undefined {
  const url = getDerivedImageUrl(photo);
  if (!url) return undefined;
  const p = photo as BokunPhoto | undefined;
  return {
    url,
    alt: p?.alternateText ?? p?.description ?? undefined,
    storagePath: p?.fileName ?? (p?.id != null ? String(p.id) : undefined),
  };
}

export async function listBokunRaces(): Promise<BokunRaceCard[]> {
  return listBokunByProductCode("race");
}

export async function listBokunTours(): Promise<BokunRaceCard[]> {
  return listBokunByProductCode("tour");
}

export async function listBokunActivities(): Promise<BokunRaceCard[]> {
  return listBokunByProductCode("activities");
}

export async function listBokunLodges(): Promise<BokunRaceCard[]> {
  return listBokunByProductCode("lodge");
}

function matchesProductCode(externalId: unknown, productCode: string) {
  const code = productCode.trim().toLowerCase();
  if (!code) return false;
  const v = externalId == null ? "" : String(externalId).trim().toLowerCase();
  // Matches case-insensitively (e.g. "Tour" / "tour") and supports "tour-123" style codes.
  return v === code || v.includes(`${code}-`) || v.includes(code);
}

async function listBokunByProductCode(productCode: string): Promise<BokunRaceCard[]> {
  const lang = process.env.BOKUN_RACE_LANG ?? "EN";
  const currency = process.env.BOKUN_RACE_CURRENCY ?? "DKK";
  const pageSize = Number(process.env.BOKUN_RACE_PAGE_SIZE ?? process.env.BOKUN_LIST_PAGE_SIZE ?? "12");

  const pathWithQuery = `/activity.json/search?lang=${encodeURIComponent(lang)}&currency=${encodeURIComponent(currency)}`;
  const dateStr = utcStamp(new Date());
  const signature = signRequest({ method: "POST", pathWithQuery, dateStr });

  const res = await fetch(bokunBaseUrl() + pathWithQuery, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "X-Bokun-Date": dateStr,
      "X-Bokun-AccessKey": getRequiredEnv("BOKUN_ACCESS_KEY"),
      "X-Bokun-Signature": signature,
    },
    body: JSON.stringify({ page: 1, pageSize }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Bokun activity search failed (${res.status}): ${text.slice(0, 300)}`);
  }

  type BokunLocationCode = { location?: string | null } | null | undefined;
  type BokunActivitySearchItem = {
    id?: string | number | null;
    externalId?: string | null;
    title?: string | null;
    excerpt?: string | null;
    price?: number | string | null;
    durationText?: string | null;
    locationCode?: BokunLocationCode;
    keyPhoto?: unknown;
  };

  const json: unknown = await res.json();
  const itemsRaw: unknown = (json as { items?: unknown })?.items;
  const items: BokunActivitySearchItem[] = Array.isArray(itemsRaw) ? (itemsRaw as BokunActivitySearchItem[]) : [];

  const filtered = items
    .filter((item) => item.id != null && matchesProductCode(item.externalId, productCode))
    .slice()
    .sort((a, b) => {
      const ea = (a.externalId ?? "").toLowerCase();
      const eb = (b.externalId ?? "").toLowerCase();
      const byCode = ea.localeCompare(eb);
      if (byCode !== 0) return byCode;
      return String(a.title ?? "").localeCompare(String(b.title ?? ""));
    });

  return filtered.map((item) => {
    const priceNum = typeof item.price === "number" ? item.price : Number(item.price);
    const id = String(item.id);
    return {
      id,
      slug: `bokun-${id}`,
      title: String(item.title ?? "Untitled"),
      shortDescription: item.excerpt ? String(item.excerpt) : undefined,
      featuredImage: mapBokunPhoto(item.keyPhoto),
      price: Number.isFinite(priceNum) ? priceNum : undefined,
      duration: item.durationText ? String(item.durationText) : undefined,
      location: item.locationCode?.location ? String(item.locationCode.location) : undefined,
      date: undefined,
      source: "bokun",
    };
  });
}

export async function getBokunRaceDetail(id: string): Promise<BokunRaceDetail> {
  const lang = process.env.BOKUN_RACE_LANG ?? "EN";
  const currency = process.env.BOKUN_RACE_CURRENCY ?? "DKK";

  const pathWithQuery = `/activity.json/${encodeURIComponent(id)}?lang=${encodeURIComponent(lang)}&currency=${encodeURIComponent(currency)}`;
  const dateStr = utcStamp(new Date());
  const signature = signRequest({ method: "GET", pathWithQuery, dateStr });

  const res = await fetch(bokunBaseUrl() + pathWithQuery, {
    method: "GET",
    headers: {
      "X-Bokun-Date": dateStr,
      "X-Bokun-AccessKey": getRequiredEnv("BOKUN_ACCESS_KEY"),
      "X-Bokun-Signature": signature,
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Bokun activity detail failed (${res.status}): ${text.slice(0, 300)}`);
  }

  type BokunLocationCode = { location?: string | null } | null | undefined;
  type BokunVideo = { url?: string | null };
  type BokunActivityDetail = {
    id?: string | number | null;
    title?: string | null;
    excerpt?: string | null;
    description?: string | null;
    keyPhoto?: unknown;
    photos?: unknown[];
    price?: number | string | null;
    durationText?: string | null;
    locationCode?: BokunLocationCode;
    videos?: BokunVideo[] | null;
  };

  const json: unknown = await res.json();
  const item = json as BokunActivityDetail;
  const galleryPhotos: BokunImage[] = Array.isArray(item.photos)
    ? item.photos.map((p) => mapBokunPhoto(p)).filter((p): p is BokunImage => Boolean(p))
    : [];

  return {
    id: String(item.id ?? id),
    slug: `bokun-${id}`,
    title: String(item.title ?? "Untitled"),
    shortDescription: item.excerpt ? String(item.excerpt) : undefined,
    longDescription: item.description ? String(item.description) : undefined,
    featuredImage: mapBokunPhoto(item.keyPhoto),
    gallery: galleryPhotos,
    price: typeof item.price === "number" ? item.price : Number(item.price),
    duration: item.durationText ? String(item.durationText) : undefined,
    location: item.locationCode?.location ? String(item.locationCode.location) : undefined,
    date: undefined,
    videoUrl:
      Array.isArray(item.videos) && item.videos[0]?.url ? String(item.videos[0].url) : undefined,
    source: "bokun",
  };
}

