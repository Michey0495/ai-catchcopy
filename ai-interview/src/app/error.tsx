"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-black text-white/20 mb-4">Error</h1>
      <p className="text-white/50 mb-8">エラーが発生しました</p>
      <button
        onClick={reset}
        className="inline-block bg-violet-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-violet-600 transition-all duration-200 cursor-pointer"
      >
        もう一度試す
      </button>
    </div>
  );
}
