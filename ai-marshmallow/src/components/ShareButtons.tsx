"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  url: string;
  text: string;
};

export function ShareButtons({ url, text }: Props) {
  const [copied, setCopied] = useState(false);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-3 flex-wrap">
      <Button asChild size="sm" className="bg-white/5 hover:bg-white/10 text-white border border-white/10">
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
          X でシェア
        </a>
      </Button>
      <Button asChild size="sm" className="bg-[#06C755] hover:bg-[#05a848] text-white">
        <a href={lineUrl} target="_blank" rel="noopener noreferrer">
          LINE でシェア
        </a>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
      >
        {copied ? "コピーしました" : "リンクをコピー"}
      </Button>
    </div>
  );
}
