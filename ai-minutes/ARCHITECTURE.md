# Architecture - AI議事録

## 概要

AI議事録は、会議のメモや発言ログからClaude Haikuを使って構造化された議事録を自動生成するWebサービスです。

## ページ構成

| パス | 種類 | 説明 |
|------|------|------|
| `/` | SSR | メインページ（入力フォーム + 結果表示） |
| `/result/[id]` | SSR | シェア用結果ページ（KVから取得） |
| `/api/generate` | API | 議事録生成エンドポイント |
| `/api/og/[id]` | Edge | OGP画像生成 |
| `/api/mcp` | API | MCP Serverエンドポイント |

## データフロー

```
ユーザー入力 → POST /api/generate → Claude Haiku → JSON解析 → Vercel KV保存 → 結果表示
                                                                                    ↓
                                                                           /result/[id] (シェア)
                                                                                    ↓
                                                                           /api/og/[id] (OGP)
```

## コンポーネント設計

- `MinutesForm` - 入力フォーム（会議タイトル、日付、参加者、メモ）
- `MinutesResultCard` - 結果表示（セクション分割、シェアボタン）
- `Section` - 再利用可能なセクションコンポーネント

## API設計

### POST /api/generate
- Input: `{ title, date, participants, notes }`
- Output: `MinutesResult` (id, summary, decisions, actionItems, keyPoints, nextSteps)
- レート制限: 5回/10分 (IP単位)

### MCP Server (/api/mcp)

#### ツール定義

| ツール名 | 説明 | パラメータ |
|----------|------|-----------|
| `generate_minutes` | 会議メモから議事録生成 | title?, date?, participants?, notes (必須) |
| `get_minutes` | ID指定で議事録取得 | id (必須) |

#### プロトコル
- GET: サーバー情報 + ツール一覧
- POST `method: "tools/list"`: ツール一覧
- POST `method: "tools/call"`: ツール実行

## デザインシステム

- 背景: `#000000` (純黒)
- アクセント: `#10b981` (エメラルドグリーン)
- カード: `bg-white/5 border border-white/10`
- テキスト: `text-white`, `text-white/70`, `text-white/50`

## ストレージ

- Vercel KV (Redis互換)
- キー設計:
  - `minutes:{id}` - 議事録データ (TTL: 30日)
  - `minutes:feed` - 最新50件のID一覧
  - `rate:minutes:{ip}` - レート制限用タイムスタンプ (TTL: 600秒)
