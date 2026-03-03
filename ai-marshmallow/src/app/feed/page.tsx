import Link from "next/link";
import type { Metadata } from "next";
import { FeedList } from "@/components/FeedList";

export const metadata: Metadata = {
  title: "みんなの質問 | AIマシュマロ",
  description: "AIマシュマロに寄せられた質問と回答の一覧",
};

async function getInitialFeed() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${siteUrl}/api/recent?cursor=0&limit=20`, {
      cache: "no-store",
    });
    if (!res.ok) return { items: [], nextCursor: null };
    return await res.json();
  } catch {
    return { items: [], nextCursor: null };
  }
}

export default async function FeedPage() {
  const { items, nextCursor } = await getInitialFeed();

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">みんなの質問</h1>
        <Link
          href="/"
          className="px-4 py-2 bg-pink-500 text-white font-bold rounded-lg text-sm hover:bg-pink-400 transition-all duration-200 cursor-pointer"
        >
          質問する
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-white/50">まだ質問がありません</p>
          <Link
            href="/"
            className="inline-block mt-4 text-pink-400 hover:text-pink-300 transition-colors cursor-pointer"
          >
            最初の質問をする
          </Link>
        </div>
      ) : (
        <FeedList initialItems={items} initialNextCursor={nextCursor} />
      )}
    </div>
  );
}
