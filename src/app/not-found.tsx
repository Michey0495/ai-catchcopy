import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-xl text-white/60 mb-8">ページが見つかりません</p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-all duration-200 cursor-pointer"
      >
        トップに戻る
      </Link>
    </div>
  );
}
