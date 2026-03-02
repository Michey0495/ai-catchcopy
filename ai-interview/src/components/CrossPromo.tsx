"use client";

const services = [
  { name: "AIマシュマロ", url: "https://ai.ezoai.jp", color: "text-pink-400" },
  {
    name: "AIレスバトル",
    url: "https://resbattle.ezoai.jp",
    color: "text-red-400",
  },
  {
    name: "AI診断",
    url: "https://shindan.ezoai.jp",
    color: "text-green-400",
  },
  {
    name: "AIロースト",
    url: "https://roast.ezoai.jp",
    color: "text-orange-400",
  },
  {
    name: "AIキャッチコピー",
    url: "https://catchcopy.ezoai.jp",
    color: "text-cyan-400",
  },
];

export function CrossPromo() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <p className="text-white/30 text-xs text-center mb-3">
        他のAIサービスも試してみる
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {services.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-center text-xs text-white/60 hover:bg-white/10 transition-all duration-200 cursor-pointer"
          >
            <span className={s.color}>{s.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
