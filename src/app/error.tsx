"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-white mb-4">エラーが発生しました</h1>
      <p className="text-white/60 mb-8">申し訳ありません。問題が発生しました。</p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-all duration-200 cursor-pointer"
      >
        もう一度試す
      </button>
    </div>
  );
}
