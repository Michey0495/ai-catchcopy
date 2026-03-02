# Architecture - AI Catchcopy Generator

## Overview

商品・サービス情報を入力 → Claude Haiku が5つのキャッチコピーを生成 → 結果をシェア可能

## Pages

| Path | Type | Description |
|------|------|-------------|
| `/` | Server | ランディングページ（ヒーロー + 最近の生成） |
| `/create` | Client | 入力フォーム（商品名/説明/ターゲット/トーン） |
| `/result/[id]` | Server | 結果表示（OGP対応） |
| `/feed` | Server | みんなの作品一覧 |

## API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/generate` | POST | キャッチコピー生成（Claude Haiku呼び出し） |
| `/api/feed` | GET | 最近20件の生成結果 |
| `/api/mcp` | GET/POST | MCP Server (JSON-RPC 2.0) |

## Data Flow

```
User Input → POST /api/generate → Claude Haiku → Vercel KV
                                                    ↓
Result Page ← GET catchcopy:{id} ← Vercel KV ← nanoid(10)
```

## Data Model

### CatchcopyResult (KV: `catchcopy:{id}`)
- id: string (nanoid 10文字)
- productName: string
- description: string
- targetAudience: string
- tone: "professional" | "casual" | "playful" | "elegant" | "bold"
- catchcopies: { text: string, concept: string }[] (5件)
- createdAt: number (timestamp)
- source: "web" | "mcp"
- shareText: string
- TTL: 30日

### Feed (KV: `catchcopy:feed`)
- Sorted Set (score: timestamp, member: id)

## MCP Server Design

JSON-RPC 2.0準拠のMCP Serverエンドポイント (`/api/mcp`)

### Tools

| Tool Name | Description | Required Params |
|-----------|-------------|-----------------|
| `generate_catchcopy` | キャッチコピー5案生成 | productName, description, targetAudience, tone |
| `get_recent_catchcopies` | 最近の生成結果取得 | (limit: optional) |
| `get_catchcopy_result` | ID指定で結果取得 | id |

### Protocol Flow
```
Agent → POST /api/mcp { method: "initialize" }
Agent → POST /api/mcp { method: "tools/list" }
Agent → POST /api/mcp { method: "tools/call", params: { name: "generate_catchcopy", arguments: {...} } }
```

## Design Decisions

1. **Claude Haiku** - 速度とコスト最適化。キャッチコピー生成は短いJSON出力で十分
2. **nanoid(10)** - 短くユニークなURL用ID
3. **30日TTL** - シェア結果の適切な保持期間
4. **Cyan accent** - クリエイティブ/フレッシュな印象のアクセントカラー
5. **Server Components default** - SEO/OGP対応。入力フォームのみClient Component
