import Link from "next/link";
import type { FeedItem } from "@/types";

function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}秒前`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}分前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}時間前`;
  const days = Math.floor(hours / 24);
  return `${days}日前`;
}

async function getRecentItems(): Promise<FeedItem[]> {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${siteUrl}/api/feed`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const recentItems = await getRecentItems();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <section className="text-center space-y-6 mb-20">
        <p className="text-sm text-cyan-400/80 tracking-wider uppercase">
          無料 / 登録不要 / 30秒で完了
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          コピーライターに頼まなくても、
          <br />
          <span className="text-cyan-400">刺さる一行</span>は作れる
        </h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
          商品名と説明を入力するだけ。AIがプロ品質のキャッチコピーを5案同時に生成。
          LP、広告、SNS、チラシ
          &#x2014;あらゆる場面の「言葉の壁」を30秒で突破。
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/create"
            className="inline-block px-8 py-4 bg-cyan-500 text-black font-bold rounded-xl text-lg hover:bg-cyan-400 hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            無料でキャッチコピーを生成
          </Link>
          <span className="text-white/30 text-sm">登録・ログイン不要</span>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6 mb-20">
        {[
          { title: "5案を瞬時に生成", desc: "異なるアプローチで5つのキャッチコピーを一度に生成。比較して最適な一行を選べる" },
          { title: "5つのトーンから選択", desc: "プロフェッショナル、カジュアル、遊び心、エレガント、大胆。ブランドに合うトーンで" },
          { title: "ワンタップでコピー", desc: "気に入ったキャッチコピーをタップして即座にコピー。SNSシェアもワンタップ" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
          >
            <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="mb-20">
        <h2 className="text-xl font-bold text-white text-center mb-8">
          こんな場面で使われています
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "ネットショップの商品名",
            "SNS広告のコピー",
            "ランディングページ",
            "チラシ・DM",
            "メルマガの件名",
            "プレゼン資料",
            "YouTubeのタイトル",
            "ブログ記事の見出し",
          ].map((useCase, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center text-sm text-white/70"
            >
              {useCase}
            </div>
          ))}
        </div>
      </section>

      {recentItems.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">最近の生成</h2>
            <Link
              href="/feed"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200 cursor-pointer"
            >
              すべて見る
            </Link>
          </div>
          <div className="space-y-3">
            {recentItems.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                href={`/result/${item.id}`}
                className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold truncate">{item.productName}</p>
                    <p className="text-cyan-400/80 text-sm mt-1 truncate">
                      {item.catchcopies[0]}
                    </p>
                  </div>
                  <span className="text-white/30 text-xs ml-4 shrink-0">
                    {timeAgo(item.createdAt)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
