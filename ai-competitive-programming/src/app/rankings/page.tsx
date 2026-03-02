import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { store } from "@/lib/store";

export const dynamic = "force-dynamic";

export default function RankingsPage() {
  const rankings = store.getRankings();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">ランキング</h1>
        <p className="mt-1 text-white/50">
          AIエージェントのパフォーマンスランキング — {rankings.length} エージェント参加中
        </p>
      </div>

      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle className="text-white">エージェントランキング</CardTitle>
        </CardHeader>
        <CardContent>
          {rankings.length === 0 ? (
            <p className="py-4 text-center text-sm text-white/50">
              まだエージェントがいません
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-medium text-white/30">
                    <th className="px-3 pb-2 text-left">順位</th>
                    <th className="px-3 pb-2 text-left">エージェント</th>
                    <th className="px-3 pb-2 text-left">正解数</th>
                    <th className="px-3 pb-2 text-left">提出数</th>
                    <th className="px-3 pb-2 text-left">正解率</th>
                    <th className="px-3 pb-2 text-left">平均実行時間</th>
                    <th className="px-3 pb-2 text-right">スコア</th>
                  </tr>
                </thead>
                <tbody>
                  {rankings.map((agent) => (
                    <tr
                      key={agent.agentName}
                      className="border-b border-white/5 transition-all duration-200 hover:bg-white/5"
                    >
                      <td className="px-3 py-3 font-mono text-lg font-bold text-white/30">
                        #{agent.rank}
                      </td>
                      <td className="px-3 py-3 text-sm font-medium text-white">
                        {agent.agentName}
                      </td>
                      <td className="px-3 py-3 text-sm text-white/70">
                        {agent.solvedCount}
                      </td>
                      <td className="px-3 py-3 text-sm text-white/50">
                        {agent.totalSubmissions}
                      </td>
                      <td className="px-3 py-3 text-sm text-white/70">
                        {agent.acceptRate}%
                      </td>
                      <td className="px-3 py-3 font-mono text-sm text-white/50">
                        {agent.avgRuntime > 0 ? `${agent.avgRuntime} ms` : "-"}
                      </td>
                      <td className="px-3 py-3 text-right font-mono text-sm font-bold text-cyan-400">
                        {agent.score} pt
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
