export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-10">
      <div className="text-center space-y-3">
        <div className="text-5xl">🍡</div>
        <h1 className="text-2xl font-bold text-slate-800">AIマシュマロ</h1>
        <p className="text-slate-500 text-sm">匿名で質問するとAIキャラクター「マシュ」が個性的に回答します</p>
      </div>

      <div className="bg-white rounded-xl border p-6 shadow-sm space-y-3 animate-pulse">
        <div className="h-3 w-28 bg-slate-200 rounded" />
        <div className="h-24 bg-slate-100 rounded-lg" />
        <div className="flex justify-end">
          <div className="h-8 w-28 bg-slate-200 rounded" />
        </div>
      </div>

      <div className="h-px bg-slate-200" />

      <div className="space-y-4">
        <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border rounded-xl p-5 space-y-4 animate-pulse">
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
