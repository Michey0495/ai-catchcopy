// Rate limiting: 5 requests per 10 minutes per IP
// Uses Vercel KV in production, in-memory Map in development

const LIMIT = 5;
const WINDOW_SECONDS = 10 * 60; // 10 minutes

// In-memory fallback for development
const memoryStore = new Map<string, { count: number; resetAt: number }>();

async function getKV() {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const { kv } = await import("@vercel/kv");
    return kv;
  }
  return null;
}

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfter: number };

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  const key = `rl:${ip}`;
  const now = Math.floor(Date.now() / 1000);

  const kv = await getKV();

  if (kv) {
    // Atomic increment with expiry in Vercel KV
    const count = await kv.incr(key);
    if (count === 1) {
      await kv.expire(key, WINDOW_SECONDS);
    }
    if (count > LIMIT) {
      const ttl = await kv.ttl(key);
      return { ok: false, retryAfter: ttl > 0 ? ttl : WINDOW_SECONDS };
    }
    return { ok: true };
  }

  // In-memory fallback
  const entry = memoryStore.get(key);
  if (!entry || entry.resetAt <= now) {
    memoryStore.set(key, { count: 1, resetAt: now + WINDOW_SECONDS });
    return { ok: true };
  }
  entry.count += 1;
  if (entry.count > LIMIT) {
    return { ok: false, retryAfter: entry.resetAt - now };
  }
  return { ok: true };
}
