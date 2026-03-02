"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "ダッシュボード" },
  { href: "/problems", label: "問題" },
  { href: "/submissions", label: "提出" },
  { href: "/rankings", label: "ランキング" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-mono text-sm font-bold tracking-tight text-white">
          AI Competitive Programming
        </Link>
        <nav className="hidden gap-6 sm:flex" aria-label="メインナビゲーション">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-all duration-200 hover:text-white ${
                isActive(item.href) ? "text-white" : "text-white/50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white/70 sm:hidden"
          aria-label="メニューを開く"
          aria-expanded={menuOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <nav className="border-t border-white/10 px-4 py-2 sm:hidden" aria-label="モバイルナビゲーション">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 text-sm transition-all duration-200 hover:text-white ${
                isActive(item.href) ? "text-white" : "text-white/50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
