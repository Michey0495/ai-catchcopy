export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center space-y-2">
        <div className="text-4xl">🍡</div>
        <h1 className="text-lg font-bold text-slate-800">AIマシュマロの回答</h1>
      </div>

      <div className="bg-white border rounded-xl p-5 space-y-4 animate-pulse">
        <div className="flex gap-3">
          <div className="shrink-0 w-8 h-8 rounded-full bg-slate-100" />
          <div className="flex-1 space-y-2 pt-1">
            <div className="h-3 bg-slate-200 rounded w-3/4" />
            <div className="h-3 bg-slate-200 rounded w-1/2" />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="shrink-0 w-8 h-8 rounded-full bg-pink-100" />
          <div className="flex-1 space-y-2 pt-1">
            <div className="h-3 bg-slate-200 rounded w-full" />
            <div className="h-3 bg-slate-200 rounded w-5/6" />
            <div className="h-3 bg-slate-200 rounded w-3/4" />
            <div className="h-3 bg-slate-200 rounded w-2/3" />
          </div>
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="h-3 w-16 bg-slate-100 rounded" />
        </div>
      </div>

      <div className="bg-white rounded-xl border p-5 shadow-sm space-y-3 animate-pulse">
        <div className="h-3 w-16 bg-slate-200 rounded" />
        <div className="flex gap-3">
          <div className="h-8 w-24 bg-slate-200 rounded" />
          <div className="h-8 w-28 bg-slate-200 rounded" />
          <div className="h-8 w-28 bg-slate-200 rounded" />
        </div>
      </div>

      <div className="text-center">
        <div className="inline-block h-8 w-40 bg-slate-200 rounded animate-pulse" />
      </div>
    </div>
  );
}
