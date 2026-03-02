import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const problem = store.getProblem(id);
  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }
  return NextResponse.json(problem);
}
