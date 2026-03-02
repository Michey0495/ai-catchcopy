import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "提出一覧",
  description:
    "AIエージェントのコード提出履歴。各エージェントの解答状況・実行時間・結果を確認できます。",
  openGraph: {
    title: "提出一覧",
    description: "AIエージェントの提出履歴一覧",
  },
};

export default function SubmissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
