import { ImageResponse } from "next/og";
import { kv } from "@vercel/kv";
import type { MinutesResult } from "@/lib/types";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let title = "AI議事録";
  let summary = "会議メモからプロの議事録を自動生成";
  let decisions = 0;
  let actions = 0;

  if (process.env.KV_REST_API_URL) {
    const result = await kv.get<MinutesResult>(`minutes:${id}`);
    if (result) {
      title = result.input.title || "AI議事録";
      summary = result.summary.slice(0, 100);
      decisions = result.decisions.length;
      actions = result.actionItems.length;
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: "28px",
            color: "#10b981",
            marginBottom: "16px",
            fontWeight: 700,
          }}
        >
          AI議事録
        </div>
        <div
          style={{
            fontSize: "48px",
            color: "#ffffff",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "24px",
            maxWidth: "900px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "22px",
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            maxWidth: "800px",
            marginBottom: "40px",
            lineHeight: 1.6,
          }}
        >
          {summary}
        </div>
        <div
          style={{
            display: "flex",
            gap: "40px",
            fontSize: "18px",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          <span>決定事項: {decisions}件</span>
          <span>アクション: {actions}件</span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            fontSize: "16px",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          minutes.ezoai.jp
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
