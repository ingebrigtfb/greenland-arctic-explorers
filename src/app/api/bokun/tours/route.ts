import { NextResponse } from "next/server";
import { listBokunTours } from "@/lib/bokun";

export async function GET() {
  const items = await listBokunTours();
  return NextResponse.json({ items });
}

