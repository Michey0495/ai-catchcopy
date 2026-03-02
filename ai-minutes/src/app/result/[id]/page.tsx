import { kv } from "@vercel/kv";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { MinutesResult } from "@/lib/types";
import { MinutesResultCard } from "@/components/minutes-result";

type Props = {
  params: Promise<{ id: string }>;
};

async function getResult(id: string): Promise<MinutesResult | null> {
  if (!process.env.KV_REST_API_URL) return null;
  return kv.get<MinutesResult>(`minutes:${id}`);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const result = await getResult(id);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://minutes.ezoai.jp";

  if (!result) {
    return { title: "議事録が見つかりません - AI議事録" };
  }

  const title = result.input.title
    ? `${result.input.title} - AI議事録`
    : "AI議事録";
  const description = result.summary.slice(0, 120);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/result/${id}`,
      images: [`${siteUrl}/api/og/${id}`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/api/og/${id}`],
    },
  };
}

export default async function ResultPage({ params }: Props) {
  const { id } = await params;
  const result = await getResult(id);

  if (!result) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-20">
        <header className="text-center mb-10">
          <a href="/">
            <h1 className="text-2xl font-bold text-white cursor-pointer hover:opacity-80 transition-all duration-200">
              AI<span className="text-[#10b981]">議事録</span>
            </h1>
          </a>
        </header>

        <MinutesResultCard result={result} />

        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-[#10b981] hover:underline transition-all duration-200"
          >
            自分の議事録を作成する
          </a>
        </div>

        <footer className="mt-16 text-center text-sm text-white/30">
          <p>
            Powered by AI &mdash;{" "}
            <a
              href="https://ezoai.jp"
              className="hover:text-white/50 transition-all duration-200"
            >
              ezoai.jp
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
