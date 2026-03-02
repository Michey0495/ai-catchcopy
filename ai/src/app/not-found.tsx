import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="text-6xl">🍡</div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-800">ページが見つかりません</h1>
        <p className="text-slate-500 text-sm">
          このURLのページは存在しないか、削除された可能性があります。
        </p>
      </div>
      <Link href="/">
        <Button>トップページへ戻る</Button>
      </Link>
    </div>
  );
}
