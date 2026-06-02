import { config, getDb, getEventsCollection, logger } from "@website/core";

type IndexInfo = {
  name?: string;
  key: Record<string, number>;
  expireAfterSeconds?: number;
};

const SECONDS_PER_DAY = 24 * 60 * 60;

function isTimestampIndex(index: IndexInfo): boolean {
  const keys = Object.keys(index.key);
  return keys.length === 1 && index.key.timestamp === 1;
}

/**
 * Ensure the `events.timestamp` index expires raw analytics events after the
 * configured retention window. Creates the TTL index if missing, or adjusts
 * `expireAfterSeconds` in place when the retention setting changes. Runs on
 * every boot so it is self-healing.
 */
async function ensureRetentionIndex(expireAfterSeconds: number) {
  const events = getEventsCollection();
  const indexes = (await events.indexes()) as unknown as IndexInfo[];
  const timestampIndex = indexes.find(isTimestampIndex);

  if (!timestampIndex) {
    await events.createIndex(
      { timestamp: 1 },
      { name: "events_timestamp_ttl_idx", expireAfterSeconds },
    );
    return;
  }

  if (timestampIndex.expireAfterSeconds === expireAfterSeconds) {
    return;
  }

  await getDb().command({
    collMod: "events",
    index: { name: timestampIndex.name, expireAfterSeconds },
  });
}

/**
 * Apply storage-level safeguards for the analytics events collection:
 * a `sessionId` lookup index and a TTL retention index on `timestamp`
 * driven by `ANALYTICS_RETENTION_DAYS`. Failures are logged but never block
 * startup so a transient DB issue does not take the API down.
 */
export async function ensureAnalyticsStorage() {
  const retentionDays = Math.max(config.analyticsRetentionDays, 1);

  try {
    await getEventsCollection().createIndex(
      { sessionId: 1 },
      { name: "events_sessionId_idx" },
    );
    await ensureRetentionIndex(retentionDays * SECONDS_PER_DAY);
    logger.info(
      { retentionDays },
      "Analytics storage indexes and retention are ready",
    );
  } catch (error) {
    logger.error(
      { err: error },
      "Failed to ensure analytics storage indexes and retention",
    );
  }
}
