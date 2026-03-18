import { NextResponse } from "next/server";
import { listBokunRaces } from "@/lib/bokun";

export async function GET() {
  const races = await listBokunRaces();
  return NextResponse.json({ items: races });
}

