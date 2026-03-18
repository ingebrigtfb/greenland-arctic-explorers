import { NextResponse } from "next/server";
import { listBokunLodges } from "@/lib/bokun";

export async function GET() {
  const items = await listBokunLodges();
  return NextResponse.json({ items });
}

