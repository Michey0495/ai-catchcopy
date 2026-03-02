import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://minutes.ezoai.jp";

export const metadata: Metadata = {
  title: "AI議事録 - 会議メモからプロの議事録を自動生成",
  description:
    "会議のメモや発言ログを入力するだけで、AIが構造化された議事録を自動生成。要約・決定事項・アクションアイテムを整理します。",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "AI議事録 - 会議メモからプロの議事録を自動生成",
    description:
      "会議のメモや発言ログを入力するだけで、AIが構造化された議事録を自動生成。",
    url: siteUrl,
    siteName: "AI議事録",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI議事録 - 会議メモからプロの議事録を自動生成",
    description:
      "会議のメモや発言ログを入力するだけで、AIが構造化された議事録を自動生成。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            style: {
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
