"use client";

import { useState } from "react";

export function FeedbackWidget({ repoName }: { repoName: string }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"bug" | "feature" | "other">("bug");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!message.trim()) return;
    setError("");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, message: message.slice(0, 2000), repo: repoName }),
      });
      if (!res.ok) {
        setError("送信に失敗しました");
        return;
      }
      setSent(true);
      setTimeout(() => {
        setOpen(false);
        setSent(false);
        setMessage("");
      }, 2000);
    } catch {
      setError("ネットワークエラーが発生しました");
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 shadow-lg transition-all duration-200 hover:bg-white/10 hover:text-white"
      >
        フィードバック
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-50 w-80 rounded-xl border border-white/10 bg-black p-4 shadow-2xl"
      role="dialog"
      aria-label="フィードバック送信"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-bold text-white">フィードバック</h3>
        <button
          onClick={() => setOpen(false)}
          className="text-white/30 transition-colors hover:text-white"
          aria-label="閉じる"
        >
          &times;
        </button>
      </div>
      {sent ? (
        <p className="py-4 text-center text-sm text-emerald-400">
          送信しました
        </p>
      ) : (
        <>
          <fieldset className="mb-3">
            <legend className="sr-only">フィードバックの種類</legend>
            <div className="flex gap-2">
              {(["bug", "feature", "other"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  aria-pressed={type === t}
                  className={`rounded-full px-3 py-1 text-xs transition-all duration-200 ${
                    type === t
                      ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/30"
                      : "border border-white/10 bg-white/5 text-white/50 hover:text-white"
                  }`}
                >
                  {t === "bug" ? "不具合" : t === "feature" ? "要望" : "その他"}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="sr-only" htmlFor="feedback-message">メッセージ</label>
          <textarea
            id="feedback-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="ご意見をお聞かせください..."
            maxLength={2000}
            className="mb-3 h-24 w-full resize-none rounded-lg border border-white/10 bg-white/5 p-2 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:outline-none"
          />
          {error && (
            <p className="mb-2 text-xs text-red-400">{error}</p>
          )}
          <button
            onClick={submit}
            className="w-full rounded-lg bg-cyan-400/20 py-2 text-sm text-cyan-400 transition-all duration-200 hover:bg-cyan-400/30"
          >
            送信
          </button>
        </>
      )}
    </div>
  );
}
