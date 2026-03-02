# AI模擬面接

希望職種と自己PRを入力するだけ。AIが厳しい面接官として、あなたの面接準備度をS~Dランクで判定します。

## 機能

- 希望職種に基づくリアルな面接質問の生成
- 各質問ごとの評価とスコア（良い/普通/要改善）
- S/A/B/C/D の5段階ランク判定
- 合格見込み/要改善/厳しい の3段階判定
- 具体的な改善アドバイス
- 結果のシェア機能（X / リンクコピー）

## 技術スタック

- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS
- shadcn/ui
- Claude Haiku 4.5 (AI engine)
- Vercel KV (data storage)

## セットアップ

```bash
npm install
```

### 環境変数

```
ANTHROPIC_API_KEY=       # Claude API key
KV_REST_API_URL=         # Vercel KV URL
KV_REST_API_TOKEN=       # Vercel KV token
NEXT_PUBLIC_SITE_URL=    # サイトURL (default: https://interview.ezoai.jp)
NEXT_PUBLIC_GA_ID=       # Google Analytics ID (optional)
GITHUB_TOKEN=            # フィードバック用 GitHub token (optional)
```

### 開発

```bash
npm run dev    # http://localhost:3000
npm run build  # プロダクションビルド
npm run lint   # ESLint
```

## ページ構成

| パス | 説明 |
|------|------|
| `/` | ランディングページ + 面接フォーム |
| `/result/[id]` | 面接結果表示 + OGP動的生成 |

## API

### POST /api/interview

面接評価を生成。

```json
{
  "position": "フロントエンドエンジニア",
  "industry": "IT・Web",
  "experience": "3年",
  "selfpr": "React/TypeScriptの経験が豊富",
  "motivation": "技術力を活かしてプロダクト開発に貢献したい"
}
```

### MCP Server: /api/mcp

JSON-RPC 2.0 プロトコルでAIエージェントが直接利用可能。

Tool: `mock_interview` - 面接評価を実行してランク付き結果を返す。

## AI公開チャネル

- Agent Card: `/.well-known/agent.json`
- MCP Endpoint: `/api/mcp`
- AI向け説明: `/llms.txt`
- クローラー許可: `/robots.txt`

## デプロイ

- Hosting: Vercel
- Domain: interview.ezoai.jp
- GitHub: https://github.com/Michey0495/ai-interview
