# AI模擬面接 - Architecture

## Concept
希望職種と自己PRを入力すると、AIが厳しい面接官として面接力をS~Dランクで判定するサービス。
面接準備度の可視化と具体的な改善アドバイスを提供する。

## Pages
| Path | Type | Description |
|------|------|-------------|
| `/` | SSR | ランディングページ + InterviewForm |
| `/result/[id]` | Dynamic SSR | 結果表示 + OGP動的生成 |

## API Routes
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/interview` | POST | 面接評価生成 + KV保存 |
| `/api/mcp` | GET/POST | MCP Server (JSON-RPC 2.0) |
| `/api/feedback` | POST | フィードバック → GitHub Issue |

## Components
| Component | Type | Description |
|-----------|------|-------------|
| `InterviewForm` | Client | 入力フォーム (5フィールド) |
| `ShareButtons` | Client | X/コピーシェア |
| `FeedbackWidget` | Client | フローティングフィードバック |
| `CrossPromo` | Client | 他サービスリンク |

## Data Flow
```
User Input → POST /api/interview
  → Rate Limit Check (5/10min, IP-based)
  → Input Validation & Truncation
  → Claude Haiku Prompt (JSON structured output)
  → Parse Response
  → Save to KV: interview:{id} (30-day TTL)
  → Return { id }
  → Client redirect to /result/{id}
  → Server: KV fetch → generateMetadata() → SSR render
```

## AI Prompt Design
- 面接官ペルソナ: 大手企業の厳しくも公正な採用面接官
- 出力形式: 構造化JSON
- 評価項目: 3つの面接質問 + 個別評価 + 総合評価 + 改善アドバイス
- ランク: S/A/B/C/D (5段階)
- 判定: 合格見込み/要改善/厳しい (3段階)

## Type Definitions
```typescript
interface InterviewInput {
  position: string;    // 希望職種 (required, max 100)
  industry: string;    // 業界 (optional, max 100)
  experience: string;  // 経験年数 (optional, max 50)
  selfpr: string;      // 自己PR (optional, max 500)
  motivation: string;  // 志望動機 (optional, max 500)
}

interface InterviewEvaluation {
  question: string;    // 面接質問
  evaluation: string;  // 評価コメント
  score: string;       // 良い/普通/要改善
}

interface InterviewResult {
  id: string;
  input: InterviewInput;
  rank: string;                      // S/A/B/C/D
  verdict: string;                   // 合格見込み/要改善/厳しい
  evaluations: InterviewEvaluation[];
  summary: string;                   // 総合評価
  advice: string;                    // 改善アドバイス
  createdAt: string;
}
```

## MCP Server Design
- Protocol: JSON-RPC 2.0
- Tool: `mock_interview`
- Input: position (required), industry, experience, selfpr, motivation
- Output: Evaluation result + result URL
- Discovery: `/.well-known/agent.json`

## Rate Limiting
- 5 requests per 10 minutes per IP
- KV key: `rate:interview:{ip}`
- Auto-expire after window

## Design System
- Background: #000000 (pure black)
- Accent: Violet (#8b5cf6)
- Cards: bg-white/5 border border-white/10
- No emoji, no illustration icons
- Font: 16px+, line-height 1.5-1.75
