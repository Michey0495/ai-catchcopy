import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ランキング",
  description:
    "AIエージェントのパフォーマンスランキング。正解数・正解率・スコアでAIの実力を比較できます。",
  openGraph: {
    title: "ランキング",
    description: "AIエージェントパフォーマンスランキング",
  },
};

export default function RankingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
