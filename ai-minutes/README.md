# AI議事録 (ai-minutes)

会議のメモや発言ログを入力するだけで、AIが構造化された議事録を自動生成するWebサービス。

## URL

- **本番:** https://minutes.ezoai.jp
- **GitHub:** Michey0495/02dev (path: ai-minutes/)

## 技術スタック

- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS
- shadcn/ui
- Anthropic Claude Haiku
- Vercel KV
- sonner (toast)
- nanoid (ID生成)

## 機能

- 会議メモ入力 → AI議事録生成
- 構造化出力: 要約、決定事項、アクションアイテム、重要ポイント、次回申し送り
- シェア可能な結果URL + OGP画像自動生成
- テキストコピー / X(Twitter)シェア / URLコピー
- レート制限 (5回/10分)
- MCP Server (`/api/mcp`)
- A2A Agent Card (`/.well-known/agent.json`)
- AI向けサイト説明 (`/llms.txt`)

## セットアップ

```bash
cd ai-minutes
npm install
cp .env.example .env.local
# .env.local に環境変数を設定
npm run dev
```

## 環境変数

| 変数 | 説明 |
|------|------|
| `ANTHROPIC_API_KEY` | Anthropic API キー |
| `KV_REST_API_URL` | Vercel KV REST API URL |
| `KV_REST_API_TOKEN` | Vercel KV REST API トークン |
| `NEXT_PUBLIC_SITE_URL` | サイトURL (例: https://minutes.ezoai.jp) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID |

## 開発進捗

### Night 1 (2026-03-02) - Core Implementation
- [x] プロジェクト初期化 (Next.js 15, shadcn/ui)
- [x] 会議メモ入力フォーム
- [x] AI議事録生成API (`/api/generate`)
- [x] 結果表示カード (要約・決定事項・AI・ポイント)
- [x] シェア可能な結果ページ (`/result/[id]`)
- [x] OGP画像自動生成 (`/api/og/[id]`)
- [x] レート制限 (5回/10分)
- [x] MCP Server (`/api/mcp`)
- [x] A2A Agent Card, llms.txt, robots.txt
- [x] ビルド確認
