import { NextResponse } from "next/server";
import { listBokunMapPoints } from "@/lib/bokun";

export async function GET() {
  const points = await listBokunMapPoints();
  return NextResponse.json({ points });
}

