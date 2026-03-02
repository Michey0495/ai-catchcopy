import Link from "next/link";

export function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-800 hover:opacity-80 transition-opacity">
          <span className="text-2xl">🍡</span>
          <span>AIマシュマロ</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-600">
          <Link href="/about" className="hover:text-slate-900 transition-colors">
            このサービスについて
          </Link>
        </nav>
      </div>
    </header>
  );
}
