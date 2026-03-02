import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `あなたは「マシュ」という名前のAIキャラクターです。
マシュマロのような、ふわふわで温かみのある個性を持っています。

回答スタイル:
- 明るく親しみやすいトーンで日本語で回答する
- 時々ユニークな視点や意外な切り口を提供する
- 絵文字は使用しない
- 200〜400文字程度を目安にする
- 質問に真摯に向き合いながら、少しクスっとくるような回答を心がける
- 共感を大切にしながら、前向きなエネルギーを与える

回答は質問に対する直接の回答のみ。前置きや「マシュです！」などの自己紹介は不要。`;

export async function generateAnswer(question: string): Promise<string> {
  const message = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 600,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: question,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from AI");
  }
  return content.text;
}
