/**
 * API integration tests for GET /api/events/stats with the pageview filter.
 *
 * Coverage:
 * - aggregates total pageviews and unique sessions for a path (type=pageview)
 * - ignores click events and other paths
 * - returns zeroes for a path with no pageviews
 *
 * Seeds data directly through the mongodb driver to isolate the aggregation
 * logic, then asserts the HTTP response from the real Express app.
 */
import { expect, test } from "@playwright/test";

import { disconnectDb, insertEvents, resetDb } from "./helpers/db.js";

test.beforeEach(async () => {
  await resetDb();
});

test.afterAll(async () => {
  await disconnectDb();
});

test.describe("GET /api/events/stats (pageviews)", () => {
  test("aggregates pageviews and unique sessions for a path", async ({
    request,
  }) => {
    await insertEvents([
      { sessionId: "s1", type: "pageview", path: "/" },
      { sessionId: "s1", type: "pageview", path: "/" },
      { sessionId: "s2", type: "pageview", path: "/" },
      // Excluded: wrong type.
      { sessionId: "s3", type: "click", path: "/", target: "cta" },
      // Excluded: different path.
      { sessionId: "s4", type: "pageview", path: "/about" },
    ]);

    const res = await request.get("/api/events/stats", {
      params: { path: "/", type: "pageview" },
    });

    expect(res.status()).toBe(200);
    await expect(res.json()).resolves.toEqual({
      data: {
        path: "/",
        type: "pageview",
        target: null,
        count: 3,
        uniqueSessions: 2,
      },
    });
  });

  test("returns zeroes for a path with no pageviews", async ({ request }) => {
    const res = await request.get("/api/events/stats", {
      params: { path: "/never-viewed", type: "pageview" },
    });

    expect(res.status()).toBe(200);
    await expect(res.json()).resolves.toEqual({
      data: {
        path: "/never-viewed",
        type: "pageview",
        target: null,
        count: 0,
        uniqueSessions: 0,
      },
    });
  });
});
