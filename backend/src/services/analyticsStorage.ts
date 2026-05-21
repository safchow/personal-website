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

const secondsPerDay = 24 * 60 * 60;

function isTimestampIndex(index: MongoIndex): boolean {
  const keys = Object.keys(index.key);
  return keys.length === 1 && index.key.timestamp === 1;
}

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

export async function ensureAnalyticsStorage() {
  const retentionDays = Math.max(config.analyticsRetentionDays, 1);
  const retentionSeconds = retentionDays * secondsPerDay;

  try {
    await prisma.$runCommandRaw({
      createIndexes: "events",
      indexes: [
        {
          key: { path: 1, type: 1, sessionId: 1 },
          name: "events_path_type_session_idx",
        },
        {
          key: { path: 1, type: 1, target: 1 },
          name: "events_path_type_target_idx",
        },
      ],
    });

    await ensureRetentionIndex(retentionSeconds);

    logger.info(
      { retentionDays },
      "Analytics storage indexes and retention are ready",
    );
  } catch (error) {
    logger.error({ err: error }, "Failed to ensure analytics storage indexes");
  }
}
