/**
 * Integration test for analytics storage setup.
 *
 * ensureAnalyticsStorage() runs when the test server boots (see
 * playwright.config.ts webServer), so the events collection should already have
 * its lookup and TTL retention indexes regardless of per-test data.
 */
import { expect, test } from "@playwright/test";

import { disconnectDb, listEventIndexes } from "./helpers/db.js";

test.afterAll(async () => {
  await disconnectDb();
});

test.describe("analytics storage indexes", () => {
  test("creates the sessionId lookup and timestamp TTL indexes", async () => {
    const indexes = await listEventIndexes();

    const sessionIndex = indexes.find(
      (index) => index.name === "events_sessionId_idx",
    );
    expect(sessionIndex, "sessionId index should exist").toBeTruthy();
    expect(sessionIndex?.key).toMatchObject({ sessionId: 1 });

    const ttlIndex = indexes.find(
      (index) =>
        Object.keys(index.key).length === 1 && index.key.timestamp === 1,
    );
    expect(ttlIndex, "timestamp TTL index should exist").toBeTruthy();
    expect(typeof ttlIndex?.expireAfterSeconds).toBe("number");
    expect(ttlIndex?.expireAfterSeconds ?? 0).toBeGreaterThan(0);
  });
});
