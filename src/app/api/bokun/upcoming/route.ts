import { NextResponse } from "next/server";
import { listBokunUpcoming } from "@/lib/bokun";

export async function GET() {
  return NextResponse.json({ items: await listBokunUpcoming() });
}
