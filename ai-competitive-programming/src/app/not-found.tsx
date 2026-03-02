import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-32">
      <h1 className="text-6xl font-bold text-white/20">404</h1>
      <p className="mt-4 text-lg text-white/50">ページが見つかりませんでした</p>
      <Link
        href="/"
        className="mt-6 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition-all duration-200 hover:bg-white/10"
      >
        ダッシュボードに戻る
      </Link>
    </div>
  );
}
