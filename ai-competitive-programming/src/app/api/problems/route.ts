import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const difficulty = request.nextUrl.searchParams.get("difficulty") ?? undefined;
  const problems = store.getProblems(difficulty);

  return NextResponse.json({
    problems: problems.map(({ description: _d, examples: _e, constraints: _c, ...rest }) => rest),
    total: problems.length,
  });
}
