import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "このサービスについて",
  description: "AIマシュマロは匿名で質問を送るとAIが個性的に回答するQ&Aサービスです。",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center space-y-3">
        <div className="text-5xl">🍡</div>
        <h1 className="text-2xl font-bold text-slate-800">AIマシュマロとは</h1>
        <p className="text-slate-500 text-sm">匿名で質問するとAIが個性的に回答するサービス</p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="pt-5 space-y-2">
            <h2 className="font-semibold text-slate-800">💬 匿名で質問できます</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              アカウント登録不要。何でも気軽に聞いてみてください。
              恋愛相談・人生相談・くだらない疑問・ちょっとした悩み、何でもOKです。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5 space-y-2">
            <h2 className="font-semibold text-slate-800">🍡 マシュが回答します</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              AIキャラクター「マシュ」がふわふわで温かみのある回答をします。
              時々ユニークな視点や思わず笑ってしまうような切り口で答えてくれます。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5 space-y-2">
            <h2 className="font-semibold text-slate-800">📱 SNSでシェアできます</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              各回答には専用URLが発行されます。Twitter/XやLINEで
              友達にシェアして楽しんでください。
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center pt-4">
        <Link href="/">
          <Button>さっそく質問してみる 🍡</Button>
        </Link>
      </div>

      <div className="text-center text-xs text-slate-400 space-y-1">
        <p>本サービスはAnthropicのClaude APIを使用しています</p>
        <p>不適切なコンテンツはフィルタリングされます</p>
      </div>
    </div>
  );
}
