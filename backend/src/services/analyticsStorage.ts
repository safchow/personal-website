import { config, logger, prisma } from "@website/core";

type MongoIndex = {
  name: string;
  key: Record<string, number>;
  expireAfterSeconds?: number;
};

type ListIndexesResult = {
  cursor?: {
    firstBatch?: MongoIndex[];
  };
};

const SECONDS_PER_DAY = 24 * 60 * 60;

function isTimestampIndex(index: MongoIndex): boolean {
  const keys = Object.keys(index.key);
  return keys.length === 1 && index.key.timestamp === 1;
}

/**
 * Ensure the `events.timestamp` index expires raw analytics events after the
 * configured retention window. Prisma cannot express TTL options in the schema,
 * so the single-field timestamp index it manages is upgraded in place (or
 * created if absent). This runs on every boot, so it self-heals if a later
 * `prisma db push` strips the TTL option.
 */
async function ensureRetentionIndex(retentionSeconds: number) {
  const result = (await prisma.$runCommandRaw({
    listIndexes: "events",
    cursor: {},
  })) as ListIndexesResult;

  const timestampIndex = result.cursor?.firstBatch?.find(isTimestampIndex);

  if (!timestampIndex) {
    await prisma.$runCommandRaw({
      createIndexes: "events",
      indexes: [
        {
          key: { timestamp: 1 },
          name: "events_timestamp_ttl_idx",
          expireAfterSeconds: retentionSeconds,
        },
      ],
    });
    return;
  }

  if (timestampIndex.expireAfterSeconds === retentionSeconds) {
    return;
  }

  await prisma.$runCommandRaw({
    collMod: "events",
    index: {
      name: timestampIndex.name,
      expireAfterSeconds: retentionSeconds,
    },
  });
}

/**
 * Apply storage-level safeguards for the analytics events collection.
 * Currently: a TTL retention index driven by `ANALYTICS_RETENTION_DAYS`.
 * Failures are logged but never block startup so a transient DB issue does
 * not take the API down.
 */
export async function ensureAnalyticsStorage() {
  const retentionDays = Math.max(config.analyticsRetentionDays, 1);
  const retentionSeconds = retentionDays * SECONDS_PER_DAY;

  try {
    await ensureRetentionIndex(retentionSeconds);
    logger.info({ retentionDays }, "Analytics retention TTL index is ready");
  } catch (error) {
    logger.error(
      { err: error },
      "Failed to ensure analytics retention TTL index",
    );
  }
}
