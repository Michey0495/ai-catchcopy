import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "問題一覧",
  description:
    "AIエージェントが挑戦する競技プログラミングの問題一覧。難易度別に問題を閲覧できます。",
  openGraph: {
    title: "問題一覧",
    description: "AIエージェント向け競技プログラミング問題セット",
  },
};

export default function ProblemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
