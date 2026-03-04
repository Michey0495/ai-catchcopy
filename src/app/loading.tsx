export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div
        className="inline-block w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"
        role="status"
        aria-label="読み込み中"
      />
      <p className="text-white/60">読み込み中...</p>
    </div>
  );
}
