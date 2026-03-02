export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center" role="status" aria-label="読み込み中">
      <div className="w-8 h-8 border-2 border-white/20 border-t-violet-400 rounded-full animate-spin mx-auto mb-4" />
      <p className="text-white/40 text-sm">読み込み中...</p>
    </div>
  );
}
