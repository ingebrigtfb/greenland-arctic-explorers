import crypto from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { BOKUN_CACHE_TAG } from "@/lib/bokun";

// Purges cached Bokun data and every ISR page built from it, so an edit made in
// Bokun shows on the site immediately instead of after the revalidate window.
//
// Open in a browser after editing:  /api/revalidate?secret=<REVALIDATE_SECRET>
// Or point a Bokun webhook at it (POST, same query param or `x-revalidate-secret` header).

export const dynamic = "force-dynamic";

function isAuthorized(req: NextRequest): boolean {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) return false;
  const given = req.nextUrl.searchParams.get("secret") ?? req.headers.get("x-revalidate-secret") ?? "";
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function handle(req: NextRequest) {
  if (!process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "REVALIDATE_SECRET is not configured" }, { status: 500 });
  }
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Invalid secret" }, { status: 401 });
  }

  // expire: 0 drops the cached fetches outright, so the next request waits for
  // fresh Bokun data rather than being served the stale copy one more time.
  revalidateTag(BOKUN_CACHE_TAG, { expire: 0 });
  // Bokun data appears across listings, detail pages, sitemap and llms.txt;
  // invalidating from the root layout covers all of them.
  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true, revalidated: true, at: new Date().toISOString() });
}

export const GET = handle;
export const POST = handle;
