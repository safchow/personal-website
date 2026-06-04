import { type Collection, MongoClient } from "mongodb";

import { TEST_DB_URL } from "../../../playwright.config.js";

let client: MongoClient | null = null;

async function eventsCollection(): Promise<Collection> {
  if (!client) {
    client = new MongoClient(TEST_DB_URL);
    await client.connect();
  }
  return client.db().collection("events");
}

export async function resetDb(): Promise<void> {
  const events = await eventsCollection();
  await events.deleteMany({});
}

export async function insertEvents(
  docs: Record<string, unknown>[],
): Promise<void> {
  const events = await eventsCollection();
  await events.insertMany(
    docs.map((doc) => ({ timestamp: new Date(), ...doc })),
  );
}

export async function findEvents(
  filter: Record<string, unknown> = {},
): Promise<Record<string, unknown>[]> {
  const events = await eventsCollection();
  return events.find(filter).toArray();
}

export async function countEvents(
  filter: Record<string, unknown> = {},
): Promise<number> {
  const events = await eventsCollection();
  return events.countDocuments(filter);
}

export type EventIndex = {
  name?: string;
  key: Record<string, number>;
  expireAfterSeconds?: number;
};

export async function listEventIndexes(): Promise<EventIndex[]> {
  const events = await eventsCollection();
  return (await events.indexes()) as unknown as EventIndex[];
}

export async function disconnectDb(): Promise<void> {
  if (!client) return;
  await client.close();
  client = null;
}
