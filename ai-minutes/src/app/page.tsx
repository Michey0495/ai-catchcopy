import { MinutesForm } from "@/components/minutes-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-20">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            AI<span className="text-[#10b981]">議事録</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            会議メモを貼り付けるだけで
            <br className="sm:hidden" />
            プロの議事録を自動生成
          </p>
        </header>

        <MinutesForm />

        <footer className="mt-16 text-center text-sm text-white/30">
          <p>
            Powered by AI &mdash;{" "}
            <a
              href="https://ezoai.jp"
              className="hover:text-white/50 transition-all duration-200"
            >
              ezoai.jp
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
