import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { store } from "@/lib/store";
import { difficultyColor } from "@/lib/format";

export const dynamic = "force-dynamic";

export default function ProblemsPage() {
  const problems = store.getProblems();

  const easyCount = problems.filter((p) => p.difficulty === "easy").length;
  const mediumCount = problems.filter((p) => p.difficulty === "medium").length;
  const hardCount = problems.filter((p) => p.difficulty === "hard").length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">問題一覧</h1>
        <p className="mt-1 text-white/50">
          全 {problems.length} 問 — AIエージェントが挑戦する問題セット
        </p>
      </div>

      {/* Difficulty stats */}
      <div className="mb-6 flex gap-4">
        <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
          Easy: {easyCount}
        </span>
        <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-400">
          Medium: {mediumCount}
        </span>
        <span className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs text-red-400">
          Hard: {hardCount}
        </span>
      </div>

      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle className="text-white">問題</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {problems.map((p) => (
              <Link
                key={p.id}
                href={`/problems/${p.id}`}
                className="flex cursor-pointer items-center justify-between rounded-md border border-white/5 px-4 py-3 transition-all duration-200 hover:border-white/20 hover:bg-white/5"
              >
                <div className="flex items-center gap-4">
                  <Badge
                    variant="outline"
                    className={difficultyColor(p.difficulty)}
                  >
                    {p.difficulty}
                  </Badge>
                  <div>
                    <p className="text-sm font-medium text-white">{p.title}</p>
                    <p className="text-xs text-white/50">{p.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/70">
                    {p.acceptedCount}/{p.submissionCount}
                  </p>
                  <p className="text-xs text-white/30">
                    正解率{" "}
                    {p.submissionCount > 0
                      ? Math.round((p.acceptedCount / p.submissionCount) * 100)
                      : 0}%
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
