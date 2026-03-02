"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import type { CatchcopyResult } from "@/types";

export function ResultCard({ result }: { result: CatchcopyResult }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ai-catchcopy.ezoai.jp";
  const resultUrl = `${siteUrl}/result/${result.id}`;

  const toneLabels: Record<string, string> = {
    professional: "プロフェッショナル",
    casual: "カジュアル",
    playful: "遊び心",
    elegant: "エレガント",
    bold: "大胆",
  };

  async function copyCatchcopy(text: string, index: number) {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("コピーしました");
    setTimeout(() => setCopiedIndex(null), 2000);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(resultUrl);
    toast.success("リンクをコピーしました");
  }

  const shareOnX = () => {
    const text = encodeURIComponent(result.shareText || `AIが生成したキャッチコピー\n${resultUrl}`);
    window.open(`https://x.com/intent/tweet?text=${text}&url=${encodeURIComponent(resultUrl)}`, "_blank");
  };

  const shareOnLine = () => {
    const text = encodeURIComponent(`${result.shareText || "AIキャッチコピー"}\n${resultUrl}`);
    window.open(`https://line.me/R/msg/text/?${text}`, "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {result.productName}
        </h2>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="outline" className="border-cyan-400/30 text-cyan-400">
            {toneLabels[result.tone] || result.tone}
          </Badge>
          {result.source === "mcp" && result.agentName && (
            <Badge variant="outline" className="border-white/20 text-white/60">
              by {result.agentName}
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {result.catchcopies.map((c, i) => (
          <button
            key={i}
            onClick={() => copyCatchcopy(c.text, i)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-left hover:bg-white/10 transition-all duration-200 cursor-pointer group"
          >
            <p className="text-lg md:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {copiedIndex === i ? "Copied!" : c.text}
            </p>
            <p className="text-sm text-white/50 mt-1">{c.concept}</p>
          </button>
        ))}
      </div>

      <p className="text-sm text-white/40 text-center">
        タップでキャッチコピーをコピー
      </p>

      <div className="border-t border-white/10 pt-6 space-y-3">
        <p className="text-sm text-white/60 text-center">シェアする</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={shareOnX}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
          >
            X (Twitter)
          </button>
          <button
            onClick={shareOnLine}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
          >
            LINE
          </button>
          <button
            onClick={copyLink}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
          >
            リンクコピー
          </button>
        </div>
      </div>
    </div>
  );
}
