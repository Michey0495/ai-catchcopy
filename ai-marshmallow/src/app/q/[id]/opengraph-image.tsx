import { ImageResponse } from "next/og";
import { getQuestion } from "@/lib/storage";

export const runtime = "nodejs";
export const alt = "AIマシュマロの回答";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ id: string }> };

export default async function Image({ params }: Props) {
  const { id } = await params;
  const question = await getQuestion(id);

  const questionText = question
    ? question.content.slice(0, 60) + (question.content.length > 60 ? "..." : "")
    : "AIマシュマロの回答";

  const answerText = question
    ? question.answer.slice(0, 80) + (question.answer.length > 80 ? "..." : "")
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 80px",
          gap: 32,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Q: {questionText}
        </div>
        {answerText && (
          <div
            style={{
              fontSize: 22,
              color: "rgba(255, 255, 255, 0.6)",
              textAlign: "center",
              maxWidth: 900,
              lineHeight: 1.6,
            }}
          >
            {answerText}
          </div>
        )}
        <div style={{ fontSize: 18, color: "rgba(255, 255, 255, 0.4)", marginTop: 8 }}>AIマシュマロ</div>
      </div>
    ),
    size
  );
}
