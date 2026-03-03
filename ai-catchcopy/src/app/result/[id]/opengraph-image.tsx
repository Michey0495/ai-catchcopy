import { ImageResponse } from "next/og";
import { kv } from "@vercel/kv";
import type { CatchcopyResult } from "@/types";

export const runtime = "edge";
export const alt = "AIキャッチコピーの結果";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const accent = "#06b6d4";

export default async function OGImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await kv.get<CatchcopyResult>(`catchcopy:${id}`);

  if (!result) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#000",
            color: "#fff",
            fontSize: 48,
            fontWeight: 900,
          }}
        >
          AIキャッチコピー
        </div>
      ),
      { ...size }
    );
  }

  const bestCopy = result.catchcopies[0]?.text ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#000",
          color: "#fff",
          padding: 60,
          position: "relative",
        }}
      >
        {/* Accent line top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: accent,
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 40,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: accent, fontSize: 32, fontWeight: 900 }}>
              {"//"}
            </span>
            <span style={{ fontSize: 24, fontWeight: 700 }}>
              AIキャッチコピー
            </span>
          </div>
          <span style={{ fontSize: 18, color: "rgba(255,255,255,0.4)" }}>
            ai-catchcopy.ezoai.jp
          </span>
        </div>

        {/* Center: product name + best copy */}
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            gap: 32,
          }}
        >
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.5)" }}>
            {result.productName.slice(0, 30)}
          </div>

          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: accent,
              lineHeight: 1.3,
            }}
          >
            {bestCopy.slice(0, 40)}
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 24,
          }}
        >
          <span style={{ fontSize: 16, color: "rgba(255,255,255,0.4)" }}>
            by AIキャッチコピー
          </span>
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)" }}>
            ezoai.jp
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
