/**
 * lib/db/mongoose.ts
 *
 * Global Mongoose connection cache.
 *
 * Rules enforced here:
 *  - A single MongooseCache is pinned to `globalThis` so that Next.js hot-reload
 *    never opens a second pool in development.
 *  - Better Auth must call `getMongoClient()` AFTER `connectDB()` has resolved;
 *    it receives the native `mongodb.MongoClient` instance — no second connection.
 *  - All callers await `connectDB()` at the top of every Server Action /
 *    Route Handler before touching any Mongoose model.
 */

import mongoose, { type Mongoose } from "mongoose";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MongooseCache {
  /** Settled connection promise; null before the first call to connectDB(). */
  conn: Mongoose | null;
  /** In-flight connection promise; null when no connection attempt is active. */
  promise: Promise<Mongoose> | null;
}

// Extend globalThis so TypeScript accepts the custom property in strict mode.
declare global {
  // eslint-disable-next-line no-var — `var` is required for globalThis augmentation
  var mongooseCache: MongooseCache | undefined;
}

// ---------------------------------------------------------------------------
// Cache initialisation (singleton on globalThis)
// ---------------------------------------------------------------------------

/**
 * Retrieve — or lazily create — the process-scoped cache object.
 * Using `globalThis` instead of `global` keeps the reference ESM-safe.
 */
function getCache(): MongooseCache {
  if (globalThis.mongooseCache === undefined) {
    globalThis.mongooseCache = { conn: null, promise: null };
  }
  return globalThis.mongooseCache;
}

// ---------------------------------------------------------------------------
// Environment guard
// ---------------------------------------------------------------------------

function requireMongoUri(): string {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.trim() === "") {
    throw new Error(
      "[mongoose.ts] MONGODB_URI is not defined in the environment. " +
        "Add it to .env.local before starting the server."
    );
  }
  return uri;
}

// ---------------------------------------------------------------------------
// Connection options
// ---------------------------------------------------------------------------

/**
 * Stable connection options shared across all call sites.
 *
 * - `bufferCommands: false`  — surfaces connection errors immediately instead
 *   of silently queuing queries while offline.
 * - `maxPoolSize: 10`        — keeps the pool bounded in serverless-adjacent
 *   environments (Vercel, containers).
 */
const MONGOOSE_OPTIONS: mongoose.ConnectOptions = {
  bufferCommands: false,
  maxPoolSize: 10,
};

// ---------------------------------------------------------------------------
// Primary export: connectDB
// ---------------------------------------------------------------------------

/**
 * Opens a Mongoose connection (or reuses an existing one) and resolves with
 * the connected `Mongoose` instance.
 *
 * ```ts
 * // Inside any Route Handler or Server Action:
 * import { connectDB } from "@/lib/db/mongoose";
 *
 * await connectDB();
 * const listing = await ListingModel.findById(id);
 * ```
 */
export async function connectDB(): Promise<Mongoose> {
  const cache = getCache();

  // Fast-path: already connected.
  if (cache.conn !== null) {
    return cache.conn;
  }

  // Coalesce concurrent calls into a single in-flight promise.
  if (cache.promise === null) {
    const uri = requireMongoUri();

    cache.promise = mongoose
      .connect(uri, MONGOOSE_OPTIONS)
      .then((resolvedMongoose) => {
        cache.conn = resolvedMongoose;
        return resolvedMongoose;
      })
      .catch((error: unknown) => {
        // Reset so the next call can retry rather than hanging forever.
        cache.promise = null;
        throw error;
      });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}

// ---------------------------------------------------------------------------
// Secondary export: getMongoClient  (used exclusively by Better Auth)
// ---------------------------------------------------------------------------

/**
 * Returns the native `mongodb.MongoClient` that Mongoose is already using.
 *
 * MUST be called after `connectDB()` has resolved.  Better Auth will receive
 * this client and issue its own queries through the same pool — no second
 * `MongoClient.connect()` call is made.
 *
 * ```ts
 * // Inside lib/auth/auth.config.ts:
 * import { connectDB, getMongoClient } from "@/lib/db/mongoose";
 *
 * await connectDB();
 * const client = getMongoClient();
 * ```
 */
export function getMongoClient(): mongoose.mongo.MongoClient {
  const { connection } = mongoose;

  if (connection.readyState !== 1 /* connected */) {
    throw new Error(
      "[mongoose.ts] getMongoClient() was called before the connection was " +
        "established. Ensure connectDB() has resolved first."
    );
  }

  // `getClient()` is the official Mongoose API for accessing the underlying
  // native MongoClient instance.
  return connection.getClient();
}

// ---------------------------------------------------------------------------
// Utility: disconnectDB  (test teardown / graceful shutdown only)
// ---------------------------------------------------------------------------

/**
 * Closes the Mongoose connection and resets the cache.
 *
 * Intended for:
 *  - Jest / Vitest `afterAll` hooks.
 *  - Graceful process shutdown handlers (SIGTERM, SIGINT).
 *
 * Do NOT call this in production request handlers.
 */
export async function disconnectDB(): Promise<void> {
  const cache = getCache();

  if (cache.conn !== null) {
    await mongoose.disconnect();
    cache.conn = null;
    cache.promise = null;
  }
}
