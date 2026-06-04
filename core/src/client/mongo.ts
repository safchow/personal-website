import { type Collection, type Db, MongoClient, ObjectId } from "mongodb";

import config from "../config/default.js";

export { ObjectId };

/**
 * Shape of a document in the `events` collection. Mirrors the analytics event
 * payload; `_id` is assigned by MongoDB on insert.
 */
export type EventDoc = {
  _id?: ObjectId;
  sessionId: string;
  type: string; // "click" | "pageview"
  target?: string | null;
  path?: string | null;
  timestamp: Date;
  metadata?: string | null;
};

const mongoClientSingleton = () => new MongoClient(config.databaseUrl);

declare global {
  // eslint-disable-next-line no-var
  var mongoGlobal: undefined | MongoClient;
}

let client: MongoClient | null = globalThis.mongoGlobal ?? null;

/**
 * Lazily construct a single MongoClient. In non-production the instance is
 * cached on globalThis so `tsx watch` reloads reuse one connection pool.
 */
export function getMongoClient(): MongoClient {
  if (!client) {
    client = mongoClientSingleton();
    if (process.env.NODE_ENV !== "production") {
      globalThis.mongoGlobal = client;
    }
  }
  return client;
}

/** Establish the connection. Idempotent — safe to call on every boot. */
export async function connectMongo(): Promise<MongoClient> {
  return getMongoClient().connect();
}

/** Database selected from the connection string (e.g. `/website`). */
export function getDb(): Db {
  return getMongoClient().db();
}

export function getEventsCollection(): Collection<EventDoc> {
  return getDb().collection<EventDoc>("events");
}

export async function disconnectMongo(): Promise<void> {
  if (!client) return;
  await client.close();
  client = null;
  globalThis.mongoGlobal = undefined;
}
