import Redis from "ioredis";

const globalRedis = globalThis as typeof globalThis & { safeLandRedis?: Redis };
export function getRedis() {
  if (!process.env.REDIS_URL) return null;
  globalRedis.safeLandRedis ??= new Redis(process.env.REDIS_URL, { lazyConnect: true, maxRetriesPerRequest: 1 });
  return globalRedis.safeLandRedis;
}
