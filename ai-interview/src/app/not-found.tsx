import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-black text-white/20 mb-4">404</h1>
      <p className="text-white/50 mb-8">ページが見つかりませんでした</p>
      <Link
        href="/"
        className="inline-block bg-violet-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-violet-600 transition-all duration-200"
      >
        トップに戻る
      </Link>
    </div>
  );
}
