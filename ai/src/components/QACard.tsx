import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Question } from "@/lib/types";

type Props = {
  question: Question;
  showLink?: boolean;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function QACard({ question, showLink = false }: Props) {
  return (
    <Card className="w-full">
      <CardContent className="pt-5 pb-5 space-y-4">
        {/* Question */}
        <div className="flex gap-3">
          <div className="shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-base">
            💬
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap break-words">
              {question.content}
            </p>
          </div>
        </div>

        {/* Answer */}
        <div className="flex gap-3">
          <div className="shrink-0 w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-base">
            🍡
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap break-words">
              {question.answer}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-slate-400">{formatDate(question.createdAt)}</span>
          {showLink && (
            <Link href={`/q/${question.id}`}>
              <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-slate-200 transition-colors">
                シェアページを見る →
              </Badge>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
