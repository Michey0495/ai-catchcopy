export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <span className="inline-block w-3 h-3 rounded-full bg-pink-400 animate-pulse" />
        </div>
        <h1 className="text-lg font-bold text-white">AIマシュマロの回答</h1>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4 animate-pulse">
        <div className="flex gap-3">
          <div className="shrink-0 w-8 h-8 rounded-full bg-white/10" />
          <div className="flex-1 space-y-2 pt-1">
            <div className="h-3 bg-white/10 rounded w-3/4" />
            <div className="h-3 bg-white/10 rounded w-1/2" />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="shrink-0 w-8 h-8 rounded-full bg-pink-500/20" />
          <div className="flex-1 space-y-2 pt-1">
            <div className="h-3 bg-white/10 rounded w-full" />
            <div className="h-3 bg-white/10 rounded w-5/6" />
            <div className="h-3 bg-white/10 rounded w-3/4" />
            <div className="h-3 bg-white/10 rounded w-2/3" />
          </div>
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="h-3 w-16 bg-white/10 rounded" />
        </div>
      </div>

      <div className="bg-white/5 rounded-xl border border-white/10 p-5 space-y-3 animate-pulse">
        <div className="h-3 w-16 bg-white/10 rounded" />
        <div className="flex gap-3">
          <div className="h-8 w-24 bg-white/10 rounded" />
          <div className="h-8 w-28 bg-white/10 rounded" />
          <div className="h-8 w-28 bg-white/10 rounded" />
        </div>
      </div>

      <div className="text-center">
        <div className="inline-block h-8 w-40 bg-white/10 rounded animate-pulse" />
      </div>
    </div>
  );
}
