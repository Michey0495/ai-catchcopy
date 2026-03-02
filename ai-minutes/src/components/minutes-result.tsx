"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { MinutesResult } from "@/lib/types";

const siteUrl =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_SITE_URL || "https://minutes.ezoai.jp";

export function MinutesResultCard({ result }: { result: MinutesResult }) {
  const shareUrl = `${siteUrl}/result/${result.id}`;

  const copyToClipboard = async () => {
    const text = formatAsText(result);
    await navigator.clipboard.writeText(text);
    toast.success("議事録をコピーしました");
  };

  const shareOnTwitter = () => {
    const text = `AI議事録で会議メモから議事録を自動生成しました`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  return (
    <div className="space-y-4">
      <Card className="bg-white/5 border-white/10 p-6 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white">
            {result.input.title || "議事録"}
          </h2>
          <div className="flex gap-4 text-sm text-white/50">
            {result.input.date && <span>{result.input.date}</span>}
            {result.input.participants && (
              <span>{result.input.participants}</span>
            )}
          </div>
        </div>

        <Section title="要約">
          <p className="text-white/80 leading-relaxed">{result.summary}</p>
        </Section>

        {result.decisions.length > 0 && (
          <Section title="決定事項">
            <ul className="space-y-2">
              {result.decisions.map((d, i) => (
                <li key={i} className="flex gap-2 text-white/80">
                  <span className="text-[#10b981] shrink-0">&bull;</span>
                  {d}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {result.actionItems.length > 0 && (
          <Section title="アクションアイテム">
            <div className="space-y-2">
              {result.actionItems.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-white/80 bg-white/5 rounded-md p-3"
                >
                  <span className="font-semibold text-[#10b981] shrink-0">
                    {item.assignee}
                  </span>
                  <span className="flex-1">{item.task}</span>
                  <span className="text-sm text-white/40 shrink-0">
                    {item.deadline}
                  </span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {result.keyPoints.length > 0 && (
          <Section title="重要ポイント">
            <ul className="space-y-2">
              {result.keyPoints.map((p, i) => (
                <li key={i} className="flex gap-2 text-white/80">
                  <span className="text-[#10b981] shrink-0">&bull;</span>
                  {p}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {result.nextSteps && (
          <Section title="次回に向けて">
            <p className="text-white/80 leading-relaxed">{result.nextSteps}</p>
          </Section>
        )}
      </Card>

      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          onClick={copyToClipboard}
          variant="outline"
          className="cursor-pointer border-white/10 text-white hover:bg-white/5 transition-all duration-200"
        >
          テキストコピー
        </Button>
        <Button
          onClick={shareOnTwitter}
          variant="outline"
          className="cursor-pointer border-white/10 text-white hover:bg-white/5 transition-all duration-200"
        >
          Xでシェア
        </Button>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(shareUrl);
            toast.success("URLをコピーしました");
          }}
          variant="outline"
          className="cursor-pointer border-white/10 text-white hover:bg-white/5 transition-all duration-200"
        >
          URLコピー
        </Button>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-[#10b981] uppercase tracking-wider">
        {title}
      </h3>
      {children}
    </div>
  );
}

function formatAsText(result: MinutesResult): string {
  const lines: string[] = [];
  lines.push(`# ${result.input.title || "議事録"}`);
  if (result.input.date) lines.push(`日付: ${result.input.date}`);
  if (result.input.participants)
    lines.push(`参加者: ${result.input.participants}`);
  lines.push("");
  lines.push("## 要約");
  lines.push(result.summary);
  lines.push("");

  if (result.decisions.length > 0) {
    lines.push("## 決定事項");
    result.decisions.forEach((d) => lines.push(`- ${d}`));
    lines.push("");
  }

  if (result.actionItems.length > 0) {
    lines.push("## アクションアイテム");
    result.actionItems.forEach((item) =>
      lines.push(`- [${item.assignee}] ${item.task} (${item.deadline})`)
    );
    lines.push("");
  }

  if (result.keyPoints.length > 0) {
    lines.push("## 重要ポイント");
    result.keyPoints.forEach((p) => lines.push(`- ${p}`));
    lines.push("");
  }

  if (result.nextSteps) {
    lines.push("## 次回に向けて");
    lines.push(result.nextSteps);
  }

  return lines.join("\n");
}
