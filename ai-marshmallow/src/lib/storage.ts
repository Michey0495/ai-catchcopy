import type { Question } from "./types";

// In-memory store for development / fallback
const memoryStore = new Map<string, Question>();
const memoryList: string[] = [];
const MAX_LIST = 100;

async function getKV() {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const { kv } = await import("@vercel/kv");
    return kv;
  }
  return null;
}

export async function saveQuestion(question: Question): Promise<void> {
  const kv = await getKV();
  if (kv) {
    await kv.set(`question:${question.id}`, question);
    await kv.lpush("questions:list", question.id);
    await kv.ltrim("questions:list", 0, MAX_LIST - 1);
  } else {
    memoryStore.set(question.id, question);
    memoryList.unshift(question.id);
    if (memoryList.length > MAX_LIST) memoryList.pop();
  }
}

export async function getQuestion(id: string): Promise<Question | null> {
  const kv = await getKV();
  if (kv) {
    return kv.get<Question>(`question:${id}`);
  }
  return memoryStore.get(id) ?? null;
}

export async function getRecentQuestions(limit = 20): Promise<Question[]> {
  const kv = await getKV();
  if (kv) {
    const ids = await kv.lrange<string>("questions:list", 0, limit - 1);
    const questions = await Promise.all(ids.map((id) => kv.get<Question>(`question:${id}`)));
    return questions.filter((q): q is Question => q !== null);
  }
  return memoryList
    .slice(0, limit)
    .map((id) => memoryStore.get(id))
    .filter((q): q is Question => q !== undefined);
}
