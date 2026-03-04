export const tones = [
  { value: "professional", label: "プロフェッショナル", description: "信頼感・専門性を重視" },
  { value: "casual", label: "カジュアル", description: "親しみやすく日常的な表現" },
  { value: "playful", label: "遊び心", description: "ユーモアや意外性のある表現" },
  { value: "elegant", label: "エレガント", description: "洗練された上品な表現" },
  { value: "bold", label: "大胆", description: "インパクト重視の力強い表現" },
] as const;

export type ToneValue = (typeof tones)[number]["value"];
