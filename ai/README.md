# AIマシュマロ

匿名で質問するとAIキャラクター「マシュ」が個性的に回答するQ&Aサービス。

**URL:** https://ai.ezoai.jp

---

## 概要

- アカウント不要・完全無料で質問できる匿名Q&Aサービス
- AIキャラクター「マシュ」（Claude Haiku）が日本語で個性的に回答
- 各回答はユニークURLで共有可能 → SNS拡散を促進
- OGP対応（Twitter/X、LINE）

## 技術スタック

| 項目 | 技術 |
|------|------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + shadcn/ui |
| AI | Anthropic Claude API (claude-haiku-4-5) |
| Storage | Vercel KV (dev: in-memory fallback) |
| Hosting | Vercel |
| Domain | ai.ezoai.jp |

## ページ構成

| パス | 説明 |
|------|------|
| `/` | トップ: 質問フォーム + 最近の回答一覧 |
| `/q/[id]` | Q&A詳細: OGP対応 + SNSシェアボタン |
| `/about` | サービス説明 + AIキャラクター紹介 |

## セットアップ

```bash
npm install
```

### 環境変数

`.env.local` を作成:

```env
# Anthropic API
ANTHROPIC_API_KEY=sk-ant-...

# Vercel KV（本番用。未設定時はin-memoryで動作）
KV_REST_API_URL=https://...
KV_REST_API_TOKEN=...

# サイトURL（OGP画像生成に使用）
NEXT_PUBLIC_SITE_URL=https://ai.ezoai.jp

# Google Analytics（任意）
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 開発サーバー起動

```bash
npm run dev
```

http://localhost:3000 で確認。

### ビルド

```bash
npm run build
```

## デプロイ

Vercel にデプロイ。環境変数を Vercel Dashboard で設定する。

```bash
vercel --prod
```

## ディレクトリ構造

```
src/
  app/
    layout.tsx              # Root layout（メタデータ・フォント・GA）
    page.tsx                # トップページ（質問フォーム + 一覧）
    about/page.tsx          # Aboutページ
    q/[id]/page.tsx         # Q&A詳細（SSR + OGP）
    api/
      questions/route.ts    # GET（一覧）/ POST（質問投稿→AI回答）
      questions/[id]/route.ts # GET（個別取得）
      feedback/route.ts     # フィードバック送信
    opengraph-image.tsx     # OGP画像（ホーム）
    q/[id]/opengraph-image.tsx # OGP画像（Q&A詳細）
    robots.ts               # robots.txt
    sitemap.ts              # sitemap.xml
    not-found.tsx           # 404ページ
  components/
    QuestionForm.tsx        # 質問投稿フォーム
    QACard.tsx              # Q&Aカード
    ShareButtons.tsx        # SNSシェアボタン
    Header.tsx              # ヘッダー
    Footer.tsx              # フッター
    FeedbackWidget.tsx      # フィードバックウィジェット
  lib/
    ai.ts                   # Anthropic API呼び出し
    storage.ts              # Vercel KV / in-memoryストレージ
    rateLimit.ts            # レート制限
    types.ts                # 型定義
    utils.ts                # ユーティリティ
```

## ステータス

- [x] 実装完了
- [x] QA完了（build / lint / TypeScript エラーなし）
- [x] OGP対応
- [x] SEO対応（robots.txt / sitemap.xml / JSON-LD）
- [x] アクセシビリティ基本対応
- [ ] 本番デプロイ（Vercel KV環境変数設定後）
