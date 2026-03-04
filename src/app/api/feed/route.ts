import { NextRequest, NextResponse } from "next/server";
import type { CatchcopyResult, FeedItem } from "@/types";

export async function GET(request: NextRequest) {
  try {
    if (!process.env.KV_REST_API_URL) {
      return NextResponse.json({ items: [], nextCursor: null });
    }
    const { kv } = await import("@vercel/kv");
    const { searchParams } = request.nextUrl;
    const cursor = parseInt(searchParams.get("cursor") || "0", 10);
    const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 50);
    const sort = searchParams.get("sort") || "new";

    const feedKey = sort === "popular" ? "catchcopy:popular" : "catchcopy:feed";
    const ids = await kv.zrange(feedKey, cursor, cursor + limit, { rev: true });

    if (!ids || ids.length === 0) {
      return NextResponse.json({ items: [], nextCursor: null });
    }

    const results = await Promise.all(
      ids.map((id) => kv.get<CatchcopyResult>(`catchcopy:${id}`))
    );

    const likeKeys = ids.map((id) => `likes:catchcopy:${id}`);
    const likeCounts = await kv.mget<(number | null)[]>(...likeKeys);

    const feedItems: (FeedItem & { likes: number })[] = results
      .filter((r): r is CatchcopyResult => r !== null)
      .map((r, i) => ({
        id: r.id,
        productName: r.productName,
        catchcopies: r.catchcopies.map((c) => c.text),
        tone: r.tone,
        agentName: r.agentName,
        createdAt: r.createdAt,
        likes: likeCounts[i] ?? 0,
      }));

    const nextCursor = ids.length === limit + 1 ? cursor + limit : null;

    return NextResponse.json({ items: feedItems, nextCursor });
  } catch (error) {
    console.error("Feed error:", error);
    return NextResponse.json({ items: [], nextCursor: null }, { status: 500 });
  }
}
