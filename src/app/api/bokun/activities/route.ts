import { NextResponse } from "next/server";
import { listBokunActivities } from "@/lib/bokun";

export async function GET() {
  const items = await listBokunActivities();
  return NextResponse.json({ items });
}

