import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
type Cache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
const globalMongo = globalThis as typeof globalThis & { mongooseCache?: Cache };
const cached = globalMongo.mongooseCache ?? { conn: null, promise: null };
globalMongo.mongooseCache = cached;

export async function connectMongo() {
  if (!MONGODB_URI) return null;
  if (cached.conn) return cached.conn;
  cached.promise ??= mongoose.connect(MONGODB_URI, { bufferCommands: false });
  cached.conn = await cached.promise;
  return cached.conn;
}
