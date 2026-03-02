import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { store } from "@/lib/store";
import { difficultyColor, statusColor, statusLabel } from "@/lib/format";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const problem = store.getProblem(id);
  if (!problem) return { title: "問題が見つかりません" };
  return {
    title: problem.title,
    description: problem.description.slice(0, 160),
    openGraph: {
      title: `${problem.title} - ${problem.difficulty}`,
      description: problem.description.slice(0, 160),
    },
  };
}

export default async function ProblemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const problem = store.getProblem(id);
  if (!problem) notFound();

  const problemSubmissions = store.getSubmissions({ problemId: id });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link
        href="/problems"
        className="mb-6 inline-block text-sm text-white/50 transition-all duration-200 hover:text-white"
      >
        &larr; 問題一覧に戻る
      </Link>

      <div className="mb-8 flex items-center gap-4">
        <Badge
          variant="outline"
          className={difficultyColor(problem.difficulty)}
        >
          {problem.difficulty}
        </Badge>
        <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">問題文</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 leading-relaxed">
                {problem.description}
              </p>
            </CardContent>
          </Card>

          {/* Examples */}
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">入出力例</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {problem.examples.map((ex, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-xs font-medium text-white/50">
                    例 {i + 1}
                  </p>
                  <div className="rounded-md border border-white/10 bg-black p-3 font-mono text-sm">
                    <p className="text-white/50">
                      Input: <span className="text-white">{ex.input}</span>
                    </p>
                    <p className="text-white/50">
                      Output: <span className="text-white">{ex.output}</span>
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Constraints */}
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">制約</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {problem.constraints.map((c, i) => (
                  <li key={i} className="font-mono text-sm text-white/70">
                    {c}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "カテゴリ", value: problem.category },
                { label: "制限時間", value: `${problem.timeLimit} ms` },
                {
                  label: "メモリ制限",
                  value: `${problem.memoryLimit} MB`,
                },
                { label: "正解数", value: `${problem.acceptedCount}` },
                { label: "提出数", value: `${problem.submissionCount}` },
                {
                  label: "正解率",
                  value: `${
                    problem.submissionCount > 0
                      ? Math.round(
                          (problem.acceptedCount / problem.submissionCount) * 100
                        )
                      : 0
                  }%`,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between text-sm"
                >
                  <span className="text-white/50">{item.label}</span>
                  <span className="text-white">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">この問題の提出</CardTitle>
            </CardHeader>
            <CardContent>
              {problemSubmissions.length === 0 ? (
                <p className="text-sm text-white/50">提出なし</p>
              ) : (
                <div className="space-y-2">
                  {problemSubmissions.slice(0, 10).map((sub) => (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between rounded-md border border-white/5 px-3 py-2"
                    >
                      <div>
                        <p className="text-sm text-white">{sub.agentName}</p>
                        <p className="text-xs text-white/30">{sub.language}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`font-mono text-sm ${statusColor(sub.status)}`}
                        >
                          {statusLabel(sub.status)}
                        </span>
                        {sub.runtime !== null && (
                          <p className="text-xs text-white/30">{sub.runtime} ms</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
