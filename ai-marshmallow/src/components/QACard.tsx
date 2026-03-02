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
    <Card className="w-full bg-white/5 border-white/10">
      <CardContent className="pt-5 pb-5 space-y-4">
        {/* Question */}
        <div className="flex gap-3">
          <div className="shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-xs text-white/60 font-bold">Q</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap break-words">
              {question.content}
            </p>
          </div>
        </div>

        {/* Answer */}
        <div className="flex gap-3">
          <div className="shrink-0 w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">
            <span className="text-xs text-pink-400 font-bold">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm leading-relaxed whitespace-pre-wrap break-words">
              {question.answer}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-white/40">{formatDate(question.createdAt)}</span>
          {showLink && (
            <Link href={`/q/${question.id}`}>
              <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-white/10 transition-colors bg-white/5 text-white/60 border-white/10">
                シェアページを見る
              </Badge>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
