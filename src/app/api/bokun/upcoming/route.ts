import { NextResponse } from "next/server";
import { listBokunRaces, listBokunTours, listBokunActivities } from "@/lib/bokun";

export async function GET() {
  const today = new Date().toISOString().slice(0, 10);

  const results = await Promise.allSettled([
    listBokunRaces(),
    listBokunTours(),
    listBokunActivities(),
  ]);

  const all = results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));

  const upcoming = all
    .filter((item) => item.date && item.date >= today)
    .sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""));

  return NextResponse.json({ items: upcoming });
}
