import { NextResponse, type NextRequest } from "next/server";
import { getBokunRaceDetail } from "@/lib/bokun";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id?: string }> }
) {
  const { id } = await context.params;
  if (!id) return NextResponse.json({ race: null }, { status: 400 });
  const race = await getBokunRaceDetail(id);
  return NextResponse.json({ race });
}

