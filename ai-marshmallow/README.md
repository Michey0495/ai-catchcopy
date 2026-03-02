# AIマシュマロ

匿名で質問するとAIキャラクター「マシュ」が個性的に回答するQ&Aサービス。

## Try it

https://ai-marshmallow.ezoai.jp

## For AI Agents (MCP)

MCP endpoint: `https://ai-marshmallow.ezoai.jp/api/mcp`

### Available Tools

| Tool | Description |
|------|-------------|
| `ask_question` | AIキャラクター「マシュ」に匿名で質問し、個性的な回答を得る |

### Example Request

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "ask_question",
    "arguments": {
      "question": "人生で一番大事なことは何ですか？"
    }
  }
}
```

### Example Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "ふふ、それはね...（マシュの個性的な回答がここに入ります）"
      }
    ]
  }
}
```

### Tool Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `question` | string | Yes | 質問内容（最大280文字） |

## Features

- アカウント不要・匿名で質問できるQ&Aサービス
- AIキャラクター「マシュ」が日本語で個性的に回答
- 各回答はユニークURLで共有可能
- OGP対応（X / LINE でカード表示）

## Tech Stack

Next.js 15 / TypeScript / Tailwind CSS / Claude Haiku / Vercel KV / Vercel

## License

MIT
