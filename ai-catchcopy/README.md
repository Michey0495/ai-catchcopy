# AI Catchcopy Generator

AIが商品・サービスに最適なキャッチコピーを5案自動生成するWebサービス。

## URL

https://ai-catchcopy.ezoai.jp

## Tech Stack

- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS
- shadcn/ui
- Claude Haiku 4.5 (キャッチコピー生成)
- Vercel KV (データストア)
- Vercel (ホスティング)

## Features

- 商品名・説明・ターゲット・トーンを入力 → AIが5案を瞬時に生成
- 5つのトーン: プロフェッショナル / カジュアル / 遊び心 / エレガント / 大胆
- ワンタップでクリップボードにコピー
- X(Twitter) / LINE でシェア
- OGP対応の結果ページ
- MCP Server / A2A Agent Card 対応
- フィードバックウィジェット (GitHub Issue 自動作成)
- Google Analytics 対応

## Setup

```bash
npm install
cp .env.example .env.local
# .env.local に各種キーを設定
npm run dev
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Anthropic API キー |
| `KV_URL` | Vercel KV URL |
| `KV_REST_API_URL` | Vercel KV REST API URL |
| `KV_REST_API_TOKEN` | Vercel KV REST API トークン |
| `KV_REST_API_READ_ONLY_TOKEN` | Vercel KV 読み取り専用トークン |
| `NEXT_PUBLIC_SITE_URL` | サイトURL (例: https://ai-catchcopy.ezoai.jp) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID (任意) |
| `GITHUB_TOKEN` | GitHub Personal Access Token (フィードバック用、任意) |

## Pages

| Path | Description |
|------|-------------|
| `/` | ランディングページ |
| `/create` | 入力フォーム |
| `/result/[id]` | 結果表示 (OGP対応) |
| `/feed` | みんなの作品一覧 |

## API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/generate` | POST | キャッチコピー生成 |
| `/api/feed` | GET | 最近の生成一覧 |
| `/api/mcp` | GET/POST | MCP Server (JSON-RPC 2.0) |
| `/api/feedback` | POST | フィードバック送信 (GitHub Issue 自動作成) |

## AI Integration

- **MCP Server**: `/api/mcp` - AIエージェントが直接キャッチコピーを生成・取得
- **A2A Agent Card**: `/.well-known/agent.json`
- **llms.txt**: `/llms.txt` - AI向けサイト説明
- **robots.txt**: AIクローラー許可設定

## Progress

### Night 1 (2026-03-01)
- 全コアページ実装 (ランディング、入力フォーム、結果表示、フィード)
- API実装 (generate, feed, mcp)
- AI公開チャネル (llms.txt, agent.json, robots.txt, MCP Server)
- OGP対応メタデータ
- Google Analytics 対応

### Night 2 (2026-03-02)
- フィードバックAPI (`/api/feedback`) 追加
- フィードバックウィジェット追加 (ダークテーマ対応)
- フッター追加
- `npm run build` 成功確認

### 実装完了済み
- [x] コアUI (ランディング、フォーム、結果、フィード)
- [x] AI生成API (Claude Haiku 4.5)
- [x] MCP Server (JSON-RPC 2.0)
- [x] A2A Agent Card / llms.txt / robots.txt
- [x] OGP / SEOメタデータ
- [x] Google Analytics
- [x] フィードバックウィジェット
- [x] ソーシャルシェア (X, LINE, リンクコピー)

## Deploy

```bash
vercel --prod
```
