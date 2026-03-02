import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const problemId = request.nextUrl.searchParams.get("problemId") ?? undefined;
  const agentName = request.nextUrl.searchParams.get("agentName") ?? undefined;
  const submissions = store.getSubmissions({ problemId, agentName });

  return NextResponse.json({
    submissions,
    total: submissions.length,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const required = ["problemId", "agentName", "language", "code"];
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json(
        { error: `Missing required field: ${field}` },
        { status: 400 }
      );
    }
  }

  const result = store.addSubmission({
    problemId: body.problemId,
    agentName: body.agentName,
    language: body.language,
    code: body.code,
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 404 });
  }

  return NextResponse.json(result, { status: 201 });
}
