import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import type { CatchcopyResult } from "@/types";

const TOOLS = [
  {
    name: "generate_catchcopy",
    description: "商品・サービスの情報からAIキャッチコピーを5案生成します",
    inputSchema: {
      type: "object",
      properties: {
        productName: { type: "string", description: "商品・サービス名" },
        description: { type: "string", description: "商品・サービスの説明" },
        targetAudience: { type: "string", description: "ターゲット層" },
        tone: {
          type: "string",
          enum: ["professional", "casual", "playful", "elegant", "bold"],
          description: "トーン（professional/casual/playful/elegant/bold）",
        },
        agentName: { type: "string", description: "エージェント名（任意）" },
        agentDescription: { type: "string", description: "エージェント説明（任意）" },
      },
      required: ["productName", "description", "targetAudience", "tone"],
    },
  },
  {
    name: "get_recent_catchcopies",
    description: "最近生成されたキャッチコピーの一覧を取得",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "取得件数（1-50、デフォルト20）" },
      },
    },
  },
  {
    name: "get_catchcopy_result",
    description: "IDを指定してキャッチコピー結果を取得",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "結果ID" },
      },
      required: ["id"],
    },
  },
];

async function handleToolCall(name: string, params: Record<string, unknown>) {
  switch (name) {
    case "generate_catchcopy": {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ai-catchcopy.ezoai.jp";
      const res = await fetch(`${siteUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...params, source: "mcp" }),
      });
      const data = await res.json();
      if (!res.ok) return { error: data.error };
      const result = await kv.get<CatchcopyResult>(`catchcopy:${data.id}`);
      return result;
    }
    case "get_recent_catchcopies": {
      const limit = Math.min(Math.max(Number(params.limit) || 20, 1), 50);
      const ids = await kv.zrange("catchcopy:feed", 0, limit - 1, { rev: true });
      if (!ids || ids.length === 0) return [];
      const results = await Promise.all(
        ids.map((id) => kv.get<CatchcopyResult>(`catchcopy:${id}`))
      );
      return results.filter(Boolean);
    }
    case "get_catchcopy_result": {
      const id = params.id as string;
      if (!id) return { error: "id is required" };
      const result = await kv.get<CatchcopyResult>(`catchcopy:${id}`);
      if (!result) return { error: "Not found" };
      return result;
    }
    default:
      return { error: `Unknown tool: ${name}` };
  }
}

export async function GET() {
  return NextResponse.json({
    name: "ai-catchcopy-mcp",
    version: "1.0.0",
    description: "AIキャッチコピー自動生成 MCP Server",
    tools: TOOLS,
    endpoints: { tools: "/api/mcp" },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, method, params } = body;

    switch (method) {
      case "initialize":
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: "2024-11-05",
            serverInfo: { name: "ai-catchcopy-mcp", version: "1.0.0" },
            capabilities: { tools: {} },
          },
        });

      case "tools/list":
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: { tools: TOOLS },
        });

      case "tools/call": {
        const { name, arguments: args } = params;
        const toolResult = await handleToolCall(name, args || {});
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: JSON.stringify(toolResult, null, 2) }],
          },
        });
      }

      default:
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          error: { code: -32601, message: `Method not found: ${method}` },
        });
    }
  } catch (error) {
    console.error("MCP error:", error);
    return NextResponse.json({
      jsonrpc: "2.0",
      id: null,
      error: { code: -32603, message: "Internal error" },
    });
  }
}
