import { notFound } from "next/navigation";
import { kv } from "@vercel/kv";
import Link from "next/link";
import type { Metadata } from "next";
import { ResultCard } from "@/components/ResultCard";
import { ShareButtons } from "@/components/ShareButtons";
import { LikeButton } from "@/components/LikeButton";
import type { CatchcopyResult } from "@/types";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const result = await kv.get<CatchcopyResult>(`catchcopy:${id}`);

  if (!result) {
    return { title: "見つかりません" };
  }

  const title = `「${result.productName}」のキャッチコピー`;
  const description = result.catchcopies.map((c) => c.text).join(" / ");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ai-catchcopy.ezoai.jp";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/result/${id}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ResultPage({ params }: Props) {
  const { id } = await params;
  const result = await kv.get<CatchcopyResult>(`catchcopy:${id}`);

  if (!result) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ai-catchcopy.ezoai.jp";
  const shareUrl = `${siteUrl}/result/${id}`;
  const bestCopy = result.catchcopies[0]?.text ?? "";
  const shareText = `AIが「${result.productName}」のキャッチコピーを生成しました\n\n${bestCopy}\n\nあなたも作ってみる`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <ResultCard result={result} />

      <div className="mt-4 flex items-center gap-3">
        <LikeButton id={id} />
      </div>

      <div className="mt-4">
        <ShareButtons shareText={shareText} shareUrl={shareUrl} />
      </div>

      <div className="mt-8 flex gap-3 justify-center">
        <Link
          href="/create"
          className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-all duration-200 cursor-pointer"
        >
          もう一度生成する
        </Link>
        <Link
          href="/feed"
          className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all duration-200 cursor-pointer"
        >
          みんなの作品
        </Link>
      </div>
    </div>
  );
}
