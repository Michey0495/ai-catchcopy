import { kv } from "@vercel/kv";

const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export async function checkRateLimit(ip: string): Promise<{
  allowed: boolean;
  remaining: number;
}> {
  if (!process.env.KV_REST_API_URL) {
    return { allowed: true, remaining: LIMIT };
  }

  const key = `rate:minutes:${ip}`;
  const now = Date.now();

  const timestamps: number[] = (await kv.get<number[]>(key)) || [];
  const valid = timestamps.filter((t) => now - t < WINDOW_MS);

  if (valid.length >= LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  valid.push(now);
  await kv.set(key, valid, { ex: 600 });

  return { allowed: true, remaining: LIMIT - valid.length };
}
