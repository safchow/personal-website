/**
 * API integration tests for GET /api/events (admin event listing).
 *
 * Coverage:
 * - returns events newest-first with string ids and a count
 * - respects the `limit` query param
 * - requireAdminKey gate: rejects missing/wrong key, accepts the correct key
 *
 * The test server boots with ADMIN_API_KEY set (see playwright.config.ts), so
 * requests must pass `?key=<TEST_ADMIN_KEY>`.
 */
import { expect, test } from "@playwright/test";

import { TEST_ADMIN_KEY } from "../../playwright.config.js";
import { disconnectDb, insertEvents, resetDb } from "./helpers/db.js";

test.beforeEach(async () => {
  await resetDb();
});

test.afterAll(async () => {
  await disconnectDb();
});

test.describe("GET /api/events", () => {
  test("returns events newest-first with string ids", async ({ request }) => {
    await insertEvents([
      {
        sessionId: "oldest",
        type: "pageview",
        path: "/",
        timestamp: new Date("2024-01-01T00:00:00.000Z"),
      },
      {
        sessionId: "newest",
        type: "pageview",
        path: "/",
        timestamp: new Date("2024-03-01T00:00:00.000Z"),
      },
      {
        sessionId: "middle",
        type: "pageview",
        path: "/",
        timestamp: new Date("2024-02-01T00:00:00.000Z"),
      },
    ]);

    const res = await request.get("/api/events", {
      params: { key: TEST_ADMIN_KEY },
    });

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.meta.count).toBe(3);
    expect(
      body.data.events.map((event: { sessionId: string }) => event.sessionId),
    ).toEqual(["newest", "middle", "oldest"]);
    expect(body.data.events[0].id).toEqual(expect.any(String));
  });

  test("respects the limit query param", async ({ request }) => {
    await insertEvents([
      { sessionId: "a", type: "pageview", path: "/" },
      { sessionId: "b", type: "pageview", path: "/" },
      { sessionId: "c", type: "pageview", path: "/" },
    ]);

    const res = await request.get("/api/events", {
      params: { key: TEST_ADMIN_KEY, limit: "2" },
    });

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.data.events).toHaveLength(2);
    expect(body.meta.count).toBe(2);
  });

  test("rejects requests with a missing or wrong admin key", async ({
    request,
  }) => {
    const noKey = await request.get("/api/events");
    expect(noKey.status()).toBe(401);

    const wrongKey = await request.get("/api/events", {
      params: { key: "not-the-key" },
    });
    expect(wrongKey.status()).toBe(401);
  });

  test("accepts requests with the correct admin key", async ({ request }) => {
    const res = await request.get("/api/events", {
      params: { key: TEST_ADMIN_KEY },
    });
    expect(res.status()).toBe(200);
  });
});
