import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const rankings = store.getRankings();
  return NextResponse.json({
    rankings,
    total: rankings.length,
  });
}
