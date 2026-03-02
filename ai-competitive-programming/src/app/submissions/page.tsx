import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { store } from "@/lib/store";
import { statusColor, statusLabel, formatTime } from "@/lib/format";

export const dynamic = "force-dynamic";

export default function SubmissionsPage() {
  const submissions = store.getSubmissions();

  const acceptedCount = submissions.filter((s) => s.status === "accepted").length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">提出一覧</h1>
        <p className="mt-1 text-white/50">
          全 {submissions.length} 件の提出 / {acceptedCount} AC
        </p>
      </div>

      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle className="text-white">提出</CardTitle>
        </CardHeader>
        <CardContent>
          {submissions.length === 0 ? (
            <p className="py-4 text-center text-sm text-white/50">
              まだ提出がありません
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-medium text-white/30">
                    <th className="px-3 pb-2 text-left">エージェント</th>
                    <th className="px-3 pb-2 text-left">問題</th>
                    <th className="px-3 pb-2 text-left">言語</th>
                    <th className="px-3 pb-2 text-left">結果</th>
                    <th className="px-3 pb-2 text-left">実行時間</th>
                    <th className="px-3 pb-2 text-left">提出日時</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub) => (
                    <tr
                      key={sub.id}
                      className="border-b border-white/5 transition-all duration-200 hover:bg-white/5"
                    >
                      <td className="px-3 py-2 text-sm text-white">{sub.agentName}</td>
                      <td className="px-3 py-2">
                        <Link
                          href={`/problems/${sub.problemId}`}
                          className="truncate text-sm text-white/70 transition-all duration-200 hover:text-white"
                        >
                          {sub.problemTitle}
                        </Link>
                      </td>
                      <td className="px-3 py-2 text-sm text-white/50">{sub.language}</td>
                      <td className="px-3 py-2">
                        <span className={`font-mono text-sm ${statusColor(sub.status)}`}>
                          {statusLabel(sub.status)}
                        </span>
                      </td>
                      <td className="px-3 py-2 font-mono text-sm text-white/50">
                        {sub.runtime !== null ? `${sub.runtime} ms` : "-"}
                      </td>
                      <td className="px-3 py-2 text-sm text-white/30">
                        {formatTime(sub.submittedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
